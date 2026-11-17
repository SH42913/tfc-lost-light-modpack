// Chapter "travel": see the lands of the world - TFC biomes, climates, heights, seasons, long roads and weather.
// Biome tasks with a list of biomes become a biome tag in the pack datapack (see gen_quests.js).
// Climate, height and season tasks are KubeJS custom tasks from custom.js.
// Text formatting: &6 - names, &e - where to look, &r - reset.
const { chapter, quest, item, anyOf, biome, stat, observe, reward, lootCrate } = require('../lib');
const { climate, altitude, season, distance } = require('../custom');

const COMMON = { rewards: [lootCrate('explore_common')], budget: 1500 };
const RARE = { rewards: [lootCrate('explore_rare')], budget: 4500 };
const EPIC = { rewards: [lootCrate('explore_epic')], budget: 15000 };
const KM = 100000; // centimetres in a kilometre (statistics count cm)

const inBiome = (ids, ru, en, icon) => biome(ids, { title: { ru, en }, icon });

module.exports = chapter('travel', {
  order: 11,
  group: 'world',
  title: { ru: 'Путешественник', en: 'Traveller' },
  subtitle: { ru: 'Земли, климат и дальние дороги', en: 'Lands, climates and long roads' },
  icon: 'sns:hiking_boots',
  quests: [
    quest('first_steps', {
      title: { ru: 'Дорога зовёт', en: 'The Road Calls' },
      subtitle: { ru: 'Дорога уходит вдаль от порога', en: 'The Road goes ever on from the door' },
      desc: {
        ru: [
          'Мир TerraFirmaCraft огромен и разнообразен: равнины и болота, горы и вулканы, пустыни и ледяные пустоши. Климат меняется и с широтой, и с высотой — чем дальше на север или юг, тем холоднее или жарче.',
          '',
          'Для начала просто пройди километр — шагом или бегом. Остальные квесты главы засчитываются, когда ты окажешься в нужном месте.',
        ],
        en: [
          'The world of TerraFirmaCraft is huge and varied: plains and marshes, mountains and volcanoes, deserts and icy wastes. Climate changes with latitude and height: the further north or south, the colder or hotter it gets.',
          '',
          'For a start, just walk or run a kilometre. The other quests of this chapter complete when you reach the right place.',
        ],
      },
      icon: 'sns:hiking_boots',
      tasks: [distance(1, { title: { ru: 'Пройди 1 км', en: 'Walk 1 km' }, icon: 'sns:hiking_boots' })],
      rewards: [reward('tfc:food/cooked_beef', 2)],
      budget: 750,
    }),

    // ---------------- lands ----------------
    quest('plains', {
      title: { ru: 'Широкие равнины', en: 'Wide Plains' },
      subtitle: { ru: 'Здесь пасутся табуны', en: 'Where the herds graze' },
      desc: {
        ru: ['Равнины и низины — лучшее место для первого дома и полей. Здесь легко найти лошадей и пасти скот.'],
        en: ['Plains and lowlands are the best place for your first home and fields. Horses are easy to find and herds easy to graze.'],
      },
      icon: 'minecraft:hay_block',
      deps: ['first_steps'],
      tasks: [inBiome(['tfc:plains', 'tfc:lowlands'], 'Побывай на равнине', 'Visit the plains', 'minecraft:hay_block')],
      ...COMMON,
    }),

    quest('hills', {
      title: { ru: 'Холмы', en: 'Hills' },
      subtitle: { ru: 'Зелёные, как в Хоббитании', en: 'Green as the Shire' },
      desc: {
        ru: ['Холмы и пологие склоны — обычное дело для мира TFC. Говорят, где-то среди них есть норы с круглыми дверями.'],
        en: ['Hills and rolling slopes are common in the TFC world. They say somewhere among them there are holes with round doors.'],
      },
      icon: 'tfc:groundcover/pinecone',
      deps: ['first_steps'],
      tasks: [inBiome(['tfc:hills', 'tfc:rolling_hills'], 'Побывай в холмах', 'Visit the hills', 'tfc:groundcover/pinecone')],
      ...COMMON,
    }),

    quest('marsh', {
      title: { ru: 'Солёные топи', en: 'Salt Marsh' },
      subtitle: { ru: 'Мёртвые огни в воде', en: 'Dead lights in the water' },
      desc: {
        ru: ['В солёных топях вода по колено, а под ногами чавкает. Здесь растут камыш и болотные травы. Не смотри на огни в воде слишком долго.'],
        en: ['In a salt marsh the water is knee-deep and the ground squelches. Reeds and marsh grasses grow here. Don\'t stare at the lights in the water for too long.'],
      },
      icon: 'tfc:plant/cattail',
      deps: ['plains'],
      tasks: [inBiome(['tfc:salt_marsh'], 'Побывай на солёном болоте', 'Visit a salt marsh', 'tfc:plant/cattail')],
      ...COMMON,
    }),

    quest('waters', {
      title: { ru: 'Реки и озёра', en: 'Rivers and Lakes' },
      subtitle: { ru: 'Вода всегда найдёт дорогу', en: 'Water always finds a way' },
      desc: {
        ru: ['Реки текут от гор к морю, а горные озёра лежат высоко среди скал. Вдоль рек удобно путешествовать на лодке.'],
        en: ['Rivers run from the mountains to the sea, and mountain lakes lie high among the rocks. Rivers are handy for travelling by boat.'],
      },
      icon: 'tfc:plant/water_lily',
      deps: ['first_steps'],
      tasks: [
        inBiome(['tfc:river'], 'Побывай у реки', 'Visit a river', 'tfc:plant/water_lily'),
        inBiome(['tfc:lake', 'tfc:mountain_lake', 'tfc:old_mountain_lake', 'tfc:plateau_lake', 'tfc:volcanic_mountain_lake', 'tfc:oceanic_mountain_lake', 'tfc:volcanic_oceanic_mountain_lake'], 'Побывай у озера', 'Visit a lake', 'tfc:plant/water_lily'),
      ],
      ...COMMON,
    }),

    quest('shore', {
      title: { ru: 'Берег моря', en: 'Seashore' },
      subtitle: { ru: 'Крики чаек', en: 'The cry of the gulls' },
      desc: {
        ru: ['На берегу и в приливных отмелях собирают ракушки, мидий и плавник. Тот, кто однажды услышал крик чаек, уже не забудет зов моря.'],
        en: ['On the shore and tidal flats you can gather clams, mussels and driftwood. Whoever has heard the cry of the gulls will never forget the call of the sea.'],
      },
      icon: 'tfc:groundcover/clam',
      deps: ['waters'],
      tasks: [inBiome(['tfc:shore', 'tfc:tidal_flats'], 'Побывай на побережье', 'Visit the coast', 'tfc:groundcover/clam')],
      ...COMMON,
    }),

    quest('ocean', {
      title: { ru: 'Открытое море', en: 'Open Sea' },
      subtitle: { ru: 'За горизонтом — неизвестность', en: 'The unknown beyond the horizon' },
      desc: {
        ru: ['Выйди в открытый океан. Над рифами вода тёплая и прозрачная, а глубже начинаются тёмные бездны и океанские впадины.'],
        en: ['Sail out into the open ocean. Over the reefs the water is warm and clear, further out begin the dark abysses and ocean trenches.'],
      },
      icon: 'tfc:groundcover/seaweed',
      deps: ['shore'],
      tasks: [
        inBiome(['tfc:ocean', 'tfc:ocean_reef'], 'Выйди в океан', 'Sail into the ocean', 'tfc:groundcover/seaweed'),
        inBiome(['tfc:deep_ocean', 'tfc:deep_ocean_trench'], 'Доберись до глубокого океана', 'Reach the deep ocean', 'minecraft:heart_of_the_sea'),
      ],
      ...RARE,
    }),

    quest('highlands', {
      title: { ru: 'Нагорья', en: 'Highlands' },
      subtitle: { ru: 'Ближе к небу', en: 'Closer to the sky' },
      desc: {
        ru: ['Плоскогорья и нагорья лежат высоко над морем. Здесь холоднее, ветренее и видно далеко во все стороны.'],
        en: ['Plateaus and highlands lie high above the sea. It\'s colder and windier here, and you can see far in every direction.'],
      },
      icon: 'tfc:rock/raw/granite',
      deps: ['hills'],
      tasks: [inBiome(['tfc:highlands', 'tfc:plateau'], 'Побывай на нагорье', 'Visit the highlands', 'tfc:rock/raw/granite')],
      ...COMMON,
    }),

    quest('canyons', {
      title: { ru: 'Каньоны', en: 'Canyons' },
      subtitle: { ru: 'Земля, расколотая надвое', en: 'Land split in two' },
      desc: {
        ru: ['Глубокие каньоны прорезают землю. На их стенах видны слои горных пород — отличное место, чтобы поискать руду.'],
        en: ['Deep canyons cut through the land. Their walls show layers of rock, a great place to look for ore.'],
      },
      icon: 'tfc:rock/raw/basalt',
      deps: ['hills'],
      tasks: [inBiome(['tfc:canyons', 'tfc:low_canyons'], 'Побывай в каньоне', 'Visit a canyon', 'tfc:rock/raw/basalt')],
      ...COMMON,
    }),

    quest('badlands', {
      title: { ru: 'Бесплодные земли', en: 'Badlands' },
      subtitle: { ru: 'Здесь хозяйничают орки', en: 'The orcs rule here' },
      desc: {
        ru: ['Красные скалы, сухая земля, ни деревца. В бесплодных землях обитают орки, а в их слоях глины прячутся руды.'],
        en: ['Red cliffs, dry earth, not a single tree. Orcs dwell in the badlands, and ores hide in their clay layers.'],
      },
      icon: 'minecraft:red_sand',
      deps: ['canyons'],
      tasks: [inBiome(['tfc:badlands', 'tfc:inverted_badlands'], 'Побывай в бесплодных землях', 'Visit the badlands', 'minecraft:red_sand')],
      ...RARE,
    }),

    quest('mountains', {
      title: { ru: 'Горы', en: 'Mountains' },
      subtitle: { ru: 'Далеко за Мглистыми горами', en: 'Far over the Misty Mountains' },
      desc: {
        ru: ['Высокие и древние горы — дом гномов и драконьих легенд. В горах живут Фростмо и мудрецы-скульпторы, а под горами скрыты лучшие руды.'],
        en: ['High and ancient mountains are home to dwarves and dragon legends. The Frostmaw and the Sculptor dwell here, and the best ores hide beneath.'],
      },
      icon: 'minecraft:goat_horn',
      deps: ['highlands'],
      tasks: [inBiome(['tfc:mountains', 'tfc:old_mountains', 'tfc:oceanic_mountains'], 'Побывай в горах', 'Visit the mountains', 'minecraft:goat_horn')],
      ...RARE,
    }),

    quest('volcano', {
      title: { ru: 'Огненная гора', en: 'Mountain of Fire' },
      subtitle: { ru: 'Земля дышит огнём', en: 'The earth breathes fire' },
      desc: {
        ru: [
          'Вулканические горы курятся дымом, а из жерл временами вырываются пепел и раскалённые бомбы. У их подножия бьют горячие источники и рождаются редкие минералы.',
          '',
          'Не вздумай бросать туда ничего ценного.',
        ],
        en: [
          'Volcanic mountains smoke, and now and then their craters spew ash and red-hot bombs. Hot springs and rare minerals are born at their feet.',
          '',
          'Don\'t even think about throwing anything precious in there.',
        ],
      },
      icon: 'minecraft:magma_block',
      deps: ['mountains'],
      tasks: [inBiome(['tfc:volcanic_mountains', 'tfc:volcanic_oceanic_mountains'], 'Побывай у вулкана', 'Visit a volcano', 'minecraft:magma_block')],
      ...EPIC,
    }),

    // ---------------- climates ----------------
    quest('desert', {
      title: { ru: 'Пустыня', en: 'Desert' },
      subtitle: { ru: 'Ни капли воды', en: 'Not a drop of water' },
      desc: {
        ru: [
          'В TerraFirmaCraft пустыня — это не биом, а климат: жарко и почти нет дождей. Найди место, где за год выпадает меньше 75 мм осадков, а средняя температура выше 15 °C.',
          '',
          'Возьми с собой побольше воды.',
        ],
        en: [
          'In TerraFirmaCraft a desert is not a biome but a climate: hot and almost rainless. Find a place with under 75 mm of rain a year and an average temperature above 15 °C.',
          '',
          'Bring plenty of water.',
        ],
      },
      icon: 'minecraft:sand',
      deps: ['plains'],
      tasks: [climate({ minTemp: 15, maxRain: 75 }, { title: { ru: 'Стой в жаркой пустыне', en: 'Stand in a hot desert' }, icon: 'minecraft:sand' })],
      ...RARE,
    }),

    quest('jungle', {
      title: { ru: 'Тропический лес', en: 'Rainforest' },
      subtitle: { ru: 'Жарко, влажно, шумно', en: 'Hot, wet and noisy' },
      desc: {
        ru: ['Влажные тропики: средняя температура выше 22 °C и больше 350 мм дождей в год. Здесь растут капоки и бананы, а в чаще водятся ягуары.'],
        en: ['Humid tropics: an average temperature above 22 °C and over 350 mm of rain a year. Kapoks and bananas grow here, and jaguars roam the thicket.'],
      },
      icon: 'tfc:wood/log/kapok',
      deps: ['desert'],
      tasks: [climate({ minTemp: 22, minRain: 350 }, { title: { ru: 'Стой в тропическом лесу', en: 'Stand in a rainforest' }, icon: 'tfc:wood/log/kapok' })],
      ...RARE,
    }),

    quest('tundra', {
      title: { ru: 'Вечная мерзлота', en: 'Permafrost' },
      subtitle: { ru: 'Земли, где не тает снег', en: 'Lands where the snow never melts' },
      desc: {
        ru: ['На холодном краю мира средняя температура ниже −12 °C, а земля промерзает насквозь. Здесь бродят карибу и белые медведи. Одевайся теплее.'],
        en: ['At the cold edge of the world the average temperature is below −12 °C and the ground is frozen through. Caribou and polar bears roam here. Dress warmly.'],
      },
      icon: 'minecraft:ice',
      deps: ['highlands'],
      tasks: [climate({ maxTemp: -12 }, { title: { ru: 'Стой во льдах', en: 'Stand in the frozen wastes' }, icon: 'minecraft:ice' })],
      ...RARE,
    }),

    // ---------------- heights and depths ----------------
    quest('summit', {
      title: { ru: 'Покоритель вершин', en: 'Summit' },
      subtitle: { ru: 'Отсюда видно весь мир', en: 'You can see the whole world from here' },
      desc: {
        ru: ['Поднимись выше 200 блоков. На такой высоте воздух холодный и разреженный, а под тобой проплывают облака.'],
        en: ['Climb above 200 blocks. At this height the air is cold and thin, and clouds drift beneath you.'],
      },
      icon: 'minecraft:feather',
      deps: ['mountains'],
      tasks: [altitude({ min: 200 }, { title: { ru: 'Поднимись выше 200 блоков', en: 'Climb above Y 200' }, icon: 'minecraft:feather' })],
      ...RARE,
    }),

    quest('deep_delve', {
      title: { ru: 'К корням гор', en: 'To the Roots of the Mountains' },
      subtitle: { ru: 'Здесь будят то, что лучше не будить', en: 'Where things best left asleep awaken' },
      desc: {
        ru: ['Спустись ниже −40 блоков, к самым корням мира. Здесь лежат глубинные руды — и древние ужасы, которых не стоит тревожить. Не забудь поставить опоры.'],
        en: ['Go below Y −40, down to the roots of the world. Deep ores lie here, and ancient horrors better left undisturbed. Don\'t forget support beams.'],
      },
      icon: 'tfc:metal/pickaxe/bronze',
      deps: ['first_steps', 'tfc/support_beams'],
      tasks: [altitude({ max: -40 }, { title: { ru: 'Спустись ниже −40 блоков', en: 'Go below Y −40' }, icon: 'tfc:metal/pickaxe/bronze' })],
      ...RARE,
    }),

    // ---------------- seasons ----------------
    quest('first_winter', {
      title: { ru: 'Первая зима', en: 'First Winter' },
      subtitle: { ru: 'Зима близко', en: 'Winter is coming' },
      desc: {
        ru: [
          'В TerraFirmaCraft год идёт своим чередом: весной всё цветёт, летом зреет урожай, осенью пора запасаться, а зимой на полях ничего не растёт.',
          '',
          'Доживи до зимы — декабря, января или февраля по календарю. В южном полушарии в эти месяцы тепло, но квест всё равно засчитается. Позаботься о запасах еды и дров заранее.',
        ],
        en: [
          'In TerraFirmaCraft the year turns in its course: everything blooms in spring, crops ripen in summer, autumn is time to stock up, and nothing grows in the fields in winter.',
          '',
          'Live until winter: December, January or February by the calendar. In the southern hemisphere these months are warm, but the quest still counts. Take care of food and firewood in advance.',
        ],
      },
      icon: 'minecraft:snowball',
      deps: ['first_steps'],
      tasks: [season(['DECEMBER', 'JANUARY', 'FEBRUARY'], { title: { ru: 'Встреть зиму', en: 'Live to see winter' }, icon: 'minecraft:snowball' })],
      ...RARE,
    }),

    quest('spring', {
      title: { ru: 'Весна вернулась', en: 'Spring Returns' },
      subtitle: { ru: 'Пережил зиму — переживёшь всё', en: 'Survive winter, survive anything' },
      desc: {
        ru: ['Снег сходит, на деревьях набухают почки. Ты пережил свою первую зиму — теперь можно и поля засевать.'],
        en: ['The snow melts and buds swell on the trees. You\'ve survived your first winter, now it\'s time to sow the fields.'],
      },
      icon: 'tfc:wood/sapling/oak',
      deps: ['first_winter'],
      tasks: [season(['MARCH', 'APRIL', 'MAY'], { title: { ru: 'Встреть весну', en: 'Live to see spring' }, icon: 'tfc:wood/sapling/oak' })],
      ...RARE,
    }),

    // ---------------- long roads ----------------
    quest('cartographer', {
      title: { ru: 'Картограф', en: 'Cartographer' },
      subtitle: { ru: 'Здесь водятся драконы', en: 'Here be dragons' },
      desc: {
        ru: ['Компас и карта — лучшие друзья путника. Отмечай на карте найденное: путешествие без карты — это просто прогулка.'],
        en: ['A compass and a map are a traveller\'s best friends. Mark what you find: a journey without a map is just a walk.'],
      },
      icon: 'minecraft:filled_map',
      deps: ['first_steps', 'tfc/brass'],
      tasks: [
        item('minecraft:compass'),
        item(anyOf('minecraft:map', 'minecraft:filled_map'), 1, { title: { ru: 'Карта', en: 'A map' }, icon: 'minecraft:map' }),
      ],
      ...RARE,
    }),

    quest('waystone', {
      title: { ru: 'Путевой камень', en: 'Waystone' },
      subtitle: { ru: 'Древняя магия дорог', en: 'Ancient road magic' },
      desc: {
        ru: [
          '&6Путевые камни&r стоят в центре деревень. Прикоснись к камню (ПКМ), чтобы запомнить его, — и сможешь вернуться к нему с другого камня или &6свитком возврата&r.',
        ],
        en: [
          '&6Waystones&r stand in the middle of villages. Touch a waystone (right-click) to remember it, and you\'ll be able to return to it from another waystone or with a &6return scroll&r.',
        ],
      },
      icon: 'waystones:waystone',
      deps: ['first_steps'],
      tasks: [observe.block(['waystones:waystone', 'waystones:mossy_waystone', 'waystones:sandy_waystone'], { title: { ru: 'Найди путевой камень', en: 'Find a waystone' }, icon: 'waystones:waystone' })],
      rewards: [reward('waystones:return_scroll', 2)],
      budget: 5000,
    }),

    quest('own_waystone', {
      title: { ru: 'Свой путевой камень', en: 'Your Own Waystone' },
      subtitle: { ru: 'Дом там, где камень', en: 'Home is where the stone is' },
      desc: {
        ru: [
          'Поставь путевой камень у собственного дома — и любая дорога сможет закончиться у твоего порога.',
          '',
          'Сердце камня — &6камень перемещения&r из жемчуга Края, аметистов и изумруда. Основание складывают из каменных кирпичей и обсидиана.',
        ],
        en: [
          'Put a waystone by your own home, and any road can end at your doorstep.',
          '',
          'The heart of it is a &6warp stone&r made of an ender pearl, amethysts and an emerald. The base is built of stone bricks and obsidian.',
        ],
      },
      icon: 'waystones:warp_stone',
      deps: ['waystone'],
      optional: true,
      tasks: [
        item('waystones:warp_stone'),
        item('waystones:waystone'),
      ],
      rewards: [reward('tfc:gem/emerald', 3)],
      budget: 3000,
    }),

    quest('long_road', {
      title: { ru: 'Сто вёрст', en: 'A Hundred Miles' },
      subtitle: { ru: 'Туда и обратно', en: 'There and back again' },
      desc: {
        ru: ['Пройди пешком 100 километров — шагом или бегом, но не верхом и не на лодке. Ноги гудят, сапоги стёрты, зато ты видел больше, чем любой хоббит из Хоббитании.'],
        en: ['Travel 100 kilometres on foot: walking or running, but not riding or boating. Your legs ache and your boots are worn, but you\'ve seen more than any hobbit of the Shire.'],
      },
      icon: 'sns:hiking_boots',
      deps: ['plains', 'hills', 'waters'],
      tasks: [distance(100, { title: { ru: 'Пройди 100 км', en: 'Walk 100 km' }, icon: 'sns:hiking_boots' })],
      ...EPIC,
    }),

    // Secret: Frodo's road from Bag End to the Cracks of Doom - 1779 miles by Karen Wynn Fonstad's
    // "The Atlas of Middle-earth" (the figure the "Walk to Mordor" challenges use), about 2863 km.
    quest('mount_doom', {
      title: { ru: 'Вот и конец истории', en: 'Here at the End of All Things' },
      subtitle: { ru: 'Орлы!', en: 'The Eagles!' },
      desc: {
        ru: [
          '2863 километра пешком. Ровно столько прошёл один хоббит от круглой зелёной двери до жерла Огненной горы — без коня, без лодки на большей части пути и с очень тяжёлой ношей на шее.',
          '',
          'Ты прошёл столько же. Кольца у тебя, правда, не было, зато и орлов за тобой никто не пришлёт: обратно придётся своими ногами.',
        ],
        en: [
          '2863 kilometres on foot. That is how far one hobbit walked from a round green door to the fires of Mount Doom: no horse, no boat for most of the way, and a very heavy burden around his neck.',
          '',
          'You have walked just as far. You had no Ring to carry, but nobody will send eagles for you either: the way back is on your own two feet.',
        ],
      },
      icon: 'minecraft:feather',
      optional: true,
      hidden: 'invisible',
      tasks: [distance(2863, { title: { ru: 'Пройди 2863 км', en: 'Walk 2863 km' }, icon: 'sns:hiking_boots' })],
      rewards: [lootCrate('boss_trophy')],
      budget: 40000,
    }),

    quest('rider', {
      title: { ru: 'Всадник', en: 'Rider' },
      subtitle: { ru: 'Скачи, как ветер', en: 'Ride like the wind' },
      desc: {
        ru: ['Прирученная лошадь — лучший спутник в дороге. Проскачи верхом 20 километров. Не забывай кормить своего скакуна.'],
        en: ['A tamed horse is the best companion on the road. Ride 20 kilometres. Don\'t forget to feed your steed.'],
      },
      icon: 'minecraft:saddle',
      deps: ['first_steps', 'tfc/animals'],
      tasks: [stat('minecraft:horse_one_cm', 20 * KM, { title: { ru: 'Проскачи 20 км', en: 'Ride 20 km' }, icon: 'minecraft:saddle' })],
      ...RARE,
    }),

    quest('wind', {
      from: 'firmalife/weather2',
      title: { ru: 'Куда дует ветер', en: 'Which Way the Wind Blows' },
      subtitle: { ru: 'Флюгер и анемометр', en: 'Wind vane and anemometer' },
      desc: {
        ru: [
          'Погода в этом мире живёт своей жизнью: ветер меняется, тучи копят влагу, а летом над тёплыми влажными краями гремят грозы.',
          '',
          '&6Флюгер&r показывает направление ветра, а &6анемометр&r — его силу. Их собирают из листов и прутьев любого металла и латунного механизма.',
        ],
        en: [
          'Weather in this world lives its own life: the wind shifts, clouds gather moisture, and in summer thunderstorms roll over warm humid lands.',
          '',
          'A &6wind vane&r shows the wind direction, and an &6anemometer&r its strength. They\'re made of sheets and rods of any metal plus a brass mechanism.',
        ],
      },
      icon: 'tfcweather:metal/wind_vane/copper',
      deps: ['first_steps', 'tfc/brass', 'tfc/metal_anvil'],
      optional: true,
      tasks: [
        item(anyOf('tfcweather:metal/wind_vane/copper', 'tfcweather:metal/wind_vane/bronze', 'tfcweather:metal/wind_vane/bismuth_bronze', 'tfcweather:metal/wind_vane/black_bronze', 'tfcweather:metal/wind_vane/brass', 'tfcweather:metal/wind_vane/bismuth', 'tfcweather:metal/wind_vane/tin', 'tfcweather:metal/wind_vane/zinc', 'tfcweather:metal/wind_vane/nickel', 'tfcweather:metal/wind_vane/gold', 'tfcweather:metal/wind_vane/silver', 'tfcweather:metal/wind_vane/rose_gold', 'tfcweather:metal/wind_vane/sterling_silver', 'tfcweather:metal/wind_vane/wrought_iron', 'tfcweather:metal/wind_vane/cast_iron', 'tfcweather:metal/wind_vane/steel', 'tfcweather:metal/wind_vane/black_steel', 'tfcweather:metal/wind_vane/blue_steel', 'tfcweather:metal/wind_vane/red_steel'), 1, { icon: 'tfcweather:metal/wind_vane/copper', title: { ru: 'Флюгер из любого металла', en: 'A wind vane of any metal' } }),
        item(anyOf('tfcweather:metal/anemometer/copper', 'tfcweather:metal/anemometer/bronze', 'tfcweather:metal/anemometer/bismuth_bronze', 'tfcweather:metal/anemometer/black_bronze', 'tfcweather:metal/anemometer/brass', 'tfcweather:metal/anemometer/bismuth', 'tfcweather:metal/anemometer/tin', 'tfcweather:metal/anemometer/zinc', 'tfcweather:metal/anemometer/nickel', 'tfcweather:metal/anemometer/gold', 'tfcweather:metal/anemometer/silver', 'tfcweather:metal/anemometer/rose_gold', 'tfcweather:metal/anemometer/sterling_silver', 'tfcweather:metal/anemometer/wrought_iron', 'tfcweather:metal/anemometer/cast_iron', 'tfcweather:metal/anemometer/steel', 'tfcweather:metal/anemometer/black_steel', 'tfcweather:metal/anemometer/blue_steel', 'tfcweather:metal/anemometer/red_steel'), 1, { icon: 'tfcweather:metal/anemometer/copper', title: { ru: 'Анемометр из любого металла', en: 'An anemometer of any metal' } }),
      ],
      rewards: [reward('tfc:metal/ingot/brass')],
      budget: 4400,
    }),

    quest('weather', {
      from: 'firmalife/weather2',
      title: { ru: 'Буря надвигается', en: 'A Storm Is Coming' },
      subtitle: { ru: 'Как пережить непогоду', en: 'How to weather the weather' },
      desc: {
        ru: [
          'Бури зависят от климата TerraFirmaCraft и времени года:',
          '- &eгрозы&r — в тёплых влажных краях, чаще всего летом;',
          '- &eпесчаные бури&r — там, где за год выпадает меньше 100 мм осадков;',
          '- &eметели&r — когда температура опускается ниже −2 °C.',
          '',
          '&6Метеостанция&r предупреждает о приближении бурь, а &6отражатель погоды&r разгоняет их вокруг дома. Красную пыль для них мелют из киновари в жёрнове.',
        ],
        en: [
          'Storms depend on the TerraFirmaCraft climate and the season:',
          '- &ethunderstorms&r happen in warm humid lands, mostly in summer;',
          '- &esandstorms&r where less than 100 mm of rain falls a year;',
          '- &eblizzards&r when the temperature drops below −2 °C.',
          '',
          'A &6weather forecast&r block warns about approaching storms, and a &6weather deflector&r keeps them away from your home. Their redstone is ground from cinnabar in a quern.',
        ],
      },
      icon: 'weather2:weather_deflector',
      deps: ['wind', 'tfc/wrought_iron', 'tfc/quern'],
      optional: true,
      tasks: [
        item('weather2:weather_forecast'),
        item('weather2:weather_deflector'),
      ],
      rewards: [reward('tfc:metal/ingot/wrought_iron')],
      budget: 10000,
    }),
  ],
});

