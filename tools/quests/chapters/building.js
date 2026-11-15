// Chapter "building": roads and roofs (Roads & Roofs field guide entries: mattock, base course, hoggin, stone and
// concrete roads with speed bonuses, roof frames), Macaw's furniture/roofs/bridges (mcw_tfc_aio), Supplementaries
// decor, chalk (pack barrel recipe: chalk brick + dye), labels, Storage Drawers for TFC woods.
// Alabaster and concrete live in the TFC chapter and are linked.
// Text formatting: &6 - names, &e - where to look, &d - field guide, &r - reset.
const { chapter, quest, item, observe, anyOf, link, lootCrate } = require('../lib');

const COMMON = { rewards: [lootCrate('explore_common')], budget: 1500 };
const RARE = { rewards: [lootCrate('explore_rare')], budget: 4500 };

const METALS = ['copper', 'bronze', 'bismuth_bronze', 'black_bronze', 'wrought_iron', 'steel', 'black_steel', 'blue_steel', 'red_steel'];
const WOODS = ['acacia', 'ash', 'aspen', 'birch', 'blackwood', 'chestnut', 'douglas_fir', 'hickory', 'kapok', 'mangrove', 'maple', 'oak',
  'palm', 'pine', 'rosewood', 'sequoia', 'spruce', 'sycamore', 'white_cedar', 'willow'];
const ROOFS = ['rnr:thatch_roof', 'rnr:ceramic_roof', 'rnr:terracotta_roof', ...WOODS.map((w) => `rnr:wood/shingles/${w}`)];
const CHAIRS = WOODS.map((w) => `mcw_tfc_aio:furniture/${w}_furniture/${w}_chair`);
const TABLES = WOODS.map((w) => `mcw_tfc_aio:furniture/${w}_furniture/${w}_desk`);
const DRAWERS = WOODS.flatMap((w) => [1, 2, 4].flatMap((n) => [`tfcstoragedrawers:tfc_${w}_full_drawers_${n}`, `tfcstoragedrawers:tfc_${w}_half_drawers_${n}`]));
const CHALKS = ['white', 'black', 'blue', 'brown', 'cyan', 'gray', 'green', 'light_blue', 'light_gray', 'lime', 'magenta', 'orange', 'pink',
  'purple', 'red', 'yellow'].map((c) => `chalk:${c}_chalk`);

module.exports = chapter('building', {
  order: 31,
  group: 'settlements',
  title: { ru: 'Строитель', en: 'Builder' },
  subtitle: { ru: 'Дороги, крыши и уют', en: 'Roads, roofs and comfort' },
  icon: 'rnr:wood/shingles/oak',
  links: [link('tfc/alabaster'), link('tfc/concrete'), link('tfc/chiseling')],
  quests: [
    // ---------------- roads ----------------
    quest('mattock', {
      title: { ru: 'Кирка-мотыга', en: 'The Mattock' },
      subtitle: { ru: 'Все дороги ведут в Рим', en: 'All roads lead to Rome' },
      desc: {
        ru: [
          'Дорогу строят в три шага: утрамбовать землю &6киркой-мотыгой&r, засыпать &6щебёночное основание&r и уложить покрытие. Основание делают из гравия, камней и молота.',
          '',
          'Утрамбованную грязь сначала засыпают щебнем. Подробности — в &dруководстве&r.',
        ],
        en: [
          'A road is built in three steps: tamp the soil with a &6mattock&r, lay a &6crushed base course&r, then lay the surface. The base course is made from gravel, loose rocks and a hammer.',
          '',
          'Tamped mud has to be covered with crushed base course first. Details are in the &dfield guide&r.',
        ],
      },
      icon: 'rnr:metal/mattock/bronze',
      deps: ['tfc/metal_anvil'],
      tasks: [
        item(anyOf(METALS.map((m) => `rnr:metal/mattock/${m}`)), 1, { title: { ru: 'Любая кирка-мотыга', en: 'Any mattock' }, icon: 'rnr:metal/mattock/bronze' }),
        item('rnr:crushed_base_course', 16),
      ],
      ...COMMON,
    }),

    quest('road', {
      title: { ru: 'Дорога', en: 'The Road' },
      subtitle: { ru: 'Дорога вдаль и вдаль спешит', en: 'The road goes ever on and on' },
      desc: {
        ru: [
          'Покрытие кладут поверх основания, и чем оно лучше, тем быстрее по нему ходить:',
          '- &6хоггин&r (глина, гравий и песок) или немного гравия: +10%;',
          '- гравий, утрамбованный мотыгой (макадам), булыжник, брусчатка из камня или кирпича, плиты: +20%;',
          '- &6бетон&r: +30%.',
        ],
        en: [
          'The surface goes on top of the base course, and the better it is, the faster you walk:',
          '- &6hoggin&r (clay, gravel and sand) or a little gravel: +10%;',
          '- gravel tamped with a mattock (macadam), cobbles, stone or brick setts, flagstones: +20%;',
          '- &6concrete&r: +30%.',
        ],
      },
      icon: 'rnr:hoggin_mix',
      deps: ['mattock'],
      tasks: [item('rnr:hoggin_mix', 8)],
      ...COMMON,
    }),

    quest('concrete_road', {
      title: { ru: 'Бетонная дорога', en: 'Concrete Road' },
      subtitle: { ru: 'Не наступать!', en: 'Keep off!' },
      desc: {
        ru: [
          '&6Сухую бетонную смесь&r делают из основания и извести, затем мешают с пресной водой в бочке. Залей бетон из ведра на основание — он растечётся сам и застынет за день.',
          '',
          'Пока бетон сырой, по нему никто не должен ходить: следы убирают мотыгой. Широкие заливки больше 4 блоков трескаются — делай швы мотыгой каждые 5 блоков или вдави в бетон кирпич, плиту или гладкий камень.',
        ],
        en: [
          '&6Dry concrete mix&r is made from base course and lime, then mixed with fresh water in a barrel. Pour the concrete from a bucket onto the base course: it spreads by itself and sets within a day.',
          '',
          'While it\'s wet, nobody may walk on it: footprints are smoothed with a mattock. Pours wider than 4 blocks crack: cut control joints every 5 blocks with a mattock, or press bricks, flagstones or smooth stone into it.',
        ],
      },
      icon: 'rnr:concrete_road',
      deps: ['road', 'tfc/barrels'],
      tasks: [
        item('rnr:concrete_powder', 4),
        observe.block(['rnr:concrete_road', 'rnr:concrete_road_control_joint', 'rnr:concrete_road_flagstones', 'rnr:concrete_road_panel', 'rnr:concrete_road_sett'],
          { title: { ru: 'Застывшая бетонная дорога', en: 'A set concrete road' }, icon: 'rnr:concrete_road' }),
      ],
      ...RARE,
    }),

    // ---------------- roofs ----------------
    quest('roof', {
      title: { ru: 'Крыша над головой', en: 'A Roof Over Your Head' },
      subtitle: { ru: 'Чтобы не капало', en: 'Keep the rain out' },
      desc: {
        ru: [
          'Крышу начинают с &6каркаса&r из пиломатериалов и палок; есть каркасы-ступени и полублоки. Щёлкни по каркасу кровельным материалом:',
          '- солома — соломенная крыша;',
          '- деревянная дранка — тесовая;',
          '- обожжённая керамическая или терракотовая черепица — черепичная.',
        ],
        en: [
          'A roof starts with a &6frame&r of lumber and sticks; there are stair and slab frames too. Click the frame with a roofing material:',
          '- straw for thatch;',
          '- wooden shingles for a shingle roof;',
          '- fired ceramic or terracotta tiles for a tiled roof.',
        ],
      },
      icon: 'rnr:wood/shingles/oak',
      deps: ['tfc/saw'],
      tasks: [
        item('rnr:roof_frame', 8),
        observe.block(ROOFS, { title: { ru: 'Покрой каркас кровлей', en: 'Cover a frame with roofing' }, icon: 'rnr:wood/shingles/oak' }),
      ],
      ...COMMON,
    }),

    // ---------------- interior ----------------
    quest('furniture', {
      title: { ru: 'Мебель', en: 'Furniture' },
      subtitle: { ru: 'Дом, милый дом', en: 'Home, sweet home' },
      desc: {
        ru: [
          'Мебель Macaw\'s делают из дерева TFC: стулья, столы, шкафы, кухонные тумбы. Там же — кровли, заборы и мосты.',
          '',
          'Двойные двери открываются разом, если открыть одну створку.',
        ],
        en: [
          'Macaw\'s furniture is made from TFC wood: chairs, tables, wardrobes, kitchen counters. Roofs, fences and bridges too.',
          '',
          'Double doors open together when you open one side.',
        ],
      },
      icon: 'mcw_tfc_aio:furniture/oak_furniture/oak_chair',
      deps: ['tfc/saw'],
      tasks: [
        item(anyOf(CHAIRS), 1, { title: { ru: 'Любой стул', en: 'Any chair' }, icon: 'mcw_tfc_aio:furniture/oak_furniture/oak_chair' }),
        item(anyOf(TABLES), 1, { title: { ru: 'Любой письменный стол', en: 'Any desk' }, icon: 'mcw_tfc_aio:furniture/oak_furniture/oak_desk' }),
      ],
      ...COMMON,
    }),

    quest('decor', {
      title: { ru: 'Уют', en: 'Cozy' },
      subtitle: { ru: 'Мелочи важны', en: 'Little things matter' },
      desc: {
        ru: [
          'Supplementaries добавляет полезных мелочей:',
          '- &6банка&r из стекла и полублоков хранит жидкости, еду и даже светлячков;',
          '- &6доска объявлений&r показывает книгу или записку;',
          '- &6полка&r выставляет один предмет на стене.',
        ],
        en: [
          'Supplementaries adds useful little things:',
          '- a &6Jar&r of glass and slabs holds liquids, food and even fireflies;',
          '- a &6Notice Board&r displays a book or a note;',
          '- an &6Item Shelf&r shows off a single item on the wall.',
        ],
      },
      icon: 'supplementaries:jar',
      deps: ['furniture', 'tfc/glass'],
      tasks: [item(anyOf(['supplementaries:jar', 'supplementaries:notice_board', 'supplementaries:item_shelf']), 2,
        { title: { ru: '2 любых предмета декора', en: '2 decor items' }, icon: 'supplementaries:jar' })],
      ...COMMON,
    }),

    quest('chalk', {
      title: { ru: 'Мел', en: 'Chalk' },
      subtitle: { ru: 'Здесь был я', en: 'I was here' },
      desc: {
        ru: [
          'Мелом рисуют стрелки и значки на любой поверхности — удобно, чтобы не заблудиться в шахте. Мелок получают, если выдержать &6меловой кирпич&r в запечатанной бочке с краской.',
        ],
        en: [
          'Chalk draws arrows and marks on any surface: handy so you don\'t get lost in a mine. A stick of chalk is made by soaking a &6chalk brick&r in a sealed barrel of dye.',
        ],
      },
      icon: 'chalk:white_chalk',
      deps: ['tfc/barrels'],
      optional: true,
      tasks: [item(anyOf(CHALKS), 1, { title: { ru: 'Любой мелок', en: 'Any chalk' }, icon: 'chalk:white_chalk' })],
      ...COMMON,
    }),

    quest('drawers', {
      title: { ru: 'Ящики', en: 'Drawers' },
      subtitle: { ru: 'Всему своё место', en: 'A place for everything' },
      desc: {
        ru: [
          '&6Ящики&r Storage Drawers хранят много одинаковых предметов и показывают, что внутри. Их делают из дерева TFC. Улучшения увеличивают ёмкость, а контроллер связывает ящики в одно хранилище.',
          '',
          'На сундук или бочку можно повесить &6ярлык&r с предметом, чтобы не искать.',
        ],
        en: [
          'Storage Drawers hold lots of a single item and show what\'s inside. They\'re made from TFC wood. Upgrades raise capacity, and a controller links drawers into one storage.',
          '',
          'A &6Label&r with an item can be hung on a chest or a barrel, so you don\'t have to search.',
        ],
      },
      icon: 'tfcstoragedrawers:tfc_oak_full_drawers_1',
      deps: ['furniture'],
      tasks: [item(anyOf(DRAWERS), 4, { title: { ru: '4 ящика', en: '4 drawers' }, icon: 'tfcstoragedrawers:tfc_oak_full_drawers_1' })],
      ...RARE,
    }),
  ],
});
