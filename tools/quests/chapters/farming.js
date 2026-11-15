// Chapter "farming": crops, nutrients and fertilizers (TFC field guide: mechanics/crops, fertilizers, composter,
// aqueducts), liquid fertilizers and sprinklers (tfcfertigation guide + barrel recipes), rich soil (survivorsrichsoils:
// Farmer's Delight organic compost per TFC soil quality), tree tapping, syrups and rubber (ArborFirmaCraft guide + recipes).
// Text formatting: &6 - names, &e - where to look, &d - field guide, &r - reset.
const { chapter, quest, item, observe, anyOf, link, lootCrate } = require('../lib');
const { hasFluid } = require('../custom');

const COMMON = { rewards: [lootCrate('explore_common')], budget: 1500 };
const RARE = { rewards: [lootCrate('explore_rare')], budget: 4500 };

const ns = (namespace, ids) => ids.map((id) => `${namespace}:${id}`);
const LIQUID_FERTILIZERS = ns('tfcfertigation', ['compost_tea', 'bone_extract', 'guano_extract', 'wood_ash_lye', 'sylvite_brine',
  'saltpeter_solution', 'shellfish_extract', 'nitrogen_solution', 'phosphorus_solution', 'potassium_solution', 'fertigation_blend']);
const SOIL_QUALITY = ['barren', 'normal', 'reclaimed', 'enriched', 'lush'];

module.exports = chapter('farming', {
  order: 2,
  group: 'economy',
  title: { ru: 'Земледелие', en: 'Farming' },
  subtitle: { ru: 'Поле, удобрения и древесный сок', en: 'Fields, fertilizers and tree sap' },
  icon: 'tfc:seeds/wheat',
  links: [link('tfc/aqueducts'), link('exploration/giant_trees'), link('firmalife/planters'), link('firmalife/greenhouse')],
  quests: [
    quest('seeds', {
      title: { ru: 'Семена', en: 'Seeds' },
      subtitle: { ru: 'Кто не сеет, тот не жнёт', en: 'No sowing, no reaping' },
      desc: {
        ru: [
          'Семена берут с &eдиких культур&r: сломай дикое растение — и получишь семена. Созревшая культура, которую побило погодой или которую оставили сгнить, тоже уходит в семена.',
          '',
          'Для грядки нужна &6мотыга&r: каменную оббивают из камня, как и прочие орудия.',
        ],
        en: [
          'Seeds come from &ewild crops&r: break a wild plant and you get seeds. A mature crop killed by weather or left to rot goes to seed too.',
          '',
          'A bed needs a &6hoe&r: a stone one is knapped from rock like any other tool.',
        ],
      },
      icon: 'tfc:seeds/wheat',
      deps: ['tfc/food'],
      tasks: [
        item('#tfc:seeds', 1, { title: { ru: 'Любые семена', en: 'Any seeds' }, icon: 'tfc:seeds/wheat' }),
        item('#tfc:hoes', 1, { title: { ru: 'Любая мотыга', en: 'Any hoe' }, icon: 'tfc:stone/hoe/sedimentary' }),
      ],
      ...COMMON,
    }),

    quest('first_harvest', {
      title: { ru: 'Первый урожай', en: 'First Harvest' },
      subtitle: { ru: 'Хлеб наш насущный', en: 'Our daily bread' },
      desc: {
        ru: [
          'У каждой культуры своя &6температура&r и &6влажность&r: смотри их в &dруководстве&r и сажай по климату. Рис растёт только в воде глубиной в один блок, а фасоли и томатам нужна палка, чтобы виться.',
          '',
          'Питательных веществ три: &6азот&r, &6фосфор&r и &6калий&r. Каждая культура любит одно из них — съев его, она растёт быстрее и даёт больше урожая. Их уровень видно, если держать мотыгу.',
        ],
        en: [
          'Each crop has its own &6temperature&r and &6hydration&r range: check them in the &dfield guide&r and plant for your climate. Rice grows only in water one block deep, and beans and tomatoes need a stick to climb.',
          '',
          'There are three nutrients: &6nitrogen&r, &6phosphorus&r and &6potassium&r. Each crop loves one of them: eating it, the crop grows faster and yields more. Their levels show while holding a hoe.',
        ],
      },
      icon: 'tfc:food/wheat',
      deps: ['seeds'],
      tasks: [
        item('#tfc:foods/grains', 8, { title: { ru: '8 зерна', en: '8 grain' }, icon: 'tfc:food/wheat' }),
        item('#tfc:foods/vegetables', 8, { title: { ru: '8 овощей', en: '8 vegetables' }, icon: 'tfc:food/carrot' }),
      ],
      ...COMMON,
    }),

    quest('compost', {
      title: { ru: 'Компост', en: 'Compost' },
      subtitle: { ru: 'Ничто не пропадает', en: 'Nothing goes to waste' },
      desc: {
        ru: [
          '&6Компостер&r из досок и земли превращает отходы в лучшее удобрение. Ему нужны и &6зелёные&r отходы (растения, зерно, фрукты и овощи), и &6коричневые&r (листья, зола, джут, тыквы, хвоя).',
          '',
          'Компост зреет около 12 дней; со снегом сверху быстрее, в слишком сухом или сыром климате медленнее. &cМясо и кости портят компост&r: гнилой компост убивает растения.',
        ],
        en: [
          'A &6Composter&r of lumber and dirt turns waste into the best fertilizer. It needs both &6green&r waste (plants, grain, fruit and vegetables) and &6brown&r (leaves, ash, jute, pumpkins, pinecones).',
          '',
          'Compost takes about 12 days; faster with snow on top, slower in a climate that\'s too dry or too wet. &cMeat and bones spoil it&r: rotten compost kills plants.',
        ],
      },
      icon: 'tfc:composter',
      deps: ['first_harvest'],
      tasks: [item('tfc:composter'), item('tfc:compost', 4)],
      ...COMMON,
    }),

    quest('fertilizers', {
      title: { ru: 'Удобрения', en: 'Fertilizers' },
      subtitle: { ru: 'Азот, фосфор, калий', en: 'Nitrogen, phosphorus, potassium' },
      desc: {
        ru: [
          'Удобрение кладут на грядку или на растение. Что чего даёт:',
          '- &6компост&r: азот 40, фосфор 20, калий 40;',
          '- &6гуано&r (глубоко под землёй и на галечных берегах): азот 80, фосфор 50, калий 10;',
          '- &6селитра&r: азот 10, калий 40; &6сильвин&r: калий 50;',
          '- &6древесная зола&r: фосфор 10, калий 30; &6костная мука&r: фосфор 10.',
        ],
        en: [
          'Fertilizer is applied to farmland or to a crop. What each gives:',
          '- &6compost&r: nitrogen 40, phosphorus 20, potassium 40;',
          '- &6guano&r (deep underground and on gravelly shores): nitrogen 80, phosphorus 50, potassium 10;',
          '- &6saltpeter&r: nitrogen 10, potassium 40; &6sylvite&r: potassium 50;',
          '- &6wood ash&r: phosphorus 10, potassium 30; &6bone meal&r: phosphorus 10.',
        ],
      },
      icon: 'tfc:groundcover/guano',
      deps: ['compost'],
      tasks: [item(anyOf(['tfc:groundcover/guano', 'tfc:powder/saltpeter', 'tfc:powder/sylvite', 'tfc:powder/wood_ash', 'minecraft:bone_meal']), 8,
        { title: { ru: '8 любых удобрений, кроме компоста', en: '8 fertilizers other than compost' }, icon: 'tfc:groundcover/guano' })],
      ...COMMON,
    }),

    // ---------------- fertigation ----------------
    quest('liquid_fertilizer', {
      title: { ru: 'Жидкие удобрения', en: 'Liquid Fertilizers' },
      subtitle: { ru: 'Разведи и полей', en: 'Dissolve and water' },
      desc: {
        ru: [
          'Удобрение можно развести в &6бочке&r с пресной водой: компост даёт компостный чай, костная мука — костную вытяжку, гуано, зола, сильвин, селитра и моллюски — свои растворы.',
          '',
          'Жидкое удобрение разбрызгивают дождеватели или разносят инжекторы по акведукам.',
        ],
        en: [
          'Fertilizer can be dissolved in a &6barrel&r of fresh water: compost makes compost tea, bone meal makes bone extract, and guano, ash, sylvite, saltpeter and shellfish make their own solutions.',
          '',
          'Liquid fertilizer is sprayed by sprinkler racks or carried through aqueducts by injectors.',
        ],
      },
      icon: 'tfcfertigation:compost_tea_bucket',
      deps: ['fertilizers', 'tfc/barrels'],
      tasks: [hasFluid(LIQUID_FERTILIZERS, { title: { ru: 'Ёмкость с жидким удобрением', en: 'A container of liquid fertilizer' }, icon: 'tfcfertigation:compost_tea_bucket' })],
      ...COMMON,
    }),

    quest('sprinkler', {
      title: { ru: 'Дождеватель', en: 'Sprinkler Rack' },
      subtitle: { ru: 'Пусть льёт', en: 'Let it pour' },
      desc: {
        ru: [
          '&6Дождеватель&r делают из стойки с латунным механизмом. Над соплом ставят открытую бочку с жидким удобрением — он поливает грядки двумя блоками ниже основания в радиусе 2.',
          '',
          'Shift+ПКМ по соплу включает и выключает его. Каждая добавочная &6ножка&r поднимает сопло и увеличивает радиус на 1. Обычная вода не подойдёт.',
        ],
        en: [
          'A &6Sprinkler Rack&r is built from a rack with brass mechanisms. Put an open barrel of liquid fertilizer above the nozzle, and it sprays the farmland two blocks below its base within radius 2.',
          '',
          'Shift+right-click the nozzle to toggle it. Each extra &6rack leg&r raises the nozzle and adds 1 to the radius. Plain water won\'t work.',
        ],
      },
      icon: 'tfcfertigation:drip_irrigation_rack',
      deps: ['liquid_fertilizer', 'tfc/brass'],
      tasks: [item('tfcfertigation:drip_irrigation_rack')],
      ...RARE,
    }),

    quest('injector', {
      title: { ru: 'Инжектор удобрений', en: 'Fertigation Injector' },
      subtitle: { ru: 'Удобрение по трубам', en: 'Fertilizer through the pipes' },
      desc: {
        ru: [
          '&6Инжектор&r ставят прямо на заполненный водой акведук: он сам находит грядки вдоль сети акведуков и подкармливает их. В нём помещается 10 вёдер.',
          '',
          'Если поставить инжектор на медную трубу Firmalife, он будет кормить кадки под её дождевателями.',
        ],
        en: [
          'The &6Injector&r goes right on top of a filled aqueduct: it finds the farmland along the aqueduct network and feeds it. It holds 10 buckets.',
          '',
          'Placed on a Firmalife copper pipe, it feeds the planters under that pipe\'s sprinklers.',
        ],
      },
      icon: 'tfcfertigation:fertigation_injector',
      deps: ['sprinkler', 'tfc/aqueducts'],
      tasks: [item('tfcfertigation:fertigation_injector')],
      ...RARE,
    }),

    quest('herbicide', {
      title: { ru: 'Гербицид', en: 'Herbicide' },
      subtitle: { ru: 'Сорняки, прочь!', en: 'Weeds, begone!' },
      desc: {
        ru: [
          'Гнилой компост, разведённый в бочке с водой, становится &6гербицидом&r. В дождевателе или инжекторе он выжигает сорняки, траву и культуры.',
          '',
          'Хорошо, чтобы расчистить поле. Плохо, если перепутать бочки.',
        ],
        en: [
          'Rotten compost dissolved in a barrel of water becomes &6herbicide&r. In a sprinkler or an injector it burns away weeds, grass and crops.',
          '',
          'Good for clearing a field. Bad if you mix up the barrels.',
        ],
      },
      icon: 'tfcfertigation:rotten_compost_herbicide_bucket',
      deps: ['sprinkler'],
      optional: true,
      tasks: [hasFluid(['tfcfertigation:rotten_compost_herbicide'], { title: { ru: 'Ёмкость с гербицидом', en: 'A container of herbicide' }, icon: 'tfcfertigation:rotten_compost_herbicide_bucket' })],
      ...COMMON,
    }),

    quest('rich_soil', {
      title: { ru: 'Богатая почва', en: 'Rich Soil' },
      subtitle: { ru: 'Земля, что кормит', en: 'The land that feeds' },
      desc: {
        ru: [
          '&6Органический компост&r собирают из почвы, двух богатых зелёных и двух богатых коричневых отходов, гнилого мяса, компоста и гнилого компоста. Качество почвы в рецепте определяет вид компоста.',
          '',
          'Поставленный блок со временем превращается в &6богатую почву&r. На ней культуры растут быстрее, а вспаханная она становится богатой пашней.',
        ],
        en: [
          '&6Organic Compost&r is made from soil, two rich green and two rich brown waste items, rotten flesh, compost and rotten compost. The soil quality in the recipe sets the kind of compost.',
          '',
          'Once placed, the block slowly turns into &6Rich Soil&r. Crops grow faster on it, and tilled it becomes rich farmland.',
        ],
      },
      icon: 'survivorsrichsoils:rich_soil/normal',
      deps: ['compost'],
      tasks: [
        item(anyOf(SOIL_QUALITY.map((q) => `survivorsrichsoils:organic_compost/${q}`)), 1, { title: { ru: 'Органический компост', en: 'Organic compost' }, icon: 'survivorsrichsoils:organic_compost/normal' }),
        observe.block(SOIL_QUALITY.map((q) => `survivorsrichsoils:rich_soil/${q}`), { title: { ru: 'Дождись богатой почвы', en: 'Wait for rich soil' }, icon: 'survivorsrichsoils:rich_soil/normal' }),
      ],
      ...RARE,
    }),

    // ---------------- tree tapping ----------------
    quest('tree_tap', {
      title: { ru: 'Подсочка', en: 'Tree Tapping' },
      subtitle: { ru: 'Сладкие слёзы клёна', en: 'The sweet tears of the maple' },
      desc: {
        ru: [
          '&6Краник&r куют из кованого железа и вбивают в середину ствола не ниже трёх блоков. Под краник ставят открытую бочку.',
          '',
          'Клён и берёза дают сок весной, при температуре от −4 до 6 °C, когда тает снег. Гевея даёт латекс при температуре выше 22 °C, каучуконосный фикус — от 12 °C, но медленнее.',
        ],
        en: [
          'A &6Tree Tap&r is forged from wrought iron and placed in the middle of a trunk at least three blocks tall. An open barrel goes under it.',
          '',
          'Maple and birch give sap in spring at -4 to 6 °C, when the snow melts. Hevea gives latex above 22 °C, the rubber fig from 12 °C but slower.',
        ],
      },
      icon: 'afc:tree_tap',
      deps: ['tfc/wrought_iron', 'tfc/barrels'],
      tasks: [
        item('afc:tree_tap'),
        hasFluid(['afc:maple_sap', 'afc:birch_sap', 'afc:latex'], { title: { ru: 'Сок или латекс', en: 'Sap or latex' }, icon: 'afc:bucket/maple_sap' }),
      ],
      ...RARE,
    }),

    quest('syrup', {
      title: { ru: 'Кленовый сироп', en: 'Maple Syrup' },
      subtitle: { ru: 'Пятьдесят вёдер на одно', en: 'Fifty buckets for one' },
      desc: {
        ru: [
          'Сок уваривают в &6котелке&r дважды: сначала в концентрат, потом в сироп. Не забудь положить палку, чтобы помешивать, — иначе не закипит.',
          '',
          'Из 50 вёдер кленового сока выходит одно ведро сиропа, из берёзового — вдвое меньше. Сироп в кувшине превращается в сахар.',
        ],
        en: [
          'Sap is boiled down in a &6pot&r twice: first into concentrate, then into syrup. Don\'t forget a stick to stir, or it won\'t boil.',
          '',
          '50 buckets of maple sap make one bucket of syrup, birch sap half as much. Syrup in a jug turns into sugar.',
        ],
      },
      icon: 'afc:maple_sugar',
      deps: ['tree_tap', 'tfc/pot'],
      tasks: [item(anyOf(['afc:maple_sugar', 'afc:birch_sugar']), 1, { title: { ru: 'Кленовый или берёзовый сахар', en: 'Maple or birch sugar' }, icon: 'afc:maple_sugar' })],
      ...RARE,
    }),

    quest('rubber', {
      title: { ru: 'Каучук', en: 'Rubber' },
      subtitle: { ru: 'Знать бы, зачем он', en: 'If only we knew what for' },
      desc: {
        ru: [
          'Латекс, сваренный в котелке с серой, застывает в &6каучук&r. С Firmalife из него делают герметичные кирпичи.',
        ],
        en: [
          'Latex boiled in a pot with sulfur sets into &6rubber&r. With Firmalife it makes sealed bricks.',
        ],
      },
      icon: 'afc:rubber_bar',
      deps: ['tree_tap'],
      optional: true,
      tasks: [item('afc:rubber_bar')],
      ...COMMON,
    }),
  ],
});
