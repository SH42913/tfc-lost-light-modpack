const { sell, buy, each } = require('../lib');

// MCA adventurer: travelling merchant of curiosities. Everything sits on level 1.
module.exports = {
  id: 'mca:adventurer',
  allowShortLevels: true,
  trades: [
    buy(1, ['tfc:food/wheat_bread', 'tfc:food/barley_bread', 'tfc:food/oat_bread'], 12, { worth: 120 }),
    buy(1, 'magical_relics:raw_manaessence'),
    sell(1, 'minecraft:slime_ball', 1, { max: 3 }),
    sell(1, 'minecraft:saddle', 1),
    sell(1, 'minecraft:leather_horse_armor', 1),
    sell(1, 'tfc:metal/horse_armor/bronze', 1, { uses: 2 }),
    sell(1, 'minecraft:lead', 1, { max: 2 }),
    sell(1, 'minecraft:name_tag', 1),
    sell(1, 'minecraft:golden_apple', 1, { uses: 3 }),
    sell(1, 'minecraft:enchanted_golden_apple', 1, { uses: 1 }),
    sell(1, 'sns:metal/horseshoes/steel', 1, { uses: 2 }),
    sell(1, ['waystones:warp_scroll', 'waystones:return_scroll'], 1, { max: 2 }),
    sell(1, 'tfc:metal/ingot/wrought_iron', 1, { uses: 4 }),
    sell(1, ['magical_relics:random_artifact', 'magical_relics:iron_trinket_artifact'], 1, { uses: 1 }),
    sell(1, ['magical_relics:wood_ring_artifact', 'magical_relics:stone_amulet_artifact'], 1, { uses: 1 }),
    sell(1, each('ringsofascension:ring_', ['luck', 'speed', 'night_vision', 'water_breathing', 'jump_boost']), 1, { uses: 1 }),
    sell(1, ['mca:engagement_ring', 'mca:matchmakers_ring', 'mca:wedding_ring'], 1, { uses: 1 }),
    sell(1, ['mca:bouquet', 'mca:whistle', 'mca:needle_and_thread', 'mca:comb'], 1),
    sell(1, ['tfc_dynamite:crude_dynamite_stick', 'supplementaries:bomb'], 1, { max: 3 }),
    sell(1, ['supplementaries:slingshot', 'supplementaries:flute', 'supplementaries:cage'], 1),
    sell(1, 'aquaculture:lockbox', 1, { uses: 2 }),
  ],
};
