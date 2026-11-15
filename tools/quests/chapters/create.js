// Chapter "create": Create with WoodenCog recipes (andesite alloy is knapped, machines need TFC metals).
// Imported from TerraFirmaAdventure (Heracles, see `from`) by import_heracles.js, then reworked by hand.
// Text formatting: &6 - item/mechanic names, &d - Field Guide, &r - reset.
const { chapter, quest, item, anyOf, reward } = require('../lib');

const ORE_POWDERS = ['native_copper', 'malachite', 'tetrahedrite', 'cassiterite', 'bismuthinite', 'sphalerite', 'garnierite',
  'hematite', 'limonite', 'magnetite', 'native_gold', 'native_silver'].map((o) => `tfc:powder/${o}`);

module.exports = chapter('create', {
  order: 2,
  group: 'progress',
  title: 'Create',
  subtitle: { ru: 'Пусть работают шестерни', en: 'Let the cogs do the work' },
  icon: 'create:cogwheel',
  quests: [
    quest('andesite_alloy', {
      title: { ru: 'Андезитовый сплав', en: 'Andesite Alloy' },
      subtitle: { ru: 'Камень, из которого всё начинается', en: 'The stone it all starts with' },
      desc: {
        ru: [
          'В Lost Light механизмы &6Create&r доступны рано. &6Андезитовый сплав&r оббивают из андезитовых камней, как каменные инструменты, а позже его можно штамповать механическим манипулятором с зубилом.',
        ],
        en: [
          '&6Create&r machines are available early in Lost Light. &6Andesite alloy&r is knapped from andesite rocks, just like stone tools, and later a deployer with a chisel can make it.',
        ],
      },
      icon: 'create:andesite_alloy',
      deps: ['tfc/sticks_and_stones'],
      tasks: [item('create:andesite_alloy', 8)],
      rewards: [reward('create:andesite_alloy', 4)],
      budget: 1500,
    }),

    quest('cogwheels', {
      from: 'create/shesterni',
      title: { ru: 'Крутящиеся штуки', en: 'Spinning Things' },
      subtitle: { ru: 'Шестерни и с чем их едят', en: 'Cogs and what to do with them' },
      desc: {
        ru: [
          '&6Валы&r и &6шестерни&r передают вращение от источника к механизмам. Большая шестерня меняет скорость вращения. Все эти детали ещё не раз пригодятся.',
        ],
        en: [
          '&6Shafts&r and &6cogwheels&r carry rotation from the source to machines. A large cogwheel changes the speed. You\'ll need lots of these parts.',
        ],
      },
      icon: 'create:cogwheel',
      deps: ['andesite_alloy', 'tfc/saw'],
      tasks: [
        item('create:shaft', 12),
        item('create:cogwheel', 16),
        item('create:large_cogwheel', 8),
      ],
      rewards: [reward('create:andesite_alloy', 8)],
      budget: 3000,
    }),

    quest('kinetic_power', {
      title: { ru: 'Источник вращения', en: 'Rotational Power' },
      subtitle: { ru: 'Вода, ветер или руки', en: 'Water, wind or your own hands' },
      desc: {
        ru: [
          'Механизмам нужна сила. Проще всего начать с &6водяного колеса&r на реке, &6ветряка&r на холме или &6ручного привода&r, если не жалко рук.',
        ],
        en: [
          'Machines need power. The easiest start is a &6water wheel&r on a river, a &6windmill&r on a hill, or a &6hand crank&r if you don\'t mind the work.',
        ],
      },
      icon: 'create:water_wheel',
      deps: ['cogwheels'],
      tasks: [item(anyOf('create:water_wheel', 'create:large_water_wheel', 'create:windmill_bearing', 'create:hand_crank'), 1, { icon: 'create:water_wheel', title: { ru: 'Водяное колесо, ветряк или ручной привод', en: 'A water wheel, windmill or hand crank' } })],
      rewards: [reward('create:shaft', 16)],
      budget: 2000,
    }),

    quest('basic_mechanisms', {
      from: 'create/base_mechs',
      title: { ru: 'Простые механизмы', en: 'Basic Mechanisms' },
      subtitle: { ru: 'Разум из металла и колёс', en: 'A mind of metal and wheels' },
      desc: {
        ru: [
          'Пора браться за настоящую автоматизацию. &6Андезитовый корпус&r — основа большинства механизмов: обработай им ошкуренное бревно. &6Жёрнов&r мелет зерно и руду, а &6механический пресс&r плющит металл в листы.',
        ],
        en: [
          'Time for real automation. The &6andesite casing&r is the base of most machines: apply andesite alloy to a stripped log. The &6millstone&r grinds grain and ore, and the &6mechanical press&r flattens metal into sheets.',
        ],
      },
      icon: 'create:andesite_casing',
      deps: ['kinetic_power', 'tfc/wrought_iron'],
      tasks: [
        item('create:andesite_casing', 4),
        item('create:gearbox'),
        item('create:andesite_funnel', 4),
        item('create:millstone'),
        item('create:mechanical_press'),
      ],
      rewards: [reward('tfc:metal/ingot/wrought_iron')],
      budget: 10000,
    }),

    quest('ore_crushing', {
      from: 'create/ore',
      title: { ru: 'Дробление руды', en: 'Ore Crushing' },
      subtitle: { ru: 'Больше металла из той же руды', en: 'More metal from the same ore' },
      desc: {
        ru: [
          '&6Дробильные колёса&r и жёрнов размалывают руду TFC в порошок. Порошок можно плавить, и из той же руды выходит больше металла.',
        ],
        en: [
          '&6Crushing wheels&r and the millstone grind TFC ore into powder. Powder can be melted, and the same ore gives more metal.',
        ],
      },
      icon: 'tfc:powder/malachite',
      deps: ['basic_mechanisms'],
      tasks: [item(anyOf(ORE_POWDERS), 16, { icon: 'tfc:powder/malachite', title: { ru: 'Порошок любой руды', en: 'Powder of any ore' } })],
      rewards: [reward('create:andesite_alloy', 8)],
      budget: 3000,
    }),

    quest('mechanical_tools', {
      from: 'create/base_mechs',
      title: { ru: 'Механические инструменты', en: 'Mechanical Tools' },
      subtitle: { ru: 'Пусть работает машина', en: 'Let the machine do it' },
      desc: {
        ru: [
          '&6Механический бур&r ломает блоки, &6механическая пила&r валит деревья и пилит доски, а &6механическая рука&r использует предметы как игрок. Вместе они автоматизируют почти любую работу.',
        ],
        en: [
          'The &6mechanical drill&r breaks blocks, the &6mechanical saw&r fells trees and cuts planks, and the &6deployer&r uses items like a player. Together they automate almost any job.',
        ],
      },
      icon: 'create:mechanical_drill',
      deps: ['basic_mechanisms', 'tfc/brass'],
      tasks: [
        item('create:mechanical_drill'),
        item('create:mechanical_saw'),
        item('create:deployer'),
      ],
      rewards: [reward('tfc:metal/ingot/brass', 2)],
      budget: 8800,
    }),

    quest('advanced_mechanisms', {
      from: 'create/advanced_mechs',
      title: { ru: 'Продвинутые механизмы', en: 'Advanced Mechanisms' },
      subtitle: { ru: 'Как это вообще работает?!', en: 'How does this even work?!' },
      desc: {
        ru: [
          'Хватит играть в игрушки — пора строить серьёзные машины: насосы, умные желоба, порталы, лифты и дорожные катки.',
        ],
        en: [
          'Enough playing around: time to build serious machines like pumps, smart chutes, gantries, elevators and rollers.',
        ],
      },
      icon: 'create:mechanical_roller',
      deps: ['mechanical_tools'],
      tasks: [
        item('create:mechanical_pump'),
        item('create:smart_chute'),
        item('create:gantry_carriage'),
        item('create:elevator_pulley'),
        item('create:mechanical_roller'),
      ],
      rewards: [reward('tfc:metal/ingot/brass', 2), reward('tfc:metal/ingot/wrought_iron')],
      budget: 19000,
    }),

    quest('ore_excavation', {
      from: 'create/ultimate',
      title: { ru: 'Добыча из жил', en: 'Ore Excavation' },
      subtitle: { ru: 'Наши передовые технологии', en: 'State-of-the-art technology' },
      desc: {
        ru: [
          'Засучим рукава: пора добывать по-крупному! &6Искатель жил&r находит глубинные залежи, а &6буровая установка&r и &6экстрактор&r выкачивают из них руду и жидкости без конца.',
        ],
        en: [
          'Roll up your sleeves: it\'s time to mine big! The &6vein finder&r locates deep deposits, and the &6drilling machine&r and &6extractor&r pull ore and fluids out of them endlessly.',
        ],
      },
      icon: 'createoreexcavation:drilling_machine',
      deps: ['advanced_mechanisms', 'tfc/steel'],
      tasks: [
        item('createoreexcavation:vein_finder'),
        item('createoreexcavation:drilling_machine'),
        item('createoreexcavation:extractor'),
      ],
      rewards: [reward('tfc:metal/ingot/steel', 2)],
      budget: 26000,
    }),

    quest('brass_age', {
      title: { ru: 'Латунный век', en: 'The Brass Age' },
      subtitle: { ru: 'Тонкая работа', en: 'Fine work' },
      desc: {
        ru: [
          'Умным механизмам нужна латунь. &6Латунный корпус&r получают так же, как андезитовый, только латунным листом. &6Электронная лампа&r и &6точный механизм&r идут в манипуляторы, умные желоба и механические верстаки.',
          '',
          'Точный механизм не крафтят, а собирают &6последовательной сборкой&r: заготовка проходит несколько машин подряд. Шаги смотри в JEI.',
        ],
        en: [
          'Smart machines need brass. A &6brass casing&r is made like an andesite one, only with a brass sheet. An &6electron tube&r and a &6precision mechanism&r go into mechanical arms, smart chutes and mechanical crafters.',
          '',
          'A precision mechanism isn\'t crafted but built by &6sequenced assembly&r: the part passes through several machines in a row. See JEI for the steps.',
        ],
      },
      icon: 'create:precision_mechanism',
      deps: ['mechanical_tools'],
      tasks: [item('create:brass_casing', 4), item('create:electron_tube', 2), item('create:precision_mechanism')],
      rewards: [reward('tfc:metal/ingot/brass', 2)],
      budget: 8800,
    }),

    quest('steam', {
      title: { ru: 'Сила пара', en: 'Steam Power' },
      subtitle: { ru: 'Изенгард одобряет', en: 'Isengard approves' },
      desc: {
        ru: ['Вода и ветер слабы для больших машин. Собери котёл из &6жидкостных баков&r, подведи воду, разведи под ним жар и повесь на стенку &6паровой двигатель&r. Чем больше котёл и сильнее нагрев, тем больше двигателей он тянет.'],
        en: ['Water and wind are too weak for big machines. Build a boiler of &6fluid tanks&r, pipe in water, put heat under it and attach a &6steam engine&r to its side. The bigger the boiler and the stronger the heat, the more engines it drives.'],
      },
      icon: 'create:steam_engine',
      deps: ['advanced_mechanisms'],
      tasks: [item('create:fluid_tank', 4), item('create:steam_engine')],
      rewards: [reward('tfc:metal/ingot/brass', 2), reward('tfc:metal/ingot/wrought_iron')],
      budget: 19000,
    }),

    quest('trains', {
      title: { ru: 'Железная дорога', en: 'Railway' },
      subtitle: { ru: 'Быстрее любого коня', en: 'Faster than any horse' },
      desc: {
        ru: ['Проложи &6рельсы&r, поставь &6станцию&r и собери на ней поезд из &6вагонных корпусов&r и любых блоков. Поезд возит грузы и пассажиров через весь мир, а расписание заставит его ходить без машиниста.'],
        en: ['Lay &6tracks&r, place a &6station&r and assemble a train on it from &6train casings&r and any blocks. A train carries cargo and passengers across the world, and a schedule lets it run without a driver.'],
      },
      icon: 'create:track',
      deps: ['brass_age', 'tfc/steel'],
      optional: true,
      tasks: [item('create:track', 16), item('create:track_station'), item('create:railway_casing', 2)],
      rewards: [reward('tfc:metal/ingot/steel', 2)],
      budget: 26000,
    }),
  ],
});
