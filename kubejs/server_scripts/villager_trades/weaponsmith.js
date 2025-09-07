var I = VillagerTrades.createTradeItem;

var Weaponsmith = {
    name: "weaponsmith",

    registerTrades: function (event) {
        this.event = event

        this.newTrade(1, I("knightsofterrafirma:copper_stiletto_blade", 1, 1), [I("tfc:metal/ingot/copper", 1, 1), I("tfc:gem/pyrite", 2, 3)]);
        this.newTrade(1, I("knightsofterrafirma:copper_short_sword_blade", 1, 1), [I("tfc:metal/ingot/copper", 2, 2), I("tfc:gem/lapis_lazuli", 3, 5)]);
        this.newTrade(1, I("knightsofterrafirma:copper_katzbalger_blade", 1, 1), [I("tfc:metal/ingot/copper", 2, 2), I("tfc:gem/topaz", 2, 4)]);
        this.newTrade(1, I("knightsofterrafirma:copper_ahlspiess_blade", 1, 1), [I("tfc:metal/ingot/copper", 1, 1), I("tfc:gem/amethyst", 2, 3)]);
        this.newTrade(1, I("knightsofterrafirma:copper_estoc_blade", 1, 1), [I("tfc:metal/ingot/copper", 2, 2), I("tfc:gem/lapis_lazuli", 4, 6)]);

        this.newTrade(2, I("knightsofterrafirma:bismuth_bronze_stiletto_blade", 1, 1), [I("tfc:metal/ingot/bismuth_bronze", 1, 1), I("tfc:gem/topaz", 3, 5)]);
        this.newTrade(2, I("knightsofterrafirma:bismuth_bronze_short_sword_blade", 1, 1), [I("tfc:metal/ingot/bismuth_bronze", 2, 2), I("tfc:gem/sapphire", 4, 6)]);
        this.newTrade(2, I("knightsofterrafirma:bismuth_bronze_katzbalger_blade", 1, 1), [I("tfc:metal/ingot/bismuth_bronze", 2, 2), I("tfc:gem/amethyst", 4, 6)]);
        this.newTrade(2, I("knightsofterrafirma:bismuth_bronze_ahlspiess_blade", 1, 1), [I("tfc:metal/ingot/bismuth_bronze", 2, 2), I("tfc:gem/ruby", 3, 5)]);
        this.newTrade(2, I("knightsofterrafirma:bismuth_bronze_estoc_blade", 1, 1), [I("tfc:metal/ingot/bismuth_bronze", 2, 2), I("tfc:gem/emerald", 2, 3)]);

        this.newTrade(3, I("knightsofterrafirma:black_bronze_stiletto_blade", 1, 1), [I("tfc:metal/ingot/black_bronze", 1, 1), I("tfc:gem/opal", 3, 5)]);
        this.newTrade(3, I("knightsofterrafirma:black_bronze_short_sword_blade", 1, 1), [I("tfc:metal/ingot/black_bronze", 2, 2), I("tfc:gem/sapphire", 5, 7)]);
        this.newTrade(3, I("knightsofterrafirma:black_bronze_katzbalger_blade", 1, 1), [I("tfc:metal/ingot/black_bronze", 2, 2), I("tfc:gem/ruby", 4, 6)]);
        this.newTrade(3, I("knightsofterrafirma:black_bronze_ahlspiess_blade", 1, 1), [I("tfc:metal/ingot/black_bronze", 2, 2), I("tfc:gem/emerald", 3, 4)]);
        this.newTrade(3, I("knightsofterrafirma:black_bronze_estoc_blade", 1, 1), [I("tfc:metal/ingot/black_bronze", 2, 2), I("tfc:gem/opal", 4, 6)]);

        this.newTrade(4, I("knightsofterrafirma:bronze_stiletto_blade", 1, 1), [I("tfc:metal/ingot/bronze", 1, 1), I("tfc:gem/emerald", 3, 5)]);
        this.newTrade(4, I("knightsofterrafirma:bronze_short_sword_blade", 1, 1), [I("tfc:metal/ingot/bronze", 2, 2), I("tfc:gem/ruby", 5, 7)]);
        this.newTrade(4, I("knightsofterrafirma:bronze_katzbalger_blade", 1, 1), [I("tfc:metal/ingot/bronze", 2, 2), I("tfc:gem/sapphire", 5, 7)]);
        this.newTrade(4, I("knightsofterrafirma:bronze_ahlspiess_blade", 1, 1), [I("tfc:metal/ingot/bronze", 2, 2), I("tfc:gem/opal", 4, 6)]);
        this.newTrade(4, I("knightsofterrafirma:bronze_estoc_blade", 1, 1), [I("tfc:metal/ingot/bronze", 2, 2), I("tfc:gem/emerald", 4, 6)]);

        this.newTrade(5, I("knightsofterrafirma:bronze_zweihander_blade", 1, 1), [I("tfc:metal/ingot/bronze", 3, 3), I("tfc:gem/emerald", 6, 8)]);
        this.newTrade(5, I("knightsofterrafirma:bismuth_bronze_claymore_blade", 1, 1), [I("tfc:metal/ingot/bismuth_bronze", 3, 3), I("tfc:gem/ruby", 6, 9)]);
        this.newTrade(5, I("knightsofterrafirma:black_bronze_flame_bladed_sword_blade", 1, 1), [I("tfc:metal/ingot/black_bronze", 3, 3), I("tfc:gem/sapphire", 6, 9)]);
        this.newTrade(5, I("knightsofterrafirma:bronze_rhomphaia_blade", 1, 1), [I("tfc:metal/ingot/bronze", 3, 3), I("tfc:gem/opal", 5, 7)]);
        this.newTrade(5, I("knightsofterrafirma:black_bronze_zweihander_blade", 1, 1), [I("tfc:metal/ingot/black_bronze", 3, 3), I("tfc:gem/emerald", 7, 10)]);

    },

    newTrade: function (level, result, resources) {
        VillagerTrades.registerTrade(this.event, this.name, level, result, resources)
    }
}