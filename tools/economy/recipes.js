// Recipes: what an item is made of. economy.js prices an item at no less than
// sum(inputs) * (1 + labor) / out, so a product is never cheaper than its materials.
// Several recipes for one item are allowed; the most expensive one wins.
// Amounts follow TFC (100 mB = 1 ingot). Lines marked "check" were not verified in JEI.

const RECIPES = []; // { id, out, in: { id: n }, labor }
const r = (id, out, inputs, labor) => RECIPES.push({ id, out, in: inputs, labor });

// labor shares
const FORGE = 0.1;   // one anvil/welding step
const ASSEMBLE = 0.05; // attaching a handle, combining parts
const CRAFT = 0.15;  // sewing, weaving, leatherwork
const FIRE = 0.3;    // knapping + firing in a pit kiln (fuel, time)
const TAN = 0.3;     // soak, scrape, prepare, tan
const SPIN = 0.2;    // spindle
const WEAVE = 0.3;   // loom

// --- metal --------------------------------------------------------------------------
const METALS = ['copper', 'bronze', 'bismuth_bronze', 'black_bronze', 'wrought_iron', 'steel', 'black_steel',
  'gold', 'silver', 'brass', 'tin', 'zinc', 'rose_gold', 'sterling_silver', 'nickel', 'lead'];
const STICK = 'minecraft:stick';
for (const m of METALS) {
  const M = (kind) => `tfc:metal/${kind}/${m}`;
  const ingot = M('ingot');
  r(M('double_ingot'), 1, { [ingot]: 2 }, ASSEMBLE);
  r(M('sheet'), 1, { [M('double_ingot')]: 1 }, FORGE);
  r(M('double_sheet'), 1, { [M('sheet')]: 2 }, ASSEMBLE);
  r(M('rod'), 2, { [ingot]: 1 }, FORGE);

  // tool heads: 1 ingot each; tool = head + stick
  const HEADS = { pickaxe: 'pickaxe_head', axe: 'axe_head', shovel: 'shovel_head', hoe: 'hoe_head', hammer: 'hammer_head',
    saw: 'saw_blade', chisel: 'chisel_head', knife: 'knife_blade', scythe: 'scythe_blade', propick: 'propick_head',
    javelin: 'javelin_head', fishing_rod: 'fish_hook' };
  for (const [tool, head] of Object.entries(HEADS)) {
    r(M(head), 1, { [ingot]: 1 }, FORGE);
    r(M(tool), 1, { [M(head)]: 1, [STICK]: 1 }, ASSEMBLE);
  }
  // 2-ingot weapons
  r(M('sword_blade'), 1, { [M('double_ingot')]: 1 }, FORGE);
  r(M('mace_head'), 1, { [M('double_ingot')]: 1 }, FORGE);
  r(M('sword'), 1, { [M('sword_blade')]: 1, [STICK]: 1 }, ASSEMBLE);
  r(M('mace'), 1, { [M('mace_head')]: 1, [STICK]: 1 }, ASSEMBLE);
  r(M('shears'), 1, { [M('knife_blade')]: 2 }, ASSEMBLE);
  r(M('shield'), 1, { [M('sheet')]: 1 }, FORGE); // check
  r(M('lamp'), 1, { [ingot]: 1 }, CRAFT); // unfinished lamp + glass
  r(M('trapdoor'), 1, { [M('sheet')]: 1 }, FORGE); // check

  // armor: unfinished piece + weld
  r(M('unfinished_helmet'), 1, { [M('double_sheet')]: 1 }, FORGE);
  r(M('helmet'), 1, { [M('unfinished_helmet')]: 1, [M('sheet')]: 1 }, FORGE);
  r(M('unfinished_chestplate'), 1, { [M('double_sheet')]: 1 }, FORGE);
  r(M('chestplate'), 1, { [M('unfinished_chestplate')]: 1, [M('double_sheet')]: 1 }, FORGE);
  r(M('unfinished_greaves'), 1, { [M('double_sheet')]: 1 }, FORGE);
  r(M('greaves'), 1, { [M('unfinished_greaves')]: 1, [M('sheet')]: 1 }, FORGE);
  r(M('unfinished_boots'), 1, { [M('sheet')]: 1 }, FORGE);
  r(M('boots'), 1, { [M('unfinished_boots')]: 1, [M('sheet')]: 1 }, FORGE);
  r(M('horse_armor'), 1, { [M('double_sheet')]: 1, [M('sheet')]: 1 }, FORGE); // check
}

// arrows (tfc_arch): ingot -> arrowheads, arrowhead + stick + feather -> arrow (check both)
for (const m of ['copper', 'bronze', 'bismuth_bronze', 'black_bronze', 'wrought_iron', 'steel', 'black_steel']) {
  r(`tfc_arch:${m}_arrowhead`, 8, { [`tfc:metal/ingot/${m}`]: 1 }, FORGE);
}
for (const a of ['flint', 'stone', 'bone', 'copper', 'bronze', 'bismuth_bronze', 'black_bronze', 'wrought_iron', 'steel', 'black_steel']) {
  r(`tfc_arch:${a}_arrow`, 1, { [`tfc_arch:${a}_arrowhead`]: 1, [STICK]: 1, 'minecraft:feather': 1 }, FORGE);
}

// --- leather ------------------------------------------------------------------------
r('minecraft:leather', 1, { 'tfc:small_raw_hide': 1 }, TAN);
r('minecraft:leather', 2, { 'tfc:medium_raw_hide': 1 }, TAN);
r('minecraft:leather', 3, { 'tfc:large_raw_hide': 1 }, TAN);
r('minecraft:saddle', 1, { 'minecraft:leather': 1 }, CRAFT);
r('waterflasks:leather_flask', 1, { 'minecraft:leather': 2, 'minecraft:string': 2 }, CRAFT);
r('sns:leather_sack', 1, { 'minecraft:leather': 2, 'tfc:jute_fiber': 3 }, CRAFT);

// --- cloth --------------------------------------------------------------------------
r('tfc:wool_yarn', 8, { 'tfc:wool': 1 }, SPIN);
r('tfc:wool_cloth', 1, { 'tfc:wool_yarn': 16 }, WEAVE);
r('tfc:burlap_cloth', 1, { 'tfc:jute_fiber': 12 }, WEAVE);
r('tfc:silk_cloth', 1, { 'minecraft:string': 24 }, WEAVE);

// --- ceramics: 5 clay per knapping ----------------------------------------------------
const FIRED = ['bowl', 'jug', 'pot', 'vessel', 'large_vessel', 'spindle_head', 'ingot_mold', 'bell_mold',
  ...['axe_head', 'chisel_head', 'hammer_head', 'hoe_head', 'javelin_head', 'knife_blade', 'mace_head', 'pickaxe_head',
    'propick_head', 'saw_blade', 'scythe_blade', 'shovel_head', 'sword_blade'].map((h) => h + '_mold')];
for (const c of FIRED) r(`tfc:ceramic/${c}`, 1, { 'minecraft:clay_ball': 5 }, FIRE);
r('tfc:ceramic/fire_brick', 2, { 'tfc:fire_clay': 5 }, FIRE); // check output count
r('tfc:fire_bricks', 1, { 'tfc:ceramic/fire_brick': 2, 'tfc:mortar': 2 }, ASSEMBLE); // check

module.exports = { RECIPES };
