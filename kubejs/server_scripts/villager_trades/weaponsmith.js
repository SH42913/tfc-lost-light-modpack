/*const copper_price = 2;	//copper ingot price
const bronze_price = 3;
const iron_price = 5;
const steel_price = 8; //black steel ingot price
const legend_price = 8;
*/

const Weaponsmith = {
    name: "weaponsmith",

    registerTrades: function (event) {
        this.event = event

        // lvl 1	
        this.newTrade(1, I("tfc:metal/ingot/copper", 1, 10), [I("tfc:gem/sapphire", copper_price + 2, copper_price * 2 + 2)]);
        this.newTrade(1, I("tfc:gem/amethyst", copper_price * 2 + 1, 8), [I("tfc:metal/ingot/copper", 3, 4)]);
        this.newTrade(1, I("tfc:gem/diamond", copper_price * 2 + 1, 8), [I("tfc:metal/ingot/copper", 3, 4)]);
        this.newTrade(1, I("tfc:gem/opal", copper_price * 2 + 1, 8), [I("tfc:metal/ingot/copper", 3, 4)]);

        this.newTrade(1, I("tfc:metal/ingot/bronze", 1, 10), [I("tfc:gem/opal", bronze_price + 2, bronze_price * 2 + 4)]);
        this.newTrade(1, I("tfc:gem/ruby", bronze_price * 2 + 1, 8), [I("tfc:metal/ingot/bronze", 3, 4)]);
        this.newTrade(1, I("tfc:gem/pyrite", bronze_price * 2 + 1, 8), [I("tfc:metal/ingot/bronze", 3, 4)]);
        this.newTrade(1, I("tfc:gem/emerald", bronze_price * 2 + 1, 8), [I("tfc:metal/ingot/bronze", 3, 4)]);
        //
        this.newTrade(1, I("knightsofterrafirma:copper_stiletto_blade", 1, 1), [I("tfc:metal/ingot/copper", 1, 1), I("tfc:gem/pyrite", 2, 3)]);
        this.newTrade(1, I("knightsofterrafirma:copper_short_sword_blade", 1, 1), [I("tfc:metal/ingot/copper", 2, 2), I("tfc:gem/lapis_lazuli", 3, 5)]);
        this.newTrade(1, I("knightsofterrafirma:copper_katzbalger_blade", 1, 1), [I("tfc:metal/ingot/copper", 2, 2), I("tfc:gem/topaz", 2, 4)]);
        this.newTrade(1, I("knightsofterrafirma:copper_ahlspiess_blade", 1, 1), [I("tfc:metal/ingot/copper", 1, 1), I("tfc:gem/amethyst", 2, 3)]);
        this.newTrade(1, I("knightsofterrafirma:copper_estoc_blade", 1, 1), [I("tfc:metal/ingot/copper", 2, 2), I("tfc:gem/lapis_lazuli", 4, 6)]);
        //lvl 1++

        // lvl 2
        this.newTrade(2, I("tfc:metal/ingot/copper", 1, 10), [I("tfc:gem/emerald", copper_price + 2, copper_price * 2 + 2)]);
        this.newTrade(2, I("tfc:metal/ingot/copper", 1, 10), [I("tfc:gem/pyrite", copper_price + 2, copper_price * 2 + 2)]);
        this.newTrade(2, I("tfc:metal/ingot/copper", 1, 10), [I("tfc:gem/amethyst", copper_price + 2, copper_price * 2 + 2)]);

        this.newTrade(2, I("tfc:metal/ingot/bronze", 1, 10), [I("tfc:gem/emerald", bronze_price + 2, bronze_price * 2 + 3)]);
        this.newTrade(2, I("tfc:metal/ingot/bronze", 1, 10), [I("tfc:gem/diamond", bronze_price + 2, bronze_price * 2 + 3)]);
        this.newTrade(2, I("tfc:metal/ingot/bronze", 1, 10), [I("tfc:gem/sapphire", bronze_price + 2, bronze_price * 2 + 3)]);

        this.newTrade(2, I("tfc:metal/ingot/bismuth_bronze", 1, 10), [I("tfc:gem/amethyst", bronze_price + 2, bronze_price * 2 + 3)]);
        this.newTrade(2, I("tfc:gem/ruby", bronze_price * 2 + 1, 8), [I("tfc:metal/ingot/bismuth_bronze", 3, 4)]);
        this.newTrade(2, I("tfc:gem/topaz", bronze_price * 2 + 1, 8), [I("tfc:metal/ingot/bismuth_bronze", 3, 4)]);
        this.newTrade(2, I("tfc:gem/opal", bronze_price * 2 + 1, 8), [I("tfc:metal/ingot/bismuth_bronze", 3, 4)]);

        this.newTrade(2, I("tfc:metal/ingot/black_bronze", 1, 10), [I("tfc:gem/sapphire", bronze_price + 2, bronze_price * 2 + 3)]);
        this.newTrade(2, I("tfc:gem/amethyst", bronze_price * 2 + 1, 8), [I("tfc:metal/ingot/black_bronze", 3, 4)]);
        this.newTrade(2, I("tfc:gem/opal", bronze_price * 2 + 1, 8), [I("tfc:metal/ingot/black_bronze", 3, 4)]);
        this.newTrade(2, I("tfc:gem/pyrite", bronze_price * 2 + 1, 8), [I("tfc:metal/ingot/black_bronze", 3, 4)]);
        //
        this.newTrade(2, I("knightsofterrafirma:bismuth_bronze_stiletto_blade", 1, 1), [I("tfc:metal/ingot/bismuth_bronze", 1, 1), I("tfc:gem/topaz", 3, 5)]);
        this.newTrade(2, I("knightsofterrafirma:bismuth_bronze_short_sword_blade", 1, 1), [I("tfc:metal/ingot/bismuth_bronze", 2, 2), I("tfc:gem/sapphire", 4, 6)]);
        this.newTrade(2, I("knightsofterrafirma:bismuth_bronze_katzbalger_blade", 1, 1), [I("tfc:metal/ingot/bismuth_bronze", 2, 2), I("tfc:gem/amethyst", 4, 6)]);
        this.newTrade(2, I("knightsofterrafirma:bismuth_bronze_ahlspiess_blade", 1, 1), [I("tfc:metal/ingot/bismuth_bronze", 2, 2), I("tfc:gem/ruby", 3, 5)]);
        this.newTrade(2, I("knightsofterrafirma:bismuth_bronze_estoc_blade", 1, 1), [I("tfc:metal/ingot/bismuth_bronze", 2, 2), I("tfc:gem/emerald", 2, 3)]);

        this.newTrade(2, I("knightsofterrafirma:black_bronze_stiletto_blade", 1, 1), [I("tfc:metal/ingot/black_bronze", 1, 1), I("tfc:gem/opal", 3, 5)]);
        this.newTrade(2, I("knightsofterrafirma:black_bronze_short_sword_blade", 1, 1), [I("tfc:metal/ingot/black_bronze", 2, 2), I("tfc:gem/sapphire", 5, 7)]);
        this.newTrade(2, I("knightsofterrafirma:black_bronze_katzbalger_blade", 1, 1), [I("tfc:metal/ingot/black_bronze", 2, 2), I("tfc:gem/ruby", 4, 6)]);
        this.newTrade(2, I("knightsofterrafirma:black_bronze_ahlspiess_blade", 1, 1), [I("tfc:metal/ingot/black_bronze", 2, 2), I("tfc:gem/emerald", 3, 4)]);
        this.newTrade(2, I("knightsofterrafirma:black_bronze_estoc_blade", 1, 1), [I("tfc:metal/ingot/black_bronze", 2, 2), I("tfc:gem/opal", 4, 6)]);

        this.newTrade(2, I("knightsofterrafirma:bronze_stiletto_blade", 1, 1), [I("tfc:metal/ingot/bronze", 1, 1), I("tfc:gem/emerald", 3, 5)]);
        this.newTrade(2, I("knightsofterrafirma:bronze_short_sword_blade", 1, 1), [I("tfc:metal/ingot/bronze", 2, 2), I("tfc:gem/ruby", 5, 7)]);
        this.newTrade(2, I("knightsofterrafirma:bronze_katzbalger_blade", 1, 1), [I("tfc:metal/ingot/bronze", 2, 2), I("tfc:gem/sapphire", 5, 7)]);
        this.newTrade(2, I("knightsofterrafirma:bronze_ahlspiess_blade", 1, 1), [I("tfc:metal/ingot/bronze", 2, 2), I("tfc:gem/opal", 4, 6)]);
        this.newTrade(2, I("knightsofterrafirma:bronze_estoc_blade", 1, 1), [I("tfc:metal/ingot/bronze", 2, 2), I("tfc:gem/emerald", 4, 6)]);

        // lvl 3
        this.newTrade(3, I("tfc:metal/ingot/wrought_iron", 1, 10), [I("tfc:gem/diamond", iron_price + 3, iron_price * 2 + 4)]);
        this.newTrade(3, I("tfc:metal/ingot/wrought_iron", 1, 10), [I("tfc:gem/pyrite", iron_price + 3, iron_price * 2 + 4)]);
        this.newTrade(3, I("tfc:metal/ingot/wrought_iron", 1, 10), [I("tfc:gem/ruby", iron_price + 3, iron_price * 2 + 4)]);
        this.newTrade(3, I("tfc:gem/sapphire", iron_price * 2 + 2, 8), [I("tfc:metal/ingot/wrought_iron", 3, 4)]);
        this.newTrade(3, I("tfc:gem/topaz", iron_price * 2 + 2, 8), [I("tfc:metal/ingot/wrought_iron", 3, 4)]);
        this.newTrade(3, I("tfc:gem/opal", iron_price * 2 + 2, 8), [I("tfc:metal/ingot/wrought_iron", 3, 4)]);
        //

        // lvl 4
        this.newTrade(4, I("tfc:metal/ingot/black_steel", 1, 10), [I("tfc:gem/ruby", steel_price + 2, steel_price * 2 + 6)]);
        this.newTrade(4, I("tfc:metal/ingot/black_steel", 1, 10), [I("tfc:gem/opal", steel_price + 2, steel_price * 2 + 6)]);
        this.newTrade(4, I("tfc:metal/ingot/black_steel", 1, 10), [I("tfc:gem/amethyst", steel_price + 2, steel_price * 2 + 6)]);
        this.newTrade(4, I("tfc:gem/emerald", steel_price * 2 + 4, 8), [I("tfc:metal/ingot/black_steel", 3, 4)]);
        this.newTrade(4, I("tfc:gem/sapphire", steel_price * 2 + 4, 8), [I("tfc:metal/ingot/black_steel", 3, 4)]);
        this.newTrade(4, I("tfc:gem/topaz", steel_price * 2 + 4, 8), [I("tfc:metal/ingot/black_steel", 3, 4)]);
        //

        // lvl 5
        this.newTrade(5, I("sns:ore_sack", 1, 3), [I("tfc:gem/amethyst", 15, 21)]);
        this.newTrade(5, I("sns:frame_pack", 1, 1), [I("tfc:gem/ruby", 35, 54)]);
        this.newTrade(5, I("sns:quiver", 1, 3), [I("tfc:gem/opal", 15, 24)]);

        this.newTrade(5, I("knightsofterrafirma:bronze_zweihander_blade", 1, 1), [I("tfc:metal/ingot/bronze", 3, 3), I("tfc:gem/emerald", 6, 8)]);
        this.newTrade(5, I("knightsofterrafirma:bismuth_bronze_claymore_blade", 1, 1), [I("tfc:metal/ingot/bismuth_bronze", 3, 3), I("tfc:gem/ruby", 6, 9)]);
        this.newTrade(5, I("knightsofterrafirma:black_bronze_flame_bladed_sword_blade", 1, 1), [I("tfc:metal/ingot/black_bronze", 3, 3), I("tfc:gem/sapphire", 6, 9)]);
        this.newTrade(5, I("knightsofterrafirma:bronze_rhomphaia_blade", 1, 1), [I("tfc:metal/ingot/bronze", 3, 3), I("tfc:gem/opal", 5, 7)]);
        this.newTrade(5, I("knightsofterrafirma:black_bronze_zweihander_blade", 1, 1), [I("tfc:metal/ingot/black_bronze", 3, 3), I("tfc:gem/emerald", 7, 10)]);

    },

    newTrade: function (level, result, resources) {
        VillagerTrades.registerTrade(this.event, this.name, level, result, resources)
    }
};