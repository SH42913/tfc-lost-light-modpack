TFCEvents.limitContainer("minecraft:generic_9x3", event => {
    // Allowed Values: TINY, VERY_SMALL, SMALL, NORMAL, LARGE, VERY_LARGE, HUGE
    event.limit("normal") // TFC chests is LARGE limited
})