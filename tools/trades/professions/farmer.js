const { sell, buy, each } = require('../lib');

const JARS = each('tfc:jar/', ['plum', 'cherry', 'blueberry', 'strawberry', 'peach', 'red_apple', 'orange', 'raspberry']);

module.exports = {
  id: 'minecraft:farmer',
  trades: [
    buy(1, each('tfc:food/', ['wheat', 'barley', 'oat', 'rye', 'rice', 'maize'])),
    buy(1, each('tfc:food/', ['potato', 'carrot', 'beet', 'onion', 'garlic', 'cabbage', 'tomato', 'squash', 'soybean'])),
    buy(1, ['tfc:jute', 'tfc:food/sugarcane']),
    buy(1, 'tfc:straw'),
    sell(1, each('tfc:seeds/', ['wheat', 'barley', 'oat', 'rye', 'rice', 'maize']), 4, { max: 8 }),
    sell(1, each('tfc:seeds/', ['potato', 'carrot', 'beet', 'onion']), 4, { max: 8 }),
    sell(1, 'tfc:compost', 4, { max: 8 }),

    buy(2, each('tfc:food/', ['red_apple', 'green_apple', 'peach', 'plum', 'olive'])),
    buy(2, each('tfc:food/', ['blueberry', 'strawberry', 'raspberry', 'cranberry', 'elderberry'])),
    buy(2, 'tfc:groundcover/guano'),
    sell(2, each('tfc:seeds/', ['garlic', 'cabbage', 'tomato', 'squash', 'soybean', 'jute']), 4, { max: 8 }),
    sell(2, each('tfc:food/', ['wheat_bread', 'barley_bread', 'oat_bread', 'rye_bread']), 4, { max: 6 }),
    sell(2, 'sns:straw_basket', 1),
    sell(2, 'firmalife:seed_ball', 2, { max: 4 }),

    buy(3, 'firmalife:beeswax'),
    sell(3, each('tfc:plant/', ['red_apple_sapling', 'green_apple_sapling', 'cherry_sapling', 'plum_sapling']), 1),
    sell(3, ['tfc:seeds/melon', 'tfc:seeds/pumpkin', 'tfc:seeds/red_bell_pepper', 'tfc:seeds/yellow_bell_pepper'], 2, { max: 4 }),
    sell(3, 'tfc:food/cheese', 2, { max: 3 }),
    sell(3, 'sns:seed_pouch', 1),
    sell(3, 'firmalife:watering_can', 1),

    buy(4, 'firmalife:beehive_frame', 2),
    sell(4, each('tfc:plant/', ['peach_sapling', 'olive_sapling', 'orange_sapling', 'banana_sapling', 'lemon_sapling']), 1),
    sell(4, each('firmalife:plant/', ['basil', 'cilantro', 'cumin', 'oregano', 'pimento']), 1),
    sell(4, 'firmalife:raw_honey', 2, { max: 3 }),
    sell(4, JARS, 2, { max: 4 }),

    sell(5, each('firmalife:plant/', ['cocoa_sapling', 'fig_sapling', 'pineapple_bush']), 1),
    sell(5, each('firmalife:plant/', ['bay_laurel', 'cardamom', 'vanilla']), 1),
    sell(5, ['firmalife:plant/wild_red_grapes', 'firmalife:plant/wild_white_grapes'], 1),
    sell(5, JARS, 8, { max: 12, key: 'jar_bulk' }),
  ],
};
