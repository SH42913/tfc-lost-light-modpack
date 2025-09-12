const Shepherd = {
    name: "shepherd",

    registerTrades: function (event) {
        this.event = event

        this.newTrade(1, I("tfc:small_raw_hide", 1, 4), [I("tfc:gem/emerald", 4, 16)]);

        this.newTrade(2, I("tfc:medium_raw_hide", 1, 4), [I("tfc:gem/emerald", 8, 16)]);

        this.newTrade(3, I("tfc:large_raw_hide", 1, 4), [I("tfc:gem/emerald", 16, 24)]);

        this.newTrade(4, I("minecraft:leather", 4, 8), [I("tfc:gem/emerald", 32, 64)]);

        this.newTrade(5, I("tfc:treated_hide", 1, 3), [I("tfc:gem/opal", 4, 16)]);
    },

    newTrade: function (level, result, resources) {
        VillagerTrades.registerTrade(this.event, this.name, level, result, resources)
    }
};