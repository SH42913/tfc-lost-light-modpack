// Finds client-only mods: mods that can be removed from a dedicated server.
// Usage: node tools/mods/client_only.js <instanceRoot> [--verbose] [--mod=<substring>] [--readme]
//   --verbose          print the evidence for every mod, not only for the uncertain ones
//   --mod=<substring>  print the full evidence for jars whose file name contains <substring>
//   --readme           rewrite the server mod list in README.md (between the client-only-mods markers):
//                      enabled jars of the "Client-only" and "Probably client-only" groups + README_INCLUDE,
//                      minus README_EXCLUDE, as version-free file masks
//
// Metadata flags (`clientSideOnly`, `displayTest`, fabric `environment`) are NOT trusted — they're only shown as info.
// Instead every jar (.jar and .jar.disabled) is scanned for real server-side involvement:
//   strong signals (the server must have the mod):
//     registry   — registers game content (DeferredRegister / RegisterEvent / Registry.register / Architectury registrars)
//     data       — ships server data (data/<ns>/recipes, tags, loot_tables, worldgen, ...)
//     network    — registers a network channel without accepting a missing server side
//     mixin      — mixins applied on the server (`mixins`/`server` lists of a mixin config) that target non-client classes
//   soft signals (has server-side code, but may still work without the server):
//     server-code — references server classes (MinecraftServer, ServerLevel, ServerPlayer, commands, server events, SavedData, ...)
//     network?    — network channel that accepts a missing server side (optional server part)
// Then mandatory dependencies are followed: a mod without signals that a server-side mod requires (side BOTH/SERVER)
// is needed on the server too. Disabled jars are classified, but don't count as dependents.
//
// Forge 1.20.1 production jars use Mojang class names, so `net/minecraft/client/...` is recognizable.
// Fabric-only jars (Sinytra Connector) use intermediary names (`net/minecraft/class_1234`): their mixin targets
// can't be classified and are counted as non-client.
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const args = process.argv.slice(2);
const root = args.find(a => !a.startsWith('--')) || '.';
const VERBOSE = args.includes('--verbose');
const MOD_FILTER = (args.find(a => a.startsWith('--mod=')) || '').slice(6).toLowerCase();
const MODS = path.join(root, 'mods');
const README_MODE = args.includes('--readme');

// ---------- manual decisions for --readme (by mod id) ----------
// Checked by hand: flagged by a signal, but safe to remove from a server.
const README_INCLUDE = new Set([
  'hideexperimentalwarning', // mixin into LevelSummary — world selection screen only
  'medievalmusic',           // mixin into PackRepository — adds its music resource pack
  'framework',               // library, required only by Controllable
]);
// Checked by hand: classified as client-only, but should stay on a server.
const README_EXCLUDE = new Set([]);
// Display names that are missing, non-English or unclear in the mod metadata.
const NAME_OVERRIDES = {
  advanced_tfc_info: 'Advanced TFC Info',
  detailab: 'Detail Armor Bar Re-equipment',
  tfc_detailab: 'Detail Armor Bar (TFC)',
  medievalmusic: 'Medieval Music',
  more_enchantment_info_container: 'More Enchantment Info',
  presencefootsteps: 'Presence Footsteps',
  treasuredistance: 'Treasure Distance',
};
const README_START = '<!-- client-only-mods:start';
const README_END = '<!-- client-only-mods:end -->';

// ---------- class name rules ----------
const CLIENT_PREFIXES = [
  'net/minecraft/client/', 'com/mojang/blaze3d/', 'com/mojang/realmsclient/',
  'net/minecraftforge/client/', 'net/fabricmc/fabric/api/client/', 'net/fabricmc/fabric/impl/client/',
];
const isClientClass = c => CLIENT_PREFIXES.some(p => c.startsWith(p));

const REGISTRY_CLASSES = new Set([
  'net/minecraftforge/registries/DeferredRegister',
  'net/minecraftforge/registries/RegisterEvent',
  'net/minecraftforge/registries/RegisterEvent$RegisterHelper',
  'dev/architectury/registry/registries/DeferredRegister',
  'dev/architectury/registry/registries/RegistrarManager',
  'net/fabricmc/fabric/api/object/builder/v1/entity/FabricEntityTypeBuilder',
]);
// static Registry.register(Registry, ...) / registerForHolder(...) — Mojang name and intermediary name
const REGISTRY_OWNERS = new Set(['net/minecraft/core/Registry', 'net/minecraft/class_2378']);

const NETWORK_CLASSES = new Set([
  'net/minecraftforge/network/NetworkRegistry',
  'net/minecraftforge/network/NetworkRegistry$ChannelBuilder',
  'net/minecraftforge/network/simple/SimpleChannel',
  'net/minecraftforge/network/event/EventNetworkChannel',
  'dev/architectury/networking/NetworkManager',
  'dev/architectury/networking/NetworkChannel',
  'net/fabricmc/fabric/api/networking/v1/ServerPlayNetworking',
  'net/fabricmc/fabric/api/networking/v1/PayloadTypeRegistry',
]);
// markers of a channel that tolerates a missing server side
const OPTIONAL_NET_MEMBERS = new Set([
  'net/minecraftforge/network/NetworkRegistry.acceptMissingOr',
  'net/minecraftforge/network/NetworkRegistry.ABSENT',
  'net/minecraftforge/network/NetworkRegistry.ACCEPTVANILLA',
]);

const SERVER_CLASSES = new Set([
  'net/minecraft/server/MinecraftServer',
  'net/minecraft/server/dedicated/DedicatedServer',
  'net/minecraft/server/level/ServerLevel',
  'net/minecraft/server/level/ServerPlayer',
  'net/minecraft/server/level/ServerChunkCache',
  'net/minecraft/server/network/ServerGamePacketListenerImpl',
  'net/minecraft/commands/Commands',
  'net/minecraft/commands/CommandSourceStack',
  'net/minecraft/world/level/saveddata/SavedData',
  'net/minecraft/world/entity/ai/goal/GoalSelector', // mob AI runs only on the server
  'net/minecraft/world/entity/ai/goal/Goal',
  'net/minecraftforge/event/RegisterCommandsEvent',
  'net/minecraftforge/event/AddReloadListenerEvent',
  'net/minecraftforge/event/AttachCapabilitiesEvent',
  'net/minecraftforge/event/LootTableLoadEvent',
  'net/minecraftforge/common/loot/IGlobalLootModifier',
  'net/minecraftforge/network/NetworkHooks',
  'net/minecraftforge/network/PacketDistributor',
]);
const SERVER_PREFIXES = ['net/minecraftforge/event/server/'];
const isServerClass = c => SERVER_CLASSES.has(c) || SERVER_PREFIXES.some(p => c.startsWith(p));

// Forge events (net/minecraftforge/event/**, client events live in net/minecraftforge/client/event/).
// Events that fire on the client too or are just plumbing don't count; any other one means gameplay logic.
const NEUTRAL_EVENTS = new Set([
  'TickEvent', 'TickEvent$Phase', 'TickEvent$Type', 'TickEvent$ClientTickEvent', 'TickEvent$RenderTickEvent',
  'TickEvent$PlayerTickEvent', 'TickEvent$LevelTickEvent',
  'TagsUpdatedEvent', 'TagsUpdatedEvent$UpdateCause', 'GameShuttingDownEvent', 'AddPackFindersEvent',
  'level/LevelEvent', 'level/LevelEvent$Load', 'level/LevelEvent$Unload', 'level/LevelEvent$Save',
  'entity/EntityJoinLevelEvent', 'entity/EntityLeaveLevelEvent', 'entity/EntityEvent',
  'entity/player/ItemTooltipEvent', 'entity/player/PlayerEvent',
  'ForgeEventFactory', 'CreativeModeTabEvent', 'BuildCreativeModeTabContentsEvent',
]);
// neutral events that fire on both sides: together with server-code in non-client classes they mean server-side logic
const BOTH_SIDE_EVENTS = new Set([
  'TickEvent$PlayerTickEvent', 'TickEvent$LevelTickEvent', 'entity/EntityJoinLevelEvent', 'entity/EntityLeaveLevelEvent',
  'level/LevelEvent$Load', 'level/LevelEvent$Unload',
]);
const isGameplayEvent = c => c.startsWith('net/minecraftforge/event/')
  && !NEUTRAL_EVENTS.has(c.slice('net/minecraftforge/event/'.length));

// ---------- zip ----------
function readZip(buf) {
  let eocd = buf.length - 22;
  while (eocd >= 0 && buf.readUInt32LE(eocd) !== 0x06054b50) eocd--;
  if (eocd < 0) throw new Error('not a zip');
  let count = buf.readUInt16LE(eocd + 10);
  let p = buf.readUInt32LE(eocd + 16);
  if (count === 0xffff || p === 0xffffffff) { // zip64
    const loc = eocd - 20;
    if (buf.readUInt32LE(loc) === 0x07064b50) {
      const z = Number(buf.readBigUInt64LE(loc + 8));
      count = Number(buf.readBigUInt64LE(z + 32));
      p = Number(buf.readBigUInt64LE(z + 48));
    }
  }
  const entries = new Map();
  for (let i = 0; i < count; i++) {
    if (buf.readUInt32LE(p) !== 0x02014b50) break;
    const method = buf.readUInt16LE(p + 10);
    let csize = buf.readUInt32LE(p + 20);
    const nlen = buf.readUInt16LE(p + 28), elen = buf.readUInt16LE(p + 30), clen = buf.readUInt16LE(p + 32);
    let local = buf.readUInt32LE(p + 42);
    const name = buf.toString('utf8', p + 46, p + 46 + nlen);
    if (csize === 0xffffffff || local === 0xffffffff) { // zip64 extra field
      let e = p + 46 + nlen;
      const end = e + elen;
      while (e < end) {
        const id = buf.readUInt16LE(e), size = buf.readUInt16LE(e + 2);
        if (id === 1) {
          let q = e + 4;
          if (buf.readUInt32LE(p + 24) === 0xffffffff) q += 8; // usize
          if (csize === 0xffffffff) { csize = Number(buf.readBigUInt64LE(q)); q += 8; }
          if (local === 0xffffffff) local = Number(buf.readBigUInt64LE(q));
        }
        e += 4 + size;
      }
    }
    const lo = local, cs = csize;
    entries.set(name, () => {
      const start = lo + 30 + buf.readUInt16LE(lo + 26) + buf.readUInt16LE(lo + 28);
      const data = buf.subarray(start, start + cs);
      return method === 8 ? zlib.inflateRawSync(data) : data;
    });
    p += 46 + nlen + elen + clen;
  }
  return entries;
}

// ---------- class file ----------
// Returns { classes:Set, members:Set('owner.name'), methodDescs:[[owner,name,desc]], annotations:[{type, values}] }
function parseClass(b) {
  if (b.readUInt32BE(0) !== 0xcafebabe) return null;
  const n = b.readUInt16BE(8);
  const cp = new Array(n);
  let p = 10;
  for (let i = 1; i < n; i++) {
    const tag = b[p];
    switch (tag) {
      case 1: { const len = b.readUInt16BE(p + 1); cp[i] = { tag, s: b.toString('utf8', p + 3, p + 3 + len) }; p += 3 + len; break; }
      case 7: case 8: case 16: case 19: case 20: cp[i] = { tag, a: b.readUInt16BE(p + 1) }; p += 3; break;
      case 15: p += 4; break;
      case 3: case 4: p += 5; break;
      case 5: case 6: p += 9; i++; break;
      case 9: case 10: case 11: case 12: case 17: case 18:
        cp[i] = { tag, a: b.readUInt16BE(p + 1), b: b.readUInt16BE(p + 3) }; p += 5; break;
      default: return null;
    }
  }
  const utf = i => (cp[i] && cp[i].tag === 1 ? cp[i].s : '');
  const className = i => utf(cp[i].a);
  const classes = new Set();
  const members = new Set();
  const methodDescs = [];
  for (let i = 1; i < n; i++) {
    const e = cp[i];
    if (!e) continue;
    if (e.tag === 7) {
      let c = utf(e.a);
      if (c.startsWith('[')) { const m = c.match(/L([^;]+);/); c = m ? m[1] : ''; }
      if (c) classes.add(c);
    } else if (e.tag === 9 || e.tag === 10 || e.tag === 11) {
      const owner = className(e.a);
      const nt = cp[e.b];
      const name = utf(nt.a), desc = utf(nt.b);
      members.add(owner + '.' + name);
      if (e.tag !== 9) methodDescs.push([owner, name, desc]);
    } else if (e.tag === 1) {
      // types used only in descriptors/signatures (fields, params, annotations)
      for (const m of e.s.matchAll(/L([\w/$]+);/g)) classes.add(m[1]);
    }
  }
  // class-level annotations
  p += 6; // access, this, super
  const ic = b.readUInt16BE(p); p += 2 + ic * 2;
  for (let k = 0; k < 2; k++) { // fields, methods
    const cnt = b.readUInt16BE(p); p += 2;
    for (let j = 0; j < cnt; j++) {
      p += 6;
      const ac = b.readUInt16BE(p); p += 2;
      for (let a = 0; a < ac; a++) p += 6 + b.readUInt32BE(p + 2);
    }
  }
  const annotations = [];
  const readValue = () => {
    const t = String.fromCharCode(b[p++]);
    if ('BCDFIJSZs'.includes(t)) { const v = utf(b.readUInt16BE(p)); p += 2; return t === 's' ? v : null; }
    if (t === 'e') { const v = utf(b.readUInt16BE(p + 2)); p += 4; return v; }
    if (t === 'c') { const v = utf(b.readUInt16BE(p)); p += 2; return v; }
    if (t === '@') return readAnno();
    if (t === '[') { const c = b.readUInt16BE(p); p += 2; const arr = []; for (let i = 0; i < c; i++) arr.push(readValue()); return arr; }
    throw new Error('bad annotation');
  };
  const readAnno = () => {
    const type = utf(b.readUInt16BE(p));
    const c = b.readUInt16BE(p + 2); p += 4;
    const values = {};
    for (let i = 0; i < c; i++) { const k = utf(b.readUInt16BE(p)); p += 2; values[k] = readValue(); }
    return { type, values };
  };
  const ac = b.readUInt16BE(p); p += 2;
  for (let a = 0; a < ac; a++) {
    const name = utf(b.readUInt16BE(p)), len = b.readUInt32BE(p + 2);
    const end = p + 6 + len;
    if (name === 'RuntimeVisibleAnnotations' || name === 'RuntimeInvisibleAnnotations') {
      p += 6;
      try { const c = b.readUInt16BE(p); p += 2; for (let i = 0; i < c; i++) annotations.push(readAnno()); } catch { /* ignore */ }
    }
    p = end;
  }
  return { classes, members, methodDescs, annotations };
}

// ---------- metadata ----------
// Minimal mods.toml reader: [[mods]] and [[dependencies.<id>]] tables with key = value lines.
function parseModsToml(text) {
  const mods = [], deps = [];
  let cur = null, top = {};
  for (let line of text.split(/\r?\n/)) {
    line = line.replace(/^\s+/, '');
    if (!line || line.startsWith('#')) continue;
    let m;
    if ((m = line.match(/^\[\[\s*mods\s*\]\]/))) { cur = {}; mods.push(cur); continue; }
    if ((m = line.match(/^\[\[\s*dependencies\.["']?([\w-]+)["']?\s*\]\]/))) { cur = { owner: m[1] }; deps.push(cur); continue; }
    if (line.startsWith('[')) { cur = {}; continue; }
    if ((m = line.match(/^([\w-]+)\s*=\s*(.*)$/))) {
      let v = m[2].trim();
      const q = v.match(/^"([^"]*)"|^'([^']*)'/);
      v = q ? (q[1] ?? q[2]) : v.replace(/\s*#.*$/, '');
      (cur || top)[m[1]] = v;
    }
  }
  return { mods, deps, top };
}

const globalClient = new Map(); // class name in any jar -> is client-side
const analyzeJar = file => analyzeBuffer(fs.readFileSync(file), path.basename(file));

function analyzeBuffer(buf, file) {
  const zip = readZip(buf);
  const text = name => (zip.has(name) ? zip.get(name)().toString('utf8') : null);
  const r = {
    file,
    disabled: file.endsWith('.disabled'),
    ids: [], name: '', deps: [], info: [],
    registry: new Set(), data: new Map(), network: new Set(), netOptional: false,
    mixins: new Map(), serverCode: new Map(), events: new Map(), bothEvents: new Map(), kubejs: false, nested: [],
    classes: 0, clientClasses: 0,
  };
  if (zip.has('kubejs.plugins.txt')) r.kubejs = true;

  // Forge metadata
  const toml = text('META-INF/mods.toml');
  if (toml) {
    const t = parseModsToml(toml);
    for (const m of t.mods) if (m.modId) { r.ids.push(m.modId); if (!r.name) r.name = m.displayName || m.modId; }
    if (t.top.clientSideOnly === 'true') r.info.push('clientSideOnly=true');
    for (const m of t.mods) if (m.displayTest) r.info.push('displayTest=' + m.displayTest);
    for (const d of t.deps) {
      const mandatory = d.type ? d.type.toLowerCase() === 'required' : d.mandatory === 'true';
      if (!mandatory || !d.modId || ['forge', 'minecraft', 'neoforge'].includes(d.modId)) continue;
      r.deps.push({ id: d.modId, side: (d.side || 'BOTH').toUpperCase() });
    }
  }
  // Fabric metadata (Sinytra Connector)
  const fmj = text('fabric.mod.json');
  if (fmj) {
    try {
      const j = JSON.parse(fmj.replace(/^﻿/, ''));
      if (!r.ids.length) { r.ids.push(j.id); r.name = j.name || j.id; }
      if (j.environment) r.info.push('fabric environment=' + j.environment);
      for (const id of Object.keys(j.depends || {})) {
        if (/^(minecraft|fabricloader|java|fabric(-api)?|fabric-.*)$/.test(id)) continue;
        r.deps.push({ id, side: 'BOTH' });
      }
    } catch { r.info.push('bad fabric.mod.json'); }
  }
  if (!r.ids.length) { r.name = r.file; r.info.push('no mod metadata (library)'); }
  // multi-loader jars declare the same dependency in mods.toml and fabric.mod.json — keep the first one
  r.deps = r.deps.filter((d, i) => r.deps.findIndex(x => x.id === d.id) === i);

  // mixin configs
  const manifest = text('META-INF/MANIFEST.MF') || '';
  const configs = new Set();
  const mc = manifest.replace(/\r?\n /g, '').match(/^MixinConfigs:\s*(.+)$/m);
  if (mc) mc[1].split(',').map(s => s.trim()).filter(Boolean).forEach(c => configs.add(c));
  if (toml) for (const m of toml.matchAll(/config\s*=\s*["']([^"']+\.json)["']/g)) configs.add(m[1]);
  if (fmj) try { for (const m of JSON.parse(fmj).mixins || []) configs.add(typeof m === 'string' ? m : m.config); } catch { /* ignore */ }
  const serverMixins = new Set(); // class file names of mixins applied on a dedicated server
  for (const c of configs) {
    const raw = text(c);
    if (!raw) continue;
    let j;
    try { j = JSON.parse(raw.replace(/^﻿/, '')); } catch { continue; }
    const pkg = (j.package || '').replace(/\./g, '/');
    for (const list of ['mixins', 'common', 'server']) {
      for (const m of j[list] || []) serverMixins.add(`${pkg}/${m.replace(/\./g, '/')}.class`);
    }
  }

  // data files
  for (const name of zip.keys()) {
    const m = name.match(/^data\/[^/]+\/([^/]+)\/.+[^/]$/);
    if (m) r.data.set(m[1], (r.data.get(m[1]) || 0) + 1);
    if (/^META-INF\/jarjar\/.+\.jar$/.test(name)) r.nested.push(path.basename(name));
  }
  // nested jars (Jar-in-Jar) are removed together with the outer jar, so their signals belong to it
  r.nestedResults = [];
  for (const n of r.nested) {
    try { r.nestedResults.push(analyzeBuffer(zip.get('META-INF/jarjar/' + n)(), n)); } catch (e) { r.info.push(`nested ${n}: ${e.message}`); }
  }

  // classes, pass 1: parse and mark client-side classes — in a client package, @OnlyIn(CLIENT),
  // @EventBusSubscriber(CLIENT), or touching client classes (such a class can't even load on a dedicated server)
  const parsed = [];
  const clientOwn = new Map(); // own class name -> is client-side
  for (const [name, get] of zip) {
    if (!name.endsWith('.class') || name.startsWith('META-INF/')) continue;
    let c;
    try { c = parseClass(get()); } catch { c = null; }
    if (!c) continue;
    let client = /(^|\/)client\//.test(name) || [...c.classes].some(isClientClass);
    for (const a of c.annotations) {
      if (a.type === 'Lnet/minecraftforge/api/distmarker/OnlyIn;' && a.values.value === 'CLIENT') client = true;
      if (a.type === 'Lnet/minecraftforge/fml/common/Mod$EventBusSubscriber;') {
        const v = [].concat(a.values.value || []);
        if (v.length && v.every(x => x === 'CLIENT')) client = true;
      }
    }
    parsed.push({ name, c, client });
    clientOwn.set(name.slice(0, -6), client);
    // global map: mixin targets in other mods are classified once every jar is parsed
    const cn = name.slice(0, -6);
    if (!globalClient.has(cn) || client) globalClient.set(cn, client);
  }

  // pass 2: signals
  const bump = (map, k) => map.set(k, (map.get(k) || 0) + 1);
  for (const { name, c, client } of parsed) {
    r.classes++;
    for (const cl of c.classes) {
      const short = cl.split('/').pop();
      if (REGISTRY_CLASSES.has(cl)) r.registry.add(short);
      if (NETWORK_CLASSES.has(cl)) r.network.add(short);
      if (client) continue; // server code / gameplay events inside client classes run only on the client
      if (isServerClass(cl)) bump(r.serverCode, short);
      if (isGameplayEvent(cl)) bump(r.events, cl.slice('net/minecraftforge/event/'.length));
      if (BOTH_SIDE_EVENTS.has(cl.slice('net/minecraftforge/event/'.length))) bump(r.bothEvents, short);
    }
    if (client) r.clientClasses++;
    if (MOD_FILTER && r.file.toLowerCase().includes(MOD_FILTER)) {
      r.extRefs = r.extRefs || new Map();
      for (const cl of c.classes) {
        if (/^(java|javax|jdk|sun|kotlin|com\/google|org\/apache|org\/slf4j|it\/unimi)\//.test(cl)) continue;
        const pkg = cl.split('/').slice(0, -1).join('/');
        if (zip.has(cl + '.class')) continue;
        r.extRefs.set(pkg, (r.extRefs.get(pkg) || new Set()).add(cl.split('/').pop()));
      }
    }
    for (const [owner, mname, desc] of c.methodDescs) {
      if (REGISTRY_OWNERS.has(owner) && desc.startsWith('(L' + owner + ';')) r.registry.add('Registry.register');
    }
    for (const m of c.members) {
      if (OPTIONAL_NET_MEMBERS.has(m)) r.netOptional = true;
      if (m.startsWith('net/minecraftforge/registries/ForgeRegistries.') && !m.includes('$')) {
        r.registry.forgeRegs = r.registry.forgeRegs || new Set();
        r.registry.forgeRegs.add(m.split('.').pop());
      }
    }
    // a mixin that touches client classes (Minecraft's or the mod's own) does client-side work
    const clientMixin = client || [...c.classes].some(cl => clientOwn.get(cl));
    if (serverMixins.has(name) && !clientMixin) {
      for (const a of c.annotations) {
        if (a.type !== 'Lorg/spongepowered/asm/mixin/Mixin;') continue;
        const targets = [];
        for (const v of [].concat(a.values.value || [])) if (v) targets.push(v.replace(/^L|;$/g, ''));
        for (const v of [].concat(a.values.targets || [])) if (v) targets.push(v.replace(/\./g, '/'));
        for (const t of targets) {
          if (isClientClass(t) || clientOwn.get(t)) continue; // client class, or own class that is client-side
          bump(r.mixins, t);
        }
      }
    }
  }
  return r;
}

// ---------- run ----------
const files = fs.readdirSync(MODS).filter(f => /\.jar(\.disabled)?$/.test(f)).sort((a, b) => a.localeCompare(b));
const jars = [];
for (const f of files) {
  try { jars.push(analyzeJar(path.join(MODS, f))); } catch (e) { console.error(`ERROR: ${f}: ${e.message}`); }
}

const counts = m => [...m].map(([k, v]) => `${k}(${v})`).join(', ');
const firstN = (list, n) => list.slice(0, n).join(', ') + (list.length > n ? `, ... +${list.length - n}` : '');
function signals(r) {
  r.strong = [];
  r.soft = [];
  if (r.registry.size) {
    const regs = r.registry.forgeRegs ? ` [${[...r.registry.forgeRegs].join(', ')}]` : '';
    r.strong.push(`registry: ${[...r.registry].join(', ')}${regs}`);
  }
  if (r.data.size) r.strong.push(`data: ${counts(r.data)}`);
  if (r.kubejs) r.strong.push('kubejs plugin (kubejs.plugins.txt)');
  if (r.network.size) (r.netOptional ? r.soft : r.strong).push(`network${r.netOptional ? '?' : ''}: ${[...r.network].join(', ')}`);
  for (const t of [...r.mixins.keys()]) if (globalClient.get(t)) r.mixins.delete(t); // target is another mod's client class
  if (r.mixins.size) r.strong.push(`mixin: ${r.mixins.size} common target(s): ${firstN([...r.mixins.keys()].map(t => t.split('/').pop()), 8)}`);
  if (r.events.size) r.strong.push(`events: ${firstN([...r.events.keys()], 8)}`);
  if (r.serverCode.size) {
    if (r.bothEvents.size) r.strong.push(`server-side logic: ${[...r.bothEvents.keys()].join(', ')} + ${counts(r.serverCode)}`);
    else r.soft.push(`server-code: ${counts(r.serverCode)}`);
  }
  for (const n of r.nestedResults) {
    signals(n);
    r.strong.push(...n.strong.map(s => `[${n.ids[0] || n.file}] ${s}`));
    r.soft.push(...n.soft.map(s => `[${n.ids[0] || n.file}] ${s}`));
  }
}
jars.forEach(signals);

// dependency propagation: anything a server-side mod requires (side BOTH/SERVER) is needed on the server
const byId = new Map();
// nested mods are provided by the outer jar, but a standalone jar of the same mod wins
for (const r of jars) for (const n of r.nestedResults) for (const id of n.ids) if (!byId.has(id)) byId.set(id, r);
for (const r of jars) for (const id of r.ids) if (!byId.has(id) || byId.get(id).disabled || !byId.get(id).ids.includes(id)) byId.set(id, r);
const serverNeeded = new Set(jars.filter(r => r.strong.length));
const requiredBy = new Map(); // jar -> Set(names of enabled dependents)
for (const r of jars) {
  if (r.disabled) continue;
  for (const d of r.deps) {
    const dep = byId.get(d.id);
    if (!dep || dep === r) continue;
    if (!requiredBy.has(dep)) requiredBy.set(dep, new Set());
    requiredBy.get(dep).add(r);
  }
}
let changed = true;
while (changed) {
  changed = false;
  for (const r of serverNeeded) {
    if (r.disabled) continue;
    for (const d of r.deps) {
      const dep = byId.get(d.id);
      if (dep && d.side !== 'CLIENT' && !serverNeeded.has(dep)) { serverNeeded.add(dep); dep.neededBy = r; changed = true; }
    }
  }
}

const label = r => `${r.name}${r.ids.length ? ` (${r.ids.join(', ')})` : ''} — ${r.file}`;
const clientPct = r => (r.classes ? Math.round((100 * r.clientClasses) / r.classes) : 0);
const details = r => {
  const out = [...r.strong.map(s => '! ' + s), ...r.soft.map(s => '~ ' + s)];
  out.push(`  classes: ${r.classes}, referencing client classes: ${clientPct(r)}%`);
  if (r.info.length) out.push('  info: ' + r.info.join(', '));
  if (r.deps.length) out.push('  requires: ' + r.deps.map(d => d.id + (d.side !== 'BOTH' ? `[${d.side}]` : '')).join(', '));
  const rb = requiredBy.get(r);
  if (rb) out.push('  required by: ' + [...rb].map(x => x.ids[0] || x.file).join(', '));
  if (r.neededBy) out.push(`  needed on server because ${r.neededBy.ids[0] || r.neededBy.file} requires it`);
  if (r.nested.length) out.push('  nested jars: ' + r.nested.join(', '));
  if (r.extRefs) {
    out.push('  external classes used:');
    for (const [pkg, s] of [...r.extRefs].sort()) out.push(`    ${pkg}: ${[...s].sort().join(' ')}`);
  }
  return out.map(s => '      ' + s).join('\n');
};

if (MOD_FILTER) {
  for (const r of jars.filter(j => j.file.toLowerCase().includes(MOD_FILTER))) console.log(label(r) + '\n' + details(r) + '\n');
  process.exit(0);
}

const pure = [], softOnly = [], libs = [], mixinOnly = [];
for (const r of jars) {
  if (serverNeeded.has(r) && !r.neededBy && r.strong.length && r.strong.every(s => /^(\[[^\]]+\] )?mixin:/.test(s))) {
    mixinOnly.push(r); // mixins into common classes may still be client-side work — can't tell automatically
    continue;
  }
  if (serverNeeded.has(r)) {
    // a library with server signals whose every enabled dependent is client-only
    const rb = requiredBy.get(r);
    if (r.strong.length && rb && rb.size && [...rb].every(x => !serverNeeded.has(x)) && !r.neededBy) libs.push(r);
    continue;
  }
  if (!r.ids.length && !requiredBy.get(r)) continue; // plain libraries nobody declares (kotlin, connector) — not a mod decision
  (r.soft.length ? softOnly : pure).push(r);
}
const print = (title, list, withDetails) => {
  console.log(`\n=== ${title}: ${list.length}`);
  for (const r of list) console.log(`  - ${label(r)}${r.disabled ? ' [disabled]' : ''}` + (withDetails || VERBOSE ? '\n' + details(r) : ''));
};
print('Client-only (no server-side signals)', pure, false);
print('Probably client-only (only soft server-side signals — check)', softOnly, true);
print('Only signal is mixins into common classes (check what they do)', mixinOnly, true);
print('Has server signals, but required only by client-only mods (check)', libs, true);
if (VERBOSE) print('Server-side', jars.filter(r => serverNeeded.has(r) && !libs.includes(r) && !mixinOnly.includes(r)), true);
console.log(`\nScanned ${jars.length} jars. Legend: ! strong signal, ~ soft signal. Details for one mod: --mod=<substring>`);

// ---------- --readme: server mod list in README.md ----------
if (README_MODE) {
  const has = (r, set) => r.ids.some(id => set.has(id));
  const picked = [...pure, ...softOnly, ...jars.filter(r => has(r, README_INCLUDE))]
    .filter((r, i, a) => !r.disabled && !has(r, README_EXCLUDE) && a.indexOf(r) === i);
  for (const id of [...README_INCLUDE, ...README_EXCLUDE]) {
    if (!jars.some(r => !r.disabled && r.ids.includes(id))) console.error(`WARN: README_INCLUDE/EXCLUDE: no enabled jar with mod id "${id}"`);
  }
  // version-free mask: cut the file name at the first version-like token; keep the full name if the mask isn't unique
  const enabledFiles = jars.filter(r => !r.disabled).map(r => r.file);
  const esc = s => s.replace(/[.+^${}()|[\]\\]/g, ch => '\\' + ch);
  const matches = (mask, f) => new RegExp('^' + mask.split('*').map(esc).join('.*') + '$').test(f);
  const maskOf = file => {
    const m = file.match(/^(.*?)([-_+ ])(v?\d|mc\d|FORGE_v|forge-1|Forge-1)/);
    const mask = m ? m[1] + m[2] + '*.jar' : file;
    return enabledFiles.filter(f => matches(mask, f)).length === 1 ? mask : file;
  };
  const rows = picked
    .map(r => ({ mask: maskOf(r.file), name: NAME_OVERRIDES[r.ids[0]] || r.name.replace(/\s*\((Forge|Fabric)\)$/i, '') }))
    .sort((a, b) => a.mask.localeCompare(b.mask, 'en', { sensitivity: 'base' }));
  const block = [
    `${README_START} — generated by \`node tools/mods/client_only.js . --readme\`, don't edit by hand -->`,
    '<details>',
    `<summary>Client-only mods (${rows.length})</summary>`,
    '',
    ...rows.map(x => `- \`${x.mask}\` — ${x.name}`),
    '',
    '</details>',
    README_END,
  ];
  const file = path.join(root, 'README.md');
  const raw = fs.readFileSync(file, 'utf8');
  const eol = raw.includes('\r\n') ? '\r\n' : '\n';
  const start = raw.indexOf(README_START), end = raw.indexOf(README_END);
  if (start < 0 || end < start) {
    console.error(`ERROR: README.md has no "${README_START} ... ${README_END}" block`);
    process.exit(1);
  }
  const out = raw.slice(0, start) + block.join(eol) + raw.slice(end + README_END.length);
  if (out === raw) console.log('\nREADME.md: server mod list is up to date');
  else { fs.writeFileSync(file, out); console.log(`\nREADME.md: server mod list rewritten (${rows.length} mods)`); }
}
