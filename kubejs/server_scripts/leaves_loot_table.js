const leavesToData = {
    "tfc:wood/leaves/acacia": {sapling: "tfc:wood/sapling/acacia", twig: "tfc:wood/twig/acacia"},
    "tfc:wood/leaves/ash": {sapling: "tfc:wood/sapling/ash", twig: "tfc:wood/twig/ash"},
    "tfc:wood/leaves/aspen": {sapling: "tfc:wood/sapling/aspen", twig: "tfc:wood/twig/aspen"},
    "tfc:wood/leaves/birch": {sapling: "tfc:wood/sapling/birch", twig: "tfc:wood/twig/birch"},
    "tfc:wood/leaves/blackwood": {sapling: "tfc:wood/sapling/blackwood", twig: "tfc:wood/twig/blackwood"},
    "tfc:wood/leaves/chestnut": {sapling: "tfc:wood/sapling/chestnut", twig: "tfc:wood/twig/chestnut"},
    "tfc:wood/leaves/douglas_fir": {sapling: "tfc:wood/sapling/douglas_fir", twig: "tfc:wood/twig/douglas_fir"},
    "tfc:wood/leaves/hickory": {sapling: "tfc:wood/sapling/hickory", twig: "tfc:wood/twig/hickory"},
    "tfc:wood/leaves/kapok": {sapling: "tfc:wood/sapling/kapok", twig: "tfc:wood/twig/kapok"},
    "tfc:wood/leaves/mangrove": {sapling: "tfc:wood/sapling/mangrove", twig: "tfc:wood/twig/mangrove"},
    "tfc:wood/leaves/maple": {sapling: "tfc:wood/sapling/maple", twig: "tfc:wood/twig/maple"},
    "tfc:wood/leaves/oak": {sapling: "tfc:wood/sapling/oak", twig: "tfc:wood/twig/oak"},
    "tfc:wood/leaves/palm": {sapling: "tfc:wood/sapling/palm", twig: "tfc:wood/twig/palm"},
    "tfc:wood/leaves/pine": {sapling: "tfc:wood/sapling/pine", twig: "tfc:wood/twig/pine"},
    "tfc:wood/leaves/rosewood": {sapling: "tfc:wood/sapling/rosewood", twig: "tfc:wood/twig/rosewood"},
    "tfc:wood/leaves/sequoia": {sapling: "tfc:wood/sapling/sequoia", twig: "tfc:wood/twig/sequoia"},
    "tfc:wood/leaves/spruce": {sapling: "tfc:wood/sapling/spruce", twig: "tfc:wood/twig/spruce"},
    "tfc:wood/leaves/sycamore": {sapling: "tfc:wood/sapling/sycamore", twig: "tfc:wood/twig/sycamore"},
    "tfc:wood/leaves/white_cedar": {sapling: "tfc:wood/sapling/white_cedar", twig: "tfc:wood/twig/white_cedar"},
    "tfc:wood/leaves/willow": {sapling: "tfc:wood/sapling/willow", twig: "tfc:wood/twig/willow"}
};

LootJS.modifiers(function (event) {
    const shears_filter = "#forge:shears";
    const sharp_tools_filter = "#tfc:sharp_tools";
    const silk_touch_filter = ItemFilter.hasEnchantment("minecraft:silk_touch");
    for (const [leaves, data] of Object.entries(leavesToData)) {
        event.addBlockLootModifier(leaves)
            .removeLoot("minecraft:stick")
            .removeLoot(data.sapling);

        event.addBlockLootModifier(leaves)
            .survivesExplosion()
            .matchMainHand(sharp_tools_filter)
            .not((not) => {
                not.or((or) => {
                    or.matchMainHand(shears_filter);
                    or.matchMainHand(silk_touch_filter);
                })
            })
            .randomChance(0.1)
            .addLoot(data.sapling);

        event.addBlockLootModifier(leaves)
            .survivesExplosion()
            .matchMainHand(sharp_tools_filter)
            .not((not) => {
                not.or((or) => {
                    or.matchMainHand(shears_filter);
                    or.matchMainHand(silk_touch_filter);
                })
            })
            .randomChance(0.2)
            .addLoot(data.twig)
            .limitCount([1, 2]);

        event.addBlockLootModifier(leaves)
            .survivesExplosion()
            .not((not) => {
                not.or((or) => {
                    or.matchMainHand(sharp_tools_filter);
                    or.matchMainHand(shears_filter);
                    or.matchMainHand(silk_touch_filter);
                })
            })
            .randomChance(0.1)
            .addLoot(data.twig);
    }
});