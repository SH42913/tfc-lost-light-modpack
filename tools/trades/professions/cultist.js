const { sell, buy, each } = require('../lib');

// MCA cultist: dark lore and suspicious babies. Everything sits on level 1.
module.exports = {
  id: 'mca:cultist',
  allowShortLevels: true,
  trades: [
    sell(1, ['mca:sirben_baby_boy', 'mca:sirben_baby_girl'], 1, { worth: 5000, uses: 1 }),
    buy(1, ['mca:baby_boy', 'mca:baby_girl'], 1, { worth: 1000, uses: 1 }),
    sell(1, each('mca:book_cult_', ['0', '1', '2']), 1, { worth: 800, uses: 1 }),
    sell(1, ['mca:book_death', 'mca:book_infection', 'mca:book_supporters'], 1, { worth: 800, uses: 1 }),
    buy(1, ['minecraft:rotten_flesh', 'minecraft:bone', 'minecraft:spider_eye'], 24, { worth: 60 }),
    sell(1, 'tfc:candle', 4, { max: 8 }),
  ],
};
