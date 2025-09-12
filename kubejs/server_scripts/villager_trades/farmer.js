const Farmer = {
    name: "farmer",

    registerTrades: function (event) {
        this.event = event

        this.newTrade(1, I("tfc:wood/sapling/birch", 2, 4), [I("tfc:gem/pyrite", 1, 2), I("tfc:gem/topaz", 1, 2)]);
        this.newTrade(1, I("tfc:wood/sapling/spruce", 2, 4), [I("tfc:gem/pyrite", 1, 2), I("tfc:gem/topaz", 1, 2)]);
        this.newTrade(1, I("tfc:food/wheat", 6, 12), [I("tfc:gem/topaz", 1, 2), I("tfc:gem/lapis_lazuli", 1, 2)]);
        this.newTrade(1, I("tfc:seeds/wheat", 4, 8), [I("tfc:gem/topaz", 1, 2), I("tfc:gem/lapis_lazuli", 1, 2)]);
        this.newTrade(1, I("tfc:food/beet", 6, 12), [I("tfc:gem/topaz", 1, 2), I("tfc:gem/lapis_lazuli", 1, 2)]);
        this.newTrade(1, I("tfc:seeds/beet", 4, 8), [I("tfc:gem/topaz", 1, 2), I("tfc:gem/lapis_lazuli", 1, 2)]);

        this.newTrade(2, I("tfc:plant/green_apple_sapling", 1, 2), [I("tfc:gem/topaz", 1, 3), I("tfc:gem/lapis_lazuli", 1, 2)]);
        this.newTrade(2, I("tfc:plant/red_apple_sapling", 1, 2), [I("tfc:gem/topaz", 1, 3), I("tfc:gem/lapis_lazuli", 1, 2)]);
        this.newTrade(2, I("tfc:food/red_apple", 6, 12), [I("tfc:gem/lapis_lazuli", 1, 3), I("tfc:gem/amethyst", 1, 2)]);
        this.newTrade(2, I("tfc:food/green_apple", 6, 12), [I("tfc:gem/lapis_lazuli", 1, 3), I("tfc:gem/amethyst", 1, 2)]);
        this.newTrade(2, I("tfc:food/carrot", 6, 12), [I("tfc:gem/lapis_lazuli", 1, 3), I("tfc:gem/amethyst", 1, 2)]);
        this.newTrade(2, I("tfc:seeds/carrot", 4, 8), [I("tfc:gem/lapis_lazuli", 1, 3), I("tfc:gem/amethyst", 1, 2)]);
        this.newTrade(2, I("tfc:food/potato", 6, 12), [I("tfc:gem/lapis_lazuli", 1, 3), I("tfc:gem/amethyst", 1, 2)]);
        this.newTrade(2, I("tfc:seeds/potato", 4, 8), [I("tfc:gem/lapis_lazuli", 1, 3), I("tfc:gem/amethyst", 1, 2)]);

        this.newTrade(3, I("tfc:plant/olive_sapling", 1, 2), [I("tfc:gem/lapis_lazuli", 1, 3), I("tfc:gem/amethyst", 1, 2)]);
        this.newTrade(3, I("tfc:plant/cherry_sapling", 1, 2), [I("tfc:gem/lapis_lazuli", 1, 3), I("tfc:gem/amethyst", 1, 2)]);
        this.newTrade(3, I("tfc:food/olive", 6, 12), [I("tfc:gem/amethyst", 1, 3), I("tfc:gem/ruby", 1, 3)]);
        this.newTrade(3, I("tfc:food/maize", 6, 12), [I("tfc:gem/amethyst", 1, 3), I("tfc:gem/ruby", 1, 3)]);
        this.newTrade(3, I("tfc:food/tomato", 6, 12), [I("tfc:gem/amethyst", 1, 3), I("tfc:gem/ruby", 1, 3)]);
        this.newTrade(3, I("tfc:food/onion", 6, 12), [I("tfc:gem/amethyst", 1, 3), I("tfc:gem/ruby", 1, 3)]);
        this.newTrade(3, I("tfc:seeds/tomato", 6, 8), [I("tfc:gem/amethyst", 1, 3), I("tfc:gem/ruby", 1, 3)]);
        this.newTrade(3, I("tfc:seeds/onion", 6, 8), [I("tfc:gem/amethyst", 1, 3), I("tfc:gem/ruby", 1, 3)]);
        this.newTrade(3, I("tfc:seeds/maize", 6, 8), [I("tfc:gem/amethyst", 1, 3), I("tfc:gem/ruby", 1, 3)]);

        this.newTrade(4, I("tfc:plant/peach_sapling", 1, 2), [I("tfc:gem/amethyst", 1, 4), I("tfc:gem/ruby", 1, 3)]);
        this.newTrade(4, I("tfc:plant/plum_sapling", 1, 2), [I("tfc:gem/amethyst", 1, 4), I("tfc:gem/ruby", 1, 3)]);
        this.newTrade(4, I("tfc:plant/banana_sapling", 1, 2), [I("tfc:gem/amethyst", 1, 4), I("tfc:gem/ruby", 1, 3)]);
        this.newTrade(4, I("tfc:plant/orange_sapling", 1, 2), [I("tfc:gem/amethyst", 1, 4), I("tfc:gem/ruby", 1, 3)]);
        this.newTrade(4, I("tfc:food/peach", 12, 16), [I("tfc:gem/ruby", 1, 4), I("tfc:gem/sapphire", 1, 3)]);
        this.newTrade(4, I("tfc:food/plum", 12, 16), [I("tfc:gem/ruby", 1, 4), I("tfc:gem/sapphire", 1, 3)]);
        this.newTrade(4, I("tfc:food/garlic", 12, 16), [I("tfc:gem/ruby", 1, 4), I("tfc:gem/sapphire", 1, 3)]);
        this.newTrade(4, I("tfc:seeds/garlic", 8, 12), [I("tfc:gem/ruby", 1, 4), I("tfc:gem/sapphire", 1, 3)]);
        this.newTrade(4, I("tfc:seeds/jute", 8, 12), [I("tfc:gem/ruby", 1, 4), I("tfc:gem/sapphire", 1, 3)]);
        this.newTrade(4, I("tfc:seeds/cabbage", 8, 12), [I("tfc:gem/ruby", 1, 4), I("tfc:gem/sapphire", 1, 3)]);

        this.newTrade(5, I("firmalife:plant/cilantro", 1, 2), [I("tfc:gem/ruby", 1, 4), I("tfc:gem/sapphire", 1, 4)]);
        this.newTrade(5, I("firmalife:plant/basil", 1, 2), [I("tfc:gem/ruby", 1, 4), I("tfc:gem/sapphire", 1, 4)]);
        this.newTrade(5, I("firmalife:plant/oregano", 6, 12), [I("tfc:gem/sapphire", 1, 4), I("tfc:gem/opal", 1, 4)]);
        this.newTrade(5, I("firmalife:plant/pimento", 6, 12), [I("tfc:gem/sapphire", 1, 4), I("tfc:gem/opal", 1, 4)]);
        this.newTrade(5, I("firmalife:plant/cumin", 6, 12), [I("tfc:gem/sapphire", 1, 4), I("tfc:gem/opal", 1, 4)]);
        this.newTrade(5, I("firmalife:food/tofu", 6, 12), [I("tfc:gem/opal", 1, 4), I("tfc:gem/emerald", 1, 4)]);
        this.newTrade(5, I("firmalife:plant/cocoa_sapling", 1, 2), [I("tfc:gem/emerald", 1, 4), I("tfc:gem/diamond", 1, 4)]);
        this.newTrade(5, I("firmalife:plant/fig_sapling", 1, 2), [I("tfc:gem/emerald", 1, 4), I("tfc:gem/diamond", 1, 4)]);
        this.newTrade(5, I("firmalife:plant/pineapple_bush", 1, 2), [I("tfc:gem/emerald", 1, 4), I("tfc:gem/diamond", 1, 4)]);
    },

    newTrade: function (level, result, resources) {
        VillagerTrades.registerTrade(this.event, this.name, level, result, resources)
    }
};