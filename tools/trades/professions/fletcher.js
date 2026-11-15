const { sell, buy, craft, each } = require('../lib');

const arch = (list) => each('tfc_arch:', list);
// fletching to order: the player brings 8 arrowheads, the fletcher adds shafts and feathers
const fletch = (level, metal) => craft(level, `tfc_arch:${metal}_arrow`, 8, [`tfc_arch:${metal}_arrowhead`, 8]);
// arrowheads to order from one ingot
const heads = (level, metal) => craft(level, `tfc_arch:${metal}_arrowhead`, 8, [`tfc:metal/ingot/${metal}`, 1]);

module.exports = {
  id: 'minecraft:fletcher',
  trades: [
    buy(1, 'minecraft:feather'),
    buy(1, 'minecraft:string'),
    buy(1, arch(['flint_arrowhead', 'stone_arrowhead', 'bone_arrowhead'])),
    sell(1, arch(['flint_arrow', 'stone_arrow', 'bone_arrow']), 12, { max: 16 }),
    sell(1, arch(['flint_arrowhead', 'stone_arrowhead', 'bone_arrowhead']), 8, { max: 12 }),
    sell(1, ['tfc_arch:paper_fletching', 'mowziesmobs:dart'], 4, { max: 8 }),

    buy(2, 'bsa:sinew'),
    buy(2, 'tfc_arch:copper_arrowhead'),
    sell(2, 'tfc_arch:shortbow', 1),
    sell(2, 'tfc_arch:copper_arrow', 6, { max: 10 }),
    sell(2, ['tfc_arch:shortbow_frame', 'tfc_arch:crossbow_frame'], 1),
    heads(2, 'copper'),
    fletch(2, 'copper'),

    buy(3, 'bsa:sinew_string'),
    buy(3, 'tfc_arch:bronze_arrowhead'),
    sell(3, 'tfc_arch:plains_bow', 1),
    sell(3, arch(['bronze_arrow', 'bismuth_bronze_arrow', 'black_bronze_arrow']), 4, { max: 8 }),
    sell(3, 'sns:quiver', 1),
    sell(3, 'supplementaries:rope_arrow', 2, { max: 4 }),
    sell(3, 'tfc_arch:plains_bow_frame', 1),
    heads(3, 'bronze'),
    fletch(3, 'bronze'),

    buy(4, 'tfc_arch:wrought_iron_arrowhead'),
    sell(4, 'tfc_arch:longbow', 1),
    sell(4, 'tfc_arch:copper_crossbow', 1),
    sell(4, 'tfc_arch:wrought_iron_arrow', 4, { max: 8 }),
    sell(4, ['mowziesmobs:blowgun', 'tfc_arch:longbow_frame'], 1),
    heads(4, 'wrought_iron'),
    fletch(4, 'wrought_iron'),

    sell(5, 'tfc_arch:bronze_crossbow', 1),
    sell(5, 'tfc_arch:wrought_iron_crossbow', 1),
    sell(5, 'tfc_arch:bronze_arrow', 16, { max: 24, key: 'bronze_arrow_bulk' }),
    sell(5, 'tfc_arch:steel_arrow', 4, { max: 6 }),
    heads(5, 'steel'),
    fletch(5, 'steel'),
  ],
};
