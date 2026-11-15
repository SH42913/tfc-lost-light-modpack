// Chapter "spirits": the spirit craft of TFC Spirits - storing essence (spirit totem, spirit statue), the spirit altar
// and its rituals, greater seal, pearl eye, soul scythes, earth staffs, soul lantern and evil eye talisman, respawn
// totem. Source: the TFC Spirits field guide (assets/tfc/patchouli_books/field_guide/en_us/entries/tfc_spirits/*) and
// its recipes (data/tfc_spirits/recipes/spirit_altar/*). The seal, crucifix and spirit hunting are in the bestiary;
// gods and the fey are in the gods_and_fey chapter.
// Text formatting: &6 - names, &e - where to look, &d - field guide, &r - reset.
const { chapter, quest, item, observe, anyOf, link, lootCrate } = require('../lib');
const { hasFluid } = require('../custom');

const COMMON = { rewards: [lootCrate('explore_common')], budget: 1500 };
const RARE = { rewards: [lootCrate('explore_rare')], budget: 4500 };
const EPIC = { rewards: [lootCrate('explore_epic')], budget: 15000 };

const ROCKS = ['andesite', 'basalt', 'chalk', 'chert', 'claystone', 'conglomerate', 'dacite', 'diorite', 'dolomite', 'gabbro', 'gneiss',
  'granite', 'limestone', 'marble', 'phyllite', 'quartzite', 'rhyolite', 'schist', 'shale', 'slate'];
const WOODS = ['acacia', 'ash', 'aspen', 'birch', 'blackwood', 'chestnut', 'douglas_fir', 'hickory', 'kapok', 'mangrove', 'maple', 'oak',
  'palm', 'pine', 'rosewood', 'sequoia', 'spruce', 'sycamore', 'white_cedar', 'willow'];
const ns = (namespace, ids) => ids.map((id) => `${namespace}:${id}`);

module.exports = chapter('spirits', {
  order: 42,
  group: 'mysteries',
  title: { ru: 'Мир духов', en: 'The Spirit World' },
  subtitle: { ru: 'Печати, алтари и обряды', en: 'Seals, altars and rites' },
  icon: 'tfc_spirits:spirit_seal',
  links: [link('bestiary/spirit_seal'), link('bestiary/light_spirits'), link('bestiary/shade_ward'), link('bestiary/trolls')],
  quests: [
    quest('spirit_totem', {
      title: { ru: 'Тотем духов', en: 'Spirit Totem' },
      subtitle: { ru: 'Пять душ в одном столбе', en: 'Five souls in one pillar' },
      desc: {
        ru: [
          'Печать только носит духа, а &6тотем духов&r хранит до пяти. Щёлкни по нему полной печатью, чтобы положить духа, и пустой — чтобы забрать.',
          '',
          'Тотем можно и сжечь: обложи его соломой и подожги — все духи внутри сгорят разом и дадут благословение. Чем свирепее дух, тем вероятнее у благословения будет и обратная сторона. Расколотые духи, оставшиеся от обрядов, при сжигании ничего не дают.',
        ],
        en: [
          'A seal only carries a spirit, but a &6Spirit Totem&r stores up to five. Use it with a full seal to put a spirit in, and with an empty one to take it back.',
          '',
          'A totem can also be burned: heap straw over it and light it, and every spirit inside burns at once and grants a blessing. The fiercer the spirit, the more likely the blessing has a drawback. Fractured spirits left over from rituals give nothing when burned.',
        ],
      },
      icon: 'tfc_spirits:spirit_totem',
      deps: ['bestiary/spirit_seal'],
      tasks: [item('tfc_spirits:spirit_totem')],
      ...COMMON,
    }),

    quest('spirit_statue', {
      title: { ru: 'Статуя духов', en: 'Spirit Statue' },
      subtitle: { ru: 'Лицо — дело случая', en: 'The face is chance' },
      desc: {
        ru: [
          '&6Статуя духов&r, вырезанная из камня, тоже хранит пять духов, но сжечь её нельзя: это только запас для алтаря. Лицо статуи выпадает случайно и ни на что не влияет.',
        ],
        en: [
          'A &6Spirit Statue&r carved from stone also stores five spirits, but it can\'t be burned: it\'s only a supply for the altar. Its face is picked at random and changes nothing.',
        ],
      },
      icon: 'tfc_spirits:shade_statue/granite',
      deps: ['spirit_totem'],
      optional: true,
      tasks: [item(anyOf(ROCKS.map((r) => `tfc_spirits:shade_statue/${r}`)), 1, { title: { ru: 'Любая статуя духов', en: 'Any spirit statue' }, icon: 'tfc_spirits:shade_statue/granite' })],
      ...COMMON,
    }),

    quest('spirit_altar', {
      title: { ru: 'Алтарь духов', en: 'Spirit Altar' },
      subtitle: { ru: 'Пробуди камень', en: 'Wake the stone' },
      desc: {
        ru: [
          '&6Алтарь духов&r делают из камня и шкуры. Поставленный, он спит, пока его не разбудит &6печать с духом света&r — ничто другое не подойдёт.',
          '',
          'Сам алтарь ничего не хранит: он берёт эссенцию из тотемов и статуй в кубе 9×9×9 вокруг себя. Эссенций четыре, и они не заменяют друг друга: &6тёмная&r режет, гноит и проклинает, &6светлая&r благословляет и лечит, &6эссенция фей&r растит, &6троллья&r работает с камнем и инструментами.',
          '',
          'Открой алтарь, разложи вещи крестом по пяти слотам и ударь по столу &6костью&r или святым посохом. Лишнего в слотах быть не должно.',
        ],
        en: [
          'A &6Spirit Altar&r is made from stone and a hide. Once placed it sleeps until a &6seal holding a light spirit&r wakes it; nothing else will do.',
          '',
          'The altar stores nothing itself: it draws essence from totems and statues in the 9x9x9 cube around it. There are four essences and they don\'t replace one another: &6dark&r cuts, rots and curses, &6light&r blesses and heals, &6fey&r grows, &6troll&r works stone and tools.',
          '',
          'Open the altar, lay items out in a cross over its five slots and strike the table with a &6bone&r or a holy staff. Nothing extra may be left in the slots.',
        ],
      },
      icon: 'tfc_spirits:spirit_altar/granite',
      deps: ['spirit_totem', 'bestiary/light_spirits'],
      tasks: [item(anyOf(ROCKS.map((r) => `tfc_spirits:spirit_altar/${r}`)), 1, { title: { ru: 'Любой алтарь духов', en: 'Any spirit altar' }, icon: 'tfc_spirits:spirit_altar/granite' })],
      ...RARE,
    }),

    quest('holy_water', {
      title: { ru: 'Святая вода', en: 'Holy Water' },
      subtitle: { ru: 'Вода живая и мёртвая', en: 'Water of life and death' },
      desc: {
        ru: [
          'Самый простой обряд: положи в центр ёмкость с водой. За 5 светлой эссенции вода станет &6святой&r, за 5 тёмной — &6мёртвой&r.',
        ],
        en: [
          'The simplest ritual: put a container of water in the center. For 5 light essence the water becomes &6holy water&r, for 5 dark, &6death water&r.',
        ],
      },
      icon: 'tfc_spirits:holy_water_bucket',
      deps: ['spirit_altar'],
      tasks: [hasFluid(['tfc_spirits:holy_water', 'tfc_spirits:death_water'], { title: { ru: 'Святая или мёртвая вода', en: 'Holy or death water' }, icon: 'tfc_spirits:holy_water_bucket' })],
      ...COMMON,
    }),

    quest('altar_gifts', {
      title: { ru: 'Дары алтаря', en: 'Gifts of the Altar' },
      subtitle: { ru: 'Серебро против нежити', en: 'Silver against the undead' },
      desc: {
        ru: [
          'Самоцветная пыль за 10 светлой эссенции становится светящейся пылью, а яблоко со слитком золота за 25 светлой — золотым яблоком.',
          '',
          'Ещё алтарь зачаровывает оружие и инструменты:',
          '- клинок со слитком &6чёрной бронзы&r за 100 тёмной эссенции — Острота II;',
          '- клинок со слитком &6серебра&r за 50 светлой — Небесная кара IV;',
          '- инструмент с самоцветной пылью за 100 тролльей — Эффективность II.',
        ],
        en: [
          'Gem powder becomes glowstone dust for 10 light essence, and an apple with a gold ingot becomes a golden apple for 25 light.',
          '',
          'The altar also enchants weapons and tools:',
          '- a blade with a &6black bronze&r ingot for 100 dark essence: Sharpness II;',
          '- a blade with a &6silver&r ingot for 50 light: Smite IV;',
          '- a tool with gem powder for 100 troll: Efficiency II.',
        ],
      },
      icon: 'tfc:metal/sword/black_bronze',
      deps: ['holy_water'],
      optional: true,
      tasks: [item(anyOf(['minecraft:golden_apple', 'minecraft:glowstone_dust']), 1, { title: { ru: 'Золотое яблоко или светящаяся пыль с алтаря', en: 'A golden apple or glowstone dust from the altar' }, icon: 'minecraft:golden_apple' })],
      ...RARE,
    }),

    quest('greater_seal', {
      title: { ru: 'Большая печать', en: 'Greater Spirit Seal' },
      subtitle: { ru: 'Восемь в одной', en: 'Eight in one' },
      desc: {
        ru: [
          '&6Большую печать&r вырезают на алтаре: обычная печать в центре, вокруг — камень (не осадочный), 100 тролльей эссенции. Она держит восемь духов, но только одного вида: каким наполнишь первым, такой и останется, пока печать не опустеет.',
          '',
          'Тратится только верхний дух; ПКМ перебирает стопку.',
        ],
        en: [
          'A &6Greater Spirit Seal&r is cut at the altar: a regular seal in the center, stone (not sedimentary) around it, 100 troll essence. It holds eight spirits, but of one kind only: whatever goes in first locks it until it\'s empty.',
          '',
          'Only the top spirit is spent; right-click cycles the stack.',
        ],
      },
      icon: 'tfc_spirits:greater_spirit_seal',
      deps: ['spirit_altar', 'bestiary/trolls'],
      tasks: [item('tfc_spirits:greater_spirit_seal')],
      ...EPIC,
    }),

    quest('pearl_eye', {
      title: { ru: 'Жемчужный глаз', en: 'Pearl Eye' },
      subtitle: { ru: 'Видеть невидимое', en: 'See the unseen' },
      desc: {
        ru: [
          '&6Жемчужный глаз&r из моллюска, золы и костей за 50 тёмной эссенции. Возьми его в руку и посмотри на тотем или статую — узнаешь, какие духи внутри.',
        ],
        en: [
          'The &6Pearl Eye&r is made from a mollusk, ash and bones for 50 dark essence. Hold it and look at a totem or a statue to learn which spirits are inside.',
        ],
      },
      icon: 'tfc_spirits:pearl_eye',
      deps: ['spirit_altar'],
      optional: true,
      tasks: [item('tfc_spirits:pearl_eye')],
      ...COMMON,
    }),

    quest('soul_scythe', {
      title: { ru: 'Коса душ', en: 'Soul Scythe' },
      subtitle: { ru: 'Жатва', en: 'The harvest' },
      desc: {
        ru: [
          'Коса, связанная на алтаре, собирает эссенцию в любую печать в рюкзаке — вторая рука свободна. Косит и бьёт она как обычная коса TFC того же металла, только чуть быстрее.',
          '- &6коса душ&r: коса из чёрной бронзы, иссохшая материя, 200 тёмной эссенции;',
          '- &6коса жнеца&r: коса из чёрной стали, иссохшая материя дважды, 400 тёмной.',
        ],
        en: [
          'A scythe bound at the altar reaps essence into any seal in your pack, freeing your offhand. It mows and fights like a TFC scythe of the same metal, only slightly faster.',
          '- &6Soul Scythe&r: a black bronze scythe, withered matter, 200 dark essence;',
          '- &6Reaper Scythe&r: a black steel scythe, withered matter twice, 400 dark.',
        ],
      },
      icon: 'tfc_spirits:soul_scythe',
      deps: ['spirit_altar'],
      tasks: [item(anyOf(['tfc_spirits:soul_scythe', 'tfc_spirits:reaper_scythe']), 1, { title: { ru: 'Коса душ или жнеца', en: 'A soul or reaper scythe' }, icon: 'tfc_spirits:soul_scythe' })],
      ...EPIC,
    }),

    quest('earth_staffs', {
      title: { ru: 'Посохи земли', en: 'Staffs of the Land' },
      subtitle: { ru: 'Камень и мох', en: 'Stone and moss' },
      desc: {
        ru: [
          'Каждый посох меняет землю вокруг:',
          '- &6посох увядания&r (палка и зола, 100 тёмной): губит траву, урожай и листву. &cНа земле фей его не простят&r;',
          '- &6посох мха&r (палка и мох, 5 эссенции фей): покрывает мхом булыжник и кирпич;',
          '- &6посох плавки камня&r (сера и четыре изверженные породы, 80 тролльей): плавит булыжник обратно в цельный камень, а гравий — в булыжник;',
          '- &6посох сталактитов&r (гипс и известняк, 70 тролльей): выращивает сталактиты и сталагмиты.',
        ],
        en: [
          'Each staff changes the land around it:',
          '- the &6Staff of Decay&r (stick and ash, 100 dark): kills grass, crops and leaves. &cThe fey won\'t forgive it on their ground&r;',
          '- the &6Staff of Moss&r (stick and moss, 5 fey): spreads moss over cobble and bricks;',
          '- the &6Rock Melting Staff&r (sulfur and four igneous rocks, 80 troll): melts cobble back into raw rock, and gravel into cobble;',
          '- the &6Stalactite Staff&r (gypsum and limestone, 70 troll): grows stalactites and stalagmites.',
        ],
      },
      icon: 'tfc_spirits:rock_melting_staff',
      deps: ['spirit_altar'],
      tasks: [item(anyOf(ns('tfc_spirits', ['staff_of_decay', 'staff_of_moss', 'rock_melting_staff', 'stalactite_staff'])), 1,
        { title: { ru: 'Любой посох с алтаря', en: 'Any altar staff' }, icon: 'tfc_spirits:rock_melting_staff' })],
      ...RARE,
    }),

    quest('soul_lantern', {
      title: { ru: 'Фонарь душ', en: 'Soul Lantern' },
      subtitle: { ru: 'Свет, что горит на душах', en: 'A light that burns on souls' },
      desc: {
        ru: [
          '&6Песок душ&r получают на алтаре: песок и иссохшая материя, 20 тёмной эссенции. Четыре песка душ, поташ и известь дают шихту стекла душ, из неё выдувают стекло для лампы. Каркас куют из никелевого слитка.',
          '',
          'Фонарь зажигают как лампу TFC, но питают духами: щёлкни полной печатью. Каждая единица эссенции — пять дней света. Дух света горит ярко, остальные — тускло.',
        ],
        en: [
          '&6Soul sand&r is made at the altar: sand and withered matter, 20 dark essence. Four soul sand, potash and lime make a soul glass batch, which is blown into lamp glass. The frame is forged from a nickel ingot.',
          '',
          'The lantern is lit like a TFC lamp but fed with spirits: click it with a full seal. Each point of essence is five days of light. A light spirit burns bright, the rest burn dim.',
        ],
      },
      icon: 'tfc_spirits:soul_lantern',
      deps: ['holy_water', 'tfc/glassblowing'],
      tasks: [item('minecraft:soul_sand', 4), item('tfc_spirits:soul_lantern')],
      ...RARE,
    }),

    quest('evil_eye', {
      title: { ru: 'Дурной глаз', en: 'The Evil Eye' },
      subtitle: { ru: 'Сглаз отводит сглаз', en: 'An eye against the eye' },
      desc: {
        ru: [
          'Из той же шихты стекла душ, обработанной медью, содой и графитом, выдувают &6талисман дурного глаза&r. В любой руке он сразу снимает проклятия: иссушение, слабость, замедление, усталость, тошноту и слепоту — и понемногу изнашивается.',
        ],
        en: [
          'The same soul glass batch, worked with copper, soda ash and graphite, is blown into an &6Evil Eye Talisman&r. Held in either hand, it strips curses at once (wither, weakness, slowness, mining fatigue, nausea and blindness) and wears a little each time.',
        ],
      },
      icon: 'tfc_spirits:evil_eye_talisman',
      deps: ['soul_lantern'],
      optional: true,
      tasks: [item('tfc_spirits:evil_eye_talisman')],
      ...RARE,
    }),

    quest('respawn_totem', {
      title: { ru: 'Тотем возрождения', en: 'Totem of Respawning' },
      subtitle: { ru: 'Одна жизнь — один дух', en: 'One life, one spirit' },
      desc: {
        ru: [
          'Рецепта нет: возьми нож в правую руку, печать — в левую и ударь по стоящему бревну. Подойдёт любое из двадцати деревьев TFC.',
          '',
          'Заряди тотем: сначала &6подношение&r (зерно, фрукты, овощи или мясо), потом &6печать с духом&r. Щёлкни пустой рукой — и будешь возрождаться у тотема откуда угодно, даже из другого мира. Каждая смерть стоит одного заряда. Тотемы можно ставить столбиком, а сон в кровати сбрасывает привязку.',
        ],
        en: [
          'There\'s no recipe: hold a knife in your main hand and a seal in your offhand and strike a standing log. Any of TFC\'s twenty woods will do.',
          '',
          'Charge the totem: first an &6offering&r (grain, fruit, vegetables or meat), then a &6seal holding a spirit&r. Use it with an empty hand and you\'ll respawn at it from anywhere, even another dimension. Each death costs one charge. Totems stack into a column, and sleeping in a bed drops the binding.',
        ],
      },
      icon: 'tfc_spirits:respawn_totem/oak',
      deps: ['bestiary/spirit_seal'],
      tasks: [observe.block(WOODS.map((w) => `tfc_spirits:respawn_totem/${w}`), { title: { ru: 'Вырежи тотем возрождения', en: 'Carve a totem of respawning' }, icon: 'tfc_spirits:respawn_totem/oak' })],
      ...RARE,
    }),
  ],
});
