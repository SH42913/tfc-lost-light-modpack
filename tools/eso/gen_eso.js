// One-off generator for ESO recipes (TFC Lost Light). Usage: node gen_eso.js <instanceRoot>
const fs = require('fs');
const path = require('path');

const root = process.argv[2];
const outDir = path.join(root, 'tfc_structures_datapacks/lost_light_datapack/data/enchanting_system_overhaul/ench-recipes');
const items = new Set(fs.readFileSync(path.join(root, 'kubejs/probe/items.txt'), 'utf8').split(/\r?\n/).filter(Boolean));

// --- XP (player levels per operation) ---
const XP = {
  common:   [1, 2, 3, 5, 7],
  uncommon: [2, 3, 5, 7, 9],
  rare:     [3, 5, 8, 11, 14],
  treasure: [10, 12, 14, 16, 18],
  curse:    [0, 0, 0, 0, 0],
};

// --- Slot 1: junk base ---
const JUNK = {
  undead:    ['minecraft:rotten_flesh', 'minecraft:bone', 'aquaculture:fish_bones'],
  rot:       ['tfc:rotten_compost', 'tfc:groundcover/guano', 'minecraft:bone_meal', 'tfc:groundcover/humus'],
  mushrooms: ['minecraft:brown_mushroom', 'minecraft:red_mushroom', 'farmerstfc:brown_mushroom_bunch', 'farmerstfc:red_mushroom_bunch'],
  poison:    ['minecraft:spider_eye', 'minecraft:fermented_spider_eye'],
};
const JUNK_AMOUNT = [8, 16, 24, 32, 48];

// --- Slot 2: lapis catalyst (gem or powder x2) ---
const LAPIS_AMOUNT = [2, 4, 6, 8, 12];

// 1 lapis gem grinds into 4 powder
const POWDER_PER_GEM = 4;

// --- Slot 4: jewellery metal from level III (III: pure metal, IV-V: alloy) ---
// gold: luck enchantments only; silver: damage vs undead only; any: either metal
const METAL = {
  silver: [['tfc:metal/ingot/silver'], ['tfc:metal/ingot/sterling_silver']],
  gold:   [['tfc:metal/ingot/gold'], ['tfc:metal/ingot/rose_gold']],
  any:    [['tfc:metal/ingot/gold', 'tfc:metal/ingot/silver'], ['tfc:metal/ingot/rose_gold', 'tfc:metal/ingot/sterling_silver']],
};
const METAL_AMOUNT = { 3: 2, 4: 3, 5: 4 };
// Common metal "physically applied" to the item, from level I
const PLAIN_AMOUNT = [2, 3, 4, 5, 6];
const PLAIN = {
  iron:   () => ['tfc:metal/ingot/wrought_iron'],
  tiered: (lvl) => [
    ['tfc:metal/ingot/bronze', 'tfc:metal/ingot/bismuth_bronze', 'tfc:metal/ingot/black_bronze'],
    ['tfc:metal/ingot/wrought_iron'],
    ['tfc:metal/ingot/steel'],
  ][lvl - 1],
};

// Theme item: either a single id or array of ids (itemArray). amounts per level.
// spec: [file, enchId, maxLevel, rarity, junk, theme, themeAmounts, metal|null, dependsOn?]
const S = (file, id, max, rarity, junk, theme, amt, metal, dependsOn) => ({ file, id, max, rarity, junk, theme, amt, metal, dependsOn });
const A = (...a) => a;

const specs = [
  // Armor
  S('protection', 'minecraft:protection', 4, 'common', 'rot', 'tfc:treated_hide', A(1, 2, 3, 4), 'any'),
  S('fire-protection', 'minecraft:fire_protection', 4, 'common', 'rot', 'tfc:fire_clay', A(4, 8, 12, 16), 'any'),
  S('blast-protection', 'minecraft:blast_protection', 4, 'uncommon', 'rot', 'tfc:powder/saltpeter', A(4, 8, 12, 16), 'any'),
  S('projectile-protection', 'minecraft:projectile_protection', 4, 'common', 'rot', ['tfc:wool_cloth', 'tfc:burlap_cloth'], A(2, 4, 6, 8), 'any'),
  S('feather-falling', 'minecraft:feather_falling', 4, 'common', 'rot', 'minecraft:feather', A(4, 8, 12, 16), 'any'),
  S('thorns', 'minecraft:thorns', 3, 'rare', 'poison', ['tfc:plant/barrel_cactus', 'tfc:plant/rose'], A(2, 4, 6), 'iron'),
  S('respiration', 'minecraft:respiration', 3, 'uncommon', 'undead', 'tfc:blubber', A(2, 4, 6), 'any'),
  S('aqua-affinity', 'minecraft:aqua_affinity', 1, 'uncommon', 'undead', ['tfc:plant/winged_kelp', 'tfc:plant/leafy_kelp', 'tfc:plant/giant_kelp_flower'], A(8), null),
  S('depth-strider', 'minecraft:depth_strider', 3, 'uncommon', 'undead', ['tfc:groundcover/seaweed', 'tfc:food/dried_kelp'], A(8, 16, 24), 'any'),
  S('frost-walker', 'minecraft:frost_walker', 2, 'rare', 'mushrooms', ['minecraft:ice', 'tfc:sea_ice'], A(8, 16), null),
  S('soul-speed', 'minecraft:soul_speed', 3, 'rare', 'mushrooms', ['minecraft:soul_sand', 'minecraft:soul_soil'], A(8, 16, 24), 'any'),
  S('swift-sneak', 'minecraft:swift_sneak', 3, 'rare', 'mushrooms', 'tfc:wool_yarn', A(8, 16, 24), 'any'),
  // Melee
  S('sharpness', 'minecraft:sharpness', 5, 'common', 'undead', 'tfc:sandpaper', A(1, 2, 3, 4, 6), 'any'),
  S('smite', 'minecraft:smite', 5, 'uncommon', 'undead', 'tfc:powder/salt', A(4, 8, 12, 16, 24), 'silver'),
  S('bane-of-arthropods', 'minecraft:bane_of_arthropods', 5, 'uncommon', 'poison', 'tfc:powder/lime', A(4, 8, 12, 16, 24), 'any'),
  S('knockback', 'minecraft:knockback', 2, 'uncommon', 'undead', ['minecraft:slime_ball', 'beneath:raw_slime'], A(2, 4), null),
  S('fire-aspect', 'minecraft:fire_aspect', 2, 'uncommon', 'undead', 'tfc:powder/sulfur', A(4, 8), null),
  S('looting', 'minecraft:looting', 3, 'rare', 'undead', 'tfc:powder/native_gold', A(4, 8, 12), 'gold'),
  S('sweeping', 'minecraft:sweeping', 3, 'rare', 'undead', 'tfc:powder/graphite', A(2, 4, 6), 'any'),
  // Tools
  S('efficiency', 'minecraft:efficiency', 5, 'common', 'rot', 'tfc:powder/graphite', A(2, 4, 6, 8, 12), 'any'),
  S('unbreaking', 'minecraft:unbreaking', 3, 'rare', 'rot', 'tfc:glue', A(1, 2, 4), 'tiered'),
  S('fortune', 'minecraft:fortune', 3, 'rare', 'mushrooms', ['tfc:powder/ruby', 'tfc:powder/sapphire', 'tfc:powder/emerald', 'tfc:powder/topaz', 'tfc:powder/opal'], A(4, 8, 12), 'gold'),
  S('silk-touch', 'minecraft:silk_touch', 1, 'rare', 'mushrooms', 'tfc:silk_cloth', A(2), null),
  // minecraft:mending intentionally omitted: excluded from the pack (also stripped from loot by KubeJS)
  // Bow / crossbow
  S('power', 'minecraft:power', 5, 'common', 'undead', 'tfc_arch:paper_fletching', A(2, 4, 6, 8, 12), 'any'),
  S('punch', 'minecraft:punch', 2, 'uncommon', 'undead', ['minecraft:slime_ball', 'beneath:raw_slime'], A(2, 4), null),
  S('flame', 'minecraft:flame', 1, 'uncommon', 'undead', 'tfc:powder/sulfur', A(8), null),
  S('infinity', 'minecraft:infinity', 1, 'treasure', 'mushrooms', 'tfc_arch:stone_arrow', A(32), 'alloy-any'),
  S('multishot', 'minecraft:multishot', 1, 'treasure', 'undead', 'tfc_arch:paper_fletching', A(12), null),
  S('piercing', 'minecraft:piercing', 4, 'uncommon', 'undead', 'tfc_arch:bone_arrowhead', A(4, 8, 12, 16), 'any'),
  S('quick-charge', 'minecraft:quick_charge', 3, 'uncommon', 'undead', 'tfc:wool_yarn', A(4, 8, 12), 'any'),
  // Trident-likes
  S('loyalty', 'minecraft:loyalty', 3, 'uncommon', 'undead', 'tfc:goat_horn', A(1, 2, 3), 'any'),
  S('impaling', 'minecraft:impaling', 5, 'uncommon', 'undead', ['tfc:groundcover/sea_urchin', 'tfc:groundcover/mussel', 'tfc:groundcover/clam'], A(4, 8, 12, 16, 24), 'any'),
  S('riptide', 'minecraft:riptide', 3, 'treasure', 'undead', 'tfc:blubber', A(4, 8, 12), 'any'),
  S('channeling', 'minecraft:channeling', 1, 'treasure', 'mushrooms', 'tfc:metal/rod/copper', A(8), null),
  // Fishing
  S('luck-of-the-sea', 'minecraft:luck_of_the_sea', 3, 'uncommon', 'undead', ['tfc:food/tropical_fish', 'tfc:food/shellfish'], A(2, 4, 6), 'gold'),
  S('lure', 'minecraft:lure', 3, 'uncommon', 'rot', 'aquaculture:worm', A(4, 8, 12), 'any'),
  // Curses: cheap, junk only, 0 xp
  S('curse-of-binding', 'minecraft:binding_curse', 1, 'curse', 'poison', 'tfc:rotten_compost', A(8), null),
  S('curse-of-vanishing', 'minecraft:vanishing_curse', 1, 'curse', 'poison', 'minecraft:rotten_flesh', A(16), null),
  // Mods
  S('create-capacity', 'create:capacity', 3, 'uncommon', 'rot', 'tfc:burlap_cloth', A(2, 4, 6), 'any', ['create']),
  S('create-potato-recovery', 'create:potato_recovery', 3, 'uncommon', 'rot', 'tfc:food/potato', A(8, 16, 24), 'any', ['create']),
  // farmersdelight:backstabbing intentionally omitted: applies only to FD KnifeItem, which is unobtainable in the pack
  S('supplementaries-stasis', 'supplementaries:stasis', 1, 'rare', 'mushrooms', ['minecraft:slime_ball', 'beneath:raw_slime'], A(4), null, ['supplementaries']),
  // Enchanting With TFC (max levels unknown → recipe up to V, extra levels are just unused)
  S('ewt-crushing-protection', 'enchanting_with_tfc:crushing_protection', 5, 'common', 'rot', 'tfc:treated_hide', A(1, 2, 3, 4, 6), 'any', ['enchanting_with_tfc']),
  S('ewt-piercing-protection', 'enchanting_with_tfc:piercing_protection', 5, 'common', 'rot', ['tfc:wool_cloth', 'tfc:burlap_cloth'], A(2, 4, 6, 8, 12), 'any', ['enchanting_with_tfc']),
  S('ewt-slashing-protection', 'enchanting_with_tfc:slashing_protection', 5, 'common', 'rot', 'minecraft:leather', A(2, 4, 6, 8, 12), 'any', ['enchanting_with_tfc']),
  S('ewt-hunting', 'enchanting_with_tfc:hunting', 5, 'uncommon', 'undead', 'tfc:powder/native_silver', A(4, 8, 12, 16, 24), 'gold', ['enchanting_with_tfc']),
  S('ewt-slow-aspect', 'enchanting_with_tfc:slow_aspect', 5, 'uncommon', 'poison', 'minecraft:fermented_spider_eye', A(2, 4, 6, 8, 12), 'any', ['enchanting_with_tfc']),
];

const missing = new Set();
const check = (id) => { if (!items.has(id)) missing.add(id); return id; };
const arr = (ids, amount) => ({ itemArray: ids.map((id) => ({ id: check(id), amount })) });
const one = (id, amount) => ({ id: check(id), amount });
const theme = (t, amount) => (Array.isArray(t) ? arr(t, amount) : one(t, amount));

const ids = (list, amount) => (list.length === 1 ? one(list[0], amount) : arr(list, amount));

function metalSlot(metal, lvl) {
  if (!metal) return null;
  if (metal === 'alloy-any') return arr(['tfc:metal/ingot/rose_gold', 'tfc:metal/ingot/sterling_silver'], 1);
  if (PLAIN[metal]) return ids(PLAIN[metal](lvl), PLAIN_AMOUNT[lvl - 1]);
  if (lvl < 3) return null;
  const [pure, alloy] = METAL[metal];
  return ids(lvl === 3 ? pure : alloy, METAL_AMOUNT[lvl]);
}

function build(s) {
  const levels = {};
  const xp = {};
  for (let l = 1; l <= s.max; l++) {
    const i = l - 1;
    const slots = [
      arr(JUNK[s.junk], s.rarity === 'curse' ? JUNK_AMOUNT[1] : JUNK_AMOUNT[i]),
    ];
    if (s.rarity !== 'curse') {
      slots.push({ itemArray: [one('tfc:gem/lapis_lazuli', LAPIS_AMOUNT[i]), one('tfc:powder/lapis_lazuli', LAPIS_AMOUNT[i] * POWDER_PER_GEM)] });
    }
    slots.push(theme(s.theme, s.amt[i]));
    const m = metalSlot(s.metal, l);
    if (m) slots.push(m);
    levels[l] = slots;
    xp[l] = XP[s.rarity][i];
  }
  const out = { enchantment_id: s.id };
  if (s.dependsOn) out.dependsOn = s.dependsOn;
  out.maxLevel = 0;
  out.useExpPoints = false;
  out.xp = xp;
  out.levels = levels;
  return out;
}

const written = new Set();
for (const s of specs) {
  fs.writeFileSync(path.join(outDir, s.file + '.json'), JSON.stringify(build(s), null, 2) + '\n');
  written.add(s.file + '.json');
}

// Remove recipes for absent mods
for (const f of fs.readdirSync(outDir)) {
  if (/^(azurelib|frostiful|swordparry)-/.test(f)) { fs.unlinkSync(path.join(outDir, f)); console.log('removed', f); }
}
// Report any files not regenerated
for (const f of fs.readdirSync(outDir)) if (!written.has(f)) console.log('NOT REGENERATED', f);

// Default recipe (config/eso) — common scale, mushrooms + lapis + amethyst powder
const def = {};
for (let l = 1; l <= 5; l++) {
  const i = l - 1;
  const slots = [
    arr(JUNK.mushrooms, JUNK_AMOUNT[i]),
    { itemArray: [one('tfc:gem/lapis_lazuli', LAPIS_AMOUNT[i]), one('tfc:powder/lapis_lazuli', LAPIS_AMOUNT[i] * POWDER_PER_GEM)] },
    one('tfc:powder/amethyst', LAPIS_AMOUNT[i]),
  ];
  if (l >= 3) slots.push(arr(l === 3 ? ['tfc:metal/ingot/gold', 'tfc:metal/ingot/silver'] : ['tfc:metal/ingot/rose_gold', 'tfc:metal/ingot/sterling_silver'], METAL_AMOUNT[l]));
  def[l] = slots;
}
fs.writeFileSync(path.join(root, 'config/eso/default-recipe.json'), JSON.stringify(def, null, 2) + '\n');
const xpMap = { useExpPoints: false, xp: Object.fromEntries(XP.common.map((v, i) => [String(i + 1), v])) };
fs.writeFileSync(path.join(root, 'config/eso/default-xp-map.json'), JSON.stringify(xpMap, null, 2) + '\n');

console.log('written', written.size, 'recipes');
console.log('missing ids:', [...missing]);
