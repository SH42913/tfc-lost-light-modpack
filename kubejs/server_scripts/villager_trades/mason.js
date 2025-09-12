const Mason = {
    name: "mason",

    registerTrades: function (event) {
        this.event = event

        this.newTrade(1, I("minecraft:clay", 8, 32), [I("tfc:gem/emerald", 4, 16)]);
        this.newTrade(1, I("tfc:rock/raw/gabbro", 8, 32), [I("tfc:gem/emerald", 4, 16)]);
        this.newTrade(1, I("tfc:rock/raw/andesite", 8, 32), [I("tfc:gem/emerald", 4, 16)]);
        this.newTrade(1, I("tfc:rock/raw/conglomerate", 8, 32), [I("tfc:gem/emerald", 4, 16)]);
        this.newTrade(1, I("tfc:rock/raw/dolomite", 8, 32), [I("tfc:gem/emerald", 4, 16)]);

        this.newTrade(2, I("minecraft:calcite", 8, 32), [I("tfc:gem/emerald", 4, 16)]);
        this.newTrade(2, I("tfc:rock/raw/schist", 8, 32), [I("tfc:gem/emerald", 4, 16)]);
        this.newTrade(2, I("tfc:rock/raw/phyllite", 8, 32), [I("tfc:gem/emerald", 4, 16)]);
        this.newTrade(2, I("tfc:rock/raw/chalk", 8, 32), [I("tfc:gem/emerald", 4, 16)]);

        this.newTrade(3, I("tfc:rock/raw/basalt", 8, 32), [I("tfc:gem/emerald", 8, 24)]);
        this.newTrade(3, I("tfc:rock/raw/marble", 8, 32), [I("tfc:gem/emerald", 8, 24)]);

        this.newTrade(4, I("tfc:rock/hardened/gabbro", 8, 32), [I("tfc:gem/ruby", 8, 24)]);
        this.newTrade(4, I("tfc:rock/hardened/andesite", 8, 32), [I("tfc:gem/ruby", 8, 24)]);
        this.newTrade(4, I("tfc:rock/hardened/conglomerate", 8, 32), [I("tfc:gem/ruby", 8, 24)]);
        this.newTrade(4, I("tfc:rock/hardened/dolomite", 8, 32), [I("tfc:gem/ruby", 8, 24)]);

        this.newTrade(5, I("tfc:rock/hardened/schist", 8, 32), [I("tfc:gem/ruby", 8, 16)]);
        this.newTrade(5, I("tfc:rock/hardened/phyllite", 8, 32), [I("tfc:gem/ruby", 8, 16)]);
        this.newTrade(5, I("tfc:rock/hardened/chalk", 8, 32), [I("tfc:gem/ruby", 8, 16)]);
        this.newTrade(5, I("tfc:rock/hardened/marble", 8, 32), [I("tfc:gem/ruby", 8, 16)]);
    },

    newTrade: function (level, result, resources) {
        VillagerTrades.registerTrade(this.event, this.name, level, result, resources)
    }
};