// Chapter "beneath": the Nether as reworked by Beneath (TFC-style underworld). Mechanics are taken from the Beneath
// field guide entries (assets/tfc/patchouli_books/field_guide/en_us/entries/beneath/*) and its jar data: ore drops,
// nether loot overrides (cursed hide from hoglins and striders, pure essences and lost pages in fortress and bastion
// chests, ender pearls from piglin bartering), recipes (juicer, hellbricks, ancient altar, agonizing fertilizer).
// Create Netherless makes some nether goods (blaze rods, quartz, soul sand) on Create machines without going there.
// Structures: minecraft/nova_structures/repurposed_structures nether ones from tfc_structures defaultWorldgenStructures.
// Text formatting: &6 - names, &e - where to look, &d - field guide, &r - reset.
const { chapter, quest, item, observe, structure, dimension, anyOf, link, lootCrate } = require('../lib');
const { hasFluid } = require('../custom');

const COMMON = { rewards: [lootCrate('explore_common')], budget: 1500 };
const RARE = { rewards: [lootCrate('explore_rare')], budget: 4500 };
const EPIC = { rewards: [lootCrate('explore_epic')], budget: 15000 };

const ns = (namespace, ids) => ids.map((id) => `${namespace}:${id}`);
const PURE = ns('beneath', ['pure_death', 'pure_destruction', 'pure_decay', 'pure_sorrow', 'pure_flame']);
const LAVA = ['minecraft:lava', ...ns('morelavatfc', ['felsic_lava', 'intermediate_lava', 'mafic_lava'])];
const MUSHROOMS = ns('beneath', ['button', 'chantrelle', 'death_cap', 'destroying_angels', 'fools_funnel', 'oyster', 'parasol',
  'portobello', 'shittake', 'sulfur_tuft'].map((m) => `food/${m}`));
const FORTRESSES = ['minecraft:fortress', 'minecraft:bastion_remnant', 'repurposed_structures:fortress_jungle',
  'repurposed_structures:bastion_underground', 'repurposed_structures:stronghold_nether', 'repurposed_structures:city_nether',
  ...ns('nova_structures', ['nether_keep', 'nether_port', 'piglin_camp', 'piglin_outstation'])];

module.exports = chapter('beneath', {
  order: 13,
  group: 'world',
  title: { ru: 'Незер', en: 'Beneath' },
  subtitle: { ru: 'Мир под миром', en: 'The world beneath the world' },
  icon: 'beneath:cursecoal',
  links: [link('tfc/wrought_iron'), link('create/advanced_mechanisms')],
  quests: [
    quest('gateway', {
      title: { ru: 'Врата преисподней', en: 'The Gates Below' },
      subtitle: { ru: 'Ты прошёл слишком глубоко', en: 'You delved too deep' },
      desc: {
        ru: [
          'Под миром лежит другой мир — проклятый, жаркий и богатый. Туда ведут два пути.',
          '',
          'Старый путь — рамка из &6обсидиана&r, подожжённая &6огнивом&r (кремень и стальной слиток). Обсидиан получают, положив блок магмы в бочку с водой.',
          '',
          'Путь жертвы описан в &dруководстве&r: держи в руке &6косу&r, разложи рядом семь подношений (черепа, наковальни, установленные блоки золота или чёрной стали, слитки чугуна или чёрной стали) и убей рядом свинью, козу или овцу. Портал откроется, но преисподняя на время ворвётся в твой мир.',
        ],
        en: [
          'Beneath the world lies another one: cursed, hot and rich. Two paths lead there.',
          '',
          'The old path is a frame of &6obsidian&r lit with &6flint and steel&r (a flint and a steel ingot). Obsidian is made by putting a magma block into a barrel of water.',
          '',
          'The path of sacrifice is in the &dfield guide&r: hold a &6scythe&r, lay out seven offerings nearby (skulls, anvils, placed blocks of gold or black steel, ingots of pig iron or black steel) and kill a pig, a goat or a sheep next to them. A portal will open, but the underworld will invade your world for a while.',
        ],
      },
      icon: 'minecraft:obsidian',
      deps: ['tfc/wrought_iron'],
      tasks: [dimension('minecraft:the_nether', { title: { ru: 'Спустись в Незер', en: 'Descend into the Nether' }, icon: 'minecraft:netherrack' })],
      ...RARE,
    }),

    quest('juicer', {
      title: { ru: 'Соковыжималка', en: 'The Juicer' },
      subtitle: { ru: 'Здесь нет рек', en: 'There are no rivers here' },
      desc: {
        ru: [
          'Пить в Незере всё равно нужно, а воды здесь нет. В бочках она не испаряется, так что запас можно принести с собой.',
          '',
          '&6Соковыжималка&r из кожи и палки отжимает воду из грибов, которые растут здесь повсюду, и из свежих фруктов. Брось грибы в её окошко — и пей.',
        ],
        en: [
          'You still need to drink in the Nether, and there\'s no water here. It doesn\'t evaporate in barrels, so you can bring a supply.',
          '',
          'A &6Juicer&r made of leather and a stick presses water out of the mushrooms that grow everywhere here, and out of fresh fruit. Drop mushrooms into its slot and drink.',
        ],
      },
      icon: 'beneath:juicer',
      deps: ['gateway'],
      tasks: [
        item(anyOf(MUSHROOMS), 4, { title: { ru: '4 гриба Незера', en: '4 Nether mushrooms' }, icon: 'beneath:food/portobello' }),
        item('beneath:juicer'),
      ],
      ...COMMON,
    }),

    quest('nether_ores', {
      title: { ru: 'Проклятый уголь', en: 'Cursecoal' },
      subtitle: { ru: 'Богатства преисподней', en: 'Riches of the underworld' },
      desc: {
        ru: [
          'Руды есть и здесь, а &6каменный щуп&r работает как обычно:',
          '- &6незерское золото&r встречается часто, а под уровнем лавы его больше и оно богаче;',
          '- &6проклятый уголь&r — мощное топливо, лежит &eвыше 80-го уровня&r;',
          '- &6сильвин&r заменяет базальт на любой высоте; есть ещё пирит и кварц.',
          '',
          'Незерак не обрушивается, а вот блэкстоун, незерский кирпич и щебень — да.',
        ],
        en: [
          'There are ores here too, and the &6prospector\'s pick&r works as usual:',
          '- &6nether gold&r is common, and below the lava level there\'s more of it, and richer;',
          '- &6cursecoal&r is a powerful fuel found &eabove Y 80&r;',
          '- &6sylvite&r replaces basalt at any height; there\'s also pyrite and quartz.',
          '',
          'Netherrack doesn\'t collapse, but blackstone, nether bricks and cobblerack do.',
        ],
      },
      icon: 'beneath:cursecoal',
      deps: ['gateway'],
      tasks: [item('beneath:cursecoal', 8, { icon: 'beneath:cursecoal' })],
      ...RARE,
    }),

    quest('lava', {
      title: { ru: 'Огненная река', en: 'A River of Fire' },
      subtitle: { ru: 'Не урони ведро', en: 'Don\'t drop the bucket' },
      desc: {
        ru: [
          'Лаву нельзя носить в деревянном ведре: нужно &6ведро из синей или красной стали&r. Лава бывает разной: обычная, кислая, средняя и основная — годится любая.',
        ],
        en: [
          'Lava can\'t be carried in a wooden bucket: you need a &6blue or red steel bucket&r. Lava comes in kinds: regular, felsic, intermediate and mafic, and any will do.',
        ],
      },
      icon: 'tfc:metal/bucket/blue_steel',
      deps: ['gateway', 'tfc/blue_and_red_steel'],
      tasks: [hasFluid(LAVA, { title: { ru: 'Ведро лавы', en: 'A bucket of lava' }, icon: 'tfc:metal/bucket/blue_steel' })],
      ...RARE,
    }),

    quest('nether_bricks', {
      title: { ru: 'Незерский кирпич', en: 'Nether Bricks' },
      subtitle: { ru: 'Строить можно и в аду', en: 'You can build even in hell' },
      desc: {
        ru: [
          'Незерские камешки валяются под ногами. Обтеши камешек &6зубилом&r — получится незерский кирпич, а четыре кирпича с раствором дают блоки.',
          '',
          'Блэкстоун дробят на кирпичи так же, как обычный камень. Если блэкстоуна нет, его делают из сажи и камня.',
        ],
        en: [
          'Nether pebbles lie underfoot. Shape a pebble with a &6chisel&r to get a nether brick, and bricks with mortar make blocks.',
          '',
          'Blackstone is made into bricks just like regular stone. If you have no blackstone, it can be made from soot and stone.',
        ],
      },
      icon: 'minecraft:nether_bricks',
      deps: ['gateway'],
      tasks: [item('minecraft:nether_bricks', 8)],
      ...COMMON,
    }),

    quest('burpflower', {
      title: { ru: 'Отрыжник', en: 'Burpflower' },
      subtitle: { ru: 'Пардон', en: 'Pardon me' },
      desc: {
        ru: [
          '&6Отрыжник&r растёт по всему Незеру и умеет полезно проклинать блоки. Поставь за ним блок серы — цветок зарядится, пожелтеет, громко рыгнёт и выпустит серный дым в ту сторону, куда смотрит.',
          '',
          'Дым превращает незерский кирпич в &6адский кирпич&r, угольные кучи — в кучи проклятого угля и добавляет гниения в почву душ.',
          '',
          '&cОсторожно:&r железо и сталь взрываются от контакта с серой.',
        ],
        en: [
          'The &6Burpflower&r grows all over the Nether and can put a helpful curse on blocks. Place a sulfur block behind it: the flower charges, turns yellow, burps loudly and lets out sulfur smoke in the direction it faces.',
          '',
          'The smoke turns nether bricks into &6hellbricks&r, charcoal piles into cursecoal piles, and adds decay to soul farmland.',
          '',
          '&cCareful:&r iron and steel explode on contact with sulfur.',
        ],
      },
      icon: 'beneath:burpflower',
      deps: ['nether_bricks'],
      tasks: [item('beneath:burpflower')],
      ...COMMON,
    }),

    quest('hellforge', {
      title: { ru: 'Адская кузня', en: 'The Hellforge' },
      subtitle: { ru: 'Жар, от которого плавится всё', en: 'Heat that melts anything' },
      desc: {
        ru: [
          '&6Адская кузня&r — огромный горн: много топлива, много места и сильный жар. Её строят из 21 &6адского кирпича&r, а в четыре угла по &6блэкстоуновым акведукам&r подводят лаву.',
          '',
          'Центр 3×3 заполняют кучами проклятого угля и поджигают. Топливо и то, что нужно нагреть, кладут в одни и те же слоты — будь осторожен с тем, что кладёшь. Схема есть в &dруководстве&r.',
        ],
        en: [
          'The &6Hellforge&r is a huge forge: lots of fuel, lots of room and fierce heat. It\'s built from 21 &6hellbricks&r, with lava fed into its four corners through &6blackstone aqueducts&r.',
          '',
          'The 3x3 center is filled with cursecoal piles and lit. Fuel and things to heat go into the same slots, so be careful what you put in. The layout is in the &dfield guide&r.',
        ],
      },
      icon: 'beneath:hellbricks',
      deps: ['burpflower', 'nether_ores', 'lava'],
      tasks: [
        item('beneath:hellbricks', 21),
        item('beneath:blackstone_aqueduct', 4),
        observe.block('beneath:hellforge', { title: { ru: 'Разожги адскую кузню', en: 'Light the Hellforge' }, icon: 'beneath:hellbricks' }),
      ],
      ...EPIC,
    }),

    quest('soul_farming', {
      title: { ru: 'Земледелие душ', en: 'Soul Farming' },
      subtitle: { ru: 'Что посеешь…', en: 'As you sow…' },
      desc: {
        ru: [
          'Почву душ можно вспахать в &6пашню душ&r. Вместо азота, фосфора и калия у неё пять начал: Смерть, Разрушение, Гниение, Скорбь и Пламя. Их видно, если держать мотыгу.',
          '',
          'Каждая культура пополняет своё начало и тратит остальные. Погибнуть незерские культуры не могут, но без света не растут. Удобряют их серой, порохом, слезами гаста и огненным порошком.',
          '',
          '&6Призрачный перец&r (Скорбь) — съедобный овощ Незера. Багровые и искажённые корни, незерский нарост и сияцвет тоже можно выращивать.',
        ],
        en: [
          'Soul soil can be tilled into &6soul farmland&r. Instead of nitrogen, phosphorus and potassium it has five nutrients: Death, Destruction, Decay, Sorrow and Flame. They\'re shown while holding a hoe.',
          '',
          'Each crop adds to its own nutrient and consumes the others. Nether crops can\'t die, but they don\'t grow without light. They\'re fertilized with sulfur, gunpowder, ghast tears and blaze powder.',
          '',
          'The &6Ghost Pepper&r (Sorrow) is the Nether\'s edible vegetable. Crimson and warped roots, nether wart and the gleamflower can be grown too.',
        ],
      },
      icon: 'beneath:ghost_pepper',
      deps: ['juicer'],
      tasks: [
        observe.block('beneath:soul_farmland', { title: { ru: 'Пашня душ', en: 'Soul farmland' }, icon: 'minecraft:soul_soil' }),
        item('beneath:ghost_pepper', 4),
      ],
      ...RARE,
    }),

    quest('unposter', {
      title: { ru: 'Грибница', en: 'The Unposter' },
      subtitle: { ru: 'Грибы сами себя не посадят', en: 'Mushrooms won\'t plant themselves' },
      desc: {
        ru: [
          '&6Грибница&r из багровых и искажённых досок и компостера кормит грибы рядом с собой. Положи в неё грибы, слёзы гаста или незерские культуры — раз в день она размножит соседний гриб.',
        ],
        en: [
          'The &6Unposter&r, made of crimson and warped lumber and a composter, feeds the mushrooms next to it. Put mushrooms, ghast tears or nether crops in it, and once a day it multiplies a mushroom nearby.',
        ],
      },
      icon: 'beneath:unposter',
      deps: ['soul_farming'],
      optional: true,
      tasks: [item('beneath:unposter')],
      ...COMMON,
    }),

    quest('cursed_hide', {
      title: { ru: 'Проклятая шкура', en: 'Cursed Hide' },
      subtitle: { ru: 'Даже звери здесь прокляты', en: 'Even the beasts are cursed here' },
      desc: {
        ru: [
          'С хоглинов и страйдеров падает &6проклятая шкура&r. Сама по себе она бесполезна, но флюс и белый краситель очищают её до большой сырой шкуры.',
          '',
          'Ещё в Незере водится &6красный лось&r — присмотрись к нему.',
        ],
        en: [
          'Hoglins and striders drop &6Cursed Hide&r. On its own it\'s useless, but flux and white dye cleanse it into a large raw hide.',
          '',
          'The Nether is also home to the &6Red Elk&r: take a good look at one.',
        ],
      },
      icon: 'beneath:cursed_hide',
      deps: ['gateway'],
      tasks: [
        item('beneath:cursed_hide'),
        observe.entity('beneath:red_elk', { title: { ru: 'Встреть красного лося', en: 'Meet a red elk' }, icon: 'beneath:spawn_egg/red_elk', optional: true }),
      ],
      ...RARE,
    }),

    quest('fortresses', {
      title: { ru: 'Крепости Незера', en: 'Nether Fortresses' },
      subtitle: { ru: 'Чёрные стены', en: 'Black walls' },
      desc: {
        ru: [
          'В Незере стоят &eкрепости, бастионы, лагеря пиглинов и затерянные города&r. Там водятся всполохи, скелеты-иссушители и пиглины.',
          '',
          'В сундуках крепостей и бастионов лежат &6потерянные страницы&r и &6чистые эссенции&r. Пиглины меняют золото на всякую всячину, в том числе на &6жемчуг Края&r.',
        ],
        en: [
          'The Nether holds &efortresses, bastions, piglin camps and lost cities&r. Blazes, wither skeletons and piglins live there.',
          '',
          'Fortress and bastion chests hold &6Lost Pages&r and &6pure essences&r. Piglins trade gold for odds and ends, &6Ender Pearls&r among them.',
        ],
      },
      icon: 'minecraft:nether_brick_fence',
      deps: ['gateway'],
      tasks: [structure(FORTRESSES, { title: { ru: 'Найди крепость Незера', en: 'Find a Nether fortress' }, icon: 'minecraft:nether_brick_fence' })],
      ...EPIC,
    }),

    quest('ancient_altar', {
      title: { ru: 'Древний алтарь', en: 'The Ancient Altar' },
      subtitle: { ru: 'Запретное знание', en: 'Forbidden knowledge' },
      desc: {
        ru: [
          '&6Древний алтарь&r делают из блэкстоуна, золота и чёрного песка. Положи на него чистую &6потерянную страницу&r и щёлкни самоцветом — страница откроет свою цену, награду и наказание.',
          '',
          'Цену раскладывают на другие алтари на том же уровне, в пределах 5 блоков, а затем щёлкают по алтарю со страницей. Не клади лишнего: лишнее тоже может сгореть. В Верхнем мире награда вдвое меньше.',
        ],
        en: [
          'The &6Ancient Altar&r is made from blackstone, gold and black sand. Place a blank &6Lost Page&r on it and click with a gem: the page reveals its cost, reward and punishment.',
          '',
          'The cost is laid out on other altars on the same level within 5 blocks, then you click the altar with the page. Don\'t put out extra: excess may be consumed too. In the Overworld the reward is halved.',
        ],
      },
      icon: 'beneath:ancient_altar',
      deps: ['fortresses'],
      tasks: [item('beneath:lost_page'), item('beneath:ancient_altar')],
      ...RARE,
    }),

    quest('agonizing_fertilizer', {
      title: { ru: 'Мучительное удобрение', en: 'Agonizing Fertilizer' },
      subtitle: { ru: 'Пять начал в одном', en: 'Five nutrients in one' },
      desc: {
        ru: [
          'Чистые эссенции Смерти, Разрушения, Гниения, Скорби и Пламени находят в сундуках крепостей и бастионов. Каждая сама по себе — удобрение для пашни душ, а все пять вместе дают &6мучительное удобрение&r.',
        ],
        en: [
          'Pure essences of Death, Destruction, Decay, Sorrow and Flame are found in fortress and bastion chests. Each one is a fertilizer for soul farmland on its own, and all five together make &6Agonizing Fertilizer&r.',
        ],
      },
      icon: 'beneath:agonizing_fertilizer',
      deps: ['fortresses', 'soul_farming'],
      tasks: [item('beneath:agonizing_fertilizer')],
      ...RARE,
    }),

    quest('netherless', {
      title: { ru: 'Незер на конвейере', en: 'Nether on a Conveyor' },
      subtitle: { ru: 'Зачем спускаться?', en: 'Why go down there?' },
      desc: {
        ru: [
          'Механизмы Create умеют делать дары Незера и без него. Угольный блок, отшлифованный наждаком, становится угольным стержнем. На последовательной сборке стержень несколько раз заливают лавой и прессуют — и получается &6огненный стержень&r.',
          '',
          'Так же получают кварц, песок душ, незерак и другие диковины. Подробности ищи в JEI.',
        ],
        en: [
          'Create machines can make the Nether\'s gifts without it. A coal block polished with sandpaper becomes a coal rod. On a sequenced assembly line, the rod is filled with lava and pressed a few times over, and you get a &6Blaze Rod&r.',
          '',
          'Quartz, soul sand, netherrack and other curiosities are made the same way. Look them up in JEI.',
        ],
      },
      icon: 'minecraft:blaze_rod',
      deps: ['create/advanced_mechanisms'],
      optional: true,
      tasks: [item('create_netherless:coal_rod'), item('minecraft:blaze_rod')],
      ...RARE,
    }),
  ],
});
