// Reward tables (FTB Quests reward_tables/*.snbt). Quests use them with random(), choice(), allTable(), lootCrate().
// entry(item, count, weight): worth of a table = weighted mean of economy.value (tools/economy) * count.
const { table, entry } = require('./lib');

module.exports = [
  // ---- exploration crates: tiers by distance and danger ----
  table('explore_common', {
    title: { ru: 'Находки путника', en: 'Traveller\'s Finds' },
    icon: 'tfc:wood/chest/oak',
    crate: { name: { ru: 'Потёртый мешок путника', en: 'Worn Traveller\'s Bag' }, color: 0x9C7A4B },
    entries: [
      entry('tfc:gem/pyrite', 2, 3),
      entry('tfc:gem/lapis_lazuli', 2, 3),
      entry('tfc:gem/amethyst', 2, 3),
      entry('minecraft:map', 2, 2),
      entry('minecraft:lead', 2, 2),
      entry('tfc:food/cooked_beef', 6, 3),
      entry('tfc_arch:stone_arrow', 12, 2),
      entry('supplementaries:flute', 1, 1),
      entry('sns:quiver', 1, 1),
      entry('tfc:metal/ingot/copper', 1, 1),
    ],
  }),
  table('explore_rare', {
    title: { ru: 'Ценная добыча', en: 'Valuable Loot' },
    icon: 'tfc:wood/chest/blackwood',
    crate: { name: { ru: 'Окованный сундучок', en: 'Iron-bound Chest' }, color: 0x4B7FBF },
    entries: [
      entry('tfc:metal/ingot/bronze', 1, 2),
      entry('tfc:metal/ingot/gold', 1, 2),
      entry('tfc:gem/ruby', 4, 2),
      entry('tfc:gem/sapphire', 4, 2),
      entry('tfc:gem/topaz', 4, 2),
      entry('minecraft:spyglass', 1, 1),
      entry('minecraft:saddle', 1, 1),
      entry('minecraft:name_tag', 2, 1),
      entry('waystones:return_scroll', 2, 1),
      entry('waystones:warp_scroll', 2, 1),
      entry('sns:lunchbox', 1, 1),
      entry('minecraft:compass', 2, 1),
    ],
  }),
  table('explore_epic', {
    title: { ru: 'Сокровища древних', en: 'Treasures of the Ancients' },
    icon: 'minecraft:ender_chest',
    crate: { name: { ru: 'Сундук древних', en: 'Ancient Chest' }, color: 0xD4AF37, glow: true },
    entries: [
      entry('tfc:metal/ingot/black_bronze', 2, 2),
      entry('tfc:metal/ingot/wrought_iron', 2, 2),
      entry('tfc:metal/ingot/steel', 1, 2),
      entry('tfc:metal/ingot/black_steel', 1, 1),
      entry('tfc:gem/diamond', 10, 2),
      entry('minecraft:golden_apple', 2, 1),
      entry('minecraft:ender_pearl', 8, 1),
    ],
  }),

  // ---- boss trophies: finales of the bosses chapter ----
  table('boss_trophy', {
    title: { ru: 'Трофеи героя', en: 'Hero\'s Trophies' },
    icon: 'minecraft:enchanted_golden_apple',
    crate: { name: { ru: 'Королевская казна', en: 'Royal Treasury' }, color: 0xB0303A, glow: true },
    entries: [
      entry('tfc:metal/double_ingot/black_steel', 1, 2),
      entry('tfc:metal/ingot/black_steel', 2, 2),
      entry('minecraft:enchanted_golden_apple', 1, 1),
      entry('tfc:gem/diamond', 25, 2),
      entry('minecraft:golden_apple', 6, 2),
    ],
  }),
];
