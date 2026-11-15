// Chapter "bosses": the great foes of Lost Light - Mowzie's Mobs bosses of the mountains and beaches, and the kings of
// the Valarian Conquest kingdoms. Data: config/mowziesmobs-common.toml (spawns, trades), loot tables and advancements in
// the mowziesmobs jar, damage resistances in lost_light_datapack/data/tfc/tfc/entity_damage_resistances/.
// Lairs (tfc_structures biomeTags): frostmaw_spawn - any mountains, umvuthana_grove - volcanic mountains,
// monastery - common mountains. The Naga has no structure: it spawns at night on beaches at Y >= 68.
// Ferrous Wroughtnaut is left out: mowziesmobs:wrought_chamber is in disabledStructures.
// Umvuthi trades the Sun's Blessing for 7 tfc:metal/block/gold (changed in the mowzie config).
// Text formatting: &6 - names, &e - where to look, &r - reset.
const { chapter, quest, item, kill, structure, advancement, checkmark, anyOf, link, lootCrate } = require('../lib');
const { killAny } = require('../custom');

const RARE = { rewards: [lootCrate('explore_rare')], budget: 4500 };
const EPIC = { rewards: [lootCrate('explore_epic')], budget: 15000 };
const TROPHY = { rewards: [lootCrate('boss_trophy')], budget: 40000 };

const KINGDOMS = [
  ['valarian', 'Валарии', 'Valaria'], ['bohemian', 'Богемии', 'Bohemia'], ['caladrian', 'Каладрии', 'Caladria'],
  ['visgothian', 'Висготии', 'Visgothia'], ['galician', 'Галиции', 'Galicia'], ['numerian', 'Нумерии', 'Numeria'],
  ['gardonian', 'Гардонии', 'Gardonia'], ['lancastian', 'Ланкастии', 'Lancastia'],
];
const KINGS = KINGDOMS.map(([k]) => `valarian_conquest:${k}_king`);
const MASKS = ['fury', 'fear', 'rage', 'bliss', 'misery', 'faith'].map((m) => `mowziesmobs:umvuthana_mask_${m}`);
const LAIRS = ['mowziesmobs:frostmaw_spawn', 'mowziesmobs:umvuthana_grove', 'mowziesmobs:monastery'];

module.exports = chapter('bosses', {
  order: 21,
  group: 'combat',
  title: { ru: 'Боссы', en: 'Bosses' },
  subtitle: { ru: 'Те, о ком слагают легенды', en: 'The stuff of legends' },
  icon: 'mowziesmobs:sol_visage',
  links: [link('bestiary/damage_types'), link('bestiary/draugr'), link('exploration/castle')],
  quests: [
    quest('mountain_lairs', {
      title: { ru: 'Логова в горах', en: 'Lairs in the Mountains' },
      subtitle: { ru: 'Там, где кончаются тропы', en: 'Where the paths run out' },
      desc: {
        ru: [
          'Горы хранят не только руду. Там живут существа, против которых обычный охотник — просто закуска:',
          '- &6Морозная пасть&r спит в ледяном логове &eв любых горах&r;',
          '- &6Умвути, Солнечная птица&r правит племенем умвутана в роще &eв вулканических горах&r;',
          '- &6Тонгби, Скульптор&r ждёт смельчаков в монастыре &eв обычных и старых горах&r.',
          '',
          'Найди хотя бы одно логово. И не спеши входить: сначала запасись едой, бинтами и хорошим оружием.',
        ],
        en: [
          'The mountains hold more than ore. Creatures live there for whom an ordinary hunter is just a snack:',
          '- the &6Frostmaw&r sleeps in an icy lair &ein any mountains&r;',
          '- &6Umvuthi, the Sunbird&r rules the Umvuthana tribe from a grove &ein volcanic mountains&r;',
          '- &6Tongbi, the Sculptor&r awaits the bold in a monastery &ein common and old mountains&r.',
          '',
          'Find at least one lair. And don\'t rush in: stock up on food, bandages and a good weapon first.',
        ],
      },
      icon: 'minecraft:skeleton_skull',
      deps: ['bestiary/damage_types'],
      tasks: [structure(LAIRS, { title: { ru: 'Найди логово босса', en: 'Find a boss lair' }, icon: 'minecraft:skeleton_skull' })],
      ...RARE,
    }),

    // ---------------- Frostmaw ----------------
    quest('frostmaw', {
      title: { ru: 'Морозная пасть', en: 'Frostmaw' },
      subtitle: { ru: 'Не буди спящего зверя', en: 'Let sleeping beasts lie' },
      desc: {
        ru: [
          'В ледяном логове &eвысоко в горах&r спит огромный белый зверь. Пока он спит, он восстанавливает силы, а проснувшись — дышит морозом и швыряет ледяные глыбы. Холод сковывает движения, поэтому не стой на месте.',
          '',
          'Из поверженной Морозной пасти выпадает &6ледяной кристалл&r: удерживай ПКМ, чтобы призвать ледяной вихрь. Кристалл заряжается сам, пока лежит в инвентаре.',
          '',
          '&6Совет:&r шкура зверя почти не пропускает колющих ударов — копья и стрелы бесполезны. Бери молот или булаву: дробящий урон проходит с лихвой.',
        ],
        en: [
          'In an icy lair &ehigh in the mountains&r sleeps a huge white beast. While asleep it regains its strength, and once awake it breathes frost and hurls blocks of ice. The cold slows you down, so keep moving.',
          '',
          'A fallen Frostmaw drops an &6Ice Crystal&r: hold right-click to channel an icy whirlwind. The crystal recharges by itself while in your inventory.',
          '',
          '&6Tip:&r its hide barely lets piercing blows through, so javelins and arrows are useless. Bring a hammer or a mace: crushing damage gets through with interest.',
        ],
      },
      icon: 'mowziesmobs:ice_crystal',
      deps: ['mountain_lairs'],
      hidden: 'deps_complete',
      tasks: [
        structure('mowziesmobs:frostmaw_spawn', { title: { ru: 'Найди логово Морозной пасти', en: 'Find the Frostmaw\'s lair' }, icon: 'minecraft:packed_ice' }),
        kill('mowziesmobs:frostmaw', 1, { icon: 'mowziesmobs:frostmaw_spawn_egg' }),
      ],
      ...EPIC,
    }),

    quest('crystal_thief', {
      title: { ru: 'Похититель кристалла', en: 'Crystal Thief' },
      subtitle: { ru: 'Вор, а не воин', en: 'A burglar, not a warrior' },
      desc: {
        ru: [
          'Говорят, ледяной кристалл можно добыть и без боя: если Морозная пасть тебя не увидит, кристалл можно унести, пока она спит.',
          '',
          'Хорошему взломщику не нужен меч — нужна удача и очень тихие шаги.',
        ],
        en: [
          'They say an ice crystal can be had without a fight: if the Frostmaw never sees you, the crystal can be carried off while it sleeps.',
          '',
          'A good burglar needs no sword, only luck and very quiet steps.',
        ],
      },
      icon: 'minecraft:potion',
      deps: ['mountain_lairs'],
      hidden: 'deps_complete',
      optional: true,
      tasks: [advancement('mowziesmobs:steal_ice_crystal', '', { title: { ru: 'Укради ледяной кристалл', en: 'Steal an ice crystal' }, icon: 'mowziesmobs:ice_crystal' })],
      ...RARE,
    }),

    // ---------------- Umvuthi ----------------
    quest('umvuthi', {
      title: { ru: 'Солнечная птица', en: 'The Sunbird' },
      subtitle: { ru: 'Восславь солнце', en: 'Praise the sun' },
      desc: {
        ru: [
          'В роще &eсреди вулканических гор&r живёт племя умвутана в масках. Их вождь Умвути, Солнечная птица, призывает солнечные удары с неба и бьёт лучом. Когда он ранен, племя присылает ему целителей: убирай их первыми.',
          '',
          'Из Умвути выпадает &6Лик Солнца&r — маска, которая никогда не ломается. Надень её и щёлкни ПКМ с маской умвутана в руке: призовёшь себе воина племени.',
          '',
          '&6Совет:&r перья держат колющие удары, а дробящий урон проходит чуть лучше.',
        ],
        en: [
          'In a grove &eamong the volcanic mountains&r lives the masked Umvuthana tribe. Their chief Umvuthi, the Sunbird, calls down sunstrikes and fires a solar beam. When he\'s hurt, the tribe sends healers: deal with them first.',
          '',
          'Umvuthi drops the &6Sol Visage&r, a mask that never breaks. Wear it and right-click holding an Umvuthana mask to summon a warrior of the tribe.',
          '',
          '&6Tip:&r feathers resist piercing blows, while crushing damage gets through a little better.',
        ],
      },
      icon: 'mowziesmobs:sol_visage',
      deps: ['mountain_lairs'],
      hidden: 'deps_complete',
      tasks: [
        structure('mowziesmobs:umvuthana_grove', { title: { ru: 'Найди рощу умвутана', en: 'Find an Umvuthana grove' }, icon: 'mowziesmobs:thatch_block' }),
        kill('mowziesmobs:umvuthi', 1, { icon: 'mowziesmobs:umvuthi_spawn_egg' }),
      ],
      ...EPIC,
    }),

    quest('suns_blessing', {
      title: { ru: 'Благословение Солнца', en: 'Sun\'s Blessing' },
      subtitle: { ru: 'Свой среди своих', en: 'One of the tribe' },
      desc: {
        ru: [
          'С Умвути можно и договориться. Маски умвутана иногда падают с воинов племени. Надень такую — и тебя примут за своего.',
          '',
          'Солнечная птица дарует &6Благословение Солнца&r в обмен на &67 блоков золота&r (блоки TFC куют из золотых листов). С ним пустой рукой можно призывать солнечный удар, солнечную вспышку и луч.',
        ],
        en: [
          'Umvuthi can also be bargained with. Umvuthana masks sometimes drop from the tribe\'s warriors. Wear one and you\'ll pass for one of them.',
          '',
          'The Sunbird grants the &6Sun\'s Blessing&r in exchange for &67 blocks of gold&r (TFC blocks are made from gold sheets). With it, an empty hand can call a sunstrike, a solar flare and a solar beam.',
        ],
      },
      icon: 'mowziesmobs:umvuthana_mask_fear',
      deps: ['mountain_lairs'],
      hidden: 'deps_complete',
      optional: true,
      tasks: [
        item(anyOf(MASKS), 1, { title: { ru: 'Маска умвутана', en: 'An Umvuthana mask' }, icon: 'mowziesmobs:umvuthana_mask_fear' }),
        advancement('mowziesmobs:suns_blessing', '', { title: { ru: 'Получи Благословение Солнца', en: 'Receive the Sun\'s Blessing' }, icon: 'mowziesmobs:grant_suns_blessing' }),
      ],
      ...EPIC,
    }),

    // ---------------- Sculptor ----------------
    quest('bluff', {
      title: { ru: 'Блеф', en: 'Called Your Bluff' },
      subtitle: { ru: 'Камни, которые кусаются', en: 'Rocks that bite' },
      desc: {
        ru: [
          'В тёмных пещерах &eгор и каньонов&r водятся блефы — каменные твари, прикидывающиеся валунами. С них падает &6жезл блефа&r.',
          '',
          'Сам по себе жезл бесполезен, но Скульптор берёт его как плату за своё испытание.',
          '',
          '&6Совет:&r каменная шкура блефа выдерживает молот, а колющее оружие бьёт сильнее.',
        ],
        en: [
          'Bluffs live in the dark caves &eof mountains and canyons&r: stony critters that pretend to be boulders. They drop a &6Bluff Rod&r.',
          '',
          'The rod is useless on its own, but the Sculptor takes it as the price of his trial.',
          '',
          '&6Tip:&r a bluff\'s stony hide shrugs off hammers, while piercing weapons hit harder.',
        ],
      },
      icon: 'mowziesmobs:bluff_rod',
      deps: ['mountain_lairs'],
      hidden: 'deps_complete',
      tasks: [
        kill('mowziesmobs:bluff', 1, { icon: 'mowziesmobs:bluff_spawn_egg' }),
        item('mowziesmobs:bluff_rod'),
      ],
      ...RARE,
    }),

    quest('sculptor_trial', {
      title: { ru: 'Испытание Скульптора', en: 'The Sculptor\'s Trial' },
      subtitle: { ru: 'Выше и выше', en: 'Higher and higher' },
      desc: {
        ru: [
          'Тонгби, Скульптор, живёт в монастыре &eв горах&r и сражаться не любит. Отдай ему &6жезл блефа&r — и он вырастит каменную башню высотой 60 блоков.',
          '',
          'Тебе нужно забраться на её вершину меньше чем за 400 секунд, пока Скульптор мешает: рушит уступы и швыряет камни. Дошёл — получишь &6Перчатку земного разлома&r: она поднимает валуны, прокладывает тоннели и выращивает каменные столбы.',
        ],
        en: [
          'Tongbi, the Sculptor, lives in a monastery &ein the mountains&r and doesn\'t care for fighting. Give him a &6Bluff Rod&r and he\'ll raise a stone tower 60 blocks tall.',
          '',
          'You must climb to its top in under 400 seconds while the Sculptor gets in the way, crumbling ledges and hurling rocks. Make it, and you get the &6Earthrend Gauntlet&r: it lifts boulders, digs tunnels and raises stone pillars.',
        ],
      },
      icon: 'mowziesmobs:earthrend_gauntlet',
      deps: ['bluff'],
      hidden: 'deps_complete',
      tasks: [
        structure('mowziesmobs:monastery', { title: { ru: 'Найди монастырь Скульптора', en: 'Find the Sculptor\'s monastery' }, icon: 'minecraft:stone_bricks' }),
        advancement('mowziesmobs:sculptor_challenge', '', { title: { ru: 'Пройди испытание', en: 'Pass the trial' }, icon: 'mowziesmobs:earthrend_gauntlet' }),
      ],
      ...EPIC,
    }),

    quest('sculptor', {
      title: { ru: 'Скульптор', en: 'The Sculptor' },
      subtitle: { ru: 'Камень против стали', en: 'Stone against steel' },
      desc: {
        ru: [
          'Тех, кто приходит с оружием, а не с жезлом, Тонгби встречает каменными шипами и валунами. Победивший его получает &6посох геоманта&r и облачение геоманта: бусы, робу, пояс и сандалии.',
          '',
          '&6Совет:&r камень плохо колется, но трескается от удара молота.',
        ],
        en: [
          'Those who come with a weapon instead of a rod are met by Tongbi with stone spikes and boulders. Whoever defeats him gets the &6Geomancer Staff&r and the geomancer\'s garb: beads, robe, belt and sandals.',
          '',
          '&6Tip:&r stone doesn\'t take piercing well, but it cracks under a hammer.',
        ],
      },
      icon: 'mowziesmobs:sculptor_staff',
      deps: ['sculptor_trial'],
      hidden: 'deps_complete',
      optional: true,
      tasks: [kill('mowziesmobs:sculptor', 1, { icon: 'mowziesmobs:sculptor_spawn_egg' })],
      ...EPIC,
    }),

    // ---------------- Naga ----------------
    quest('naga', {
      title: { ru: 'Нага', en: 'Naga' },
      subtitle: { ru: 'Тень над прибоем', en: 'A shadow over the surf' },
      desc: {
        ru: [
          'Нага — крылатый морской змей. Он прилетает &eночью на высокие морские берега&r, не ниже 68 блоков, плюётся ядом и пикирует сверху. Стой у края обрыва, и он вполне может сбросить тебя в воду.',
          '',
          'Из клыка наги и железного слитка делают &6кинжал из клыка наги&r: он отравляет и бьёт в спину сильнее.',
          '',
          '&6Совет:&r чешуя наги держит колющие удары, а дробящие бьют сильнее. Сбей его на землю и бери молотом.',
        ],
        en: [
          'The Naga is a winged sea serpent. It comes &eat night to high sea shores&r, no lower than Y 68, spits venom and dives from above. Stand near a cliff edge, and it may well knock you into the water.',
          '',
          'A naga fang and an iron ingot make a &6Naga Fang Dagger&r: it poisons and strikes harder from behind.',
          '',
          '&6Tip:&r naga scales resist piercing blows, while crushing ones hit harder. Bring it down to the ground and take it with a hammer.',
        ],
      },
      icon: 'mowziesmobs:naga_fang',
      deps: ['bestiary/damage_types'],
      tasks: [
        kill('mowziesmobs:naga', 1, { icon: 'mowziesmobs:naga_spawn_egg' }),
        item('mowziesmobs:naga_fang_dagger'),
      ],
      ...EPIC,
    }),

    // ---------------- kings ----------------
    quest('regicide', {
      title: { ru: 'Цареубийца', en: 'Kingslayer' },
      subtitle: { ru: 'Корона тяжела', en: 'Heavy is the head' },
      desc: {
        ru: [
          'Каждый король правит из своего замка, окружённый рыцарями и королевской стражей. Убийство короля — вызов всему королевству: его подданные этого не забудут.',
          '',
          'Если у тебя есть причина, или ты служишь другой короне, — бери с собой хорошую броню и не сражайся со всей стражей разом.',
        ],
        en: [
          'Each king rules from his castle, surrounded by knights and royal guards. Killing a king is a challenge to the whole kingdom: his subjects won\'t forget it.',
          '',
          'If you have a reason, or serve another crown, bring good armor and don\'t fight the whole guard at once.',
        ],
      },
      icon: 'minecraft:golden_helmet',
      deps: ['exploration/castle'],
      hidden: 'deps_complete',
      tasks: [killAny(KINGS, 1, { title: { ru: 'Победи любого короля', en: 'Defeat any king' }, icon: 'minecraft:golden_helmet' })],
      ...EPIC,
    }),

    quest('eight_crowns', {
      title: { ru: 'Восемь корон', en: 'Eight Crowns' },
      subtitle: { ru: 'Одна, чтобы править всеми', en: 'One to rule them all' },
      desc: {
        ru: [
          'Восемь королевств — восемь королей. Падут все — и некому будет оспорить твоё право на власть.',
          '',
          'Замки стоят в своих краях: Валария, Гардония и Ланкастия — &eна холмах и равнинах&r, Богемия — &eна равнинах&r, Галиция — &eна холмах&r, Каладрия — &eна побережье&r, Висготия — &eв горах и нагорьях&r, Нумерия — &eв бесплодных землях и каньонах&r.',
        ],
        en: [
          'Eight kingdoms, eight kings. Should they all fall, no one will be left to dispute your right to rule.',
          '',
          'Each castle stands in its own land: Valaria, Gardonia and Lancastia &ein hills and plains&r, Bohemia &eon plains&r, Galicia &ein hills&r, Caladria &eon the coast&r, Visgothia &ein mountains and highlands&r, Numeria &ein badlands and canyons&r.',
        ],
      },
      icon: 'minecraft:golden_helmet',
      // not behind regicide: kill tasks get no progress while the quest is locked, so the first king would not count
      deps: ['exploration/castle'],
      hidden: 'deps_complete',
      optional: true,
      tasks: KINGDOMS.map(([k, ru, en]) => kill(`valarian_conquest:${k}_king`, 1, {
        title: { ru: `Король ${ru}`, en: `The King of ${en}` }, icon: `valarian_conquest:${k}_king_spawn_egg`,
      })),
      ...TROPHY,
    }),

    // ---------------- finale ----------------
    quest('legend', {
      title: { ru: 'Живая легенда', en: 'A Living Legend' },
      subtitle: { ru: 'О тебе сложат песни', en: 'Songs will be sung of you' },
      desc: {
        ru: [
          'Морозная пасть, Солнечная птица, Скульптор, нага, король и повелитель драугров — все они пали или склонились перед тобой.',
          '',
          'Немногие в этом мире могут сказать о себе такое. Твоё имя будут помнить ещё долго после того, как ржавчина съест твой меч.',
        ],
        en: [
          'The Frostmaw, the Sunbird, the Sculptor, the naga, a king and the draugr lord have all fallen or bowed before you.',
          '',
          'Few in this world can say as much. Your name will be remembered long after rust has eaten your sword.',
        ],
      },
      icon: 'minecraft:enchanted_golden_apple',
      deps: ['frostmaw', 'umvuthi', 'sculptor_trial', 'naga', 'regicide', 'bestiary/draugr'],
      hidden: 'deps_complete',
      shape: 'gear',
      size: 1.5,
      tasks: [checkmark({ title: { ru: 'Прими славу', en: 'Accept your glory' }, icon: 'minecraft:enchanted_golden_apple' })],
      ...TROPHY,
    }),
  ],
});
