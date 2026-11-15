// Chapter "end": the way to the End. Eyes of Ender are craftable: ender pearls come from piglin bartering (Beneath loot
// override) and the explore_epic crate, blaze powder from blaze rods (Nether fortresses or Create Netherless).
// minecraft:stronghold is generated in any mountains (tfc_structures biomeTags), end_city is in defaultWorldgenStructures.
// The dragon fight is reworked by Dragon Fight (config/dragonfight.json: difficulty 2, crystals respawn, melee-killing a
// crystal takes 10% of the dragon's health, crystals leave a harmful cloud). Elytra Slot puts elytra into a Curios slot.
// Text formatting: &6 - names, &e - where to look, &r - reset.
const { chapter, quest, item, kill, structure, dimension, link, lootCrate } = require('../lib');

const RARE = { rewards: [lootCrate('explore_rare')], budget: 4500 };
const EPIC = { rewards: [lootCrate('explore_epic')], budget: 15000 };
const TROPHY = { rewards: [lootCrate('boss_trophy')], budget: 40000 };

module.exports = chapter('end', {
  order: 14,
  group: 'world',
  title: { ru: 'Край', en: 'The End' },
  subtitle: { ru: 'За краем всего', en: 'Beyond the edge of everything' },
  icon: 'minecraft:ender_eye',
  links: [link('exploration/stronghold'), link('beneath/fortresses'), link('beneath/netherless')],
  quests: [
    quest('ender_eyes', {
      title: { ru: 'Око Края', en: 'Eye of Ender' },
      subtitle: { ru: 'Всевидящее око', en: 'The eye that sees all' },
      desc: {
        ru: [
          '&6Око Края&r делают из &6жемчуга Края&r и &6огненного порошка&r. Жемчуг выменивают у пиглинов на золото, а иногда он попадается в древних сундуках. Огненные стержни добывают со всполохов в крепостях Незера или делают на механизмах Create.',
          '',
          'Брошенное око летит к ближайшей &eдревней твердыне в горах&r. Иногда оно разбивается, так что сделай запас: в рамку портала нужно вставить 12 очей.',
        ],
        en: [
          'An &6Eye of Ender&r is made from an &6Ender Pearl&r and &6Blaze Powder&r. Pearls are traded from piglins for gold and sometimes turn up in ancient chests. Blaze rods are taken from blazes in Nether fortresses or made on Create machines.',
          '',
          'A thrown eye flies toward the nearest &eancient stronghold in the mountains&r. Sometimes it shatters, so make a stock: the portal frame needs 12 eyes.',
        ],
      },
      icon: 'minecraft:ender_eye',
      deps: ['exploration/stronghold'],
      hidden: 'deps_complete',
      tasks: [item('minecraft:ender_eye', 12)],
      ...EPIC,
    }),

    quest('the_end', {
      title: { ru: 'За краем мира', en: 'Beyond the Edge of the World' },
      subtitle: { ru: 'Обратной дороги нет', en: 'There is no way back' },
      desc: {
        ru: [
          'Глубоко в твердыне есть зал с порталом. Вставь очи во все пустые гнёзда рамки — и портал откроется.',
          '',
          'Вернуться можно, только победив того, кто ждёт по ту сторону, или погибнув. Возьми всё лучшее, что у тебя есть.',
        ],
        en: [
          'Deep within the stronghold is a portal room. Fill every empty socket in the frame with eyes, and the portal opens.',
          '',
          'The only ways back are defeating whoever waits on the other side, or dying. Take the best of everything you have.',
        ],
      },
      icon: 'minecraft:end_portal_frame',
      deps: ['ender_eyes'],
      hidden: 'deps_complete',
      tasks: [dimension('minecraft:the_end', { title: { ru: 'Войди в Край', en: 'Enter the End' }, icon: 'minecraft:end_stone' })],
      ...EPIC,
    }),

    quest('dragon', {
      title: { ru: 'Дракон Края', en: 'The Ender Dragon' },
      subtitle: { ru: 'Его зовут не Смауг', en: 'His name isn\'t Smaug' },
      desc: {
        ru: [
          'Дракон здесь сильнее обычного и растёт вместе с числом игроков. Кристаллы на башнях лечат его и со временем &6появляются снова&r, а разбитый кристалл оставляет ядовитое облако.',
          '',
          'Если разбить кристалл в ближнем бою, дракон сразу потеряет десятую часть здоровья. Бойся молний и взрывов — и не стой под драконом.',
        ],
        en: [
          'The dragon here is stronger than usual and grows with the number of players. The crystals on the towers heal it and &6respawn&r over time, and a broken crystal leaves a poisonous cloud.',
          '',
          'Break a crystal in melee, and the dragon instantly loses a tenth of its health. Beware of lightning and explosions, and don\'t stand under the dragon.',
        ],
      },
      icon: 'minecraft:dragon_head',
      deps: ['the_end'],
      hidden: 'deps_complete',
      tasks: [kill('minecraft:ender_dragon', 1, { icon: 'minecraft:dragon_head' })],
      ...TROPHY,
    }),

    quest('end_city', {
      title: { ru: 'Город Края', en: 'End City' },
      subtitle: { ru: 'Башни над пустотой', en: 'Towers over the void' },
      desc: {
        ru: [
          'После победы над драконом появляются &6врата&r на дальние острова. Там стоят &eгорода Края&r — пурпурные башни, которые сторожат шалкеры.',
          '',
          'Чтобы пройти через врата, брось в них жемчуг Края или пролети насквозь.',
        ],
        en: [
          'After the dragon falls, &6gateways&r to the outer islands appear. There stand &eEnd Cities&r: purple towers guarded by shulkers.',
          '',
          'To pass through a gateway, throw an Ender Pearl into it or fly straight through.',
        ],
      },
      icon: 'minecraft:purpur_block',
      deps: ['dragon'],
      hidden: 'deps_complete',
      tasks: [structure('minecraft:end_city', { title: { ru: 'Найди город Края', en: 'Find an End City' }, icon: 'minecraft:purpur_block' })],
      ...EPIC,
    }),

    quest('elytra', {
      title: { ru: 'Крылья', en: 'Wings' },
      subtitle: { ru: 'Орлы летят!', en: 'The eagles are coming!' },
      desc: {
        ru: [
          '&6Элитры&r висят в кораблях у городов Края. Они не занимают место нагрудника: их надевают в отдельный слот, а броню оставляют на себе.',
          '',
          'Взлетать на элитрах проще, а ещё их можно украсить отделкой, как броню.',
        ],
        en: [
          '&6Elytra&r hang in the ships by End Cities. They don\'t take up the chestplate slot: they go into their own slot, and your armor stays on.',
          '',
          'Taking off with elytra is easier, and they can be trimmed just like armor.',
        ],
      },
      icon: 'minecraft:elytra',
      deps: ['end_city'],
      hidden: 'deps_complete',
      tasks: [item('minecraft:elytra')],
      ...RARE,
    }),
  ],
});
