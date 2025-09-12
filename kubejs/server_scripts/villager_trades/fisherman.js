const Fisherman = {
    name: "fisherman",

    registerTrades: function (event) {
        this.event = event

        this.newTrade(1, I("tfc:food/shellfish", 2, 4), [I("tfc:gem/pyrite", 1, 2), I("tfc:gem/topaz", 1, 2)]);
        this.newTrade(1, I("tfc:food/calamari", 2, 4), [I("tfc:gem/pyrite", 1, 2), I("tfc:gem/topaz", 1, 2)]);
        this.newTrade(1, I("tfc:seeds/oat", 4, 8), [I("tfc:gem/topaz", 1, 2), I("tfc:gem/lapis_lazuli", 1, 2)]);
        this.newTrade(1, I("tfc:seeds/rye", 4, 8), [I("tfc:gem/topaz", 1, 2), I("tfc:gem/lapis_lazuli", 1, 2)]);
        this.newTrade(1, I("tfc:seeds/rice", 4, 8), [I("tfc:gem/lapis_lazuli", 1, 3), I("tfc:gem/amethyst", 1, 2)]);

        this.newTrade(2, I("tfc:food/cod", 3, 6), [I("tfc:gem/lapis_lazuli", 1, 3), I("tfc:gem/amethyst", 1, 2)]);
        this.newTrade(2, I("tfc:food/tropical_fish", 3, 6), [I("tfc:gem/lapis_lazuli", 1, 3), I("tfc:gem/amethyst", 1, 2)]);
        this.newTrade(2, I("tfc:seeds/pumpkin", 4, 8), [I("tfc:gem/lapis_lazuli", 1, 3), I("tfc:gem/amethyst", 1, 2)]);
        this.newTrade(2, I("tfc:seeds/melon", 4, 8), [I("tfc:gem/lapis_lazuli", 1, 3), I("tfc:gem/amethyst", 1, 2)]);

        this.newTrade(3, I("tfc:food/lake_trout", 4, 7), [I("tfc:gem/ruby", 1, 3), I("tfc:gem/amethyst", 1, 2)]);
        this.newTrade(3, I("tfc:food/rainbow_trout", 4, 7), [I("tfc:gem/ruby", 1, 3), I("tfc:gem/amethyst", 1, 2)]);
        this.newTrade(3, I("tfc:seeds/barley", 12, 16), [I("tfc:gem/ruby", 1, 3), I("tfc:gem/amethyst", 1, 2)]);
        this.newTrade(3, I("tfc:seeds/soybean", 12, 16), [I("tfc:gem/lapis_lazuli", 1, 3), I("tfc:gem/amethyst", 1, 2)]);
        this.newTrade(3, I("tfc:seeds/squash", 12, 16), [I("tfc:gem/lapis_lazuli", 1, 3), I("tfc:gem/amethyst", 1, 2)]);

        this.newTrade(4, I("tfc:food/lake_trout", 6, 9), [I("tfc:gem/lapis_lazuli", 2, 4), I("tfc:gem/amethyst", 1, 2)]);
        this.newTrade(4, I("tfc:food/rainbow_trout", 6, 9), [I("tfc:gem/lapis_lazuli", 2, 4), I("tfc:gem/amethyst", 1, 2)]);
        this.newTrade(4, I("tfc:seeds/barley", 16, 20), [I("tfc:gem/opal", 1, 3), I("tfc:gem/sapphire", 1, 2)]);
        this.newTrade(4, I("tfc:seeds/soybean", 16, 20), [I("tfc:gem/opal", 1, 3), I("tfc:gem/sapphire", 1, 2)]);
        this.newTrade(4, I("tfc:seeds/squash", 16, 20), [I("tfc:gem/opal", 1, 3), I("tfc:gem/sapphire", 1, 2)]);

        this.newTrade(5, I("tfc:food/cod", 8, 12), [I("tfc:gem/sapphire", 2, 4), I("tfc:gem/amethyst", 1, 2)]);
        this.newTrade(5, I("tfc:food/salmon", 8, 12), [I("tfc:gem/sapphire", 2, 4), I("tfc:gem/amethyst", 1, 2)]);
        this.newTrade(5, I("tfc:food/cod", 8, 12), [I("tfc:gem/sapphire", 2, 4), I("tfc:gem/amethyst", 1, 2)]);
        this.newTrade(5, I("tfc:food/salmon", 8, 12), [I("tfc:gem/sapphire", 2, 4), I("tfc:gem/amethyst", 1, 2)]);
        this.newTrade(5, I("tfc:seeds/barley", 16, 20), [I("tfc:gem/opal", 1, 1), I("tfc:gem/sapphire", 1, 2)]);
        this.newTrade(5, I("tfc:seeds/soybean", 16, 20), [I("tfc:gem/opal", 1, 1), I("tfc:gem/sapphire", 1, 2)]);
        this.newTrade(5, I("tfc:seeds/squash", 16, 20), [I("tfc:gem/opal", 1, 1), I("tfc:gem/sapphire", 1, 2)]);
    },

    newTrade: function (level, result, resources) {
        VillagerTrades.registerTrade(this.event, this.name, level, result, resources)
    }
};