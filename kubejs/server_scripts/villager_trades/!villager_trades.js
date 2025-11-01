const copper_price = 2;	//copper ingot price
const bronze_price = 3;
const iron_price = 5;
const steel_price = 8; //black steel ingot price
const legend_price = 8;

const VillagerTrades = {
    createTradeItem: function (name, min, max) {
        return TradeItem.of(name, min, max);
    },
    registerTrade: function (event, name, level, result, resources) {
        event.addTrade(name, level, resources, result)
    }
};

const I = VillagerTrades.createTradeItem;