// Chapter "metallurgy": advanced metalworking on top of the TFC chapter - prospecting tools, ore washing,
// thermal minerals, big forges, blast furnace insulation, black steel and TFC Dynamite.
// Text formatting: &6 - names, &e - where to look, &d - Field Guide, &r - reset.
const { chapter, quest, item, anyOf, checkmark, reward, link } = require('../lib');

const TOOL_METALS = ['copper', 'bismuth_bronze', 'black_bronze', 'bronze', 'wrought_iron', 'steel', 'black_steel', 'blue_steel', 'red_steel'];
const tools = (kind) => anyOf(TOOL_METALS.map((m) => `precisionprospecting:metal/${kind}/${m}`));
const ORES = ['bismuthinite', 'cassiterite', 'chromite', 'garnierite', 'hematite', 'limonite', 'magnetite', 'malachite', 'native_copper',
  'native_gold', 'native_silver', 'sphalerite', 'tetrahedrite'];
const sluice = (kind) => anyOf(ORES.map((o) => `simple_tfc_ore_sluicing:${kind}/${o}`));
const MINERALS = ['alabandite', 'apatite', 'bastnasite', 'brimstone', 'calcite', 'greigite', 'magnesite', 'salmiak', 'smithsonite',
  'spherocobaltite', 'zabuyelite'].map((m) => `tfcthermaldeposits:mineral/${m}`);

module.exports = chapter('metallurgy', {
  order: 1,
  group: 'progress',
  title: { ru: 'Металлургия', en: 'Metallurgy' },
  subtitle: { ru: 'Разведка, сплавы и взрывное дело', en: 'Prospecting, alloys and blasting' },
  icon: 'tfc:metal/ingot/black_steel',
  links: [link('tfc/metal_anvil'), link('tfc/steel'), link('tfc/crucible')],
  quests: [
    quest('smith_secrets', {
      title: { ru: 'Секреты кузнеца', en: 'Smith\'s Secrets' },
      subtitle: { ru: 'Звон молотов под горой', en: 'Hammers ringing under the mountain' },
      desc: {
        ru: [
          'Ковка в TFC — это мини-игра: нужно попасть в нужную точку, выполнив последние удары в правильном порядке. В Lost Light у наковальни есть подсказка: рядом с окном ковки видны оставшиеся шаги, а для сварки есть отдельная кнопка.',
          '',
          'Попробуй сварить два слитка в &6двойной слиток&r — из них куют наковальни, инструменты для разведки и многое другое.',
        ],
        en: [
          'Forging in TFC is a minigame: you hit the target while doing the last strikes in the right order. In Lost Light the anvil helps: the remaining steps are shown beside the forging screen, and welding has its own button.',
          '',
          'Try welding two ingots into a &6double ingot&r: anvils, prospecting tools and much more are forged from them.',
        ],
      },
      icon: 'tfc:metal/double_ingot/bronze',
      deps: ['tfc/metal_anvil'],
      tasks: [item(anyOf(['copper', 'bronze', 'bismuth_bronze', 'black_bronze', 'wrought_iron', 'steel'].map((m) => `tfc:metal/double_ingot/${m}`)), 1, { icon: 'tfc:metal/double_ingot/bronze', title: { ru: 'Любой двойной слиток', en: 'Any double ingot' } })],
      rewards: [reward('tfc:powder/flux', 16)],
      budget: 2000,
    }),

    // ---------------- prospecting ----------------
    quest('prospector_hammer', {
      title: { ru: 'Молоток рудознатца', en: 'Prospector\'s Hammer' },
      subtitle: { ru: 'Гномы чуют руду', en: 'Dwarves can smell ore' },
      desc: {
        ru: [
          'Кирка рудоискателя ищет руду слишком широко. &6Молоток рудознатца&r проверяет только куб 13×13×13 вокруг блока, по которому ударил: если он нашёл руду, она где-то рядом.',
          '',
          'Навершие отливают в глиняной форме или выковывают из двойного слитка.',
        ],
        en: [
          'A prospector\'s pick searches too widely. A &6prospector\'s hammer&r checks only a 13×13×13 cube around the block you hit: if it finds ore, the ore is close by.',
          '',
          'The head is cast in a clay mold or forged from a double ingot.',
        ],
      },
      icon: 'precisionprospecting:metal/prospector_hammer/copper',
      deps: ['smith_secrets'],
      tasks: [item(tools('prospector_hammer'), 1, { icon: 'precisionprospecting:metal/prospector_hammer/copper', title: { ru: 'Молоток рудознатца из любого металла', en: 'A prospector\'s hammer of any metal' } })],
      rewards: [reward('tfc:ore/normal_cassiterite', 4)],
      budget: 2500,
    }),

    quest('prospector_drill', {
      title: { ru: 'Бур рудознатца', en: 'Prospector\'s Drill' },
      subtitle: { ru: 'В какую сторону копать?', en: 'Which way to dig?' },
      desc: {
        ru: [
          '&6Бур рудознатца&r смотрит вглубь: он проверяет полосу 7×25×7 в сторону грани, по которой ударил. Удобно, когда знаешь, что жила рядом, но не знаешь где. Навершие куют из фурмы.',
        ],
        en: [
          'A &6prospector\'s drill&r looks deep: it checks a 7×25×7 strip in the direction of the face you hit. Handy when you know a vein is near but not where. The head is forged from a tuyere.',
        ],
      },
      icon: 'precisionprospecting:metal/prospector_drill/copper',
      deps: ['prospector_hammer', 'tfc/bellows'],
      tasks: [item(tools('prospector_drill'), 1, { icon: 'precisionprospecting:metal/prospector_drill/copper', title: { ru: 'Бур рудознатца из любого металла', en: 'A prospector\'s drill of any metal' } })],
      rewards: [reward('tfc:ore/normal_hematite', 4)],
      budget: 3200,
    }),

    quest('mineral_prospector', {
      title: { ru: 'Щуп минералов', en: 'Mineral Prospector' },
      subtitle: { ru: 'Только не металлы!', en: 'But not metals!' },
      desc: {
        ru: [
          'Устал находить металл, когда ищешь каолин или графит? &6Щуп минералов&r замечает только минералы — гипс, каолин, графит, серу и другие — в кубе 45×45×45.',
        ],
        en: [
          'Tired of finding metal while looking for kaolin or graphite? A &6mineral prospector&r only notices minerals (gypsum, kaolin, graphite, sulfur and others) in a 45×45×45 cube.',
        ],
      },
      icon: 'precisionprospecting:metal/mineral_prospector/copper',
      deps: ['smith_secrets'],
      tasks: [item(tools('mineral_prospector'), 1, { icon: 'precisionprospecting:metal/mineral_prospector/copper', title: { ru: 'Щуп минералов из любого металла', en: 'A mineral prospector of any metal' } })],
      rewards: [reward('tfc:kaolin_clay', 4)],
      budget: 2000,
    }),

    // ---------------- ore ----------------
    quest('ore_washing', {
      title: { ru: 'Обогащение руды', en: 'Ore Dressing' },
      subtitle: { ru: 'Меньше пустой породы', en: 'Less waste rock' },
      desc: {
        ru: [
          'Смели руду в жёрнове — получится &6грязный порошок&r. Промой его в бочке с водой, и останется чистый порошок руды. Четыре порошка складываются в &6кучку&r, четыре кучки — в &6окатыш&r: в нём 80 мБ металла, а места он занимает как один кусок руды.',
        ],
        en: [
          'Grind ore in a quern to get &6dirty powder&r. Wash it in a barrel of water and you get clean ore powder. Four powders make a &6pile&r, four piles a &6pellet&r: it holds 80 mB of metal and takes the space of a single ore piece.',
        ],
      },
      icon: 'simple_tfc_ore_sluicing:pellet/malachite',
      deps: ['tfc/quern', 'tfc/barrels'],
      tasks: [
        item(sluice('dirty_powder'), 4, { icon: 'simple_tfc_ore_sluicing:dirty_powder/malachite', title: { ru: 'Грязный порошок руды', en: 'Dirty ore powder' } }),
        item(sluice('pellet'), 1, { icon: 'simple_tfc_ore_sluicing:pellet/malachite', title: { ru: 'Окатыш руды', en: 'An ore pellet' } }),
      ],
      rewards: [reward('tfc:ore/normal_cassiterite', 4)],
      budget: 2500,
    }),

    quest('thermal_minerals', {
      title: { ru: 'Дары огненной горы', en: 'Gifts of the Fire Mountain' },
      subtitle: { ru: 'Там, где земля горячая', en: 'Where the earth runs hot' },
      desc: {
        ru: [
          'Вокруг &eвулканов и горячих источников&r выпадают редкие минералы: апатит, кальцит, смитсонит, сера и другие. Их используют в химии, для удобрений и красок. Будь осторожен: вулкан иногда выбрасывает раскалённые бомбы.',
        ],
        en: [
          'Around &evolcanoes and hot springs&r rare minerals form: apatite, calcite, smithsonite, brimstone and more. They are used for chemistry, fertilizers and dyes. Be careful: a volcano sometimes throws red-hot bombs.',
        ],
      },
      icon: 'tfcthermaldeposits:mineral/brimstone',
      deps: ['prospector_hammer'],
      optional: true,
      tasks: [item(anyOf(MINERALS), 4, { icon: 'tfcthermaldeposits:mineral/brimstone', title: { ru: 'Термальные минералы', en: 'Thermal minerals' } })],
      rewards: [reward('tfc:powder/flux', 16)],
      budget: 2000,
    }),

    // ---------------- furnaces ----------------
    quest('multiforge', {
      title: { ru: 'Большая кузня', en: 'Multiforge' },
      subtitle: { ru: 'Один огонь — много заготовок', en: 'One fire, many workpieces' },
      desc: {
        ru: [
          'Угольную кузню можно сделать больше: сложи квадрат из куч древесного угля до 3×3, высотой не меньше 7 слоёв в каждой клетке, и разожги. Такая кузня работает как одна, но греет сразу несколько предметов и тиглей, а меха раздувают её целиком. Небо над ней не нужно.',
          '',
          'Отметь квест, когда построишь свою.',
        ],
        en: [
          'A charcoal forge can be made bigger: lay a square of charcoal piles up to 3×3, at least 7 layers in each space, and light it. It works as a single forge but heats several items and crucibles at once, and bellows fan it as a whole. It doesn\'t need open sky.',
          '',
          'Tick the quest when you\'ve built yours.',
        ],
      },
      icon: 'minecraft:charcoal',
      deps: ['smith_secrets', 'tfc/bellows'],
      optional: true,
      tasks: [checkmark({ title: { ru: 'Построй большую кузню', en: 'Build a multiforge' } })],
      rewards: [reward('minecraft:charcoal', 32)],
      budget: 2500,
    }),

    quest('crude_crucible', {
      title: { ru: 'Сосуд вместо тигля', en: 'A Vessel for a Crucible' },
      subtitle: { ru: 'Бедность не порок', en: 'Make do with what you have' },
      desc: {
        ru: [
          'Тигель дорог, а сплавы нужны уже в бронзовом веке. В Lost Light обычный керамический &6сосуд&r работает как простейший тигель: в нём можно смешивать расплавленные металлы и разливать сплав по формам.',
        ],
        en: [
          'A crucible is expensive, but alloys are needed already in the Bronze Age. In Lost Light a plain ceramic &6vessel&r works as a crude crucible: you can mix molten metals in it and pour the alloy into molds.',
        ],
      },
      icon: 'tfc:ceramic/vessel',
      deps: ['tfc/vessel'],
      optional: true,
      tasks: [item('tfc:ceramic/vessel', 2)],
      rewards: [reward('tfc:metal/ingot/copper')],
      budget: 3000,
    }),

    quest('insulation', {
      title: { ru: 'Утеплённая домна', en: 'Insulated Blast Furnace' },
      subtitle: { ru: 'Меньше кирпича — тот же жар', en: 'Less brick, same heat' },
      desc: {
        ru: [
          'Доменная печь требует толстых стен из огнеупорного кирпича. &6Изоляция&r из листов кованого железа и флюса позволяет сделать &6утеплённый огнеупорный кирпич&r и построить печь компактнее.',
        ],
        en: [
          'A blast furnace needs thick walls of fire bricks. &6Insulation&r made of wrought iron sheets and flux gives &6insulated fire bricks&r, so the furnace can be built more compactly.',
        ],
      },
      icon: 'tfcbetterbf:insulated_fire_bricks',
      deps: ['tfc/steel'],
      optional: true,
      tasks: [item('tfcbetterbf:insulated_fire_bricks', 4)],
      rewards: [reward('tfc:metal/ingot/wrought_iron')],
      budget: 10000,
    }),

    quest('black_steel', {
      title: { ru: 'Чёрная сталь', en: 'Black Steel' },
      subtitle: { ru: 'Закалённая в Чёрных землях', en: 'Forged in the Black Land' },
      desc: {
        ru: [
          'Сплавь сталь, никель и чёрную бронзу в &6слабую сталь&r, затем свари её слиток со слитком чугуна на наковальне — получится &6высокоуглеродистая чёрная сталь&r. Проковка на стальной наковальне даст слиток чёрной стали, из которого куют лучшие инструменты до синей и красной стали.',
        ],
        en: [
          'Alloy steel, nickel and black bronze into &6weak steel&r, then weld its ingot with a pig iron ingot on an anvil to get &6high carbon black steel&r. Working it on a steel anvil gives a black steel ingot, the material of the best tools before blue and red steel.',
        ],
      },
      icon: 'tfc:metal/ingot/black_steel',
      deps: ['tfc/steel', 'tfc/crucible'],
      tasks: [
        item('tfc:metal/anvil/steel'),
        item('tfc:metal/ingot/black_steel', 4),
      ],
      rewards: [reward('tfc:metal/ingot/black_steel')],
      budget: 20000,
    }),

    // ---------------- explosives ----------------
    quest('saltpeter', {
      title: { ru: 'Селитра', en: 'Saltpeter' },
      subtitle: { ru: 'Начало химии', en: 'The dawn of chemistry' },
      desc: {
        ru: [
          'Руда селитры растворяется в бочке с водой в &6раствор селитры&r. Вскипяти 1000 мБ раствора в горшке с щепоткой древесной золы — и на дне останутся &6кристаллы селитры&r, которые мелют в порошок. Так выходит намного больше, чем при помоле руды.',
          '',
          'Раствор можно получить и без руды: запечатай в бочке с водой перегной, компост или гуано.',
        ],
        en: [
          'Saltpeter ore dissolves in a barrel of water into &6crude niter solution&r. Boil 1000 mB of it in a pot with a pinch of wood ash and &6saltpeter crystals&r are left, which you grind into powder. This yields much more than grinding the ore.',
          '',
          'You can also get the solution without ore: seal humus, compost or guano in a barrel of water.',
        ],
      },
      icon: 'tfc_dynamite:saltpeter_crystals',
      deps: ['tfc/barrels', 'tfc/pot'],
      tasks: [item('tfc_dynamite:saltpeter_crystals', 4)],
      rewards: [reward('tfc:powder/saltpeter', 8)],
      budget: 800,
    }),

    quest('nitroglycerin', {
      title: { ru: 'Нитроглицерин', en: 'Nitroglycerin' },
      subtitle: { ru: 'Не тряси бочку', en: 'Don\'t shake the barrel' },
      desc: {
        ru: [
          'Сера и вода дают &6серную кислоту&r, вместе с селитрой — &6азотную&r, а смесь обеих кислот с &6глицерином&r (щёлок и жир или оливковое масло) — нестабильный нитроглицерин. Запечатай бочку и дай ему успокоиться: если тронуть бочку раньше времени, она взорвётся.',
          '',
          'Стабильный нитроглицерин впитывают в высушенный порошок глиняного кирпича — получается &6стабильная смесь&r.',
        ],
        en: [
          'Sulfur and water give &6sulfuric acid&r, with saltpeter &6nitric acid&r, and a mix of both acids with &6glycerol&r (lye and fat or olive oil) gives unstable nitroglycerin. Seal the barrel and let it settle: touch the barrel too soon and it explodes.',
          '',
          'Stable nitroglycerin is absorbed into dried mud brick powder to make a &6stable compound&r.',
        ],
      },
      icon: 'tfc_dynamite:stable_compound',
      deps: ['saltpeter'],
      tasks: [item('tfc_dynamite:stable_compound', 2)],
      rewards: [reward('tfc:powder/sulfur', 8)],
      budget: 800,
    }),

    quest('dynamite', {
      title: { ru: 'Огонь Ортханка', en: 'The Fire of Orthanc' },
      subtitle: { ru: 'Взрывной огонь под стеной', en: 'Blasting fire beneath the wall' },
      desc: {
        ru: [
          'Из смеси скатывают &6динамитные шашки&r. Шашку крепят к грани блока; вбитая в камень, она взрывается гораздо сильнее. Шашки соединяют &6запальным шнуром&r и поджигают огнивом с одного конца.',
          '',
          'Огонь бежит по шнуру не мгновенно — будь где-нибудь подальше, когда он добежит.',
        ],
        en: [
          'The compound is rolled into &6dynamite sticks&r. A stick attaches to a block face; embedded in stone, it blasts much harder. Sticks are linked with &6fuse cord&r and lit from one end with a firestarter.',
          '',
          'The spark doesn\'t travel instantly: be somewhere else when it arrives.',
        ],
      },
      icon: 'tfc_dynamite:stable_dynamite_stick',
      deps: ['nitroglycerin'],
      tasks: [
        item('tfc_dynamite:stable_dynamite_stick', 4),
        item('tfc_dynamite:fuse_cord', 8),
      ],
      rewards: [reward('tfc:metal/ingot/bronze')],
      budget: 6500,
    }),

    quest('blasting', {
      title: { ru: 'Подрывник', en: 'Demolition Expert' },
      subtitle: { ru: 'Без отсчёта. Просто результат', en: 'No countdown. Just results' },
      desc: {
        ru: [
          '&6Подрывная машинка&r взрывает все подключённые шашки разом, а &6карьерный динамит&r не уничтожает породу, а дробит её в щебень — так шахта не обвалится. Капсюль на шашке переключает взрыв в режим тоннеля.',
        ],
        en: [
          'A &6plunger&r fires all linked charges at once, and &6quarry dynamite&r doesn\'t destroy rock but turns it into rubble, so the mine doesn\'t cave in. A blasting cap switches a stick to tunnel mode.',
        ],
      },
      icon: 'tfc_dynamite:plunger',
      deps: ['dynamite'],
      optional: true,
      tasks: [
        item('tfc_dynamite:plunger'),
        item(anyOf('tfc_dynamite:stable_quarry_dynamite_stick', 'tfc_dynamite:reinforced_quarry_dynamite_stick'), 4, { icon: 'tfc_dynamite:stable_quarry_dynamite_stick', title: { ru: 'Карьерный динамит', en: 'Quarry dynamite' } }),
        item('tfc_dynamite:blasting_cap', 2),
      ],
      rewards: [reward('tfc:metal/ingot/wrought_iron')],
      budget: 10000,
    }),

    quest('channel_casting', {
      title: { ru: 'Литьё по каналам', en: 'Channel Casting' },
      subtitle: { ru: 'Один тигель — много форм', en: 'One crucible, many molds' },
      desc: {
        ru: [
          'Из тигля можно лить сразу в несколько форм. Слепи из глины &6каналы&r и &6столы для форм&r, обожги их и соедини каналами тигель со столами. Форму кладут на стол через Shift+ПКМ, а литьё запускают ПКМ по каналу у самого тигля.',
          '',
          'Меха у стола остужают металл быстрее. Канал можно открыть и сигналом красного камня.',
        ],
        en: [
          'A crucible can pour into several molds at once. Knap &6channels&r and &6mold tables&r from clay, fire them and connect the crucible to the tables with channels. Shift-right-click a table to place a mold, and right-click the channel next to the crucible to start pouring.',
          '',
          'Bellows next to a table cool the metal faster. A channel can also be opened with a redstone pulse.',
        ],
      },
      icon: 'tfcchannelcasting:mold_table',
      deps: ['tfc/crucible'],
      optional: true,
      tasks: [item('tfcchannelcasting:channel', 4), item('tfcchannelcasting:mold_table', 2)],
      rewards: [reward('tfc:fire_clay', 8)],
      budget: 2000,
    }),
  ],
});
