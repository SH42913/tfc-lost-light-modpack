ServerEvents.recipes(event => {
    event.remove({
        mod: "farmerstfc",
        type: "farmersdelight:cutting",
        input: /tfc:wood.*/
    })

    event.remove({output: /farmersdelight:.*knife.*/});
    event.remove({output: "create:zinc_ingot"});
    event.remove({output: "create:brass_ingot"});

    event.remove({id: "tfcloot:crafting/emerald_polished"})
    event.remove({id: "tfcloot:crafting/diamond_polished"})

    event.remove({id: "magistuarmory:steel_ingot_to_steel_nuggets"})
    event.remove({id: "magistuarmory:steel_nuggets_to_steel_ingot"})
    event.remove({id: "knightsofterrafirma:anvil/iron_nugget"})

    event.remove({id: "create:crafting/materials/copper_nugget"})
    event.remove({id: "create:crafting/materials/zinc_nugget_from_decompacting"})
    event.remove({id: "create:crafting/materials/brass_nugget_from_decompacting"})
    event.remove({id: "tfc:crafting/vanilla/loom"})
})