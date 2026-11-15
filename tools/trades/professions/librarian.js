const fs = require('fs');
const path = require('path');
const { sell, buy, each } = require('../lib');

// Enchantments come from ESO recipes, so the librarian never sells enchantments hidden by ESO.
// Rarity is derived from the level-1 XP cost written by tools/eso/gen_eso.js.
const esoDir = path.join(process.argv[2], 'tfc_structures_datapacks/lost_light_datapack/data/enchanting_system_overhaul/ench-recipes');
const RARITY = { 1: 'common', 2: 'uncommon', 3: 'rare', 10: 'treasure' };
const ench = fs.readdirSync(esoDir).map((f) => {
  const r = JSON.parse(fs.readFileSync(path.join(esoDir, f), 'utf8'));
  return { id: r.enchantment_id, max: Object.keys(r.levels).length, rarity: RARITY[r.xp['1']] };
}).filter((e) => e.rarity && e.id !== 'minecraft:mending'); // curses have xp 0 -> no rarity

const pick = (rarities, level) => ench.filter((e) => rarities.includes(e.rarity))
  .map((e) => ({ id: e.id, level: Math.min(level, e.max) }));
const book = (level, rarities, enchLevel, worth) => sell(level, 'minecraft:enchanted_book', 1, {
  enchants: pick(rarities, enchLevel), worth, extra: ['minecraft:book', 1], uses: 3,
  key: `book_${rarities.join('_')}_${enchLevel}`,
});

const BOOKSHELVES = each('tfc:wood/planks/', ['oak', 'birch', 'spruce', 'hickory', 'maple', 'chestnut'], '_bookshelf');

module.exports = {
  id: 'minecraft:librarian',
  trades: [
    buy(1, 'minecraft:paper'),
    buy(1, 'tfc:unrefined_paper'),
    buy(1, 'tfc:papyrus'),
    sell(1, 'minecraft:book', 1, { max: 2 }),
    sell(1, ['supplementaries:notice_board', 'create:clipboard'], 1),
    book(1, ['common'], 1, 3000),

    buy(2, 'minecraft:ink_sac'),
    buy(2, 'minecraft:feather'),
    sell(2, 'minecraft:writable_book', 1),
    sell(2, 'minecraft:lantern', 1),
    buy(2, 'firmalife:bottle_label'),
    sell(2, ['supplementaries:blackboard', 'supplementaries:key'], 1),
    book(2, ['common', 'uncommon'], 1, 4000),

    buy(3, 'tfc:soot'),
    buy(3, 'minecraft:book', 4),
    sell(3, BOOKSHELVES, 1, { worth: 1500 }),
    sell(3, 'tfc:metal/lamp/copper', 1),
    sell(3, each('tfc:wood/lectern/', ['oak', 'birch', 'spruce']), 1),
    book(3, ['common', 'uncommon'], 2, 6000),

    buy(4, 'minecraft:glow_ink_sac'),
    buy(4, 'minecraft:leather'),
    sell(4, 'tfc:metal/lamp/bronze', 1),
    sell(4, each('tfc:wood/scribing_table/', ['oak', 'birch', 'spruce']), 1),
    sell(4, ['supplementaries:hourglass', 'supplementaries:antique_ink'], 1),
    book(4, ['rare'], 1, 8000),

    buy(5, 'tfc:candle'),
    sell(5, 'minecraft:name_tag', 1),
    sell(5, 'tfc:metal/lamp/wrought_iron', 1),
    sell(5, ['supplementaries:globe', 'beneath:lost_page'], 1, { uses: 2 }),
    book(5, ['rare', 'treasure'], 2, 14000),
  ],
};
