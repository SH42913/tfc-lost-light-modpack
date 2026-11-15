const { sell, buy, craft, each } = require('../lib');

module.exports = {
  id: 'minecraft:fisherman',
  trades: [
    buy(1, each('tfc:food/', ['cod', 'salmon', 'lake_trout', 'rainbow_trout', 'bluegill', 'crappie', 'largemouth_bass', 'smallmouth_bass'])),
    buy(1, ['tfc:food/fresh_seaweed', 'minecraft:kelp']),
    buy(1, ['aquaculture:fish_bones', 'aquaculture:algae']),
    sell(1, 'tfc:metal/fishing_rod/copper', 1),
    sell(1, 'aquaculture:worm', 4, { max: 8 }),
    sell(1, 'bsa:bone/fishing_rod', 1),
    craft(1, 'tfc:metal/fishing_rod/copper', 1, ['tfc:metal/ingot/copper', 1]),

    buy(2, each('tfc:food/', ['shellfish', 'calamari', 'tropical_fish'])),
    buy(2, each('tfc:groundcover/', ['clam', 'mussel', 'mollusk', 'sea_urchin'])),
    sell(2, each('tfc:food/', ['cooked_cod', 'cooked_salmon', 'cooked_lake_trout', 'cooked_rainbow_trout']), 3, { max: 5 }),
    sell(2, 'firmaciv:rope_coil', 2, { max: 4 }),
    sell(2, 'supplementaries:rope', 8, { max: 16 }),
    sell(2, 'firmaciv:canoe_paddle', 1),
    sell(2, ['aquaculture:bobber', 'aquaculture:fishing_line'], 1),

    buy(3, 'tfc:groundcover/driftwood'),
    buy(3, ['tfc:food/dried_kelp', 'tfc:food/dried_seaweed']),
    sell(3, 'tfc:metal/fishing_rod/bronze', 1),
    sell(3, 'firmaciv:kayak_paddle', 1),
    sell(3, each('aquaculture:', ['light_hook', 'heavy_hook', 'double_hook']), 1),
    sell(3, 'tfc:jute_net', 1),
    craft(3, 'tfc:metal/fishing_rod/bronze', 1, ['tfc:metal/ingot/bronze', 1]),

    buy(4, 'aquaculture:message_in_a_bottle', 1),
    sell(4, 'tfc:metal/fishing_rod/wrought_iron', 1),
    sell(4, 'firmaciv:small_triangular_sail', 1),
    sell(4, 'aquaculture:tackle_box', 1),
    sell(4, ['aquaculture:worm_farm', 'aquaculture:oak_fish_mount'], 1),
    craft(4, 'tfc:metal/fishing_rod/wrought_iron', 1, ['tfc:metal/ingot/wrought_iron', 1]),

    sell(5, 'tfc:metal/fishing_rod/steel', 1),
    sell(5, 'firmaciv:medium_triangular_sail', 1),
    sell(5, each('aquaculture:', ['gold_hook', 'redstone_hook', 'note_hook']), 1),
    sell(5, ['aquaculture:treasure_chest', 'survivorsaquaculture:neptunian_pearl'], 1, { uses: 2 }),
    craft(5, 'tfc:metal/fishing_rod/steel', 1, ['tfc:metal/ingot/steel', 1]),
  ],
};
