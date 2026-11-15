// Chapter "brewing": TFC alcohol, Firmalife mead and wine, TFC Aged Alcohol.
// Drinks are fluids, so tasks check any fluid container in the inventory (custom.js hasFluid): buckets, jugs, wine bottles.
// Text formatting: &6 - names, &d - Field Guide, &r - reset.
const { chapter, quest, item, anyOf, reward } = require('../lib');
const { hasFluid } = require('../custom');

const WOODS = ['acacia', 'ash', 'aspen', 'birch', 'blackwood', 'chestnut', 'douglas_fir', 'hickory', 'kapok', 'mangrove', 'maple', 'oak',
  'palm', 'pine', 'rosewood', 'sequoia', 'spruce', 'sycamore', 'white_cedar', 'willow'];
const TFC_DRINKS = ['beer', 'cider', 'rum', 'sake', 'vodka', 'whiskey', 'corn_whiskey', 'rye_whiskey'];
const AGED = [...TFC_DRINKS, 'mead'].map((d) => `tfcagedalcohol:aged_${d}`);

const drink = (fluids, ru, en, icon) => hasFluid(fluids, { title: { ru, en }, icon });
// One small quest per drink: what it's brewed from and a reward of bottles.
const brew = (key, fluid, icon, title, subtitle, ru, en, extra = {}) => quest(key, {
  title, subtitle,
  desc: { ru: [ru], en: [en] },
  icon,
  deps: ['first_brew'],
  tasks: [drink([].concat(fluid), `Ёмкость: ${title.ru.toLowerCase()}`, `A container of ${title.en.toLowerCase()}`, icon)],
  rewards: [reward('tfc:silica_glass_bottle', 3)],
  budget: 600,
  ...extra,
});

module.exports = chapter('brewing', {
  order: 4,
  group: 'economy',
  title: { ru: 'Напитки', en: 'Brewing' },
  subtitle: { ru: 'Пиво, вино и выдержка', en: 'Beer, wine and patience' },
  icon: 'tfc:bucket/beer',
  quests: [
    quest('first_brew', {
      title: { ru: 'Хмельное', en: 'Spirits' },
      subtitle: { ru: 'Брожение — древнейшая из наук', en: 'Fermentation is the oldest of sciences' },
      desc: {
        ru: [
          'Алкоголь в TerraFirmaCraft варят в &6запечатанной бочке&r: мука, фрукты или сахар плюс вода, и через три дня брожения напиток готов. Ячмень даёт пиво, яблоки — сидр, рис — саке, картофель — водку, пшеница, рожь и кукуруза — разные виски, сахар — ром.',
          '',
          'Напитки согревают и поднимают настроение, но не увлекайся: пьяному море по колено, а пещера — по пояс.',
        ],
        en: [
          'Alcohol in TerraFirmaCraft is brewed in a &6sealed barrel&r: flour, fruit or sugar plus water, and after three days of fermentation the drink is ready. Barley makes beer, apples cider, rice sake, potatoes vodka, wheat, rye and maize various whiskeys, sugar rum.',
          '',
          'Drinks warm you up and lift your spirits, but don\'t overdo it: a drunk man fears neither sea nor cave.',
        ],
      },
      icon: 'tfc:bucket/beer',
      deps: ['tfc/barrels'],
      tasks: [drink(TFC_DRINKS.map((d) => `tfc:${d}`), 'Любой алкоголь', 'Any alcohol', 'tfc:bucket/beer')],
      rewards: [reward('tfc:ceramic/jug', 2)],
      budget: 1200,
    }),

    brew('beer', 'tfc:beer', 'tfc:bucket/beer',
      { ru: 'Пиво', en: 'Beer' }, { ru: 'Как в «Гарцующем пони»', en: 'Like at the Prancing Pony' },
      'Ячменная мука и вода в бочке. Говорят, лучшее пиво варят в одной трактирной гостинице у Большого тракта — проверь, сможешь ли ты лучше.',
      'Barley flour and water in a barrel. They say the best beer is brewed at a certain inn on the Great East Road: see if you can do better.'),
    brew('cider', 'tfc:cider', 'tfc:bucket/cider',
      { ru: 'Сидр', en: 'Cider' }, { ru: 'Яблочный дух', en: 'Spirit of the apple' },
      'Красные или зелёные яблоки и вода в бочке. Лёгкий и освежающий напиток.',
      'Red or green apples and water in a barrel. A light and refreshing drink.'),
    brew('rum', 'tfc:rum', 'tfc:bucket/rum',
      { ru: 'Ром', en: 'Rum' }, { ru: 'Пятнадцать человек на сундук мертвеца', en: 'Fifteen men on a dead man\'s chest' },
      'Сахар и вода в бочке. Сахар выжимают из тростника — его выращивают в тёплом климате.',
      'Sugar and water in a barrel. Sugar is pressed from sugarcane, which grows in warm climates.'),
    brew('sake', 'tfc:sake', 'tfc:bucket/sake',
      { ru: 'Саке', en: 'Sake' }, { ru: 'Рисовое вино', en: 'Rice wine' },
      'Рисовая мука и вода в бочке. Рису нужны тепло и много воды.',
      'Rice flour and water in a barrel. Rice needs warmth and plenty of water.'),
    brew('vodka', 'tfc:vodka', 'tfc:bucket/vodka',
      { ru: 'Водка', en: 'Vodka' }, { ru: 'Согреет в мороз', en: 'Keeps you warm in the cold' },
      'Картофель и вода в бочке. Крепкий напиток для долгих зим.',
      'Potatoes and water in a barrel. A strong drink for long winters.'),
    brew('whiskey', ['tfc:whiskey', 'tfc:corn_whiskey', 'tfc:rye_whiskey'], 'tfc:bucket/whiskey',
      { ru: 'Виски', en: 'Whiskey' }, { ru: 'Гномы оценят', en: 'The dwarves will approve' },
      'Пшеничная, ржаная или кукурузная мука и вода в бочке — получится виски, ржаной виски или бурбон. Подойдёт любой.',
      'Wheat, rye or maize flour and water in a barrel make whiskey, rye whiskey or corn whiskey. Any of them will do.'),

    quest('mead', {
      title: { ru: 'Медовуха', en: 'Mead' },
      subtitle: { ru: 'Как в золотых чертогах Эдораса', en: 'As in the golden halls of Edoras' },
      desc: {
        ru: [
          'Медовуху сбраживают из мёда и воды. Её подают в королевских чертогах конных народов — и в любом доме, где держат пчёл.',
        ],
        en: [
          'Mead is fermented from honey and water. It is served in the royal halls of the horse-lords, and in any home that keeps bees.',
        ],
      },
      icon: 'firmalife:bucket/mead',
      deps: ['first_brew', 'firmalife/beekeeping'],
      tasks: [drink(['firmalife:mead'], 'Ёмкость с медовухой', 'A container of mead', 'firmalife:bucket/mead')],
      rewards: [reward('firmalife:raw_honey', 2)],
      budget: 1200,
    }),

    quest('aging', {
      title: { ru: 'Выдержка', en: 'Aging' },
      subtitle: { ru: 'Время — лучший винодел', en: 'Time is the best brewer' },
      desc: {
        ru: [
          'Любой напиток станет лучше, если запечатать его в бочке надолго: через 24 дня получится &6выдержанный&r алкоголь, крепче и благороднее молодого.',
          '',
          'Терпение, путник. Хорошее не бывает быстрым.',
        ],
        en: [
          'Any drink gets better if sealed in a barrel for a long time: after 24 days you get &6aged&r alcohol, stronger and finer than young.',
          '',
          'Patience, traveller. Good things never come quickly.',
        ],
      },
      icon: 'tfcagedalcohol:bucket/aged_whiskey',
      deps: ['first_brew'],
      tasks: [drink(AGED, 'Любой выдержанный напиток', 'Any aged drink', 'tfcagedalcohol:bucket/aged_whiskey')],
      rewards: [reward('tfc:gem/emerald', 2)],
      budget: 2000,
    }),

    quest('cellar_master', {
      title: { ru: 'Хозяин погреба', en: 'Cellar Master' },
      subtitle: { ru: 'Погреба короля лесных эльфов', en: 'The cellars of the Elvenking' },
      desc: {
        ru: [
          'Собери коллекцию выдержанных напитков: пиво, виски и медовуху. В погребах одного лесного короля стражники так увлеклись дегустацией, что проспали побег целой дюжины гномов в бочках.',
        ],
        en: [
          'Collect aged beer, whiskey and mead. In the cellars of a certain woodland king, the guards got so carried away tasting the wine that they slept through a dozen dwarves escaping in barrels.',
        ],
      },
      icon: 'tfc:wood/barrel/oak',
      deps: ['aging', 'mead', 'beer', 'whiskey'],
      optional: true,
      tasks: [
        drink(['tfcagedalcohol:aged_beer'], 'Выдержанное пиво', 'Aged beer', 'tfcagedalcohol:bucket/aged_beer'),
        drink(['tfcagedalcohol:aged_whiskey', 'tfcagedalcohol:aged_rye_whiskey', 'tfcagedalcohol:aged_corn_whiskey'], 'Выдержанный виски', 'Aged whiskey', 'tfcagedalcohol:bucket/aged_whiskey'),
        drink(['tfcagedalcohol:aged_mead'], 'Выдержанная медовуха', 'Aged mead', 'tfcagedalcohol:bucket/aged_mead'),
      ],
      rewards: [reward('tfc:metal/ingot/gold'), reward('tfc:gem/emerald', 2)],
      budget: 6000,
    }),

    // ---------------- wine ----------------
    quest('vineyard', {
      title: { ru: 'Виноградник', en: 'Vineyard' },
      subtitle: { ru: 'Лоза любит солнце', en: 'The vine loves the sun' },
      desc: {
        ru: [
          'Дикий красный и белый виноград растёт почти везде, где можно жить: от 0 до 30 °C и при 125–500 мм осадков.',
          '',
          'Лозе нужна &6шпалера&r: поставь по два столбика друг на друга через два блока и натяни между ними джутовое волокно. Виноград цветёт в июне, а плодоносит в июле.',
        ],
        en: [
          'Wild red and white grapes grow almost everywhere livable: from 0 to 30 °C and 125–500 mm of rain.',
          '',
          'The vine needs a &6trellis&r: stack two posts, then two more two blocks away, and string jute fiber between them. Grapes flower in June and fruit in July.',
        ],
      },
      icon: 'firmalife:food/red_grapes',
      deps: ['first_brew', 'firmalife/fruit_trees'],
      tasks: [
        item('firmalife:grape_trellis_post', 4),
        item(anyOf('firmalife:food/red_grapes', 'firmalife:food/white_grapes'), 16, { icon: 'firmalife:food/red_grapes', title: { ru: 'Красный или белый виноград', en: 'Red or white grapes' } }),
      ],
      rewards: [reward('tfc:jute_fiber', 16)],
      budget: 600,
    }),

    quest('wine_press', {
      title: { ru: 'Давильня', en: 'Winepress' },
      subtitle: { ru: 'Попрыгай как следует', en: 'Jump like you mean it' },
      desc: {
        ru: [
          'Засыпь виноград в &6давильную бочку&r и попрыгай на ней 16 раз. Раздавленный виноград запечатай в бочке на 5 дней, чтобы он забродил, а затем отожми сок на &6прессе&r. Четыре грозди дают бутылку вина.',
        ],
        en: [
          'Put grapes in a &6stomping barrel&r and jump on it 16 times. Seal the smashed grapes in a barrel for 5 days to ferment, then press the juice in a &6barrel press&r. Four grapes make a bottle of wine.',
        ],
      },
      icon: 'firmalife:wood/stomping_barrel/oak',
      deps: ['vineyard'],
      tasks: [
        item(anyOf(WOODS.map((w) => `firmalife:wood/stomping_barrel/${w}`)), 1, { icon: 'firmalife:wood/stomping_barrel/oak', title: { ru: 'Давильная бочка', en: 'Stomping barrel' } }),
        item(anyOf(WOODS.map((w) => `firmalife:wood/barrel_press/${w}`)), 1, { icon: 'firmalife:wood/barrel_press/oak', title: { ru: 'Пресс', en: 'Barrel press' } }),
      ],
      rewards: [reward('tfc:ceramic/jug', 2)],
      budget: 1200,
    }),

    quest('wine', {
      title: { ru: 'Вино', en: 'Wine' },
      subtitle: { ru: 'Красное из Дорвиниона', en: 'Red wine of Dorwinion' },
      desc: {
        ru: [
          'Вино разливают в &6винные бутылки&r из небесцветного стекла (вулканического, гематитового или оливинового) и затыкают &6пробкой&r. Пробку делают, замочив обработанные пиломатериалы в известковой воде на сутки.',
          '',
          'Только красный или только белый виноград даёт красное или белое вино, их смесь — розовое. В закупоренной бутылке вино продолжает стареть.',
        ],
        en: [
          'Wine is poured into &6wine bottles&r of non-silica glass (volcanic, hematitic or olivine) and stopped with a &6cork&r. A cork is made by soaking treated lumber in limewater for a day.',
          '',
          'Red or white grapes alone give red or white wine, a mix gives rosé. Wine keeps aging while the bottle is corked.',
        ],
      },
      icon: 'firmalife:volcanic_wine_bottle',
      deps: ['wine_press', 'tfc/glassblowing'],
      tasks: [drink(['firmalife:red_wine', 'firmalife:white_wine', 'firmalife:rose_wine'], 'Красное, белое или розовое вино', 'Red, white or rosé wine', 'firmalife:volcanic_wine_bottle')],
      rewards: [reward('tfc:gem/emerald', 2)],
      budget: 2000,
    }),

    quest('fine_wine', {
      title: { ru: 'Изысканные вина', en: 'Fine Wines' },
      subtitle: { ru: 'Для особых случаев', en: 'For special occasions' },
      desc: {
        ru: [
          'Добавь в белое вино сахар — получится &6десертное&r. Добавь &6тиражную смесь&r из закваски и подсластителя — получится &6игристое&r. Самое время поставить в погребе винную полку.',
        ],
        en: [
          'Add sugar to white wine to make &6dessert wine&r. Add a &6tirage mixture&r of yeast and sweetener to make &6sparkling wine&r. Time to put a wine shelf in your cellar.',
        ],
      },
      icon: 'firmalife:olivine_wine_bottle',
      deps: ['wine'],
      optional: true,
      tasks: [
        drink(['firmalife:dessert_wine'], 'Десертное вино', 'Dessert wine', 'firmalife:olivine_wine_bottle'),
        drink(['firmalife:sparkling_wine'], 'Игристое вино', 'Sparkling wine', 'firmalife:hematitic_wine_bottle'),
      ],
      rewards: [reward('tfc:metal/ingot/gold')],
      budget: 4000,
    }),
  ],
});
