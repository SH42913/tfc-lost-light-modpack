// Generator for ESO enchantment recipes (TFC Lost Light).
//
//   node tools/eso/gen_eso.js .                     write recipes + config/eso defaults
//   node tools/eso/gen_eso.js . --list-ids          print every item ID the recipes use
//   node tools/eso/gen_eso.js . --write-stack-dump  write a temporary KubeJS script that logs max stack sizes
//   node tools/eso/gen_eso.js . --read-stack-dump   parse logs/kubejs/server.log into kubejs/probe/stack_sizes.txt
//                                                   and delete the temporary script
//
// Amounts are anchored to the MAX level: the max level of every enchantment costs about the same,
// lower levels step down the same ladder. An ESO table slot holds a single stack, so amounts are
// clamped to the item's max stack size from kubejs/probe/stack_sizes.txt (when it exists).
const fs = require('fs');
const path = require('path');

const root = process.argv[2];
const mode = process.argv[3] || '';
if (!root) { console.error('Usage: node tools/eso/gen_eso.js <instanceRoot> [--list-ids|--write-stack-dump|--read-stack-dump]'); process.exit(1); }

const outDir = path.join(root, 'tfc_structures_datapacks/lost_light_datapack/data/enchanting_system_overhaul/ench-recipes');
const stackFile = path.join(root, 'kubejs/probe/stack_sizes.txt');
const dumpScript = path.join(root, 'kubejs/server_scripts/dump_stack_sizes.js');
const serverLog = path.join(root, 'logs/kubejs/server.log');
const items = new Set(fs.readFileSync(path.join(root, 'kubejs/probe/items.txt'), 'utf8').split(/\r?\n/).filter(Boolean));

// ---------------------------------------------------------------------------------------------
// XP: player levels per operation, by rarity (level index, not anchored to max)
const XP = {
  common:   [1, 2, 3, 5, 7],
  uncommon: [2, 3, 5, 7, 9],
  rare:     [3, 5, 8, 11, 14],
  treasure: [10, 12, 14, 16, 18],
  curse:    [0, 0, 0, 0, 0],
};

// Ladders: an enchantment with N levels takes the LAST N steps. Single-level enchantments use SINGLE.
const LADDER = {
  normal:   { steps: [4, 6, 10, 16, 24, 32], single: 24 },
  valuable: { steps: [6, 10, 16, 24, 32, 48], single: 32 },
};
// Top amount of each slot at the max level: [normal, valuable]. amount = ceil(step / ladderTop * slotTop)
const TOP = {
  junk:      [24, 32],
  lapis:     [8, 12],   // gems; powder = gems * POWDER_PER_GEM
  cheap:     [32, 48],
  medium:    [24, 32],
  expensive: [6, 8],
};
const POWDER_PER_GEM = 4; // 1 lapis gem grinds into 4 powder

// Slot 1: junk base
const JUNK = {
  undead:    ['minecraft:rotten_flesh', 'minecraft:bone', 'aquaculture:fish_bones'],
  rot:       ['tfc:rotten_compost', 'tfc:groundcover/guano', 'minecraft:bone_meal', 'tfc:groundcover/humus'],
  mushrooms: ['minecraft:brown_mushroom', 'minecraft:red_mushroom', 'farmerstfc:brown_mushroom_bunch', 'farmerstfc:red_mushroom_bunch'],
  poison:    ['minecraft:spider_eye', 'minecraft:fermented_spider_eye'],
};

// Slot 4: jewellery metal, anchored to max: the last k levels take the first k steps of the metal ladder.
// k = 3 for 5 levels, 2 for 3-4 levels, 0 for 1-2 levels.
// gold: luck enchantments only; silver: damage vs undead only; any: either metal.
const METAL = {
  silver: { pure: ['tfc:metal/ingot/silver'], alloy: ['tfc:metal/ingot/sterling_silver'] },
  gold:   { pure: ['tfc:metal/ingot/gold'], alloy: ['tfc:metal/ingot/rose_gold'] },
  any:    { pure: ['tfc:metal/ingot/gold', 'tfc:metal/ingot/silver'], alloy: ['tfc:metal/ingot/rose_gold', 'tfc:metal/ingot/sterling_silver'] },
};
const METAL_LADDER = [['pure', 2], ['alloy', 3], ['alloy', 4]];
const metalSteps = (max) => (max >= 5 ? 3 : max >= 3 ? 2 : 0);
// Common metal "physically applied" to the item, from level I (by level index)
const PLAIN_AMOUNT = [2, 3, 4, 5, 6];
const PLAIN = {
  iron:   () => ['tfc:metal/ingot/wrought_iron'],
  tiered: (lvl) => [
    ['tfc:metal/ingot/bronze', 'tfc:metal/ingot/bismuth_bronze', 'tfc:metal/ingot/black_bronze'],
    ['tfc:metal/ingot/wrought_iron'],
    ['tfc:metal/ingot/steel'],
  ][lvl - 1],
};

// ---------------------------------------------------------------------------------------------
// spec: file, enchantment, max level, XP rarity, valuable ladder?, junk group,
//       theme item(s) (array = itemArray), theme value class, metal (null | silver | gold | any | iron | tiered | alloy-any)
const S = (file, id, max, rarity, valuable, junk, theme, cls, metal, dependsOn) =>
  ({ file, id, max, rarity, valuable, junk, theme, cls, metal, dependsOn });
const V = true; // valuable
const N = false; // normal

const SLIME = ['minecraft:slime_ball', 'beneath:raw_slime'];
const CLOTH = ['tfc:wool_cloth', 'tfc:burlap_cloth'];

const specs = [
  // Armor
  S('protection', 'minecraft:protection', 4, 'common', N, 'rot', 'tfc:large_raw_hide', 'expensive', 'any'),
  S('fire-protection', 'minecraft:fire_protection', 4, 'common', N, 'rot', 'tfc:powder/wood_ash', 'cheap', 'any'),
  S('blast-protection', 'minecraft:blast_protection', 4, 'uncommon', N, 'rot', 'tfc:powder/saltpeter', 'cheap', 'any'),
  S('projectile-protection', 'minecraft:projectile_protection', 4, 'common', N, 'rot', CLOTH, 'medium', 'any'),
  S('feather-falling', 'minecraft:feather_falling', 4, 'common', N, 'rot', 'minecraft:feather', 'cheap', 'any'),
  S('thorns', 'minecraft:thorns', 3, 'rare', V, 'poison', ['tfc:plant/barrel_cactus', 'tfc:plant/rose'], 'cheap', 'iron'),
  S('respiration', 'minecraft:respiration', 3, 'uncommon', N, 'undead', 'tfc:blubber', 'medium', 'any'),
  S('aqua-affinity', 'minecraft:aqua_affinity', 1, 'uncommon', N, 'undead', ['tfc:plant/winged_kelp', 'tfc:plant/leafy_kelp', 'tfc:plant/giant_kelp_flower'], 'cheap', null),
  S('depth-strider', 'minecraft:depth_strider', 3, 'uncommon', N, 'undead', ['tfc:groundcover/seaweed', 'tfc:food/dried_kelp'], 'cheap', 'any'),
  S('frost-walker', 'minecraft:frost_walker', 2, 'rare', V, 'mushrooms', 'firmalife:ice_shavings', 'cheap', null),
  S('soul-speed', 'minecraft:soul_speed', 3, 'rare', V, 'mushrooms', ['minecraft:soul_sand', 'minecraft:soul_soil'], 'cheap', 'any'),
  S('swift-sneak', 'minecraft:swift_sneak', 3, 'rare', N, 'mushrooms', 'tfc:wool_yarn', 'cheap', 'any'),
  // Melee
  S('sharpness', 'minecraft:sharpness', 5, 'common', V, 'undead', 'tfc:groundcover/pumice', 'medium', 'any'),
  S('smite', 'minecraft:smite', 5, 'uncommon', V, 'undead', 'tfc:powder/salt', 'cheap', 'silver'),
  S('bane-of-arthropods', 'minecraft:bane_of_arthropods', 5, 'uncommon', N, 'poison', 'tfc:powder/lime', 'cheap', 'any'),
  S('knockback', 'minecraft:knockback', 2, 'uncommon', N, 'undead', SLIME, 'expensive', null),
  S('fire-aspect', 'minecraft:fire_aspect', 2, 'uncommon', N, 'undead', 'tfc:powder/sulfur', 'cheap', null),
  S('looting', 'minecraft:looting', 3, 'rare', V, 'undead', 'tfc:powder/native_gold', 'medium', 'gold'),
  S('sweeping', 'minecraft:sweeping', 3, 'rare', N, 'undead', 'tfc:powder/graphite', 'cheap', 'any'),
  // Tools
  S('efficiency', 'minecraft:efficiency', 5, 'common', V, 'rot', 'tfc:powder/graphite', 'cheap', 'any'),
  S('unbreaking', 'minecraft:unbreaking', 3, 'rare', V, 'rot', 'tfc:glue', 'medium', 'tiered'),
  S('fortune', 'minecraft:fortune', 3, 'rare', V, 'mushrooms', ['tfc:powder/ruby', 'tfc:powder/sapphire', 'tfc:powder/emerald', 'tfc:powder/topaz', 'tfc:powder/opal'], 'medium', 'gold'),
  S('silk-touch', 'minecraft:silk_touch', 1, 'rare', V, 'mushrooms', 'tfc:silk_cloth', 'expensive', null),
  // minecraft:mending intentionally omitted: excluded from the pack (also stripped from loot by KubeJS)
  // Bow / crossbow
  S('power', 'minecraft:power', 5, 'common', N, 'undead', 'tfc_arch:paper_fletching', 'medium', 'any'),
  S('punch', 'minecraft:punch', 2, 'uncommon', N, 'undead', SLIME, 'expensive', null),
  S('flame', 'minecraft:flame', 1, 'uncommon', N, 'undead', 'tfc:powder/sulfur', 'cheap', null),
  S('infinity', 'minecraft:infinity', 1, 'treasure', V, 'mushrooms', 'tfc_arch:stone_arrow', 'medium', 'alloy-any'),
  S('multishot', 'minecraft:multishot', 1, 'treasure', V, 'undead', 'tfc_arch:paper_fletching', 'medium', null),
  S('piercing', 'minecraft:piercing', 4, 'uncommon', N, 'undead', 'tfc_arch:bone_arrowhead', 'medium', 'any'),
  S('quick-charge', 'minecraft:quick_charge', 3, 'uncommon', N, 'undead', 'tfc:wool_yarn', 'cheap', 'any'),
  // Trident-likes
  S('loyalty', 'minecraft:loyalty', 3, 'uncommon', N, 'undead', 'tfc:goat_horn', 'expensive', 'any'),
  S('impaling', 'minecraft:impaling', 5, 'uncommon', N, 'undead', ['tfc:groundcover/sea_urchin', 'tfc:groundcover/mussel', 'tfc:groundcover/clam'], 'cheap', 'any'),
  S('riptide', 'minecraft:riptide', 3, 'treasure', V, 'undead', 'tfc:blubber', 'medium', 'any'),
  S('channeling', 'minecraft:channeling', 1, 'treasure', V, 'mushrooms', 'tfc:metal/rod/copper', 'medium', null),
  // Fishing
  S('luck-of-the-sea', 'minecraft:luck_of_the_sea', 3, 'uncommon', N, 'undead', ['tfc:food/tropical_fish', 'tfc:food/shellfish'], 'medium', 'gold'),
  S('lure', 'minecraft:lure', 3, 'uncommon', N, 'rot', 'aquaculture:worm', 'cheap', 'any'),
  // Mods
  S('create-capacity', 'create:capacity', 3, 'uncommon', N, 'rot', 'tfc:burlap_cloth', 'medium', 'any', ['create']),
  S('create-potato-recovery', 'create:potato_recovery', 3, 'uncommon', N, 'rot', 'tfc:food/potato', 'cheap', 'any', ['create']),
  // farmersdelight:backstabbing intentionally omitted: applies only to FD KnifeItem, which is unobtainable in the pack
  S('supplementaries-stasis', 'supplementaries:stasis', 1, 'rare', V, 'mushrooms', SLIME, 'expensive', null, ['supplementaries']),
  // Enchanting With TFC (max levels unknown -> recipe up to V, extra levels are just unused)
  S('ewt-crushing-protection', 'enchanting_with_tfc:crushing_protection', 5, 'common', N, 'rot', 'tfc:large_raw_hide', 'expensive', 'any', ['enchanting_with_tfc']),
  S('ewt-piercing-protection', 'enchanting_with_tfc:piercing_protection', 5, 'common', N, 'rot', CLOTH, 'medium', 'any', ['enchanting_with_tfc']),
  S('ewt-slashing-protection', 'enchanting_with_tfc:slashing_protection', 5, 'common', N, 'rot', 'minecraft:leather', 'medium', 'any', ['enchanting_with_tfc']),
  S('ewt-hunting', 'enchanting_with_tfc:hunting', 5, 'uncommon', N, 'undead', 'tfc:powder/native_silver', 'medium', 'gold', ['enchanting_with_tfc']),
  S('ewt-slow-aspect', 'enchanting_with_tfc:slow_aspect', 5, 'uncommon', N, 'poison', 'minecraft:fermented_spider_eye', 'medium', 'any', ['enchanting_with_tfc']),
];

// Curses: cheap, junk only, 0 XP, fixed amounts (no ladder). The +1 enchantment slot is the trade-off.
const C = (file, id, junk, theme, themeAmount, dependsOn) => ({ file, id, junk, junkAmount: 16, theme, themeAmount, dependsOn });
const MC = ['mocurses'];
const curses = [
  C('curse-of-binding', 'minecraft:binding_curse', 'poison', 'tfc:rotten_compost', 8),
  C('curse-of-vanishing', 'minecraft:vanishing_curse', 'poison', 'minecraft:rotten_flesh', 16),
  // More Curses. Disabled in config/mocurses_common.toml and intentionally without a recipe (hidden in the table):
  //   curseof_the_golden_touch (turns TFC tools/armor into vanilla golden ones), curseof_station (TFC is full of
  //   standing still; drops vanilla anvils, explosions), curseof_betrayal (shield-only effect, but applies to any
  //   breakable item = free slot), curseof_voiding (needs another mod).
  C('mocurses-apnea', 'mocurses:curseof_apnea', 'poison', 'tfc:groundcover/seaweed', 8, MC),
  C('mocurses-flammability', 'mocurses:curseof_flammability', 'poison', 'tfc:powder/sulfur', 8, MC),
  C('mocurses-frost-imprisonment', 'mocurses:curseof_frost_imprisonment', 'poison', 'firmalife:ice_shavings', 16, MC),
  C('mocurses-floating', 'mocurses:curseof_floating', 'poison', 'minecraft:feather', 8, MC),
  C('mocurses-withering', 'mocurses:curseof_withering', 'poison', 'minecraft:bone', 16, MC),
  C('mocurses-deterioration', 'mocurses:curseof_deterioration', 'poison', 'tfc:rotten_compost', 8, MC),
  C('mocurses-hordes', 'mocurses:curseof_hordes', 'poison', 'minecraft:rotten_flesh', 16, MC),
  C('mocurses-notice', 'mocurses:curseof_notice', 'undead', 'minecraft:spider_eye', 8, MC),
  C('mocurses-disorder', 'mocurses:curseof_disorder', 'rot', 'minecraft:fermented_spider_eye', 4, MC),
  C('mocurses-teleportation', 'mocurses:curseof_teleportation', 'poison', 'tfc:powder/lapis_lazuli', 4, MC),
  C('mocurses-zone', 'mocurses:curseof_zone', 'poison', 'tfc:straw', 16, MC),
  C('mocurses-movement', 'mocurses:curseof_movement', 'poison', 'minecraft:bone_meal', 16, MC),
];

// ---------------------------------------------------------------------------------------------
// Stack sizes (optional)
const stacks = new Map();
if (fs.existsSync(stackFile)) {
  for (const line of fs.readFileSync(stackFile, 'utf8').split(/\r?\n/)) {
    const [id, n] = line.trim().split(/\s+/);
    if (id && n) stacks.set(id, Number(n));
  }
}

const missing = new Set();
const used = new Set();
const clamped = [];
let currentFile = '';
// Clamp n to the smallest stack among `list`, so every variant of an itemArray costs the same.
function clamp(list, n) {
  for (const id of list) { if (!items.has(id)) missing.add(id); used.add(id); }
  const known = list.map((id) => stacks.get(id)).filter((v) => v !== undefined);
  if (!known.length) return n;
  const max = Math.min(...known);
  if (n > max) { clamped.push(`${currentFile}: ${list.join(' / ')} ${n} -> ${max}`); return max; }
  return n;
}
const one = (id, n) => ({ id, amount: clamp([id], n) });
const arr = (list, n) => { const c = clamp(list, n); return { itemArray: list.map((id) => ({ id, amount: c })) }; };
const ids = (list, n) => (list.length === 1 ? one(list[0], n) : arr(list, n));

// Ladder step for level l (1-based) of an enchantment with `max` levels, scaled to a slot top.
function scaled(s, l, slot) {
  const lad = LADDER[s.valuable ? 'valuable' : 'normal'];
  const top = lad.steps[lad.steps.length - 1];
  const step = s.max === 1 ? lad.single : lad.steps[lad.steps.length - s.max + (l - 1)];
  return Math.max(1, Math.ceil((step / top) * TOP[slot][s.valuable ? 1 : 0]));
}

function lapisSlot(gems) {
  return { itemArray: [one('tfc:gem/lapis_lazuli', gems), one('tfc:powder/lapis_lazuli', gems * POWDER_PER_GEM)] };
}

function metalSlot(s, l) {
  if (!s.metal) return null;
  if (s.metal === 'alloy-any') return arr(['tfc:metal/ingot/rose_gold', 'tfc:metal/ingot/sterling_silver'], 1);
  if (PLAIN[s.metal]) return ids(PLAIN[s.metal](l), PLAIN_AMOUNT[l - 1]);
  const k = metalSteps(s.max);
  const first = s.max - k + 1; // first level that needs metal
  if (l < first) return null;
  const [kind, n] = METAL_LADDER[l - first];
  return ids(METAL[s.metal][kind], n);
}

function build(s) {
  currentFile = s.file;
  const levels = {};
  const xp = {};
  for (let l = 1; l <= s.max; l++) {
    const slots = [
      arr(JUNK[s.junk], scaled(s, l, 'junk')),
      lapisSlot(scaled(s, l, 'lapis')),
      Array.isArray(s.theme) ? arr(s.theme, scaled(s, l, s.cls)) : one(s.theme, scaled(s, l, s.cls)),
    ];
    const m = metalSlot(s, l);
    if (m) slots.push(m);
    levels[l] = slots;
    xp[l] = XP[s.rarity][l - 1];
  }
  const out = { enchantment_id: s.id };
  if (s.dependsOn) out.dependsOn = s.dependsOn;
  return Object.assign(out, { maxLevel: 0, useExpPoints: false, xp, levels });
}

function buildCurse(c) {
  currentFile = c.file;
  const out = { enchantment_id: c.id };
  if (c.dependsOn) out.dependsOn = c.dependsOn;
  return Object.assign(out, {
    maxLevel: 0,
    useExpPoints: false,
    xp: { 1: 0 },
    levels: { 1: [arr(JUNK[c.junk], c.junkAmount), one(c.theme, c.themeAmount)] },
  });
}

// Default recipe (config/eso) — only used if enableDefaultRecipe is turned back on. Normal ladder, 5 levels.
function buildDefault() {
  currentFile = 'default-recipe';
  const s = { max: 5, valuable: false };
  const def = {};
  for (let l = 1; l <= 5; l++) {
    def[l] = [
      arr(JUNK.mushrooms, scaled(s, l, 'junk')),
      lapisSlot(scaled(s, l, 'lapis')),
      one('tfc:powder/amethyst', scaled(s, l, 'cheap')),
    ];
    const m = metalSlot({ ...s, metal: 'any' }, l);
    if (m) def[l].push(m);
  }
  return def;
}

const recipes = specs.map((s) => [s.file, build(s)]).concat(curses.map((c) => [c.file, buildCurse(c)]));
const defaultRecipe = buildDefault();

// ---------------------------------------------------------------------------------------------
if (mode === '--list-ids') {
  console.log([...used].sort().join('\n'));
  process.exit(0);
}

if (mode === '--write-stack-dump') {
  const list = [...used].sort();
  const js = `// TEMPORARY: generated by tools/eso/gen_eso.js --write-stack-dump.
// Logs max stack sizes of ESO recipe ingredients; parse with --read-stack-dump (which also deletes this file).
const ESO_STACK_IDS = ${JSON.stringify(list, null, 4)};

ServerEvents.loaded(() => {
    for (const id of ESO_STACK_IDS) {
        console.info(\`[eso-stack] \${id} \${Item.of(id).maxStackSize}\`);
    }
});
`;
  fs.writeFileSync(dumpScript, js);
  console.log(`written ${path.relative(root, dumpScript)} (${list.length} ids). Start the game, load a world, then run --read-stack-dump.`);
  process.exit(0);
}

if (mode === '--read-stack-dump') {
  const found = new Map();
  for (const line of fs.readFileSync(serverLog, 'utf8').split(/\r?\n/)) {
    const m = line.match(/\[eso-stack\] (\S+) (\d+)/);
    if (m) found.set(m[1], Number(m[2]));
  }
  const absent = [...used].filter((id) => !found.has(id));
  if (absent.length) { console.error('No stack size in server.log for:', absent.join(', ')); process.exit(1); }
  const lines = [...found.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([id, n]) => `${id} ${n}`);
  fs.writeFileSync(stackFile, lines.join('\n') + '\n');
  if (fs.existsSync(dumpScript)) fs.unlinkSync(dumpScript);
  console.log(`written ${path.relative(root, stackFile)} (${lines.length} ids), removed the temporary script. Now run the generator.`);
  console.log(lines.filter((l) => !l.endsWith(' 64')).join('\n'));
  process.exit(0);
}

if (mode) { console.error('Unknown option', mode); process.exit(1); }

if (missing.size) { console.error('Missing item IDs (not in kubejs/probe/items.txt):', [...missing].join(', ')); process.exit(1); }

const written = new Set();
for (const [file, json] of recipes) {
  fs.writeFileSync(path.join(outDir, file + '.json'), JSON.stringify(json, null, 2) + '\n');
  written.add(file + '.json');
}
for (const f of fs.readdirSync(outDir)) if (!written.has(f)) console.log('NOT REGENERATED (delete by hand if obsolete):', f);

fs.writeFileSync(path.join(root, 'config/eso/default-recipe.json'), JSON.stringify(defaultRecipe, null, 2) + '\n');
const xpMap = { useExpPoints: false, xp: Object.fromEntries(XP.common.map((v, i) => [String(i + 1), v])) };
fs.writeFileSync(path.join(root, 'config/eso/default-xp-map.json'), JSON.stringify(xpMap, null, 2) + '\n');

console.log('written', written.size, 'recipes');
if (!stacks.size) console.log('WARN: kubejs/probe/stack_sizes.txt not found, amounts are NOT checked against stack sizes (see --write-stack-dump)');
else {
  const unknown = [...used].filter((id) => !stacks.has(id)).sort();
  if (unknown.length) console.log('WARN: no stack size in stack_sizes.txt (not checked, re-dump with --write-stack-dump):', unknown.join(', '));
}
for (const c of clamped) console.log('WARN clamped to stack size:', c);
