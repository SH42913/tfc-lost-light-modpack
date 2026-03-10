const entityLootReplacementMap = {
    "minecraft:rabbit_hide": "tfc:small_raw_hide",
    "minecraft:arrow": "tfc_arch:stone_arrow"
};

LootJS.modifiers((event) => {
    const entityLootModifier = event.addLootTypeModifier(LootType.ENTITY);
    for (const [original, replacement] of Object.entries(entityLootReplacementMap)) {
        entityLootModifier.replaceLoot(original, replacement)
    }
});