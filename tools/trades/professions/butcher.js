const { sell, buy, craft, each } = require('../lib');

const WHEELS = each('firmalife:', ['cheddar', 'chevre', 'feta', 'gouda', 'rajya_metok', 'shosha'], '_wheel');

module.exports = {
  id: 'minecraft:butcher',
  trades: [
    buy(1, each('tfc:food/', ['beef', 'pork', 'mutton', 'chicken', 'chevon', 'duck', 'quail', 'turkey', 'pheasant', 'rabbit'])),
    buy(1, 'tfc:powder/salt'),
    buy(1, 'minecraft:feather'),
    sell(1, each('tfc:food/', ['cooked_chicken', 'cooked_pork', 'cooked_mutton']), 3, { max: 5 }),
    sell(1, 'tfc:metal/knife/copper', 1),
    sell(1, 'firmalife:food/pickled_egg', 2, { max: 4 }),

    buy(2, each('tfc:food/', ['venison', 'camelidae', 'horse_meat', 'bear', 'wolf', 'gran_feline'])),
    buy(2, 'bsa:dried_sinew'),
    sell(2, each('tfc:food/', ['cooked_beef', 'cooked_venison', 'cooked_turkey']), 3, { max: 5 }),
    sell(2, 'tfc:powder/salt', 6, { max: 10 }),
    sell(2, 'pemmican:pemmican', 2, { max: 4 }),
    craft(2, 'survivorsdelight:skillet/copper', 1, ['tfc:metal/ingot/copper', 1]),

    buy(3, 'tfc:blubber'),
    buy(3, 'tfc:goat_horn'),
    sell(3, 'firmalife:food/cooked_bacon', 3, { max: 5 }),
    sell(3, 'tfc:metal/knife/bronze', 1),
    sell(3, 'bsa:sinew', 2, { max: 4 }),
    sell(3, 'firmalife:cheesecloth', 1, { max: 2 }),

    buy(4, 'bsa:sabertooth_fang', 1),
    sell(4, 'tfc:metal/knife/wrought_iron', 1),
    sell(4, 'minecraft:leather', 2, { max: 4 }),
    sell(4, 'sns:lunchbox', 1),
    sell(4, 'firmalife:rennet', 2, { max: 3 }),
    sell(4, 'survivorsdelight:skillet/copper', 1),

    sell(5, 'tfc:metal/knife/steel', 1),
    sell(5, each('tfc:food/', ['cooked_beef', 'cooked_pork', 'cooked_chevon', 'cooked_duck']), 12, { max: 16, key: 'cooked_bulk' }),
    sell(5, 'firmalife:food/bacon', 8, { max: 12 }),
    sell(5, WHEELS, 1),
    craft(5, 'survivorsdelight:skillet/steel', 1, ['tfc:metal/ingot/steel', 1]),
  ],
};
