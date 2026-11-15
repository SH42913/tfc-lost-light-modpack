// Chapter "armory": weapons and armor beyond the basic TFC set - Epic Knights through Knights of TerraFirma (blades and
// armor parts forged on the anvil, then welded or crafted), Antique Legacy helmets, TFC Archery bows, arrows and
// crossbows, armor trims (tfc_trim + functionalarmortrim bonuses), armor stands.
// Recipes checked in the knightsofterrafirma, epic-knights and tfc_arch jars. Metal variants: copper/bronze/wrought iron/
// steel items keep magistuarmory IDs (iron = wrought iron), bismuth bronze, black bronze and black/blue/red steel ones are
// knightsofterrafirma:*. Trim bonuses: config/functionalarmortrim.json.
// Text formatting: &6 - names, &e - where to look, &r - reset.
const { chapter, quest, item, anyOf, link, lootCrate } = require('../lib');

const COMMON = { rewards: [lootCrate('explore_common')], budget: 1500 };
const RARE = { rewards: [lootCrate('explore_rare')], budget: 4500 };
const EPIC = { rewards: [lootCrate('explore_epic')], budget: 15000 };

const MA_METALS = ['copper', 'bronze', 'iron', 'steel'];
const KOTFC_METALS = ['bismuth_bronze', 'black_bronze', 'black_steel', 'blue_steel', 'red_steel'];
const byMetal = (ma, kotfc) => [...MA_METALS.map((m) => `magistuarmory:${m}_${ma}`), ...KOTFC_METALS.map((m) => `knightsofterrafirma:${m}_${kotfc}`)];
const ARCH_METALS = ['copper', 'bronze', 'bismuth_bronze', 'black_bronze', 'wrought_iron', 'steel', 'black_steel', 'blue_steel', 'red_steel'];
const GEMS = ['amethyst', 'diamond', 'emerald', 'opal', 'pyrite', 'ruby', 'sapphire', 'topaz'];
const TRIMS = ['coast', 'dune', 'eye', 'host', 'raiser', 'rib', 'sentry', 'shaper', 'silence', 'snout', 'spire', 'tide', 'vex',
  'ward', 'wayfinder', 'wild'].map((t) => `minecraft:${t}_armor_trim_smithing_template`);
const ANTIQUE_HELMETS = [
  ...['bronze_apulo_corinthian_helmet', 'attic_helmet', 'beotian_helmet', 'celtic_montefortino_helmet', 'chalcidian_helmet',
    'bronze_coolus', 'corinthian_helmet', 'illirian_helmet', 'kuban_helmet', 'bronze_montefortino_helmet', 'bronze_niederbieber_helmet',
    'open_attic_helmet', 'bronze_phrygian_helmet', 'bronze_ridge_helmet', 'roman_parade_helmet', 'scythian_attic_helmet',
    'thracian_helmet', 'waterloo_helmet'].map((id) => `antiquelegacy:${id}`),
  'knightsofterrafirma:bismuth_bronze_corinthian_helmet', 'knightsofterrafirma:black_bronze_corinthian_helmet',
];
const CEREMONIAL_ARMETS = [
  'magistuarmory:ceremonialarmet',
  ...['brass', 'rose_gold', 'silver', 'sterling_silver'].map((g) => `knightsofterrafirma:${g}_steel_ceremonialarmet`),
  ...['brass', 'gold', 'rose_gold', 'silver', 'sterling_silver'].flatMap((g) => ['black_steel', 'blue_steel', 'red_steel']
    .map((s) => `knightsofterrafirma:${g}_${s}_armet`)),
];

module.exports = chapter('armory', {
  order: 22,
  group: 'combat',
  title: { ru: 'Оружейник', en: 'Armory' },
  subtitle: { ru: 'Клинки, латы и луки', en: 'Blades, plate and bows' },
  icon: 'magistuarmory:armet',
  links: [link('bestiary/damage_types'), link('tfc/metal_anvil'), link('tfc/steel')],
  quests: [
    // ---------------- blades and polearms ----------------
    quest('hilt', {
      title: { ru: 'Рукоять', en: 'The Hilt' },
      subtitle: { ru: 'Меч начинается с рукояти', en: 'A sword begins with its grip' },
      desc: {
        ru: [
          'Рыцарское оружие собирают по частям: клинок или наконечник куют на наковальне, а потом приделывают к &6рукояти&r или &6древку&r.',
          '',
          'Рукоять — это палка, обмотанная &6кожаными ремешками&r. Ремешки вырезают из кожи, как при выделке кожаных вещей. Две рукояти складываются в древко для копий и алебард.',
        ],
        en: [
          'Knightly weapons are put together from parts: the blade or head is forged on the anvil, then fitted to a &6hilt&r or a &6pole&r.',
          '',
          'A hilt is a stick wrapped in &6leather strips&r. The strips are cut from leather, like any leatherwork. Two hilts make a pole for lances and halberds.',
        ],
      },
      icon: 'magistuarmory:hilt',
      deps: ['bestiary/damage_types', 'tfc/leather'],
      tasks: [item('magistuarmory:hilt')],
      ...COMMON,
    }),

    quest('bastard_sword', {
      title: { ru: 'Полуторный меч', en: 'Bastard Sword' },
      subtitle: { ru: 'Под одну руку и под две', en: 'For one hand or two' },
      desc: {
        ru: [
          'Клинок полуторного меча сваривают из обычного клинка меча TFC и слитка того же металла, а потом насаживают на рукоять. Бонус ковки при этом сохраняется.',
          '',
          'Из того же металла и по тому же принципу делают и другие клинки Epic Knights: клеймор, цвайхендер, эсток, катцбальгер. Медь, бронзу, кованое железо и сталь мод знает сам, а для висмутовой и чёрной бронзы и цветных сталей есть свои версии.',
        ],
        en: [
          'A bastard sword blade is welded from a regular TFC sword blade and an ingot of the same metal, then fitted to a hilt. The forging bonus carries over.',
          '',
          'Other Epic Knights blades are made the same way: claymore, zweihander, estoc, katzbalger. Copper, bronze, wrought iron and steel are the mod\'s own, and bismuth bronze, black bronze and the colored steels have their own versions.',
        ],
      },
      icon: 'magistuarmory:steel_bastardsword',
      deps: ['hilt', 'tfc/metal_anvil'],
      tasks: [item(anyOf(byMetal('bastardsword', 'bastard_sword')), 1, { title: { ru: 'Любой полуторный меч', en: 'Any bastard sword' }, icon: 'magistuarmory:steel_bastardsword' })],
      ...RARE,
    }),

    quest('lance', {
      title: { ru: 'Рыцарское копьё', en: 'Knightly Lance' },
      subtitle: { ru: 'Турнир начинается', en: 'Let the tourney begin' },
      desc: {
        ru: [
          'Копьё собирают из древка, &6фурмы&r и слитка металла — фурма служит втулкой наконечника. Длинное и тяжёлое, оно лучше всего бьёт с седла, на полном скаку.',
        ],
        en: [
          'A lance is made from a pole, a &6tuyere&r and a metal ingot: the tuyere serves as the socket for the point. Long and heavy, it strikes best from the saddle at full gallop.',
        ],
      },
      icon: 'magistuarmory:steel_chivalrylance',
      deps: ['hilt', 'tfc/metal_anvil'],
      tasks: [
        item('magistuarmory:pole'),
        item(anyOf(byMetal('chivalrylance', 'giant_lance')), 1, { title: { ru: 'Любое рыцарское копьё', en: 'Any knightly lance' }, icon: 'magistuarmory:steel_chivalrylance' }),
      ],
      ...RARE,
    }),

    quest('buckler', {
      title: { ru: 'Баклер', en: 'Buckler' },
      subtitle: { ru: 'Маленький, да удаленький', en: 'Small but mighty' },
      desc: {
        ru: [
          'Баклер — маленький кулачный щит. Сначала из двойного слитка куют &6рукоять щита&r, затем сваривают её со вторым двойным слитком того же металла.',
          '',
          'Баклер легче обычного щита и хорошо подходит к полуторному мечу.',
        ],
        en: [
          'A buckler is a small fist shield. First a &6shield brace&r is forged from a double ingot, then it\'s welded to a second double ingot of the same metal.',
          '',
          'A buckler is lighter than a regular shield and pairs well with a bastard sword.',
        ],
      },
      icon: 'magistuarmory:steel_buckler',
      deps: ['tfc/metal_anvil'],
      tasks: [item(anyOf(byMetal('buckler', 'buckler')), 1, { title: { ru: 'Любой баклер', en: 'Any buckler' }, icon: 'magistuarmory:steel_buckler' })],
      ...RARE,
    }),

    // ---------------- armor ----------------
    quest('antique_helmet', {
      title: { ru: 'Шлем героя', en: 'A Hero\'s Helm' },
      subtitle: { ru: 'Медь и бронза древних', en: 'The bronze of the ancients' },
      desc: {
        ru: [
          'Задолго до латных рыцарей воины носили бронзовые шлемы: коринфские, аттические, фракийские, монтефортино и многие другие. Их куют на наковальне из &6двойного листа бронзы&r.',
          '',
          'Кроме шлемов, из бронзы и железа делают античные кирасы, поножи и щиты-гоплоны. Посмотри рецепты Antique Legacy в JEI.',
        ],
        en: [
          'Long before plate-clad knights, warriors wore bronze helmets: Corinthian, Attic, Thracian, Montefortino and many more. They\'re forged on the anvil from a &6bronze double sheet&r.',
          '',
          'Besides helmets, bronze and iron make antique cuirasses, greaves and hoplon shields. Look up Antique Legacy recipes in JEI.',
        ],
      },
      icon: 'antiquelegacy:corinthian_helmet',
      deps: ['tfc/metal_anvil'],
      tasks: [item(anyOf(ANTIQUE_HELMETS), 1, { title: { ru: 'Любой античный шлем', en: 'Any antique helmet' }, icon: 'antiquelegacy:corinthian_helmet' })],
      ...RARE,
    }),

    quest('chainmail', {
      title: { ru: 'Кольчуга', en: 'Chainmail' },
      subtitle: { ru: 'Кольцо к кольцу', en: 'Ring by ring' },
      desc: {
        ru: [
          'Девять &6стальных цепей&r TFC сплетаются в &6кольчужное полотно&r. Из полотна шьют торс и рукава, а потом сваривают их в кольчугу.',
          '',
          'Кольчуга сама по себе неплохо держит рубящие удары, а ещё служит основой для тяжёлых доспехов.',
        ],
        en: [
          'Nine TFC &6steel chains&r are woven into a &6chainmail sheet&r. The sheets make a torso and sleeves, which are then welded into a hauberk.',
          '',
          'Chainmail holds slashing blows well on its own, and it\'s also the base for heavier armor.',
        ],
      },
      icon: 'magistuarmory:chainmail_chestplate',
      deps: ['tfc/steel'],
      tasks: [
        item('magistuarmory:steel_chainmail'),
        item('magistuarmory:chainmail_chestplate'),
      ],
      ...EPIC,
    }),

    quest('armet', {
      title: { ru: 'Армет', en: 'Armet' },
      subtitle: { ru: 'Забрало опущено', en: 'Visor down' },
      desc: {
        ru: [
          'Армет — закрытый рыцарский шлем. Из стального листа куют заготовку шлема и сваривают её со вторым листом — получается &6барбют&r. Затем к барбюту приваривают выкованное &6забрало&r.',
          '',
          'Из чёрной, синей и красной стали делают свои арметы: их части куют из листов этих сталей.',
        ],
        en: [
          'The armet is a closed knight\'s helm. A helmet blank forged from a steel sheet is welded to a second sheet to make a &6barbute&r. Then a forged &6visor&r is welded onto the barbute.',
          '',
          'Black, blue and red steel have their own armets: their parts are forged from sheets of those steels.',
        ],
      },
      icon: 'magistuarmory:armet',
      deps: ['chainmail'],
      tasks: [item(anyOf(['magistuarmory:armet', 'knightsofterrafirma:black_steel_armet', 'knightsofterrafirma:blue_steel_armet', 'knightsofterrafirma:red_steel_armet']), 1,
        { title: { ru: 'Любой армет', en: 'Any armet' }, icon: 'magistuarmory:armet' })],
      ...EPIC,
    }),

    quest('plate_armor', {
      title: { ru: 'Рыцарские латы', en: 'Knight\'s Plate' },
      subtitle: { ru: 'Закован с головы до ног', en: 'Clad head to toe' },
      desc: {
        ru: [
          'Рыцарский нагрудник делают в два этапа. Сначала из двойного листа куют корпус кирасы и приваривают к нему наплечники — выходит &6полудоспех&r. Затем к нему приваривают выкованные &6латные рукава&r.',
          '',
          'Латы — лучшая защита в этом мире, но и самая тяжёлая. Есть и другие стили: готический, максимилиановский, кастенбруст, турнирный. Их части тоже куют из стали.',
        ],
        en: [
          'A knight\'s breastplate is made in two steps. First a cuirass body forged from a double sheet is welded to shoulder pads, making a &6half armor&r. Then forged &6plate arms&r are welded onto it.',
          '',
          'Plate is the best protection in this world, and the heaviest. There are other styles too: Gothic, Maximilian, Kastenbrust, jousting. Their parts are forged from steel as well.',
        ],
      },
      icon: 'magistuarmory:knight_chestplate',
      deps: ['armet'],
      tasks: [item(anyOf(['magistuarmory:knight_chestplate', 'knightsofterrafirma:black_steel_knight_chestplate',
        'knightsofterrafirma:blue_steel_knight_chestplate', 'knightsofterrafirma:red_steel_knight_chestplate']), 1,
      { title: { ru: 'Рыцарский нагрудник', en: 'A knight\'s chestplate' }, icon: 'magistuarmory:knight_chestplate' })],
      ...EPIC,
    }),

    quest('gilding', {
      title: { ru: 'Позолота', en: 'Gilding' },
      subtitle: { ru: 'Не всё то золото, что блестит', en: 'All that is gold does not glitter' },
      desc: {
        ru: [
          '&6Шаблон золочения&r делают из маленькой стальной пластины и золотого слитка. На кузнечном столе с шаблоном и слитком золота, серебра, латуни или розового золота стальной доспех становится парадным.',
          '',
          'Шаблон можно копировать: шаблон и золотой слиток дают два шаблона.',
        ],
        en: [
          'A &6Gilding Template&r is made from a small steel plate and a gold ingot. At a smithing table, with the template and an ingot of gold, silver, brass or rose gold, steel armor becomes ceremonial.',
          '',
          'The template can be copied: a template and a gold ingot make two templates.',
        ],
      },
      icon: 'magistuarmory:ceremonialarmet',
      deps: ['armet'],
      optional: true,
      tasks: [
        item('magistuarmory:gilding_template'),
        item(anyOf(CEREMONIAL_ARMETS), 1, { title: { ru: 'Позолоченный армет', en: 'A gilded armet' }, icon: 'magistuarmory:ceremonialarmet' }),
      ],
      ...RARE,
    }),

    // ---------------- archery ----------------
    quest('bows', {
      title: { ru: 'Лук', en: 'The Bow' },
      subtitle: { ru: 'Тетива поёт', en: 'The bowstring sings' },
      desc: {
        ru: [
          'Луки TFC Archery собирают из рамы и тетивы. Раму складывают из палок: у короткого лука она меньше, у длинного — больше. Для &6равнинного лука&r нужна ещё кожа.',
          '',
          'Луки различаются силой натяжения и дальностью: сравни их в описании и выбери свой.',
        ],
        en: [
          'TFC Archery bows are made from a frame and a string. The frame is put together from sticks: smaller for a shortbow, larger for a longbow. A &6plains bow&r also needs leather.',
          '',
          'Bows differ in draw strength and range: compare them in the tooltip and pick yours.',
        ],
      },
      icon: 'tfc_arch:longbow',
      deps: ['bestiary/damage_types'],
      tasks: [item(anyOf(['tfc_arch:shortbow', 'tfc_arch:longbow', 'tfc_arch:plains_bow']), 1, { title: { ru: 'Любой лук', en: 'Any bow' }, icon: 'tfc_arch:longbow' })],
      ...COMMON,
    }),

    quest('arrows', {
      title: { ru: 'Колчан стрел', en: 'A Quiver of Arrows' },
      subtitle: { ru: 'Остриё к острию', en: 'Point by point' },
      desc: {
        ru: [
          'Стрела — это наконечник, палка и оперение. Наконечники &6оббивают&r из кремня, камня и самоцветов, вырезают из кости или куют на наковальне из металлического прута.',
          '',
          'Оперение — перья или бумажное оперение (бумага и клей). Стрелы — колющий урон: против скелетов и троллей бери что-нибудь потяжелее.',
        ],
        en: [
          'An arrow is a head, a stick and fletching. Arrowheads are &6knapped&r from flint, stone and gems, carved from bone, or forged on the anvil from a metal rod.',
          '',
          'Fletching is feathers or paper fletching (paper and glue). Arrows deal piercing damage: bring something heavier against skeletons and trolls.',
        ],
      },
      icon: 'tfc_arch:flint_arrow',
      deps: ['bows'],
      tasks: [
        item(anyOf(['tfc_arch:flint_arrow', 'tfc_arch:stone_arrow', 'tfc_arch:bone_arrow', 'tfc_arch:obsidian_arrow']), 16,
          { title: { ru: '16 простых стрел', en: '16 simple arrows' }, icon: 'tfc_arch:flint_arrow' }),
        item(anyOf([...ARCH_METALS, ...GEMS].map((m) => `tfc_arch:${m}_arrow`)), 8,
          { title: { ru: '8 стрел с металлом или самоцветом', en: '8 metal or gem arrows' }, icon: 'tfc_arch:steel_arrow' }),
      ],
      ...RARE,
    }),

    quest('crossbow', {
      title: { ru: 'Арбалет', en: 'Crossbow' },
      subtitle: { ru: 'Сила в простоте', en: 'Strength in simplicity' },
      desc: {
        ru: [
          'Ложе арбалета делают из пиломатериалов, на него крепят три металлических прута, а затем натягивают тетиву. Чем крепче металл, тем лучше арбалет.',
        ],
        en: [
          'A crossbow stock is made from lumber, three metal rods are fitted to it, then it\'s strung. The stronger the metal, the better the crossbow.',
        ],
      },
      icon: 'tfc_arch:steel_crossbow',
      deps: ['arrows', 'tfc/metal_anvil'],
      tasks: [item(anyOf(ARCH_METALS.map((m) => `tfc_arch:${m}_crossbow`)), 1, { title: { ru: 'Любой арбалет', en: 'Any crossbow' }, icon: 'tfc_arch:steel_crossbow' })],
      ...RARE,
    }),

    // ---------------- finishing touches ----------------
    quest('armor_trim', {
      title: { ru: 'Отделка брони', en: 'Armor Trim' },
      subtitle: { ru: 'Красота и польза', en: 'Beauty and use' },
      desc: {
        ru: [
          '&6Кузнечные шаблоны отделки&r попадаются &eв сундуках руин и подземелий&r. На кузнечном столе шаблон, доспех и материал дают узор — и не только для красоты:',
          '- висмут: +2 к броне; алмаз: +2 к броне и +2 к прочности;',
          '- стерлинговое серебро: +2 к прочности и защита от огня; серебро: защита от урона;',
          '- рубин: скорость и высокий шаг; топаз: скорость бега; сапфир: скорость плавания;',
          '- аметист: ночное зрение; опал: скрытность; пирит: шипы;',
          '- лазурит: больше опыта; золото: удача; изумруд и розовое золото: жители любят тебя больше.',
        ],
        en: [
          '&6Armor trim smithing templates&r turn up &ein the chests of ruins and dungeons&r. At a smithing table a template, armor and a material make a pattern, and not just for looks:',
          '- bismuth: +2 armor; diamond: +2 armor and +2 toughness;',
          '- sterling silver: +2 toughness and fire protection; silver: damage resistance;',
          '- ruby: speed and step height; topaz: sprint speed; sapphire: swim speed;',
          '- amethyst: night vision; opal: stealth; pyrite: thorns;',
          '- lapis: more experience; gold: luck; emerald and rose gold: villagers like you more.',
        ],
      },
      icon: 'minecraft:wild_armor_trim_smithing_template',
      deps: ['tfc/steel_armor'],
      optional: true,
      tasks: [item(anyOf(TRIMS), 1, { title: { ru: 'Любой шаблон отделки', en: 'Any trim template' }, icon: 'minecraft:wild_armor_trim_smithing_template' })],
      ...RARE,
    }),

    quest('armor_stand', {
      title: { ru: 'Оружейная', en: 'The Armory' },
      subtitle: { ru: 'Всё на своих местах', en: 'Everything in its place' },
      desc: {
        ru: [
          'Доспехам нужна стойка. На &6стойку для брони&r можно повесить не только броню, но и кольца, амулеты и другие украшения из слотов Curios.',
          '',
          'А оружие, которое ты носишь с собой, видно на поясе и за спиной — так все сразу поймут, с кем имеют дело.',
        ],
        en: [
          'Armor needs a stand. An &6armor stand&r holds not only armor but also rings, amulets and other trinkets from Curios slots.',
          '',
          'And the weapons you carry are shown on your belt and back, so everyone can tell at once who they\'re dealing with.',
        ],
      },
      icon: 'minecraft:armor_stand',
      deps: ['chainmail'],
      optional: true,
      tasks: [item('minecraft:armor_stand')],
      ...COMMON,
    }),
  ],
});
