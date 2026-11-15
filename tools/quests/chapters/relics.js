// Chapter "relics": magical trinkets - Magical Relics artifacts (chest loot of wizard towers, buried dungeons, simple
// dungeons, desert and jungle temples; random abilities; artifacts break down into raw manaessence, which becomes
// material manaessence with a gold nugget), Rings of Ascension (vanilla chest loot by tier: common, rare, epic,
// legendary, mythic), Curios slots, Charm of Undying (a totem of undying worn in a charm slot; totems drop from evokers).
// Text formatting: &6 - names, &e - where to look, &r - reset.
const { chapter, quest, item, anyOf, link, lootCrate } = require('../lib');

const COMMON = { rewards: [lootCrate('explore_common')], budget: 1500 };
const RARE = { rewards: [lootCrate('explore_rare')], budget: 4500 };
const EPIC = { rewards: [lootCrate('explore_epic')], budget: 15000 };

const ring = (ids) => ids.map((r) => `ringsofascension:ring_${r}`);
const RINGS_COMMON = ring(['experience', 'jump_boost', 'night_vision', 'slow_resistance', 'steadfast_steps', 'water_walking']);
const RINGS_RARE = ring(['dolphin', 'fire_resistance', 'invisibility', 'knockback_resistance', 'lava_sponge', 'slow_falling', 'speed', 'sponge', 'water_breathing']);
const RINGS_EPIC = ring(['growth', 'magnetism', 'mining', 'poison_resistance', 'strength', 'wither']);
const RINGS_LEGENDARY = ring(['health', 'hungerless', 'luck', 'regeneration']);
const RINGS_MYTHIC = ring(['flight', 'undying']);
const MATERIALS = ['wood', 'leather', 'stone', 'iron', 'gold', 'diamond'];

module.exports = chapter('relics', {
  order: 40,
  group: 'mysteries',
  title: { ru: 'Реликвии и кольца', en: 'Relics and Rings' },
  subtitle: { ru: 'Старые вещи с характером', en: 'Old things with a temper' },
  icon: 'magical_relics:gold_amulet_artifact',
  links: [link('exploration/wizard_tower'), link('exploration/temple'), link('exploration/illagers')],
  quests: [
    quest('artifact', {
      title: { ru: 'Артефакт', en: 'An Artifact' },
      subtitle: { ru: 'Это ещё что за штука?', en: 'What is this thing?' },
      desc: {
        ru: [
          '&6Артефакты&r — старые вещи с волшебными свойствами: кольца, амулеты, пояса, кинжалы, посохи, доспехи. Свойства у каждого свои и видны в подсказке.',
          '',
          'Ищи их в сундуках &eбашен волшебников, подземелий и древних храмов&r. Башни охраняют ловушки: обваливающиеся полы, скрытые раздатчики и растяжки.',
        ],
        en: [
          '&6Artifacts&r are old items with magical properties: rings, amulets, belts, daggers, staves, armor. Each has its own abilities, shown in the tooltip.',
          '',
          'Look for them in the chests of &ewizard towers, dungeons and ancient temples&r. Towers are guarded by traps: crumbling floors, hidden dispensers and tripwires.',
        ],
      },
      icon: 'magical_relics:gold_amulet_artifact',
      deps: ['exploration/explorer'],
      tasks: [item('#magical_relics:artifacts', 1, { title: { ru: 'Любой артефакт', en: 'Any artifact' }, icon: 'magical_relics:gold_amulet_artifact' })],
      ...RARE,
    }),

    quest('curios', {
      title: { ru: 'Украшения', en: 'Trinkets' },
      subtitle: { ru: 'Носи с собой', en: 'Wear it' },
      desc: {
        ru: [
          'Кольца, амулеты и пояса не держат в руках: их надевают в &6слоты украшений&r. Открой инвентарь и найди кнопку слотов Curios.',
          '',
          'Украшения тоже имеют вес, так что не надевай всё подряд.',
        ],
        en: [
          'Rings, amulets and belts aren\'t held in hand: they go into &6trinket slots&r. Open your inventory and find the Curios slots button.',
          '',
          'Trinkets have weight too, so don\'t put on everything you find.',
        ],
      },
      icon: 'magical_relics:iron_ring_artifact',
      deps: ['artifact'],
      tasks: [item(anyOf(['#curios:ring', '#curios:necklace', '#curios:belt', '#curios:amulet']), 1,
        { title: { ru: 'Кольцо, амулет или пояс', en: 'A ring, amulet or belt' }, icon: 'magical_relics:iron_ring_artifact' })],
      ...COMMON,
    }),

    quest('manaessence', {
      title: { ru: 'Эссенция маны', en: 'Manaessence' },
      subtitle: { ru: 'Магия на развес', en: 'Magic by weight' },
      desc: {
        ru: [
          'Ненужный артефакт можно разобрать на четыре &6сырые эссенции маны&r. Сырая эссенция с самородком золота и материалом — деревом, кожей, камнем, железом, золотом или алмазом — превращается в эссенцию этого материала.',
        ],
        en: [
          'An unwanted artifact breaks down into four pieces of &6raw manaessence&r. Raw manaessence with a gold nugget and a material (wood, leather, stone, iron, gold or diamond) becomes manaessence of that material.',
        ],
      },
      icon: 'magical_relics:raw_manaessence',
      deps: ['artifact'],
      optional: true,
      tasks: [
        item('magical_relics:raw_manaessence'),
        item(anyOf(MATERIALS.map((m) => `magical_relics:${m}_manaessence`)), 1, { title: { ru: 'Эссенция материала', en: 'Material manaessence' }, icon: 'magical_relics:gold_manaessence' }),
      ],
      ...COMMON,
    }),

    // ---------------- Rings of Ascension ----------------
    quest('ring', {
      title: { ru: 'Кольцо Восхождения', en: 'Ring of Ascension' },
      subtitle: { ru: 'Колечко, колечко…', en: 'One ring…' },
      desc: {
        ru: [
          '&6Кольца Восхождения&r дают постоянный эффект, пока надеты: ночное зрение, высокий прыжок, хождение по воде и многое другое. Их находят &eв сундуках подземелий, шахт, пирамид, кораблей и сокровищ&r.',
          '',
          'Кольца бывают обычные, редкие, эпические, легендарные и мифические — чем реже кольцо, тем сильнее.',
        ],
        en: [
          '&6Rings of Ascension&r give a constant effect while worn: night vision, a high jump, water walking and much more. They\'re found &ein the chests of dungeons, mines, pyramids, ships and buried treasure&r.',
          '',
          'Rings are common, rare, epic, legendary and mythic: the rarer the ring, the stronger.',
        ],
      },
      icon: 'ringsofascension:ring_night_vision',
      deps: ['curios'],
      tasks: [item(anyOf([...RINGS_COMMON, ...RINGS_RARE, ...RINGS_EPIC, ...RINGS_LEGENDARY, ...RINGS_MYTHIC]), 1,
        { title: { ru: 'Любое Кольцо Восхождения', en: 'Any Ring of Ascension' }, icon: 'ringsofascension:ring_night_vision' })],
      ...RARE,
    }),

    quest('legendary_ring', {
      title: { ru: 'Легендарное кольцо', en: 'Legendary Ring' },
      subtitle: { ru: 'Моя прелесть', en: 'My precious' },
      desc: {
        ru: [
          'Легендарные кольца — здоровья, сытости, удачи и восстановления — попадаются очень редко. А мифические кольца полёта и бессмертия видели единицы.',
          '',
          'Не надевай кольцо, если оно начнёт шептать.',
        ],
        en: [
          'Legendary rings (health, satiety, luck and regeneration) are very rare. And the mythic rings of flight and undying have been seen by a handful.',
          '',
          'Don\'t put the ring on if it starts whispering.',
        ],
      },
      icon: 'ringsofascension:ring_health',
      deps: ['ring'],
      hidden: 'deps_complete',
      optional: true,
      tasks: [item(anyOf([...RINGS_LEGENDARY, ...RINGS_MYTHIC]), 1, { title: { ru: 'Легендарное или мифическое кольцо', en: 'A legendary or mythic ring' }, icon: 'ringsofascension:ring_health' })],
      ...EPIC,
    }),

    quest('totem', {
      title: { ru: 'Тотем бессмертия', en: 'Totem of Undying' },
      subtitle: { ru: 'Второй шанс', en: 'A second chance' },
      desc: {
        ru: [
          '&6Тотем бессмертия&r спасает от смерти один раз. Его носят &eвызыватели&r — колдуны иллагеров из лесных особняков.',
          '',
          'Тотем не обязательно держать в руке: надень его в слот &6оберега&r, и он сработает сам.',
        ],
        en: [
          'A &6Totem of Undying&r saves you from death once. It\'s carried by &eevokers&r, the illager sorcerers of woodland mansions.',
          '',
          'You don\'t have to hold the totem: put it in the &6charm&r slot, and it works by itself.',
        ],
      },
      icon: 'minecraft:totem_of_undying',
      deps: ['curios', 'exploration/illagers'],
      tasks: [item('minecraft:totem_of_undying')],
      ...EPIC,
    }),
  ],
});
