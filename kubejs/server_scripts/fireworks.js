// Realistic firework stars: colors come from mineral salts (flame colorants), not dyes.
// The vanilla firework rocket recipe is kept as is (paper + gunpowder + stars).

const FW_STAR = "minecraft:firework_star"
const FW_MAX_COLORS = 8

// [name, colorants, firework color int (vanilla DyeColor.getFireworkColor)]
const FW_COLORS = [
    ["red",    ["tfc:powder/ruby"],                            11743532], // compromise: no strontium/lithium in TFC
    ["orange", ["tfc:powder/lime"],                            15435844], // calcium
    ["yellow", [["tfc:powder/salt", "tfc:powder/soda_ash"]],   14602026], // sodium
    ["green",  ["tfc:powder/malachite"],                       3887386],  // copper carbonate
    ["blue",   ["tfc:powder/native_copper", "tfc:powder/salt"], 2437522], // copper chloride
    ["purple", ["tfc:powder/sylvite"],                         8073150],  // potassium
    ["white",  ["tfc:powder/sphalerite"],                      15790320], // zinc
]

const FW_IRON_POWDERS = ["tfc:powder/hematite", "tfc:powder/limonite", "tfc:powder/magnetite"]
const FW_HEADS = [
    "minecraft:skeleton_skull", "minecraft:wither_skeleton_skull", "minecraft:zombie_head",
    "minecraft:player_head", "minecraft:creeper_head", "minecraft:dragon_head", "minecraft:piglin_head",
]

// Converts a recipe input (string or array of alternatives) to an ingredient
const fwIngredient = input => Array.isArray(input) ? Ingredient.of(input) : input

// Reads the Explosion tag of a star into a plain JS object
const fwReadExplosion = star => {
    let exp = {type: 0, colors: [], fade: [], trail: false, flicker: false}
    let tag = star.nbt
    if (!tag || !tag.contains("Explosion")) return exp

    let e = tag.getCompound("Explosion")
    exp.type = e.getByte("Type")
    exp.trail = e.getBoolean("Trail")
    exp.flicker = e.getBoolean("Flicker")
    let colors = e.getIntArray("Colors")
    for (let i = 0; i < colors.length; i++) exp.colors.push(colors[i])
    let fade = e.getIntArray("FadeColors")
    for (let i = 0; i < fade.length; i++) exp.fade.push(fade[i])
    return exp
}

// Builds a firework star from a plain JS explosion object (SNBT keeps int arrays typed correctly)
const fwStar = exp => {
    let parts = [`Type:${exp.type}b`]
    if (exp.colors.length > 0) parts.push(`Colors:[I;${exp.colors.join(",")}]`)
    if (exp.fade.length > 0) parts.push(`FadeColors:[I;${exp.fade.join(",")}]`)
    if (exp.trail) parts.push("Trail:1b")
    if (exp.flicker) parts.push("Flicker:1b")
    return Item.of(FW_STAR, `{Explosion:{${parts.join(",")}}}`)
}

// Shapeless "upgrade" recipe: star + extra inputs -> the same star modified by `modify(exp)`
const fwUpgrade = (event, id, inputs, preview, modify) => {
    event.shapeless(fwStar(preview), [FW_STAR].concat(inputs.map(fwIngredient)))
        .modifyResult((grid, result) => {
            let star = grid.find(FW_STAR)
            if (!star || star.isEmpty()) return result
            let exp = fwReadExplosion(star)
            if (modify(exp) === false) return Item.empty
            return fwStar(exp)
        })
        .id(`lost_light:fireworks/${id}`)
}

ServerEvents.recipes(event => {
    event.remove({id: "minecraft:firework_star"})
    event.remove({id: "minecraft:firework_star_fade"})

    FW_COLORS.forEach(entry => {
        let name = entry[0], colorants = entry[1], color = entry[2]
        // Base star: gunpowder + colorant salt
        event.shapeless(fwStar({type: 0, colors: [color], fade: []}),
            ["minecraft:gunpowder"].concat(colorants.map(fwIngredient)))
            .id(`lost_light:fireworks/star_${name}`)

        // Extra color
        fwUpgrade(event, `add_color_${name}`, colorants, {type: 0, colors: [color], fade: []}, exp => {
            if (exp.colors.length >= FW_MAX_COLORS) return false
            exp.colors.push(color)
        })

        // Fade color: a paper-wrapped layer of another salt
        fwUpgrade(event, `add_fade_${name}`, ["minecraft:paper"].concat(colorants),
            {type: 0, colors: [], fade: [color]}, exp => {
                if (exp.fade.length >= FW_MAX_COLORS) return false
                exp.fade.push(color)
            })
    })

    // Charcoal tail
    fwUpgrade(event, "trail", ["tfc:powder/charcoal"], {type: 0, colors: [], fade: [], trail: true}, exp => {
        if (exp.trail) return false
        exp.trail = true
    })
    // Iron filings sparkle
    fwUpgrade(event, "flicker", [FW_IRON_POWDERS], {type: 0, colors: [], fade: [], flicker: true}, exp => {
        if (exp.flicker) return false
        exp.flicker = true
    })

    // Shapes: 1 = large ball, 2 = star, 3 = creeper, 4 = burst
    const shapes = [
        ["large_ball", 1, ["minecraft:gunpowder", "minecraft:gunpowder"]],
        ["star_shape", 2, ["tfc:powder/native_gold"]],
        ["creeper",    3, [FW_HEADS]],
        ["burst",      4, ["minecraft:feather"]],
    ]
    shapes.forEach(shape => {
        let name = shape[0], type = shape[1], inputs = shape[2]
        fwUpgrade(event, `shape_${name}`, inputs, {type: type, colors: [], fade: []}, exp => {
            if (exp.type == type) return false
            exp.type = type
        })
    })

    // Visible-in-JEI copies of the vanilla rocket without stars (the vanilla special recipe still handles stars)
    for (let flight = 1; flight <= 3; flight++) {
        let gunpowder = []
        for (let i = 0; i < flight; i++) gunpowder.push("minecraft:gunpowder")
        event.shapeless(Item.of("minecraft:firework_rocket", 3, `{Fireworks:{Flight:${flight}b}}`),
            ["minecraft:paper"].concat(gunpowder))
            .id(`lost_light:fireworks/rocket_flight_${flight}`)
    }
})
