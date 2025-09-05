var I = VillagerTrades.createTradeItem;

var Fletcher = {
    name: "fletcher",

    registerTrades: function (event) {
        this.event = event

        this.newTrade(1, I("bsa:stone/arrowhead", 2, 8), [I("tfc:gem/emerald", 8, 32)]);
        this.newTrade(1, I("bsa:bone/arrowhead", 2, 8), [I("tfc:gem/emerald", 8, 32)]);

        this.newTrade(2, I("minecraft:flint", 2, 8), [I("tfc:gem/emerald", 8, 32)]);
        this.newTrade(2, I("bsa:sinew_string", 8, 16), [I("tfc:gem/amethyst", 8, 32)]);

        this.newTrade(3, I("minecraft:bow", 1, 1), [I("tfc:gem/emerald", 4, 24)]);
        this.newTrade(3, I("minecraft:arrow", 8, 24), [I("tfc:gem/emerald", 8, 24)]);

        this.newTrade(4, I("tfc:glow_arrow", 4, 16), [I("tfc:gem/ruby", 6, 12)]);
        this.newTrade(4, I("minecraft:crossbow", 1, 1), [I("tfc:gem/sapphire", 16, 48)]);

        this.newTrade(5, I("magistuarmory:longbow", 1, 1), [I("tfc:gem/opal", 28, 46)]);
        this.newTrade(5, I("magistuarmory:heavy_crossbow", 1, 1), [I("tfc:gem/emerald", 28, 46)]);
    },

    newTrade: function (level, result, resources) {
        VillagerTrades.registerTrade(this.event, this.name, level, result, resources)
    }
}