const Cleric = {
    name: "cleric",

    registerTrades: function (event) {
        this.event = event

        const healingPotion = this.newPotion("minecraft:healing");
        this.newTrade(1, healingPotion, [I("tfc:gem/amethyst", 2, 4)]);
    },

    newTrade: function (level, result, resources) {
        VillagerTrades.registerTrade(this.event, this.name, level, result, resources)
    },

    newPotion: function (effectId) {
        const itemStack = Item.of("minecraft:potion").withNBT({
            Potion: effectId
        });
        return TradeItem.of(itemStack, 1, 1);
    }
};