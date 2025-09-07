var I = VillagerTrades.createTradeItem;

var Toolsmith = {
    name: "toolsmith",

    registerTrades: function (event) {
        this.event = event

        this.newTrade(1, I("tfc:metal/pickaxe_head/copper", 1, 1), [I("tfc:gem/lapis_lazuli", 4, 6), I("tfc:metal/ingot/copper", 1, 1)])
        this.newTrade(1, I("tfc:metal/axe_head/copper", 1, 1), [I("tfc:gem/topaz", 4, 6), I("tfc:metal/ingot/copper", 1, 1)])
        this.newTrade(1, I("tfc:metal/shovel_head/copper", 1, 1), [I("tfc:gem/pyrite", 3, 5), I("tfc:metal/ingot/copper", 1, 1)])
        this.newTrade(1, I("tfc:metal/chisel_head/copper", 1, 1), [I("tfc:gem/amethyst", 3, 5), I("tfc:metal/ingot/copper", 1, 1)])
        this.newTrade(1, I("tfc:metal/hammer_head/copper", 1, 1), [I("tfc:gem/ruby", 4, 6), I("tfc:metal/ingot/copper", 1, 1)])

        this.newTrade(2, I("tfc:metal/pickaxe_head/bismuth_bronze", 1, 1), [I("tfc:gem/sapphire", 5, 7), I("tfc:metal/ingot/bismuth_bronze", 1, 1)])
        this.newTrade(2, I("tfc:metal/axe_head/bismuth_bronze", 1, 1), [I("tfc:gem/opal", 5, 7), I("tfc:metal/ingot/bismuth_bronze", 1, 1)])
        this.newTrade(2, I("tfc:metal/shovel_head/bismuth_bronze", 1, 1), [I("tfc:gem/topaz", 4, 6), I("tfc:metal/ingot/bismuth_bronze", 1, 1)])
        this.newTrade(2, I("tfc:metal/chisel_head/bismuth_bronze", 1, 1), [I("tfc:gem/emerald", 5, 7), I("tfc:metal/ingot/bismuth_bronze", 1, 1)])
        this.newTrade(2, I("tfc:metal/hammer_head/bismuth_bronze", 1, 1), [I("tfc:gem/ruby", 5, 7), I("tfc:metal/ingot/bismuth_bronze", 1, 1)])

        this.newTrade(3, I("tfc:metal/pickaxe_head/black_bronze", 1, 1), [I("tfc:gem/sapphire", 6, 8), I("tfc:metal/ingot/black_bronze", 1, 1)])
        this.newTrade(3, I("tfc:metal/axe_head/black_bronze", 1, 1), [I("tfc:gem/opal", 6, 8), I("tfc:metal/ingot/black_bronze", 1, 1)])
        this.newTrade(3, I("tfc:metal/shovel_head/black_bronze", 1, 1), [I("tfc:gem/amethyst", 6, 8), I("tfc:metal/ingot/black_bronze", 1, 1)])
        this.newTrade(3, I("tfc:metal/chisel_head/black_bronze", 1, 1), [I("tfc:gem/emerald", 6, 8), I("tfc:metal/ingot/black_bronze", 1, 1)])
        this.newTrade(3, I("tfc:metal/hammer_head/black_bronze", 1, 1), [I("tfc:gem/ruby", 6, 8), I("tfc:metal/ingot/black_bronze", 1, 1)])

        this.newTrade(4, I("tfc:metal/pickaxe_head/bronze", 1, 1), [I("tfc:gem/sapphire", 7, 9), I("tfc:metal/ingot/bronze", 1, 1)])
        this.newTrade(4, I("tfc:metal/axe_head/bronze", 1, 1), [I("tfc:gem/opal", 7, 9), I("tfc:metal/ingot/bronze", 1, 1)])
        this.newTrade(4, I("tfc:metal/shovel_head/bronze", 1, 1), [I("tfc:gem/amethyst", 7, 9), I("tfc:metal/ingot/bronze", 1, 1)])
        this.newTrade(4, I("tfc:metal/chisel_head/bronze", 1, 1), [I("tfc:gem/emerald", 7, 9), I("tfc:metal/ingot/bronze", 1, 1)])
        this.newTrade(4, I("tfc:metal/hammer_head/bronze", 1, 1), [I("tfc:gem/ruby", 7, 9), I("tfc:metal/ingot/bronze", 1, 1)])

        this.newTrade(5, I("tfc:metal/propick_head/bronze", 1, 1), [I("tfc:gem/emerald", 8, 10), I("tfc:metal/ingot/bronze", 1, 1)])
        this.newTrade(5, I("tfc:metal/saw_blade/bronze", 1, 1), [I("tfc:gem/sapphire", 8, 10), I("tfc:metal/ingot/bronze", 1, 1)])
        this.newTrade(5, I("tfc:metal/hoe_head/bronze", 1, 1), [I("tfc:gem/topaz", 8, 10), I("tfc:metal/ingot/bronze", 1, 1)])
        this.newTrade(5, I("tfc:metal/knife_blade/bronze", 1, 1), [I("tfc:gem/ruby", 8, 10), I("tfc:metal/ingot/bronze", 1, 1)])
        this.newTrade(5, I("tfc:metal/hammer_head/bronze", 1, 1), [I("tfc:gem/opal", 8, 10), I("tfc:metal/ingot/bronze", 1, 1)])
    },

    newTrade: function (level, result, resources) {
        VillagerTrades.registerTrade(this.event, this.name, level, result, resources)
    }
}