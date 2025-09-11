ServerEvents.recipes(function (event) {
    // Logs to sticks
    event
        .shapeless(Item.of("tfc:stick_bunch"), ['#minecraft:logs', '#tfc:axes'])
        .damageIngredient(Ingredient.of("#tfc:axes"));
})