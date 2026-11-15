// One-shot importer: Heracles quests (TerraFirmaAdventure) -> draft chapter sources for gen_quests.js.
// Usage: node tools/quests/import_heracles.js <instanceRoot> <heraclesQuestsDir> [--force]
//   e.g. node tools/quests/import_heracles.js . "../TerraFirmaAdventure (OxMODPACK TFC)/config/heracles/quests"
// Writes tools/quests/chapters/<chapter>.js (positions are not imported: gen_quests.js lays quests out by dependencies). Refuses to overwrite existing
// chapter files without --force: after the import the chapters are edited by hand and this script is history.
// Prints what was dropped (quests of mods missing in Lost Light, mmorpg rewards, unknown IDs).
const fs = require('fs');
const path = require('path');
const eco = require('../economy/economy');

const [root, srcDir] = process.argv.slice(2);
if (!root || !srcDir) throw new Error('usage: node import_heracles.js <instanceRoot> <heraclesQuestsDir> [--force]');
const FORCE = process.argv.includes('--force');
const OUT = path.join(__dirname, 'chapters');

// Heracles file (folder/name) -> [chapter, new key]. Quests not listed here are dropped.
const RENAME = {
  'terrafirmacraft/start': ['tfc', 'welcome'],
  'terrafirmacraft/test2': ['tfc', 'sticks_and_stones'],
  'terrafirmacraft/test4': ['tfc', 'clay'],
  'terrafirmacraft/test7': ['tfc', 'fire'],
  'terrafirmacraft/malachite': ['tfc', 'first_ores'],
  'terrafirmacraft/lotok': ['tfc', 'panning'],
  'terrafirmacraft/sosud': ['tfc', 'vessel'],
  'terrafirmacraft/ugol': ['tfc', 'charcoal_pit'],
  'terrafirmacraft/tool': ['tfc', 'copper_pickaxe'],
  'terrafirmacraft/saw': ['tfc', 'saw'],
  'terrafirmacraft/bronza': ['tfc', 'bronze'],
  'terrafirmacraft/kuznica': ['tfc', 'charcoal_forge'],
  'terrafirmacraft/food': ['tfc', 'food'],
  'terrafirmacraft/bowl': ['tfc', 'pot_and_grill'],
  'terrafirmacraft/soup': ['tfc', 'soup'],
  'terrafirmacraft/lampa': ['tfc', 'lamps'],
  'terrafirmacraft/sandwich': ['tfc', 'sandwich'],
  'terrafirmacraft/water': ['tfc', 'water_flask'],
  'terrafirmacraft/animals': ['tfc', 'animals'],
  'terrafirmacraft/dairy': ['tfc', 'dairy'],
  'terrafirmacraft/cheese': ['tfc', 'cheese'],
  'terrafirmacraft/simple_bed': ['tfc', 'thatch_bed'],
  'terrafirmacraft/bucket': ['tfc', 'wooden_bucket'],
  'terrafirmacraft/bochka': ['tfc', 'barrels'],
  'terrafirmacraft/kanoe': ['tfc', 'kayak'],
  'terrafirmacraft/opora': ['tfc', 'support_beams'],
  'terrafirmacraft/obresh': ['tfc', 'wattle'],
  'terrafirmacraft/build': ['tfc', 'daub'],
  'terrafirmacraft/rock': ['tfc', 'raw_rock'],
  'terrafirmacraft/anvil': ['tfc', 'stone_anvil'],
  'terrafirmacraft/meha': ['tfc', 'bellows'],
  'terrafirmacraft/kaolinit': ['tfc', 'kaolin_and_graphite'],
  'terrafirmacraft/tigel': ['tfc', 'crucible'],
  'terrafirmacraft/iron': ['tfc', 'wrought_iron'],
  'terrafirmacraft/iron_anvil': ['tfc', 'iron_anvil'],
  'terrafirmacraft/steel': ['tfc', 'steel'],
  'terrafirmacraft/blue_steel': ['tfc', 'blue_and_red_steel'],
  'terrafirmacraft/smoothrock': ['tfc', 'chiseling'],
  'terrafirmacraft/alabastr': ['tfc', 'alabaster'],
  'terrafirmacraft/cement': ['tfc', 'concrete'],
  'terrafirmacraft/vereteno': ['tfc', 'spindle'],
  'terrafirmacraft/backpack': ['tfc', 'sacks'],
  'terrafirmacraft/bed': ['tfc', 'bed'],
  'terrafirmacraft/koja': ['tfc', 'leather'],
  'terrafirmacraft/stekloduv': ['tfc', 'glassblowing'],
  'terrafirmacraft/latun': ['tfc', 'brass'],
  'terrafirmacraft/bottle': ['tfc', 'glass_bottle'],
  'terrafirmacraft/glass': ['tfc', 'glass'],
  'terrafirmacraft/compass': ['tfc', 'navigation'],
  'terrafirmacraft/barometer': ['tfc', 'barometer'],
  'terrafirmacraft/aqua': ['tfc', 'aqueducts'],
  'terrafirmacraft/pumps': ['tfc', 'pumps'],
  'terrafirmacraft/waterwheel': ['tfc', 'water_wheel'],
  'terrafirmacraft/automatization': ['tfc', 'automation'],
  'firmalife/fruit_trees': ['firmalife', 'fruit_trees'],
  'firmalife/bees': ['firmalife', 'beekeeping'],
  'firmalife/carts': ['firmalife', 'carts'],
  'firmalife/chocolate': ['firmalife', 'chocolate'],
  'firmalife/duhovka': ['firmalife', 'oven'],
  'firmalife/kashpo': ['firmalife', 'planters'],
  'firmalife/podval': ['firmalife', 'cellar'],
  'firmalife/roasting': ['firmalife', 'drying'],
  'firmalife/teplica': ['firmalife', 'greenhouse'],
  'firmalife/weather2': ['firmalife', 'weather'],
  'dlctropics/pineapple': ['firmalife', 'pineapple'],
  'create/ore': ['create', 'crushed_nickel'],
  'create/shesterni': ['create', 'cogwheels'],
  'create/base_mechs': ['create', 'basic_mechanisms'],
  'create/advanced_mechs': ['create', 'advanced_mechanisms'],
  'create/ultimate': ['create', 'ore_excavation'],
};
const CHAPTERS = {
  tfc: { order: 0, title: "{ ru: 'TerraFirmaCraft', en: 'TerraFirmaCraft' }", icon: 'tfc:metal/pickaxe/copper' },
  firmalife: { order: 1, title: "{ ru: 'Firmalife', en: 'Firmalife' }", icon: 'firmalife:food/pineapple' },
  create: { order: 2, title: "{ ru: 'Create', en: 'Create' }", icon: 'create:cogwheel' },
};
// Item ID replacements for things that exist in Lost Light under another ID.
const ITEM_SWAP = { 'kubejs:crushed_nickel_ore': 'create:crushed_raw_nickel' };
const SCALE = 40; // Heracles px -> FTB grid units
const RECIPE_TO_ITEM = (r) => r.replace(/^([a-z0-9_]+):crafting\//, '$1:');

const items = eco.loadItems(root);
const readSet = (f) => new Set(fs.readFileSync(path.join(root, 'kubejs/probe', f), 'utf8').split(/\r?\n/).filter(Boolean));
const blocks = readSet('blocks.txt');
const entities = readSet('entities.txt');

const report = [];
const src = {};
for (const d of fs.readdirSync(srcDir)) for (const f of fs.readdirSync(path.join(srcDir, d))) {
  if (f.endsWith('.json')) src[`${d}/${f.slice(0, -5)}`] = JSON.parse(fs.readFileSync(path.join(srcDir, d, f), 'utf8'));
}
for (const k of Object.keys(src)) if (!RENAME[k]) report.push(`dropped quest ${k}`);
for (const k of Object.keys(RENAME)) if (!src[k]) throw new Error(`RENAME: ${k} not found in ${srcDir}`);

const q = JSON.stringify;
const str = (s) => "'" + s.replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";
const tr = (t) => (t && t.translate) || (typeof t === 'string' ? t : '');
const swap = (id) => ITEM_SWAP[id] || id;
const itemOk = (id) => id.startsWith('#') || items.has(id);

function task(t, where) {
  const title = t.title ? `, { title: { ru: ${str(t.title)} } }` : '';
  switch (t.type) {
    case 'heracles:item': case 'heracles:item_interaction': {
      const id = swap(t.item);
      if (!itemOk(id)) { report.push(`${where}: dropped task, unknown item ${id}`); return null; }
      const opts = [];
      if (t.collection === 'MANUAL') opts.push('consume: true');
      if (t.type === 'heracles:item_interaction') opts.push('/* was: use item */');
      return `item(${str(id)}, ${t.amount || 1}${opts.length ? `, { ${opts.join(', ')} }` : ''})`;
    }
    case 'heracles:recipe': {
      const id = swap(RECIPE_TO_ITEM(t.recipes[0]));
      if (!items.has(id)) { report.push(`${where}: dropped recipe task ${t.recipes[0]}`); return null; }
      return `item(${str(id)}, 1, { crafted: true${t.title ? `, title: { ru: ${str(t.title)} }` : ''} })`;
    }
    case 'heracles:kill_entity': {
      const e = t.entity.type || t.entity;
      if (!entities.has(e)) { report.push(`${where}: dropped kill task, unknown entity ${e}`); return null; }
      return `kill(${str(e)}, ${t.amount || 1}${title})`;
    }
    case 'heracles:entity_interaction': {
      const e = t.entity.type || t.entity;
      if (!entities.has(e)) { report.push(`${where}: dropped task, unknown entity ${e}`); return null; }
      return `observe.entity(${str(e)}${title})`;
    }
    case 'heracles:block_interaction':
      if (t.block.startsWith('#')) return `observe.blockTag(${str(t.block)}${title})`;
      if (!blocks.has(t.block)) { report.push(`${where}: dropped task, unknown block ${t.block}`); return null; }
      return `observe.block(${str(t.block)}${title})`;
    case 'heracles:changed_dimension': return `dimension(${str(t.to)})`;
    case 'heracles:check': return 'checkmark()';
    default: report.push(`${where}: dropped task of type ${t.type}`); return null;
  }
}

function rewardLines(j, where) {
  const out = [];
  for (const r of Object.values(j.rewards || {})) {
    if (r.type === 'heracles:item') {
      const id = swap(r.item.id);
      if (items.has(id)) out.push(`reward(${str(id)}, ${r.item.count || 1}),`);
      else out.push(`// TFA: ${id} x${r.item.count || 1}`);
    } else out.push(`// TFA: command ${r.command}`);
  }
  if (out.some((l) => l.startsWith('//'))) report.push(`${where}: rewards need a rework`);
  return out;
}

// positions: scale, then center each chapter on (0, 0) rounded to 0.5
const layout = {};
const byChapter = {};
for (const [k, [ch, key]] of Object.entries(RENAME)) (byChapter[ch] ||= []).push([k, key]);
for (const [ch, list] of Object.entries(byChapter)) {
  const pos = list.map(([k]) => Object.values(src[k].display.groups)[0].position);
  const cx = (Math.min(...pos.map((p) => p[0])) + Math.max(...pos.map((p) => p[0]))) / 2;
  const cy = (Math.min(...pos.map((p) => p[1])) + Math.max(...pos.map((p) => p[1]))) / 2;
  list.forEach(([, key], i) => {
    layout[`${ch}/${key}`] = [Math.round(((pos[i][0] - cx) / SCALE) * 2) / 2, Math.round(((pos[i][1] - cy) / SCALE) * 2) / 2];
  });
}

for (const [ch, list] of Object.entries(byChapter)) {
  const file = path.join(OUT, ch + '.js');
  if (fs.existsSync(file) && !FORCE) { console.log(`skip ${file}: exists (use --force)`); continue; }
  // order by position: top to bottom, left to right
  list.sort((a, b) => layout[`${ch}/${a[1]}`][1] - layout[`${ch}/${b[1]}`][1] || layout[`${ch}/${a[1]}`][0] - layout[`${ch}/${b[1]}`][0]);
  const blocksOut = list.map(([k, key]) => {
    const j = src[k];
    const where = `${ch}/${key}`;
    const deps = j.dependencies.map((d) => {
      const full = Object.keys(src).find((s) => s.endsWith('/' + d) && RENAME[s]);
      if (!full) { report.push(`${where}: dropped dependency ${d}`); return null; }
      const [dch, dkey] = RENAME[full];
      return dch === ch ? dkey : `${dch}/${dkey}`;
    }).filter(Boolean);
    const tasks = Object.entries(j.tasks).map(([tk, t]) => task(t, `${where} task ${tk}`)).filter(Boolean);
    const icon = j.display.icon && j.display.icon.item && swap(j.display.icon.item.id);
    const desc = (j.display.description || []).map((l) => '      ' + str(l) + ',').join('\n');
    return [
      `  quest(${str(key)}, {`,
      `    from: ${str(k)},`,
      `    title: { ru: ${str(tr(j.display.title))} },`,
      tr(j.display.subtitle) ? `    subtitle: { ru: ${str(tr(j.display.subtitle))} },` : null,
      `    desc: {\n      ru: [\n${desc.replace(/^ {6}/gm, '        ')}\n      ],\n    },`,
      icon && items.has(icon) ? `    icon: ${str(icon)},` : `    // icon: TFA ${icon}`,
      `    deps: [${deps.map(str).join(', ')}],`,
      `    tasks: [\n${tasks.map((t) => '      ' + t + ',').join('\n')}\n    ],`,
      `    rewards: [\n${rewardLines(j, where).map((l) => '      ' + l).join('\n')}\n    ],`,
      `  }),`,
    ].filter((l) => l != null).join('\n');
  });
  const c = CHAPTERS[ch];
  fs.mkdirSync(OUT, { recursive: true });
  fs.writeFileSync(file, [
    `// Chapter "${ch}". Imported from TerraFirmaAdventure (Heracles) by import_heracles.js, then edited by hand.`,
    `const { chapter, quest, item, anyOf, kill, observe, dimension, checkmark, custom, reward, xp } = require('../lib');`,
    '',
    `module.exports = chapter(${str(ch)}, {`,
    `  order: ${c.order},`,
    `  title: ${c.title},`,
    `  icon: ${str(c.icon)},`,
    `  quests: [`,
    blocksOut.join('\n\n'),
    `  ],`,
    `});`,
    '',
  ].join('\n'));
  console.log(`wrote ${file} (${list.length} quests)`);
}

for (const r of report) console.log('  ' + r);
