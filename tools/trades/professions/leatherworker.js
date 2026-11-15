const { sell, buy, craft, each } = require('../lib');

const BEEKEEPER = each('firmalife:beekeeper_', ['helmet', 'chestplate', 'leggings', 'boots']);

module.exports = {
  id: 'minecraft:leatherworker',
  trades: [
    buy(1, 'tfc:small_raw_hide'),
    buy(1, 'minecraft:leather'),
    buy(1, 'tfc:small_scraped_hide'),
    sell(1, 'minecraft:leather', 2, { max: 4 }),
    sell(1, 'waterflasks:leather_flask', 1),
    sell(1, ['minecraft:leather_helmet', 'minecraft:leather_boots'], 1),
    sell(1, ['sns:leather_strip', 'sns:reinforced_fiber'], 2, { max: 4 }),
    craft(1, 'minecraft:leather', 4, ['tfc:small_raw_hide', 4]),

    buy(2, 'tfc:medium_raw_hide'),
    buy(2, 'tfc:glue'),
    buy(2, ['tfc:small_prepared_hide', 'tfc:medium_scraped_hide']),
    sell(2, 'tfc:treated_hide', 1, { max: 2 }),
    sell(2, ['minecraft:leather_chestplate', 'minecraft:leather_leggings'], 1),
    sell(2, 'minecraft:lead', 1),
    sell(2, ['waterflasks:leather_side', 'waterflasks:bladder', 'sns:bound_leather_strip'], 1, { max: 2 }),
    craft(2, 'minecraft:leather', 4, ['tfc:medium_raw_hide', 2]),
    craft(2, 'sns:leather_sack', 1, ['minecraft:leather', 2]),

    buy(3, 'tfc:large_raw_hide'),
    buy(3, 'tfc:powder/wood_ash'),
    buy(3, ['tfc:medium_prepared_hide', 'tfc:large_scraped_hide']),
    sell(3, 'minecraft:saddle', 1),
    sell(3, 'sns:leather_sack', 1),
    sell(3, 'firmaciv:large_waterproof_hide', 1),
    sell(3, ['sns:burlap_sack', 'sns:buckle', 'bsa:hide_door'], 1),
    craft(3, 'minecraft:leather', 6, ['tfc:large_raw_hide', 2]),
    craft(3, 'minecraft:saddle', 1, ['minecraft:leather', 1]),

    buy(4, 'tfc:large_prepared_hide', 1),
    sell(4, 'sns:hiking_boots', 1),
    sell(4, 'minecraft:leather_horse_armor', 1),
    sell(4, 'waterflasks:iron_flask', 1),
    sell(4, 'sns:reinforced_fabric', 2, { max: 4 }),
    sell(4, BEEKEEPER, 1),
    sell(4, 'antiquelegacy:sandals', 1),
    sell(4, 'firmalife:pineapple_leather', 2, { max: 4 }),

    sell(5, 'sns:frame_pack', 1),
    sell(5, 'sns:steel_toe_hiking_boots', 1),
    sell(5, 'sns:mob_net', 1),
    sell(5, 'sns:pack_frame', 1),
    sell(5, 'tfcscraping:metal/scraping_knife/bronze', 1),
  ],
};
