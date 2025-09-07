var I = VillagerTrades.createTradeItem;

var Cartographer = {
    name: "cartographer",

    registerTrades: function (event) {
        this.event = event

        var junglePyramidMap = this.newStructureMap("minecraft:jungle_pyramid", "Map to Jungle Pyramid");
        this.newTrade(1, junglePyramidMap, [I("tfc:gem/amethyst", 2, 4)]);
    },

    newTrade: function (level, result, resources) {
        VillagerTrades.registerTrade(this.event, this.name, level, result, resources)
    },

    newStructureMap: function (structureId, name) {
        var itemStack = Item.of("minecraft:map").withNBT({
            display: {Name: '{"text":"' + name + '"}'},
            destination: structureId,
            map_type: "structure"
        });
        return TradeItem.of(itemStack, 1, 1);
    }
}