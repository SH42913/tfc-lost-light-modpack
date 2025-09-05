var I = VillagerTrades.createTradeItem;

var Toolsmith = {
    name: "toolsmith",

    registerTrades: function (event) {
        this.event = event

        this.newTrade(1, I("tfc:metal/propick_head/copper", 1, 1), [I("tfc:gem/lapis_lazuli", 4, 6), I("tfc:metal/ingot/copper", 1, 1)]);
        this.newTrade(1, I("tfc:metal/hoe_head/copper", 1, 1), [I("tfc:gem/lapis_lazuli", 4, 6), I("tfc:metal/ingot/copper", 1, 1)]);

        this.newTrade(2, I("tfc:metal/propick_head/bronze", 1, 1), [I("tfc:gem/ruby", 4, 5), I("tfc:metal/ingot/bronze", 1, 1)]);
        this.newTrade(2, I("tfc:metal/propick_head/bismuth_bronze", 1, 1), [I("tfc:gem/ruby", 4, 5), I("tfc:metal/ingot/bismuth_bronze", 1, 1)]);
        this.newTrade(2, I("tfc:metal/propick_head/black_bronze", 1, 1), [I("tfc:gem/ruby", 3, 4), I("tfc:metal/ingot/black_bronze", 1, 1)]);
        this.newTrade(2, I("tfc:metal/hoe_head/bronze", 1, 1), [I("tfc:gem/ruby", 4, 5), I("tfc:metal/ingot/bronze", 1, 1)]);
        this.newTrade(2, I("tfc:metal/hoe_head/bismuth_bronze", 1, 1), [I("tfc:gem/ruby", 4, 5), I("tfc:metal/ingot/bismuth_bronze", 1, 1)]);
        this.newTrade(2, I("tfc:metal/hoe_head/black_bronze", 1, 1), [I("tfc:gem/ruby", 3, 4), I("tfc:metal/ingot/black_bronze", 1, 1)]);

        this.newTrade(3, I("tfc:metal/propick_head/wrought_iron", 1, 1), [I("tfc:gem/sapphire", 2, 6), I("tfc:metal/ingot/wrought_iron", 1, 1)]);
        this.newTrade(3, I("tfc:metal/hoe_head/wrought_iron", 1, 1), [I("tfc:gem/sapphire", 2, 6), I("tfc:metal/ingot/wrought_iron", 1, 1)]);

        this.newTrade(4, I("tfc:metal/fish_hook/steel", 1, 1), [I("tfc:gem/opal", 2, 6), I("tfc:metal/ingot/steel", 2, 2)]);
        this.newTrade(4, I("tfc:metal/fish_hook/black_steel", 1, 1), [I("tfc:gem/opal", 2, 6), I("tfc:metal/ingot/black_steel", 2, 2)]);

        this.newTrade(5, I("tfc:metal/fish_hook/blue_steel", 1, 1), [I("tfc:gem/emerald", 2, 6), I("tfc:metal/ingot/blue_steel", 2, 2)]);
        this.newTrade(5, I("tfc:metal/fish_hook/red_steel", 1, 1), [I("tfc:gem/emerald", 2, 6), I("tfc:metal/ingot/red_steel", 2, 2)]);
    },

    newTrade: function (level, result, resources) {
        VillagerTrades.registerTrade(this.event, this.name, level, result, resources)
    }
}