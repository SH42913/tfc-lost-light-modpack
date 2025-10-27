ServerEvents.recipes(event => {
    event.remove({output: /farmersdelight:.*knife.*/});

    event.remove({id: "tfcloot:crafting/emerald_polished"})
    event.remove({id: "tfcloot:crafting/diamond_polished"})
})