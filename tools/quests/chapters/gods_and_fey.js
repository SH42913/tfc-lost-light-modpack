// Chapter "gods_and_fey": the seven gods and the fey of TFC Spirits. Source: field guide entries god_statues, the_fey,
// october; recipes (anvil: golden brazier, holy staff; crafting: divine compass; sacrifice/<god>/* - offering kinds;
// fey_trade). Fey goods are traded by laying items on fey ground (standing needed / standing spent): runestone 10/5,
// adder stone 40/10, wildrunner charm 60/15, staff of herbs 100/20, enchanted rock 150/20, thicket pact 200/50,
// silvery string 250/100, pumpkin pact 200/50 (October only). The secret October quest has no deps (season() task).
// Text formatting: &6 - names, &e - where to look, &d - field guide, &r - reset.
const { chapter, quest, item, observe, anyOf, link, lootCrate } = require('../lib');
const { season, fullMoon } = require('../custom');

const COMMON = { rewards: [lootCrate('explore_common')], budget: 1500 };
const RARE = { rewards: [lootCrate('explore_rare')], budget: 4500 };
const EPIC = { rewards: [lootCrate('explore_epic')], budget: 15000 };

const GODS = ['esret', 'argon', 'maldor', 'typhon', 'venusia', 'nessus', 'gwanador'];

module.exports = chapter('gods_and_fey', {
  order: 43,
  group: 'mysteries',
  title: { ru: 'Боги и феи', en: 'Gods and Fey' },
  subtitle: { ru: 'Семь богов и скрытый народ', en: 'Seven gods and the hidden folk' },
  icon: 'tfc_spirits:golden_brazier',
  links: [link('exploration/shrine'), link('exploration/fairy_ring'), link('bestiary/dullahan'), link('spirits/spirit_altar')],
  quests: [
    // ---------------- the gods ----------------
    quest('seven_gods', {
      title: { ru: 'Семь богов', en: 'The Seven Gods' },
      subtitle: { ru: 'Каждому свой день', en: 'A day for each' },
      desc: {
        ru: [
          'Семь богов делят неделю, каждый отвечает только в свой день и только раз в день:',
          '- &6Эсрет&r — урожай и лес, понедельник: фрукты, зерно, овощи;',
          '- &6Аргон&r — война, вторник: кости, хлеб, металл для оружия;',
          '- &6Малдор&r — кузня, среда: топливо, металлы, минералы;',
          '- &6Тифон&r — буря и море, четверг: морские твари, водоросли, раковины;',
          '- &6Венузия&r — плодородие, пятница: молоко и яйца, сырые шкуры, сырое мясо;',
          '- &6Несс&r — смерть, суббота: кости, гниль, сера;',
          '- &6Гванадор&r — солнце и король, воскресенье: самоцветы, золото, серебро. В свой день принимает дары любому богу за полцены.',
        ],
        en: [
          'Seven gods divide the week, each answering only on their own day and only once a day:',
          '- &6Esret&r, harvest and forest, Monday: fruit, grain, vegetables;',
          '- &6Argon&r, war, Tuesday: bones, bread, weapon metals;',
          '- &6Maldor&r, the forge, Wednesday: fuel, metals, minerals;',
          '- &6Typhon&r, storm and sea, Thursday: sea creatures, sea plants, shells;',
          '- &6Venusia&r, fertility, Friday: milk and eggs, raw hides, raw meat;',
          '- &6Nessus&r, death, Saturday: bones, rot, sulfur;',
          '- &6Gwanador&r, the sun and king, Sunday: gems, gold, silver. On his day he accepts any god\'s offering at half its worth.',
        ],
      },
      icon: 'tfc_spirits:god_statue/gwanador',
      deps: ['exploration/shrine'],
      tasks: [observe.block(GODS.map((g) => `tfc_spirits:god_statue/${g}`), { title: { ru: 'Посмотри на статую бога', en: 'Look at a god statue' }, icon: 'tfc_spirits:god_statue/gwanador' })],
      ...RARE,
    }),

    quest('offering', {
      title: { ru: 'Подношение', en: 'The Offering' },
      subtitle: { ru: 'Дым до небес', en: 'Smoke to the heavens' },
      desc: {
        ru: [
          'Статуя ничего не берёт из рук. Поставь &6золотую жаровню&r (её куют из двойного листа золота) перед лицом статуи, положи подношение, укрой соломой и подожги.',
          '',
          'Если день верный и бог ещё не получал даров, сгоревшее станет &6божественной эссенцией&r в запасе статуи. Все боги дают светлую эссенцию, большинство — ещё и вторую: Эсрет и Венузия — фей, Аргон и Малдор — тролльей, Тифон и Несс — тёмной. Гванадор даёт только свет, зато щедро.',
          '',
          '&6Святой посох&r куют из двойного слитка золота. Ударь им по статуе — он зарядится светом и заменит духа света: разбудит алтарь или наполнит распятие.',
        ],
        en: [
          'A statue takes nothing from your hands. Stand a &6Golden Brazier&r (forged from a gold double sheet) facing the statue, lay out an offering, bury it in straw and light it.',
          '',
          'If the day is right and the god hasn\'t been given to yet, what burns becomes &6divine essence&r in the statue\'s reserve. Every god gives light essence, most also a second kind: Esret and Venusia fey, Argon and Maldor troll, Typhon and Nessus dark. Gwanador gives only light, but generously.',
          '',
          'A &6Holy Staff&r is forged from a gold double ingot. Strike a statue with it and it charges with light, standing in for a light spirit: it wakes an altar or infuses a crucifix.',
        ],
      },
      icon: 'tfc_spirits:holy_staff',
      deps: ['seven_gods'],
      tasks: [item('tfc_spirits:golden_brazier'), item('tfc_spirits:holy_staff')],
      ...RARE,
    }),

    quest('divine_compass', {
      title: { ru: 'Божественный компас', en: 'Divine Compass' },
      subtitle: { ru: 'Путь к святыне', en: 'The way to the shrine' },
      desc: {
        ru: [
          '&6Божественный компас&r собирают столбиком: линза, самородная серебряная руда, миска. Выбери бога — и стрелка поведёт к ближайшему его святилищу вместо севера. Координат он не показывает.',
        ],
        en: [
          'The &6Divine Compass&r is crafted in a column: a lens, native silver ore, a bowl. Choose a god, and the needle leads to that god\'s nearest shrine instead of north. It never shows coordinates.',
        ],
      },
      icon: 'tfc_spirits:divine_compass',
      deps: ['seven_gods', 'tfc/glassblowing'],
      tasks: [item('tfc_spirits:divine_compass')],
      ...RARE,
    }),

    quest('god_statue', {
      title: { ru: 'Свой алтарь', en: 'A Shrine of Your Own' },
      subtitle: { ru: 'Камень, ставший богом', en: 'Stone become god' },
      desc: {
        ru: [
          'Статуи богов не делают — их находят в развалинах святилищ. Но найденную статую можно повторить: поставь три блока камня этого бога друг на друга и щёлкни по ним, держа статую и зубило.',
          '',
          'Камни богов: мел — Эсрет, габбро — Аргон, базальт — Малдор, сланец — Тифон, мрамор — Венузия, глинистый сланец — Несс, кварцит — Гванадор.',
        ],
        en: [
          'God statues aren\'t made: they\'re found in shrine ruins. But a statue once found can be carved again: stack three blocks of that god\'s stone and click them holding the statue and a chisel.',
          '',
          'The gods\' stones: chalk for Esret, gabbro for Argon, basalt for Maldor, slate for Typhon, marble for Venusia, shale for Nessus, quartzite for Gwanador.',
        ],
      },
      icon: 'tfc_spirits:god_statue/maldor',
      deps: ['offering'],
      optional: true,
      tasks: [item(anyOf(GODS.map((g) => `tfc_spirits:god_statue/${g}`)), 1, { title: { ru: 'Статуя бога', en: 'A god statue' }, icon: 'tfc_spirits:god_statue/maldor' })],
      ...EPIC,
    }),

    // ---------------- the fey ----------------
    quest('runestone', {
      title: { ru: 'Рунный камень', en: 'Runestone' },
      subtitle: { ru: 'Не входи в кольцо', en: 'Don\'t step into the ring' },
      desc: {
        ru: [
          'Феи — духи живого леса. Их земли отмечены кольцом бледных грибов, а владения тянутся на восемь чанков вокруг. &cНе входи в кольцо&r, пока феи тебе не доверяют: схватят и утащат под землю.',
          '',
          'Рубка их рощ и порча земли настраивают фей против тебя, убийство фей — ещё сильнее. Дары на их земле — кости, шкуры, сырое мясо, сахар, сильвин, а больше всего драгоценные металлы — растят доверие. Обида проходит медленно, а доверие не убывает.',
          '',
          'Чтобы торговать, положи вещи на землю фей и подожди. Первым они отдадут &6рунный камень&r за любой изверженный камень: под открытым небом он показывает, как к тебе относятся феи.',
        ],
        en: [
          'The fey are spirits of the living wood. Their lands are marked by a ring of pale mushrooms, and the holding runs eight chunks around it. &cDon\'t step into the ring&r until the fey trust you: they\'ll seize you and drag you under.',
          '',
          'Cutting their groves and spoiling their soil turns the fey against you, and killing fey even more so. Gifts on their ground (bones, hides, raw meat, sugar, sylvite, and precious metals most of all) raise their trust. Resentment fades slowly, and goodwill never fades.',
          '',
          'To trade, lay items on fey ground and wait. The first thing they\'ll give is a &6Runestone&r, for any igneous stone: under open sky it shows how the fey regard you.',
        ],
      },
      icon: 'tfc_spirits:runestone',
      deps: ['exploration/fairy_ring'],
      tasks: [item('tfc_spirits:runestone')],
      ...COMMON,
    }),

    quest('adder_stone', {
      title: { ru: 'Камень с дыркой', en: 'Adder Stone' },
      subtitle: { ru: 'Смотри сквозь', en: 'Look through' },
      desc: {
        ru: [
          'Феи невидимы, пока по ним не ударят. &6Камень с дыркой&r в руке показывает их всегда. Феи дают его за любой осадочный камень, когда доверие достигнет 40.',
          '',
          'Чем выше доверие, тем больше они готовы дать, но каждая сделка немного его тратит.',
        ],
        en: [
          'The fey are unseen until struck. An &6Adder Stone&r held in hand shows them at all times. They give it for any sedimentary stone once your standing reaches 40.',
          '',
          'The higher your standing, the more they offer, but each trade spends a little of it.',
        ],
      },
      icon: 'tfc_spirits:adder_stone',
      deps: ['runestone'],
      tasks: [item('tfc_spirits:adder_stone')],
      ...RARE,
    }),

    quest('fey_gifts', {
      title: { ru: 'Дары фей', en: 'Fey Goods' },
      subtitle: { ru: 'Лес помнит добро', en: 'The forest remembers kindness' },
      desc: {
        ru: [
          'С ростом доверия феи предложат больше:',
          '- &6амулет быстроногости&r (60): за нить и цветок; трава больше не замедляет;',
          '- &6посох трав&r (100): за палку и цветок; выращивает дикие растения из земли;',
          '- &6зачарованный камень&r (150): за метаморфический камень; хранит эссенцию фей для алтаря.',
        ],
        en: [
          'As your standing grows, the fey offer more:',
          '- the &6Wildrunner Charm&r (60): for a string and a flower; undergrowth no longer slows you;',
          '- the &6Staff of Herbs&r (100): for a stick and a flower; draws wild growth out of the soil;',
          '- the &6Enchanted Rock&r (150): for a metamorphic rock; holds fey essence for the altar.',
        ],
      },
      icon: 'tfc_spirits:wildrunner_charm',
      deps: ['adder_stone'],
      tasks: [item(anyOf(['tfc_spirits:wildrunner_charm', 'tfc_spirits:staff_of_herbs', 'tfc_spirits:enchanted_rock']), 1,
        { title: { ru: 'Любой дар фей', en: 'Any fey good' }, icon: 'tfc_spirits:wildrunner_charm' })],
      ...RARE,
    }),

    quest('fey_friend', {
      title: { ru: 'Друг фей', en: 'Friend of the Fey' },
      subtitle: { ru: 'Свой среди чужих', en: 'Welcome among strangers' },
      desc: {
        ru: [
          'Некоторых фей можно сделать друзьями. Друг следует за тобой и сражается вместе с тобой.',
          '- &6серебряная нить&r (доверие 250, за обычную нить) приручает фею;',
          '- &6договор чащи&r (доверие 200, за дубовое бревно TFC) — дриаду.',
          '',
          'Дриад феи посылают только к тем, кого ненавидят, так что встретить её — уже плохой знак.',
        ],
        en: [
          'Some fey can be won over. A friend follows you and fights what you fight.',
          '- a &6Silvery String&r (standing 250, for plain string) tames a fairy;',
          '- a &6Thicket Pact&r (standing 200, for a TFC oak log), a dryad.',
          '',
          'The fey send a dryad only to those they hate, so meeting one is a bad sign already.',
        ],
      },
      icon: 'tfc_spirits:silvery_string',
      deps: ['fey_gifts'],
      optional: true,
      tasks: [item(anyOf(['tfc_spirits:silvery_string', 'tfc_spirits:thicket_pact']), 1, { title: { ru: 'Серебряная нить или договор чащи', en: 'A silvery string or a thicket pact' }, icon: 'tfc_spirits:silvery_string' })],
      ...EPIC,
    }),

    // secret: no deps, so the season() check runs from the start
    quest('october', {
      title: { ru: 'Тонкий месяц', en: 'The Thin Month' },
      subtitle: { ru: 'Граница истончилась', en: 'The veil grows thin' },
      desc: {
        ru: [
          'Наступил октябрь — середина осени, когда свет и тьма проникают в мир смертных легче всего.',
          '',
          'Духи света приходят каждую ночь, не дожидаясь полнолуния. Тени становятся сильнее и пробираются даже на земли фей, а пойманная тень — &6проклятый дух&r с двойной эссенцией. Феи прячутся по ночам, и их землю стерегут дуллаханы. Только в этот месяц феи меняют тыквенный договор.',
        ],
        en: [
          'October has come, the middle of autumn, when light and dark slip into the mortal world most easily.',
          '',
          'Light spirits rise every night without waiting for the full moon. Shades grow stronger and press even into fey lands, and a shade caught now is a &6Cursed spirit&r worth twice the essence. The fey hide at night, and dullahans guard their ground. Only this month do the fey trade the Pumpkin Pact.',
        ],
      },
      icon: 'minecraft:jack_o_lantern',
      hidden: 'invisible',
      optional: true,
      tasks: [season(['OCTOBER'], { title: { ru: 'Встреть октябрь', en: 'Live to see October' }, icon: 'minecraft:jack_o_lantern' })],
      ...COMMON,
    }),

    quest('full_moon', {
      title: { ru: 'Полная луна', en: 'Full Moon' },
      subtitle: { ru: 'Ночь, когда светло', en: 'A night full of light' },
      desc: {
        ru: [
          'Сегодня полнолуние. Раз в восемь ночей поверхность принадлежит духам света: новые тени не появляются, а у стоячей воды и на горных вершинах танцуют огоньки.',
          '',
          'Хорошая ночь, чтобы выйти из дома. Таких немного.',
        ],
        en: [
          'It\'s a full moon tonight. One night in eight the surface belongs to the spirits of light: no new shades appear, and wisps dance by still water and on mountain tops.',
          '',
          'A good night to step outside. There aren\'t many of those.',
        ],
      },
      icon: 'minecraft:clock',
      optional: true,
      hidden: 'invisible',
      tasks: [fullMoon({ title: { ru: 'Встреть ночь полнолуния', en: 'See a full moon night' }, icon: 'minecraft:clock' })],
      ...COMMON,
    }),
  ],
});
