ServerEvents.recipes(event => {
    event.remove({type: "minecraft:smelting"})
    event.remove({type: "minecraft:blasting"})
    event.remove({type: "minecraft:smoking"})

    event.remove({id: "minecraft:coarse_dirt"})
    event.remove({id: "minecraft:shears"})

    // event.remove({
    //     mod: "minecraft",
    //     type: "minecraft:crafting_shaped"
    // })

})