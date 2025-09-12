MoreJSEvents.villagerTrades(event => {
    event.removeVanillaTrades();
    event.removeModdedTrades();

    Butcher.registerTrades(event)
    Farmer.registerTrades(event)
    Fisherman.registerTrades(event)
    Fletcher.registerTrades(event)
    LeatherWorker.registerTrades(event)
    Mason.registerTrades(event)
    Shepherd.registerTrades(event)
    Toolsmith.registerTrades(event)
    Weaponsmith.registerTrades(event)
    Armorer.registerTrades(event)
    Librarian.registerTrades(event)
    Cleric.registerTrades(event)
    Cartographer.registerTrades(event)
})