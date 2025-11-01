/*const copper_price = 2;	//copper ingot price
const bronze_price = 3;
const iron_price = 5;
const steel_price = 8; //black steel price
const legend_price = 8;
*/

const Toolsmith = {
    name: "toolsmith",

    registerTrades: function (event) {
        this.event = event

        // lvl 1	
        this.newTrade(1, I("tfc:metal/ingot/copper", 1, 10), [I("tfc:gem/pyrite", copper_price + 2, copper_price * 2 + 2)]);
        this.newTrade(1, I("tfc:gem/sapphire", copper_price * 2 + 1, 8), [I("tfc:metal/ingot/copper", 3, 4)]);
        this.newTrade(1, I("tfc:gem/topaz", copper_price * 2 + 1, 8), [I("tfc:metal/ingot/copper", 3, 4)]);
        this.newTrade(1, I("tfc:gem/emerald", copper_price * 2 + 1, 8), [I("tfc:metal/ingot/copper", 3, 4)]);

        this.newTrade(1, I("tfc:metal/ingot/bronze", 1, 10), [I("tfc:gem/ruby", bronze_price + 2, bronze_price * 2 + 4)]);
        this.newTrade(1, I("tfc:gem/diamond", bronze_price * 2 + 1, 8), [I("tfc:metal/ingot/bronze", 3, 4)]);
        this.newTrade(1, I("tfc:gem/amethyst", bronze_price * 2 + 1, 8), [I("tfc:metal/ingot/bronze", 3, 4)]);
        this.newTrade(1, I("tfc:gem/opal", bronze_price * 2 + 1, 8), [I("tfc:metal/ingot/bronze", 3, 4)]);
        //
        this.newTrade(1, I("tfc:metal/pickaxe_head/copper", 1, 6), [I("tfc:gem/emerald", 4, 6), I("tfc:metal/ingot/copper", 1, 1)]);
        this.newTrade(1, I("tfc:metal/axe_head/copper", 1, 6), [I("tfc:gem/topaz", 4, 6), I("tfc:metal/ingot/copper", 1, 1)]);
        this.newTrade(1, I("tfc:metal/shovel_head/copper", 1, 6), [I("tfc:gem/pyrite", 3, 5), I("tfc:metal/ingot/copper", 1, 1)]);
        this.newTrade(1, I("tfc:metal/chisel_head/copper", 1, 6), [I("tfc:gem/amethyst", 3, 5), I("tfc:metal/ingot/copper", 1, 1)]);
        this.newTrade(1, I("tfc:metal/hammer_head/copper", 1, 6), [I("tfc:gem/ruby", 4, 6), I("tfc:metal/ingot/copper", 1, 1)]);
        this.newTrade(1, I("tfc:metal/saw_blade/copper", 1, 6), [I("tfc:gem/ruby", 4, 6), I("tfc:metal/ingot/copper", 1, 1)]);
        this.newTrade(1, I("tfc:metal/propick_head/copper", 1, 6), [I("tfc:gem/ruby", 4, 6), I("tfc:metal/ingot/copper", 1, 1)]);
        this.newTrade(1, I("tfc:metal/scythe_blade/copper", 1, 6), [I("tfc:gem/ruby", 4, 6), I("tfc:metal/ingot/copper", 1, 1)]);
        this.newTrade(1, I("tfc:metal/hoe_head/copper", 1, 6), [I("tfc:gem/ruby", 4, 6), I("tfc:metal/ingot/copper", 1, 1)]);

        this.newTrade(1, I("tfc:metal/pickaxe_head/copper", 1, 6), [I("tfc:gem/emerald", 4, 6)]);
        this.newTrade(1, I("tfc:metal/axe_head/copper", 1, 6), [I("tfc:gem/topaz", 4, 6)]);
        this.newTrade(1, I("tfc:metal/shovel_head/copper", 1, 6), [I("tfc:gem/pyrite", 3, 5)]);
        this.newTrade(1, I("tfc:metal/chisel_head/copper", 1, 6), [I("tfc:gem/amethyst", 3, 5)]);
        this.newTrade(1, I("tfc:metal/hammer_head/copper", 1, 6), [I("tfc:gem/ruby", 4, 6)]);
        //lvl 1++

        // lvl 2
        this.newTrade(2, I("tfc:metal/ingot/copper", 1, 10), [I("tfc:gem/ruby", copper_price + 2, copper_price * 2 + 2)]);
        this.newTrade(2, I("tfc:metal/ingot/copper", 1, 10), [I("tfc:gem/amethyst", copper_price + 2, copper_price * 2 + 2)]);
        this.newTrade(2, I("tfc:metal/ingot/copper", 1, 10), [I("tfc:gem/opal", copper_price + 2, copper_price * 2 + 2)]);

        this.newTrade(2, I("tfc:metal/ingot/bronze", 1, 10), [I("tfc:gem/ruby", bronze_price + 2, bronze_price * 2 + 3)]);
        this.newTrade(2, I("tfc:metal/ingot/bronze", 1, 10), [I("tfc:gem/sapphire", bronze_price + 2, bronze_price * 2 + 3)]);
        this.newTrade(2, I("tfc:metal/ingot/bronze", 1, 10), [I("tfc:gem/topaz", bronze_price + 2, bronze_price * 2 + 3)]);

        this.newTrade(2, I("tfc:metal/ingot/bismuth_bronze", 1, 10), [I("tfc:gem/opal", bronze_price + 2, bronze_price * 2 + 3)]);
        this.newTrade(2, I("tfc:gem/pyrite", bronze_price * 2 + 1, 8), [I("tfc:metal/ingot/bismuth_bronze", 3, 4)]);
        this.newTrade(2, I("tfc:gem/sapphire", bronze_price * 2 + 1, 8), [I("tfc:metal/ingot/bismuth_bronze", 3, 4)]);
        this.newTrade(2, I("tfc:gem/diamond", bronze_price * 2 + 1, 8), [I("tfc:metal/ingot/bismuth_bronze", 3, 4)]);

        this.newTrade(2, I("tfc:metal/ingot/black_bronze", 1, 10), [I("tfc:gem/amethyst", bronze_price + 2, bronze_price * 2 + 3)]);
        this.newTrade(2, I("tfc:gem/topaz", bronze_price * 2 + 1, 8), [I("tfc:metal/ingot/black_bronze", 3, 4)]);
        this.newTrade(2, I("tfc:gem/ruby", bronze_price * 2 + 1, 8), [I("tfc:metal/ingot/black_bronze", 3, 4)]);
        this.newTrade(2, I("tfc:gem/emerald", bronze_price * 2 + 1, 8), [I("tfc:metal/ingot/black_bronze", 3, 4)]);
        //
        this.newTrade(2, I("tfc:metal/pickaxe_head/bismuth_bronze", 1, 1), [I("tfc:gem/sapphire", 5, 7), I("tfc:metal/ingot/bismuth_bronze", 1, 1)]);
        this.newTrade(2, I("tfc:metal/axe_head/bismuth_bronze", 1, 1), [I("tfc:gem/opal", 5, 7), I("tfc:metal/ingot/bismuth_bronze", 1, 1)]);
        this.newTrade(2, I("tfc:metal/shovel_head/bismuth_bronze", 1, 1), [I("tfc:gem/topaz", 4, 6), I("tfc:metal/ingot/bismuth_bronze", 1, 1)]);
        this.newTrade(2, I("tfc:metal/chisel_head/bismuth_bronze", 1, 1), [I("tfc:gem/emerald", 5, 7), I("tfc:metal/ingot/bismuth_bronze", 1, 1)]);
        this.newTrade(2, I("tfc:metal/hammer_head/bismuth_bronze", 1, 1), [I("tfc:gem/ruby", 5, 7), I("tfc:metal/ingot/bismuth_bronze", 1, 1)]);

        this.newTrade(2, I("tfc:metal/pickaxe_head/black_bronze", 1, 1), [I("tfc:gem/sapphire", 6, 8), I("tfc:metal/ingot/black_bronze", 1, 1)]);
        this.newTrade(2, I("tfc:metal/axe_head/black_bronze", 1, 1), [I("tfc:gem/opal", 6, 8), I("tfc:metal/ingot/black_bronze", 1, 1)]);
        this.newTrade(2, I("tfc:metal/shovel_head/black_bronze", 1, 1), [I("tfc:gem/amethyst", 6, 8), I("tfc:metal/ingot/black_bronze", 1, 1)]);
        this.newTrade(2, I("tfc:metal/chisel_head/black_bronze", 1, 1), [I("tfc:gem/emerald", 6, 8), I("tfc:metal/ingot/black_bronze", 1, 1)]);
        this.newTrade(2, I("tfc:metal/hammer_head/black_bronze", 1, 1), [I("tfc:gem/ruby", 6, 8), I("tfc:metal/ingot/black_bronze", 1, 1)]);

        this.newTrade(2, I("tfc:metal/pickaxe_head/bronze", 1, 1), [I("tfc:gem/sapphire", 7, 9), I("tfc:metal/ingot/bronze", 1, 1)]);
        this.newTrade(2, I("tfc:metal/axe_head/bronze", 1, 1), [I("tfc:gem/opal", 7, 9), I("tfc:metal/ingot/bronze", 1, 1)]);
        this.newTrade(2, I("tfc:metal/shovel_head/bronze", 1, 1), [I("tfc:gem/amethyst", 7, 9), I("tfc:metal/ingot/bronze", 1, 1)]);
        this.newTrade(2, I("tfc:metal/chisel_head/bronze", 1, 1), [I("tfc:gem/emerald", 7, 9), I("tfc:metal/ingot/bronze", 1, 1)]);
        this.newTrade(2, I("tfc:metal/hammer_head/bronze", 1, 1), [I("tfc:gem/ruby", 7, 9), I("tfc:metal/ingot/bronze", 1, 1)]);

        this.newTrade(2, I("tfc:metal/propick_head/bronze", 1, 1), [I("tfc:gem/emerald", 8, 10), I("tfc:metal/ingot/bronze", 1, 1)]);
        this.newTrade(2, I("tfc:metal/saw_blade/bronze", 1, 1), [I("tfc:gem/sapphire", 8, 10), I("tfc:metal/ingot/bronze", 1, 1)]);
        this.newTrade(2, I("tfc:metal/hoe_head/bronze", 1, 1), [I("tfc:gem/topaz", 8, 10), I("tfc:metal/ingot/bronze", 1, 1)]);
        this.newTrade(2, I("tfc:metal/knife_blade/bronze", 1, 1), [I("tfc:gem/ruby", 8, 10), I("tfc:metal/ingot/bronze", 1, 1)]);
        this.newTrade(2, I("tfc:metal/hammer_head/bronze", 1, 1), [I("tfc:gem/opal", 8, 10), I("tfc:metal/ingot/bronze", 1, 1)]);

        // lvl 3
        this.newTrade(3, I("tfc:metal/ingot/wrought_iron", 1, 10), [I("tfc:gem/topaz", iron_price + 3, iron_price * 2 + 4)]);
        this.newTrade(3, I("tfc:metal/ingot/wrought_iron", 1, 10), [I("tfc:gem/emerald", iron_price + 3, iron_price * 2 + 4)]);
        this.newTrade(3, I("tfc:metal/ingot/wrought_iron", 1, 10), [I("tfc:gem/opal", iron_price + 3, iron_price * 2 + 4)]);
        this.newTrade(3, I("tfc:gem/ruby", iron_price * 2 + 2, 8), [I("tfc:metal/ingot/wrought_iron", 3, 4)]);
        this.newTrade(3, I("tfc:gem/pyrite", iron_price * 2 + 2, 8), [I("tfc:metal/ingot/wrought_iron", 3, 4)]);
        this.newTrade(3, I("tfc:gem/amethyst", iron_price * 2 + 2, 8), [I("tfc:metal/ingot/wrought_iron", 3, 4)]);
        //

        // lvl 4
        this.newTrade(4, I("tfc:metal/ingot/black_steel", 1, 10), [I("tfc:gem/pyrite", steel_price + 2, steel_price * 2 + 6)]);
        this.newTrade(4, I("tfc:metal/ingot/black_steel", 1, 10), [I("tfc:gem/sapphire", steel_price + 2, steel_price * 2 + 6)]);
        this.newTrade(4, I("tfc:metal/ingot/black_steel", 1, 10), [I("tfc:gem/topaz", steel_price + 2, steel_price * 2 + 6)]);
        this.newTrade(4, I("tfc:gem/diamond", steel_price * 2 + 4, 8), [I("tfc:metal/ingot/black_steel", 3, 4)]);
        this.newTrade(4, I("tfc:gem/amethyst", steel_price * 2 + 4, 8), [I("tfc:metal/ingot/black_steel", 3, 4)]);
        this.newTrade(4, I("tfc:gem/ruby", steel_price * 2 + 4, 8), [I("tfc:metal/ingot/black_steel", 3, 4)]);
        //

        // lvl 5
        this.newTrade(5, I("sns:ore_sack", 1, 3), [I("tfc:gem/amethyst", 15, 21)]);
        this.newTrade(5, I("sns:frame_pack", 1, 1), [I("tfc:gem/ruby", 35, 54)]);
        this.newTrade(5, I("sns:quiver", 1, 3), [I("tfc:gem/opal", 15, 24)]);
    },

    newTrade: function (level, result, resources) {
        VillagerTrades.registerTrade(this.event, this.name, level, result, resources)
    }
};