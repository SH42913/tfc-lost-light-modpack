ServerEvents.recipes(event => {
    // Logs to sticks
    // noinspection JSValidateTypes
    event
        .shapeless(Item.of("tfc:stick_bunch"), ['#minecraft:logs', '#tfc:axes'])
        .damageIngredient(Ingredient.of("#tfc:axes"));
})