// Chapter "husbandry": livestock beyond finding it (TFC field guide: mechanics/animal_husbandry) - familiarity and
// breeding, eggs and nest boxes, shearing, saddles, Sacks 'N Such horseshoes (speed on a horse) and the mob net
// (sns:netable_mobs = #tfc:livestock), carts (moved here from the TFC chapter), the plains horse stable structure.
// Text formatting: &6 - names, &e - where to look, &d - field guide, &r - reset.
const { chapter, quest, item, stat, structure, anyOf, link, reward, lootCrate } = require('../lib');
const { nearFamiliar } = require('../custom');

const COMMON = { rewards: [lootCrate('explore_common')], budget: 1500 };
const RARE = { rewards: [lootCrate('explore_rare')], budget: 4500 };

const HORSESHOES = ['steel', 'black_steel', 'blue_steel', 'red_steel'].map((m) => `sns:metal/horseshoes/${m}`);

module.exports = chapter('husbandry', {
  order: 5,
  group: 'economy',
  title: { ru: 'Животноводство', en: 'Husbandry' },
  subtitle: { ru: 'Скот, кони и повозки', en: 'Livestock, horses and carts' },
  icon: 'tfc:spawn_egg/sheep',
  links: [link('tfc/animals'), link('tfc/dairy'), link('travel/rider')],
  quests: [
    quest('familiarity', {
      title: { ru: 'Приручение', en: 'Familiarity' },
      subtitle: { ru: 'Путь к сердцу лежит через желудок', en: 'The way to the heart is through the stomach' },
      desc: {
        ru: [
          'Скот приручают кормом: у каждого животного своя любимая еда, ищи её в &dруководстве&r. Доверие показывает сердечко над животным (клавиша указана в руководстве). Без корма доверие понемногу падает, но когда контур сердечка становится белым, оно больше не убывает.',
          '',
          'Взрослое животное не приручить полностью, а детёныша — можно. Млекопитающие спариваются, если доверие выше 30% и оба сыты за день, а потомство появляется только через несколько месяцев. Животные стареют: старые годятся только на мясо.',
          '',
          'Докорми любое животное до 30% доверия и постой рядом с ним — квест засчитается.',
        ],
        en: [
          'Livestock is tamed with food: each animal has its favorites, look them up in the &dfield guide&r. Familiarity is shown by a heart over the animal (the key is in the field guide). Without food it slowly drops, but once the heart outline turns white, it no longer decays.',
          '',
          'An adult can\'t be fully familiarized, but a baby can. Mammals mate when familiarity is above 30% and both have been fed that day, and the young are born only months later. Animals age: old ones are only good for meat.',
          '',
          'Feed any animal up to 30% familiarity and stand next to it: the quest will complete.',
        ],
      },
      icon: 'tfc:food/barley_grain',
      deps: ['tfc/animals'],
      tasks: [nearFamiliar(0.3, { title: { ru: 'Доведи доверие животного до 30% и стой рядом', en: 'Raise an animal\'s familiarity to 30% and stand next to it' }, icon: 'tfc:food/barley_grain' })],
      ...COMMON,
    }),

    quest('eggs', {
      title: { ru: 'Курятник', en: 'Henhouse' },
      subtitle: { ru: 'Что было раньше?', en: 'Which came first?' },
      desc: {
        ru: [
          'Куры, утки и перепёлки несут яйца только в &6гнездо&r — найти его они могут сами. Если рядом есть самец, следующее яйцо будет оплодотворённым: в подсказке написано, когда вылупится птенец.',
          '',
          'Яйца варят и жарят, а ещё они нужны в выпечке.',
        ],
        en: [
          'Chickens, ducks and quails lay eggs only in a &6Nest Box&r, which they find on their own. With a male around, the next egg is fertilized: its tooltip says when it will hatch.',
          '',
          'Eggs are boiled and fried, and they\'re needed in baking too.',
        ],
      },
      icon: 'tfc:nest_box',
      deps: ['familiarity'],
      tasks: [item('tfc:nest_box'), item('minecraft:egg', 4)],
      ...COMMON,
    }),

    quest('shearing', {
      title: { ru: 'Стрижка', en: 'Shearing' },
      subtitle: { ru: 'Бе-е-е', en: 'Baa-a-a' },
      desc: {
        ru: [
          'Овцы, альпаки и овцебыки обрастают &6шерстью&r. Взрослое прирученное животное можно остричь &6ножницами&r. Альпаки обрастают быстрее всех, овцебыки — медленнее, зато живут дольше.',
          '',
          'Шерсть прядут на веретене в пряжу, а из пряжи на ткацком станке получается ткань.',
        ],
        en: [
          'Sheep, alpacas and musk oxen grow &6wool&r. A tamed adult can be sheared with &6shears&r. Alpacas regrow it fastest, musk oxen slowest, but they live longer.',
          '',
          'Wool is spun into yarn on a spindle, and a loom turns yarn into cloth.',
        ],
      },
      icon: 'tfc:wool',
      deps: ['familiarity'],
      tasks: [item('tfc:wool', 4)],
      ...COMMON,
    }),

    quest('saddle', {
      title: { ru: 'Седло', en: 'Saddle' },
      subtitle: { ru: 'По коням!', en: 'Mount up!' },
      desc: {
        ru: [
          'Лошадь, осла или мула можно оседлать, когда доверие дойдёт до 15%. &6Седло&r вырезают из кожи. На ослов и мулов вешают сундук или бочку.',
          '',
          'В седле поместятся двое: возьми попутчика.',
        ],
        en: [
          'A horse, donkey or mule can be ridden once familiarity reaches 15%. A &6Saddle&r is cut from leather. Donkeys and mules carry a chest or a barrel.',
          '',
          'Two can share a saddle: take a companion along.',
        ],
      },
      icon: 'minecraft:saddle',
      deps: ['familiarity', 'tfc/leather'],
      tasks: [item('minecraft:saddle')],
      ...COMMON,
    }),

    quest('horseshoes', {
      title: { ru: 'Подковы', en: 'Horseshoes' },
      subtitle: { ru: 'На счастье', en: 'For luck' },
      desc: {
        ru: [
          'Каждую подкову куют отдельно из стали или цветной стали, а четыре собирают в набор. Подкованная лошадь скачет быстрее — свойства видно в подсказке.',
          '',
          'С хорошими подковами лошадь выпрыгнет из обычной загонной ямы, так что лучше привязывай её.',
        ],
        en: [
          'Each horseshoe is forged on its own from steel or colored steel, and four are put together into a set. A shod horse runs faster: see the tooltip.',
          '',
          'With good horseshoes a horse jumps right out of the usual safety pit, so better tie it up.',
        ],
      },
      icon: 'sns:metal/horseshoes/steel',
      deps: ['saddle', 'tfc/steel'],
      tasks: [item(anyOf(HORSESHOES), 1, { title: { ru: 'Любые подковы', en: 'Any horseshoes' }, icon: 'sns:metal/horseshoes/steel' })],
      ...RARE,
    }),

    quest('stable', {
      title: { ru: 'Конюшня', en: 'The Stable' },
      subtitle: { ru: 'Здесь пахнет сеном', en: 'It smells of hay here' },
      desc: {
        ru: [
          'Небольшие конюшни стоят &eна равнинах&r. Загляни: внутри может найтись что-нибудь для твоего коня.',
        ],
        en: [
          'Small stables stand &eon the plains&r. Look inside: there may be something for your steed.',
        ],
      },
      icon: 'minecraft:hay_block',
      deps: ['saddle'],
      optional: true,
      tasks: [structure('smallhorsestable:horse_stable', { title: { ru: 'Найди конюшню', en: 'Find a stable' }, icon: 'minecraft:hay_block' })],
      ...COMMON,
    }),

    quest('mob_net', {
      title: { ru: 'Сеть для животных', en: 'Mob Net' },
      subtitle: { ru: 'Попался!', en: 'Gotcha!' },
      desc: {
        ru: [
          '&6Сеть&r ловит скот: птиц или детёнышей крупных животных. Пойманное животное можно унести в инвентаре и выпустить на новом месте.',
          '',
          'Взрослую корову в сеть не поймать — она слишком большая.',
        ],
        en: [
          'A &6Mob Net&r catches livestock: birds, or the young of larger animals. A caught animal can be carried in your inventory and released somewhere new.',
          '',
          'A grown cow won\'t fit in a net: it\'s too large.',
        ],
      },
      icon: 'sns:mob_net',
      deps: ['familiarity'],
      tasks: [item('sns:mob_net')],
      ...COMMON,
    }),

    quest('carts', {
      from: 'firmalife/carts',
      title: { ru: 'Повозки', en: 'Carts' },
      subtitle: { ru: 'Переезд без хлопот', en: 'Moving made easy' },
      desc: {
        ru: [
          '&6Повозки&r перевозят много вещей, сундуки и даже животных. Лучшее решение для переезда или торговли.',
          '',
          'Запрячь в повозку можно не только лошадь, но и осла или яка.',
        ],
        en: [
          '&6Carts&r carry lots of items, chests and even animals. The best way to move house or trade.',
          '',
          'You can harness not only a horse, but also a donkey or a yak.',
        ],
      },
      icon: 'tfcastikorcarts:supply_cart/oak',
      deps: ['saddle', 'tfc/saw'],
      tasks: [
        item('#tfcastikorcarts:supply_cart', 1, { icon: 'tfcastikorcarts:supply_cart/oak', title: { ru: 'Грузовая повозка', en: 'Supply cart' } }),
        item('#tfcastikorcarts:animal_cart', 1, { icon: 'tfcastikorcarts:animal_cart/oak', title: { ru: 'Повозка для животных', en: 'Animal cart' } }),
      ],
      rewards: [reward('minecraft:lead', 2)],
      budget: 1200,
    }),

    quest('name_tag', {
      title: { ru: 'Бирка с именем', en: 'Name Tag' },
      subtitle: { ru: 'Его зовут Билл', en: 'His name is Bill' },
      desc: {
        ru: [
          'Бирки не делают — их находят &eв сундуках руин и подземелий&r. Дай имя любимому животному.',
          '',
          'Пони Билл одобряет.',
        ],
        en: [
          'Name tags aren\'t made: they\'re found &ein the chests of ruins and dungeons&r. Give a name to your favorite animal.',
          '',
          'Bill the Pony approves.',
        ],
      },
      icon: 'minecraft:name_tag',
      deps: ['familiarity'],
      optional: true,
      tasks: [item('minecraft:name_tag')],
      ...COMMON,
    }),
  ],
});
