const { sell, buy, craft, each } = require('../lib');
const { COLORS } = require('../../economy/economy');

const WOODS = ['oak', 'birch', 'spruce'];

module.exports = {
  id: 'minecraft:shepherd',
  trades: [
    buy(1, 'tfc:wool'),
    buy(1, 'tfc:jute_fiber'),
    buy(1, 'supplementaries:flax'),
    sell(1, 'tfc:burlap_cloth', 2, { max: 4 }),
    sell(1, 'minecraft:white_wool', 2, { max: 4 }),
    sell(1, each('minecraft:', ['red', 'yellow', 'blue', 'green', 'black', 'white'], '_dye'), 4, { max: 8 }),
    craft(1, 'tfc:burlap_cloth', 5, ['tfc:jute_fiber', 60]),

    buy(2, 'tfc:wool_yarn'),
    buy(2, 'tfc:small_sheepskin_hide', 2),
    buy(2, each('minecraft:', ['red', 'yellow', 'blue', 'green', 'black', 'white'], '_dye')),
    sell(2, 'tfc:wool_cloth', 2, { max: 4 }),
    sell(2, each('minecraft:', COLORS, '_carpet'), 4, { max: 8 }),
    sell(2, ['supplementaries:doormat', 'farmersdelight:half_tatami_mat', 'tfc:thatch_bed'], 1, { max: 2 }),

    buy(3, 'tfc:medium_sheepskin_hide', 2),
    buy(3, ['firmalife:pineapple_fiber', 'firmalife:pineapple_yarn']),
    sell(3, 'tfc:spindle', 1),
    sell(3, each('minecraft:', COLORS, '_wool'), 2, { max: 4 }),
    sell(3, 'tfc:metal/shears/copper', 1),
    sell(3, ['farmersdelight:canvas', 'farmersdelight:canvas_rug', 'farmersdelight:full_tatami_mat'], 1, { max: 2 }),
    sell(3, each('tfc:wood/planks/', WOODS, '_loom'), 1),

    buy(4, 'tfc:large_sheepskin_hide', 1),
    sell(4, each('minecraft:', COLORS, '_bed'), 1),
    sell(4, 'tfc:silk_cloth', 1, { max: 2 }),
    sell(4, 'tfc:metal/shears/bronze', 1),
    sell(4, ['tfc_derbys_spindles:copper_spindle', 'tfc_derbys_spindles:bronze_spindle'], 1),
    sell(4, each('tfc:wood/sewing_table/', WOODS), 1),
    craft(4, 'tfc:silk_cloth', 2, ['minecraft:string', 48]),
    craft(4, each('minecraft:', COLORS, '_bed'), 1, ['minecraft:white_wool', 3]),

    sell(5, 'tfc:metal/shears/wrought_iron', 1),
    sell(5, 'tfc:silk_cloth', 3, { max: 5, key: 'silk_bulk' }),
    sell(5, 'tfc:wool_cloth', 12, { max: 16, key: 'wool_cloth_bulk' }),
    sell(5, 'tfc_derbys_spindles:wrought_iron_spindle', 1),
  ],
};
