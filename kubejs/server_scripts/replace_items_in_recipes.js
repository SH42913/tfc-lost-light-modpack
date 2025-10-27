ServerEvents.recipes(event => {
    event.replaceInput({}, "minecraft:barrel", "#tfcbarrels:barrels")

    event.replaceInput({}, "minecraft:emerald", "tfc:gem/emerald")
    event.replaceInput({}, "minecraft:lapis_lazuli", "tfc:gem/lapis_lazuli")
    event.replaceInput({}, "minecraft:diamond", "tfc:gem/diamond")
    event.replaceInput({}, "minecraft:amethyst_shard", "tfc:gem/amethyst")

    event.replaceOutput({}, "minecraft:emerald", "tfc:gem/emerald")
    event.replaceOutput({}, "minecraft:lapis_lazuli", "tfc:gem/lapis_lazuli")
    event.replaceOutput({}, "minecraft:diamond", "tfc:gem/diamond")
    event.replaceOutput({}, "minecraft:amethyst_shard", "tfc:gem/amethyst")
})
