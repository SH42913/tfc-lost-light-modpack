// Generator for Bountiful bounty pools (TFC Lost Light).
// Usage: node tools/bountiful/gen_pools.js <instanceRoot>
//
// Pools list WHAT can be asked/rewarded; worth comes from tools/economy:
//   *_rews (villager pays the player)  -> economy.sell(id)
//   *_objs (villager asks the player)  -> economy.buy(id)
// Entities keep their own worth (they are not items).
const fs = require('fs');
const path = require('path');

const root = process.argv[2];
if (!root) throw new Error('usage: node gen_pools.js <instanceRoot>');
const eco = require('../economy/economy');
const items = eco.loadItems(root);
const outDir = path.join(root, 'tfc_structures_datapacks/lost_light_datapack/data/bountiful/bounty_pools/bountiful');

// --- helpers ---------------------------------------------------------------------
const Pools = {};
const P = (name) => (Pools[name] ||= {});

const item = (content, min, max, extra = {}) => ({ type: 'item', content, amount: { min, max }, ...extra });
const tag = (content, min, max, extra = {}) => ({ type: 'item_tag', content, amount: { min, max }, ...extra });
const mob = (content, min, max, worth, extra = {}) =>
  ({ type: 'entity', content, amount: { min, max }, unitWorth: worth, timeMult: 8, weightMult: 0.4, ...extra });

const U = { rarity: 'UNCOMMON' };
const R = { rarity: 'RARE' };
const EPIC = { rarity: 'EPIC' };
const DMG = { nbt: '{Damage:0}' };
const forbid = (...ids) => ({ forbids: ids.map((content) => ({ type: 'item', content })) });

const TOOL_METALS = ['copper', 'bronze', 'wrought_iron'];
const METAL_RARITY = { copper: {}, bronze: U, bismuth_bronze: U, black_bronze: U, wrought_iron: R };
const metalForbids = (m) => forbid(`tfc:metal/ingot/${m}`, `tfc:metal/sheet/${m}`, `tfc:metal/double_sheet/${m}`);
// metal item reward: tier rarity, {Damage:0} for durability items, the same metal can't be the objective
const metalRew = (content, m, damage = true, extra = {}) =>
  item(content, 1, 1, { ...METAL_RARITY[m], ...(damage ? DMG : {}), ...metalForbids(m), ...extra });
const metalObj = (content, m, min, max) => item(content, min, max, { ...METAL_RARITY[m] });

// --- shared: all villagers ------------------------------------------------------
let p = P('_all_objs');
p.all_obj_cobblestone = tag('forge:cobblestone', 24, 64, { weightMult: 0.3, name: 'Any Cobblestone' });
p.all_obj_logs = tag('minecraft:logs', 8, 32, { weightMult: 0.3, name: 'Any Logs' });
p.all_obj_lumber = tag('tfc:lumber', 16, 64, { weightMult: 0.3, name: 'Any Lumber' });
p.all_obj_straw = item('tfc:straw', 16, 64, { weightMult: 0.3 });
p.all_obj_clay = item('minecraft:clay_ball', 8, 40, { weightMult: 0.3 });
p.all_obj_mortar = item('tfc:mortar', 8, 32, { ...U, weightMult: 0.3 });
p.all_obj_gem_emerald = item('tfc:gem/emerald', 1, 16, { weightMult: 0.4 });
const allMob = (key, id, min, max, worth, time, wm, extra = {}) => { p[key] = mob(id, min, max, worth, { timeMult: time, ...extra, weightMult: wm }); };
allMob('all_obj_zombie', 'minecraft:zombie', 2, 6, 300, 6, 0.3);
allMob('all_obj_skeleton', 'minecraft:skeleton', 2, 6, 350, 6, 0.3);
allMob('all_obj_spider', 'minecraft:spider', 2, 6, 300, 6, 0.3);
allMob('all_obj_cave_spider', 'minecraft:cave_spider', 2, 6, 350, 6, 0.2);
allMob('all_obj_creeper', 'minecraft:creeper', 1, 4, 550, 7, 0.2);
allMob('all_obj_short_shade', 'tfc_spirits:short_shade', 2, 6, 400, 6, 0.3);
allMob('all_obj_tall_shade', 'tfc_spirits:tall_shade', 1, 4, 600, 6, 0.3);
allMob('all_obj_creeping_shade', 'tfc_spirits:creeping_shade', 1, 4, 500, 6, 0.3);
allMob('all_obj_hungry_shade', 'tfc_spirits:hungry_shade', 1, 4, 700, 7, 0.3, U);
allMob('all_obj_plague_shade', 'tfc_spirits:plague_shade', 1, 3, 800, 7, 0.3, U);
allMob('all_obj_hunchback_troll', 'tfc_spirits:hunchback_troll', 1, 2, 2500, 8, 0.3, R);
allMob('all_obj_mage_troll', 'tfc_spirits:mage_troll', 1, 2, 3000, 8, 0.3, R);
for (const n of [1, 2, 3, 4, 5, 6]) allMob(`all_obj_pc_iloger_${n}`, `primitive_creatures:iloger_${n}`, 2, 5, 450, 6, 0.15);
allMob('all_obj_pc_iloger_10', 'primitive_creatures:iloger_10', 1, 4, 600, 6, 0.15);
allMob('all_obj_pc_piloger_9', 'primitive_creatures:piloger_9', 1, 4, 600, 6, 0.15);
allMob('all_obj_pc_viloger_10', 'primitive_creatures:viloger_10', 1, 4, 600, 6, 0.15);
allMob('all_obj_pc_wiloger', 'primitive_creatures:wiloger', 1, 4, 600, 6, 0.15);
allMob('all_obj_pc_tfc', 'primitive_creatures:tfc', 2, 5, 450, 6, 0.2);
allMob('all_obj_pc_idolater', 'primitive_creatures:idolater_', 1, 3, 700, 7, 0.2, U);
allMob('all_obj_pc_nahida', 'primitive_creatures:nahida', 1, 3, 700, 7, 0.2, U);
allMob('all_obj_pc_beast', 'primitive_creatures:beast', 1, 2, 1500, 8, 0.2, U);
allMob('all_obj_pc_musselwarden', 'primitive_creatures:musselwarden', 1, 2, 1500, 8, 0.2, U);
allMob('all_obj_pc_golem_2', 'primitive_creatures:golem_2', 1, 1, 3000, 8, 0.2, R);

p = P('_all_rews');
const GEMS = [['pyrite', 'pyrite', 4], ['lapis', 'lapis_lazuli', 4], ['amethyst', 'amethyst', 4], ['opal', 'opal', 4],
  ['emerald', 'emerald', 4, { weightMult: 1.3 }], ['topaz', 'topaz', 3, U], ['ruby', 'ruby', 3, U], ['sapphire', 'sapphire', 3, U],
  ['diamond', 'diamond', 2, R]];
for (const [k, g, max, extra] of GEMS) p[`all_rew_gem_${k}`] = item(`tfc:gem/${g}`, 1, max, extra);
p.all_rew_ingot_copper = item('tfc:metal/ingot/copper', 1, 3, { ...U, ...forbid('tfc:metal/ingot/copper') });
for (const m of ['bronze', 'bismuth_bronze', 'black_bronze']) p[`all_rew_ingot_${m}`] = item(`tfc:metal/ingot/${m}`, 1, 2, { ...R, ...forbid(`tfc:metal/ingot/${m}`) });
p.all_rew_ingot_wrought_iron = item('tfc:metal/ingot/wrought_iron', 1, 2, { ...EPIC, weightMult: 0.5, ...forbid('tfc:metal/ingot/wrought_iron') });
p.all_rew_decree = item('bountiful:decree', 1, 1, { ...U, weightMult: 0.35 });

p = P('_equip_rews');
p.equip_rew_copper_shield = item('magistuarmory:copper_heatershield', 1, 1, { ...DMG, ...forbid('tfc:metal/ingot/copper') });
p.equip_rew_bronze_shield = item('magistuarmory:bronze_heatershield', 1, 1, { ...U, ...DMG, ...forbid('tfc:metal/ingot/bronze') });
p.equip_rew_iron_shield = item('magistuarmory:iron_heatershield', 1, 1, { ...R, ...DMG, ...forbid('tfc:metal/ingot/wrought_iron') });

p = P('_gardening_rews');
const garden = (m, t, extra) => { p[`gardening_rew_${m}_${t}`] = item(`tfc:metal/${t}/${m}`, 1, 1, { ...extra, ...DMG, ...forbid(`tfc:metal/ingot/${m}`) }); };
for (const t of ['hoe', 'shovel', 'scythe']) garden('copper', t, {});
for (const t of ['hoe', 'scythe']) garden('bronze', t, U);
garden('wrought_iron', 'hoe', R);

p = P('_metal_objs');
p.metal_obj_lignite = item('tfc:ore/lignite', 4, 32);
p.metal_obj_bituminous_coal = item('tfc:ore/bituminous_coal', 4, 32);
p.metal_obj_charcoal = item('minecraft:charcoal', 8, 48);
p.metal_obj_flux = item('tfc:powder/flux', 4, 24);
for (const o of ['native_copper', 'malachite', 'tetrahedrite']) p[`metal_obj_${o}`] = item(`tfc:ore/normal_${o}`, 4, 24);
for (const o of ['cassiterite', 'bismuthinite', 'sphalerite']) p[`metal_obj_${o}`] = item(`tfc:ore/normal_${o}`, 4, 16);
for (const o of ['native_gold', 'native_silver']) p[`metal_obj_${o}`] = item(`tfc:ore/normal_${o}`, 2, 12, U);
for (const o of ['hematite', 'magnetite', 'limonite']) p[`metal_obj_${o}`] = item(`tfc:ore/normal_${o}`, 4, 16, U);
p.metal_obj_ingot_copper = item('tfc:metal/ingot/copper', 1, 8);
p.metal_obj_ingot_tin = item('tfc:metal/ingot/tin', 1, 6);
p.metal_obj_ingot_bronze = item('tfc:metal/ingot/bronze', 1, 6, U);
p.metal_obj_ingot_wrought_iron = item('tfc:metal/ingot/wrought_iron', 1, 4, R);

// --- shared hunting objectives (TFC predators) ---------------------------------
p = P('_hunt_objs');
p.hunt_obj_direwolf = mob('tfc:direwolf', 1, 3, 1500);
p.hunt_obj_hyena = mob('tfc:hyena', 1, 3, 1200);
p.hunt_obj_cougar = mob('tfc:cougar', 1, 2, 1500);
p.hunt_obj_panther = mob('tfc:panther', 1, 2, 1500);
p.hunt_obj_crocodile = mob('tfc:crocodile', 1, 2, 2000, U);
p.hunt_obj_lion = mob('tfc:lion', 1, 2, 2000, U);
p.hunt_obj_tiger = mob('tfc:tiger', 1, 2, 2500, U);
p.hunt_obj_black_bear = mob('tfc:black_bear', 1, 2, 2000, U);
p.hunt_obj_grizzly_bear = mob('tfc:grizzly_bear', 1, 2, 2500, R);
p.hunt_obj_polar_bear = mob('tfc:polar_bear', 1, 2, 2500, R);
p.hunt_obj_sabertooth = mob('tfc:sabertooth', 1, 1, 4000, R);

// --- armorer ----------------------------------------------------------------------
p = P('armorer_objs');
for (const m of TOOL_METALS) {
  p[`armorer_obj_sheet_${m}`] = metalObj(`tfc:metal/sheet/${m}`, m, 1, 4);
  p[`armorer_obj_double_ingot_${m}`] = metalObj(`tfc:metal/double_ingot/${m}`, m, 1, 4);
}
p.armorer_obj_double_sheet_copper = metalObj('tfc:metal/double_sheet/copper', 'copper', 1, 2);
p.armorer_obj_double_sheet_bronze = metalObj('tfc:metal/double_sheet/bronze', 'bronze', 1, 2);
p.armorer_obj_leather = item('minecraft:leather', 4, 16);

p = P('armorer_rews');
for (const m of ['copper', 'bronze', 'bismuth_bronze', 'black_bronze', 'wrought_iron']) {
  for (const k of ['helmet', 'chestplate', 'greaves', 'boots']) {
    p[`armorer_rew_${m}_${k}`] = metalRew(`tfc:metal/${k}/${m}`, m, true, m === 'wrought_iron' ? { weightMult: 0.5 } : {});
  }
}
for (const m of TOOL_METALS) p[`armorer_rew_${m}_horse_armor`] = metalRew(`tfc:metal/horse_armor/${m}`, m, false);

// --- toolsmith --------------------------------------------------------------------
p = P('toolsmith_objs');
for (const m of TOOL_METALS) {
  p[`toolsmith_obj_rod_${m}`] = metalObj(`tfc:metal/rod/${m}`, m, 2, 8);
  for (const h of ['pickaxe_head', 'axe_head', 'hammer_head', 'saw_blade']) p[`toolsmith_obj_${h}_${m}`] = metalObj(`tfc:metal/${h}/${m}`, m, 1, 2);
}
p.toolsmith_obj_stick_bunch = item('tfc:stick_bunch', 4, 16);

p = P('toolsmith_rews');
for (const m of TOOL_METALS) {
  for (const t of ['pickaxe', 'axe', 'hammer', 'saw', 'chisel', 'propick', 'knife']) p[`toolsmith_rew_${t}_${m}`] = metalRew(`tfc:metal/${t}/${m}`, m);
}
p.toolsmith_rew_ore_sack = item('sns:ore_sack', 1, 1, U);

// --- weaponsmith ------------------------------------------------------------------
p = P('weaponsmith_objs');
for (const m of ['copper', 'bronze']) {
  p[`weaponsmith_obj_sword_blade_${m}`] = metalObj(`tfc:metal/sword_blade/${m}`, m, 1, 2);
  p[`weaponsmith_obj_mace_head_${m}`] = metalObj(`tfc:metal/mace_head/${m}`, m, 1, 2);
  p[`weaponsmith_obj_javelin_head_${m}`] = metalObj(`tfc:metal/javelin_head/${m}`, m, 1, 3);
}
p.weaponsmith_obj_leather = item('minecraft:leather', 4, 12);
p.weaponsmith_obj_glue = item('tfc:glue', 4, 16);

p = P('weaponsmith_rews');
for (const m of TOOL_METALS) {
  for (const w of ['sword', 'mace', 'javelin', 'shield']) p[`weaponsmith_rew_${w}_${m}`] = metalRew(`tfc:metal/${w}/${m}`, m);
}
for (const w of ['gladius', 'antique_sword', 'celtic_sword', 'rhomphaia']) {
  p[`weaponsmith_rew_bronze_${w}`] = metalRew(`knightsofterrafirma:bronze_${w}`, 'bronze', true, R);
}
for (const w of ['bastard_sword', 'claymore']) {
  p[`weaponsmith_rew_bismuth_bronze_${w}`] = metalRew(`knightsofterrafirma:bismuth_bronze_${w}`, 'bismuth_bronze', true, R);
}

// --- mason ------------------------------------------------------------------------
p = P('mason_objs');
for (const r of ['granite', 'limestone', 'marble', 'basalt', 'andesite', 'chalk']) {
  p[`mason_obj_raw_${r}`] = item(`tfc:rock/raw/${r}`, 8, 32, { weightMult: 0.4 });
  p[`mason_obj_brick_${r}`] = item(`tfc:brick/${r}`, 16, 64, { weightMult: 0.4 });
}
p.mason_obj_mortar = item('tfc:mortar', 8, 32);
p.mason_obj_lime = item('tfc:powder/lime', 8, 32);
p.mason_obj_alabaster = item('tfc:alabaster/raw', 8, 32, U);
p.mason_obj_fire_clay = item('tfc:fire_clay', 4, 16, U);
p.mason_obj_kaolin_clay = item('tfc:kaolin_clay', 2, 8, R);

p = P('mason_rews');
for (const r of ['marble', 'chalk', 'andesite', 'basalt', 'dolomite', 'gabbro', 'schist', 'phyllite', 'conglomerate']) {
  p[`mason_rew_hardened_${r}`] = item(`tfc:rock/hardened/${r}`, 8, 32, { weightMult: 0.4 });
}
for (const r of ['granite', 'marble', 'basalt']) {
  p[`mason_rew_bricks_${r}`] = item(`tfc:rock/bricks/${r}`, 16, 48, { weightMult: 0.5 });
  p[`mason_rew_chiseled_${r}`] = item(`tfc:rock/chiseled/${r}`, 8, 32, { weightMult: 0.5 });
}
p.mason_rew_alabaster_bricks = item('tfc:alabaster/bricks', 8, 32, U);
p.mason_rew_fire_bricks = item('tfc:fire_bricks', 2, 8, U);
p.mason_rew_large_vessel = item('tfc:ceramic/large_vessel', 1, 1, U);
for (const m of TOOL_METALS) p[`mason_rew_chisel_${m}`] = metalRew(`tfc:metal/chisel/${m}`, m);

// --- farmer -----------------------------------------------------------------------
p = P('farmer_objs');
for (const c of ['wheat', 'barley', 'oat', 'rye', 'rice', 'maize']) p[`farmer_obj_${c}`] = item(`tfc:food/${c}`, 8, 32, { weightMult: 0.5 });
for (const c of ['potato', 'carrot', 'beet', 'onion', 'garlic', 'cabbage', 'tomato', 'squash', 'soybean']) p[`farmer_obj_${c}`] = item(`tfc:food/${c}`, 8, 24, { weightMult: 0.5 });
for (const c of ['red_apple', 'green_apple', 'peach', 'plum', 'olive']) p[`farmer_obj_${c}`] = item(`tfc:food/${c}`, 8, 24, { ...U, weightMult: 0.5 });
for (const c of ['blueberry', 'strawberry', 'raspberry', 'cranberry', 'elderberry']) p[`farmer_obj_${c}`] = item(`tfc:food/${c}`, 8, 24, { weightMult: 0.3 });
p.farmer_obj_jute = item('tfc:jute', 8, 32);
p.farmer_obj_sugarcane = item('tfc:food/sugarcane', 8, 32);

p = P('farmer_rews');
for (const s of ['wheat', 'barley', 'oat', 'rye', 'rice', 'maize', 'potato', 'carrot', 'beet', 'onion', 'garlic', 'cabbage', 'tomato', 'squash', 'soybean', 'jute', 'melon', 'pumpkin']) {
  p[`farmer_rew_seeds_${s}`] = item(`tfc:seeds/${s}`, 2, 8, { weightMult: 0.3 });
}
for (const t of ['cherry', 'green_apple', 'red_apple', 'peach', 'plum', 'olive', 'orange', 'banana']) {
  p[`farmer_rew_sapling_${t}`] = item(`tfc:plant/${t}_sapling`, 1, 1, { ...U, weightMult: 0.4 });
}
p.farmer_rew_cocoa_sapling = item('firmalife:plant/cocoa_sapling', 1, 1, R);
p.farmer_rew_fig_sapling = item('firmalife:plant/fig_sapling', 1, 1, R);
p.farmer_rew_pineapple_bush = item('firmalife:plant/pineapple_bush', 1, 1, R);
for (const h of ['basil', 'cilantro', 'cumin', 'oregano', 'pimento']) p[`farmer_rew_herb_${h}`] = item(`firmalife:plant/${h}`, 1, 2, { ...U, weightMult: 0.4 });
p.farmer_rew_honey = item('firmalife:raw_honey', 1, 4, U);
p.farmer_rew_beeswax = item('firmalife:beeswax', 2, 6);
p.farmer_rew_bread = item('tfc:food/wheat_bread', 4, 12);
p.farmer_rew_cheese = item('tfc:food/cheese', 2, 6, U);
p.farmer_rew_seed_pouch = item('sns:seed_pouch', 1, 1, U);
p.farmer_rew_straw_basket = item('sns:straw_basket', 1, 1);

// --- butcher ----------------------------------------------------------------------
p = P('butcher_objs');
for (const m of ['beef', 'pork', 'mutton', 'chicken', 'chevon', 'duck', 'quail', 'turkey', 'pheasant', 'rabbit']) p[`butcher_obj_${m}`] = item(`tfc:food/${m}`, 2, 12, { weightMult: 0.5 });
for (const m of ['venison', 'camelidae', 'horse_meat', 'bear', 'wolf', 'gran_feline']) p[`butcher_obj_${m}`] = item(`tfc:food/${m}`, 2, 8, { ...U, weightMult: 0.5 });
p.butcher_obj_blubber = item('tfc:blubber', 2, 8, U);
p.butcher_obj_salt = item('tfc:powder/salt', 4, 16);

p = P('butcher_rews');
for (const m of ['beef', 'pork', 'mutton', 'chicken', 'venison', 'turkey']) p[`butcher_rew_cooked_${m}`] = item(`tfc:food/cooked_${m}`, 4, 12, { weightMult: 0.5 });
p.butcher_rew_cooked_bacon = item('firmalife:food/cooked_bacon', 4, 12);
p.butcher_rew_salt = item('tfc:powder/salt', 4, 16, forbid('tfc:powder/salt'));
p.butcher_rew_leather = item('minecraft:leather', 2, 8);
p.butcher_rew_feather = item('minecraft:feather', 8, 24);
p.butcher_rew_sinew = item('bsa:sinew', 2, 8);
for (const m of TOOL_METALS) p[`butcher_rew_knife_${m}`] = metalRew(`tfc:metal/knife/${m}`, m);

// --- fisherman --------------------------------------------------------------------
p = P('fisherman_objs');
for (const f of ['cod', 'salmon', 'lake_trout', 'rainbow_trout', 'bluegill', 'crappie', 'largemouth_bass', 'smallmouth_bass']) p[`fisherman_obj_${f}`] = item(`tfc:food/${f}`, 2, 12, { weightMult: 0.5 });
for (const f of ['tropical_fish', 'calamari', 'shellfish']) p[`fisherman_obj_${f}`] = item(`tfc:food/${f}`, 2, 8, { ...U, weightMult: 0.5 });
for (const g of ['clam', 'mussel', 'mollusk']) p[`fisherman_obj_${g}`] = item(`tfc:groundcover/${g}`, 2, 8, { weightMult: 0.5 });
p.fisherman_obj_seaweed = item('tfc:food/fresh_seaweed', 8, 32);
p.fisherman_obj_kelp = item('minecraft:kelp', 8, 32);
p.fisherman_obj_driftwood = item('tfc:groundcover/driftwood', 4, 16);

p = P('fisherman_rews');
for (const m of TOOL_METALS) p[`fisherman_rew_fishing_rod_${m}`] = metalRew(`tfc:metal/fishing_rod/${m}`, m);
for (const f of ['cod', 'salmon', 'lake_trout', 'rainbow_trout']) p[`fisherman_rew_cooked_${f}`] = item(`tfc:food/cooked_${f}`, 4, 12, { weightMult: 0.5 });
for (const s of ['barley', 'oat', 'rye', 'rice', 'soybean', 'melon', 'pumpkin', 'squash']) p[`fisherman_rew_seeds_${s}`] = item(`tfc:seeds/${s}`, 2, 8, { weightMult: 0.3 });
p.fisherman_rew_salt = item('tfc:powder/salt', 4, 16);
p.fisherman_rew_canoe_paddle = item('firmaciv:canoe_paddle', 1, 1);
p.fisherman_rew_kayak_paddle = item('firmaciv:kayak_paddle', 1, 1);
p.fisherman_rew_rope_coil = item('firmaciv:rope_coil', 2, 6);
p.fisherman_rew_small_sail = item('firmaciv:small_triangular_sail', 1, 1, U);

// --- fletcher ---------------------------------------------------------------------
p = P('fletcher_objs');
p.fletcher_obj_feather = item('minecraft:feather', 8, 32);
p.fletcher_obj_string = item('minecraft:string', 4, 16);
p.fletcher_obj_sinew = item('bsa:sinew', 2, 8);
p.fletcher_obj_sinew_string = item('bsa:sinew_string', 2, 8, U);
for (const a of ['flint', 'stone', 'bone']) p[`fletcher_obj_${a}_arrowhead`] = item(`tfc_arch:${a}_arrowhead`, 8, 24);
p.fletcher_obj_copper_arrowhead = item('tfc_arch:copper_arrowhead', 8, 16, U);

p = P('fletcher_rews');
p.fletcher_rew_shortbow = item('tfc_arch:shortbow', 1, 1, DMG);
p.fletcher_rew_plains_bow = item('tfc_arch:plains_bow', 1, 1, { ...U, ...DMG });
p.fletcher_rew_longbow = item('tfc_arch:longbow', 1, 1, { ...R, ...DMG });
for (const m of TOOL_METALS) p[`fletcher_rew_${m}_crossbow`] = metalRew(`tfc_arch:${m}_crossbow`, m);
for (const a of ['flint', 'stone', 'bone']) p[`fletcher_rew_${a}_arrow`] = item(`tfc_arch:${a}_arrow`, 8, 32);
p.fletcher_rew_copper_arrow = item('tfc_arch:copper_arrow', 8, 24);
p.fletcher_rew_bronze_arrow = item('tfc_arch:bronze_arrow', 8, 16, U);
p.fletcher_rew_wrought_iron_arrow = item('tfc_arch:wrought_iron_arrow', 4, 16, R);
p.fletcher_rew_quiver = item('sns:quiver', 1, 1, U);

// --- leatherer --------------------------------------------------------------------
p = P('leatherer_objs');
p.leatherer_obj_small_raw_hide = item('tfc:small_raw_hide', 1, 6);
p.leatherer_obj_medium_raw_hide = item('tfc:medium_raw_hide', 1, 4);
p.leatherer_obj_large_raw_hide = item('tfc:large_raw_hide', 1, 3, U);
p.leatherer_obj_leather = item('minecraft:leather', 4, 16);
p.leatherer_obj_glue = item('tfc:glue', 4, 16);
p.leatherer_obj_wood_ash = item('tfc:powder/wood_ash', 8, 32);

p = P('leatherer_rews');
p.leatherer_rew_leather = item('minecraft:leather', 4, 12, forbid('minecraft:leather'));
p.leatherer_rew_treated_hide = item('tfc:treated_hide', 1, 4);
for (const k of ['helmet', 'chestplate', 'leggings', 'boots']) p[`leatherer_rew_${k}`] = item(`minecraft:leather_${k}`, 1, 1, DMG);
p.leatherer_rew_flask = item('waterflasks:leather_flask', 1, 1);
p.leatherer_rew_lead = item('minecraft:lead', 1, 2);
p.leatherer_rew_waterproof_hide = item('firmaciv:large_waterproof_hide', 1, 1);
p.leatherer_rew_leather_sack = item('sns:leather_sack', 1, 1, U);
p.leatherer_rew_hiking_boots = item('sns:hiking_boots', 1, 1, { ...U, ...DMG });
p.leatherer_rew_saddle = item('minecraft:saddle', 1, 1, R);
p.leatherer_rew_frame_pack = item('sns:frame_pack', 1, 1, R);

// --- shepherd ---------------------------------------------------------------------
p = P('shepherd_objs');
p.shepherd_obj_wool = item('tfc:wool', 4, 16);
p.shepherd_obj_wool_yarn = item('tfc:wool_yarn', 8, 32);
p.shepherd_obj_jute_fiber = item('tfc:jute_fiber', 8, 32);
p.shepherd_obj_small_sheepskin = item('tfc:small_sheepskin_hide', 1, 3);
p.shepherd_obj_medium_sheepskin = item('tfc:medium_sheepskin_hide', 1, 3, U);
p.shepherd_obj_large_sheepskin = item('tfc:large_sheepskin_hide', 1, 2, U);
for (const d of ['red', 'yellow', 'blue', 'green', 'black', 'white']) p[`shepherd_obj_${d}_dye`] = item(`minecraft:${d}_dye`, 4, 16, { weightMult: 0.3 });

p = P('shepherd_rews');
p.shepherd_rew_wool_cloth = item('tfc:wool_cloth', 4, 12);
p.shepherd_rew_burlap_cloth = item('tfc:burlap_cloth', 4, 16);
p.shepherd_rew_silk_cloth = item('tfc:silk_cloth', 2, 8, U);
p.shepherd_rew_white_wool = item('minecraft:white_wool', 4, 16);
p.shepherd_rew_white_carpet = item('minecraft:white_carpet', 4, 16);
p.shepherd_rew_white_bed = item('minecraft:white_bed', 1, 1, U);
p.shepherd_rew_spindle = item('tfc:spindle', 1, 1);
p.shepherd_rew_treated_hide = item('tfc:treated_hide', 1, 4);
for (const m of TOOL_METALS) p[`shepherd_rew_shears_${m}`] = metalRew(`tfc:metal/shears/${m}`, m);

// --- librarian --------------------------------------------------------------------
p = P('librarian_objs');
p.librarian_obj_paper = item('minecraft:paper', 8, 32);
p.librarian_obj_unrefined_paper = item('tfc:unrefined_paper', 8, 32);
p.librarian_obj_ink_sac = item('minecraft:ink_sac', 4, 16);
p.librarian_obj_glow_ink_sac = item('minecraft:glow_ink_sac', 2, 8, U);
p.librarian_obj_feather = item('minecraft:feather', 8, 24);
p.librarian_obj_leather = item('minecraft:leather', 2, 8);
p.librarian_obj_soot = item('tfc:soot', 4, 16);
p.librarian_obj_candle = item('tfc:candle', 2, 8);
p.librarian_obj_book = item('minecraft:book', 2, 8, U);

p = P('librarian_rews');
p.librarian_rew_book = item('minecraft:book', 2, 6, forbid('minecraft:book'));
p.librarian_rew_writable_book = item('minecraft:writable_book', 1, 2);
p.librarian_rew_bookshelf = item('tfc:wood/planks/oak_bookshelf', 1, 2);
p.librarian_rew_lantern = item('minecraft:lantern', 1, 2);
p.librarian_rew_name_tag = item('minecraft:name_tag', 1, 1, U);
p.librarian_rew_xp_bottle = item('minecraft:experience_bottle', 2, 8, U);
for (const m of TOOL_METALS) p[`librarian_rew_lamp_${m}`] = metalRew(`tfc:metal/lamp/${m}`, m, false);

// --- mapper (cartographer) --------------------------------------------------------
p = P('mapper_objs');
p.mapper_obj_paper = item('minecraft:paper', 8, 32);
p.mapper_obj_unrefined_paper = item('tfc:unrefined_paper', 8, 32);
p.mapper_obj_ink_sac = item('minecraft:ink_sac', 4, 16);
p.mapper_obj_black_dye = item('minecraft:black_dye', 4, 12);
p.mapper_obj_glass_pane = item('minecraft:glass_pane', 4, 16);
p.mapper_obj_lens = item('tfc:lens', 1, 2, U);
p.mapper_obj_compass = item('minecraft:compass', 1, 1, R);

p = P('mapper_rews');
p.mapper_rew_map = item('minecraft:map', 1, 3);
p.mapper_rew_item_frame = item('minecraft:item_frame', 2, 6);
p.mapper_rew_compass = item('minecraft:compass', 1, 1, { ...U, ...forbid('minecraft:compass') });
p.mapper_rew_firmaciv_compass = item('firmaciv:firmaciv_compass', 1, 1, U);
p.mapper_rew_clock = item('minecraft:clock', 1, 1, R);
p.mapper_rew_spyglass = item('minecraft:spyglass', 1, 1, R);
p.mapper_rew_barometer = item('firmaciv:barometer', 1, 1, R);
p.mapper_rew_sextant = item('firmaciv:sextant', 1, 1, R);
p.mapper_rew_nav_clock = item('firmaciv:nav_clock', 1, 1, { ...EPIC, weightMult: 0.5 });
for (const c of ['white', 'red', 'blue', 'black']) p[`mapper_rew_${c}_banner`] = item(`minecraft:${c}_banner`, 1, 2, { weightMult: 0.3 });

// --- cleric -----------------------------------------------------------------------
p = P('cleric_objs');
p.cleric_obj_rotten_flesh = item('minecraft:rotten_flesh', 4, 24);
p.cleric_obj_bone = item('minecraft:bone', 4, 24);
p.cleric_obj_spider_eye = item('minecraft:spider_eye', 2, 8);
p.cleric_obj_gunpowder = item('minecraft:gunpowder', 2, 8, U);
p.cleric_obj_glass_bottle = item('minecraft:glass_bottle', 4, 12);
p.cleric_obj_candle = item('tfc:candle', 4, 12);
p.cleric_obj_sulfur = item('tfc:powder/sulfur', 4, 16);
p.cleric_obj_saltpeter = item('tfc:powder/saltpeter', 4, 16);
p.cleric_obj_beeswax = item('firmalife:beeswax', 2, 8);
p.cleric_obj_ender_pearl = item('minecraft:ender_pearl', 1, 4, R);

p = P('cleric_rews');
p.cleric_rew_xp_bottle = item('minecraft:experience_bottle', 2, 8);
p.cleric_rew_ender_pearl = item('minecraft:ender_pearl', 1, 2, { ...U, ...forbid('minecraft:ender_pearl') });
p.cleric_rew_candle = item('tfc:candle', 4, 12, forbid('tfc:candle'));
p.cleric_rew_bone_meal = item('minecraft:bone_meal', 8, 24);
p.cleric_rew_honey = item('firmalife:raw_honey', 1, 4);
p.cleric_rew_gold_ingot = item('tfc:metal/ingot/gold', 1, 2, U);

// --- inventor (Create) ------------------------------------------------------------
p = P('inventor_objs');
p.inventor_obj_andesite_alloy = item('create:andesite_alloy', 4, 16);
p.inventor_obj_shaft = item('create:shaft', 8, 32);
p.inventor_obj_cogwheel = item('create:cogwheel', 4, 16);
p.inventor_obj_large_cogwheel = item('create:large_cogwheel', 2, 8);
p.inventor_obj_andesite_casing = item('create:andesite_casing', 2, 8);
p.inventor_obj_belt_connector = item('create:belt_connector', 1, 4);
p.inventor_obj_brass_mechanisms = item('tfc:brass_mechanisms', 1, 4, U);
p.inventor_obj_zinc_ingot = item('tfc:metal/ingot/zinc', 1, 6);
p.inventor_obj_brass_ingot = item('tfc:metal/ingot/brass', 1, 6, U);
p.inventor_obj_electron_tube = item('create:electron_tube', 1, 4, U);
p.inventor_obj_copper_rod = metalObj('tfc:metal/rod/copper', 'copper', 2, 8);

p = P('inventor_rews');
p.inventor_rew_wrench = item('create:wrench', 1, 1);
p.inventor_rew_goggles = item('create:goggles', 1, 1, U);
p.inventor_rew_hand_crank = item('create:hand_crank', 1, 1);
p.inventor_rew_gearbox = item('create:gearbox', 1, 2);
p.inventor_rew_water_wheel = item('create:water_wheel', 1, 1);
p.inventor_rew_millstone = item('create:millstone', 1, 1);
p.inventor_rew_basin = item('create:basin', 1, 1);
p.inventor_rew_fluid_tank = item('create:fluid_tank', 1, 2);
for (const k of ['windmill_bearing', 'encased_fan', 'mechanical_pump', 'mechanical_press', 'mechanical_mixer', 'mechanical_drill', 'mechanical_saw']) {
  p[`inventor_rew_${k}`] = item(`create:${k}`, 1, 1, U);
}
p.inventor_rew_deployer = item('create:deployer', 1, 1, R);
p.inventor_rew_brass_casing = item('create:brass_casing', 2, 8, R);
p.inventor_rew_precision_mechanism = item('create:precision_mechanism', 1, 1, { ...EPIC, weightMult: 0.5 });

// --- worth ------------------------------------------------------------------------
const worthOf = (pool, e) => (pool.endsWith('_rews') ? eco.sell(e.content) : eco.buy(e.content));

const errors = [];
const out = {};
for (const [pool, entries] of Object.entries(Pools)) {
  out[pool] = {};
  for (const [key, e] of Object.entries(entries)) {
    let entry = e;
    if (e.type !== 'entity') {
      if (e.type === 'item' && !items.has(e.content)) errors.push(`${pool}.${key}: unknown item ${e.content}`);
      const w = worthOf(pool, e);
      if (!w) errors.push(`${pool}.${key}: no worth for ${e.content}`);
      const { type, content, amount, ...extra } = e;
      entry = { type, content, amount, unitWorth: w, ...extra }; // keep Bountiful's field order
    }
    out[pool][key] = entry;
  }
}
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }

for (const [pool, entries] of Object.entries(out)) {
  const lines = Object.entries(entries).map(([k, e]) => `        "${k}": ${JSON.stringify(e)}`);
  fs.writeFileSync(path.join(outDir, pool + '.json'), `{\n    "content": {\n${lines.join(',\n')}\n    }\n}\n`);
  console.log(`${pool.padEnd(18)} ${String(lines.length).padStart(3)} entries`);
}
if (process.env.SHOW_RAISED) for (const l of eco.report()) console.log('RAISED', l);
