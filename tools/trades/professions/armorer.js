const { sell, buy, craft } = require('../lib');

// Variants of one trade share a price, so pieces are grouped by price: helmet+greaves / boots / chestplate.
// Armor follows TFC: helmet/greaves = 3 sheets, chestplate = 4, boots = 2. Wrought iron and better armor
// costs more than 64 gems, so it is only made to order from the player's sheets.
const pieces = (metals, list) => metals.flatMap((m) => list.map((p) => `tfc:metal/${p}/${m}`));
const HG = ['helmet', 'greaves'];
const sheet = (m) => `tfc:metal/sheet/${m}`;
const order = (level, m) => [
  craft(level, pieces([m], HG), 1, [sheet(m), 3]),
  craft(level, `tfc:metal/chestplate/${m}`, 1, [sheet(m), 4]),
  craft(level, `tfc:metal/boots/${m}`, 1, [sheet(m), 2]),
];
const SHIELDS = (m) => ['buckler', 'kiteshield', 'target', 'pavese', 'rondache', 'tartsche'].map((s) => `magistuarmory:${m}_${s}`);

module.exports = {
  id: 'minecraft:armorer',
  trades: [
    buy(1, ['tfc:metal/sheet/copper', 'tfc:metal/double_ingot/copper'], 1),
    buy(1, 'minecraft:leather'),
    sell(1, pieces(['copper'], HG), 1),
    sell(1, 'tfc:metal/boots/copper', 1),
    sell(1, ['magistuarmory:copper_heatershield', 'magistuarmory:copper_roundshield'], 1),
    sell(1, 'antiquelegacy:linothorax', 1),
    ...order(1, 'copper'),

    buy(2, ['tfc:metal/sheet/bronze', 'tfc:metal/double_ingot/bronze'], 1),
    buy(2, 'tfc:metal/unfinished_helmet/copper', 1),
    sell(2, 'tfc:metal/chestplate/copper', 1),
    sell(2, pieces(['bronze', 'bismuth_bronze'], HG), 1),
    sell(2, pieces(['bronze', 'bismuth_bronze'], ['boots']), 1),
    sell(2, SHIELDS('copper'), 1),
    sell(2, 'tfc:metal/horse_armor/copper', 1),
    ...order(2, 'bronze'),

    buy(3, ['tfc:metal/sheet/wrought_iron', 'tfc:metal/double_ingot/wrought_iron'], 1),
    buy(3, 'tfc:metal/double_sheet/bronze', 1),
    sell(3, pieces(['bronze', 'bismuth_bronze'], ['chestplate']), 1),
    sell(3, pieces(['black_bronze'], HG), 1),
    sell(3, 'tfc:metal/boots/black_bronze', 1),
    sell(3, SHIELDS('bronze'), 1),
    sell(3, 'tfc:metal/horse_armor/bronze', 1),
    craft(3, pieces(['black_bronze'], HG), 1, [sheet('black_bronze'), 3]),

    buy(4, 'tfc:metal/sheet/steel', 1),
    sell(4, 'tfc:metal/boots/wrought_iron', 1),
    sell(4, ['magistuarmory:iron_heatershield', 'magistuarmory:iron_kiteshield'], 1),
    sell(4, ['antiquelegacy:bronze_montefortino_helmet', 'antiquelegacy:bronze_roman_greaves', 'antiquelegacy:greek_greaves'], 1),
    sell(4, 'antiquelegacy:hamata', 1),
    ...order(4, 'wrought_iron'),

    sell(5, 'tfc:metal/boots/steel', 1),
    sell(5, 'antiquelegacy:iron_chainmail', 1),
    sell(5, 'sns:metal/horseshoes/steel', 1),
    ...order(5, 'steel'),
    craft(5, pieces(['black_steel'], HG), 1, [sheet('black_steel'), 3]),
  ],
};
