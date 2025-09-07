var I = VillagerTrades.createTradeItem;

var Librarian = {
    name: "librarian",

    registerTrades: function (event) {
        this.event = event

        var unbreakingBook = this.newBook("minecraft:unbreaking", 1);
        this.newTrade(1, unbreakingBook, [I("tfc:gem/amethyst", 2, 4)]);
    },

    newTrade: function (level, result, resources) {
        VillagerTrades.registerTrade(this.event, this.name, level, result, resources)
    },

    newBook: function (enchantId, level) {
        var itemStack = Item.of("minecraft:enchanted_book").enchant(enchantId, level);
        return TradeItem.of(itemStack, 1, 1);
    }
}