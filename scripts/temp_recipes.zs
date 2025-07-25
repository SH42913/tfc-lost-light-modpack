// TODO: Port to KubeJS

// gold ingots conversion
craftingTable.addShapeless("vanilla_gold_ingot_to_tfc", <item:tfc:metal/ingot/gold>, [<item:minecraft:gold_ingot>]);
craftingTable.addShapeless("tfc_gold_ingot_to_vanilla", <item:minecraft:gold_ingot>, [<item:tfc:metal/ingot/gold>]);

// iron ingots conversion
craftingTable.addShapeless("vanilla_iron_ingot_to_tfc", <item:tfc:metal/ingot/cast_iron>, [<item:minecraft:iron_ingot>]);
craftingTable.addShapeless("tfc_iron_ingot_to_vanilla", <item:minecraft:iron_ingot>, [<item:tfc:metal/ingot/cast_iron>]);

// TFC Loot obsidian to BSA obsidian
craftingTable.addShapeless("obsidian_scrap_to_bsa_obsidian", <item:bsa:obsidian>, [<item:tfc_loot:obsidian_scrap>]);

// TFC amethyst to vanilla amethist shard
craftingTable.addShapeless("tfc_amethyst_to_shard", <item:minecraft:amethyst_shard>, [<item:tfc:gem/amethyst>, <item:tfc:sandpaper>]);

// Rotten flesh usage
var flesh = <item:minecraft:rotten_flesh>;
craftingTable.addShapeless("rotten_flesh_to_raw_hide", <item:tfc:small_raw_hide>, [flesh, flesh, flesh, flesh, flesh, flesh, <item:tfc:bone_needle>, <tag:items:forge:string>]);