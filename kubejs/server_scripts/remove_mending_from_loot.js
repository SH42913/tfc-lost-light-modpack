// Mending is excluded from the pack (no ESO recipe): strip it from generated loot,
// both from enchanted items ("Enchantments") and from enchanted books ("StoredEnchantments").
const MENDING_ID = "minecraft:mending";

function stripMending(stack) {
    const nbt = stack.nbt;
    if (!nbt) return stack;

    for (const key of ["Enchantments", "StoredEnchantments"]) {
        if (!nbt.contains(key)) continue;
        const list = nbt.getList(key, 10); // 10 = CompoundTag
        const kept = NBT.listTag();
        for (let i = 0; i < list.size(); i++) {
            const entry = list.getCompound(i);
            if (String(entry.getString("id")) != MENDING_ID) kept.add(entry);
        }
        if (kept.size() == list.size()) continue;
        if (kept.isEmpty()) nbt.remove(key);
        else nbt.put(key, kept);
    }

    // A book that only had Mending becomes a plain book
    if (stack.id == "minecraft:enchanted_book" && !nbt.contains("StoredEnchantments")) {
        return Item.of("minecraft:book");
    }
    return stack;
}

LootJS.modifiers((event) => {
    const lootTypes = [
        LootType.CHEST,
        LootType.FISHING,
        LootType.ENTITY,
        LootType.GIFT,
        LootType.PIGLIN_BARTER,
    ];
    for (const lootType of lootTypes) {
        event.addLootTypeModifier(lootType)
            .modifyLoot(ItemFilter.hasEnchantment(MENDING_ID), (stack) => stripMending(stack));
    }
});
