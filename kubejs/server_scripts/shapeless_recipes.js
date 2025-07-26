

ServerEvents.recipes(event => {
    // Gold ingots conversion
    event.shapeless(Item.of('tfc:metal/ingot/gold'), ['minecraft:gold_ingot']);
    event.shapeless(Item.of('minecraft:gold_ingot'), ['tfc:metal/ingot/gold']);

    // Iron ingots conversion
    event.shapeless(Item.of('tfc:metal/ingot/wrought_iron'), ['minecraft:iron_ingot']);
    event.shapeless(Item.of('minecraft:iron_ingot'), ['tfc:metal/ingot/wrought_iron']);

    // TFC Loot obsidian to BSA obsidian
    event.shapeless(Item.of('bsa:obsidian'), ['tfc_loot:obsidian_scrap']);

    // TFC amethyst to vanilla amethyst shard
    event.shapeless(Item.of('minecraft:amethyst_shard'), ['tfc:gem/amethyst', 'tfc:sandpaper']);

    // Rotten flesh usage
    event.shapeless(Item.of('tfc:small_raw_hide'), ['6x minecraft:rotten_flesh', 'tfc:bone_needle', '#forge:string']);

    // Logs to sticks
    event.shapeless(Item.of("tfc:stick_bunch"), ['#minecraft:logs', '#tfc:axes']).damageIngredient(Ingredient.of("#tfc:axes"));
})