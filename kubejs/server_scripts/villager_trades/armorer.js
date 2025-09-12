const Armorer = {
    name: "armorer",

    registerTrades: function (event) {
        this.event = event

        this.newTrade(1, I("tfc:metal/helmet/copper", 1, 1), [I("tfc:gem/lapis_lazuli", 4, 6), I("tfc:metal/ingot/copper", 1, 1)]);
        this.newTrade(1, I("tfc:metal/chestplate/copper", 1, 1), [I("tfc:gem/lapis_lazuli", 6, 8), I("tfc:metal/ingot/copper", 2, 2)]);
        this.newTrade(1, I("tfc:metal/greaves/copper", 1, 1), [I("tfc:gem/topaz", 3, 5), I("tfc:metal/ingot/copper", 1, 1)]);
        this.newTrade(1, I("tfc:metal/boots/copper", 1, 1), [I("tfc:gem/pyrite", 4, 6), I("tfc:metal/ingot/copper", 1, 1)]);
        this.newTrade(1, I("knightsofterrafirma:copper_shield_brace", 1, 1), [I("tfc:gem/lapis_lazuli", 5, 7), I("tfc:metal/ingot/copper", 1, 1)]);

        this.newTrade(2, I("tfc:metal/helmet/bismuth_bronze", 1, 1), [I("tfc:gem/amethyst", 6, 8), I("tfc:metal/ingot/bismuth_bronze", 1, 1)]);
        this.newTrade(2, I("tfc:metal/chestplate/bismuth_bronze", 1, 1), [I("tfc:gem/ruby", 6, 9), I("tfc:metal/ingot/bismuth_bronze", 2, 2)]);
        this.newTrade(2, I("tfc:metal/greaves/bismuth_bronze", 1, 1), [I("tfc:gem/topaz", 7, 10), I("tfc:metal/ingot/bismuth_bronze", 1, 1)]);
        this.newTrade(2, I("tfc:metal/boots/bismuth_bronze", 1, 1), [I("tfc:gem/lapis_lazuli", 8, 12), I("tfc:metal/ingot/bismuth_bronze", 1, 1)]);
        this.newTrade(2, I("knightsofterrafirma:bismuth_bronze_montefortino_helmet", 1, 1), [I("tfc:gem/amethyst", 5, 7), I("tfc:metal/ingot/bismuth_bronze", 1, 1)]);

        this.newTrade(3, I("tfc:metal/helmet/black_bronze", 1, 1), [I("tfc:gem/ruby", 8, 12), I("tfc:metal/ingot/black_bronze", 1, 1)]);
        this.newTrade(3, I("tfc:metal/chestplate/black_bronze", 1, 1), [I("tfc:gem/sapphire", 8, 12), I("tfc:metal/ingot/black_bronze", 2, 2)]);
        this.newTrade(3, I("tfc:metal/greaves/black_bronze", 1, 1), [I("tfc:gem/opal", 6, 10), I("tfc:metal/ingot/black_bronze", 1, 1)]);
        this.newTrade(3, I("tfc:metal/boots/black_bronze", 1, 1), [I("tfc:gem/ruby", 10, 14), I("tfc:metal/ingot/black_bronze", 1, 1)]);
        this.newTrade(3, I("knightsofterrafirma:black_bronze_corinthian_helmet", 1, 1), [I("tfc:gem/sapphire", 7, 9), I("tfc:metal/ingot/black_bronze", 1, 1)]);

        this.newTrade(4, I("tfc:metal/helmet/bronze", 1, 1), [I("tfc:gem/opal", 10, 14), I("tfc:metal/ingot/bronze", 1, 1)]);
        this.newTrade(4, I("tfc:metal/chestplate/bronze", 1, 1), [I("tfc:gem/emerald", 10, 16), I("tfc:metal/ingot/bronze", 2, 2)]);
        this.newTrade(4, I("tfc:metal/greaves/bronze", 1, 1), [I("tfc:gem/sapphire", 12, 16), I("tfc:metal/ingot/bronze", 1, 1)]);
        this.newTrade(4, I("tfc:metal/boots/bronze", 1, 1), [I("tfc:gem/opal", 12, 18), I("tfc:metal/ingot/bronze", 1, 1)]);
        this.newTrade(4, I("antiquelegacy:bronze_montefortino_helmet", 1, 1), [I("tfc:gem/emerald", 8, 12), I("tfc:metal/ingot/bronze", 1, 1)]);

        this.newTrade(5, I("antiquelegacy:bronze_muscle_cuirass", 1, 1), [I("tfc:gem/emerald", 14, 20), I("tfc:metal/ingot/bronze", 2, 2)]);
        this.newTrade(5, I("antiquelegacy:bronze_roman_greaves", 1, 1), [I("tfc:gem/emerald", 12, 18), I("tfc:metal/ingot/bronze", 1, 1)]);
        this.newTrade(5, I("knightsofterrafirma:bismuth_bronze_muscle_cuirass", 1, 1), [I("tfc:gem/emerald", 16, 22), I("tfc:metal/ingot/bismuth_bronze", 2, 2)]);
        this.newTrade(5, I("knightsofterrafirma:black_bronze_muscle_cuirass", 1, 1), [I("tfc:gem/emerald", 18, 24), I("tfc:metal/ingot/black_bronze", 2, 2)]);
        this.newTrade(5, I("knightsofterrafirma:bronze_republic_gladius", 1, 1), [I("tfc:gem/emerald", 20, 28), I("tfc:metal/ingot/bronze", 2, 2)]);
    },

    newTrade: function (level, result, resources) {
        VillagerTrades.registerTrade(this.event, this.name, level, result, resources)
    }
};