// Chapter "tfc": TerraFirmaCraft progression from the stone age to blue/red steel.
// Imported from TerraFirmaAdventure (Heracles, see `from`) by import_heracles.js, then reworked by hand:
// dependencies follow the real TFC tech tree, rewards are TFC items sized by `budget` (tools/economy units).
// Text formatting: &6 - item/mechanic names, &d - Field Guide, &r - reset.
const { chapter, quest, item, anyOf, kill, observe, checkmark, reward, lootCrate } = require('../lib');
const { hasFluid } = require('../custom');

const STONE = ['igneous_extrusive', 'igneous_intrusive', 'metamorphic', 'sedimentary'];
const BRONZES = ['bronze', 'bismuth_bronze', 'black_bronze'];
// #tfc:foods/cooked_meats without beef (quest rewards hand out cooked beef)
const COOKED_MEATS = ['pork', 'chicken', 'mutton', 'shellfish', 'cod', 'tropical_fish', 'bluegill', 'rainbow_trout', 'lake_trout',
  'largemouth_bass', 'smallmouth_bass', 'crappie', 'salmon', 'bear', 'calamari', 'horse_meat', 'frog_legs', 'turtle', 'pheasant', 'turkey',
  'peafowl', 'grouse', 'venison', 'wolf', 'rabbit', 'fox', 'hyena', 'duck', 'quail', 'chevon', 'gran_feline', 'camelidae'];

module.exports = chapter('tfc', {
  order: 0,
  group: 'progress',
  title: 'TerraFirmaCraft',
  subtitle: { ru: 'От камня до цветной стали', en: 'From stone to colored steel' },
  icon: 'tfc:metal/pickaxe/copper',
  quests: [
    // ---------------- stone age ----------------
    quest('welcome', {
      from: 'terrafirmacraft/start',
      title: { ru: 'Добро пожаловать в Lost Light', en: 'Welcome to Lost Light' },
      subtitle: { ru: 'Начало пути', en: 'The journey begins' },
      desc: {
        ru: [
          'Мир &6TerraFirmaCraft&r суров: здесь нельзя срубить дерево рукой, еда портится, а металл придётся добывать, плавить и ковать самому.',
          '',
          'Квесты проведут тебя по основным этапам: от каменных инструментов до синей и красной стали. Подробности о каждой механике есть в &dруководстве TerraFirmaCraft&r — держи его, оно пригодится не раз.',
          '',
          'Опасное это дело — выходить за порог: ступишь на дорогу, и неизвестно, куда она тебя унесёт. Удачи, путник!',
        ],
        en: [
          'The world of &6TerraFirmaCraft&r is harsh: you can\'t punch trees, food rots, and metal has to be mined, smelted and forged by hand.',
          '',
          'These quests walk you through the main stages, from stone tools to blue and red steel. Every mechanic is explained in the &dTerraFirmaCraft field guide&r: take it, you\'ll need it often.',
          '',
          'It\'s a dangerous business, going out your door: you step onto the road, and there\'s no knowing where you might be swept off to. Good luck, traveller!',
        ],
      },
      icon: 'patchouli:guide_book',
      tasks: [checkmark()],
      rewards: [
        reward('patchouli:guide_book', 1, { nbt: { 'patchouli:book': 'tfc:field_guide' }, title: { ru: 'Руководство TerraFirmaCraft', en: 'TerraFirmaCraft Field Guide' } }),
      ],
    }),

    quest('sticks_and_stones', {
      from: 'terrafirmacraft/test2',
      title: { ru: 'Палки и камни', en: 'Sticks and Stones' },
      subtitle: { ru: 'Голыми руками дерево не добудешь', en: 'Bare hands won\'t cut it' },
      desc: {
        ru: [
          'Собери с земли несколько камешков. С камнями в руке нажми ПКМ, чтобы открыть окно &6оббивки&r и выточить навершие инструмента.',
          '',
          'Так получится нож, топор и лопата. Кирку и меч из камня не сделать.',
        ],
        en: [
          'Pick up a few loose rocks. With rocks in hand, right-click to open the &6knapping&r screen and shape a tool head.',
          '',
          'This way you can make a knife, an axe and a shovel. A pickaxe or a sword can\'t be made of stone.',
        ],
      },
      icon: 'tfc:stone/axe/sedimentary',
      deps: ['welcome'],
      tasks: [
        item('#tfc:knives', 1, { icon: 'tfc:stone/knife/sedimentary', title: { ru: 'Любой нож', en: 'Any knife' } }),
        item('#tfc:axes', 1, { icon: 'tfc:stone/axe/sedimentary', title: { ru: 'Любой топор', en: 'Any axe' } }),
        item('#tfc:shovels', 1, { icon: 'tfc:stone/shovel/sedimentary', title: { ru: 'Любая лопата', en: 'Any shovel' } }),
      ],
      rewards: [reward('tfc:food/cooked_beef', 1), reward('tfc:straw', 16)],
      budget: 600,
    }),

    quest('fire', {
      from: 'terrafirmacraft/test7',
      title: { ru: 'Дар Прометея', en: 'Gift of Prometheus' },
      subtitle: { ru: 'Разведи костёр', en: 'Light a fire' },
      desc: {
        ru: [
          'Огонь — один из самых ценных даров Прометея людям. В TerraFirmaCraft его добывают без лишних хлопот.',
          '',
          'Сделай &6примитивное огниво&r из палок. Брось на землю бревно и три палки, затем зажми ПКМ с огнивом в руке.',
          '',
          'На костре можно готовить еду и зажигать &6факелы&r, а прогоревшие дрова оставляют &6древесную золу&r.',
        ],
        en: [
          'Fire is one of the most precious gifts Prometheus gave to people. In TerraFirmaCraft it\'s easy to make.',
          '',
          'Craft a &6firestarter&r from sticks. Drop a log and three sticks on the ground, then hold right-click on them with the firestarter.',
          '',
          'A firepit cooks food and lights &6torches&r, and burnt fuel leaves &6wood ash&r behind.',
        ],
      },
      icon: 'tfc:firepit',
      deps: ['sticks_and_stones'],
      tasks: [
        item('tfc:firestarter'),
        item('tfc:torch'),
        item('tfc:powder/wood_ash'),
      ],
      rewards: [reward('tfc:food/cooked_beef', 2)],
      budget: 700,
    }),

    quest('food', {
      from: 'terrafirmacraft/food',
      title: { ru: 'Еда', en: 'Food' },
      subtitle: { ru: 'А как насчёт второго завтрака?', en: 'What about second breakfast?' },
      desc: {
        ru: [
          'Еда не только утоляет голод, но и наполняет &6рацион&r, от которого зависят здоровье и сила персонажа.',
          '',
          'Питательных веществ пять: фрукты, овощи, белки, злаки и молочные продукты. Чем выше их общий уровень, тем больше у тебя здоровья, а при скудном рационе оно падает.',
          '',
          'Считается только недавно съеденное, так что питаться нужно разнообразно и постоянно.',
          '',
          'Добудь и зажарь на костре мясо или рыбу. Говядина из наград не считается: нужна своя добыча.',
        ],
        en: [
          'Food not only satisfies hunger but also fills your &6nutrition&r, which affects health and strength.',
          '',
          'There are five nutrients: fruit, vegetables, protein, grain and dairy. The higher they all are, the more health you have, and a poor diet lowers it.',
          '',
          'Only recent meals count, so eat a varied diet and keep it up.',
          '',
          'Hunt or fish and cook your catch over a firepit. The beef from quest rewards doesn\'t count: bring your own game.',
        ],
      },
      icon: 'tfc:food/cooked_rabbit',
      deps: ['fire'],
      tasks: [
        // any cooked meat or fish (rabbits depend on the climate) except beef: earlier quests reward cooked beef,
        // which would complete this one at once
        item(anyOf(COOKED_MEATS.map((m) => 'tfc:food/cooked_' + m)), 3,
          { title: { ru: '3 куска жареного мяса или рыбы (кроме говядины)', en: '3 pieces of cooked meat or fish (not beef)' }, icon: 'tfc:food/cooked_rabbit' }),
      ],
      rewards: [reward('tfc:powder/salt', 4)],
      budget: 600,
    }),

    // thatch bed first: it's assembled from thatch and a hide in the stone age, while the straw bed is a 3x2 recipe
    // that needs a workbench (copper saw)
    quest('thatch_bed', {
      from: 'terrafirmacraft/simple_bed',
      title: { ru: 'Лежанка', en: 'Thatch Bed' },
      subtitle: { ru: 'Лучше, чем голая земля', en: 'Better than bare ground' },
      desc: {
        ru: [
          'Человеку нужен сон. Если долго не спать, начнутся зевота, слабость, а потом и видения — тех, кто не спит слишком долго, может хватить удар.',
          '',
          'Первая постель — лежанка из двух снопов соломы и большой шкуры. Спать можно в любое время суток: чем сильнее устал, тем дольше сон.',
        ],
        en: [
          'People need sleep. Stay awake too long and you\'ll start yawning, weakening, then seeing things, and those who never rest may have a heart attack.',
          '',
          'Your first bed is a thatch bed made of two thatch blocks and a large hide. You can sleep at any time of day: the more tired you are, the longer you sleep.',
        ],
      },
      icon: 'tfc:thatch_bed',
      deps: ['sticks_and_stones'],
      // the bed is assembled in the world and has no loot table, so it never exists as an item
      tasks: [observe.block('tfc:thatch_bed', { title: { ru: 'Собери лежанку', en: 'Build a thatch bed' }, icon: 'tfc:thatch_bed' })],
      rewards: [reward('tfc:food/cooked_beef', 1)],
      budget: 250,
    }),

    quest('straw_bed', {
      title: { ru: 'Соломенная кровать', en: 'Straw Bed' },
      subtitle: { ru: 'Постель, которую можно унести', en: 'A bed you can carry' },
      desc: {
        ru: [
          'Когда появится &6верстак&r, из шести пучков &6соломы&r можно сделать кровать. В отличие от лежанки, её можно сломать и забрать с собой.',
        ],
        en: [
          'Once you have a &6workbench&r, six bunches of &6straw&r make a bed. Unlike a thatch bed, you can break it and take it with you.',
        ],
      },
      icon: 'tfcsleep:straw_bed',
      deps: ['thatch_bed', 'saw'],
      tasks: [item('tfcsleep:straw_bed')],
      rewards: [reward('tfc:straw', 16)],
      budget: 300,
    }),

    quest('animals', {
      from: 'terrafirmacraft/animals',
      title: { ru: 'Животные', en: 'Animals' },
      subtitle: { ru: 'Твои лучшие друзья', en: 'Your best friends' },
      desc: {
        ru: [
          'Почти любое животное TerraFirmaCraft можно приручить (только не пытайся проделать это с крокодилами).',
          '',
          'Прирученный скот даёт ресурсы, на ездовых животных можно путешествовать, а кошки просто добавляют уюта. Найди любой скот: лошадь, корову, овцу, козу, свинью, альпаку, яка или птицу — кто водится в твоих краях.',
        ],
        en: [
          'Almost any TerraFirmaCraft animal can be tamed (just don\'t try it with crocodiles).',
          '',
          'Livestock gives resources, mounts carry you across the world, and cats just make home cosier. Find any livestock: a horse, cow, sheep, goat, pig, alpaca, yak or fowl, whatever lives in your lands.',
        ],
      },
      icon: 'minecraft:lead',
      deps: ['sticks_and_stones'],
      tasks: [
        // any livestock: the species live in different climates, and this quest opens husbandry and riding
        observe.entity(['tfc:horse', 'tfc:donkey', 'tfc:mule', 'tfc:cow', 'tfc:pig', 'tfc:sheep', 'tfc:goat', 'tfc:alpaca', 'tfc:yak', 'tfc:musk_ox', 'tfc:chicken', 'tfc:duck', 'tfc:quail'],
          { title: { ru: 'Найди домашнее животное', en: 'Find a farm animal' }, icon: 'tfc:spawn_egg/cow' }),
      ],
      rewards: [reward('minecraft:lead')],
      budget: 800,
    }),

    quest('dairy', {
      from: 'terrafirmacraft/dairy',
      title: { ru: 'Молочка', en: 'Dairy' },
      subtitle: { ru: 'Пейте, дети, молоко!', en: 'Drink your milk!' },
      desc: {
        ru: [
          'Молоко дают не только коровы: в мире Firmalife есть ещё козы и яки. Подойди к взрослой прирученной самке с пустым &6деревянным ведром&r и нажми ПКМ.',
        ],
        en: [
          'Cows aren\'t the only source of milk: Firmalife adds goats and yaks. Right-click a tamed adult female with an empty &6wooden bucket&r.',
        ],
      },
      icon: 'tfc:wooden_bucket',
      deps: ['animals', 'wooden_bucket'],
      tasks: [hasFluid(['minecraft:milk', 'firmalife:yak_milk', 'firmalife:goat_milk'], { title: { ru: 'Ёмкость с молоком', en: 'A container of milk' }, icon: 'tfc:wooden_bucket' })],
      rewards: [reward('tfc:food/cheese', 2)],
      budget: 1000,
    }),

    quest('clay', {
      from: 'terrafirmacraft/test4',
      title: { ru: 'Глиномесительство', en: 'Clay' },
      subtitle: { ru: 'Ты обязательно её найдёшь', en: 'You\'ll find it eventually' },
      desc: {
        ru: [
          'Из глины делают множество полезных вещей: сосуды, формы для литья металлов и многое другое.',
          '',
          'Глина встречается во влажных биомах и в поймах рек. Ищи траву с особым узором. Подробнее — в &dруководстве&r.',
        ],
        en: [
          'Clay makes lots of useful things: vessels, molds for casting metal and more.',
          '',
          'Clay is found in wet biomes and river floodplains, look for grass with a distinct pattern. See the &dfield guide&r for details.',
        ],
      },
      icon: 'minecraft:clay_ball',
      deps: ['sticks_and_stones'],
      tasks: [item('minecraft:clay_ball', 16)],
      rewards: [reward('minecraft:clay_ball', 16)],
      budget: 800,
    }),

    quest('pot', {
      from: 'terrafirmacraft/bowl',
      title: { ru: 'Горшок', en: 'Cooking Pot' },
      subtitle: { ru: 'Варим вкусное', en: 'Let\'s cook' },
      desc: {
        ru: [
          'В горшке на костре варят жидкую пищу. Не забудь пару мисок, иначе приготовленное будет не во что налить!',
        ],
        en: [
          'A pot over the firepit cooks liquid food. Make a couple of bowls too, or you\'ll have nothing to serve it in!',
        ],
      },
      icon: 'tfc:ceramic/pot',
      deps: ['fire', 'clay'],
      tasks: [
        item('tfc:ceramic/pot'),
        item('tfc:ceramic/bowl', 3),
      ],
      rewards: [reward('tfc:powder/salt', 4), reward('tfc:food/cooked_beef', 1)],
      budget: 1000,
    }),

    quest('soup', {
      from: 'terrafirmacraft/soup',
      title: { ru: 'Супчик', en: 'Soup' },
      subtitle: { ru: 'Ммм… вкуснятина!', en: 'Mmm… delicious!' },
      desc: {
        ru: [
          'Всё просто: свари суп. Суп объединяет питательные свойства всех ингредиентов, поэтому это отличный способ разнообразить рацион.',
        ],
        en: [
          'Simple: cook a soup. It combines the nutrition of all its ingredients, so it\'s a great way to balance your diet.',
        ],
      },
      icon: 'tfc:food/grain_soup',
      deps: ['pot'],
      tasks: [item(anyOf('tfc:food/grain_soup', 'tfc:food/fruit_soup', 'tfc:food/vegetables_soup', 'tfc:food/protein_soup', 'tfc:food/dairy_soup'), 1, { icon: 'tfc:food/grain_soup', title: { ru: 'Любой суп', en: 'Any soup' } })],
      rewards: [reward('tfc:food/cooked_beef', 1)],
      budget: 250,
    }),

    quest('first_ores', {
      from: 'terrafirmacraft/malachite',
      title: { ru: 'Первые металлы', en: 'First Ores' },
      subtitle: { ru: 'Смотри под ноги!', en: 'Watch your step!' },
      desc: {
        ru: [
          'Кроме камней и веток на земле можно найти &6небольшие кусочки руды&r. Они подсказывают, какая жила лежит под ними. Где какую руду искать — в &dруководстве&r.',
        ],
        en: [
          'Besides rocks and sticks, the ground holds &6small ore pieces&r. They hint at the vein below. The &dfield guide&r tells where each ore is found.',
        ],
      },
      icon: 'tfc:ore/small_native_copper',
      deps: ['sticks_and_stones'],
      tasks: [
        item(anyOf('tfc:ore/small_native_copper', 'tfc:ore/small_malachite', 'tfc:ore/small_tetrahedrite'), 1, { icon: 'tfc:ore/small_native_copper', title: { ru: 'Кусочек медной руды', en: 'A small piece of copper ore' } }),
        item(anyOf('tfc:ore/small_cassiterite', 'tfc:ore/small_bismuthinite', 'tfc:ore/small_sphalerite'), 1, { icon: 'tfc:ore/small_cassiterite', title: { ru: 'Кусочек оловянной, висмутовой или цинковой руды', en: 'A small piece of tin, bismuth or zinc ore' } }),
      ],
      rewards: [reward('tfc:ore/normal_cassiterite', 4)],
      budget: 2500,
    }),

    quest('panning', {
      from: 'terrafirmacraft/lotok',
      title: { ru: 'Промывка', en: 'Panning' },
      subtitle: { ru: 'Руду можно найти в реке', en: 'Ore hides in rivers' },
      desc: {
        ru: [
          'Слепи из глины &6лоток&r и обожги его. Найди &6рудную россыпь&r — гравий с блёстками на дне реки или озера. Зачерпни её лотком и промой, стоя в воде: иногда в лотке остаются кусочки руды.',
        ],
        en: [
          'Knap a &6pan&r from clay and fire it. Find an &6ore deposit&r: speckled gravel at the bottom of a river or lake. Scoop it with the pan and wash it while standing in water: sometimes ore pieces are left in the pan.',
        ],
      },
      icon: 'tfc:pan/empty',
      deps: ['clay'],
      tasks: [
        item('tfc:pan/empty'),
        item(anyOf('tfc:ore/small_native_copper', 'tfc:ore/small_cassiterite', 'tfc:ore/small_native_gold', 'tfc:ore/small_native_silver'), 3, { icon: 'tfc:ore/small_native_copper', title: { ru: 'Кусочки руды из лотка', en: 'Ore pieces from the pan' } }),
      ],
      rewards: [reward('tfc:ore/normal_cassiterite', 2)],
      budget: 1200,
    }),

    quest('vessel', {
      from: 'terrafirmacraft/sosud',
      title: { ru: 'Сосуд', en: 'Vessel' },
      subtitle: { ru: 'Основа любого литья', en: 'The heart of casting' },
      desc: {
        ru: [
          'Металл плавят в керамическом &6сосуде&r: его лепят из глины и обжигают в &6яме для обжига&r. Как её устроить, написано в &dруководстве&r.',
          '',
          'А &6большие сосуды&r на первых порах заменят сундуки.',
        ],
        en: [
          'Metal is melted in a ceramic &6vessel&r, knapped from clay and fired in a &6pit kiln&r. The &dfield guide&r explains how to build one.',
          '',
          '&6Large vessels&r will serve as chests for a while.',
        ],
      },
      icon: 'tfc:ceramic/vessel',
      deps: ['clay', 'fire'],
      tasks: [
        item('tfc:ceramic/vessel'),
        item('tfc:ceramic/large_vessel'),
      ],
      rewards: [reward('tfc:ceramic/large_vessel')],
      budget: 2000,
    }),

    quest('charcoal_pit', {
      from: 'terrafirmacraft/ugol',
      title: { ru: 'Угольная яма', en: 'Charcoal Pit' },
      subtitle: { ru: 'Как в кузнях Изенгарда', en: 'Like the forges of Isengard' },
      desc: {
        ru: [
          'Для кузни и плавки нужен жаркий огонь. Сложи брёвна в &6поленницу&r в яме, подожги, засыпь землёй — и получишь древесный уголь. Подробная инструкция есть в &dруководстве&r.',
          '',
          'Только не руби весь лес под корень: деревья помнят обиды, а некоторые из них умеют ходить.',
        ],
        en: [
          'Forging and smelting need a hot fire. Stack logs into a &6log pile&r in a pit, light it and cover it with dirt to get charcoal. The &dfield guide&r has step-by-step instructions.',
          '',
          'Just don\'t cut the whole forest down: trees remember wrongs, and some of them can walk.',
        ],
      },
      icon: 'minecraft:charcoal',
      deps: ['fire'],
      tasks: [item('minecraft:charcoal', 9)],
      rewards: [reward('minecraft:charcoal', 16)],
      budget: 1300,
    }),

    // ---------------- copper age ----------------
    quest('copper_pickaxe', {
      from: 'terrafirmacraft/tool',
      title: { ru: 'И моя кирка!', en: 'And My Pickaxe!' },
      subtitle: { ru: 'Гном бы одобрил', en: 'A dwarf would approve' },
      desc: {
        ru: [
          'Литьё в формы для инструментов почти не отличается от литья слитков. Учти, что некоторые формы, например лезвие меча, вмещают больше металла.',
          '',
          'Расплавь медь в сосуде, залей её в форму кирки и собери инструмент с палкой.',
        ],
        en: [
          'Casting tool heads works just like casting ingots. Keep in mind some molds, like the sword blade, hold more metal.',
          '',
          'Melt copper in a vessel, pour it into a pickaxe head mold and assemble the tool with a stick.',
        ],
      },
      icon: 'tfc:metal/pickaxe/copper',
      deps: ['vessel', 'charcoal_pit', 'first_ores'],
      tasks: [item('tfc:metal/pickaxe/copper', 1, { crafted: true })],
      rewards: [reward('tfc:metal/ingot/copper')],
      budget: 3000,
    }),

    quest('saw', {
      from: 'terrafirmacraft/saw',
      title: { ru: 'Пилорама', en: 'Sawmill' },
      subtitle: { ru: 'Без пилы как без рук', en: 'Can\'t live without a saw' },
      desc: {
        ru: [
          'Пилой распиливают брёвна на &6пиломатериалы&r. Из них делают доски, опоры, лодки и многое другое.',
        ],
        en: [
          'A saw cuts logs into &6lumber&r, which makes planks, support beams, boats and much more.',
        ],
      },
      icon: 'tfc:metal/saw/copper',
      deps: ['copper_pickaxe'],
      tasks: [item('tfc:metal/saw/copper', 1, { crafted: true })],
      rewards: [reward('tfc:glue', 4), reward('tfc:metal/ingot/copper')],
      budget: 3500,
    }),

    quest('raw_rock', {
      from: 'terrafirmacraft/rock',
      title: { ru: 'Одинокий камень', en: 'Lonely Stone' },
      subtitle: { ru: 'Так называется и ачивка', en: 'Just like the advancement' },
      desc: {
        ru: [
          'Чтобы добыть цельный камень, а не булыжник, освободи блок от соседей со всех сторон. Тогда он выпадет целиком.',
        ],
        en: [
          'To get a raw stone block instead of cobblestone, clear all blocks around it on every side. Then it drops whole.',
        ],
      },
      icon: 'tfc:rock/raw/granite',
      deps: ['copper_pickaxe'],
      tasks: [item('#tfc:rock/raw', 16, { icon: 'tfc:rock/raw/granite', title: { ru: 'Цельный камень любой породы', en: 'Raw stone of any rock' } })],
      rewards: [reward('tfc:mortar', 16)],
      budget: 900,
    }),

    quest('chiseling', {
      from: 'terrafirmacraft/smoothrock',
      title: { ru: 'Smooth Criminal', en: 'Smooth Criminal' },
      subtitle: { ru: 'Будь как MJ', en: 'Be like MJ' },
      desc: {
        ru: [
          '&6Молотом&r и &6зубилом&r из цельного камня вытачивают ступеньки, полублоки и гладкий камень.',
        ],
        en: [
          'A &6hammer&r and a &6chisel&r carve raw stone into stairs, slabs and smooth stone.',
        ],
      },
      icon: 'tfc:rock/smooth/marble',
      deps: ['raw_rock'],
      tasks: [
        item('#tfc:hammers', 1, { icon: 'tfc:metal/hammer/copper', title: { ru: 'Любой молот', en: 'Any hammer' } }),
        item('#tfc:chisels', 1, { icon: 'tfc:metal/chisel/copper', title: { ru: 'Любое зубило', en: 'Any chisel' } }),
        item('#tfc:rock/smooth', 8, { icon: 'tfc:rock/smooth/marble', title: { ru: 'Гладкий камень любой породы', en: 'Smooth stone of any rock' } }),
      ],
      rewards: [reward('tfc:metal/ingot/copper')],
      budget: 3000,
    }),

    quest('quern', {
      from: 'terrafirmacraft/automatization',
      title: { ru: 'Жёрнов', en: 'Quern' },
      subtitle: { ru: 'Мука, соль и красители', en: 'Flour, salt and dyes' },
      desc: {
        ru: [
          'Ручной &6жёрнов&r мелет зерно в муку, руду в порошок, а ещё помогает получить соль и красители. Нижнюю часть собирают из гладкого камня, верхнюю — из цельного камня и палки.',
        ],
        en: [
          'A hand &6quern&r grinds grain into flour and ore into powder, and also yields salt and dyes. The base is made of smooth stone, the handstone of raw stone and a stick.',
        ],
      },
      icon: 'tfc:quern',
      deps: ['chiseling'],
      tasks: [
        item('tfc:quern'),
        item('tfc:handstone'),
      ],
      rewards: [reward('tfc:powder/flux', 8)],
      budget: 1000,
    }),

    quest('aqueducts', {
      from: 'terrafirmacraft/aqua',
      title: { ru: 'Акведуки', en: 'Aqueducts' },
      subtitle: { ru: 'Выведут воду куда надо', en: 'Water where you need it' },
      desc: {
        ru: [
          'Каменные &6акведуки&r направляют воду туда, куда нужно: орошать поля или крутить механизмы. Их собирают из кирпичей и строительного раствора.',
        ],
        en: [
          'Stone &6aqueducts&r carry water where you need it: to irrigate fields or drive machines. They\'re made of bricks and mortar.',
        ],
      },
      icon: 'tfc:rock/aqueduct/limestone',
      deps: ['chiseling'],
      tasks: [item(anyOf(...['granite', 'diorite', 'gabbro', 'shale', 'claystone', 'limestone', 'conglomerate', 'dolomite', 'chert', 'chalk', 'rhyolite', 'basalt', 'andesite', 'dacite', 'quartzite', 'slate', 'phyllite', 'schist', 'gneiss', 'marble'].map((r) => `tfc:rock/aqueduct/${r}`)), 16, { icon: 'tfc:rock/aqueduct/limestone', title: { ru: 'Акведук из любой породы', en: 'Aqueduct of any rock' } })],
      rewards: [reward('tfc:mortar', 16)],
      budget: 1000,
    }),

    quest('alabaster', {
      from: 'terrafirmacraft/alabastr',
      title: { ru: 'Алебастр', en: 'Alabaster' },
      subtitle: { ru: 'Лучше, чем бетон', en: 'Better than concrete' },
      desc: {
        ru: [
          'Алебастр — один из продвинутых строительных материалов, его можно окрашивать в разные цвета.',
        ],
        en: [
          'Alabaster is one of the advanced building materials, and it can be dyed in many colors.',
        ],
      },
      icon: 'tfc:alabaster/raw',
      deps: ['chiseling'],
      optional: true,
      tasks: [
        item('tfc:alabaster/raw', 16),
        item('tfc:alabaster/bricks', 16),
      ],
      rewards: [reward('tfc:mortar', 16)],
      budget: 1000,
    }),

    quest('concrete', {
      from: 'terrafirmacraft/cement',
      title: { ru: 'Бетон', en: 'Concrete' },
      subtitle: { ru: 'Лучше, чем алебастр', en: 'Better than alabaster' },
      desc: {
        ru: [
          '&6Сухой бетон&r смешивают из песка, гравия и красителя. Если залить его водой, он застынет в прочный бетон.',
        ],
        en: [
          '&6Concrete powder&r is mixed from sand, gravel and dye. Pour water on it and it sets into solid concrete.',
        ],
      },
      icon: 'minecraft:white_concrete',
      deps: ['quern'],
      optional: true,
      tasks: [
        item('minecraft:white_concrete_powder', 16),
        item('minecraft:white_concrete', 16),
      ],
      rewards: [reward('tfc:mortar', 16)],
      budget: 1000,
    }),

    quest('wooden_bucket', {
      from: 'terrafirmacraft/bucket',
      title: { ru: 'Деревянное ведро', en: 'Wooden Bucket' },
      subtitle: { ru: 'Лучше, чем ничего', en: 'Better than nothing' },
      desc: {
        ru: [
          'В отличие от металлических, деревянное ведро не создаёт источник воды. Но на первое время хватит и его.',
        ],
        en: [
          'Unlike metal buckets, a wooden bucket can\'t create a water source. But it will do for now.',
        ],
      },
      icon: 'tfc:wooden_bucket',
      deps: ['saw'],
      tasks: [item('tfc:wooden_bucket')],
      rewards: [reward('tfc:glue', 4)],
      budget: 600,
    }),

    quest('barrels', {
      from: 'terrafirmacraft/bochka',
      title: { ru: 'Бочковтирательство', en: 'Barrel Business' },
      subtitle: { ru: 'Всегда можно засолить пару огурцов', en: 'There\'s always a pickle to brine' },
      desc: {
        ru: [
          '&6Бочки&r хранят жидкости, а ещё в них замачивают, засаливают и выделывают кожу.',
        ],
        en: [
          '&6Barrels&r store fluids and are used for soaking, brining and tanning.',
        ],
      },
      icon: 'tfc:wood/barrel/oak',
      deps: ['wooden_bucket'],
      tasks: [item('#tfc:barrels', 4, { icon: 'tfc:wood/barrel/oak', title: { ru: 'Бочки из любого дерева', en: 'Barrels of any wood' } })],
      rewards: [reward('tfc:powder/salt', 8)],
      budget: 1200,
    }),

    quest('canoe', {
      from: 'terrafirmacraft/kanoe',
      title: { ru: 'Долблёнка', en: 'Dugout Canoe' },
      subtitle: { ru: 'Вниз по Великой реке', en: 'Down the Great River' },
      desc: {
        ru: [
          'Ванильных лодок в паке нет. Первая лодка — &6долблёнка&r: положи в ряд три ошкуренных бревна мягкой породы, спили верх пилой, вырежи форму топором и выжги сердцевину огнём. Подробнее — в &dруководстве&r.',
          '',
          'Править долблёнкой удобнее с &6веслом&r. Вдвоём с вёслами она идёт ещё быстрее — как лодки Братства, плывшие вниз по Великой реке.',
        ],
        en: [
          'There are no vanilla boats in the pack. Your first boat is a &6dugout canoe&r: lay three stripped logs of a soft wood in a row, saw off the top, carve the shape with an axe and burn out the core. See the &dfield guide&r.',
          '',
          'A &6canoe paddle&r makes steering easier. Two paddlers go even faster, like the boats of the Fellowship floating down the Great River.',
        ],
      },
      icon: 'firmaciv:canoe_paddle',
      deps: ['saw', 'fire'],
      tasks: [
        observe.entity(['firmaciv:dugout_canoe/douglas_fir', 'firmaciv:dugout_canoe/pine', 'firmaciv:dugout_canoe/palm', 'firmaciv:dugout_canoe/spruce', 'firmaciv:dugout_canoe/sequoia', 'firmaciv:dugout_canoe/kapok', 'firmaciv:dugout_canoe/white_cedar', 'firmaciv:dugout_canoe/willow', 'firmaciv:dugout_canoe/acacia', 'firmaciv:dugout_canoe/ash', 'firmaciv:dugout_canoe/aspen', 'firmaciv:dugout_canoe/birch', 'firmaciv:dugout_canoe/blackwood', 'firmaciv:dugout_canoe/chestnut', 'firmaciv:dugout_canoe/hickory', 'firmaciv:dugout_canoe/mangrove', 'firmaciv:dugout_canoe/maple', 'firmaciv:dugout_canoe/oak', 'firmaciv:dugout_canoe/rosewood', 'firmaciv:dugout_canoe/sycamore'], { title: { ru: 'Сделай долблёнку', en: 'Make a dugout canoe' }, icon: 'firmaciv:canoe_paddle' }),
        item('firmaciv:canoe_paddle'),
      ],
      rewards: [reward('tfc:food/cooked_beef', 2)],
      budget: 500,
    }),

    quest('kayak', {
      from: 'terrafirmacraft/kanoe',
      title: { ru: 'Каяк', en: 'Kayak' },
      subtitle: { ru: 'Лёгкий и быстрый', en: 'Light and fast' },
      desc: {
        ru: [
          '&6Каяк&r обтягивают шкурой по деревянному каркасу. Он легче долблёнки, его можно поднять и унести с собой. Как его собрать, читай в &dруководстве&r.',
        ],
        en: [
          'A &6kayak&r is a wooden frame covered with hide. It\'s lighter than a dugout and can be picked up and carried. The &dfield guide&r explains how to build one.',
        ],
      },
      icon: 'firmaciv:kayak_paddle',
      deps: ['canoe', 'leather'],
      optional: true,
      tasks: [
        item('firmaciv:kayak'),
        item('firmaciv:kayak_paddle'),
      ],
      rewards: [reward('tfc:food/cooked_beef', 2)],
      budget: 500,
    }),

    quest('support_beams', {
      from: 'terrafirmacraft/opora',
      title: { ru: 'Опоры', en: 'Support Beams' },
      subtitle: { ru: 'Чтобы шахта не обвалилась', en: 'Keep the mine from collapsing' },
      desc: {
        ru: [
          '&6Опоры&r защищают шахты от обвалов. Держат породу только горизонтальные балки: каждая защищает область 9×5×9 вокруг себя, то есть четыре блока в стороны. Стойки под балку ставят не дальше пяти блоков друг от друга. Подробнее — в &dруководстве&r.',
        ],
        en: [
          '&6Support beams&r protect mines from collapses. Only horizontal beams hold the rock: each protects a 9×5×9 area around it, four blocks to every side. The posts under a beam stand at most five blocks apart. See the &dfield guide&r.',
        ],
      },
      icon: 'tfc:wood/support/oak',
      deps: ['saw'],
      tasks: [item('#tfc:support_beams', 32, { icon: 'tfc:wood/support/oak', title: { ru: 'Опоры из любого дерева', en: 'Support beams of any wood' } })],
      rewards: [reward('tfc:food/cooked_beef', 2), reward('minecraft:charcoal', 8)],
      budget: 1500,
    }),

    quest('wattle', {
      from: 'terrafirmacraft/obresh',
      title: { ru: 'Обрешётка', en: 'Wattle' },
      subtitle: { ru: 'Каркас первого дома', en: 'The frame of your first home' },
      desc: {
        ru: [
          '&6Обрешётка&r из палок — простейший строительный блок, с неё начинаются первые постройки.',
        ],
        en: [
          '&6Wattle&r woven from sticks is the simplest building block and the start of your first buildings.',
        ],
      },
      icon: 'tfc:wattle',
      deps: ['sticks_and_stones'],
      tasks: [item('tfc:wattle', 8)],
      rewards: [reward('tfc:straw', 32)],
      budget: 600,
    }),

    quest('daub', {
      from: 'terrafirmacraft/build',
      title: { ru: 'Заливай!', en: 'Daub It!' },
      subtitle: { ru: 'И строй как боженька', en: 'And build like a pro' },
      desc: {
        ru: [
          'Обмажь установленную обрешётку &6глиняно-соломенной смесью&r. Когда она застынет, ПКМ палками добавит каркасу узор.',
        ],
        en: [
          'Cover placed wattle with &6daub&r. Once it sets, right-click with sticks to add a timber frame pattern.',
        ],
      },
      icon: 'tfc:wattle/unstained',
      deps: ['wattle', 'clay'],
      tasks: [
        item('tfc:daub', 16),
        item('tfc:straw', 16),
      ],
      rewards: [reward('minecraft:clay_ball', 16)],
      budget: 800,
    }),

    quest('spindle', {
      from: 'terrafirmacraft/vereteno',
      title: { ru: 'Веретено', en: 'Spindle' },
      subtitle: { ru: 'Без него не прясть', en: 'No yarn without it' },
      desc: {
        ru: [
          'На &6веретене&r прядут шерсть в пряжу, из которой ткут ткани для одежды и кроватей. Навершие лепят из глины и обжигают. Подробнее — в &dруководстве&r.',
        ],
        en: [
          'A &6spindle&r spins wool into yarn, which is woven into cloth for clothes and beds. The head is knapped from clay and fired. See the &dfield guide&r.',
        ],
      },
      icon: 'tfc:spindle',
      deps: ['clay'],
      tasks: [item('tfc:spindle')],
      rewards: [reward('tfc:wool_cloth', 2)],
      budget: 800,
    }),

    quest('sacks', {
      from: 'terrafirmacraft/backpack',
      title: { ru: 'Корзины и мешки', en: 'Baskets and Sacks' },
      subtitle: { ru: 'Привет от Саквилль-Бэггинсов', en: 'Regards from the Sackville-Bagginses' },
      desc: {
        ru: [
          'Мод &6Sacks \'n Such&r добавляет носимые хранилища. &6Соломенная корзина&r плетётся из соломы ножом, &6джутовый мешок&r шьют иглой из джутовой ткани.',
          '',
          'Хранилище работает, пока лежит в инвентаре, а кое-что умеет само подбирать предметы.',
        ],
        en: [
          '&6Sacks \'n Such&r adds portable storage. A &6straw basket&r is woven from straw with a knife, a &6burlap sack&r is sewn from burlap cloth with a needle.',
          '',
          'They work right from your inventory, and some can pick up items on their own.',
        ],
      },
      icon: 'sns:burlap_sack',
      deps: ['saw'],
      tasks: [
        item('sns:straw_basket'),
        item('sns:burlap_sack'),
      ],
      rewards: [reward('tfc:burlap_cloth', 2)],
      budget: 1300,
    }),

    quest('leather', {
      from: 'terrafirmacraft/koja',
      title: { ru: 'Выделка кожи', en: 'Leather' },
      subtitle: { ru: 'Leather Men', en: 'Leather Men' },
      desc: {
        ru: [
          'Выделка кожи описана в &dруководстве&r. Если вкратце, понадобятся шкура, известковая вода в бочке, танин и нож.',
        ],
        en: [
          'Leather making is described in the &dfield guide&r. In short, you need a hide, limewater in a barrel, tannin and a knife.',
        ],
      },
      icon: 'minecraft:leather',
      deps: ['barrels'],
      tasks: [item('minecraft:leather', 3)],
      rewards: [reward('minecraft:leather', 2)],
      budget: 1100,
    }),

    quest('leather_sack', {
      title: { ru: 'Кожаный мешок', en: 'Leather Sack' },
      subtitle: { ru: 'Прочнее и вместительнее', en: 'Sturdier and roomier' },
      desc: {
        ru: [
          '&6Кожаный мешок&r вмещает больше джутового. Сначала скрои заготовку из кожи, затем сшей её с кожаными ремешками и джутом.',
        ],
        en: [
          'A &6leather sack&r holds more than a burlap one. Cut the unfinished sack from leather first, then sew it with leather strips and jute.',
        ],
      },
      icon: 'sns:leather_sack',
      deps: ['sacks', 'leather'],
      tasks: [item('sns:leather_sack')],
      rewards: [reward('minecraft:leather', 3)],
      budget: 1700,
    }),

    quest('water_flask', {
      from: 'terrafirmacraft/water',
      title: { ru: 'Мочевые пузыри', en: 'Bladders' },
      subtitle: { ru: 'Идеальны для фляг', en: 'Perfect for flasks' },
      desc: {
        ru: [
          'Из мочевого пузыря крупных животных выходит удобная &6фляга&r. Воды в неё помещается куда больше, чем в керамический кувшин.',
          '',
          'Позже, освоив кованое железо, можно сделать ещё более вместительную &6железную флягу&r.',
        ],
        en: [
          'The bladder of large animals makes a handy &6flask&r. It holds much more water than a ceramic jug.',
          '',
          'Later, with wrought iron, you can make an even bigger &6iron flask&r.',
        ],
      },
      icon: 'waterflasks:leather_flask',
      deps: ['leather'],
      tasks: [item('waterflasks:leather_flask')],
      rewards: [reward('tfc:food/cooked_beef', 2)],
      budget: 500,
    }),

    quest('bed', {
      from: 'terrafirmacraft/bed',
      title: { ru: 'Кровать', en: 'Bed' },
      subtitle: { ru: 'Теперь можно и поспать', en: 'Finally, some sleep' },
      desc: {
        ru: [
          'Привычная кровать с непривычным рецептом: качественная ткань и пиломатериалы. В отличие от лежанки, на ней можно проспать ночь.',
        ],
        en: [
          'A familiar bed with an unfamiliar recipe: high-quality cloth and lumber. Unlike the thatch bed, it lets you sleep through the night.',
        ],
      },
      icon: 'minecraft:red_bed',
      deps: ['spindle', 'saw'],
      tasks: [item('#minecraft:beds', 1, { icon: 'minecraft:white_bed', title: { ru: 'Кровать любого цвета', en: 'A bed of any color' } })],
      rewards: [reward('tfc:wool_cloth', 3)],
      budget: 1200,
    }),

    quest('charcoal_forge', {
      from: 'terrafirmacraft/kuznica',
      title: { ru: 'Угольная кузня', en: 'Charcoal Forge' },
      subtitle: { ru: 'Эх, горячо!', en: 'Feel the heat!' },
      desc: {
        ru: [
          '&6Угольная кузня&r — следующий шаг после ямы для обжига (керамику по-прежнему обжигают в яме). В ней нагревают и плавят металл, а ещё она греет тигель и другие печи. Не забудь подсыпать угля!',
        ],
        en: [
          'The &6charcoal forge&r is the next step after the pit kiln (pottery is still fired in the pit). It heats and melts metal, and also heats a crucible and other furnaces. Keep it fuelled with charcoal!',
        ],
      },
      icon: 'minecraft:charcoal',
      deps: ['charcoal_pit', 'chiseling'],
      tasks: [observe.block('tfc:charcoal_forge', { title: { ru: 'Разожги угольную кузню', en: 'Light a charcoal forge' }, icon: 'minecraft:charcoal' })],
      rewards: [reward('minecraft:charcoal', 16)],
      budget: 1300,
    }),

    quest('stone_anvil', {
      from: 'terrafirmacraft/anvil',
      title: { ru: 'Каменная наковальня', en: 'Stone Anvil' },
      subtitle: { ru: 'Для каменных сердец', en: 'For hearts of stone' },
      desc: {
        ru: [
          'Ударь &6молотом&r по цельному камню из магматических пород, и он превратится в &6каменную наковальню&r. Ковать на ней нельзя, только сваривать слитки — а это первый шаг к металлической наковальне.',
        ],
        en: [
          'Hit raw igneous stone with a &6hammer&r to turn it into a &6stone anvil&r. It can\'t forge, only weld ingots, and that\'s the first step towards a metal anvil.',
        ],
      },
      icon: 'tfc:rock/anvil/granite',
      deps: ['chiseling', 'charcoal_forge'],
      tasks: [observe.blockTag('tfc:rock_anvils', { title: { ru: 'Сделай каменную наковальню', en: 'Make a stone anvil' }, icon: 'tfc:rock/anvil/granite' })],
      rewards: [reward('tfc:powder/flux', 16)],
      budget: 2000,
    }),

    quest('bellows', {
      from: 'terrafirmacraft/meha',
      title: { ru: 'Кузнечные меха', en: 'Bellows' },
      subtitle: { ru: 'Пыыыыыыфффффф', en: 'Whooooosh' },
      desc: {
        ru: [
          '&6Меха&r раздувают огонь в кузне и поднимают её температуру. Подробнее, как всегда, в &dруководстве&r.',
        ],
        en: [
          '&6Bellows&r fan the forge fire and raise its temperature. As always, see the &dfield guide&r.',
        ],
      },
      icon: 'tfc:bellows',
      deps: ['charcoal_forge', 'leather'],
      tasks: [item('tfc:bellows')],
      rewards: [reward('minecraft:charcoal', 16)],
      budget: 1300,
    }),

    // ---------------- bronze age ----------------
    quest('bronze', {
      from: 'terrafirmacraft/bronza',
      title: { ru: 'Бронза', en: 'Bronze' },
      subtitle: { ru: 'Мой первый сплав', en: 'My first alloy' },
      desc: {
        ru: [
          'Бронза — первый настоящий сплав и материал для прочных инструментов. Её три вида: &6бронза&r (медь и олово), &6висмутовая бронза&r (медь, цинк и висмут) и &6чёрная бронза&r (медь, золото и серебро).',
          '',
          'Сложи кусочки руды в сосуд в правильной пропорции и расплавь его. Пропорции — в &dруководстве&r.',
        ],
        en: [
          'Bronze is the first real alloy and the material for durable tools. There are three kinds: &6bronze&r (copper and tin), &6bismuth bronze&r (copper, zinc and bismuth) and &6black bronze&r (copper, gold and silver).',
          '',
          'Put ore pieces into a vessel in the right ratio and melt it. The ratios are in the &dfield guide&r.',
        ],
      },
      icon: 'tfc:metal/ingot/bronze',
      deps: ['copper_pickaxe'],
      tasks: [item(anyOf(BRONZES.map((m) => `tfc:metal/ingot/${m}`)), 1, { icon: 'tfc:metal/ingot/bronze', title: { ru: 'Слиток любой бронзы', en: 'An ingot of any bronze' } })],
      rewards: [reward('tfc:metal/ingot/bronze')],
      budget: 6500,
    }),

    quest('metal_anvil', {
      title: { ru: 'Металлическая наковальня', en: 'Metal Anvil' },
      subtitle: { ru: 'Звон молотов под горой', en: 'Hammers ringing under the mountain' },
      desc: {
        ru: [
          'Чтобы ковать, нужна &6металлическая наковальня&r. Её делают из двойных слитков, сваренных на каменной наковальне. Медная подойдёт для начала, а бронзовая нужна для кованого железа.',
        ],
        en: [
          'Forging needs a &6metal anvil&r, made of double ingots welded on a stone anvil. A copper one is enough to start, but wrought iron needs a bronze anvil.',
        ],
      },
      icon: 'tfc:metal/anvil/bronze',
      deps: ['stone_anvil', 'bronze'],
      tasks: [item(anyOf('tfc:metal/anvil/copper', ...BRONZES.map((m) => `tfc:metal/anvil/${m}`)), 1, { icon: 'tfc:metal/anvil/bronze', title: { ru: 'Медная или бронзовая наковальня', en: 'A copper or bronze anvil' } })],
      rewards: [reward('tfc:metal/ingot/bronze', 2)],
      budget: 13000,
    }),

    quest('brass', {
      from: 'terrafirmacraft/latun',
      title: { ru: 'Латунь', en: 'Brass' },
      subtitle: { ru: 'Для стекла и механизмов', en: 'For glass and machinery' },
      desc: {
        ru: [
          '&6Латунь&r — сплав меди и цинка. Из латунных блоков собирают &6стол для заливки&r стекла, а латунные механизмы нужны для сложных устройств.',
        ],
        en: [
          '&6Brass&r is an alloy of copper and zinc. Brass blocks make a &6pouring table&r for glass, and brass mechanisms are needed for complex devices.',
        ],
      },
      icon: 'tfc:metal/ingot/brass',
      deps: ['bronze'],
      tasks: [item('tfc:metal/ingot/brass', 4)],
      rewards: [reward('tfc:metal/ingot/brass', 2)],
      budget: 8800,
    }),

    quest('glassblowing', {
      from: 'terrafirmacraft/stekloduv',
      title: { ru: 'Стеклодув', en: 'Glassblower' },
      subtitle: { ru: 'Любишь подуть?', en: 'Ready to blow?' },
      desc: {
        ru: [
          '&6Трубкой стеклодува&r из раскалённой &6стекольной шихты&r выдувают стеклянные предметы. Шихту смешивают из песка, извести и поташа или соды.',
        ],
        en: [
          'A &6blowpipe&r shapes glass items from a hot &6glass batch&r. The batch is mixed from sand, lime and potash or soda ash.',
        ],
      },
      icon: 'tfc:ceramic_blowpipe',
      deps: ['charcoal_forge', 'quern'],
      tasks: [
        item('tfc:ceramic_blowpipe'),
        item('#tfc:glass_batches', 1, { icon: 'tfc:silica_glass_batch', title: { ru: 'Любая стекольная шихта', en: 'Any glass batch' } }),
      ],
      rewards: [reward('tfc:powder/flux', 8)],
      budget: 1000,
    }),

    quest('glass_bottle', {
      from: 'terrafirmacraft/bottle',
      title: { ru: 'Стеклотара', en: 'Glassware' },
      subtitle: { ru: 'Бутылки и прочие прелести', en: 'Bottles and other delights' },
      desc: {
        ru: [
          'Чтобы разливать вкусные напитки, понадобятся бутылки. Сделаем парочку!',
        ],
        en: [
          'You\'ll need bottles to pour your tasty drinks. Let\'s make a few!',
        ],
      },
      icon: 'tfc:silica_glass_bottle',
      deps: ['glassblowing'],
      tasks: [item('#tfc:glass_bottles', 5, { icon: 'tfc:silica_glass_bottle', title: { ru: 'Стеклянные бутылки', en: 'Glass bottles' } })],
      rewards: [reward('tfc:powder/flux', 8)],
      budget: 1000,
    }),

    quest('glass', {
      from: 'terrafirmacraft/glass',
      title: { ru: 'Стекло', en: 'Glass' },
      subtitle: { ru: 'Окна для твоего дома', en: 'Windows for your home' },
      desc: {
        ru: [
          'Чтобы получить стеклянный блок, вылей стекло на латунный &6стол для заливки&r. Если в шихту добавить порошок, стекло окрасится. Прочно установленное стекло снимают &6пилой с алмазным напылением&r.',
        ],
        en: [
          'To get glass blocks, pour glass onto a brass &6pouring table&r. Adding powders to the batch tints the glass. Placed glass is removed with a &6gem saw&r.',
        ],
      },
      icon: 'minecraft:glass',
      deps: ['glassblowing', 'brass'],
      tasks: [item('minecraft:glass', 8)],
      rewards: [reward('tfc:metal/ingot/brass')],
      budget: 4400,
    }),

    quest('lamps', {
      from: 'terrafirmacraft/lampa',
      title: { ru: 'Лампы', en: 'Lamps' },
      subtitle: { ru: 'Просто добавь жира', en: 'Just add tallow' },
      desc: {
        ru: [
          'Лампы горят дольше факелов, их легко заправить и даже носить с собой на поясе. Корпус выковывают на наковальне, а стекло для лампы выдувают.',
          '',
          'Заправляют лампу &6жиром&r или оливковым маслом. Жир вытапливают из ворвани в горшке с водой.',
        ],
        en: [
          'Lamps burn much longer than torches, are easy to refill and can even be carried on your belt. The body is forged on an anvil, and the lamp glass is blown.',
          '',
          'Fill it with &6tallow&r or olive oil. Tallow is rendered from blubber in a pot of water.',
        ],
      },
      icon: 'tfc:metal/lamp/copper',
      deps: ['glassblowing', 'metal_anvil'],
      tasks: [item('#tfc:lamps', 1, { icon: 'tfc:metal/lamp/copper', title: { ru: 'Лампа из любого металла', en: 'A lamp of any metal' } })],
      rewards: [reward('tfc:blubber', 8)],
      budget: 2000,
    }),

    quest('barometer', {
      from: 'terrafirmacraft/barometer',
      title: { ru: 'Барометр', en: 'Barometer' },
      subtitle: { ru: 'Высота над уровнем моря', en: 'Height above sea level' },
      desc: {
        ru: [
          '&6Барометр&r показывает высоту над уровнем моря или под ним. Его делают из латуни и стекла.',
        ],
        en: [
          'A &6barometer&r shows your height above or below sea level. It\'s made of brass and glass.',
        ],
      },
      icon: 'firmaciv:barometer',
      deps: ['glass', 'metal_anvil'],
      optional: true,
      tasks: [item('firmaciv:barometer')],
      rewards: [reward('tfc:metal/ingot/brass')],
      budget: 4400,
    }),

    quest('navigation', {
      from: 'terrafirmacraft/compass',
      title: { ru: 'Навигация', en: 'Navigation' },
      subtitle: { ru: 'Твой верный проводник', en: 'Your trusty guide' },
      desc: {
        ru: [
          'Кроме привычного &6компаса&r, по миру помогает ориентироваться &6секстант&r: он вычисляет точные координаты по широте и долготе. Тебе правда это нужно?',
        ],
        en: [
          'Besides the familiar &6compass&r, a &6sextant&r helps you find your way: it works out exact coordinates from latitude and longitude. Do you really need that?',
        ],
      },
      icon: 'firmaciv:sextant',
      deps: ['brass', 'metal_anvil'],
      optional: true,
      tasks: [
        item('firmaciv:firmaciv_compass'),
        item('firmaciv:sextant'),
      ],
      rewards: [reward('tfc:metal/ingot/brass')],
      budget: 4400,
    }),

    // ---------------- iron age ----------------
    quest('kaolin_and_graphite', {
      from: 'terrafirmacraft/kaolinit',
      title: { ru: 'Каолин и графит', en: 'Kaolin and Graphite' },
      subtitle: { ru: '48 дней спустя', en: '48 days later' },
      desc: {
        ru: [
          'Когда-то каолин и графит искали днями. С &dруководством&r и &6рудоискателем&r это займёт куда меньше времени: ищи подходящий климат и простукивай породу.',
          '',
          'Из каолина и графита делают &6огнеупорную глину&r для тигля и доменной печи.',
        ],
        en: [
          'People used to search for kaolin and graphite for days. With the &dfield guide&r and a &6prospector\'s pick&r it takes much less time: find the right climate and probe the rock.',
          '',
          'Kaolin and graphite make &6fire clay&r for the crucible and the blast furnace.',
        ],
      },
      icon: 'tfc:kaolin_clay',
      deps: ['bronze'],
      tasks: [
        item('tfc:kaolin_clay', 16),
        item('tfc:ore/graphite', 12),
      ],
      rewards: [reward('tfc:fire_clay', 8)],
      budget: 2000,
    }),

    quest('crucible', {
      from: 'terrafirmacraft/tigel',
      title: { ru: 'Тигель', en: 'Crucible' },
      subtitle: { ru: 'Мы дома, Чуи', en: 'Chewie, we\'re home' },
      desc: {
        ru: [
          '&6Тигель&r плавит сразу много металла, смешивает сплавы и разливает их по нескольким формам. А ещё без него не построить доменную печь. Подробнее — в &dруководстве&r.',
        ],
        en: [
          'A &6crucible&r melts lots of metal at once, mixes alloys and pours into several molds. You also need it to build a blast furnace. See the &dfield guide&r.',
        ],
      },
      icon: 'tfc:crucible',
      deps: ['kaolin_and_graphite'],
      tasks: [item('tfc:crucible')],
      rewards: [reward('tfc:fire_clay', 8)],
      budget: 2000,
    }),

    quest('wrought_iron', {
      from: 'terrafirmacraft/iron',
      title: { ru: 'Кованое железо', en: 'Wrought Iron' },
      subtitle: { ru: 'Железный век', en: 'The Iron Age' },
      desc: {
        ru: [
          'Железо плавят в &6сыродутном горне&r из бронзовых двойных листов. Полученную &6крицу&r проковывают на бронзовой наковальне в слитки. Весь процесс описан в &dруководстве&r. Ну а здесь можно забрать награду за терпение.',
        ],
        en: [
          'Iron is smelted in a &6bloomery&r made of bronze double sheets. The resulting &6bloom&r is worked into ingots on a bronze anvil. The whole process is in the &dfield guide&r. Here you just claim the reward for your patience.',
        ],
      },
      icon: 'tfc:metal/ingot/wrought_iron',
      deps: ['metal_anvil', 'bellows'],
      tasks: [
        item('tfc:bloomery'),
        item('tfc:metal/ingot/wrought_iron', 16),
      ],
      rewards: [reward('tfc:metal/ingot/wrought_iron', 2)],
      budget: 20000,
    }),

    quest('iron_tools', {
      from: 'terrafirmacraft/iron',
      title: { ru: 'Железные инструменты', en: 'Iron Tools' },
      subtitle: { ru: 'Острее и прочнее', en: 'Sharper and tougher' },
      desc: {
        ru: [
          'Железо не льют в формы — каждое навершие выковывают на наковальне. Сделай нож и ножницы.',
        ],
        en: [
          'Iron can\'t be cast in molds: every tool head is forged on an anvil. Make a knife and shears.',
        ],
      },
      icon: 'tfc:metal/knife/wrought_iron',
      deps: ['wrought_iron'],
      tasks: [
        item('tfc:metal/knife/wrought_iron'),
        item('tfc:metal/shears/wrought_iron'),
      ],
      rewards: [reward('tfc:metal/ingot/wrought_iron')],
      budget: 10000,
    }),

    quest('iron_anvil', {
      from: 'terrafirmacraft/iron_anvil',
      title: { ru: 'Железная наковальня', en: 'Iron Anvil' },
      subtitle: { ru: 'И стальные нервы…', en: 'And nerves of steel…' },
      desc: {
        ru: [
          'Чтобы ковать сталь, нужна наковальня из кованого железа. Дерзай!',
        ],
        en: [
          'To forge steel you need a wrought iron anvil. Go for it!',
        ],
      },
      icon: 'tfc:metal/anvil/wrought_iron',
      deps: ['wrought_iron'],
      tasks: [item('tfc:metal/anvil/wrought_iron')],
      rewards: [reward('tfc:metal/ingot/wrought_iron', 2)],
      budget: 20000,
    }),

    quest('grill', {
      from: 'terrafirmacraft/bowl',
      title: { ru: 'Гриль', en: 'Grill' },
      subtitle: { ru: 'Жарим вкусное', en: 'Let\'s grill' },
      desc: {
        ru: [
          '&6Железная решётка&r над костром позволяет жарить сразу несколько продуктов.',
        ],
        en: [
          'A &6wrought iron grill&r over the firepit cooks several foods at once.',
        ],
      },
      icon: 'tfc:wrought_iron_grill',
      deps: ['wrought_iron'],
      optional: true,
      tasks: [item('tfc:wrought_iron_grill')],
      rewards: [reward('tfc:food/cooked_beef', 4)],
      budget: 1000,
    }),

    quest('iron_flask', {
      from: 'terrafirmacraft/water',
      title: { ru: 'Железная фляга', en: 'Iron Flask' },
      subtitle: { ru: 'Воды хватит надолго', en: 'Water for a long trip' },
      desc: {
        ru: [
          'Выкуй на наковальне корпус &6железной фляги&r и собери её с мочевым пузырём, тканью и кожей. Она вмещает куда больше кожаной.',
        ],
        en: [
          'Forge the body of an &6iron flask&r on an anvil and assemble it with a bladder, cloth and leather. It holds much more than the leather one.',
        ],
      },
      icon: 'waterflasks:iron_flask',
      deps: ['wrought_iron', 'water_flask'],
      optional: true,
      tasks: [item('waterflasks:iron_flask')],
      rewards: [reward('tfc:food/cooked_beef', 4)],
      budget: 1000,
    }),

    // ---------------- steel age ----------------
    quest('steel', {
      from: 'terrafirmacraft/steel',
      title: { ru: 'Сталь', en: 'Steel' },
      subtitle: { ru: 'Куём и льём', en: 'Forge and pour' },
      desc: {
        ru: [
          '&6Доменная печь&r превращает железную руду в &6чугун&r. Чугун проковывают на железной наковальне, и получается сталь. Подробнее — в &dруководстве&r.',
        ],
        en: [
          'A &6blast furnace&r turns iron ore into &6pig iron&r. Working pig iron on a wrought iron anvil gives steel. See the &dfield guide&r.',
        ],
      },
      icon: 'tfc:metal/ingot/steel',
      deps: ['iron_anvil', 'crucible'],
      tasks: [
        item('tfc:blast_furnace'),
        item('tfc:metal/ingot/steel', 8),
      ],
      rewards: [reward('tfc:metal/ingot/steel', 2)],
      budget: 26000,
    }),

    quest('steel_armor', {
      from: 'terrafirmacraft/steel',
      title: { ru: 'Стальной шлем', en: 'Steel Helmet' },
      subtitle: { ru: 'Береги голову', en: 'Protect your head' },
      desc: {
        ru: [
          'Стальная броня надёжно защищает от хищников и врагов. Мифрила в этом мире не сыскать, но сталь — уже серьёзная защита, и лучше неё только цветные стали. Начни со шлема.',
        ],
        en: [
          'Steel armor reliably protects you from predators and enemies. There\'s no mithril to be found in this world, but steel is serious protection already, and only the colored steels beat it. Start with a helmet.',
        ],
      },
      icon: 'tfc:metal/helmet/steel',
      deps: ['steel'],
      tasks: [item('tfc:metal/helmet/steel')],
      rewards: [reward('tfc:metal/ingot/steel', 2)],
      budget: 26000,
    }),

    quest('frame_pack', {
      title: { ru: 'Рюкзак на раме', en: 'Frame Pack' },
      subtitle: { ru: 'Туда и обратно', en: 'There and back again' },
      desc: {
        ru: [
          '&6Рюкзак на раме&r — самое вместительное хранилище Sacks \'n Such. Раму гнут из стальных прутьев, а рюкзак шьют из укреплённой ткани и кожаных ремней.',
        ],
        en: [
          'The &6frame pack&r is the roomiest Sacks \'n Such storage. The frame is bent from steel rods, and the pack is sewn from reinforced fabric and leather straps.',
        ],
      },
      icon: 'sns:frame_pack',
      deps: ['steel', 'leather_sack'],
      tasks: [item('sns:frame_pack')],
      rewards: [reward('minecraft:leather', 4), reward('sns:reinforced_fabric', 2)],
      budget: 3500,
    }),

    quest('pumps', {
      from: 'terrafirmacraft/pumps',
      title: { ru: 'Насосы', en: 'Pumps' },
      subtitle: { ru: 'Качают лучше всех', en: 'Best at pumping' },
      desc: {
        ru: [
          '&6Стальной насос&r поднимает воду из источника в акведуки. Его собирают из стальных труб, клея и латунных механизмов. Как его запустить, читай в &dруководстве&r.',
        ],
        en: [
          'A &6steel pump&r lifts water from a source into aqueducts. It\'s made of steel pipes, glue and brass mechanisms. See the &dfield guide&r for how to run it.',
        ],
      },
      icon: 'tfc:steel_pump',
      deps: ['steel', 'aqueducts', 'brass'],
      tasks: [item('tfc:steel_pump')],
      rewards: [reward('tfc:metal/ingot/steel')],
      budget: 13000,
    }),

    quest('water_wheel', {
      from: 'terrafirmacraft/waterwheel',
      title: { ru: 'Водяное колесо', en: 'Water Wheel' },
      subtitle: { ru: 'Ошибка стажёра', en: 'An intern\'s mistake' },
      desc: {
        ru: [
          'Течение воды крутит &6водяное колесо&r, а &6оси&r и &6шестерни&r передают вращение механизмам. Колесо собирают из досок, пиломатериалов и оси.',
        ],
        en: [
          'Flowing water turns a &6water wheel&r, and &6axles&r and &6gearboxes&r carry the rotation to machines. The wheel is made of planks, lumber and an axle.',
        ],
      },
      icon: 'tfc:wood/water_wheel/oak',
      deps: ['saw', 'aqueducts'],
      tasks: [item('#tfc:water_wheels', 1, { icon: 'tfc:wood/water_wheel/oak', title: { ru: 'Водяное колесо из любого дерева', en: 'A water wheel of any wood' } })],
      rewards: [reward('tfc:glue', 8)],
      budget: 1200,
    }),

    quest('automation', {
      from: 'terrafirmacraft/automatization',
      title: { ru: 'Автоматизация', en: 'Automation' },
      subtitle: { ru: 'Прямая дорожка к Create. Или нет?', en: 'A straight road to Create. Or is it?' },
      desc: {
        ru: [
          'Часть механизмов, похожих на Create, есть прямо в TerraFirmaCraft. &6Механический молот&r сам бьёт по наковальне, а водяное колесо может крутить жёрнов. Стоит попробовать.',
        ],
        en: [
          'Some Create-like machines exist right in TerraFirmaCraft. The &6trip hammer&r strikes an anvil on its own, and a water wheel can turn a quern. Worth a try.',
        ],
      },
      icon: 'tfc:trip_hammer',
      deps: ['water_wheel', 'steel', 'brass'],
      tasks: [item('tfc:trip_hammer')],
      rewards: [reward('tfc:metal/ingot/steel')],
      budget: 13000,
    }),

    quest('blue_and_red_steel', {
      from: 'terrafirmacraft/blue_steel',
      title: { ru: 'Сине-красные будни', en: 'Blue and Red Days' },
      subtitle: { ru: 'Кто ты такой? Терминатор!', en: 'Who are you? The Terminator!' },
      desc: {
        ru: [
          'Синяя и красная сталь — вершина металлургии TerraFirmaCraft. Получив их, ты по праву прошёл мод. Прими поздравления и щедрую награду!',
        ],
        en: [
          'Blue and red steel are the peak of TerraFirmaCraft metallurgy. Getting them means you\'ve truly beaten the mod. Congratulations, and enjoy a generous reward!',
        ],
      },
      icon: 'tfc:metal/ingot/blue_steel',
      deps: ['steel', 'metallurgy/black_steel'],
      tasks: [
        item('tfc:metal/ingot/blue_steel'),
        item('tfc:metal/ingot/red_steel'),
      ],
      rewards: [reward('tfc:gem/diamond', 8), reward('tfc:gem/ruby', 8), reward('tfc:gem/sapphire', 8)],
      budget: 31000,
    }),

    // ---------------- basics that had no quest ----------------
    quest('jug', {
      title: { ru: 'Жажда', en: 'Thirst' },
      subtitle: { ru: 'Воды, воды…', en: 'Water, water…' },
      desc: {
        ru: [
          'Кроме голода, здесь есть &6жажда&r. Пить можно прямо из пресного водоёма: ПКМ пустой рукой по воде. Солёная вода жажду только усиливает.',
          '',
          'Чтобы брать воду с собой, слепи из глины &6кувшин&r и обожги его. Наполни кувшин из водоёма и пей, когда захочешь.',
        ],
        en: [
          'Besides hunger, there is &6thirst&r. You can drink straight from fresh water: right-click it with an empty hand. Salt water only makes thirst worse.',
          '',
          'To carry water with you, knap a &6jug&r from clay and fire it. Fill the jug from a water source and drink whenever you like.',
        ],
      },
      icon: 'tfc:ceramic/jug',
      deps: ['clay', 'fire'],
      tasks: [item('tfc:ceramic/jug')],
      rewards: [reward('tfc:ceramic/jug')],
      budget: 600,
    }),

    quest('propick', {
      title: { ru: 'Кирка рудоискателя', en: 'Prospector\'s Pick' },
      subtitle: { ru: 'Что там, под ногами?', en: 'What lies beneath?' },
      desc: {
        ru: [
          'Кусочки руды на земле лежат не дальше 15 блоков по горизонтали и 35 по вертикали от жилы: найди середину россыпи — и жила, скорее всего, под тобой.',
          '',
          'Когда кусочков нет, выручит &6кирка рудоискателя&r. Ударь ею по блоку: она проверит куб 25×25×25 вокруг него и напишет, какой руды там сколько. Навершие отливают в глиняной форме, как у обычной кирки.',
        ],
        en: [
          'Small ore pieces lie within 15 blocks horizontally and 35 vertically of a vein: find the middle of the scatter and the vein is likely beneath you.',
          '',
          'When there are no pieces, a &6prospector\'s pick&r helps. Hit a block with it: it checks a 25×25×25 cube around the block and tells which ore is there and how much. The head is cast in a clay mold, like a pickaxe head.',
        ],
      },
      icon: 'tfc:metal/propick/copper',
      deps: ['copper_pickaxe'],
      tasks: [item('#tfc:propicks', 1, { icon: 'tfc:metal/propick/copper', title: { ru: 'Любая кирка рудоискателя', en: 'Any prospector\'s pick' } })],
      rewards: [reward('tfc:metal/ingot/copper')],
      budget: 3000,
    }),

    quest('loom', {
      title: { ru: 'Ткацкий станок', en: 'Loom' },
      subtitle: { ru: 'Нить к нити', en: 'Thread by thread' },
      desc: {
        ru: [
          'Пряжу и волокно превращают в ткань на &6ткацком станке&r: шерстяная пряжа даёт шерстяную ткань, джутовое волокно — мешковину. Станок собирают из пиломатериалов и палки.',
          '',
          'Положи нити в станок и зажми ПКМ, пока полотно не будет готово.',
        ],
        en: [
          'Yarn and fiber become cloth on a &6loom&r: wool yarn gives wool cloth, jute fiber gives burlap. The loom is made of lumber and a stick.',
          '',
          'Put the threads into the loom and hold right-click until the cloth is done.',
        ],
      },
      icon: 'tfc:wood/planks/oak_loom',
      deps: ['spindle', 'saw'],
      tasks: [item('#tfc:looms', 1, { icon: 'tfc:wood/planks/oak_loom', title: { ru: 'Ткацкий станок из любого дерева', en: 'A loom of any wood' } })],
      rewards: [reward('tfc:wool_cloth', 2)],
      budget: 800,
    }),

    quest('first_armor', {
      title: { ru: 'Первая броня', en: 'First Armor' },
      subtitle: { ru: 'Бронзовый век обязывает', en: 'The Bronze Age obliges' },
      desc: {
        ru: [
          'Металлическую броню куют в два шага. Сначала из &6двойного листа&r выковывают заготовку (для сапог хватит одинарного), затем приваривают к ней ещё один лист. Нагруднику на втором шаге тоже нужен двойной лист.',
          '',
          'Чем лучше металл, тем крепче броня. Начни с нагрудника из меди или бронзы.',
        ],
        en: [
          'Metal armor is forged in two steps. First an unfinished piece is worked from a &6double sheet&r (boots need a single one), then another sheet is welded onto it. A chestplate needs a double sheet for the second step too.',
          '',
          'The better the metal, the tougher the armor. Start with a copper or bronze chestplate.',
        ],
      },
      icon: 'tfc:metal/chestplate/copper',
      deps: ['metal_anvil'],
      tasks: [item(anyOf(['copper', ...BRONZES].map((m) => 'tfc:metal/chestplate/' + m)), 1,
        { title: { ru: 'Медный или бронзовый нагрудник', en: 'A copper or bronze chestplate' } })],
      rewards: [reward('tfc:metal/ingot/bronze', 2)],
      budget: 13000,
    }),

    quest('shield', {
      title: { ru: 'Щит', en: 'Shield' },
      subtitle: { ru: 'Лучшая защита — это защита', en: 'The best defence is defence' },
      desc: {
        ru: ['&6Щит&r куют на наковальне из двойного листа металла. Зажми ПКМ, чтобы закрыться от удара или стрелы.'],
        en: ['A &6shield&r is forged on an anvil from a double sheet of metal. Hold right-click to block a blow or an arrow.'],
      },
      icon: 'tfc:metal/shield/copper',
      deps: ['metal_anvil'],
      tasks: [item('#tfc:shields', 1, { icon: 'tfc:metal/shield/copper', title: { ru: 'Щит из любого металла', en: 'A shield of any metal' } })],
      rewards: [reward('tfc:metal/ingot/bronze')],
      budget: 6500,
    }),

    quest('powderkeg', {
      title: { ru: 'Пороховая бочка', en: 'Powderkeg' },
      subtitle: { ru: 'Не курить', en: 'No smoking' },
      desc: {
        ru: [
          '&6Пороховую бочку&r собирают из пиломатериалов, нити и красного красителя. В неё помещается 12 стопок пороха: чем больше пороха, тем сильнее взрыв.',
          '',
          'Поджечь можно только запечатанную бочку. Взрыв поджигает соседние бочки, а все разрушенные блоки выпадают предметами — удобно для карьера.',
        ],
        en: [
          'A &6powderkeg&r is made of lumber, string and red dye. It holds 12 stacks of gunpowder: the more gunpowder, the bigger the blast.',
          '',
          'Only a sealed keg can be lit. The blast sets off nearby kegs, and every broken block drops as an item, which is handy for quarrying.',
        ],
      },
      icon: 'tfc:powderkeg',
      deps: ['barrels'],
      optional: true,
      tasks: [item('tfc:powderkeg'), item('minecraft:gunpowder', 4)],
      rewards: [reward('minecraft:gunpowder', 4)],
      budget: 1600,
    }),

    quest('steel_buckets', {
      title: { ru: 'Вёдра из цветной стали', en: 'Colored Steel Buckets' },
      subtitle: { ru: 'Наконец-то настоящее ведро', en: 'A real bucket at last' },
      desc: {
        ru: ['Ведро куют на наковальне из листа &6красной&r или &6синей стали&r. В отличие от деревянного, оно ставит полноценный источник воды и выдерживает лаву.'],
        en: ['A bucket is forged on an anvil from a sheet of &6red&r or &6blue steel&r. Unlike a wooden one, it places a full water source and can hold lava.'],
      },
      icon: 'tfc:metal/bucket/red_steel',
      deps: ['blue_and_red_steel'],
      tasks: [item('tfc:metal/bucket/red_steel'), item('tfc:metal/bucket/blue_steel')],
      rewards: [reward('tfc:gem/diamond', 8)],
      budget: 12000,
    }),

    // ---------------- the end of the book ----------------
    quest('journey_end', {
      title: { ru: 'Туда и обратно', en: 'There and Back Again' },
      subtitle: { ru: 'Конец пути — или его середина?', en: 'The end of the road, or its middle?' },
      desc: {
        ru: [
          'Цветная сталь выкована, шлюп спущен на воду, дракон Края повержен, а о твоих победах сложили песни.',
          '',
          'Ты пришёл в этот мир с пустыми руками и взял от него всё. Дальше — только то, что придумаешь сам. Дорога уходит вдаль от порога.',
        ],
        en: [
          'Colored steel is forged, the sloop is afloat, the Ender Dragon is slain, and songs are sung of your victories.',
          '',
          'You came into this world empty-handed and took all it had to give. From here on, there is only what you invent yourself. The Road goes ever on.',
        ],
      },
      icon: 'minecraft:nether_star',
      deps: ['blue_and_red_steel', 'seafaring/sloop', 'end/dragon', 'bosses/legend'],
      size: 1.5,
      tasks: [checkmark({ title: { ru: 'Оглянись на пройденный путь', en: 'Look back at the road behind' }, icon: 'minecraft:nether_star' })],
      rewards: [lootCrate('boss_trophy')],
      budget: 40000,
    }),
  ],
});
