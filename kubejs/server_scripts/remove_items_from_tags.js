ServerEvents.tags('block', event => {
    event.remove('minecraft:mineable/pickaxe', [
        "tfc:groundcover/seaweed",
        "tfc:groundcover/dead_grass",
        "tfc:groundcover/driftwood",
        "tfc:groundcover/stick",
        "tfc:groundcover/salt_lick",
        "tfc:groundcover/guano",
        "tfc:groundcover/humus",
        "tfc:groundcover/rotten_flesh",
        "tfc:groundcover/pinecone",
        "tfc:groundcover/feather",
        "tfc:groundcover/mollusk",
        "tfc:groundcover/mussel",
    ])
})