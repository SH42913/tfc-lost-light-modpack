/*
const copper_price = 2;	//copper ingot price
const bronze_price = 3;
const iron_price = 5;
const steel_price = 8; //black steel price
const legend_price = 8;
*/

const Armorer = {
    name: "armorer",

    registerTrades: function (event) {
        this.event = event

        // lvl 1	
        this.newTrade(1, I("tfc:metal/ingot/copper", 1, 10), [I("tfc:gem/emerald", copper_price + 2, copper_price * 2 + 2)]);
        this.newTrade(1, I("tfc:gem/opal", copper_price * 2 + 1, 8), [I("tfc:metal/ingot/copper", 3, 4)]);
        this.newTrade(1, I("tfc:gem/pyrite", copper_price * 2 + 1, 8), [I("tfc:metal/ingot/copper", 3, 4)]);
        this.newTrade(1, I("tfc:gem/ruby", copper_price * 2 + 1, 8), [I("tfc:metal/ingot/copper", 3, 4)]);

        this.newTrade(1, I("tfc:metal/ingot/bronze", 1, 10), [I("tfc:gem/diamond", bronze_price + 2, bronze_price * 2 + 4)]);
        this.newTrade(1, I("tfc:gem/sapphire", bronze_price * 2 + 1, 8), [I("tfc:metal/ingot/bronze", 3, 4)]);
        this.newTrade(1, I("tfc:gem/topaz", bronze_price * 2 + 1, 8), [I("tfc:metal/ingot/bronze", 3, 4)]);
        this.newTrade(1, I("tfc:gem/emerald", bronze_price * 2 + 1, 8), [I("tfc:metal/ingot/bronze", 3, 4)]);
        //
        this.newTrade(1, I("tfc:metal/helmet/copper", 1, 5), [I("tfc:gem/sapphire", 3, 4), I("tfc:metal/ingot/copper", 6, 6)]);
        this.newTrade(1, I("tfc:metal/chestplate/copper", 1, 5), [I("tfc:gem/amethyst", 5, 8), I("tfc:metal/ingot/copper", 8, 8)]);
        this.newTrade(1, I("tfc:metal/greaves/copper", 1, 5), [I("tfc:gem/topaz", 4, 6), I("tfc:metal/ingot/copper", 6, 6)]);
        this.newTrade(1, I("tfc:metal/boots/copper", 1, 5), [I("tfc:gem/pyrite", 3, 4), I("tfc:metal/ingot/copper", 4, 4)]);

        this.newTrade(1, I("tfc:metal/helmet/copper", 1, 5), [I("tfc:gem/emerald", copper_price * 6 + 4, copper_price * 6 + 7)]);
        this.newTrade(1, I("tfc:metal/chestplate/copper", 1, 5), [I("tfc:gem/diamond", copper_price * 8 + 8, copper_price * 8 + 11)]);
        this.newTrade(1, I("tfc:metal/greaves/copper", 1, 5), [I("tfc:gem/opal", copper_price * 6 + 6, copper_price * 6 + 9)]);
        this.newTrade(1, I("tfc:metal/boots/copper", 1, 5), [I("tfc:gem/ruby", copper_price * 4 + 4, copper_price * 4 + 6)]);

        this.newTrade(1, I("knightsofterrafirma:copper_shield_brace", 1, 5), [I("tfc:gem/emerald", 5, 7), I("tfc:metal/ingot/copper", 2, 2)]);
        //lvl 1++
        this.newTrade(1, I("tfc:metal/ingot/wrought_iron", 1, 6), [I("tfc:gem/diamond", iron_price + 3, iron_price * 2 + 5)]);
        this.newTrade(1, I("tfc:metal/greaves/wrought_iron", 1, 3), [I("tfc:gem/ruby", iron_price * 6 + 11, iron_price * 6 + 14)]);
        this.newTrade(1, I("tfc:metal/helmet/wrought_iron", 1, 3), [I("tfc:gem/opal", iron_price * 6 + 10, iron_price * 6 + 14)]);

        // lvl 2
        this.newTrade(2, I("tfc:metal/ingot/copper", 1, 10), [I("tfc:gem/sapphire", copper_price + 2, copper_price * 2 + 2)]);
        this.newTrade(2, I("tfc:metal/ingot/copper", 1, 10), [I("tfc:gem/topaz", copper_price + 2, copper_price * 2 + 2)]);
        this.newTrade(2, I("tfc:metal/ingot/copper", 1, 10), [I("tfc:gem/diamond", copper_price + 2, copper_price * 2 + 2)]);

        this.newTrade(2, I("tfc:metal/ingot/bronze", 1, 10), [I("tfc:gem/amethyst", bronze_price + 2, bronze_price * 2 + 3)]);
        this.newTrade(2, I("tfc:metal/ingot/bronze", 1, 10), [I("tfc:gem/opal", bronze_price + 2, bronze_price * 2 + 3)]);
        this.newTrade(2, I("tfc:metal/ingot/bronze", 1, 10), [I("tfc:gem/pyrite", bronze_price + 2, bronze_price * 2 + 3)]);

        this.newTrade(2, I("tfc:metal/ingot/bismuth_bronze", 1, 10), [I("tfc:gem/ruby", bronze_price + 2, bronze_price * 2 + 3)]);
        this.newTrade(2, I("tfc:gem/emerald", bronze_price * 2 + 1, 8), [I("tfc:metal/ingot/bismuth_bronze", 3, 4)]);
        this.newTrade(2, I("tfc:gem/amethyst", bronze_price * 2 + 1, 8), [I("tfc:metal/ingot/bismuth_bronze", 3, 4)]);
        this.newTrade(2, I("tfc:gem/opal", bronze_price * 2 + 1, 8), [I("tfc:metal/ingot/bismuth_bronze", 3, 4)]);

        this.newTrade(2, I("tfc:metal/ingot/black_bronze", 1, 10), [I("tfc:gem/topaz", bronze_price + 2, bronze_price * 2 + 3)]);
        this.newTrade(2, I("tfc:gem/diamond", bronze_price * 2 + 1, 8), [I("tfc:metal/ingot/black_bronze", 3, 4)]);
        this.newTrade(2, I("tfc:gem/sapphire", bronze_price * 2 + 1, 8), [I("tfc:metal/ingot/black_bronze", 3, 4)]);
        this.newTrade(2, I("tfc:gem/pyrite", bronze_price * 2 + 1, 8), [I("tfc:metal/ingot/black_bronze", 3, 4)]);
        //
        this.newTrade(2, I("tfc:metal/helmet/bismuth_bronze", 1, 5), [I("tfc:gem/amethyst", 6, 8), I("tfc:metal/ingot/bismuth_bronze", 6, 6)]);
        this.newTrade(2, I("tfc:metal/chestplate/bismuth_bronze", 1, 5), [I("tfc:gem/ruby", 9, 12), I("tfc:metal/ingot/bismuth_bronze", 8, 8)]);
        this.newTrade(2, I("tfc:metal/greaves/bismuth_bronze", 1, 5), [I("tfc:gem/topaz", 7, 10), I("tfc:metal/ingot/bismuth_bronze", 6, 6)]);
        this.newTrade(2, I("tfc:metal/boots/bismuth_bronze", 1, 5), [I("tfc:gem/emerald", 7, 9), I("tfc:metal/ingot/bismuth_bronze", 4, 4)]);
        this.newTrade(2, I("knightsofterrafirma:bismuth_bronze_montefortino_helmet", 1, 1), [I("tfc:gem/amethyst", 5, 9), I("tfc:metal/ingot/bismuth_bronze", 6, 6)]);

        this.newTrade(2, I("tfc:metal/helmet/black_bronze", 1, 5), [I("tfc:gem/ruby", 6, 8), I("tfc:metal/ingot/black_bronze", 6, 6)]);
        this.newTrade(2, I("tfc:metal/chestplate/black_bronze", 1, 5), [I("tfc:gem/sapphire", 9, 12), I("tfc:metal/ingot/black_bronze", 8, 8)]);
        this.newTrade(2, I("tfc:metal/greaves/black_bronze", 1, 5), [I("tfc:gem/opal", 7, 10), I("tfc:metal/ingot/black_bronze", 6, 6)]);
        this.newTrade(2, I("tfc:metal/boots/black_bronze", 1, 5), [I("tfc:gem/ruby", 7, 9), I("tfc:metal/ingot/black_bronze", 4, 4)]);
        this.newTrade(2, I("knightsofterrafirma:black_bronze_corinthian_helmet", 1, 1), [I("tfc:gem/sapphire", 5, 9), I("tfc:metal/ingot/black_bronze", 6, 6)]);

        this.newTrade(2, I("tfc:metal/helmet/bronze", 1, 5), [I("tfc:gem/opal", 6, 8), I("tfc:metal/ingot/bronze", 6, 6)]);
        this.newTrade(2, I("tfc:metal/chestplate/bronze", 1, 5), [I("tfc:gem/emerald", 9, 12), I("tfc:metal/ingot/bronze", 8, 8)]);
        this.newTrade(2, I("tfc:metal/greaves/bronze", 1, 5), [I("tfc:gem/sapphire", 7, 10), I("tfc:metal/ingot/bronze", 6, 6)]);
        this.newTrade(2, I("tfc:metal/boots/bronze", 1, 5), [I("tfc:gem/opal", 7, 9), I("tfc:metal/ingot/bronze", 4, 4)]);
        this.newTrade(2, I("antiquelegacy:bronze_montefortino_helmet", 1, 5), [I("tfc:gem/emerald", 8, 13), I("tfc:metal/ingot/bronze", 6, 6)]);

        this.newTrade(2, I("tfc:metal/helmet/bronze", 1, 5), [I("tfc:gem/pyrite", bronze_price * 6 + 6, bronze_price * 6 + 10)]);
        this.newTrade(2, I("tfc:metal/chestplate/bronze", 1, 5), [I("tfc:gem/ruby", bronze_price * 8 + 10, bronze_price * 8 + 16)]);
        this.newTrade(2, I("tfc:metal/greaves/bronze", 1, 5), [I("tfc:gem/topaz", bronze_price * 6 + 8, bronze_price * 6 + 12)]);
        this.newTrade(2, I("tfc:metal/boots/bronze", 1, 5), [I("tfc:gem/amethyst", bronze_price * 4 + 9, bronze_price * 4 + 11)]);

        // lvl 3
        this.newTrade(3, I("tfc:metal/ingot/wrought_iron", 1, 10), [I("tfc:gem/ruby", iron_price + 3, iron_price * 2 + 4)]);
        this.newTrade(3, I("tfc:metal/ingot/wrought_iron", 1, 10), [I("tfc:gem/sapphire", iron_price + 3, iron_price * 2 + 4)]);
        this.newTrade(3, I("tfc:metal/ingot/wrought_iron", 1, 10), [I("tfc:gem/amethyst", iron_price + 3, iron_price * 2 + 4)]);
        this.newTrade(3, I("tfc:gem/emerald", iron_price * 2 + 2, 8), [I("tfc:metal/ingot/wrought_iron", 3, 4)]);
        this.newTrade(3, I("tfc:gem/diamond", iron_price * 2 + 2, 8), [I("tfc:metal/ingot/wrought_iron", 3, 4)]);
        this.newTrade(3, I("tfc:gem/opal", iron_price * 2 + 2, 8), [I("tfc:metal/ingot/wrought_iron", 3, 4)]);
        //
        this.newTrade(3, I("antiquelegacy:bronze_left_hand_manika_decoration", 1, 5), [I("tfc:gem/opal", bronze_price * 3 + 10, bronze_price * 3 + 16)]);
        this.newTrade(3, I("antiquelegacy:bronze_right_hand_manika_decoration", 1, 5), [I("tfc:gem/topaz", bronze_price * 3 + 10, bronze_price * 3 + 16)]);
        this.newTrade(3, I("antiquelegacy:right_gladiator_shoulder_pad_decoration", 1, 5), [I("tfc:gem/sapphire", 13, 20), I("tfc:metal/ingot/bronze", 2, 2)]);
        this.newTrade(3, I("antiquelegacy:left_gladiator_shoulder_pad_decoration", 1, 5), [I("tfc:gem/amethyst", 13, 20), I("tfc:metal/ingot/bronze", 2, 2)]);

        this.newTrade(3, I("tfc:metal/helmet/wrought_iron", 1, 5), [I("tfc:gem/opal", iron_price * 6 + 10, iron_price * 6 + 14)]);
        this.newTrade(3, I("tfc:metal/chestplate/wrought_iron", 1, 5), [I("tfc:gem/diamond", iron_price * 8 + 14, iron_price * 8 + 17)]);
        this.newTrade(3, I("tfc:metal/greaves/wrought_iron", 1, 5), [I("tfc:gem/sapphire", iron_price * 6 + 11, iron_price * 6 + 14)]);
        this.newTrade(3, I("tfc:metal/boots/wrought_iron", 1, 5), [I("tfc:gem/topaz", iron_price * 4 + 10, iron_price * 4 + 13)]);

        this.newTrade(3, I("tfc:metal/helmet/wrought_iron", 1, 5), [I("tfc:gem/ruby", 10, 14), I("tfc:metal/ingot/wrought_iron", 6, 6)]);
        this.newTrade(3, I("tfc:metal/chestplate/wrought_iron", 1, 5), [I("tfc:gem/emerald", 14, 17), I("tfc:metal/ingot/wrought_iron", 8, 8)]);
        this.newTrade(3, I("tfc:metal/greaves/wrought_iron", 1, 5), [I("tfc:gem/pyrite", 11, 14), I("tfc:metal/ingot/wrought_iron", 6, 6)]);
        this.newTrade(3, I("tfc:metal/boots/wrought_iron", 1, 5), [I("tfc:gem/amethyst", 10, 13), I("tfc:metal/ingot/wrought_iron", 4, 4)]);

        // lvl 4
        this.newTrade(4, I("tfc:metal/ingot/black_steel", 1, 10), [I("tfc:gem/emerald", steel_price + 2, steel_price * 2 + 6)]);
        this.newTrade(4, I("tfc:metal/ingot/black_steel", 1, 10), [I("tfc:gem/diamond", steel_price + 2, steel_price * 2 + 6)]);
        this.newTrade(4, I("tfc:metal/ingot/black_steel", 1, 10), [I("tfc:gem/amethyst", steel_price + 2, steel_price * 2 + 6)]);
        this.newTrade(4, I("tfc:gem/opal", steel_price * 2 + 4, 8), [I("tfc:metal/ingot/black_steel", 3, 4)]);
        this.newTrade(4, I("tfc:gem/pyrite", steel_price * 2 + 4, 8), [I("tfc:metal/ingot/black_steel", 3, 4)]);
        this.newTrade(4, I("tfc:gem/ruby", steel_price * 2 + 4, 8), [I("tfc:metal/ingot/black_steel", 3, 4)]);
        //
        this.newTrade(4, I("tfc:metal/helmet/black_steel", 1, 5), [I("tfc:gem/sapphire", steel_price * 6 + 14, steel_price * 6 + 18)]);
        this.newTrade(4, I("tfc:metal/chestplate/black_steel", 1, 5), [I("tfc:gem/ruby", steel_price * 8 + 18, steel_price * 8 + 21)]);
        this.newTrade(4, I("tfc:metal/greaves/black_steel", 1, 5), [I("tfc:gem/emerald", steel_price * 6 + 15, steel_price * 6 + 19)]);
        this.newTrade(4, I("tfc:metal/boots/black_steel", 1, 5), [I("tfc:gem/opal", steel_price * 4 + 13, steel_price * 4 + 17)]);

        this.newTrade(4, I("tfc:metal/helmet/black_steel", 1, 5), [I("tfc:gem/diamond", 14, 18), I("tfc:metal/ingot/black_steel", 6, 6)]);
        this.newTrade(4, I("tfc:metal/chestplate/black_steel", 1, 5), [I("tfc:gem/opal", 18, 21), I("tfc:metal/ingot/black_steel", 8, 8)]);
        this.newTrade(4, I("tfc:metal/greaves/black_steel", 1, 5), [I("tfc:gem/amethyst", 15, 19), I("tfc:metal/ingot/black_steel", 6, 6)]);
        this.newTrade(4, I("tfc:metal/boots/black_steel", 1, 5), [I("tfc:gem/sapphire", 13, 17), I("tfc:metal/ingot/black_steel", 4, 4)]);

        this.newTrade(4, I("antiquelegacy:bronze_muscle_cuirass", 1, 2), [I("tfc:gem/emerald", 14, 20), I("tfc:metal/ingot/bronze", 2, 2)]);
        this.newTrade(4, I("antiquelegacy:bronze_roman_greaves", 1, 2), [I("tfc:gem/emerald", 12, 18), I("tfc:metal/ingot/bronze", 2, 2)]);
        this.newTrade(4, I("knightsofterrafirma:bismuth_bronze_muscle_cuirass", 1, 2), [I("tfc:gem/emerald", 16, 22), I("tfc:metal/ingot/bismuth_bronze", 2, 2)]);
        this.newTrade(4, I("knightsofterrafirma:black_bronze_muscle_cuirass", 1, 2), [I("tfc:gem/emerald", 18, 24), I("tfc:metal/ingot/black_bronze", 2, 2)]);
        this.newTrade(4, I("knightsofterrafirma:bronze_republic_gladius", 1, 2), [I("tfc:gem/emerald", 20, 28), I("tfc:metal/ingot/bronze", 2, 2)]);

        // lvl 5
        this.newTrade(5, I("sns:ore_sack", 1, 3), [I("tfc:gem/amethyst", 15, 21)]);
        this.newTrade(5, I("sns:frame_pack", 1, 1), [I("tfc:gem/ruby", 35, 54)]);
        this.newTrade(5, I("sns:quiver", 1, 3), [I("tfc:gem/opal", 15, 24)]);
    },

    newTrade: function (level, result, resources) {
        VillagerTrades.registerTrade(this.event, this.name, level, result, resources)
    }
};