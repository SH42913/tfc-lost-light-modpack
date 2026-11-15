// Chapter "firmalife": Firmalife farming, cellars, ovens and greenhouses.
// Imported from TerraFirmaAdventure (Heracles, see `from`) by import_heracles.js, then reworked by hand.
// Text formatting: &6 - item/mechanic names, &d - Field Guide, &r - reset.
const { chapter, quest, item, anyOf, reward } = require('../lib');

const OVENS = ['', 'rustic_', 'stone_', 'tile_'];
// greenhouse block families, cheapest first (aged variants like weathered/rusted are left out: quests ask for fresh blocks)
const GREENHOUSE_TYPES = ['treated_wood', 'copper', 'iron', 'stainless_steel'];

module.exports = chapter('firmalife', {
  order: 1,
  group: 'economy',
  title: 'Firmalife',
  subtitle: { ru: 'Сады, пчёлы, сыр и теплицы', en: 'Orchards, bees, cheese and greenhouses' },
  icon: 'firmalife:food/pineapple',
  quests: [
    quest('fruit_trees', {
      from: 'firmalife/fruit_trees',
      title: { ru: 'Фруктовые деревья', en: 'Fruit Trees' },
      subtitle: { ru: 'Пора варить джем, дорогой', en: 'Time to make jam, dear' },
      desc: {
        ru: [
          'Firmalife добавляет в мир множество фруктовых деревьев. Из фруктов варят отличный джем, а из листьев плетут циновки для сушки.',
          '',
          'Для начала собери немного листьев.',
        ],
        en: [
          'Firmalife adds lots of fruit trees to the world. Fruit makes great jam, and leaves are woven into drying mats.',
          '',
          'For now, just gather some leaves.',
        ],
      },
      icon: 'firmalife:fruit_leaf',
      deps: ['tfc/sticks_and_stones'],
      tasks: [item('firmalife:fruit_leaf', 32)],
      rewards: [reward('tfc:food/cooked_beef', 3)],
      budget: 750,
    }),

    quest('drying', {
      from: 'firmalife/roasting',
      title: { ru: 'Сушка', en: 'Drying' },
      subtitle: { ru: 'Солнце сделает всё само', en: 'Let the sun do the work' },
      desc: {
        ru: [
          'На &6циновке для сушки&r из фруктовых листьев сушат фрукты, травы и табак. Поставь её на солнце и жди.',
        ],
        en: [
          'A &6drying mat&r woven from fruit leaves dries fruit, herbs and tobacco. Put it in the sun and wait.',
        ],
      },
      icon: 'firmalife:drying_mat',
      deps: ['fruit_trees'],
      tasks: [item('firmalife:drying_mat', 2)],
      rewards: [reward('tfc:food/cooked_beef', 2)],
      budget: 500,
    }),

    quest('pineapple', {
      from: 'dlctropics/pineapple',
      title: { ru: 'Ананасовая голова', en: 'Pineapple Head' },
      subtitle: { ru: 'Вкуснотища… и что дальше?', en: 'Delicious… what\'s next?' },
      desc: {
        ru: [
          '&6Ананасы&r растут на кустах в тёплом климате. Кроме сочных плодов, из их листьев получают волокно, а из него — пряжу и даже ананасовую кожу.',
        ],
        en: [
          '&6Pineapples&r grow on bushes in warm climates. Besides juicy fruit, their leaves give fiber, which becomes yarn and even pineapple leather.',
        ],
      },
      icon: 'firmalife:food/pineapple',
      deps: ['fruit_trees'],
      optional: true,
      tasks: [item('firmalife:food/pineapple', 4)],
      rewards: [reward('firmalife:pineapple_yarn', 8)],
      budget: 500,
    }),

    quest('beekeeping', {
      from: 'firmalife/bees',
      title: { ru: 'Пчеловодство', en: 'Beekeeping' },
      subtitle: { ru: 'Пчёлы размером с Беорна', en: 'Bees as big as Beorn\'s' },
      desc: {
        ru: [
          'Поставь &6улей&r с рамками рядом с цветами, и пчёлы заселятся в него сами. Из сот получают мёд и &6пчелиный воск&r, без которого не построить подвал.',
          '',
          'Подробнее о пчеловодстве — в &dруководстве&r.',
        ],
        en: [
          'Place a &6beehive&r with frames near flowers, and bees will move in on their own. Combs give honey and &6beeswax&r, which you need to build a cellar.',
          '',
          'More about beekeeping in the &dfield guide&r.',
        ],
      },
      icon: 'firmalife:beehive',
      deps: ['fruit_trees', 'tfc/saw'],
      tasks: [
        item('firmalife:raw_honey', 4),
        item('firmalife:beeswax', 8),
      ],
      rewards: [reward('firmalife:beeswax', 4)],
      budget: 1200,
    }),

    quest('planters', {
      from: 'firmalife/kashpo',
      title: { ru: 'Кашпо', en: 'Planters' },
      subtitle: { ru: 'Сад у тебя дома', en: 'A garden in your home' },
      desc: {
        ru: [
          'В &6кашпо&r выращивают овощи, ягоды и даже маленькие деревья, но работают они только внутри &6теплицы&r с климатической станцией. Их делают из кирпичей и компоста. Подробнее — в &dруководстве&r.',
        ],
        en: [
          '&6Planters&r grow vegetables, berries and even small trees, but they only work inside a &6greenhouse&r with a climate station. They\'re made of bricks and compost. See the &dfield guide&r.',
        ],
      },
      icon: 'firmalife:large_planter',
      deps: ['fruit_trees', 'tfc/vessel'],
      tasks: [
        item('firmalife:large_planter'),
        item('firmalife:bonsai_planter'),
        item('firmalife:hanging_planter', 3),
      ],
      rewards: [reward('minecraft:clay_ball', 16)],
      budget: 800,
    }),

    quest('oven', {
      from: 'firmalife/duhovka',
      title: { ru: 'Печь', en: 'Oven' },
      subtitle: { ru: 'Хлеб всему голова', en: 'Bread is the staff of life' },
      desc: {
        ru: [
          'В печах Firmalife пекут хлеб, пироги и другую выпечку. Сложи печь из основания, загрузочной воронки и трубы, затем растопи её, чтобы глина обожглась. Подробнее — в разделе Firmalife &dруководства&r.',
        ],
        en: [
          'Firmalife ovens bake bread, pies and other pastries. Build one from a bottom, a hopper and a chimney, then fire it up so the clay cures. See the Firmalife section of the &dfield guide&r.',
        ],
      },
      icon: 'firmalife:cured_oven_hopper',
      deps: ['tfc/charcoal_pit', 'tfc/clay'],
      tasks: [
        item(anyOf(OVENS.map((o) => `firmalife:cured_${o}oven_bottom`)), 1, { icon: 'firmalife:cured_oven_bottom', title: { ru: 'Обожжённое основание печи', en: 'Cured oven bottom' } }),
        item(anyOf(OVENS.map((o) => `firmalife:cured_${o}oven_hopper`)), 1, { icon: 'firmalife:cured_oven_hopper', title: { ru: 'Обожжённая воронка печи', en: 'Cured oven hopper' } }),
        item(anyOf(OVENS.map((o) => `firmalife:cured_${o}oven_chimney`)), 3, { icon: 'firmalife:cured_oven_chimney', title: { ru: 'Обожжённые трубы печи', en: 'Cured oven chimneys' } }),
      ],
      rewards: [reward('minecraft:charcoal', 16)],
      budget: 1300,
    }),

    quest('cellar', {
      from: 'firmalife/podval',
      title: { ru: 'Подвал', en: 'Cellar' },
      subtitle: { ru: 'Прохладно и надолго', en: 'Cool and built to last' },
      desc: {
        ru: [
          'Как сосуды и бочки, &6подвал&r продлевает и без того немалый срок хранения еды. Но подвал — мультиблочная постройка, и строить её нужно строго по инструкции из &dруководства&r.',
          '',
          'Стены кладут из &6запечатанного кирпича&r: каменный кирпич, промазанный пчелиным воском.',
        ],
        en: [
          'Like vessels and barrels, a &6cellar&r makes food last even longer. But a cellar is a multiblock structure and has to be built exactly as the &dfield guide&r describes.',
          '',
          'The walls are made of &6sealed bricks&r: stone bricks coated with beeswax.',
        ],
      },
      icon: 'firmalife:sealed_bricks',
      deps: ['beekeeping', 'tfc/chiseling', 'tfc/brass'],
      tasks: [
        item('firmalife:sealed_bricks', 16),
        item('firmalife:sealed_door'),
        item('firmalife:sealed_trapdoor', 4),
      ],
      rewards: [reward('firmalife:beeswax', 6), reward('tfc:metal/ingot/brass')],
      budget: 6000,
    }),

    quest('cheese', {
      from: 'terrafirmacraft/cheese',
      title: { ru: 'Сыр', en: 'Cheese' },
      subtitle: { ru: 'Мощный бонус к здоровью', en: 'A big health boost' },
      desc: {
        ru: [
          'Молочные продукты дают бонус к &6здоровью&r в рационе. Свернувшееся молоко отжимают через &6марлю&r, а головки сыра дозревают в подвале.',
          '',
          'Попробуй сделать три разных сыра.',
        ],
        en: [
          'Dairy gives a bonus to &6health&r in your nutrition. Curdled milk is strained through &6cheesecloth&r, and cheese wheels age in a cellar.',
          '',
          'Try making three different cheeses.',
        ],
      },
      icon: 'firmalife:cheddar_wheel',
      deps: ['tfc/dairy', 'cellar'],
      tasks: [
        item('firmalife:food/gouda'),
        item('firmalife:food/cheddar'),
        item('firmalife:food/feta'),
      ],
      rewards: [reward('firmalife:cheesecloth', 8)],
      budget: 4000,
    }),

    quest('chocolate', {
      from: 'firmalife/chocolate',
      title: { ru: 'Шоколад', en: 'Chocolate' },
      subtitle: { ru: 'Сладкая жизнь', en: 'The sweet life' },
      desc: {
        ru: [
          'Шоколад — любимое лакомство сладкоежек и непростой в получении продукт: какао-бобы нужно обжарить, перемолоть и смешать. А ещё шоколад можно отливать в формы, как металл!',
        ],
        en: [
          'Chocolate is every sweet tooth\'s favourite and not easy to make: cocoa beans have to be roasted, ground and mixed. And chocolate can be cast in molds, just like metal!',
        ],
      },
      icon: 'firmalife:food/milk_chocolate',
      deps: ['oven', 'tfc/quern'],
      optional: true,
      tasks: [
        item('firmalife:food/dark_chocolate'),
        item('firmalife:food/white_chocolate'),
        item('firmalife:food/milk_chocolate'),
      ],
      rewards: [reward('tfc:powder/salt', 8), reward('firmalife:beeswax', 2)],
      budget: 1800,
    }),

    quest('greenhouse', {
      from: 'firmalife/teplica',
      title: { ru: 'Теплица', en: 'Greenhouse' },
      subtitle: { ru: 'Будь фермером круглый год', en: 'Farm all year round' },
      desc: {
        ru: [
          'В &6теплице&r урожай растёт в любой сезон и в любом климате. Строй её из того, что есть: стены и крышу собирают из стекла и &6обработанных пиломатериалов&r (пиломатериалы с пчелиным воском), медных или железных прутьев. Смешивать виды нельзя — вся теплица должна быть одного типа.',
          '',
          'Управляет теплицей &6климатическая станция&r: доски, латунные механизмы, красная пыль и синее стекло. Кашпо внутри поливают лейкой. Как всё устроить, читай в &dруководстве&r.',
        ],
        en: [
          'In a &6greenhouse&r crops grow in any season and any climate. Build it from whatever you have: walls and roofs are made of glass and &6treated lumber&r (lumber with beeswax), copper rods or wrought iron rods. Types can\'t be mixed: the whole greenhouse must be of one type.',
          '',
          'A greenhouse is run by a &6climate station&r: planks, brass mechanisms, redstone dust and blue glass. Planters inside are watered with a watering can. See the &dfield guide&r for how to set it all up.',
        ],
      },
      icon: 'firmalife:treated_wood_greenhouse_wall',
      // glass is the real gate: walls need glass blocks, the climate station needs brass mechanisms (tfc/glass covers both)
      deps: ['planters', 'tfc/glass'],
      tasks: [
        item(anyOf(GREENHOUSE_TYPES.map((t) => `firmalife:${t}_greenhouse_wall`)), 8,
          { title: { ru: '8 стен теплицы любого типа', en: '8 greenhouse walls of any type' } }),
        item(anyOf(GREENHOUSE_TYPES.map((t) => `firmalife:${t}_greenhouse_roof`)), 8,
          { title: { ru: '8 блоков крыши теплицы любого типа', en: '8 greenhouse roofs of any type' } }),
        item(anyOf(GREENHOUSE_TYPES.map((t) => `firmalife:${t}_greenhouse_door`)), 1,
          { title: { ru: 'Дверь теплицы любого типа', en: 'A greenhouse door of any type' } }),
        item('firmalife:climate_station'),
      ],
      rewards: [reward('firmalife:watering_can'), reward('firmalife:beeswax', 8)],
      budget: 3900,
    }),

    quest('stainless_greenhouse', {
      title: { ru: 'Теплица на века', en: 'Built to Last' },
      subtitle: { ru: 'Не стареет и не ржавеет', en: 'Never ages, never rusts' },
      desc: {
        ru: [
          'Дерево темнеет, медь зеленеет, железо ржавеет. Теплица продолжает работать, но выглядит всё хуже. Не стареет только &6нержавеющая сталь&r: сплав стали, хрома и никеля, пропорции есть в &dруководстве&r.',
          '',
          '&6Компостер-барабан&r из листов кованого железа ускорит производство удобрений.',
        ],
        en: [
          'Wood darkens, copper turns green, iron rusts. The greenhouse keeps working but looks worse and worse. Only &6stainless steel&r never ages: an alloy of steel, chromium and nickel, the ratios are in the &dfield guide&r.',
          '',
          'A &6compost tumbler&r made of wrought iron sheets speeds up fertilizer production.',
        ],
      },
      icon: 'firmalife:stainless_steel_greenhouse_wall',
      deps: ['greenhouse', 'tfc/steel'],
      optional: true,
      tasks: [
        item('firmalife:stainless_steel_greenhouse_wall', 8),
        item('firmalife:stainless_steel_greenhouse_roof', 8),
        item('firmalife:stainless_steel_greenhouse_door', 2),
        item('firmalife:compost_tumbler'),
      ],
      rewards: [reward('tfc:metal/ingot/steel', 2)],
      budget: 26000,
    }),
  ],
});
