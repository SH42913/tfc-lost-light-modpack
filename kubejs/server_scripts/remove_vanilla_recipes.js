ServerEvents.recipes(event => {
    event.remove({type: "minecraft:smelting"})
    event.remove({type: "minecraft:blasting"})
    event.remove({type: "minecraft:smoking"})
    event.remove({type: "minecraft:campfire_cooking"})

    event.remove({input: /minecraft:raw.*/});
    event.remove({output: /minecraft:raw.*/});
    event.remove({input: /minecraft:.*_ore/});
    event.remove({output: /minecraft:.*_ingot/});
    event.remove({input: /minecraft:netherite.*/});

    event.remove({id: "minecraft:coarse_dirt"})
    event.remove({id: "minecraft:shears"})
    event.remove({id: /minecraft:.*_nugget/})

    // event.remove({
    //     mod: "minecraft",
    //     type: "minecraft:crafting_shaped"
    // })
})