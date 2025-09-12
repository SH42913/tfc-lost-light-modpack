const VillagerTrades = {
    createTradeItem: function (name, min, max) {
        return TradeItem.of(name, min, max);
    },
    registerTrade: function (event, name, level, result, resources) {
        event.addTrade(name, level, resources, result)
    }
};

const I = VillagerTrades.createTradeItem;