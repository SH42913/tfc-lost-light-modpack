const { sell, each } = require('../lib');
const { COLORS } = require('../../economy/economy');

const c = (items, amount, opts) => sell(1, items, amount, opts);
const r = (items, amount, opts) => sell(1, items, amount, { ...opts, rare: true });

const FLOWERS = each('tfc:plant/', ['dandelion', 'poppy', 'blue_orchid', 'allium', 'houstonia', 'tulip_red', 'tulip_orange',
  'tulip_white', 'tulip_pink', 'oxeye_daisy', 'pickerelweed', 'lily_of_the_valley', 'lady_fern']);
const DECOR = each('magistuarmory:', ['gazelle_horns', 'duck', 'horse', 'unicorn', 'bullhorns', 'dragon', 'antlers', 'bear',
  'lily', 'lion', 'demon_horns', 'griffin'], '_decoration');

module.exports = {
  id: 'wanderer',
  wanderer: true,
  maxCommonTrades: 6,
  maxRareTrades: 2,
  trades: [
    c(FLOWERS, 2, { max: 4 }),
    c(each('minecraft:', COLORS, '_dye'), 3, { max: 6 }),
    c(each('minecraft:', ['brain', 'bubble', 'fire', 'horn', 'tube'], '_coral_block'), 1, { max: 2 }),
    c(each('tfc:wood/sapling/', ['acacia', 'birch', 'hickory', 'palm', 'spruce', 'kapok', 'sequoia', 'willow']), 1, { max: 2 }),
    c(each('tfc:seeds/', ['wheat', 'beet', 'pumpkin', 'melon', 'cabbage', 'tomato', 'rice', 'onion']), 2, { max: 4 }),
    c(['tfc:sea_pickle', 'tfc:plant/leafy_kelp'], 1, { max: 3 }),
    c('minecraft:nautilus_shell', 1),
    c('tfc:plant/water_lily', 2, { max: 4 }),
    c(['minecraft:slime_ball', 'minecraft:glowstone', 'minecraft:pointed_dripstone', 'minecraft:moss_block'], 1, { max: 3 }),
    c(['tfc:sand/yellow', 'tfc:sand/red'], 8, { max: 16 }),
    c(['tfc:pumpkin', 'tfc:plant/jungle_vines'], 1, { max: 3 }),
    c('tfc:plant/barrel_cactus', 1, { max: 2 }),
    c(['farmersdelight:brown_mushroom_colony', 'farmersdelight:red_mushroom_colony'], 1),
    c(DECOR, 1),
    c(['afc:maple_sugar', 'afc:birch_sugar', 'afc:rubber_bar'], 2, { max: 4 }),
    c(each('afc:wood/sapling/', ['acacia_koa', 'atlas_cedar', 'bald_cypress', 'baobab', 'eucalyptus', 'giant_rosewood', 'hevea', 'ipe']), 1, { max: 2 }),
    c(['create:rose_quartz', 'beneath:gleamflower'], 1, { max: 3 }),
    c(['antiquelegacy:laurel_wreath_decoration', 'antiquelegacy:bronze_small_wings_decoration',
      'antiquelegacy:bronze_horns_decoration', 'antiquelegacy:fur_cloak_decoration'], 1),

    r(['tfc:bucket/tropical_fish', 'tfc:bucket/pufferfish'], 1),
    r('minecraft:packed_ice', 2, { max: 4 }),
    r('minecraft:blue_ice', 1, { max: 2 }),
    r('minecraft:gunpowder', 2, { max: 4 }),
    r('farmersdelight:rich_soil', 3, { max: 6 }),
    r(['magistuarmory:crown_decoration', 'magistuarmory:minicrown_decoration', 'antiquelegacy:golden_laurel_wreath_decoration'], 1, { uses: 1 }),
    r(['tfc:plant/lemon_sapling', 'tfc:plant/banana_sapling', 'firmalife:plant/cocoa_sapling', 'firmalife:plant/fig_sapling'], 1, { uses: 2 }),
    r(['firmalife:cinnamon_bark', 'beneath:ghost_pepper', 'create:polished_rose_quartz'], 1, { max: 2 }),
    r(['firmalife:plant/nightshade_bush', 'firmalife:plant/pineapple_bush'], 1, { uses: 2 }),
    r(['firmalife:plant/vanilla', 'firmalife:plant/cardamom', 'firmalife:plant/bay_laurel'], 1, { uses: 2 }),
  ],
};
