// Chapter "kitchen": Farmer's Delight (with farmerstfc / Survivor's Delight), dishes, and TFC food preservation.
// Preservation is checked by food traits (custom.js hasFoodTrait): salted, brined, pickled, smoked, dried, grilled, baked.
// Text formatting: &6 - names, &d - Field Guide, &r - reset.
const { chapter, quest, item, anyOf, reward } = require('../lib');
const { hasFoodTrait, hasRottenFood } = require('../custom');

const GRAINS = ['barley', 'maize', 'oat', 'rice', 'rye', 'wheat'];
const JAM_FRUITS = ['banana', 'blackberry', 'blueberry', 'bunchberry', 'cherry', 'cloudberry', 'cranberry', 'elderberry', 'gooseberry',
  'green_apple', 'lemon', 'melon_slice', 'olive', 'orange', 'peach', 'plum', 'pumpkin_chunks', 'raspberry', 'red_apple', 'snowberry',
  'strawberry', 'wintergreen_berry'];
const SKILLETS = ['copper', 'copper_silver', 'copper_tin', 'cast_iron', 'steel', 'black_steel', 'blue_steel', 'red_steel', 'farmer']
  .map((m) => `survivorsdelight:skillet/${m}`);

const trait = (traits, ru, en, icon) => hasFoodTrait(traits, { title: { ru, en }, icon });

module.exports = chapter('kitchen', {
  order: 3,
  group: 'economy',
  title: { ru: 'Кухня', en: 'Kitchen' },
  subtitle: { ru: 'Готовить и сохранять', en: 'Cooking and preserving' },
  icon: 'farmersdelight:cooking_pot',
  quests: [
    // ---------------- tools ----------------
    quest('cutting_board', {
      title: { ru: 'Разделочная доска', en: 'Cutting Board' },
      subtitle: { ru: 'Острый нож — половина успеха', en: 'A sharp knife is half the job' },
      desc: {
        ru: [
          'На &6разделочной доске&r ножом режут мясо на фарш и бекон, рыбу на филе, овощи на ломтики. Положи продукт на доску и нажми по нему ПКМ с ножом в руке.',
          '',
          'Подойдёт любой нож TFC, даже каменный.',
        ],
        en: [
          'On a &6cutting board&r a knife turns meat into mince and bacon, fish into fillets and vegetables into slices. Put food on the board and right-click it with a knife.',
          '',
          'Any TFC knife will do, even a stone one.',
        ],
      },
      icon: 'farmersdelight:cutting_board',
      deps: ['tfc/food', 'tfc/saw'],
      tasks: [
        item('farmersdelight:cutting_board'),
        item(anyOf('farmersdelight:minced_beef', 'farmersdelight:bacon', 'farmersdelight:chicken_cuts', 'farmersdelight:mutton_chops',
          'farmersdelight:cod_slice', 'farmersdelight:salmon_slice'), 1, { icon: 'farmersdelight:minced_beef', title: { ru: 'Нарезка с доски', en: 'Something cut on the board' } }),
      ],
      rewards: [reward('tfc:food/cooked_beef', 4)],
      budget: 1000,
    }),

    quest('cooking_pot', {
      title: { ru: 'Кухонный котёл', en: 'Cooking Pot' },
      subtitle: { ru: 'Сердце любой кухни', en: 'The heart of every kitchen' },
      desc: {
        ru: [
          'В &6кухонном котле&r готовят рагу, супы, пасту и десерты. Поставь его на огонь или на &6плиту&r, сложи ингредиенты и подожди. Котёл сваривают из металлических листов на наковальне.',
        ],
        en: [
          'A &6cooking pot&r makes stews, soups, pasta and desserts. Put it on a fire or a &6stove&r, add ingredients and wait. The pot is welded from metal sheets on an anvil.',
        ],
      },
      icon: 'farmersdelight:cooking_pot',
      deps: ['cutting_board', 'tfc/metal_anvil'],
      tasks: [
        item('farmersdelight:cooking_pot'),
        item('farmersdelight:stove'),
      ],
      rewards: [reward('tfc:powder/salt', 8), reward('tfc:ceramic/bowl', 4)],
      budget: 2500,
    }),

    quest('skillet', {
      title: { ru: 'Сковорода', en: 'Skillet' },
      subtitle: { ru: 'Глазунья по утрам', en: 'Fried eggs every morning' },
      desc: {
        ru: [
          'На &6сковороде&r жарят прямо на огне — или держат её в руке, разогрев на плите. Survivor\'s Delight даёт сковороды из металлов TFC: медь, бронза, сталь…',
          '',
          'А ещё сковородой можно огреть врага. Проверено гномами.',
        ],
        en: [
          'A &6skillet&r fries right over the fire, or in your hand once heated on a stove. Survivor\'s Delight adds skillets of TFC metals: copper, bronze, steel…',
          '',
          'You can also whack an enemy with it. Dwarf-tested.',
        ],
      },
      icon: 'survivorsdelight:skillet/copper',
      deps: ['cutting_board', 'tfc/metal_anvil'],
      tasks: [item(anyOf('farmersdelight:skillet', ...SKILLETS), 1, { icon: 'survivorsdelight:skillet/copper', title: { ru: 'Сковорода из любого металла', en: 'A skillet of any metal' } })],
      rewards: [reward('tfc:food/cooked_beef', 6)],
      budget: 1500,
    }),

    // ---------------- dishes ----------------
    quest('stew', {
      title: { ru: 'Похлёбка', en: 'Stew' },
      subtitle: { ru: 'Варёная, жареная, тушёная', en: 'Boil \'em, mash \'em, stick \'em in a stew' },
      desc: {
        ru: ['Свари в котле густое рагу или суп. Ну что за путешествие без горячей похлёбки у костра?'],
        en: ['Cook a thick stew or a soup in the pot. What\'s a journey without a hot stew by the fire?'],
      },
      icon: 'farmersdelight:beef_stew',
      deps: ['cooking_pot'],
      tasks: [item(anyOf('farmersdelight:beef_stew', 'farmersdelight:chicken_soup', 'farmersdelight:vegetable_soup', 'farmersdelight:fish_stew',
        'farmersdelight:baked_cod_stew', 'farmersdelight:pumpkin_soup', 'farmersdelight:noodle_soup', 'farmersdelight:onion_soup', 'farmersdelight:bone_broth'),
      1, { icon: 'farmersdelight:beef_stew', title: { ru: 'Любое рагу или суп из котла', en: 'Any stew or soup from the pot' } })],
      rewards: [reward('tfc:seeds/onion', 4)],
      budget: 600,
    }),

    quest('pasta', {
      title: { ru: 'Паста', en: 'Pasta' },
      subtitle: { ru: 'Тесто, нож и немного терпения', en: 'Dough, a knife and some patience' },
      desc: {
        ru: ['Нарежь тесто на доске — получится сырая паста. Свари её в котле с фрикадельками, бараниной или овощами.'],
        en: ['Cut dough on the board to get raw pasta. Cook it in the pot with meatballs, mutton or vegetables.'],
      },
      icon: 'farmersdelight:pasta_with_meatballs',
      deps: ['cooking_pot'],
      tasks: [
        item('farmersdelight:raw_pasta'),
        item(anyOf('farmersdelight:pasta_with_meatballs', 'farmersdelight:pasta_with_mutton_chop', 'farmersdelight:vegetable_noodles', 'farmersdelight:squid_ink_pasta'),
          1, { icon: 'farmersdelight:pasta_with_meatballs', title: { ru: 'Любое блюдо из пасты', en: 'Any pasta dish' } }),
      ],
      rewards: [reward('tfc:seeds/tomato', 4)],
      budget: 600,
    }),

    quest('salad', {
      title: { ru: 'Салат', en: 'Salad' },
      subtitle: { ru: 'Витамины для путника', en: 'Vitamins for the traveller' },
      desc: {
        ru: ['Свежий салат из овощей или фруктов — быстрый способ подтянуть фрукты и овощи в рационе. Для вкуса добавь заправку из Survivor\'s Delight.'],
        en: ['A fresh vegetable or fruit salad is a quick way to boost fruit and vegetables in your diet. Add Survivor\'s Delight dressing for taste.'],
      },
      icon: 'farmersdelight:mixed_salad',
      deps: ['cutting_board'],
      tasks: [item(anyOf('farmersdelight:mixed_salad', 'farmersdelight:fruit_salad'), 1, { icon: 'farmersdelight:mixed_salad', title: { ru: 'Овощной или фруктовый салат', en: 'A vegetable or fruit salad' } })],
      rewards: [reward('tfc:ceramic/bowl', 3)],
      budget: 1000,
    }),

    quest('sandwich', {
      from: 'terrafirmacraft/sandwich',
      title: { ru: 'Сэндвич', en: 'Sandwich' },
      subtitle: { ru: 'Перекус в дорогу', en: 'A snack for the road' },
      desc: {
        ru: [
          'Сэндвич объединяет питательность всех своих ингредиентов, а храниться может дольше, чем по отдельности. Положи между двумя ломтями хлеба мясо, сыр или овощи — или намажь джем.',
        ],
        en: [
          'A sandwich combines the nutrition of all its ingredients and can keep longer than they would separately. Put meat, cheese or vegetables between two slices of bread, or spread some jam.',
        ],
      },
      icon: 'tfc:food/wheat_bread_sandwich',
      deps: ['cutting_board'],
      tasks: [item(anyOf(...GRAINS.map((g) => `tfc:food/${g}_bread_sandwich`), ...GRAINS.map((g) => `tfc:food/${g}_bread_jam_sandwich`),
        'farmersdelight:chicken_sandwich', 'farmersdelight:hamburger', 'farmersdelight:bacon_sandwich', 'farmersdelight:egg_sandwich', 'farmersdelight:mutton_wrap'),
      1, { icon: 'tfc:food/wheat_bread_sandwich', title: { ru: 'Любой сэндвич', en: 'Any sandwich' } })],
      rewards: [reward('tfc:food/cheese', 2)],
      budget: 800,
    }),

    quest('feast', {
      title: { ru: 'Неожиданная вечеринка', en: 'An Unexpected Party' },
      subtitle: { ru: 'Тринадцать гномов к ужину', en: 'Thirteen dwarves for dinner' },
      desc: {
        ru: [
          'Гости нагрянули без предупреждения, и все голодны. Приготовь праздничное блюдо: жареную курицу, медовый окорок, пастуший пирог или фаршированную тыкву. Поставь его на стол — каждый гость отрежет себе порцию.',
        ],
        en: [
          'Guests arrived unannounced, and they\'re all hungry. Make a feast dish: roast chicken, honey-glazed ham, shepherd\'s pie or stuffed pumpkin. Put it on the table and every guest cuts a serving.',
        ],
      },
      icon: 'farmersdelight:roast_chicken_block',
      deps: ['stew', 'pasta'],
      tasks: [item(anyOf('farmersdelight:roast_chicken_block', 'farmersdelight:honey_glazed_ham_block', 'farmersdelight:shepherds_pie_block',
        'farmersdelight:stuffed_pumpkin_block'), 1, { icon: 'farmersdelight:roast_chicken_block', title: { ru: 'Праздничное блюдо', en: 'A feast dish' } })],
      rewards: [reward('sns:lunchbox')],
      budget: 3000,
    }),

    // ---------------- preserving ----------------
    quest('salting', {
      title: { ru: 'Засолка', en: 'Salting' },
      subtitle: { ru: 'Соль — золото кухни', en: 'Salt is the gold of the kitchen' },
      desc: {
        ru: [
          'Свежее мясо портится за несколько дней. Посыпь его &6солью&r на верстаке — и оно пролежит заметно дольше. Соль добывают из галита или выпаривают из морской воды.',
          '',
          'Каждый способ хранения TFC отмечает в описании еды. Подробнее — в &dруководстве&r, раздел о сохранении продуктов.',
        ],
        en: [
          'Fresh meat goes bad in a few days. Sprinkle it with &6salt&r on a crafting grid and it keeps much longer. Salt comes from halite or from evaporated seawater.',
          '',
          'TFC shows every preservation method in the food tooltip. See the food preservation section of the &dfield guide&r.',
        ],
      },
      icon: 'tfc:powder/salt',
      deps: ['tfc/food'],
      tasks: [trait(['tfc:salted'], 'Солёная еда', 'Salted food', 'tfc:powder/salt')],
      rewards: [reward('tfc:powder/salt', 8)],
      budget: 1200,
    }),

    quest('brining', {
      title: { ru: 'Рассол и маринад', en: 'Brine and Pickles' },
      subtitle: { ru: 'Огурчики на зиму', en: 'Pickles for winter' },
      desc: {
        ru: [
          'Замочи еду в бочке с &6рассолом&r (одна часть уксуса на девять частей солёной воды), затем запечатай в бочке с &6уксусом&r — получишь маринованные продукты, которые хранятся очень долго. Уксус делают в бочке: фрукт и 250 мБ алкоголя.',
        ],
        en: [
          'Soak food in a barrel of &6brine&r (one part vinegar to nine parts salt water), then seal it in a barrel of &6vinegar&r to get pickles that keep for a very long time. Vinegar is made in a barrel: a fruit and 250 mB of alcohol.',
        ],
      },
      icon: 'tfc:wood/barrel/oak',
      deps: ['salting', 'tfc/barrels'],
      tasks: [
        trait(['tfc:brined'], 'Еда в рассоле', 'Brined food', 'tfc:powder/salt'),
        trait(['tfc:pickled'], 'Маринованная еда', 'Pickled food', 'tfc:wood/barrel/oak'),
      ],
      rewards: [reward('tfc:powder/salt', 8), reward('tfc:ceramic/jug')],
      budget: 1800,
    }),

    quest('smoking', {
      title: { ru: 'Коптильня', en: 'Smokehouse' },
      subtitle: { ru: 'Дым и терпение', en: 'Smoke and patience' },
      desc: {
        ru: [
          'Firmalife позволяет коптить мясо и сыр. Мясо сначала замочи в бочке с &6рассолом&r, сыр можно сразу. Натяни &6шерстяную нить&r не выше четырёх блоков над костром и подвесь на неё продукты — через 8 часов они прокоптятся.',
          '',
          'Топи костёр только брёвнами: от торфа еда станет отвратительной на вкус.',
        ],
        en: [
          'Firmalife lets you smoke meat and cheese. Brine meat in a barrel first; cheese can go straight in. Place &6wool string&r within four blocks above a firepit and hang the food on it: in 8 hours it will be smoked.',
          '',
          'Burn only logs in the firepit: peat makes the food disgusting.',
        ],
      },
      icon: 'tfc:food/cooked_beef',
      deps: ['brining'],
      tasks: [trait(['firmalife:smoked'], 'Копчёная еда', 'Smoked food', 'tfc:food/cooked_beef')],
      rewards: [reward('tfc:blubber', 4)],
      budget: 1000,
    }),

    quest('drying_food', {
      title: { ru: 'Сушёные припасы', en: 'Dried Provisions' },
      subtitle: { ru: 'Лёгкие и не портятся', en: 'Light and long-lasting' },
      desc: {
        ru: ['Высуши фрукты или травы на &6циновке&r под солнцем. Сухофрукты весят мало и долго не портятся — лучший запас для дальней дороги.'],
        en: ['Dry fruit or herbs on a &6drying mat&r in the sun. Dried fruit weighs little and lasts long: the best supply for a long road.'],
      },
      icon: 'firmalife:drying_mat',
      deps: ['firmalife/drying'],
      tasks: [trait(['firmalife:dried'], 'Сушёная еда', 'Dried food', 'firmalife:drying_mat')],
      rewards: [reward('firmalife:raw_honey', 2)],
      budget: 1200,
    }),

    quest('grilling', {
      title: { ru: 'На углях', en: 'Over the Coals' },
      subtitle: { ru: 'С дымком', en: 'With a smoky taste' },
      desc: {
        ru: ['Еда, приготовленная на решётке над костром, хранится дольше обычной: в 1,66 раза против 1,33 у простого костра. Приготовь что-нибудь на гриле.'],
        en: ['Food cooked on a grill over a firepit keeps longer than usual: 1.66 times against 1.33 for a plain firepit. Grill something.'],
      },
      icon: 'tfc:wrought_iron_grill',
      deps: ['tfc/grill'],
      optional: true,
      tasks: [trait(['tfc:wood_grilled', 'tfc:charcoal_grilled'], 'Еда с гриля', 'Grilled food', 'tfc:wrought_iron_grill')],
      rewards: [reward('tfc:food/cooked_beef', 4)],
      budget: 1000,
    }),

    quest('baking', {
      title: { ru: 'Из печи', en: 'Fresh from the Oven' },
      subtitle: { ru: 'Пахнет свежим хлебом', en: 'Smells of fresh bread' },
      desc: {
        ru: ['Хлеб и пироги из печи Firmalife хранятся дольше: выпечка из печи портится на десятую часть медленнее.'],
        en: ['Bread and pies from a Firmalife oven keep longer: oven-baked food decays a tenth slower.'],
      },
      icon: 'tfc:food/wheat_bread',
      deps: ['firmalife/oven'],
      tasks: [trait(['firmalife:oven_baked'], 'Выпечка из печи', 'Oven-baked food', 'tfc:food/wheat_bread')],
      rewards: [reward('tfc:food/cheese', 2), reward('firmalife:raw_honey')],
      budget: 1400,
    }),

    quest('jam', {
      title: { ru: 'Варенье', en: 'Jam' },
      subtitle: { ru: 'Лето в банке', en: 'Summer in a jar' },
      desc: {
        ru: [
          'Свари фрукты или ягоды с сахаром в горшке и разлей по стеклянным банкам. Запечатанная банка варенья не портится, а намазанное на хлеб варенье превращает его в сэндвич.',
        ],
        en: [
          'Cook fruit or berries with sugar in a pot and pour them into glass jars. A sealed jar of jam never spoils, and jam spread on bread turns it into a sandwich.',
        ],
      },
      icon: 'tfc:jar/strawberry',
      deps: ['tfc/pot', 'tfc/glassblowing'],
      tasks: [item(anyOf(JAM_FRUITS.map((f) => `tfc:jar/${f}`)), 1, { icon: 'tfc:jar/strawberry', title: { ru: 'Запечатанная банка варенья', en: 'A sealed jar of jam' } })],
      rewards: [reward('firmalife:raw_honey', 2)],
      budget: 1200,
    }),

    quest('pemmican', {
      title: { ru: 'Пеммикан', en: 'Pemmican' },
      subtitle: { ru: 'Не лембас, но тоже сытно', en: 'Not lembas, but filling all the same' },
      desc: {
        ru: [
          'Пеммикан — смесь сушёного мяса, жира и ягод. Он почти не портится и отлично подходит для долгих походов. Одного куска хватит, чтобы идти полдня.',
        ],
        en: [
          'Pemmican is a mix of dried meat, fat and berries. It barely spoils and is perfect for long journeys. One piece keeps you walking for half a day.',
        ],
      },
      icon: 'pemmican:pemmican',
      deps: ['salting', 'drying_food'],
      tasks: [item('pemmican:pemmican', 4)],
      rewards: [reward('sns:lunchbox')],
      budget: 3000,
    }),

    quest('rotten', {
      title: { ru: 'Что-то сдохло', en: 'Something Died in Here' },
      subtitle: { ru: 'И, кажется, в твоей сумке', en: 'In your bag, apparently' },
      desc: {
        ru: [
          'Запах ни с чем не спутаешь: в инвентаре что-то сгнило. Еда в этом мире портится, и быстрее всего — сырое мясо и рыба.',
          '',
          'Гниль ещё пригодится в компосте, а вот есть её не стоит. Держи соль, чтобы такое случалось пореже.',
        ],
        en: [
          'There\'s no mistaking the smell: something in your inventory has rotted. Food spoils in this world, and raw meat and fish go first.',
          '',
          'Rot is still good for compost, but don\'t eat it. Here\'s some salt, so it happens less often.',
        ],
      },
      icon: 'minecraft:rotten_flesh',
      optional: true,
      hidden: 'invisible',
      tasks: [hasRottenFood({ title: { ru: 'Сгнои еду в инвентаре', en: 'Let food rot in your inventory' }, icon: 'minecraft:rotten_flesh' })],
      rewards: [reward('tfc:powder/salt', 8)],
    }),
  ],
});
