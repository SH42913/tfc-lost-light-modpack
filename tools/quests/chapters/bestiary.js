// Chapter "bestiary": hunt the dangerous creatures of the world - TFC predators, TFC Spirits, Primitive Creatures,
// Valarian Conquest outlaws and undead. In Lost Light the surface is roamed by Primitive Creatures (often), predators
// (less often) and bandits (rarely); at night shades come out; vanilla zombies/skeletons/spiders only live in structures. Kills of "any of these types" use custom.js killAny (FTB kill tasks take one type).
// Fey creatures (fairies, dryads) are left out on purpose: killing them angers the fey.
// Text formatting: &6 - names, &e - where to look, &r - reset.
const { chapter, quest, item, kill, observe, stat, reward, lootCrate } = require('../lib');
const { killAny, diedTo } = require('../custom');

const COMMON = { rewards: [lootCrate('explore_common')], budget: 1500 };
const RARE = { rewards: [lootCrate('explore_rare')], budget: 4500 };
const EPIC = { rewards: [lootCrate('explore_epic')], budget: 15000 };

const hunt = (entities, count, ru, en, icon) => killAny(entities, count, { title: { ru, en }, icon });
const ns = (namespace, ids) => ids.map((id) => `${namespace}:${id}`);

module.exports = chapter('bestiary', {
  order: 20,
  group: 'combat',
  title: { ru: 'Бестиарий', en: 'Bestiary' },
  subtitle: { ru: 'Охотничий журнал', en: 'A hunter\'s journal' },
  icon: 'tfc:spawn_egg/direwolf',
  quests: [
    quest('wild_tribes', {
      title: { ru: 'Дикие племена', en: 'Wild Tribes' },
      subtitle: { ru: 'Здесь чужаков не любят', en: 'Strangers aren\'t welcome here' },
      desc: {
        ru: [
          'Эта глава — охотничий журнал: квесты засчитываются за убийства нужных существ. Счёт идёт только у открытых квестов, так что сначала закрой этот — он открывает почти все остальные.',
          '',
          'Чаще всего на поверхности, днём и ночью, встречаются дикие племена: охотники, следопыты, костоломы, шаманы и берсерки. Наёмники служат кому угодно за деньги. Хищники попадаются реже, а бандиты — совсем редко. А после заката из темноты выходят тени.',
          '',
          '&6Совет:&r дикари в шкурах неплохо держат колющие удары, а дробящее оружие бьёт их чуть сильнее.',
        ],
        en: [
          'This chapter is a hunter\'s journal: quests count kills of the right creatures. Only unlocked quests keep count, so finish this one first: it unlocks almost all the others.',
          '',
          'The most common threat on the surface, day and night, are wild tribes: hunters, stalkers, bonebreakers, shamans and berserkers. Mercenaries serve anyone for coin. Predators are rarer, and bandits rarer still. And after sunset, shades come out of the dark.',
          '',
          '&6Tip:&r tribesmen in hides shrug off piercing blows fairly well, while crushing weapons hit them a bit harder.',
        ],
      },
      icon: 'primitive_creatures:iloger_10_spawn_egg',
      tasks: [hunt(ns('primitive_creatures', ['iloger_1', 'iloger_2', 'iloger_3', 'iloger_4', 'iloger_5', 'iloger_6', 'iloger_10', 'piloger_9', 'wiloger', 'viloger_10']), 5,
        'Победи 5 дикарей', 'Defeat 5 tribesmen', 'primitive_creatures:iloger_10_spawn_egg')],
      ...COMMON,
    }),

    quest('damage_types', {
      title: { ru: 'Три вида урона', en: 'Three Kinds of Damage' },
      subtitle: { ru: 'Не всякий меч одинаково полезен', en: 'Not every blade is equally useful' },
      desc: {
        ru: [
          'В TerraFirmaCraft у оружия три вида урона:',
          '- &6колющий&r: ножи, копья, стрелы;',
          '- &6рубящий&r: мечи, топоры, косы;',
          '- &6дробящий&r: молоты и булавы.',
          '',
          'У существ свои сильные и слабые стороны: одни почти не чувствуют колющих ударов, другие рассыпаются от дробящих. Сопротивления брони видны в её описании. Подбирай оружие под противника — советы есть в квестах этой главы.',
        ],
        en: [
          'In TerraFirmaCraft weapons deal three kinds of damage:',
          '- &6piercing&r: knives, javelins, arrows;',
          '- &6slashing&r: swords, axes, scythes;',
          '- &6crushing&r: hammers and maces.',
          '',
          'Creatures have their strengths and weaknesses: some barely feel piercing blows, others crumble under crushing ones. Armor resistances are shown in its tooltip. Pick the weapon for the enemy: tips are in the quests of this chapter.',
        ],
      },
      icon: 'tfc:metal/mace/bronze',
      deps: ['wild_tribes'],
      tasks: [
        item('#tfc:deals_piercing_damage', 1, { icon: 'tfc:metal/javelin/bronze', title: { ru: 'Колющее оружие', en: 'A piercing weapon' } }),
        item('#tfc:deals_slashing_damage', 1, { icon: 'tfc:metal/sword/bronze', title: { ru: 'Рубящее оружие', en: 'A slashing weapon' } }),
        item('#tfc:deals_crushing_damage', 1, { icon: 'tfc:metal/mace/bronze', title: { ru: 'Дробящее оружие', en: 'A crushing weapon' } }),
      ],
      rewards: [reward('tfc:metal/ingot/bronze')],
      budget: 6500,
    }),

    // ---------------- predators ----------------
    quest('wargs', {
      title: { ru: 'Варги', en: 'Wargs' },
      subtitle: { ru: 'Вой в ночи', en: 'Howling in the night' },
      desc: {
        ru: ['Хищники встречаются реже дикарей, но опаснее. Лютоволки охотятся стаями: услышав вой, держи оружие под рукой. Волки и лютоволки засчитываются одинаково.', '', '&6Совет:&r шкура волков хорошо держит дробящие удары. Бей их копьём, ножом или топором.'],
        en: ['Predators are rarer than tribesmen but more dangerous. Direwolves hunt in packs: if you hear howling, keep your weapon close. Wolves and direwolves count the same.', '', '&6Tip:&r wolf hide resists crushing blows well. Strike them with a javelin, a knife or an axe.'],
      },
      icon: 'tfc:spawn_egg/direwolf',
      deps: ['wild_tribes'],
      tasks: [hunt(['tfc:direwolf', 'tfc:wolf'], 3, 'Убей 3 волков', 'Kill 3 wolves', 'tfc:spawn_egg/direwolf')],
      ...COMMON,
    }),

    quest('bears', {
      title: { ru: 'Медведи', en: 'Bears' },
      subtitle: { ru: 'Надеюсь, это не Беорн', en: 'Hopefully it\'s not Beorn' },
      desc: {
        ru: ['Чёрные, бурые и белые медведи — самые сильные звери северных лесов и льдов. Не подходи к медведице с медвежатами.', '', '&6Совет:&r медвежий мех смягчает удары молота, но рубящее оружие — топор или меч — проходит лучше.'],
        en: ['Black, grizzly and polar bears are the strongest beasts of the northern forests and ice. Stay away from a mother with cubs.', '', '&6Tip:&r bear fur softens hammer blows, but slashing weapons, an axe or a sword, cut through better.'],
      },
      icon: 'tfc:spawn_egg/grizzly_bear',
      deps: ['wild_tribes'],
      tasks: [hunt(['tfc:black_bear', 'tfc:grizzly_bear', 'tfc:polar_bear'], 2, 'Убей 2 медведей', 'Kill 2 bears', 'tfc:spawn_egg/grizzly_bear')],
      ...RARE,
    }),

    quest('big_cats', {
      title: { ru: 'Большие кошки', en: 'Big Cats' },
      subtitle: { ru: 'Охотник становится добычей', en: 'The hunter becomes the hunted' },
      desc: {
        ru: ['Пумы, пантеры, львы, тигры и даже саблезубые кошки подкрадываются бесшумно. В тёплых краях оглядывайся почаще.', '', '&6Совет:&r кошки уязвимы к колющему оружию — копьё лучший выбор. Дробящие удары они держат хорошо.'],
        en: ['Cougars, panthers, lions, tigers and even sabertooths sneak up silently. Look over your shoulder often in warm lands.', '', '&6Tip:&r big cats are weak to piercing weapons, so a javelin is the best choice. They resist crushing blows well.'],
      },
      icon: 'tfc:spawn_egg/sabertooth',
      deps: ['wild_tribes'],
      tasks: [hunt(['tfc:cougar', 'tfc:panther', 'tfc:lion', 'tfc:tiger', 'tfc:sabertooth'], 3, 'Убей 3 больших кошек', 'Kill 3 big cats', 'tfc:spawn_egg/sabertooth')],
      ...RARE,
    }),

    quest('crocodile', {
      title: { ru: 'Крокодил', en: 'Crocodile' },
      subtitle: { ru: 'Не пытайся его приручить', en: 'Don\'t try to tame it' },
      desc: {
        ru: ['Крокодилы поджидают у берегов тёплых рек и болот. Говорят, кто-то пытался с ним подружиться. Не повторяй.', '', '&6Совет:&r чешуя крокодила держит колющие удары. Руби его или бей молотом.'],
        en: ['Crocodiles lurk by the banks of warm rivers and swamps. They say someone tried to befriend one. Don\'t.', '', '&6Tip:&r crocodile scales resist piercing. Chop it or hit it with a hammer.'],
      },
      icon: 'tfc:spawn_egg/crocodile',
      deps: ['wild_tribes'],
      tasks: [kill('tfc:crocodile', 1, { icon: 'tfc:spawn_egg/crocodile' })],
      ...RARE,
    }),

    quest('scavengers', {
      title: { ru: 'Падальщики', en: 'Scavengers' },
      subtitle: { ru: 'Смех в степи', en: 'Laughter on the steppe' },
      desc: {
        ru: ['Гиены и кабаны нападают, если подойти слишком близко. Кабанье мясо, кстати, очень сытное.', '', '&6Совет:&r гиен бери копьём, а кабана — топором или молотом: его щетину копьё почти не пробивает.'],
        en: ['Hyenas and boars attack if you get too close. Boar meat, by the way, is very filling.', '', '&6Tip:&r take hyenas with a javelin, and boars with an axe or a hammer: a javelin barely pierces a boar\'s bristles.'],
      },
      icon: 'tfc:spawn_egg/hyena',
      deps: ['wild_tribes'],
      tasks: [hunt(['tfc:hyena', 'tfc:boar'], 3, 'Убей 3 гиен или кабанов', 'Kill 3 hyenas or boars', 'tfc:spawn_egg/hyena')],
      ...COMMON,
    }),

    // ---------------- spirits ----------------
    quest('shades', {
      title: { ru: 'Тени', en: 'Shades' },
      subtitle: { ru: 'Когда заходит солнце', en: 'When the sun goes down' },
      desc: {
        ru: [
          'Тени — низшие духи, слепленные из сажи, гнили и мёртвой материи. Их царство — ночная тьма: после заката они выходят на поверхность и ищут живых.',
          '- &6высокая тень&r стремительно бросается и рвёт когтями;',
          '- &6голодная тень&r плюётся и крадёт сытость;',
          '- &6ползучая тень&r подбирается и взрывается дурманящим облаком;',
          '- &6низкие тени&r — пещерные пираньи: слабы и боятся света, но нападают стаями и гасят его;',
          '- &6чумная тень&r медленно идёт вперёд в облаке иссушающего яда.',
          '',
          'Феи и дриады нападают на теней при первой встрече, а в полнолуние поверхность принадлежит духам света, и новые тени не появляются. Зато в октябре тени становятся сильнее и пробираются даже в земли фей.',
        ],
        en: [
          'Shades are lesser spirits made of soot, rot and dead matter. Their domain is the dark of the night: after sunset they come out on the surface looking for the living.',
          '- the &6tall shade&r dashes in and claws;',
          '- the &6hungry shade&r spits and steals your hunger;',
          '- the &6creeping shade&r sneaks up and bursts into an intoxicating cloud;',
          '- &6short shades&r are cave piranhas: frail and hurt by light, but they swarm and put it out;',
          '- the &6plague shade&r lumbers on in a cloud of withering poison.',
          '',
          'Fairies and dryads attack shades on sight, and on the night of a full moon the surface belongs to the light spirits and no new shades appear. But in October shades grow stronger and slip even into fey lands.',
        ],
      },
      icon: 'tfc_spirits:tall_shade_spawn_egg',
      deps: ['wild_tribes'],
      tasks: [hunt(ns('tfc_spirits', ['tall_shade', 'short_shade', 'creeping_shade', 'plague_shade', 'hungry_shade']), 5,
        'Изгони 5 теней', 'Banish 5 shades', 'tfc_spirits:tall_shade_spawn_egg')],
      ...COMMON,
    }),

    quest('shade_ward', {
      title: { ru: 'Защита от теней', en: 'Warding Off Shades' },
      subtitle: { ru: 'Старейший оберег', en: 'The oldest ward there is' },
      desc: {
        ru: [
          'Тени — самые бесплотные из духов, и прогнать их проще всего. Их отпугивают соль, светильник из тыквы и маленький череп, вырезанный из кости. Ещё проще — стены и закрытая дверь.',
          '',
          'Но лучше всего — &6золотое распятие&r на стене: в 24 блоках вокруг него тени не появляются, а подошедших ближе 8 блоков отбрасывает. Его куют из двойного слитка золота. Если наполнить распятие светом посохом или печатью с духом света, оно само будет жечь теней в 16 блоках.',
        ],
        en: [
          'Shades are the least solid of spirits and the easiest to turn away. Salt, a jack-o\'-lantern and a tiny skull carved from bone keep them at a distance. Walls and a shut door do it with less effort.',
          '',
          'Best of all is a golden &6crucifix&r on the wall: no shade rises within 24 blocks of it, and those that come within 8 are shoved away. It\'s forged from a gold double ingot. Infuse it with light using a holy staff or a seal holding a light spirit, and it will burn shades within 16 blocks on its own.',
        ],
      },
      icon: 'tfc_spirits:crucifix',
      deps: ['shades', 'tfc/metal_anvil'],
      tasks: [item('tfc_spirits:crucifix')],
      rewards: [reward('tfc:powder/salt', 16)],
      budget: 2400,
    }),

    quest('spirit_seal', {
      title: { ru: 'Печать духов', en: 'Spirit Seal' },
      subtitle: { ru: 'Поймай то, что осталось', en: 'Catch what\'s left behind' },
      desc: {
        ru: [
          'Убитый дух оставляет эссенцию, и она исчезнет, если её не поймать. &6Печать духов&r из обожжённой глины держит в себе одного духа: возьми пустую печать во вторую руку и нанеси последний удар сам.',
          '',
          'Тёмная эссенция теней собирается легче всего. Из неё на алтаре духов творят обряды, а печать с духом света наполняет распятие.',
        ],
        en: [
          'A killed spirit leaves essence behind, and it\'s lost unless something catches it. A &6spirit seal&r of fired clay holds one spirit: keep an empty seal in your offhand and land the killing blow yourself.',
          '',
          'The dark essence of shades is the easiest to gather. At a spirit altar it becomes rituals, and a seal holding a light spirit infuses a crucifix.',
        ],
      },
      icon: 'tfc_spirits:spirit_seal',
      deps: ['shades'],
      tasks: [item('tfc_spirits:spirit_seal')],
      rewards: [reward('minecraft:clay_ball', 16)],
      budget: 800,
    }),

    quest('trolls', {
      title: { ru: 'Тролли', en: 'Trolls' },
      subtitle: { ru: 'Берт, Том и Билл', en: 'Bert, Tom and Bill' },
      desc: {
        ru: [
          'Тролли — духи, вселившиеся в голый камень. Они живут &eглубоко под землёй&r, куда никогда не проникал дневной свет. Горбатые тролли вырывают из земли валуны и швыряют их, а тролли-маги колдуют и исчезают от удара.',
          '',
          'Солнечный свет обращает тролля в камень на месте. Можно выманить его на поверхность — но тогда пропадёт и всё, что он нёс. Убитый под землёй, тролль часто оставляет хорошие минералы.',
          '',
          '&6Совет:&r тролли почти не замечают рубящих ударов, а молот или булава бьют их в полную силу.',
        ],
        en: [
          'Trolls are spirits that have taken bare stone for a body. They live &edeep underground&r, where daylight has never reached. Hunchback trolls tear boulders from the ground and hurl them, and mage trolls cast spells and blink away when struck.',
          '',
          'Sunlight turns a troll to stone on the spot. You could lure one to the surface, but everything it carried would be lost too. Killed underground, a troll often leaves good minerals.',
          '',
          '&6Tip:&r trolls barely notice slashing blows, while a hammer or a mace hits them with full force.',
        ],
      },
      icon: 'tfc_spirits:hunchback_troll_spawn_egg',
      deps: ['shades', 'travel/deep_delve'],
      tasks: [hunt(['tfc_spirits:hunchback_troll', 'tfc_spirits:mage_troll'], 2, 'Убей 2 троллей', 'Kill 2 trolls', 'tfc_spirits:hunchback_troll_spawn_egg')],
      ...EPIC,
    }),

    quest('dullahan', {
      title: { ru: 'Всадник без головы', en: 'The Headless Rider' },
      subtitle: { ru: 'Страж тыквенных ночей', en: 'Guardian of pumpkin nights' },
      desc: {
        ru: [
          'В октябре феи прячутся по ночам, а их земли стерегут &6дуллаханы&r — дриады, переделанные для охоты на теней. Они патрулируют земли фей до рассвета.',
          '',
          'Дуллахан — тоже создание фей, и нападать на него не стоит. Лучше подружись: только в октябре феи обменивают &6тыквенный договор&r на тыкву, оставленную в их кольце. С ним дуллахана можно приручить.',
        ],
        en: [
          'In October the fey hide at night, and their lands are guarded by &6dullahans&r: dryads remade to hunt shades. They patrol the fey ground until dawn.',
          '',
          'A dullahan is a fey creature too, so don\'t attack it. Befriend it instead: only in October the fey trade a &6Pumpkin Pact&r for a pumpkin laid in their ring. With it, a dullahan can be befriended.',
        ],
      },
      icon: 'tfc_spirits:pumpkin_pact',
      deps: ['shades', 'exploration/fairy_ring'],
      optional: true,
      tasks: [
        observe.entity('tfc_spirits:dullahan', { title: { ru: 'Встреть дуллахана', en: 'Meet a dullahan' }, icon: 'tfc_spirits:dullahan_spawn_egg' }),
        item('tfc_spirits:pumpkin_pact'),
      ],
      rewards: [lootCrate('explore_rare')],
      budget: 4500,
    }),

    quest('revenant', {
      title: { ru: 'Умертвия', en: 'Barrow-wights' },
      subtitle: { ru: 'Не всем мёртвым спится', en: 'Not all the dead rest easy' },
      desc: {
        ru: [
          'Ревенант — тело давно забытого человека, поднятое тенью. Он помнит своё оружие: носит клинок и щит и умеет их держать. Бродят ревенанты только &eв пещерах и только в октябре&r.',
          '',
          'Сражённый, он рассыпается в груду костей и через пять секунд поднимается снова, каждый раз слабее. Разбей груду — и он упокоится, отдав снаряжение и череп.',
          '',
          '&6Совет:&r ревенанты — те же скелеты: стрелы и колющее оружие их не берут, нужен молот или булава.',
        ],
        en: [
          'A revenant is the body of a long-forgotten man raised by a shade. It remembers its arms: it carries a blade and a shield and knows how to use them. Revenants roam only &ein caves, and only in October&r.',
          '',
          'Struck down, it falls into a heap of bones and rises again after five seconds, weaker each time. Break the heap and it rests at last, dropping its gear and a skull.',
          '',
          '&6Tip:&r revenants are skeletons too: arrows and piercing weapons don\'t hurt them, bring a hammer or a mace.',
        ],
      },
      icon: 'tfc_spirits:revenant_spawn_egg',
      deps: ['shades'],
      optional: true,
      tasks: [kill('tfc_spirits:revenant', 1, { icon: 'tfc_spirits:revenant_spawn_egg' })],
      ...RARE,
    }),

    quest('light_spirits', {
      title: { ru: 'Духи света', en: 'Light Spirits' },
      subtitle: { ru: 'Огоньки полной луны', en: 'Lights of the full moon' },
      desc: {
        ru: [
          'Духи света приходят только &eв ночь полнолуния, раз в восемь ночей, под открытым небом&r: у стоячей воды в низинах или на вершинах высочайших гор. В октябре они являются каждую ночь.',
          '',
          '&6Огонёк&r никого не трогает первым, но, если ударить, отвечает слабостью и тошнотой и исчезает быстрее, чем догонишь. Поймай его эссенцию &6печатью духов&r — только она пробуждает алтарь духов.',
        ],
        en: [
          'Light spirits come only &eon the night of a full moon, one night in eight, under open sky&r: near standing water in the lowlands, or on the tops of the highest peaks. In October they come every night.',
          '',
          'A &6wisp&r never strikes first, but hit it and it answers with slowness and nausea and is gone faster than you can follow. Catch its essence with a &6spirit seal&r: it\'s the only thing that wakes a spirit altar.',
        ],
      },
      icon: 'tfc_spirits:wisp_spawn_egg',
      deps: ['spirit_seal'],
      tasks: [kill('tfc_spirits:wisp', 1, { title: { ru: 'Поймай огонёк', en: 'Catch a wisp' }, icon: 'tfc_spirits:wisp_spawn_egg' })],
      ...RARE,
    }),

    // ---------------- peoples ----------------
    quest('dungeon_dwellers', {
      title: { ru: 'Обитатели подземелий', en: 'Dungeon Dwellers' },
      subtitle: { ru: 'Тьма под землёй', en: 'Darkness below' },
      desc: {
        ru: [
          'Зомби, скелеты, пауки и криперы не бродят по поверхности: они прячутся в &eсклепах, подземельях, шахтах и заброшенных постройках&r. Идёшь туда — бери факелы и оружие.',
          '',
          '&6Совет:&r скелетов бессмысленно обстреливать — стрелы и колющее оружие их не берут, нужен молот или булава. Зомби, наоборот, уязвимы к колющему. А крипер по сути растение: его лучше рубить мечом или топором.',
        ],
        en: [
          'Zombies, skeletons, spiders and creepers don\'t roam the surface: they hide in &ecrypts, dungeons, mines and abandoned buildings&r. Going there? Bring torches and a weapon.',
          '',
          '&6Tip:&r shooting skeletons is pointless: arrows and piercing weapons don\'t hurt them, bring a hammer or a mace. Zombies, on the contrary, are weak to piercing. And a creeper is basically a plant: chop it with a sword or an axe.',
        ],
      },
      icon: 'minecraft:zombie_spawn_egg',
      deps: ['wild_tribes'],
      tasks: [hunt(ns('minecraft', ['zombie', 'husk', 'drowned', 'skeleton', 'stray', 'spider', 'cave_spider', 'creeper']), 5,
        'Убей 5 обитателей подземелий', 'Kill 5 dungeon dwellers', 'minecraft:zombie_spawn_egg')],
      ...RARE,
    }),

    quest('clay_golems', {
      title: { ru: 'Глиняные големы', en: 'Clay Golems' },
      subtitle: { ru: 'Ожившая земля', en: 'The living earth' },
      desc: {
        ru: ['Каолиновые и графитовые големы бродят там, где земля богата этими минералами. Разбей парочку — может, из них что-нибудь выпадет.', '', '&6Совет:&r графитовый голем рассыпается от дробящих ударов, а каолиновый лучше колоть: молот его почти не берёт.'],
        en: ['Kaolin and graphite golems roam where the ground is rich in these minerals. Smash a couple: something useful might fall out.', '', '&6Tip:&r a graphite golem crumbles under crushing blows, while a kaolin one is better pierced: a hammer barely hurts it.'],
      },
      icon: 'primitive_creatures:tfc_spawn_egg',
      deps: ['wild_tribes'],
      tasks: [hunt(['primitive_creatures:tfc', 'primitive_creatures:golem_2'], 2, 'Разбей 2 големов', 'Smash 2 golems', 'primitive_creatures:tfc_spawn_egg')],
      ...RARE,
    }),

    quest('bandits', {
      title: { ru: 'Разбойники с большой дороги', en: 'Highwaymen' },
      subtitle: { ru: 'Кошелёк или жизнь', en: 'Your money or your life' },
      desc: {
        ru: ['Бандиты редко попадаются в дороге, зато целыми шайками живут в лагерях в холмах. Королевства будут тебе благодарны.'],
        en: ['Bandits are rarely met on the road, but whole gangs live in camps in the hills. The kingdoms will be grateful.'],
      },
      icon: 'valarian_conquest:bandit_1_spawn_egg',
      deps: ['wild_tribes'],
      tasks: [hunt(ns('valarian_conquest', ['bandit_1', 'bandit_2', 'bandit_3']), 5, 'Победи 5 бандитов', 'Defeat 5 bandits', 'valarian_conquest:bandit_1_spawn_egg')],
      ...RARE,
    }),

    quest('orcs', {
      title: { ru: 'Орки', en: 'Orcs' },
      subtitle: { ru: 'Мясо снова в меню', en: 'Meat\'s back on the menu' },
      desc: {
        ru: ['Орки — воины, налётчики, берсерки, лучники и шаманы — выходят из бесплодных земель грабить и жечь. Встречай их сталью.'],
        en: ['Orcs (warriors, raiders, berserkers, archers and shamans) come out of the badlands to plunder and burn. Meet them with steel.'],
      },
      icon: 'valarian_conquest:orc_warrior_spawn_egg',
      deps: ['wild_tribes'],
      tasks: [hunt(ns('valarian_conquest', ['orc_warrior', 'orc_raider', 'orc_berserker', 'orc_archer', 'orc_shaman']), 10,
        'Победи 10 орков', 'Defeat 10 orcs', 'valarian_conquest:orc_warrior_spawn_egg')],
      ...EPIC,
    }),

    quest('draugr', {
      title: { ru: 'Драугры', en: 'Draugr' },
      subtitle: { ru: 'Павшие воины не знают покоя', en: 'Fallen warriors know no rest' },
      desc: {
        ru: ['Драугры — мёртвые воины древних королевств: копейщики, лучники, стражи и рыцари. Их ведёт повелитель драугров. Упокой его — и армия рассыплется.'],
        en: ['Draugr are the dead warriors of ancient kingdoms: spearmen, archers, guards and knights. They follow a draugr lord. Lay him to rest and the army crumbles.'],
      },
      icon: 'valarian_conquest:draugr_knight_spawn_egg',
      deps: ['wild_tribes'],
      tasks: [
        hunt(ns('valarian_conquest', ['draugr_spearman', 'draugr_archer', 'draugr_guard', 'draugr_knight']), 5, 'Упокой 5 драугров', 'Lay 5 draugr to rest', 'valarian_conquest:draugr_knight_spawn_egg'),
        kill('valarian_conquest:draugr_lord', 1, { icon: 'valarian_conquest:draugr_lord_spawn_egg' }),
      ],
      ...EPIC,
    }),

    quest('foliaath', {
      title: { ru: 'Хищные растения', en: 'Carnivorous Plants' },
      subtitle: { ru: 'Не наступай на цветочки', en: 'Don\'t step on the flowers' },
      desc: {
        ru: ['В джунглях растут фолиафы — хищные растения, которые прикидываются кустами и хватают проходящих мимо. Подбирайся сбоку.', '', '&6Совет:&r листья фолиафа смягчают рубящие удары — бей его молотом или булавой.'],
        en: ['Foliaaths grow in jungles: carnivorous plants that pretend to be bushes and snap at passers-by. Approach from the side.', '', '&6Tip:&r foliaath leaves soften slashing blows, so hit it with a hammer or a mace.'],
      },
      icon: 'mowziesmobs:foliaath_spawn_egg',
      deps: ['wild_tribes'],
      optional: true,
      tasks: [kill('mowziesmobs:foliaath', 2, { icon: 'mowziesmobs:foliaath_spawn_egg' })],
      ...RARE,
    }),

    // secret: invisible until done, no deps so it can count at any time
    quest('not_again', {
      title: { ru: 'Только не снова!', en: 'Not Again!' },
      subtitle: { ru: 'Тсссссс… БУМ', en: 'Ssssss… BOOM' },
      desc: {
        ru: [
          'Ты услышал тихое шипение за спиной. Обернулся. Было поздно.',
          '',
          'Крипер — самый старый трюк этого мира, и всё равно каждый раз срабатывает. Держи сувенир на память.',
        ],
        en: [
          'You heard a quiet hiss behind you. You turned around. It was too late.',
          '',
          'The creeper is the oldest trick in this world, and it still works every single time. Here\'s a souvenir.',
        ],
      },
      icon: 'minecraft:creeper_spawn_egg',
      hidden: 'invisible',
      optional: true,
      tasks: [diedTo(['minecraft:creeper'], { title: { ru: 'Погибни от крипера', en: 'Get blown up by a creeper' }, icon: 'minecraft:creeper_spawn_egg' })],
      rewards: [reward('minecraft:gunpowder', 1, { title: { ru: 'Сувенир', en: 'A souvenir' } })],
    }),

    quest('great_hunter', {
      title: { ru: 'Великий охотник', en: 'Great Hunter' },
      subtitle: { ru: 'Слава о тебе бежит впереди', en: 'Your fame runs ahead of you' },
      desc: {
        ru: ['Одолей 250 существ: зверей, чудовищ, разбойников — считаются все. О тебе уже рассказывают у костров в тавернах.'],
        en: ['Defeat 250 creatures: beasts, monsters, outlaws, they all count. They already tell tales of you by tavern fires.'],
      },
      icon: 'tfc:metal/sword/steel',
      deps: ['bears', 'big_cats', 'trolls', 'orcs'],
      tasks: [stat('minecraft:mob_kills', 250, { title: { ru: 'Убей 250 существ', en: 'Kill 250 creatures' }, icon: 'tfc:metal/sword/steel' })],
      ...EPIC,
    }),

    quest('troll_dinner', {
      title: { ru: 'Обед подан', en: 'Dinner Is Served' },
      subtitle: { ru: 'Баранина вчера, баранина сегодня…', en: 'Mutton yesterday, mutton today…' },
      desc: {
        ru: [
          'Тролли долго спорили, как тебя приготовить: зажарить, сварить или просто сесть сверху и раздавить. Договорились быстрее, чем хотелось бы.',
          '',
          'В следующий раз тяни время до рассвета.',
        ],
        en: [
          'The trolls argued for a long time over how to cook you: roast you, boil you or just sit on you and squash you. They agreed sooner than you\'d have liked.',
          '',
          'Next time, keep them talking until dawn.',
        ],
      },
      icon: 'minecraft:bone',
      optional: true,
      hidden: 'invisible',
      tasks: [diedTo(['tfc_spirits:hunchback_troll', 'tfc_spirits:mage_troll'], { title: { ru: 'Погибни от тролля', en: 'Get killed by a troll' }, icon: 'minecraft:bone' })],
      rewards: [reward('minecraft:bone', 1, { title: { ru: 'Всё, что осталось', en: 'All that was left' } })],
    }),
  ],
});
