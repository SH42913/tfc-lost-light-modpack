const { sell, buy, craft, each } = require('../lib');

const TOOLS = ['pickaxe', 'axe', 'hammer', 'saw', 'propick', 'shovel', 'hoe', 'scythe'];
const tools = (metal) => TOOLS.map((t) => `tfc:metal/${t}/${metal}`);
const heads = (metal) => each('tfc:metal/', ['pickaxe_head', 'axe_head', 'hammer_head', 'saw_blade'], '/' + metal);
const prospect = (metal) => each('precisionprospecting:metal/', ['prospector_hammer', 'mineral_prospector', 'prospector_drill'], '/' + metal);
const ingot = (m) => `tfc:metal/ingot/${m}`;

// The toolsmith is also the money changer: the only villager that trades ingots both ways.
module.exports = {
  id: 'minecraft:toolsmith',
  trades: [
    buy(1, heads('copper'), 1),
    buy(1, ingot('copper'), 1),
    buy(1, ['minecraft:charcoal', 'tfc:powder/flux']),
    sell(1, ingot('copper'), 1),
    sell(1, tools('copper'), 1),
    sell(1, ['tfc:firestarter', 'tfc:sandpaper'], 1, { max: 2 }),
    craft(1, tools('copper'), 1, [ingot('copper'), 1]),

    buy(2, heads('bronze'), 1),
    buy(2, ['tfc:metal/ingot/bronze', 'tfc:metal/ingot/bismuth_bronze'], 1),
    sell(2, ['tfc:metal/ingot/bronze', 'tfc:metal/ingot/bismuth_bronze'], 1),
    sell(2, tools('bronze'), 1),
    sell(2, 'tfc:metal/rod/copper', 2),
    sell(2, prospect('copper'), 1),
    sell(2, ['tfc:metal/chain/copper', 'tfc:metal/bars/copper'], 4, { max: 8 }),
    craft(2, tools('bronze'), 1, [ingot('bronze'), 1]),
    craft(2, 'tfc:metal/lamp/copper', 1, [ingot('copper'), 1]),

    buy(3, heads('wrought_iron'), 1),
    buy(3, ingot('wrought_iron'), 1),
    sell(3, ingot('wrought_iron'), 1),
    sell(3, tools('wrought_iron'), 1),
    sell(3, 'sns:ore_sack', 1),
    sell(3, prospect('bronze'), 1),
    sell(3, ['tfc:gem_saw', 'create:wrench', 'supplementaries:wrench'], 1),
    craft(3, tools('wrought_iron'), 1, [ingot('wrought_iron'), 1]),

    buy(4, ingot('steel'), 1),
    sell(4, ingot('steel'), 1),
    sell(4, tools('steel'), 1),
    sell(4, prospect('wrought_iron'), 1),
    sell(4, ['tfc:metal/chain/wrought_iron', 'tfc:metal/bars/wrought_iron'], 4, { max: 8 }),
    craft(4, tools('steel'), 1, [ingot('steel'), 1]),

    sell(5, ingot('black_steel'), 1),
    sell(5, ['tfc:metal/pickaxe/black_steel', 'tfc:metal/axe/black_steel', 'tfc:metal/saw/black_steel'], 1),
    sell(5, ['tfc:metal/propick/black_steel', 'tfc:metal/hammer/black_steel', 'tfc:metal/chisel/black_steel'], 1),
    craft(5, tools('black_steel'), 1, [ingot('black_steel'), 1]),
    craft(5, 'tfc:metal/lamp/wrought_iron', 1, [ingot('wrought_iron'), 1]),
  ],
};
