// Chapter "villagers": village life - MCA (Minecraft Comes Alive) relationships, marriage, family and village ranks via
// its advancements (data/mca/advancements in the MCA jar), trading with villagers for TFC gems (tools/trades, the
// currency is tfc:gem/*), Bountiful bounty boards and decrees (pack recipes in lost_light_datapack/data/bountiful).
// MCA: Reputation - standing with each village (custom tasks over its API), with a secret branch for a bad reputation;
// MCA Outlaws - unarmed illagers surrender and can be redeemed into villagers (config/mcaoutlaws-common.toml).
// Text formatting: &6 - names, &e - where to look, &r - reset.
const { chapter, quest, item, observe, advancement, stat, checkmark, reward, xpLevels, anyOf, link, lootCrate } = require('../lib');
const { inMcaVillage, reputationTier, reputationTierAtMost, reputationIncident, nearSurrenderedOutlaw, nearRedeemedOutlaw } = require('../custom');

const COMMON = { rewards: [lootCrate('explore_common')], budget: 1500 };
const RARE = { rewards: [lootCrate('explore_rare')], budget: 4500 };
const EPIC = { rewards: [lootCrate('explore_epic')], budget: 15000 };

const adv = (id, ru, en, icon) => advancement(`mca:${id}`, '', { title: { ru, en }, icon });

module.exports = chapter('villagers', {
  order: 30,
  group: 'settlements',
  title: { ru: 'Жители и торговля', en: 'Villagers and Trade' },
  subtitle: { ru: 'Соседи, сделки и семья', en: 'Neighbours, deals and family' },
  icon: 'minecraft:emerald',
  links: [link('exploration/village'), link('exploration/tavern'), link('exploration/illagers')],
  quests: [
    // The MCA basics book is given only here: the mca:root advancement reward is removed by the pack datapack
    // (lost_light_datapack/data/mca/advancements/root.json).
    quest('village_life', {
      title: { ru: 'Деревенская жизнь', en: 'Village Life' },
      subtitle: { ru: 'Люди, а не болванчики', en: 'People, not puppets' },
      desc: {
        ru: [
          'Жители деревень здесь — не безмолвные торговцы, а люди со своей жизнью: они дружат, ссорятся, влюбляются, женятся и растят детей. С ними можно говорить, дарить подарки, нанимать на работу и даже породниться.',
          '',
          'Всё это описано в книге &6«Relationships and You»&r — возьми её и загляни перед первым визитом в деревню.',
          '',
          'А &6чертёж&r показывает деревню, её постройки и твой ранг. Если жители ещё не признали поселение деревней, встань в доме с крышей, дверью и кроватью, открой чертёж и нажми &6«Add Building»&r — так можно основать деревню самому.',
        ],
        en: [
          'Villagers here aren\'t silent traders but people with lives of their own: they make friends, quarrel, fall in love, marry and raise children. You can talk to them, give gifts, hire them and even become family.',
          '',
          'It\'s all described in &6Relationships and You&r: take it and have a look before your first visit to a village.',
          '',
          'The &6Blueprint&r shows a village, its buildings and your rank. If the villagers don\'t count a settlement as a village yet, stand in a house with a roof, a door and a bed, open the blueprint and press &6Add Building&r: that way you can found a village yourself.',
        ],
      },
      icon: 'mca:book_romance',
      tasks: [checkmark()],
      rewards: [reward('mca:book_romance'), reward('mca:blueprint')],
    }),

    quest('new_neighbors', {
      title: { ru: 'Новые соседи', en: 'New Neighbors' },
      subtitle: { ru: 'Здесь живут люди', en: 'People live here' },
      desc: {
        ru: [
          'Жители деревень — живые люди: у каждого есть имя, характер, настроение и память о тебе. Щёлкни по жителю, чтобы поговорить: поздоровайся, расскажи шутку, обними — или не надо.',
          '',
          'Каждый жест меняет &6отношение&r в сердечках. Удачная беседа зависит от характера и настроения собеседника.',
        ],
        en: [
          'Villagers are living people: each has a name, a personality, a mood and a memory of you. Click a villager to talk: greet them, tell a joke, give a hug, or better not.',
          '',
          'Every gesture changes the &6relationship&r in hearts. A good conversation depends on the other person\'s personality and mood.',
        ],
      },
      icon: 'minecraft:bell',
      deps: ['village_life', 'exploration/village'],
      // not mca:root - that advancement only knows the 5 vanilla village structures
      tasks: [inMcaVillage({ title: { ru: 'Войди в деревню', en: 'Enter a village' }, icon: 'minecraft:bell' })],
      ...COMMON,
    }),

    quest('friendship', {
      title: { ru: 'Дружба', en: 'Friendship' },
      subtitle: { ru: 'Друзья познаются в беде', en: 'A friend in need' },
      desc: {
        ru: [
          'Набери 50 сердечек с одним жителем. Подарки помогают: каждый любит своё, а лучший подарок жители запоминают надолго. Но одно и то же быстро надоедает.',
        ],
        en: [
          'Reach 50 hearts with one villager. Gifts help: everyone likes different things, and villagers remember the best gift for a long time. But the same thing gets boring quickly.',
        ],
      },
      icon: 'minecraft:poppy',
      deps: ['new_neighbors'],
      tasks: [adv('friend', 'Набери 50 сердечек', 'Reach 50 hearts', 'minecraft:poppy')],
      ...COMMON,
    }),

    quest('perfect_gift', {
      title: { ru: 'То, что нужно', en: 'Just What I Wanted' },
      subtitle: { ru: 'Угадал!', en: 'Nailed it!' },
      desc: {
        ru: [
          'Подари жителю то, чему он обрадуется больше всего. Присмотрись к профессии и характеру: кузнецу пригодится металл, а сладкоежке — что-нибудь вкусное.',
        ],
        en: [
          'Give a villager what will delight them most. Mind their profession and personality: a smith appreciates metal, and someone with a sweet tooth something tasty.',
        ],
      },
      icon: 'minecraft:cake',
      deps: ['friendship'],
      optional: true,
      tasks: [adv('excellent_gift', 'Подари идеальный подарок', 'Give a perfect gift', 'minecraft:cake')],
      ...COMMON,
    }),

    quest('trade', {
      title: { ru: 'Торговля', en: 'Trade' },
      subtitle: { ru: 'Самоцвет за самоцвет', en: 'A gem for a gem' },
      desc: {
        ru: [
          'Изумрудов как денег здесь нет: жители торгуют за &6самоцветы TFC&r. Чем ценнее самоцвет, тем больше за него дадут. У каждой профессии свой товар: кузнецы продают металл, фермеры — еду и семена, картографы — карты.',
          '',
          'Самоцветы добывают в рудных жилах, моют в лотке и находят в сундуках.',
        ],
        en: [
          'There are no emeralds for money here: villagers trade for &6TFC gems&r. The more valuable the gem, the more you get for it. Every profession has its own goods: smiths sell metal, farmers food and seeds, cartographers maps.',
          '',
          'Gems are mined in ore veins, panned and found in chests.',
        ],
      },
      icon: 'tfc:gem/emerald',
      deps: ['new_neighbors'],
      tasks: [stat('minecraft:traded_with_villager', 5, { title: { ru: 'Соверши 5 сделок', en: 'Make 5 trades' }, icon: 'tfc:gem/emerald' })],
      ...COMMON,
    }),

    quest('bounty_board', {
      title: { ru: 'Доска заданий', en: 'Bounty Board' },
      subtitle: { ru: 'Требуется помощь', en: 'Help wanted' },
      desc: {
        ru: [
          'На &6доске заданий&r в деревне висят поручения: принеси вещи или победи врагов. Возьми лист с поручением, выполни его до срока и сдай на той же доске — получишь награду.',
          '',
          'Доску можно и сделать: из пиломатериалов, бумаги, латунного механизма и самоцвета.',
        ],
        en: [
          'The &6Bounty Board&r in a village holds jobs: bring items or defeat enemies. Take a bounty, complete it before it expires and turn it in at the same board for a reward.',
          '',
          'A board can also be built: from lumber, paper, brass mechanisms and a gem.',
        ],
      },
      icon: 'bountiful:bountyboard',
      deps: ['new_neighbors'],
      tasks: [
        observe.block('bountiful:bountyboard', { title: { ru: 'Найди доску заданий', en: 'Find a bounty board' }, icon: 'bountiful:bountyboard' }),
        item('bountiful:bounty', 1, { title: { ru: 'Возьми поручение', en: 'Take a bounty' } }),
      ],
      ...RARE,
    }),

    quest('decree', {
      title: { ru: 'Указ', en: 'Decree' },
      subtitle: { ru: 'Именем короля', en: 'In the king\'s name' },
      desc: {
        ru: [
          '&6Указ&r из бумаги, палок, золотого слитка и пурпурного красителя задаёт, какие поручения появятся на доске: кузнечные, охотничьи, рыболовные, фермерские и другие. Положи указ в доску.',
        ],
        en: [
          'A &6Decree&r made from paper, sticks, a gold ingot and purple dye sets which bounties the board offers: smithing, hunting, fishing, farming and more. Put the decree into the board.',
        ],
      },
      icon: 'bountiful:decree',
      deps: ['bounty_board'],
      optional: true,
      tasks: [item('bountiful:decree')],
      ...COMMON,
    }),

    quest('village_rank', {
      title: { ru: 'Уважаемый человек', en: 'A Person of Standing' },
      subtitle: { ru: 'Свой среди своих', en: 'One of their own' },
      desc: {
        ru: [
          'Помогай деревне, и она начнёт тебя уважать: так ты получишь первый &6ранг&r. С рангами растут права в деревне: со временем можно стать дворянином, мэром и даже монархом.',
          '',
          'Состояние деревни, её здания и твой ранг показывает &6чертёж&r из бумаги и синего красителя.',
        ],
        en: [
          'Help a village and it will come to respect you: that earns your first &6rank&r. Ranks bring more say in the village: in time you can become a noble, a mayor and even a monarch.',
          '',
          'The village\'s state, its buildings and your rank are shown by a &6Blueprint&r made of paper and blue dye.',
        ],
      },
      icon: 'mca:blueprint',
      deps: ['friendship'],
      tasks: [adv('merchant', 'Получи первый ранг в деревне', 'Get your first village rank', 'mca:blueprint')],
      ...RARE,
    }),

    quest('mayor', {
      title: { ru: 'Мэр', en: 'Mayor' },
      subtitle: { ru: 'Ключи от города', en: 'The keys to the town' },
      desc: {
        ru: [
          'Стань мэром деревни. У мэра больше прав в деревне, но и спрос с него больше.',
        ],
        en: [
          'Become the mayor of a village. The mayor has more say in the village, but more is expected of you too.',
        ],
      },
      icon: 'minecraft:bell',
      deps: ['village_rank'],
      optional: true,
      tasks: [adv('mayor', 'Стань мэром', 'Become the mayor', 'minecraft:bell')],
      ...EPIC,
    }),

    quest('marriage', {
      title: { ru: 'Свадьба', en: 'Wedding' },
      subtitle: { ru: 'Пока смерть не разлучит нас', en: '\'Til death do us part' },
      desc: {
        ru: [
          'Сначала дружба, потом ухаживания. Когда сердечек станет достаточно, подари &6помолвочное кольцо&r из золота и алмаза, а потом &6обручальное&r — из чистого золота.',
          '',
          'Супруг живёт с тобой, а там, глядишь, и дети появятся.',
        ],
        en: [
          'First friendship, then courtship. Once you have enough hearts, give an &6Engagement Ring&r of gold and diamond, and then a &6Wedding Ring&r of pure gold.',
          '',
          'Your spouse lives with you, and before long there may be children.',
        ],
      },
      icon: 'mca:wedding_ring',
      deps: ['friendship'],
      optional: true,
      tasks: [
        item(anyOf(['mca:engagement_ring', 'mca:engagement_ring_rg']), 1, { title: { ru: 'Помолвочное кольцо', en: 'An engagement ring' }, icon: 'mca:engagement_ring' }),
        adv('marriage', 'Женись или выйди замуж', 'Get married', 'mca:wedding_ring'),
      ],
      ...RARE,
    }),

    quest('family', {
      title: { ru: 'Новое поколение', en: 'The Next Generation' },
      subtitle: { ru: 'Детский смех в доме', en: 'Laughter in the house' },
      desc: {
        ru: [
          'Ребёнка носят на руках, пока он не подрастёт. Подросший ребёнок помогает по хозяйству, а взрослый может завести свою семью.',
        ],
        en: [
          'A baby is carried in your arms until it grows. A grown child helps with chores, and an adult can start a family of their own.',
        ],
      },
      icon: 'mca:baby_boy',
      deps: ['marriage'],
      optional: true,
      tasks: [adv('baby', 'Заведи ребёнка', 'Have a baby', 'mca:baby_boy')],
      ...RARE,
    }),

    quest('workstation', {
      title: { ru: 'Рабочее место', en: 'A Place to Work' },
      subtitle: { ru: 'Каждому делу — свой верстак', en: 'To every trade its bench' },
      desc: {
        ru: [
          'Житель без дела берёт профессию, если рядом стоит свободное &6рабочее место&r: камнерез для каменщика, точильный камень для оружейника, стол картографа, коптильня для мясника и так далее.',
          '',
          'Рецепты у них здесь свои, под материалы TerraFirmaCraft, — смотри в JEI. Поставь рабочее место в деревне, и у тебя появится нужный торговец.',
        ],
        en: [
          'A jobless villager takes a profession when a free &6workstation&r stands nearby: a stonecutter for a mason, a grindstone for a weaponsmith, a cartography table, a smoker for a butcher and so on.',
          '',
          'Their recipes here are the pack\'s own, built on TerraFirmaCraft materials: see JEI. Put a workstation in a village and you get the trader you need.',
        ],
      },
      icon: 'minecraft:stonecutter',
      deps: ['trade'],
      tasks: [item(anyOf('minecraft:blast_furnace', 'minecraft:smoker', 'minecraft:cartography_table', 'minecraft:brewing_stand', 'minecraft:composter',
        'minecraft:barrel', 'minecraft:fletching_table', 'minecraft:stonecutter', 'minecraft:loom', 'minecraft:grindstone'), 1,
      { title: { ru: 'Любое рабочее место', en: 'Any workstation' } })],
      ...COMMON,
    }),

    // ---------------- reputation (MCA: Reputation) ----------------
    quest('reputation', {
      title: { ru: 'Добрая слава', en: 'A Good Name' },
      subtitle: { ru: 'Слухами земля полнится', en: 'Word gets around' },
      desc: {
        ru: [
          'Помимо отношения каждого жителя к тебе, у тебя есть &6репутация&r у деревни в целом. Жители видят твои поступки, обсуждают их между собой, и молва расходится по деревне: помог — тебя хвалят, навредил — запомнят надолго.',
          '',
          'Свою репутацию смотри кнопкой &6«Standing»&r в окне разговора с жителем или командой &e/mcareputation get&r.',
        ],
        en: [
          'Besides how each villager feels about you, you have a &6reputation&r with the village as a whole. Villagers see what you do, talk it over, and word spreads: help and you\'re praised, do harm and they won\'t forget it.',
          '',
          'Check your standing with the &6Standing&r button in a villager\'s dialogue or with &e/mcareputation get&r.',
        ],
      },
      icon: 'minecraft:name_tag',
      deps: ['new_neighbors'],
      tasks: [reputationTier('acquaintance', { title: { ru: 'Стань знакомым в деревне', en: 'Become an Acquaintance of a village' }, icon: 'minecraft:name_tag' })],
      ...COMMON,
    }),

    quest('honored', {
      title: { ru: 'Почётный гость', en: 'Guest of Honour' },
      subtitle: { ru: 'Двери открыты', en: 'Every door is open' },
      desc: {
        ru: ['Заслужи в деревне ступень &6«Honored»&r. Чем выше репутация, тем охотнее жители тебе доверяют и тем выше тебя ценят.'],
        en: ['Earn the &6Honored&r standing in a village. The better your reputation, the more readily villagers trust you and the higher they hold you.'],
      },
      icon: 'minecraft:golden_helmet',
      deps: ['reputation'],
      tasks: [reputationTier('honored', { title: { ru: 'Стань почётным в деревне', en: 'Become Honored in a village' }, icon: 'minecraft:golden_helmet' })],
      ...RARE,
    }),

    quest('revered', {
      title: { ru: 'Живая легенда', en: 'A Living Legend' },
      subtitle: { ru: 'О тебе поют песни', en: 'They sing songs of you' },
      desc: {
        ru: ['Высшая ступень репутации — &6«Revered»&r. Такого героя деревня будет помнить и через поколения.'],
        en: ['The highest standing is &6Revered&r. A village will remember a hero like that for generations.'],
      },
      icon: 'minecraft:totem_of_undying',
      deps: ['honored'],
      optional: true,
      tasks: [reputationTier('revered', { title: { ru: 'Стань почитаемым в деревне', en: 'Become Revered in a village' }, icon: 'minecraft:totem_of_undying' })],
      ...EPIC,
    }),

    quest('rescuer', {
      title: { ru: 'Спаситель', en: 'Rescuer' },
      subtitle: { ru: 'Вовремя подоспел', en: 'Just in time' },
      desc: {
        ru: ['Убей чудовище, которое напало на жителя. Делай это &eна глазах у других жителей&r: подвиг без свидетелей деревня не запомнит.'],
        en: ['Kill a monster attacking a villager. Do it &ein front of other villagers&r: a deed nobody sees is a deed the village won\'t remember.'],
      },
      icon: 'minecraft:shield',
      deps: ['reputation'],
      tasks: [reputationIncident('villager_rescued', { title: { ru: 'Спаси жителя', en: 'Save a villager' }, icon: 'minecraft:shield' })],
      ...COMMON,
    }),

    quest('healer', {
      title: { ru: 'Лекарь', en: 'Healer' },
      subtitle: { ru: 'Не всё потеряно', en: 'Not all is lost' },
      desc: {
        ru: ['Зомби-житель ещё помнит, кем был. Брось в него зелье &6слабости&r и дай &6золотое яблоко&r — через несколько минут он снова станет человеком, а деревня тебе этого не забудет.'],
        en: ['A zombie villager still remembers who they were. Throw a potion of &6Weakness&r at them and give them a &6golden apple&r: in a few minutes they\'re human again, and the village won\'t forget it.'],
      },
      icon: 'minecraft:golden_apple',
      deps: ['reputation'],
      optional: true,
      tasks: [reputationIncident('villager_cured', { title: { ru: 'Вылечи зомби-жителя', en: 'Cure a zombie villager' }, icon: 'minecraft:golden_apple' })],
      ...RARE,
    }),

    quest('raid_defender', {
      title: { ru: 'Защитник деревни', en: 'Village Defender' },
      subtitle: { ru: 'Стеной встали', en: 'Holding the line' },
      desc: {
        ru: ['Помоги деревне отбиться от &6набега разбойников&r. Такое не забывают: о тебе будут говорить по всей округе.'],
        en: ['Help a village beat back a &6raid&r. That kind of thing isn\'t forgotten: the whole area will talk about you.'],
      },
      icon: 'minecraft:crossbow',
      deps: ['reputation'],
      optional: true,
      tasks: [reputationIncident('raid_repelled', { title: { ru: 'Отбей набег на деревню', en: 'Repel a raid on a village' }, icon: 'minecraft:crossbow' })],
      ...RARE,
    }),

    // Secret branch: invisible until completed, symbolic rewards only (hurting villagers must not pay off).
    // Starts at distrusted: wary (-25) is one stray sword swing away.
    quest('distrusted', {
      title: { ru: 'Недоверие', en: 'Distrust' },
      subtitle: { ru: 'На тебя косятся', en: 'Sidelong glances' },
      desc: {
        ru: ['Жители перестали тебе доверять. Двери закрываются, разговоры стихают, стоит тебе подойти.'],
        en: ['The villagers no longer trust you. Doors close and talk dies down when you come near.'],
      },
      icon: 'minecraft:stone_sword',
      hidden: 'invisible',
      optional: true,
      tasks: [reputationTierAtMost('distrusted', { title: { ru: 'Потеряй доверие деревни', en: 'Lose a village\'s trust' }, icon: 'minecraft:stone_sword' })],
      rewards: [xpLevels(2)],
    }),

    quest('outcast', {
      title: { ru: 'Изгой', en: 'Outcast' },
      subtitle: { ru: 'Тебя здесь не ждут', en: 'Not welcome here' },
      desc: {
        ru: ['Деревня тебя ненавидит. Матери уводят детей с улицы, а стража провожает взглядом.'],
        en: ['The village hates you. Mothers pull their children off the street, and the guards watch your every step.'],
      },
      icon: 'minecraft:skeleton_skull',
      deps: ['distrusted'],
      hidden: 'invisible',
      optional: true,
      tasks: [reputationTierAtMost('hated', { title: { ru: 'Стань ненавистным', en: 'Become Hated' }, icon: 'minecraft:skeleton_skull' })],
      rewards: [xpLevels(3)],
    }),

    quest('scourge', {
      title: { ru: 'Гроза деревень', en: 'Scourge of Villages' },
      subtitle: { ru: 'Твоим именем пугают детей', en: 'They scare children with your name' },
      desc: {
        ru: ['Ниже падать некуда: ты печально знаменит. Но даже с этого дна есть дорога назад.'],
        en: ['There is nowhere lower to fall: you are infamous. Yet even from here there is a road back.'],
      },
      icon: 'minecraft:wither_skeleton_skull',
      deps: ['outcast'],
      hidden: 'invisible',
      optional: true,
      tasks: [reputationTierAtMost('infamous', { title: { ru: 'Стань печально знаменитым', en: 'Become Infamous' }, icon: 'minecraft:wither_skeleton_skull' })],
      rewards: [xpLevels(5)],
    }),

    quest('atonement', {
      title: { ru: 'Покаяние', en: 'Atonement' },
      subtitle: { ru: 'Никогда не поздно', en: 'It\'s never too late' },
      desc: {
        ru: [
          'Худая слава бежит быстро, а добрая — медленно, но её можно вернуть. &6Возмести ущерб&r или &6публично извинись&r перед деревней — или делами снова заслужи ступень &6«Acquaintance»&r.',
          '',
          'Старые обиды со временем забываются, а новые добрые дела говорят сами за себя.',
        ],
        en: [
          'A bad name travels fast and a good one slowly, but it can be won back. &6Make restitution&r or &6publicly apologise&r to the village, or earn the &6Acquaintance&r standing again through your deeds.',
          '',
          'Old grudges fade with time, and new good deeds speak for themselves.',
        ],
      },
      icon: 'minecraft:poppy',
      deps: ['outcast'],
      hidden: 'deps_complete',
      optional: true,
      tasks: [reputationIncident(['restitution_completed', 'public_apology'], {
        orTier: { tier: 'acquaintance', current: true },
        title: { ru: 'Загладь вину перед деревней', en: 'Make amends with a village' }, icon: 'minecraft:poppy',
      })],
      ...RARE,
    }),

    // ---------------- outlaws (MCA Outlaws) ----------------
    quest('surrender', {
      title: { ru: 'Сдавайся!', en: 'Surrender!' },
      subtitle: { ru: 'Руки вверх', en: 'Hands up' },
      desc: {
        ru: [
          'Разбойники — такие же люди. Безоружный разбойник не дерётся, а &6сдаётся&r. Некоторые бродят без оружия с самого начала, а у остальных его можно &6выбить из рук&r ударом в ближнем бою.',
          '',
          'Но не бей сдавшегося: он озлобится и полезет в драку с кулаками. Колдуны оружия не носят и не сдаются никогда.',
        ],
        en: [
          'Raiders are people too. An unarmed raider doesn\'t fight, they &6surrender&r. Some roam without weapons from the start, and the rest can have theirs &6knocked out of their hands&r with a melee hit.',
          '',
          'But don\'t hit one who has surrendered: they\'ll turn angry and fight back bare-handed. Spellcasters carry no weapons and never surrender.',
        ],
      },
      icon: 'minecraft:white_banner',
      deps: ['exploration/illagers'],
      tasks: [nearSurrenderedOutlaw({ title: { ru: 'Найди сдавшегося разбойника', en: 'Find a raider who has surrendered' }, icon: 'minecraft:white_banner' })],
      ...COMMON,
    }),

    quest('redemption', {
      title: { ru: 'Второй шанс', en: 'A Second Chance' },
      subtitle: { ru: 'Завязал', en: 'Going straight' },
      desc: {
        ru: ['Предложи сдавшемуся разбойнику &6изумруд&r (самоцвет TFC) — и он бросит разбой и станет обычным жителем. Одежду, правда, оставит прежнюю.'],
        en: ['Offer a surrendered raider an &6emerald&r (a TFC gem), and they\'ll leave the outlaw life and become an ordinary villager. They keep their old clothes, though.'],
      },
      icon: 'tfc:gem/emerald',
      deps: ['surrender'],
      tasks: [nearRedeemedOutlaw({ title: { ru: 'Верни разбойника к мирной жизни', en: 'Bring a raider back to a peaceful life' }, icon: 'tfc:gem/emerald' })],
      ...RARE,
    }),
  ],
});
