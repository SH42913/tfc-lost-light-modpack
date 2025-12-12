const entityLootReplacementMap = {
    "minecraft:rabbit_hide": "tfc:small_raw_hide"
};

LootJS.modifiers((event) => {
    const entityLootModifier = event.addLootTypeModifier(LootType.ENTITY);
    for (const [original, replacement] of Object.entries(entityLootReplacementMap)) {
        entityLootModifier.replaceLoot(original, replacement)
    }
});