ServerEvents.recipes(event => {
    event.replaceInput({}, "minecraft:barrel", "#tfcbarrels:barrels")
    event.replaceInput({}, "mca:rose_gold_ingot", "#forge:ingots/rose_gold")

    event.replaceInput({}, "minecraft:emerald", "#forge:gems/emerald")
    event.replaceInput({}, "minecraft:lapis_lazuli", "#forge:gems/lapis")
    event.replaceInput({}, "minecraft:diamond", "#forge:gems/diamond")
    event.replaceInput({}, "minecraft:gold_ingot", "#forge:ingots/gold")
    event.replaceInput({}, "minecraft:iron_ingot", "#forge:ingots/iron")

    event.replaceOutput({}, "minecraft:emerald", "tfc:gem/emerald")
    event.replaceOutput({}, "minecraft:diamond", "tfc:gem/diamond")
})
