const { sell, buy, craft, each } = require('../lib');

const kot = (list) => each('knightsofterrafirma:', list);
const ma = (metal, list) => list.map((w) => `magistuarmory:${metal}_${w}`);
const ingot = (m) => `tfc:metal/ingot/${m}`;
const swordMace = (m) => [`tfc:metal/sword/${m}`, `tfc:metal/mace/${m}`];

module.exports = {
  id: 'minecraft:weaponsmith',
  trades: [
    buy(1, ['tfc:metal/sword_blade/copper', 'tfc:metal/mace_head/copper'], 1),
    buy(1, 'tfc:metal/javelin_head/copper', 1),
    sell(1, 'tfc:metal/javelin/copper', 1),
    sell(1, swordMace('copper'), 1),
    sell(1, 'tfc:metal/shield/copper', 1),
    sell(1, ma('copper', ['shortsword', 'stylet', 'estoc']), 1),
    craft(1, swordMace('copper'), 1, [ingot('copper'), 2]),

    buy(2, ['tfc:metal/sword_blade/bronze', 'tfc:metal/mace_head/bronze'], 1),
    buy(2, 'tfc:metal/javelin_head/bronze', 1),
    buy(2, kot(['copper_short_sword_blade', 'copper_stiletto_blade', 'copper_heavy_mace_head']), 1),
    sell(2, 'tfc:metal/javelin/bronze', 1),
    sell(2, swordMace('bronze'), 1),
    sell(2, 'tfc:metal/shield/bronze', 1),
    sell(2, kot(['copper_stiletto_blade', 'copper_short_sword_blade', 'copper_katzbalger_blade', 'copper_ahlspiess_blade', 'copper_estoc_blade']), 1),
    sell(2, ma('copper', ['pike', 'heavymace', 'morgenstern', 'lochaberaxe']), 1),
    craft(2, swordMace('bronze'), 1, [ingot('bronze'), 2]),

    buy(3, ['minecraft:leather', 'tfc:glue']),
    sell(3, 'tfc:metal/javelin/wrought_iron', 1),
    sell(3, swordMace('wrought_iron'), 1),
    sell(3, 'tfc:metal/shield/wrought_iron', 1),
    sell(3, ma('bronze', ['shortsword', 'stylet', 'estoc', 'pike', 'heavymace', 'morgenstern', 'lochaberaxe']), 1),
    craft(3, swordMace('wrought_iron'), 1, [ingot('wrought_iron'), 2]),
    craft(3, 'tfc:metal/javelin/wrought_iron', 1, [ingot('wrought_iron'), 1]),

    sell(4, kot(['bronze_gladius', 'bronze_antique_sword', 'bronze_celtic_sword', 'bronze_rhomphaia']), 1),
    sell(4, kot(['bismuth_bronze_bastard_sword', 'bismuth_bronze_claymore']), 1),
    sell(4, swordMace('steel'), 1),
    sell(4, ma('bronze', ['claymore', 'zweihander', 'bastardsword']), 1),
    sell(4, each('antiquelegacy:iron_', ['gladius', 'kopis', 'xiphos', 'spatha', 'doru']), 1),
    craft(4, swordMace('steel'), 1, [ingot('steel'), 2]),

    sell(5, kot(['bronze_zweihander_blade', 'bismuth_bronze_claymore_blade', 'black_bronze_flame_bladed_sword_blade', 'bronze_rhomphaia_blade', 'black_bronze_zweihander_blade']), 1),
    sell(5, 'tfc:metal/sword/black_steel', 1),
    sell(5, 'tfc:metal/shield/steel', 1),
    sell(5, each('valarian_conquest:', ['bandit_sword', 'heavy_axe', 'knights_spear', 'mercenary_sword']), 1, { uses: 2 }),
    craft(5, swordMace('black_steel'), 1, [ingot('black_steel'), 2]),
  ],
};
