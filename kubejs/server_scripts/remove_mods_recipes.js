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
    event.remove({id: /magistuarmory:.*shield.*/})
    event.remove({id: "knightsofterrafirma:anvil/iron_nugget"})

    event.remove({id: "create:crafting/materials/copper_nugget"})
    event.remove({id: /create:crafting\/materials\/(zinc|brass)_nugget_from_decompacting/})
    event.remove({id: /create:(crafting\/materials|mixing).*andesite_alloy(_from_zinc)?/})
    event.remove({id: "create:crafting/curiosities/cake"})
    event.remove({id: "tfc:crafting/vanilla/loom"})

    event.remove({id: "knightsofterrafirma:crafting/longbow"})
    event.remove({id: "knightsofterrafirma:crafting/heavy_crossbow"})
    event.remove({id: /bsa:.*_knapping.*arrowhead.*/})

    event.remove({id: "farmersdelight:canvas"})
    event.remove({id: "farmersdelight:straw"})
    event.remove({id: "farmersdelight:straw_bale"})
    event.remove({id: "farmersdelight:lead_from_straw"})
    event.remove({id: "farmersdelight:packed_mud_from_straw"})
    event.remove({id: "farmersdelight:cutting/wild_rice"})
    event.remove({id: "farmersdelight:cutting/rice_panicle"})
    event.remove({id: "farmersdelight:integration/create/milling/wild_rice"})
    event.remove({id: "farmersdelight:integration/create/milling/rice_panicle"})
    event.remove({id: /survivorsdelight:crafting.*tfc_straw2fd_straw/})
    event.remove({id: /survivorsdelight:crafting.*fd_straw2tfc_straw/})
})