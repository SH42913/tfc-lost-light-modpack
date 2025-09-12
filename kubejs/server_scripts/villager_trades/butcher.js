const Butcher = {
    name: "butcher",

    registerTrades: function (event) {
        this.event = event

        this.newTrade(1, I("tfc:food/pork", 2, 4), [I("tfc:gem/pyrite", 1, 2), I("tfc:gem/topaz", 1, 2)]);
        this.newTrade(1, I("tfc:food/chicken", 2, 4), [I("tfc:gem/pyrite", 1, 2), I("tfc:gem/topaz", 1, 2)]);
        this.newTrade(1, I("tfc:food/rabbit", 2, 4), [I("tfc:gem/topaz", 1, 2), I("tfc:gem/lapis_lazuli", 1, 2)]);
        this.newTrade(1, I("tfc:food/wolf", 2, 4), [I("tfc:gem/topaz", 1, 2), I("tfc:gem/lapis_lazuli", 1, 2)]);
        this.newTrade(1, I("tfc:food/quail", 2, 4), [I("tfc:gem/lapis_lazuli", 1, 3), I("tfc:gem/amethyst", 1, 2)]);

        this.newTrade(2, I("firmalife:food/bacon", 3, 6), [I("tfc:gem/lapis_lazuli", 1, 3), I("tfc:gem/amethyst", 1, 2)]);
        this.newTrade(2, I("tfc:food/gran_feline", 3, 6), [I("tfc:gem/lapis_lazuli", 1, 3), I("tfc:gem/amethyst", 1, 2)]);
        this.newTrade(2, I("tfc:food/chevon", 4, 8), [I("tfc:gem/lapis_lazuli", 1, 3), I("tfc:gem/amethyst", 1, 2)]);
        this.newTrade(2, I("tfc:food/camelidae", 4, 8), [I("tfc:gem/lapis_lazuli", 1, 3), I("tfc:gem/amethyst", 1, 2)]);

        this.newTrade(3, I("tfc:food/venison", 4, 7), [I("tfc:gem/ruby", 1, 3), I("tfc:gem/amethyst", 1, 2)]);
        this.newTrade(3, I("tfc:food/turtle", 4, 7), [I("tfc:gem/ruby", 1, 3), I("tfc:gem/amethyst", 1, 2)]);
        this.newTrade(3, I("tfc:food/duck", 2, 6), [I("tfc:gem/ruby", 1, 3), I("tfc:gem/amethyst", 1, 2)]);
        this.newTrade(3, I("tfc:food/mutton", 2, 6), [I("tfc:gem/lapis_lazuli", 1, 3), I("tfc:gem/amethyst", 1, 2)]);
        this.newTrade(3, I("tfc:food/bear", 2, 6), [I("tfc:gem/lapis_lazuli", 1, 3), I("tfc:gem/amethyst", 1, 2)]);

        this.newTrade(4, I("tfc:food/horse_meat", 6, 9), [I("tfc:gem/lapis_lazuli", 2, 4), I("tfc:gem/amethyst", 1, 2)]);
        this.newTrade(4, I("tfc:food/turkey", 6, 9), [I("tfc:gem/lapis_lazuli", 2, 4), I("tfc:gem/amethyst", 1, 2)]);
        this.newTrade(4, I("tfc:food/pheasant", 5, 10), [I("tfc:gem/opal", 1, 3), I("tfc:gem/sapphire", 1, 2)]);
        this.newTrade(4, I("tfc:food/peafowl", 6, 10), [I("tfc:gem/opal", 1, 3), I("tfc:gem/sapphire", 1, 2)]);

        this.newTrade(5, I("tfc:food/beef", 8, 12), [I("tfc:gem/sapphire", 2, 4), I("tfc:gem/amethyst", 1, 2)]);
        this.newTrade(5, I("tfc:food/chicken", 8, 12), [I("tfc:gem/sapphire", 2, 4), I("tfc:gem/amethyst", 1, 2)]);
        this.newTrade(5, I("tfc:food/venison", 8, 12), [I("tfc:gem/sapphire", 2, 4), I("tfc:gem/amethyst", 1, 2)]);
        this.newTrade(5, I("tfc:food/cooked_horse_meat", 8, 12), [I("tfc:gem/sapphire", 2, 4), I("tfc:gem/amethyst", 1, 2)]);
        this.newTrade(5, I("tfc:food/cooked_pheasant", 6, 20), [I("tfc:gem/opal", 1, 1), I("tfc:gem/sapphire", 1, 2)]);
        this.newTrade(5, I("tfc:food/cooked_beef", 6, 20), [I("tfc:gem/opal", 1, 1), I("tfc:gem/sapphire", 1, 2)]);
        this.newTrade(5, I("tfc:food/cooked_turkey", 6, 20), [I("tfc:gem/opal", 1, 1), I("tfc:gem/sapphire", 1, 2)]);
    },

    newTrade: function (level, result, resources) {
        VillagerTrades.registerTrade(this.event, this.name, level, result, resources)
    }
};