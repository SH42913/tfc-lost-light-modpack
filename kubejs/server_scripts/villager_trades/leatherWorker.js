const LeatherWorker = {
    name: "leatherworker",

    registerTrades: function (event) {
        this.event = event

        this.newTrade(1, I("waterflasks:leather_flask", 1, 1), [I("tfc:gem/lapis_lazuli", 4, 6)]);
        this.newTrade(1, I("minecraft:leather", 2, 4), [I("tfc:gem/lapis_lazuli", 4, 6)]);
        this.newTrade(1, I("tfc:gem/ruby", 1, 2), [I("tfc:small_raw_hide", 4, 5)]);

        this.newTrade(2, I("minecraft:leather_helmet", 1, 1), [I("tfc:gem/amethyst", 2, 4)]);
        this.newTrade(2, I("tfc:gem/ruby", 1, 1), [I("tfc:small_raw_hide", 4, 5)]);

        this.newTrade(3, I("minecraft:leather_chestplate", 1, 1), [I("tfc:gem/sapphire", 2, 6)]);
        this.newTrade(3, I("minecraft:leather_leggings", 1, 1), [I("tfc:gem/sapphire", 2, 6)]);
        this.newTrade(3, I("minecraft:leather_boots", 1, 1), [I("tfc:gem/sapphire", 2, 6)]);

        this.newTrade(4, I("tfc:gem/opal", 2, 4), [I("tfc:medium_raw_hide", 2, 4)]);
        this.newTrade(4, I("tfc:gem/emerald", 1, 1), [I("tfc:large_raw_hide", 1, 3)]);

        this.newTrade(5, I("tfc:gem/emerald", 1, 2), [I("minecraft:leather", 5, 10)]);
    },

    newTrade: function (level, result, resources) {
        VillagerTrades.registerTrade(this.event, this.name, level, result, resources)
    }
};