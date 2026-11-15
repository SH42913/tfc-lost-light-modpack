// Chapter "seafaring": FirmaCiv (+ AlekiShips parts) boats from the dugout canoe to the sloop, navigation and cannons.
// Boats are entities, so "build a boat" is an observation task on a list of boat entity types (one per wood).
// The canoe, kayak, sextant and barometer quests live in the TFC chapter and are shown here as links.
// Text formatting: &6 - names, &e - where to look, &r - reset.
const { chapter, quest, item, anyOf, observe, structure, reward, lootCrate, link } = require('../lib');

// FirmaCiv: strong hardwoods for scaffold-built boats
const HARDWOODS = ['acacia', 'ash', 'aspen', 'birch', 'blackwood', 'chestnut', 'hickory', 'maple', 'oak', 'rosewood', 'sycamore'];
const boats = (kind) => HARDWOODS.map((w) => `firmaciv:${kind}/${w}`);

module.exports = chapter('seafaring', {
  order: 12,
  group: 'world',
  title: { ru: 'Мореплавание', en: 'Seafaring' },
  subtitle: { ru: 'От долблёнки до шлюпа', en: 'From dugout to sloop' },
  icon: 'firmaciv:small_triangular_sail',
  links: [link('tfc/canoe'), link('tfc/kayak'), link('tfc/navigation'), link('tfc/barometer')],
  quests: [
    quest('shipwright', {
      title: { ru: 'Корабельная верфь', en: 'Shipyard' },
      subtitle: { ru: 'Сначала каркас, потом корабль', en: 'First the frame, then the ship' },
      desc: {
        ru: [
          'Большие лодки не крафтят, а строят прямо на месте. Основа — &6корабельные леса&r: прямые и скошенные каркасы, которые ставят по форме будущего корпуса.',
          '',
          'На каждый каркас кладут четыре доски крепкой лиственной породы и прибивают их &6медными болтами&r, держа молот во второй руке. Болты куют из меди.',
        ],
        en: [
          'Big boats aren\'t crafted but built in place. Their base is &6shipwright\'s scaffolding&r: flat and angled frames placed in the shape of the future hull.',
          '',
          'Each frame takes four planks of a strong hardwood, nailed with &6copper bolts&r while holding a hammer in your offhand. Bolts are forged from copper.',
        ],
      },
      icon: 'firmaciv:watercraft_frame_angled',
      deps: ['tfc/canoe', 'tfc/metal_anvil'],
      tasks: [
        item(anyOf('firmaciv:watercraft_frame_angled', 'alekiships:watercraft_frame_angled'), 2, { icon: 'firmaciv:watercraft_frame_angled', title: { ru: 'Скошенные корабельные леса', en: 'Angled shipwright\'s scaffolding' } }),
        item(anyOf('firmaciv:watercraft_frame_flat', 'alekiships:watercraft_frame_flat'), 2, { icon: 'firmaciv:watercraft_frame_flat', title: { ru: 'Прямые корабельные леса', en: 'Flat shipwright\'s scaffolding' } }),
        item('firmaciv:copper_bolt', 16),
      ],
      rewards: [reward('tfc:metal/ingot/copper', 1)],
      budget: 3000,
    }),

    quest('abandoned_ship', {
      title: { ru: 'Брошенная лодка', en: 'Abandoned Boat' },
      subtitle: { ru: 'Кто-то не закончил работу', en: 'Someone didn\'t finish the job' },
      desc: {
        ru: [
          'На &eпобережьях&r и в &eболотах&r иногда стоят недостроенные лодки и шлюпы — их хозяева ушли и не вернулись. Посмотри, как устроен корпус: так проще понять, как строить свой.',
        ],
        en: [
          'On &ecoasts&r and in &eswamps&r you may find unfinished rowboats and sloops, left by owners who never came back. See how the hull is built: it makes building your own easier.',
        ],
      },
      icon: 'firmaciv:watercraft_frame_flat',
      deps: ['shipwright'],
      tasks: [structure([
        ...['birch', 'cherry', 'dark_oak', 'oak', 'spruce'].map((w) => `alekiships:unfinished_sloop_${w}`),
        ...['birch', 'cherry', 'dark_oak', 'oak', 'spruce'].map((w) => `alekiships:unfinished_rowboat_${w}`),
      ], { title: { ru: 'Найди недостроенную лодку', en: 'Find an unfinished boat' }, icon: 'firmaciv:watercraft_frame_flat' })],
      rewards: [lootCrate('explore_rare')],
      budget: 4500,
    }),

    quest('rowboat', {
      title: { ru: 'Гребная лодка', en: 'Rowboat' },
      subtitle: { ru: 'Налегай на вёсла!', en: 'Put your back into it!' },
      desc: {
        ru: [
          'Гребная лодка — первый настоящий корабль железного века: три места, и даже лошадь поместится.',
          '',
          'Поставь корабельные леса прямоугольником 2×3 внутрь, обшей их досками и болтами, затем установи в середине &6уключины&r из двойного слитка кованого железа и вставь в них &6вёсла&r. Гребец сидит спиной вперёд — так удобнее налегать на вёсла.',
        ],
        en: [
          'The rowboat is the first real ship of the Iron Age: three seats, and even a horse fits.',
          '',
          'Place the scaffolding in a 2×3 rectangle facing inward, cover it with planks and bolts, then set &6oarlocks&r forged from wrought iron double ingots in the middle and fit the &6oars&r. The rower sits facing backwards, to really put their back into it.',
        ],
      },
      icon: 'alekiships:oar',
      deps: ['shipwright', 'tfc/wrought_iron'],
      tasks: [
        item('alekiships:oar', 2),
        observe.entity(boats('rowboat'), { title: { ru: 'Построй гребную лодку', en: 'Build a rowboat' }, icon: 'alekiships:oar' }),
      ],
      rewards: [reward('tfc:metal/ingot/wrought_iron')],
      budget: 10000,
    }),

    quest('rigging', {
      title: { ru: 'Такелаж', en: 'Rigging' },
      subtitle: { ru: 'Верёвки, паруса и узлы', en: 'Ropes, sails and knots' },
      desc: {
        ru: [
          'Парусному кораблю нужны канаты и паруса. &6Бухту каната&r плетут из джута, а паруса шьют из шерстяной ткани.',
          '',
          'Паруса можно окрасить в любой цвет — каждый по отдельности.',
        ],
        en: [
          'A sailing ship needs ropes and sails. A &6rope coil&r is woven from jute, and sails are sewn from wool cloth.',
          '',
          'Sails can be dyed any color, each one separately.',
        ],
      },
      icon: 'firmaciv:rope_coil',
      deps: ['rowboat', 'tfc/spindle'],
      tasks: [
        item('firmaciv:rope_coil', 4),
        item('firmaciv:small_triangular_sail'),
        item('firmaciv:medium_triangular_sail'),
      ],
      rewards: [reward('tfc:wool_cloth', 8)],
      budget: 3400,
    }),

    quest('sloop', {
      title: { ru: 'Шлюп', en: 'Sloop' },
      subtitle: { ru: 'Прямой путь на Запад', en: 'The Straight Road to the West' },
      desc: {
        ru: [
          'Шлюп — настоящий корабль века стали: четыре блока в ширину, больше восьми в длину, до семи пассажиров, тринадцати сундуков и шести пушек.',
          '',
          'Он дорог: сталь, медь, сотни пиломатериалов, ткань и джут. Сначала корпус из корабельных лесов с прямыми каркасами, затем &6утки&r из двойных слитков стали. Остальное достраивают на месте по подсказкам с синим молотом.',
          '',
          'Ходить под парусом — это навык: ловишь ветер, ставишь паруса под нужным углом, бросаешь &6якорь&r у берега.',
        ],
        en: [
          'The sloop is a true ship of the Steel Age: four blocks wide, over eight long, up to seven passengers, thirteen containers and six cannons.',
          '',
          'It\'s expensive: steel, copper, hundreds of lumber, cloth and jute. First the hull of scaffolding with flat frames, then &6cleats&r of steel double ingots. The rest is built in place following the blue hammer hints.',
          '',
          'Sailing is a skill: catch the wind, set the sails at the right angle, and drop the &6anchor&r by the shore.',
        ],
      },
      icon: 'firmaciv:medium_triangular_sail',
      deps: ['rigging', 'tfc/steel'],
      tasks: [
        item('alekiships:anchor'),
        item('alekiships:cleat', 2),
        observe.entity(boats('sloop'), { title: { ru: 'Построй шлюп', en: 'Build a sloop' }, icon: 'firmaciv:medium_triangular_sail' }),
      ],
      rewards: [lootCrate('explore_epic'), reward('tfc:metal/ingot/steel')],
      budget: 28000,
    }),

    quest('cannon', {
      title: { ru: 'Пушки', en: 'Cannons' },
      subtitle: { ru: 'Аргумент на любом языке', en: 'An argument in any language' },
      desc: {
        ru: [
          'Пушки ставят на большие корабли и на сушу — это лучшее средство против вражеских судов. Ствол куют из двойных листов кованого железа, ядра — из двойных слитков.',
          '',
          'Для выстрела нужны порох, бумага и огниво. Наклон ствола меняется прямо на месте.',
        ],
        en: [
          'Cannons are mounted on big ships and on land: the best tool against enemy vessels. The barrel is forged from wrought iron double sheets, cannonballs from double ingots.',
          '',
          'Firing takes gunpowder, paper and a flint and steel. You can adjust the barrel angle in place.',
        ],
      },
      icon: 'firmaciv:cannon',
      deps: ['rowboat'],
      optional: true,
      tasks: [
        item(anyOf('firmaciv:cannon', 'alekiships:cannon'), 1, { icon: 'firmaciv:cannon', title: { ru: 'Пушка', en: 'A cannon' } }),
        item('alekiships:cannonball', 8),
      ],
      rewards: [reward('tfc:metal/ingot/wrought_iron')],
      budget: 10000,
    }),

    quest('timepiece', {
      title: { ru: 'Морской хронометр', en: 'Navigator\'s Timepiece' },
      subtitle: { ru: 'Где я? Сколько градусов до дома?', en: 'Where am I? How many degrees from home?' },
      desc: {
        ru: [
          'Секстант определяет широту, а &6морской хронометр&r — долготу: он хранит время нулевого меридиана. Вместе они дают точные координаты в любой точке мира.',
          '',
          'Один градус — это примерно 222 блока. Корпус хронометра куют из двойного листа латуни.',
        ],
        en: [
          'A sextant finds your latitude, and a &6navigator\'s timepiece&r your longitude: it keeps the time of the prime meridian. Together they give exact coordinates anywhere in the world.',
          '',
          'One degree is about 222 blocks. The timepiece body is forged from a brass double sheet.',
        ],
      },
      icon: 'firmaciv:nav_clock',
      deps: ['tfc/navigation'],
      optional: true,
      tasks: [item('firmaciv:nav_clock')],
      rewards: [reward('tfc:metal/ingot/brass', 2)],
      budget: 8800,
    }),
  ],
});
