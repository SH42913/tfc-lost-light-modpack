ServerEvents.recipes(event => {
    event.remove({type: "minecraft:smelting"})
    event.remove({type: "minecraft:blasting"})
    event.remove({type: "minecraft:smoking"})
    event.remove({type: "minecraft:campfire_cooking"})

    event.remove({output: /minecraft:.*_ingot/});

    event.remove({id: "minecraft:coarse_dirt"})
    event.remove({id: "minecraft:shears"})
    event.remove({id: /minecraft:.*_nugget/})
    event.remove({id: /minecraft:.*netherite.*/});
    event.remove({id: "minecraft:blast_furnace"})
    event.remove({id: "minecraft:cartography_table"})
    event.remove({id: "minecraft:brewing_stand"})
    event.remove({id: "minecraft:stonecutter"})
    event.remove({id: "minecraft:grindstone"})
    event.remove({id: "minecraft:cauldron"})
    event.remove({id: "minecraft:leather"})
    event.remove({id: "minecraft:crossbow"})
    event.remove({id: "minecraft:fletching_table"})

    // event.remove({
    //     mod: "minecraft",
    //     type: "minecraft:crafting_shaped"
    // })
})