const { sell, buy, each } = require('../lib');
const { COLORS } = require('../../economy/economy');

module.exports = {
  id: 'minecraft:cartographer',
  trades: [
    buy(1, 'minecraft:paper'),
    buy(1, 'tfc:unrefined_paper'),
    sell(1, 'minecraft:map', 1),
    sell(1, 'minecraft:item_frame', 2, { max: 4 }),
    sell(1, each('tfc:wood/sign/', ['oak', 'birch', 'spruce']), 2, { max: 4 }),

    buy(2, ['minecraft:ink_sac', 'minecraft:black_dye']),
    buy(2, 'minecraft:glass_pane'),
    sell(2, 'minecraft:compass', 1),
    buy(2, 'tfc:silica_glass_bottle'),
    sell(2, each('supplementaries:tfc/sign_post_', ['oak', 'birch', 'spruce']), 1, { max: 3 }),
    sell(2, each('minecraft:', COLORS, '_banner'), 1, { max: 2 }),

    buy(3, 'tfc:lens', 1),
    sell(3, 'firmaciv:firmaciv_compass', 1),
    sell(3, 'minecraft:clock', 1),
    buy(3, 'firmaciv:copper_bolt'),
    sell(3, ['supplementaries:wind_vane', 'supplementaries:slice_map'], 1),
    sell(3, each('minecraft:', ['globe', 'flower', 'creeper', 'skull', 'mojang', 'piglin'], '_banner_pattern'), 1),

    buy(4, 'minecraft:compass', 1),
    sell(4, 'minecraft:spyglass', 1),
    sell(4, 'firmaciv:barometer', 1),
    buy(4, 'tfc:brass_mechanisms', 1),
    sell(4, ['firmaciv:unfinished_barometer', 'firmaciv:unfinished_sextant', 'firmaciv:unfinished_nav_clock'], 1),
    sell(4, 'minecraft:map', 4, { key: 'map_bulk' }),

    sell(5, 'firmaciv:sextant', 1),
    sell(5, 'firmaciv:nav_clock', 1),
    sell(5, ['supplementaries:altimeter', 'supplementaries:globe_sepia'], 1, { uses: 2 }),
    sell(5, ['waystones:warp_scroll', 'waystones:return_scroll'], 1),
  ],
};
