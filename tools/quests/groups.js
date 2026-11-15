// Chapter groups of the quest book, in display order. A chapter joins a group with chapter({ group: 'key' }).
const { group } = require('./lib');

module.exports = [
  group('progress', { order: 0, title: { ru: 'Прогресс', en: 'Progress' }, icon: 'tfc:metal/pickaxe/copper' }),
  group('economy', { order: 1, title: { ru: 'Хозяйство', en: 'Homestead' }, icon: 'firmalife:food/pineapple' }),
  group('world', { order: 2, title: { ru: 'Мир', en: 'The World' }, icon: 'minecraft:compass' }),
  group('combat', { order: 3, title: { ru: 'Сражения', en: 'Combat' }, icon: 'tfc:metal/sword/bronze' }),
  group('settlements', { order: 4, title: { ru: 'Поселения', en: 'Settlements' }, icon: 'minecraft:bell' }),
  group('mysteries', { order: 5, title: { ru: 'Тайны', en: 'Mysteries' }, icon: 'minecraft:enchanted_book' }),
];
