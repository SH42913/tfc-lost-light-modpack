const { sell, buy, craft, each } = require('../lib');

const MOLDS = each('tfc:ceramic/', ['axe_head', 'chisel_head', 'hammer_head', 'hoe_head', 'javelin_head', 'knife_blade',
  'mace_head', 'pickaxe_head', 'propick_head', 'saw_blade', 'scythe_blade', 'shovel_head', 'sword_blade'], '_mold');

module.exports = {
  id: 'minecraft:mason',
  trades: [
    buy(1, each('tfc:rock/raw/', ['granite', 'limestone', 'marble', 'basalt', 'andesite', 'chalk'])),
    buy(1, 'tfc:mortar'),
    buy(1, ['tfc:aggregate', 'rnr:crushed_base_course', 'rnr:hoggin_mix']),
    sell(1, each('tfc:rock/hardened/', ['andesite', 'basalt', 'chalk', 'marble']), 16, { max: 24 }),
    sell(1, 'minecraft:clay_ball', 12, { max: 20 }),
    sell(1, ['tfc:daub', 'tfc:wattle', 'tfc:smooth_mud_bricks'], 16, { max: 24 }),
    sell(1, ['rnr:hoggin', 'rnr:base_course'], 16, { max: 32 }),

    buy(2, each('tfc:brick/', ['granite', 'limestone', 'marble', 'basalt', 'andesite', 'chalk'])),
    buy(2, 'tfc:powder/lime'),
    buy(2, 'tfc:groundcover/pumice'),
    sell(2, each('tfc:rock/bricks/', ['granite', 'marble', 'basalt']), 16, { max: 24 }),
    sell(2, 'tfc:metal/chisel/copper', 1),
    sell(2, ['rnr:ceramic_roof_tile', 'rnr:flagstone/red_sandstone'], 16, { max: 32 }),
    sell(2, ['chalk:white_chalk', 'chalk:red_chalk'], 2, { max: 4 }),
    craft(2, ['tfc:ceramic/vessel', 'tfc:ceramic/ingot_mold'], 1, ['minecraft:clay_ball', 5]),

    buy(3, 'tfc:alabaster/raw'),
    buy(3, 'tfc:fire_clay'),
    buy(3, ['tfc:calcite', 'tfc:ore/gypsum']),
    sell(3, each('tfc:rock/chiseled/', ['granite', 'marble', 'basalt']), 8, { max: 16 }),
    sell(3, 'tfc:alabaster/bricks', 12, { max: 16 }),
    sell(3, ['rnr:ceramic_roof', 'rnr:brick_road', 'alekiroofs:brick_roofing'], 8, { max: 16 }),
    sell(3, ['supplementaries:timber_frame', 'supplementaries:timber_brace', 'supplementaries:timber_cross_brace'], 8, { max: 16 }),
    sell(3, 'chalk:chalk_box', 1),
    craft(3, 'tfc:ceramic/large_vessel', 1, ['minecraft:clay_ball', 5]),
    craft(3, MOLDS, 1, ['minecraft:clay_ball', 5]),

    buy(4, 'tfc:kaolin_clay'),
    sell(4, 'tfc:fire_bricks', 2, { max: 4 }),
    sell(4, 'tfc:metal/chisel/bronze', 1),
    sell(4, 'tfc:ceramic/large_vessel', 1),
    sell(4, ['firmalife:tiles', 'firmalife:sealed_bricks', 'firmalife:rustic_bricks'], 8, { max: 16 }),
    sell(4, 'rnr:metal/mattock/copper', 1),
    craft(4, 'tfc:ceramic/fire_brick', 4, ['tfc:fire_clay', 10]),

    sell(5, 'tfc:metal/chisel/wrought_iron', 1),
    sell(5, 'tfc:fire_clay', 6, { max: 10 }),
    sell(5, each('tfc:rock/hardened/', ['dolomite', 'gabbro', 'schist', 'phyllite', 'conglomerate']), 24, { max: 32 }),
    sell(5, 'tfc:kaolin_clay', 3, { max: 5 }),
    sell(5, 'tfc:crucible', 1),
    sell(5, 'rnr:metal/mattock/bronze', 1),
  ],
};
