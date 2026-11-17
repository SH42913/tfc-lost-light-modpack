const entityLootReplacementMap = {
    "minecraft:rabbit_hide": "tfc:small_raw_hide",
    "minecraft:arrow": "tfc_arch:stone_arrow",
    "minecraft:iron_ingot": "tfc:metal/ingot/cast_iron",
    // Dungeons and Taverns adds emeralds to the pillager/vindicator/villager loot tables
    "minecraft:emerald": "tfc:gem/emerald",
};

LootJS.modifiers((event) => {
    const entityLootModifier = event.addLootTypeModifier(LootType.ENTITY);
    for (const [original, replacement] of Object.entries(entityLootReplacementMap)) {
        entityLootModifier.replaceLoot(original, replacement)
    }
});

// Vanilla items that never come from a loot table, so LootJS can't see them: a mob's own equipment dropped on death
// (pillagers' crossbows) and weapons MCA Outlaws knocks out of an outlaw's hands. Swapped when the item lands in the world.
const droppedItemReplacementMap = {
    "minecraft:crossbow": "tfc_arch:copper_crossbow",
    // vindicators' weapon (same replacement as in chest loot, modpack_loot_replacement.js)
    "minecraft:iron_axe": "tfc:metal/axe/bronze",
};

EntityEvents.spawned("minecraft:item", event => {
    const entity = event.entity
    const replacement = droppedItemReplacementMap[String(entity.item.id)]
    if (!replacement) return
    // Not right away: this event also fires while a chunk loads its entities, where adding new ones is unsafe
    event.level.server.scheduleInTicks(1, () => {
        if (!entity.isAlive()) return
        const old = entity.item
        const stack = Item.of(replacement, old.count)
        if (old.enchanted) stack.nbt = { Enchantments: old.nbt.Enchantments }
        const ItemEntity = Java.loadClass("net.minecraft.world.entity.item.ItemEntity")
        const fresh = new ItemEntity(entity.level, entity.x, entity.y, entity.z, stack)
        fresh.setDeltaMovement(entity.getDeltaMovement())
        fresh.spawn()
        entity.discard()
    })
});
