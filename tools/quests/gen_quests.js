// Generator for FTB Quests (TFC Lost Light).
// Usage: node tools/quests/gen_quests.js <instanceRoot>          - regenerate quests, lang and custom-task script
//        node tools/quests/gen_quests.js <instanceRoot> --pull   - copy quest positions from the game's SNBT into layout.json
//
// Sources: tools/quests/chapters/*.js (quest content), groups.js (chapter groups), tables.js (reward tables),
//          layout.json (positions).
// Output (overwritten entirely):
//   config/ftbquests/quests/{data.snbt, chapter_groups.snbt, chapters/*.snbt, reward_tables/*.snbt}
//   kubejs/assets/lost_light/lang/{en_us,ru_ru}.json
//   kubejs/server_scripts/quests_custom.js            (only when custom tasks exist)
//   tfc_structures_datapacks/lost_light_datapack/data/lost_light/tags/worldgen/{structure,biome}/quests/*.json
//                                                     (tags for structure/biome tasks given as a list of ids)
// Texts go to lang files; SNBT holds "{key}", which FTB Library resolves with I18n.
const fs = require('fs');
const path = require('path');
const eco = require('../economy/economy');
const { stableId, idLong, toSNBT, parseSNBT, L, D, B, F } = require('./lib');

const root = process.argv[2];
if (!root) throw new Error('usage: node gen_quests.js <instanceRoot> [--pull]');
const PULL = process.argv.includes('--pull');

const HERE = __dirname;
const QUEST_DIR = path.join(root, 'config/ftbquests/quests');
const LANG_DIR = path.join(root, 'kubejs/assets/lost_light/lang');
const CUSTOM_JS = path.join(root, 'kubejs/server_scripts/quests_custom.js');
const DATAPACK = path.join(root, 'tfc_structures_datapacks/lost_light_datapack');
const GEN_TAG_DIR = (kind) => path.join(DATAPACK, 'data/lost_light/tags', ['entity_types', 'blocks'].includes(kind) ? kind : 'worldgen/' + kind, 'quests');
const LAYOUT = path.join(HERE, 'layout.json');
const LANG_PREFIX = 'quests.lost_light';

// ---------- load sources ----------
const chapters = fs.readdirSync(path.join(HERE, 'chapters')).filter((f) => f.endsWith('.js'))
  .map((f) => require(path.join(HERE, 'chapters', f)))
  .sort((a, b) => (a.order ?? 99) - (b.order ?? 99) || a.key.localeCompare(b.key));
const layout = fs.existsSync(LAYOUT) ? JSON.parse(fs.readFileSync(LAYOUT, 'utf8')) : {};
const optionalSrc = (f) => (fs.existsSync(path.join(HERE, f)) ? require(path.join(HERE, f)) : []);
const groups = optionalSrc('groups.js').slice().sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
const tables = optionalSrc('tables.js');

const errors = [];
const warns = [];
const err = (m) => errors.push(m);
const warn = (m) => warns.push(m);

// quest path "chapter/key" -> {chapter, quest}
const byPath = new Map();
for (const ch of chapters) {
  if (!/^[a-z0-9_]+$/.test(ch.key)) err(`chapter key "${ch.key}": only [a-z0-9_]`);
  for (const q of ch.quests) {
    const p = ch.key + '/' + q.key;
    if (!/^[a-z0-9_]+$/.test(q.key)) err(`${p}: quest key must be [a-z0-9_]`);
    if (byPath.has(p)) err(`${p}: duplicate quest key`);
    byPath.set(p, { ch, q });
  }
}

// ---------- --pull: positions from the game into layout.json ----------
if (PULL) {
  const idToPath = new Map([...byPath.keys()].map((p) => [stableId(p), p]));
  for (const ch of chapters) for (const l of ch.links || []) idToPath.set(stableId(`link/${ch.key}/${l.target}`), `${ch.key}/@${l.target}`);
  const out = { ...layout };
  let moved = 0, foreign = 0;
  for (const f of fs.readdirSync(path.join(QUEST_DIR, 'chapters'))) {
    const ch = parseSNBT(fs.readFileSync(path.join(QUEST_DIR, 'chapters', f), 'utf8'));
    for (const q of [...(ch.quests || []), ...(ch.quest_links || [])]) {
      const p = idToPath.get(q.id);
      if (!p) { foreign++; console.log(`WARN quest ${q.id} in ${f} is not in the sources (made in game?) - ignored`); continue; }
      const pos = [q.x, q.y];
      if (!out[p] || out[p][0] !== pos[0] || out[p][1] !== pos[1]) moved++;
      out[p] = pos;
    }
  }
  writeLayout(out);
  console.log(`layout.json: ${moved} position(s) updated${foreign ? `, ${foreign} unknown quest(s) ignored` : ''}`);
  process.exit(0);
}

function writeLayout(obj) {
  const keys = Object.keys(obj).sort();
  const body = keys.map((k) => `  ${JSON.stringify(k)}: [${obj[k][0]}, ${obj[k][1]}]`).join(',\n');
  fs.writeFileSync(LAYOUT, '{\n' + body + '\n}\n');
}

// ---------- registries & tags ----------
const items = eco.loadItems(root);
const readSet = (f) => new Set(fs.readFileSync(path.join(root, 'kubejs/probe', f), 'utf8').split(/\r?\n/).filter(Boolean));
const blocks = readSet('blocks.txt');
const entities = readSet('entities.txt');
const DIMENSIONS = new Set(['minecraft:overworld', 'minecraft:the_nether', 'minecraft:the_end']);
// vanilla custom statistics usable in stat() tasks (minecraft:custom registry)
const STATS = new Set(['walk_one_cm', 'sprint_one_cm', 'crouch_one_cm', 'swim_one_cm', 'walk_on_water_one_cm', 'walk_under_water_one_cm',
  'climb_one_cm', 'fall_one_cm', 'fly_one_cm', 'boat_one_cm', 'horse_one_cm', 'pig_one_cm', 'minecart_one_cm', 'aviate_one_cm',
  'jump', 'play_time', 'sleep_in_bed', 'time_since_death', 'deaths', 'mob_kills', 'animals_bred', 'fish_caught', 'traded_with_villager',
  'talked_to_villager', 'open_chest', 'damage_dealt', 'damage_taken', 'bell_ring', 'raid_win', 'eat_cake_slice'].map((x) => 'minecraft:' + x));

// Zip central directory listing (names only) - jars can be big, so read just the tail.
function zipNames(file) {
  const fd = fs.openSync(file, 'r');
  try {
    const size = fs.fstatSync(fd).size;
    const tailLen = Math.min(size, 65557);
    const tail = Buffer.alloc(tailLen);
    fs.readSync(fd, tail, 0, tailLen, size - tailLen);
    let e = tailLen - 22;
    while (e >= 0 && tail.readUInt32LE(e) !== 0x06054b50) e--;
    if (e < 0) return [];
    const cdSize = tail.readUInt32LE(e + 12), cdOff = tail.readUInt32LE(e + 16);
    const cd = Buffer.alloc(cdSize);
    fs.readSync(fd, cd, 0, cdSize, cdOff);
    const names = [];
    for (let p = 0; p + 46 <= cd.length && cd.readUInt32LE(p) === 0x02014b50;) {
      const n = cd.readUInt16LE(p + 28), x = cd.readUInt16LE(p + 30), c = cd.readUInt16LE(p + 32);
      names.push(cd.toString('utf8', p + 46, p + 46 + n));
      p += 46 + n + x + c;
    }
    return names;
  } finally { fs.closeSync(fd); }
}
const tags = { items: new Set(), blocks: new Set(), 'worldgen/structure': new Set(), 'worldgen/biome': new Set() };
const TAG_RE = /^data\/([^/]+)\/tags\/(items|blocks|worldgen\/structure|worldgen\/biome)\/(.+)\.json$/;
// Advancements of mods and the pack datapack, for advancement() tasks (vanilla ones live in the game jar - not checked).
const advancements = new Set();
const ADV_RE = /^data\/([^/]+)\/advancements\/(.+)\.json$/;
const addTagPath = (rel) => {
  const m = TAG_RE.exec(rel);
  if (m && !m[3].startsWith('quests/')) tags[m[2]].add(m[1] + ':' + m[3]);
  const a = ADV_RE.exec(rel);
  if (a) advancements.add(a[1] + ':' + a[2]);
};
for (const f of fs.readdirSync(path.join(root, 'mods')).filter((f) => f.endsWith('.jar'))) {
  try { zipNames(path.join(root, 'mods', f)).forEach(addTagPath); } catch (e) { warn(`cannot list ${f}: ${e.message}`); }
}
(function walk(dir, base) {
  if (!fs.existsSync(dir)) return;
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) walk(full, base); else addTagPath(path.relative(base, full).split(path.sep).join('/'));
  }
})(path.join(root, 'tfc_structures_datapacks/lost_light_datapack'), path.join(root, 'tfc_structures_datapacks/lost_light_datapack'));
// Tags created by KubeJS (event.add('ns:tag', ...)) - can't tell items from blocks, accept for both.
for (const f of fs.readdirSync(path.join(root, 'kubejs/server_scripts')).filter((f) => f.endsWith('.js'))) {
  for (const m of fs.readFileSync(path.join(root, 'kubejs/server_scripts', f), 'utf8').matchAll(/\.add\(\s*['"]#?([a-z0-9_.-]+:[a-z0-9_/.-]+)['"]/g)) {
    tags.items.add(m[1]); tags.blocks.add(m[1]);
  }
}

// Biomes: Featurify dump. Structures: what tfc_structures actually generates
// (biomeTags[].structures + defaultWorldgenStructures - disabledStructures).
const biomes = new Set((() => {
  const b = JSON.parse(fs.readFileSync(path.join(root, 'kubejs/probe/featurify_dump.json'), 'utf8')).biomes;
  return (Array.isArray(b) ? b : Object.entries(b).map(([k, v]) => ({ name: k, ...v }))).map((x) => x.name);
})());
const structureWhere = new Map(); // structure id -> [tfc_structures biome tag ids | 'vanilla']
const structuresOff = new Set();
(() => {
  const wg = JSON.parse(fs.readFileSync(path.join(root, 'config/tfc_structures/worldgen_config.json'), 'utf8'));
  for (const t of wg.biomeTags) for (const st of t.structures || []) (structureWhere.get(st) || structureWhere.set(st, []).get(st)).push(t.id);
  for (const st of wg.defaultWorldgenStructures || []) if (!structureWhere.has(st)) structureWhere.set(st, ['vanilla']);
  for (const st of wg.disabledStructures || []) structuresOff.add(st);
})();
// Generated worldgen tags: kind -> name -> [ids]
const genTags = { structure: {}, biome: {}, entity_types: {}, blocks: {} };
function worldgenRef(kind, v, where, name) {
  const ids = [].concat(v);
  for (const id of ids) {
    if (id.startsWith('#')) {
      if (!tags['worldgen/' + kind].has(id.slice(1)) && !VANILLA_TAG.test(id.slice(1))) err(`${where}: unknown ${kind} tag ${id}`);
    } else if (kind === 'biome') {
      if (!biomes.has(id)) err(`${where}: unknown biome ${id}`);
    } else if (structuresOff.has(id)) err(`${where}: structure ${id} is disabled in tfc_structures`);
    else if (!structureWhere.has(id)) err(`${where}: structure ${id} is not generated by tfc_structures (no biomeTags entry)`);
  }
  if (!Array.isArray(v)) return v;
  genTags[kind][name] = ids;
  return `#lost_light:quests/${name}`;
}

// ---------- item specs ----------
// Vanilla/Forge tags live outside mods/ (the game jar, Forge libraries) - not checked.
const VANILLA_TAG = /^(minecraft|forge):/;
const FILTER_ITEM = 'ftbfiltersystem:smart_filter';
function checkSpec(spec, where) {
  if (typeof spec === 'string') {
    if (spec.startsWith('#')) { if (!tags.items.has(spec.slice(1)) && !VANILLA_TAG.test(spec.slice(1))) err(`${where}: unknown item tag ${spec}`); }
    else if (!items.has(spec)) err(`${where}: unknown item ${spec}`);
  } else if (spec && spec.anyOf) spec.anyOf.forEach((s) => checkSpec(s, where));
  else err(`${where}: bad item spec ${JSON.stringify(spec)}`);
}
const filterStr = (spec) => (typeof spec === 'string'
  ? (spec.startsWith('#') ? `item_tag(${spec.slice(1)})` : `item(${spec})`)
  : `or(${spec.anyOf.map(filterStr).join('')})`);
const firstPlain = (spec) => (typeof spec === 'string' ? (spec.startsWith('#') ? null : spec) : spec.anyOf.map(firstPlain).find(Boolean));
const itemNBT = (spec) => (typeof spec === 'string' && !spec.startsWith('#')
  ? spec
  : { id: FILTER_ITEM, Count: B(1), tag: { 'ftbfiltersystem:filter': filterStr(spec) } });

// ---------- lang ----------
const lang = { ru_ru: {}, en_us: {} };
function addText(k, t, where) {
  if (t == null) return undefined;
  if (typeof t === 'string') t = { ru: t, en: t };
  if (!t.ru) err(`${where}: missing ru text`);
  if (!t.en) warn(`${where}: missing en text (ru used)`);
  lang.ru_ru[k] = t.ru || t.en;
  lang.en_us[k] = t.en || t.ru;
  return `{${k}}`;
}
function addLines(k, d, where) {
  if (!d) return undefined;
  const ru = d.ru || [], en = d.en || [];
  if (!d.en) warn(`${where}: missing en description (ru used)`);
  else if (en.length !== ru.length) warn(`${where}: ru/en description line counts differ (${ru.length}/${en.length})`);
  const n = Math.max(ru.length, en.length);
  const out = [];
  for (let i = 0; i < n; i++) {
    const r = ru[i] ?? '', e = (d.en ? en[i] : ru[i]) ?? '';
    if (!r && !e) { out.push(''); continue; }
    lang.ru_ru[`${k}.${i}`] = r || e;
    lang.en_us[`${k}.${i}`] = e || r;
    out.push(`{${k}.${i}}`);
  }
  return out;
}

// ---------- build ----------
const OBSERVE_TYPE = { block: 0, block_tag: 1, entity_type: 5, entity_type_tag: 6 };
const customTasks = [];

function buildTask(t, i, qp, lk) {
  const where = `${qp} task#${i}`;
  const o = { id: stableId(`${qp}/task#${i}`), type: t.type };
  if (t.title) o.title = addText(`${lk}.task${i}`, t.title, where);
  if (t.optional) o.optional_task = true;
  let icon = t.icon;
  switch (t.type) {
    case 'item':
      checkSpec(t.spec, where);
      o.item = itemNBT(t.spec);
      if (t.count > 1) o.count = L(t.count);
      if (t.consume) o.consume_items = true;
      if (t.crafted) o.only_from_crafting = true;
      if (!icon && typeof o.item !== 'string') icon = firstPlain(t.spec);
      if (typeof o.item !== 'string' && !t.title) warn(`${where}: tag/anyOf task without a title (FTB shows "Smart Filter")`);
      break;
    case 'kill':
      if (!entities.has(t.entity)) err(`${where}: unknown entity ${t.entity}`);
      o.entity = t.entity; o.value = L(t.count);
      break;
    case 'observation': {
      let kind = t.observe, target = t.target;
      if ((kind === 'entity_type' || kind === 'block') && Array.isArray(target)) {
        // a list of entity types / blocks becomes a generated tag
        const reg = kind === 'block' ? blocks : entities;
        for (const e of target) if (!reg.has(e)) err(`${where}: unknown ${kind} ${e}`);
        const name = `${qp.replace('/', '_')}_${i}`;
        genTags[kind === 'block' ? 'blocks' : 'entity_types'][name] = target;
        kind = kind === 'block' ? 'block_tag' : 'entity_type_tag'; target = `lost_light:quests/${name}`;
      } else {
        const ok = kind === 'block' ? blocks.has(target) : kind === 'block_tag' ? tags.blocks.has(target) || VANILLA_TAG.test(target) : entities.has(target);
        if (!ok) err(`${where}: unknown ${kind} ${target}`);
      }
      o.observe_type = OBSERVE_TYPE[kind]; o.to_observe = target; o.timer = L(t.ticks ?? 20);
      break;
    }
    case 'dimension':
      if (!DIMENSIONS.has(t.dimension)) warn(`${where}: dimension ${t.dimension} not in the known list`);
      o.dimension = t.dimension; break;
    case 'biome': o.biome = worldgenRef('biome', t.biome, where, `${qp.replace('/', '_')}_${i}`); break;
    case 'structure': o.structure = worldgenRef('structure', t.structure, where, `${qp.replace('/', '_')}_${i}`); break;
    case 'advancement':
      if (!VANILLA_TAG.test(t.advancement) && !advancements.has(t.advancement)) err(`${where}: unknown advancement ${t.advancement}`);
      o.advancement = t.advancement; o.criterion = t.criterion; break;
    case 'checkmark': break;
    case 'stat':
      if (!STATS.has(t.stat)) err(`${where}: unknown statistic ${t.stat}`);
      o.stat = t.stat; o.value = t.value;
      if (t.value > 2147483647) err(`${where}: stat value over int range`);
      break;
    case 'custom':
      for (const e of [...(t.onKill || []), ...(t.onKillWith || []), ...(t.onDeathBy || []), ...(t.onSelfKillWith || [])]) if (!entities.has(e)) err(`${where}: unknown entity ${e}`);
      if (!t.check && !t.onKill && !t.onKillWith && !t.onDeathBy && !t.onSelfKillWith) err(`${where}: custom task without check, onKill, onKillWith, onDeathBy or onSelfKillWith`);
      customTasks.push({ id: o.id, where, ...t });
      break;
    default: err(`${where}: unknown task type ${t.type}`);
  }
  if (icon) { if (!items.has(icon)) err(`${where}: unknown icon ${icon}`); o.icon = icon; }
  return o;
}

function buildReward(r, i, qp, lk, budgeted = true) {
  const where = `${qp} reward#${i}`;
  const o = { id: stableId(`${qp}/reward#${i}`), type: r.type };
  if (r.title) o.title = addText(`${lk}.reward${i}`, r.title, where);
  let worth = 0;
  switch (r.type) {
    case 'item':
      checkSpec(r.spec, where);
      if (typeof r.spec !== 'string' || r.spec.startsWith('#')) err(`${where}: reward must be a plain item id`);
      o.item = r.nbt ? { id: r.spec, Count: B(1), tag: r.nbt } : r.spec;
      if (r.count > 1) o.count = r.count;
      worth = (eco.value(r.spec) || 0) * r.count;
      if (!eco.value(r.spec) && budgeted) warn(`${where}: ${r.spec} has no economy value`);
      break;
    case 'xp': o.xp = r.amount; break;
    case 'xp_levels': o.xp_levels = r.levels; break;
    case 'command':
      o.command = r.command;
      if (r.elevate) o.elevate_perms = true;
      if (r.silent) o.silent = true;
      if (r.icon) o.icon = r.icon;
      break;
    case 'random': case 'choice': case 'all_table': case 'loot': {
      const t = tableByKey.get(r.table);
      if (!t) { err(`${where}: unknown reward table ${r.table}`); break; }
      if (r.type === 'loot' && !t.crate) err(`${where}: table ${r.table} has no crate`);
      o.table_id = L(idLong(stableId('table/' + r.table)));
      worth = r.type === 'all_table' ? t.worthAll : r.type === 'choice' ? t.worthMax : t.worthAvg * (r.type === 'loot' ? t.lootSize : 1);
      break;
    }
    default: err(`${where}: unknown reward type ${r.type}`);
  }
  if (r.auto) o.auto = r.auto;
  if (r.team) o.team_reward = true;
  return { o, worth };
}

// Auto layout for quests without a position: column = dependency depth inside the chapter,
// each quest wants the mean row of its dependencies (fewer crossing lines); quests keep their order
// by that wish, are pushed apart to STEP and the column is shifted so the average offset is zero.
// Positioned quests (layout.json) stay put; new ones avoid their rows.
const STEP = 1.5;
const snap = (v) => Math.round(v / STEP) * STEP;
function autoLayout(ch) {
  const local = new Map(ch.quests.map((q) => [q.key, q]));
  const depsOf = (q) => (q.deps || []).filter((d) => !d.includes('/') && local.has(d));
  const depth = new Map();
  const depthOf = (k, seen = new Set()) => {
    if (depth.has(k)) return depth.get(k);
    if (seen.has(k)) return 0;
    seen.add(k);
    const ds = depsOf(local.get(k));
    const v = ds.length ? 1 + Math.max(...ds.map((d) => depthOf(d, seen))) : 0;
    depth.set(k, v);
    return v;
  };
  const cols = [];
  for (const q of ch.quests) (cols[depthOf(q.key)] ||= []).push(q);
  const pos = {};
  cols.forEach((col, x) => {
    if (!col) return;
    const placed = col.filter((q) => layout[`${ch.key}/${q.key}`]);
    const used = new Set(placed.map((q) => layout[`${ch.key}/${q.key}`][1]));
    const free = col.filter((q) => !layout[`${ch.key}/${q.key}`]);
    const want = (q) => { const ds = depsOf(q).map((d) => (pos[d] || layout[`${ch.key}/${d}`] || [0, 0])[1]); return ds.length ? ds.reduce((a, b) => a + b, 0) / ds.length : 0; };
    for (const q of placed) pos[q.key] = layout[`${ch.key}/${q.key}`];
    const wish = free.map((q, i) => ({ q, w: want(q), i })).sort((a, b) => a.w - b.w || a.i - b.i);
    // push apart, then center on the wishes
    const ys = [];
    wish.forEach((e, i) => { ys[i] = i ? Math.max(e.w, ys[i - 1] + STEP) : e.w; });
    const shift = wish.length ? wish.reduce((s, e, i) => s + e.w - ys[i], 0) / wish.length : 0;
    wish.forEach((e, i) => {
      let y = snap(ys[i] + shift);
      while (used.has(y)) y += STEP;
      if (i && y <= pos[wish[i - 1].q.key][1]) y = pos[wish[i - 1].q.key][1] + STEP;
      pos[e.q.key] = [x * STEP, y]; used.add(y);
    });
  });
  return pos;
}

// ---------- reward tables ----------
const files = {};
const tableByKey = new Map();
tables.forEach((t, ti) => {
  const where = `table ${t.key}`;
  if (!/^[a-z0-9_]+$/.test(t.key)) err(`${where}: key must be [a-z0-9_]`);
  if (tableByKey.has(t.key)) err(`${where}: duplicate table`);
  const entries = t.entries || [];
  const vals = entries.map((e, i) => {
    checkSpec(e.spec, `${where} entry#${i}`);
    if (!eco.value(e.spec)) warn(`${where} entry#${i}: ${e.spec} has no economy value`);
    return (eco.value(e.spec) || 0) * e.count;
  });
  const wsum = entries.reduce((s2, e) => s2 + e.weight, 0) || 1;
  const info = {
    ...t,
    lootSize: t.lootSize ?? 1,
    worthAvg: Math.round(entries.reduce((s2, e, i) => s2 + vals[i] * e.weight, 0) / wsum),
    worthMax: Math.max(0, ...vals),
    worthAll: vals.reduce((a, b) => a + b, 0),
  };
  tableByKey.set(t.key, info);
  if (!entries.length) err(`${where}: no entries`);
  if (t.icon && !items.has(t.icon)) err(`${where}: unknown icon ${t.icon}`);
  files[`reward_tables/${t.key}.snbt`] = {
    id: stableId('table/' + t.key),
    order_index: ti,
    title: addText(`${LANG_PREFIX}.table.${t.key}`, t.title, where),
    icon: t.icon,
    loot_size: info.lootSize,
    use_title: t.title ? true : undefined,
    rewards: entries.map((e) => ({
      item: e.spec,
      count: e.count > 1 ? e.count : undefined,
      weight: e.weight !== 1 ? F(e.weight) : undefined,
    })),
    loot_crate: t.crate ? {
      string_id: t.key,
      item_name: t.crate.name ? addText(`${LANG_PREFIX}.crate.${t.key}`, t.crate.name, where) : undefined,
      color: t.crate.color ?? 0xFFFFFF,
      glow: t.crate.glow || undefined,
      drops: { passive: 0, monster: 0, boss: 0 },
    } : undefined,
  };
});

let autoPlaced = 0;
const budgetRows = [];
const newLayout = { ...layout };
chapters.forEach((ch, ci) => {
  const clk = `${LANG_PREFIX}.${ch.key}`;
  const quests = [];
  const auto = autoLayout(ch);
  for (const q of ch.quests) {
    const qp = `${ch.key}/${q.key}`;
    const lk = `${clk}.${q.key}`;
    if (!q.title) err(`${qp}: no title`);
    let pos = layout[qp];
    if (!pos) { pos = auto[q.key]; newLayout[qp] = pos; autoPlaced++; }
    const deps = (q.deps || []).map((d) => {
      const dp = d.includes('/') ? d : `${ch.key}/${d}`;
      if (!byPath.has(dp)) err(`${qp}: unknown dependency ${d}`);
      return stableId(dp);
    });
    if (!q.tasks || !q.tasks.length) err(`${qp}: no tasks`);
    if (q.hidden && !['deps_visible', 'deps_complete', 'invisible'].includes(q.hidden)) err(`${qp}: bad hidden ${q.hidden}`);
    if (q.icon && !items.has(q.icon)) err(`${qp}: unknown icon ${q.icon}`);
    const rewards = (q.rewards || []).map((r, i) => buildReward(r, i, qp, lk, q.budget != null));
    const worth = rewards.reduce((s, r) => s + r.worth, 0);
    if (q.budget != null) {
      budgetRows.push([qp, q.budget, worth]);
      if (worth > q.budget * 1.5 || worth < q.budget / 1.5) warn(`${qp}: rewards worth ${worth}, budget ${q.budget}`);
    }
    quests.push({
      id: stableId(qp),
      title: addText(`${lk}.title`, q.title, qp),
      subtitle: addText(`${lk}.subtitle`, q.subtitle, qp),
      description: addLines(`${lk}.desc`, q.desc, qp),
      icon: q.icon,
      x: D(pos[0]), y: D(pos[1]),
      dependencies: deps.length ? deps : undefined,
      min_required_dependencies: q.minDeps,
      optional: q.optional || undefined,
      hide_until_deps_visible: q.hidden === 'deps_visible' || undefined,
      hide_until_deps_complete: q.hidden === 'deps_complete' || undefined,
      invisible: q.hidden === 'invisible' || undefined,
      shape: q.shape,
      size: q.size != null ? D(q.size) : undefined,
      tasks: (q.tasks || []).map((t, i) => buildTask(t, i, qp, lk)),
      rewards: rewards.length ? rewards.map((r) => r.o) : undefined,
    });
  }
  // quest links: shown in this chapter, positioned like quests ("chapter/@target" in layout.json);
  // by default in a column left of the chapter (they are usually what the chapter starts from)
  const minX = Math.min(0, ...quests.map((q) => q.x.v));
  const links = (ch.links || []).map((l, li) => {
    const lp = `${ch.key}/@${l.target}`;
    if (!byPath.has(l.target)) err(`chapter ${ch.key}: link to unknown quest ${l.target}`);
    let pos = layout[lp];
    if (!pos) { pos = [minX - STEP, li * STEP]; newLayout[lp] = pos; autoPlaced++; }
    return { id: stableId(`link/${ch.key}/${l.target}`), linked_quest: stableId(l.target), x: D(pos[0]), y: D(pos[1]) };
  });
  if (ch.group && !groups.some((g) => g.key === ch.group)) err(`chapter ${ch.key}: unknown group ${ch.group}`);
  files[`chapters/${ch.key}.snbt`] = {
    id: stableId('chapter/' + ch.key),
    group: ch.group ? stableId('group/' + ch.group) : '',
    order_index: chapters.filter((c) => (c.group || '') === (ch.group || '')).indexOf(ch),
    hide_quest_until_deps_visible: ch.hideUntilDepsVisible || undefined,
    filename: ch.key,
    title: addText(`${clk}.title`, ch.title, ch.key),
    subtitle: ch.subtitle ? addLines(`${clk}.subtitle`, { ru: [ch.subtitle.ru], en: ch.subtitle.en && [ch.subtitle.en] }, ch.key) : undefined,
    icon: ch.icon,
    default_quest_shape: '',
    default_hide_dependency_lines: false,
    quest_links: links,
    quests,
  };
  if (ch.icon && !items.has(ch.icon)) err(`chapter ${ch.key}: unknown icon ${ch.icon}`);
});

// dependency cycles
(function () {
  const state = new Map();
  const visit = (p, stack) => {
    if (state.get(p) === 2) return;
    if (state.get(p) === 1) { err('dependency cycle: ' + [...stack, p].join(' -> ')); return; }
    state.set(p, 1);
    const { ch, q } = byPath.get(p);
    for (const d of q.deps || []) { const dp = d.includes('/') ? d : `${ch.key}/${d}`; if (byPath.has(dp)) visit(dp, [...stack, p]); }
    state.set(p, 2);
  };
  for (const p of byPath.keys()) visit(p, []);
})();

// dependency smells
(function () {
  const killed = (q) => new Set((q.tasks || []).flatMap((t) => (t.type === 'kill' ? [t.entity] : t.onKill || [])));
  for (const [p, { ch, q }] of byPath) {
    const mine = killed(q);
    for (const d of q.deps || []) {
      const dp = d.includes('/') ? d : `${ch.key}/${d}`;
      const dep = byPath.get(dp);
      if (!dep) continue;
      // a required quest behind an optional one silently makes the optional one required
      if (dep.q.optional && !q.optional) warn(`${p}: required quest depends on optional ${dp}`);
      // kill tasks get no progress while the quest is locked: a mob killed for the dependency would not count here
      const both = [...killed(dep.q)].filter((e) => mine.has(e));
      if (both.length) warn(`${p}: kills of ${both.join(', ')} for ${dp} will not count here (the quest is locked until then)`);
    }
  }
})();

files['data.snbt'] = {
  version: 13,
  title: addText(`${LANG_PREFIX}.title`, { ru: 'Квесты', en: 'Quests' }, 'file'),
  default_reward_team: false,
  default_consume_items: false,
  default_autoclaim_rewards: 'disabled',
  default_quest_shape: 'circle',
  default_quest_disable_jei: false,
  emergency_items_cooldown: 300,
  drop_loot_crates: false,
  loot_crate_no_drop: { passive: 0, monster: 0, boss: 0 },
  disable_gui: false,
  grid_scale: D(0.5),
  pause_game: false,
  lock_message: '',
  progression_mode: 'linear',
  detection_delay: 20,
  drop_book_on_death: false,
  show_lock_icons: true,
  hide_excluded_quests: false,
};
files['chapter_groups.snbt'] = {
  // groups without chapters are left out (they would show up empty in the book)
  chapter_groups: groups.filter((g) => chapters.some((c) => c.group === g.key)).map((g) => {
    if (g.icon && !items.has(g.icon)) err(`group ${g.key}: unknown icon ${g.icon}`);
    return { id: stableId('group/' + g.key), title: addText(`${LANG_PREFIX}.group.${g.key}`, g.title, 'group ' + g.key), icon: g.icon };
  }),
};

// ---------- report & write ----------
for (const w of warns) console.log('WARN ' + w);
if (process.env.SHOW_BUDGET) for (const [p, b, w] of budgetRows) console.log(`${p.padEnd(40)} budget ${String(b).padStart(6)}  rewards ${String(w).padStart(6)}`);
if (errors.length) {
  for (const e of errors) console.log('ERROR ' + e);
  console.log(`${errors.length} error(s), nothing written`);
  process.exit(1);
}

fs.rmSync(path.join(QUEST_DIR, 'chapters'), { recursive: true, force: true });
fs.rmSync(path.join(QUEST_DIR, 'reward_tables'), { recursive: true, force: true });
for (const [rel, obj] of Object.entries(files)) {
  const f = path.join(QUEST_DIR, rel);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, toSNBT(obj) + '\n');
}

for (const kind of ['structure', 'biome', 'entity_types', 'blocks']) {
  fs.rmSync(GEN_TAG_DIR(kind), { recursive: true, force: true });
  for (const [name, ids] of Object.entries(genTags[kind])) {
    fs.mkdirSync(GEN_TAG_DIR(kind), { recursive: true });
    fs.writeFileSync(path.join(GEN_TAG_DIR(kind), name + '.json'), JSON.stringify({ replace: false, values: ids }, null, 2) + '\n');
  }
}

fs.mkdirSync(LANG_DIR, { recursive: true });
for (const [l, obj] of Object.entries(lang)) {
  const sorted = Object.fromEntries(Object.keys(obj).sort().map((k) => [k, obj[k]]));
  fs.writeFileSync(path.join(LANG_DIR, l + '.json'), JSON.stringify(sorted, null, 2) + '\n');
}

if (customTasks.length) {
  // a task either has a periodic check, or gets progress from a game event (onKill: the death handler below)
  const body = customTasks.map((t) => [
    `// ${t.where}`,
    `FTBQuestsEvents.customTask('${t.id}', event => {`,
    `  event.maxProgress = ${t.max ?? 1}`,
    ...(t.check ? [
      `  event.setCheckTimer(${t.timer ?? 20})`,
      // an exception thrown from a check reaches the player tick and crashes the server, so every check is guarded
      // (the body stays a function of its own, so its const/let scoping is exactly what the helpers in custom.js expect)
      `  const check = (task, player) => {`,
      ...t.check.trim().split('\n').map((l) => '    ' + l),
      `  }`,
      `  event.setCheck((task, player) => {`,
      `    try {`,
      `      check(task, player)`,
      `    } catch (e) {`,
      `      console.error('quest task ${t.where}: ' + e)`,
      `    }`,
      `  })`,
    ] : []),
    `})`,
  ].join('\n')).join('\n\n');
  // kills of any of several entity types (FTB kill tasks take a single type) and deaths of the player to an entity type
  const taskMap = (field) => {
    const m = {};
    for (const t of customTasks.filter((x) => x[field])) for (const e of t[field]) (m[e] ||= []).push(t.id);
    return `{\n${Object.keys(m).sort().map((k) => `  '${k}': [${m[k].map((id) => `'${id}'`).join(', ')}],`).join('\n')}\n}`;
  };
  const anyDeathTasks = customTasks.some((x) => x.onKill || x.onKillWith || x.onDeathBy || x.onSelfKillWith);
  const killJs = anyDeathTasks ? `

// Tasks driven by deaths, keyed by entity type:
// - QUEST_KILL_TASKS: a player kills an entity of the type;
// - QUEST_KILL_WITH_TASKS: a player kills any entity with a projectile of the type (the damage source's direct entity);
// - QUEST_DIED_TO_TASKS: a player is killed by an entity of the type (an explosion counts as its source, e.g. a creeper);
// - QUEST_SELF_KILL_WITH_TASKS: a player is killed by their own projectile of the type (e.g. a brick thrown straight up).
// addProgress ignores tasks of quests the team can't start yet.
const QUEST_KILL_TASKS = ${taskMap('onKill')}
const QUEST_KILL_WITH_TASKS = ${taskMap('onKillWith')}
const QUEST_DIED_TO_TASKS = ${taskMap('onDeathBy')}
const QUEST_SELF_KILL_WITH_TASKS = ${taskMap('onSelfKillWith')}
const questAddProgress = (player, tasks) => {
  let data = FTBQuests.getServerDataFromPlayer(player)
  for (let i = 0; i < tasks.length; i++) data.addProgress(tasks[i], 1)
}
EntityEvents.death(event => {
  let source = event.source
  if (event.entity.isPlayer()) {
    // KubeJS name for DamageSource.getEntity(): the entity responsible (an explosion counts as its source)
    let attacker = source.actual
    let diedTasks = attacker ? QUEST_DIED_TO_TASKS[String(attacker.type)] : null
    if (diedTasks) questAddProgress(event.entity, diedTasks)
    // killed by their own projectile: the owner is the player themself, the direct entity is the projectile
    let ownProjectile = source.immediate
    let selfTasks = ownProjectile && attacker && String(attacker.uuid) == String(event.entity.uuid)
      ? QUEST_SELF_KILL_WITH_TASKS[String(ownProjectile.type)] : null
    if (selfTasks) questAddProgress(event.entity, selfTasks)
    return
  }
  let player = source.player
  if (!player) return
  let tasks = QUEST_KILL_TASKS[String(event.entity.type)]
  if (tasks) questAddProgress(player, tasks)
  // KubeJS name for DamageSource.getDirectEntity(): the projectile itself (an arrow, a thrown brick...)
  let direct = source.immediate
  let withTasks = direct ? QUEST_KILL_WITH_TASKS[String(direct.type)] : null
  if (withTasks) questAddProgress(player, withTasks)
})` : '';
  fs.writeFileSync(CUSTOM_JS, '// Generated by tools/quests/gen_quests.js - do not edit, edit tools/quests/chapters/*.js instead.\n'
    + '// Custom FTB Quests tasks (needs FTB XMod Compat).\n\n' + body + killJs + '\n');
} else fs.rmSync(CUSTOM_JS, { force: true });

// layout.json: drop positions of removed quests; with --save-layout also store auto-placed ones
const SAVE_LAYOUT = process.argv.includes('--save-layout');
const linkKeys = new Set(chapters.flatMap((c) => (c.links || []).map((l) => `${c.key}/@${l.target}`)));
const stale = Object.keys(layout).filter((p) => !byPath.has(p) && !linkKeys.has(p));
if (stale.length || (SAVE_LAYOUT && autoPlaced)) {
  const out = SAVE_LAYOUT ? newLayout : { ...layout };
  for (const p of stale) delete out[p];
  writeLayout(out);
  if (stale.length) console.log(`layout.json: removed ${stale.length} position(s) of deleted quests`);
}
if (autoPlaced && !SAVE_LAYOUT) console.log(`${autoPlaced} quest(s) auto-placed; run with --save-layout to keep these positions in layout.json`);

const nQ = chapters.reduce((s, c) => s + c.quests.length, 0);
console.log(`${chapters.length} chapter(s), ${nQ} quest(s), ${tables.length} table(s), ${Object.keys(lang.ru_ru).length} lang key(s), ${customTasks.length} custom task(s)`
  + (autoPlaced ? `, ${autoPlaced} auto-placed` : '') + `, ${warns.length} warning(s)`);
