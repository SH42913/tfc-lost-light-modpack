const { sell, buy, each } = require('../lib');

// Real vanilla potions (Potion tag), so they have proper names and colors. Brewed to order: the player brings a bottle.
const potion = (level, type, worth) => sell(level, 'minecraft:potion', 1, {
  nbt: `{Potion:"minecraft:${type}"}`, worth, key: 'potion_' + type, uses: 4, extra: ['minecraft:glass_bottle', 1],
});
const CANDLES = each('tfc:candle/', ['red', 'blue', 'white', 'yellow', 'green', 'black']);

module.exports = {
  id: 'minecraft:cleric',
  trades: [
    buy(1, 'minecraft:rotten_flesh'),
    buy(1, 'minecraft:bone'),
    buy(1, ['tfc_spirits:silvery_string', 'tfc_spirits:withered_matter']),
    sell(1, 'tfc:candle', 2, { max: 4 }),
    sell(1, 'minecraft:bone_meal', 12, { max: 20 }),
    sell(1, ['supplementaries:soap', 'supplementaries:candle_holder'], 1, { max: 2 }),

    buy(2, 'minecraft:spider_eye'),
    buy(2, 'minecraft:glass_bottle'),
    buy(2, 'tfc_spirits:fairy_ring_mushroom'),
    sell(2, 'minecraft:experience_bottle', 2, { max: 3 }),
    sell(2, CANDLES, 2, { max: 4 }),
    sell(2, ['tfc_spirits:tiny_carved_skull', 'supplementaries:urn'], 1),
    potion(2, 'night_vision', 2000),
    potion(2, 'water_breathing', 2000),

    buy(3, 'minecraft:gunpowder'),
    buy(3, ['tfc:powder/sulfur', 'tfc:powder/saltpeter']),
    sell(3, 'firmalife:raw_honey', 2, { max: 3 }),
    sell(3, ['tfc_spirits:crucifix', 'tfc_spirits:runestone'], 1),
    sell(3, 'tfc_spirits:holy_water_bucket', 1),
    potion(3, 'healing', 2500),
    potion(3, 'regeneration', 3000),

    buy(4, 'tfc:candle'),
    buy(4, 'firmalife:beeswax'),
    buy(4, each('beneath:pure_', ['death', 'decay', 'sorrow', 'flame']), 1),
    sell(4, 'minecraft:ender_pearl', 1),
    sell(4, ['tfc_spirits:adder_stone', 'tfc_spirits:evil_eye_talisman'], 1, { uses: 2 }),
    potion(4, 'long_swiftness', 3500),
    potion(4, 'long_fire_resistance', 3500),

    buy(5, 'minecraft:ender_pearl', 1),
    sell(5, 'tfc:metal/ingot/gold', 1),
    sell(5, 'minecraft:experience_bottle', 6, { max: 8, key: 'experience_bottle_bulk' }),
    sell(5, ['tfc_spirits:wildrunner_charm', 'tfc_spirits:spirit_seal'], 1, { uses: 2 }),
    potion(5, 'strong_healing', 4500),
    potion(5, 'long_strength', 5000),
  ],
};
