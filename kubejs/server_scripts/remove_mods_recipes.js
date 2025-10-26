ServerEvents.recipes(event => {
    event.remove({output: /farmersdelight:.*knife.*/});
})