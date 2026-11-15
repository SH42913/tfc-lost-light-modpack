// Chapter "fishing": TFC fishing (field guide mechanics/fishing, bait tags: small = seeds/shellfish/worms, large =
// cod/salmon/tropical fish/bluegill/minnow, only wrought iron and better rods hold large bait), Aquaculture fish under
// TFC climate rules (Survivors Aquaculture guide: cold sea, salt water, fresh water, arid, jungle), fillets and bones,
// worms from crops, fish mounts (TFC fish hook + lumber), corals (corals-tfc: coral powder -> mortar / fertilizer),
// Neptunian pearls from big fish -> neptunium (heating) -> Neptunian steel (welding with black steel) -> Neptunium armor.
// Text formatting: &6 - names, &e - where to look, &d - field guide, &r - reset.
const { chapter, quest, item, anyOf, link, lootCrate } = require('../lib');

const COMMON = { rewards: [lootCrate('explore_common')], budget: 1500 };
const RARE = { rewards: [lootCrate('explore_rare')], budget: 4500 };
const EPIC = { rewards: [lootCrate('explore_epic')], budget: 15000 };

const ns = (namespace, ids) => ids.map((id) => `${namespace}:${id}`);
const COLD_SEA = ns('aquaculture', ['atlantic_cod', 'blackfish', 'atlantic_halibut', 'pacific_halibut', 'atlantic_herring', 'pink_salmon', 'pollock', 'rainbow_trout']);
const SALT = ns('aquaculture', ['jellyfish', 'red_grouper', 'tuna']);
const FRESH = ns('aquaculture', ['smallmouth_bass', 'bluegill', 'brown_trout', 'carp', 'catfish', 'gar', 'minnow', 'muskellunge', 'perch']);
const ARID = ns('aquaculture', ['bayad', 'boulti', 'capitaine', 'synodontis']);
const JUNGLE = ns('aquaculture', ['arapaima', 'piranha', 'tambaqui']);
const TFC_FISH = ns('tfc', ['food/cod', 'food/salmon', 'food/tropical_fish', 'food/bluegill']);
const ROD_METALS = ['copper', 'bronze', 'bismuth_bronze', 'black_bronze', 'wrought_iron', 'steel', 'black_steel', 'blue_steel', 'red_steel'];
const LARGE_RODS = ['wrought_iron', 'steel', 'black_steel', 'blue_steel', 'red_steel'].map((m) => `tfc:metal/fishing_rod/${m}`);
const WOODS = ['acacia', 'ash', 'aspen', 'birch', 'blackwood', 'chestnut', 'douglas_fir', 'hickory', 'kapok', 'mangrove', 'maple', 'oak',
  'palm', 'pine', 'rosewood', 'sequoia', 'spruce', 'sycamore', 'white_cedar', 'willow'];
const NEPTUNIUM_ARMOR = ['helmet', 'chestplate', 'leggings', 'boots'].map((p) => `aquaculture:neptunium_${p}`);

const fish = (list, ru, en, icon) => item(anyOf(list), 1, { title: { ru, en }, icon });

module.exports = chapter('fishing', {
  order: 6,
  group: 'economy',
  title: { ru: 'Рыбалка', en: 'Fishing' },
  subtitle: { ru: 'Удочка, улов и дары моря', en: 'Rods, catches and gifts of the sea' },
  icon: 'aquaculture:atlantic_cod',
  links: [link('tfc/metal_anvil'), link('kitchen/cutting_board'), link('seafaring/rowboat')],
  quests: [
    quest('fishing_rod', {
      title: { ru: 'Удочка', en: 'Fishing Rod' },
      subtitle: { ru: 'Терпение — лучшая наживка', en: 'Patience is the best bait' },
      desc: {
        ru: [
          'Сначала на наковальне куют &6рыболовный крючок&r, а из него собирают удочку. Без наживки она бесполезна: насади на крючок в сетке крафта семена, моллюска или &6червя&r. Черви иногда находятся, когда собираешь урожай.',
          '',
          'Закинь удочку и жди поклёвки. Тяни плавно: если дёргать слишком быстро, рыба сорвётся вместе с наживкой. Вытащи рыбу на берег и добей.',
        ],
        en: [
          'First a &6fish hook&r is forged on the anvil, and a rod is made from it. Without bait it\'s useless: put seeds, shellfish or a &6worm&r on the hook in the crafting grid. Worms sometimes turn up when you harvest crops.',
          '',
          'Cast and wait for a bite. Reel in smoothly: pull too fast and the fish gets away with the bait. Drag the fish ashore and finish it.',
        ],
      },
      icon: 'tfc:metal/fishing_rod/bronze',
      deps: ['tfc/metal_anvil'],
      tasks: [item(anyOf(ROD_METALS.map((m) => `tfc:metal/fishing_rod/${m}`)), 1, { title: { ru: 'Любая удочка', en: 'Any fishing rod' }, icon: 'tfc:metal/fishing_rod/bronze' })],
      ...COMMON,
    }),

    quest('first_catch', {
      title: { ru: 'Первый улов', en: 'First Catch' },
      subtitle: { ru: 'Вот такая рыбина!', en: 'It was THIS big!' },
      desc: {
        ru: [
          'Рыба живёт по климату, как и всё в этом мире: в холодном море, в тёплом, в реках и озёрах, в сухих краях и в джунглях. Разные места — разный улов.',
          '',
          'Сырую рыбу почти всегда нужно сначала разделать.',
        ],
        en: [
          'Fish follow the climate like everything else in this world: cold seas, warm seas, rivers and lakes, dry lands and jungles. Different places, different catch.',
          '',
          'Raw fish almost always has to be cleaned first.',
        ],
      },
      icon: 'aquaculture:smallmouth_bass',
      deps: ['fishing_rod'],
      tasks: [fish([...TFC_FISH, ...COLD_SEA, ...SALT, ...FRESH, ...ARID, ...JUNGLE], 'Поймай любую рыбу', 'Catch any fish', 'aquaculture:smallmouth_bass')],
      ...COMMON,
    }),

    quest('fillet', {
      title: { ru: 'Филе', en: 'Fillet' },
      subtitle: { ru: 'Без косточек', en: 'Boneless' },
      desc: {
        ru: [
          'Рыбу Aquaculture не едят целиком. Положи рыбу и любой нож в сетку крафта — получишь &6рыбное филе&r. Чем больше рыба, тем больше филе и &6рыбьих костей&r. Кости перемалывают в костную муку, а из крупной рыбы может выпасть жир.',
          '',
          'Иногда в брюхе большой рыбы находят странные вещи.',
        ],
        en: [
          'Aquaculture fish aren\'t eaten whole. Put a fish and any knife in the crafting grid to get &6fish fillet&r. The bigger the fish, the more fillets and &6fish bones&r. Bones are ground into bone meal, and large fish may yield blubber.',
          '',
          'Sometimes odd things are found in a big fish\'s belly.',
        ],
      },
      icon: 'aquaculture:fish_fillet_raw',
      deps: ['first_catch'],
      tasks: [item('aquaculture:fish_fillet_raw', 4), item('aquaculture:fish_bones')],
      ...COMMON,
    }),

    quest('fish_of_the_world', {
      title: { ru: 'Рыбы всех вод', en: 'Fish of All Waters' },
      subtitle: { ru: 'Рыбак рыбака видит издалека', en: 'Birds of a feather' },
      desc: {
        ru: [
          '- &6холодное море&r (до 0 °C): треска, палтус, сельдь, горбуша, минтай, радужная форель;',
          '- &6солёная вода&r (от 0 °C): медузы, красный групер, тунец;',
          '- &6пресная вода&r (0–20 °C): окунь, карп, сом, щука-маскинонг, гольян, бурая форель;',
          '- &6сухие тёплые края&r (от 13 °C, до 300 мм осадков): баяд, боулти, нильский окунь, синодонтис;',
          '- &6джунгли&r (15–30 °C, от 300 мм): арапайма, пиранья, тамбаки.',
        ],
        en: [
          '- &6cold sea&r (up to 0 °C): cod, halibut, herring, pink salmon, pollock, rainbow trout;',
          '- &6salt water&r (from 0 °C): jellyfish, red grouper, tuna;',
          '- &6fresh water&r (0-20 °C): perch, carp, catfish, muskellunge, minnow, brown trout;',
          '- &6warm dry lands&r (from 13 °C, up to 300 mm of rain): bayad, boulti, capitaine, synodontis;',
          '- &6jungles&r (15-30 °C, from 300 mm): arapaima, piranha, tambaqui.',
        ],
      },
      icon: 'aquaculture:piranha',
      deps: ['first_catch', 'travel/shore'],
      tasks: [
        fish(COLD_SEA, 'Рыба холодного моря', 'A cold-sea fish', 'aquaculture:atlantic_cod'),
        fish(SALT, 'Рыба солёной воды', 'A salt-water fish', 'aquaculture:red_grouper'),
        fish(FRESH, 'Пресноводная рыба', 'A freshwater fish', 'aquaculture:carp'),
        fish(ARID, 'Рыба сухих краёв', 'A dry-land fish', 'aquaculture:boulti'),
        fish(JUNGLE, 'Рыба джунглей', 'A jungle fish', 'aquaculture:piranha'),
      ],
      ...EPIC,
    }),

    quest('big_fish', {
      title: { ru: 'Большая рыба', en: 'The Big One' },
      subtitle: { ru: 'Старик и море', en: 'The old man and the sea' },
      desc: {
        ru: [
          'Тунец и арапайма слишком велики для семечка на крючке. Нужна &6крупная наживка&r — треска, лосось, тропическая рыба, синежаберник или гольян, — а держит её только удочка из &6кованого железа&r или лучше.',
          '',
          'Крупная рыба тянет сильнее: держи удочку во второй руке, чтобы было проще.',
        ],
        en: [
          'Tuna and arapaima are too big for a seed on a hook. You need &6large bait&r (cod, salmon, tropical fish, bluegill or minnow), and only a &6wrought iron&r or better rod can hold it.',
          '',
          'Big fish pull harder: hold the rod in your offhand to make it easier.',
        ],
      },
      icon: 'aquaculture:tuna',
      deps: ['first_catch', 'tfc/wrought_iron'],
      tasks: [
        item(anyOf(LARGE_RODS), 1, { title: { ru: 'Удочка для крупной наживки', en: 'A rod for large bait' }, icon: 'tfc:metal/fishing_rod/wrought_iron' }),
        fish(['aquaculture:tuna', 'aquaculture:arapaima'], 'Тунец или арапайма', 'A tuna or an arapaima', 'aquaculture:tuna'),
      ],
      ...EPIC,
    }),

    quest('turtles', {
      title: { ru: 'Черепахи', en: 'Turtles' },
      subtitle: { ru: 'Медленно, но верно', en: 'Slow and steady' },
      desc: {
        ru: [
          'Вместе с рыбой на крючок попадаются &6черепахи&r: коробчатая, звёздчатая и, в джунглях, аррау. Из них варят черепаший суп.',
        ],
        en: [
          'Along with fish, &6turtles&r get on the hook: box turtles, starshell turtles and, in jungles, arrau turtles. They make turtle soup.',
        ],
      },
      icon: 'aquaculture:box_turtle',
      deps: ['first_catch'],
      optional: true,
      tasks: [fish(ns('aquaculture', ['box_turtle', 'starshell_turtle', 'arrau_turtle']), 'Любая черепаха', 'Any turtle', 'aquaculture:box_turtle')],
      ...COMMON,
    }),

    quest('fish_mount', {
      title: { ru: 'Чучело рыбы', en: 'Fish Mount' },
      subtitle: { ru: 'На память', en: 'A keepsake' },
      desc: {
        ru: [
          'Лучший улов достоин стены. &6Подставку для чучела&r делают из пиломатериалов и рыболовного крючка. Поставь на неё рыбу — пусть гости завидуют.',
        ],
        en: [
          'The best catch deserves a wall. A &6Fish Mount&r is made from lumber and a fish hook. Put a fish on it and let your guests envy.',
        ],
      },
      icon: 'survivorsaquaculture:fish_mount/oak',
      deps: ['first_catch'],
      optional: true,
      tasks: [item(anyOf(WOODS.map((w) => `survivorsaquaculture:fish_mount/${w}`)), 1, { title: { ru: 'Любая подставка для чучела', en: 'Any fish mount' }, icon: 'survivorsaquaculture:fish_mount/oak' })],
      ...COMMON,
    }),

    quest('tackle_box', {
      title: { ru: 'Коробка для снастей', en: 'Tackle Box' },
      subtitle: { ru: 'Всё своё ношу с собой', en: 'Everything in its place' },
      desc: {
        ru: [
          '&6Коробку для снастей&r собирают из сундука, слитков и блока железа, водорослей или зелёного красителя. В ней удобно держать наживку, крючки и лески.',
        ],
        en: [
          'A &6Tackle Box&r is made from a chest, iron ingots and an iron block, plus kelp, algae or green dye. It\'s a handy place for bait, hooks and lines.',
        ],
      },
      icon: 'aquaculture:tackle_box',
      deps: ['first_catch', 'tfc/wrought_iron'],
      optional: true,
      tasks: [item('aquaculture:tackle_box')],
      ...COMMON,
    }),

    quest('corals', {
      title: { ru: 'Кораллы', en: 'Corals' },
      subtitle: { ru: 'Сады под водой', en: 'Gardens under the sea' },
      desc: {
        ru: [
          'В тёплых морях растут &6кораллы&r. Живой коралл, разрезанный ножом, даёт краситель своего цвета. Мёртвый коралл перемалывают на жернове или режут ножом в &6коралловый порошок&r.',
          '',
          'Порошок с известковой водой в бочке становится строительным раствором, а в бочке с пресной водой — жидким удобрением.',
        ],
        en: [
          '&6Corals&r grow in warm seas. A living coral cut with a knife gives dye of its color. Dead coral is ground in a quern or cut with a knife into &6coral powder&r.',
          '',
          'The powder with limewater in a barrel becomes mortar, and in a barrel of fresh water, liquid fertilizer.',
        ],
      },
      icon: 'coralstfc:coral_powder',
      deps: ['first_catch'],
      optional: true,
      tasks: [item('coralstfc:coral_powder', 4)],
      ...COMMON,
    }),

    // ---------------- neptunium ----------------
    quest('neptunian_pearl', {
      title: { ru: 'Нептунова жемчужина', en: 'Neptunian Pearl' },
      subtitle: { ru: 'Дар морского владыки', en: 'A gift from the lord of the sea' },
      desc: {
        ru: [
          'Самая ценная находка в брюхе большой рыбы — &6нептунова жемчужина&r. Разделывай крупную рыбу, и рано или поздно она попадётся.',
          '',
          'Жемчужина плавится при 850 °C в металл &6нептуний&r: из трёх жемчужин выйдет почти слиток.',
        ],
        en: [
          'The most valuable find in a big fish\'s belly is a &6Neptunian Pearl&r. Clean big fish, and sooner or later one will turn up.',
          '',
          'The pearl melts at 850 °C into the metal &6neptunium&r: three pearls make almost an ingot.',
        ],
      },
      icon: 'survivorsaquaculture:neptunian_pearl',
      deps: ['big_fish', 'fillet'],
      tasks: [item('survivorsaquaculture:neptunian_pearl')],
      ...RARE,
    }),

    quest('neptunium', {
      title: { ru: 'Нептуний', en: 'Neptunium' },
      subtitle: { ru: 'Металл из глубин', en: 'Metal from the deep' },
      desc: {
        ru: [
          'Расплавь жемчужины в тигле или сосуде и отлей &6слиток нептуния&r в форму. Сварив его со слитком &6чёрной стали&r, получишь &6нептунову сталь&r — металл для подводного снаряжения.',
        ],
        en: [
          'Melt pearls in a crucible or a vessel and cast a &6neptunium ingot&r in a mold. Weld it with a &6black steel&r ingot to get &6Neptunian steel&r, the metal of underwater gear.',
        ],
      },
      icon: 'survivorsaquaculture:metal/ingot/neptunium',
      deps: ['neptunian_pearl', 'metallurgy/black_steel'],
      tasks: [item('survivorsaquaculture:metal/ingot/neptunium'), item('survivorsaquaculture:metal/ingot/neptunian_steel')],
      ...EPIC,
    }),

    quest('neptunium_armor', {
      title: { ru: 'Доспех Нептуна', en: 'Armor of Neptune' },
      subtitle: { ru: 'Владыка морей', en: 'Master of the seas' },
      desc: {
        ru: [
          'Заготовки доспехов куют из двойного листа нептуновой стали, а потом приваривают к ним второй такой лист. Свойства каждой части видно в подсказке.',
          '',
          'Из нептуния делают и инструменты, и оружие, а из нептуновой стали — ещё и вёдра.',
        ],
        en: [
          'Armor blanks are forged from a double sheet of Neptunian steel, then welded to a second such sheet. Each piece lists its effects in the tooltip.',
          '',
          'Neptunium also makes tools and weapons, and Neptunian steel even makes buckets.',
        ],
      },
      icon: 'aquaculture:neptunium_chestplate',
      deps: ['neptunium'],
      tasks: [item(anyOf(NEPTUNIUM_ARMOR), 1, { title: { ru: 'Любая часть доспеха Нептуна', en: 'Any piece of Neptunium armor' }, icon: 'aquaculture:neptunium_chestplate' })],
      ...EPIC,
    }),
  ],
});
