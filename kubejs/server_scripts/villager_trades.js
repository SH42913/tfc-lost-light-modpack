
MoreJSEvents.villagerTrades(event => {
    event.removeVanillaTrades();
    event.removeModdedTrades();

    event.addTrade("farmer", 1, [TradeItem.of("tfc:gem/pyrite",1,2),TradeItem.of("tfc:gem/topaz",1,2)], TradeItem.of("tfc:wood/sapling/birch",2,4));
    event.addTrade("farmer", 1, [TradeItem.of("tfc:gem/pyrite",1,2),TradeItem.of("tfc:gem/topaz",1,2)], TradeItem.of("tfc:wood/sapling/spruce",2,4));
    event.addTrade("farmer", 1, [TradeItem.of("tfc:gem/topaz",1,2), TradeItem.of("tfc:gem/lapis_lazuli",1,2)], TradeItem.of("tfc:food/wheat",6,12));
    event.addTrade("farmer", 1, [TradeItem.of("tfc:gem/topaz",1,2), TradeItem.of("tfc:gem/lapis_lazuli",1,2)], TradeItem.of("tfc:seeds/wheat",4,8));
    event.addTrade("farmer", 1, [TradeItem.of("tfc:gem/topaz",1,2), TradeItem.of("tfc:gem/lapis_lazuli",1,2)], TradeItem.of("tfc:food/beet",6,12));
    event.addTrade("farmer", 1, [TradeItem.of("tfc:gem/topaz",1,2), TradeItem.of("tfc:gem/lapis_lazuli",1,2)], TradeItem.of("tfc:seeds/beet",4,8));

    event.addTrade("farmer", 2, [TradeItem.of("tfc:gem/topaz",1,3),TradeItem.of("tfc:gem/lapis_lazuli",1,2)], TradeItem.of("tfc:plant/green_apple_sapling",1,2));
    event.addTrade("farmer", 2, [TradeItem.of("tfc:gem/topaz",1,3),TradeItem.of("tfc:gem/lapis_lazuli",1,2)], TradeItem.of("tfc:plant/red_apple_sapling",1,2));
    event.addTrade("farmer", 2, [TradeItem.of("tfc:gem/lapis_lazuli",1,3),TradeItem.of("tfc:gem/amethyst",1,2)], TradeItem.of("tfc:food/red_apple",6,12));
    event.addTrade("farmer", 2, [TradeItem.of("tfc:gem/lapis_lazuli",1,3),TradeItem.of("tfc:gem/amethyst",1,2)], TradeItem.of("tfc:food/green_apple",6,12));
    event.addTrade("farmer", 2, [TradeItem.of("tfc:gem/lapis_lazuli",1,3),TradeItem.of("tfc:gem/amethyst",1,2)], TradeItem.of("tfc:food/carrot",6,12));
    event.addTrade("farmer", 2, [TradeItem.of("tfc:gem/lapis_lazuli",1,3),TradeItem.of("tfc:gem/amethyst",1,2)], TradeItem.of("tfc:seeds/carrot",4,8));
    event.addTrade("farmer", 2, [TradeItem.of("tfc:gem/lapis_lazuli",1,3),TradeItem.of("tfc:gem/amethyst",1,2)], TradeItem.of("tfc:food/potato",6,12));
    event.addTrade("farmer", 2, [TradeItem.of("tfc:gem/lapis_lazuli",1,3),TradeItem.of("tfc:gem/amethyst",1,2)], TradeItem.of("tfc:seeds/potato",4,8));

    event.addTrade("farmer", 3, [TradeItem.of("tfc:gem/lapis_lazuli",1,3),TradeItem.of("tfc:gem/amethyst",1,2)], TradeItem.of("tfc:plant/olive_sapling",1,2));
    event.addTrade("farmer", 3, [TradeItem.of("tfc:gem/lapis_lazuli",1,3),TradeItem.of("tfc:gem/amethyst",1,2)], TradeItem.of("tfc:plant/cherry_sapling",1,2));
    event.addTrade("farmer", 3, [TradeItem.of("tfc:gem/amethyst",1,3),TradeItem.of("tfc:gem/ruby",1,3)], TradeItem.of("tfc:food/olive",6,12));
    event.addTrade("farmer", 3, [TradeItem.of("tfc:gem/amethyst",1,3),TradeItem.of("tfc:gem/ruby",1,3)], TradeItem.of("tfc:food/maize",6,12));
    event.addTrade("farmer", 3, [TradeItem.of("tfc:gem/amethyst",1,3),TradeItem.of("tfc:gem/ruby",1,3)], TradeItem.of("tfc:food/tomato",6,12));
    event.addTrade("farmer", 3, [TradeItem.of("tfc:gem/amethyst",1,3),TradeItem.of("tfc:gem/ruby",1,3)], TradeItem.of("tfc:food/onion",6,12));
    event.addTrade("farmer", 3, [TradeItem.of("tfc:gem/amethyst",1,3),TradeItem.of("tfc:gem/ruby",1,3)], TradeItem.of("tfc:seeds/tomato",6,8));
    event.addTrade("farmer", 3, [TradeItem.of("tfc:gem/amethyst",1,3),TradeItem.of("tfc:gem/ruby",1,3)], TradeItem.of("tfc:seeds/onion",6,8));
    event.addTrade("farmer", 3, [TradeItem.of("tfc:gem/amethyst",1,3),TradeItem.of("tfc:gem/ruby",1,3)], TradeItem.of("tfc:seeds/maize",6,8));

    event.addTrade("farmer", 4, [TradeItem.of("tfc:gem/amethyst",1,4),TradeItem.of("tfc:gem/ruby",1,3)], TradeItem.of("tfc:plant/peach_sapling",1,2));
    event.addTrade("farmer", 4, [TradeItem.of("tfc:gem/amethyst",1,4),TradeItem.of("tfc:gem/ruby",1,3)], TradeItem.of("tfc:plant/plum_sapling",1,2));
    event.addTrade("farmer", 4, [TradeItem.of("tfc:gem/amethyst",1,4),TradeItem.of("tfc:gem/ruby",1,3)], TradeItem.of("tfc:plant/banana_sapling",1,2));
    event.addTrade("farmer", 4, [TradeItem.of("tfc:gem/amethyst",1,4),TradeItem.of("tfc:gem/ruby",1,3)], TradeItem.of("tfc:plant/orange_sapling",1,2));
    event.addTrade("farmer", 4, [TradeItem.of("tfc:gem/ruby",1,4),TradeItem.of("tfc:gem/sapphire",1,3)], TradeItem.of("tfc:food/peach",12,16));
    event.addTrade("farmer", 4, [TradeItem.of("tfc:gem/ruby",1,4),TradeItem.of("tfc:gem/sapphire",1,3)], TradeItem.of("tfc:food/plum",12,16));
    event.addTrade("farmer", 4, [TradeItem.of("tfc:gem/ruby",1,4),TradeItem.of("tfc:gem/sapphire",1,3)], TradeItem.of("tfc:food/garlic",12,16));
    event.addTrade("farmer", 4, [TradeItem.of("tfc:gem/ruby",1,4),TradeItem.of("tfc:gem/sapphire",1,3)], TradeItem.of("tfc:seeds/garlic",8,12));
    event.addTrade("farmer", 4, [TradeItem.of("tfc:gem/ruby",1,4),TradeItem.of("tfc:gem/sapphire",1,3)], TradeItem.of("tfc:seeds/jute",8,12));
    event.addTrade("farmer", 4, [TradeItem.of("tfc:gem/ruby",1,4),TradeItem.of("tfc:gem/sapphire",1,3)], TradeItem.of("tfc:seeds/cabbage",8,12));

    event.addTrade("farmer", 5, [TradeItem.of("tfc:gem/ruby",1,4),TradeItem.of("tfc:gem/sapphire",1,4)], TradeItem.of("firmalife:plant/cilantro",1,2));
    event.addTrade("farmer", 5, [TradeItem.of("tfc:gem/ruby",1,4),TradeItem.of("tfc:gem/sapphire",1,4)], TradeItem.of("firmalife:plant/basil",1,2));
    event.addTrade("farmer", 5, [TradeItem.of("tfc:gem/sapphire",1,4),TradeItem.of("tfc:gem/opal",1,4)], TradeItem.of("firmalife:plant/oregano",6,12));
    event.addTrade("farmer", 5, [TradeItem.of("tfc:gem/sapphire",1,4),TradeItem.of("tfc:gem/opal",1,4)], TradeItem.of("firmalife:plant/pimento",6,12));
    event.addTrade("farmer", 5, [TradeItem.of("tfc:gem/sapphire",1,4),TradeItem.of("tfc:gem/opal",1,4)], TradeItem.of("firmalife:plant/cumin",6,12));
    event.addTrade("farmer", 5, [TradeItem.of("tfc:gem/opal",1,4),TradeItem.of("tfc:gem/emerald",1,4)], TradeItem.of("firmalife:food/tofu",6,12));
    event.addTrade("farmer", 5, [TradeItem.of("tfc:gem/emerald",1,4),TradeItem.of("tfc:gem/diamond",1,4)], TradeItem.of("firmalife:plant/cocoa_sapling",1,2));
    event.addTrade("farmer", 5, [TradeItem.of("tfc:gem/emerald",1,4),TradeItem.of("tfc:gem/diamond",1,4)], TradeItem.of("firmalife:plant/fig_sapling",1,2));
    event.addTrade("farmer", 5, [TradeItem.of("tfc:gem/emerald",1,4),TradeItem.of("tfc:gem/diamond",1,4)], TradeItem.of("firmalife:plant/pineapple_bush",1,2));


    event.addTrade("fisherman", 1, [TradeItem.of("tfc:gem/pyrite",1,2),TradeItem.of("tfc:gem/topaz",1,2)], TradeItem.of("tfc:food/shellfish",2,4));
    event.addTrade("fisherman", 1, [TradeItem.of("tfc:gem/pyrite",1,2),TradeItem.of("tfc:gem/topaz",1,2)], TradeItem.of("tfc:food/calamari",2,4));
    event.addTrade("fisherman", 1, [TradeItem.of("tfc:gem/topaz",1,2), TradeItem.of("tfc:gem/lapis_lazuli",1,2)], TradeItem.of("tfc:seeds/oat",4,8));
    event.addTrade("fisherman", 1, [TradeItem.of("tfc:gem/topaz",1,2), TradeItem.of("tfc:gem/lapis_lazuli",1,2)], TradeItem.of("tfc:seeds/rye",4,8));
    event.addTrade("fisherman", 1, [TradeItem.of("tfc:gem/lapis_lazuli",1,3),TradeItem.of("tfc:gem/amethyst",1,2)], TradeItem.of("tfc:seeds/rice",4,8));

    event.addTrade("fisherman", 2, [TradeItem.of("tfc:gem/lapis_lazuli",1,3),TradeItem.of("tfc:gem/amethyst",1,2)], TradeItem.of("tfc:food/cod",3,6));
    event.addTrade("fisherman", 2, [TradeItem.of("tfc:gem/lapis_lazuli",1,3),TradeItem.of("tfc:gem/amethyst",1,2)], TradeItem.of("tfc:food/tropical_fish",3,6));
    event.addTrade("fisherman", 2, [TradeItem.of("tfc:gem/lapis_lazuli",1,3),TradeItem.of("tfc:gem/amethyst",1,2)], TradeItem.of("tfc:seeds/pumpkin",4,8));
    event.addTrade("fisherman", 2, [TradeItem.of("tfc:gem/lapis_lazuli",1,3),TradeItem.of("tfc:gem/amethyst",1,2)], TradeItem.of("tfc:seeds/melon",4,8));

    event.addTrade("fisherman", 3, [TradeItem.of("tfc:gem/ruby",1,3),TradeItem.of("tfc:gem/amethyst",1,2)], TradeItem.of("tfc:food/lake_trout",4,7));
    event.addTrade("fisherman", 3, [TradeItem.of("tfc:gem/ruby",1,3),TradeItem.of("tfc:gem/amethyst",1,2)], TradeItem.of("tfc:food/rainbow_trout",4,7));
    event.addTrade("fisherman", 3, [TradeItem.of("tfc:gem/ruby",1,3),TradeItem.of("tfc:gem/amethyst",1,2)], TradeItem.of("tfc:seeds/barley",12,16));
    event.addTrade("fisherman", 3, [TradeItem.of("tfc:gem/lapis_lazuli",1,3),TradeItem.of("tfc:gem/amethyst",1,2)], TradeItem.of("tfc:seeds/soybean",12,16));
    event.addTrade("fisherman", 3, [TradeItem.of("tfc:gem/lapis_lazuli",1,3),TradeItem.of("tfc:gem/amethyst",1,2)], TradeItem.of("tfc:seeds/squash",12,16));

    event.addTrade("fisherman", 4, [TradeItem.of("tfc:gem/lapis_lazuli",2,4),TradeItem.of("tfc:gem/amethyst",1,2)], TradeItem.of("tfc:food/lake_trout",6,9));
    event.addTrade("fisherman", 4, [TradeItem.of("tfc:gem/lapis_lazuli",2,4),TradeItem.of("tfc:gem/amethyst",1,2)], TradeItem.of("tfc:food/rainbow_trout",6,9));
    event.addTrade("fisherman", 4, [TradeItem.of("tfc:gem/opal",1,3),TradeItem.of("tfc:gem/sapphire",1,2)], TradeItem.of("tfc:seeds/barley",16,20));
    event.addTrade("fisherman", 4, [TradeItem.of("tfc:gem/opal",1,3),TradeItem.of("tfc:gem/sapphire",1,2)], TradeItem.of("tfc:seeds/soybean",16,20));
    event.addTrade("fisherman", 4, [TradeItem.of("tfc:gem/opal",1,3),TradeItem.of("tfc:gem/sapphire",1,2)], TradeItem.of("tfc:seeds/squash",16,20));

    event.addTrade("fisherman", 5, [TradeItem.of("tfc:gem/sapphire",2,4),TradeItem.of("tfc:gem/amethyst",1,2)], TradeItem.of("tfc:food/cod",8,12));
    event.addTrade("fisherman", 5, [TradeItem.of("tfc:gem/sapphire",2,4),TradeItem.of("tfc:gem/amethyst",1,2)], TradeItem.of("tfc:food/salmon",8,12));
    event.addTrade("fisherman", 5, [TradeItem.of("tfc:gem/sapphire",2,4),TradeItem.of("tfc:gem/amethyst",1,2)], TradeItem.of("tfc:food/cod",8,12));
    event.addTrade("fisherman", 5, [TradeItem.of("tfc:gem/sapphire",2,4),TradeItem.of("tfc:gem/amethyst",1,2)], TradeItem.of("tfc:food/salmon",8,12));
    event.addTrade("fisherman", 5, [TradeItem.of("tfc:gem/opal",1,1),TradeItem.of("tfc:gem/sapphire",1,2)], TradeItem.of("tfc:seeds/barley",16,20));
    event.addTrade("fisherman", 5, [TradeItem.of("tfc:gem/opal",1,1),TradeItem.of("tfc:gem/sapphire",1,2)], TradeItem.of("tfc:seeds/soybean",16,20));
    event.addTrade("fisherman", 5, [TradeItem.of("tfc:gem/opal",1,1),TradeItem.of("tfc:gem/sapphire",1,2)], TradeItem.of("tfc:seeds/squash",16,20));


    event.addTrade("toolsmith", 1, [TradeItem.of("tfc:gem/lapis_lazuli",4,6),TradeItem.of("tfc:metal/ingot/copper",1,1)], TradeItem.of("tfc:metal/propick_head/copper",1,1));
    event.addTrade("toolsmith", 1, [TradeItem.of("tfc:gem/lapis_lazuli",4,6),TradeItem.of("tfc:metal/ingot/copper",1,1)], TradeItem.of("tfc:metal/hoe_head/copper",1,1));

    event.addTrade("toolsmith", 2, [TradeItem.of("tfc:gem/ruby",4,5),TradeItem.of("tfc:metal/ingot/bronze",1,1)], TradeItem.of("tfc:metal/propick_head/bronze",1,1));
    event.addTrade("toolsmith", 2, [TradeItem.of("tfc:gem/ruby",4,5),TradeItem.of("tfc:metal/ingot/bismuth_bronze",1,1)], TradeItem.of("tfc:metal/propick_head/bismuth_bronze",1,1));
    event.addTrade("toolsmith", 2, [TradeItem.of("tfc:gem/ruby",3,4),TradeItem.of("tfc:metal/ingot/black_bronze",1,1)], TradeItem.of("tfc:metal/propick_head/black_bronze",1,1));
    event.addTrade("toolsmith", 2, [TradeItem.of("tfc:gem/ruby",4,5),TradeItem.of("tfc:metal/ingot/bronze",1,1)], TradeItem.of("tfc:metal/hoe_head/bronze",1,1));
    event.addTrade("toolsmith", 2, [TradeItem.of("tfc:gem/ruby",4,5),TradeItem.of("tfc:metal/ingot/bismuth_bronze",1,1)], TradeItem.of("tfc:metal/hoe_head/bismuth_bronze",1,1));
    event.addTrade("toolsmith", 2, [TradeItem.of("tfc:gem/ruby",3,4),TradeItem.of("tfc:metal/ingot/black_bronze",1,1)], TradeItem.of("tfc:metal/hoe_head/black_bronze",1,1));

    event.addTrade("toolsmith", 3, [TradeItem.of("tfc:gem/sapphire",2,6),TradeItem.of("tfc:metal/ingot/wrought_iron",1,1)], TradeItem.of("tfc:metal/propick_head/wrought_iron",1,1));
    event.addTrade("toolsmith", 3, [TradeItem.of("tfc:gem/sapphire",2,6),TradeItem.of("tfc:metal/ingot/wrought_iron",1,1)], TradeItem.of("tfc:metal/hoe_head/wrought_iron",1,1));

    event.addTrade("toolsmith", 4, [TradeItem.of("tfc:gem/opal",2,6),TradeItem.of("tfc:metal/ingot/steel",2,2)], TradeItem.of("tfc:metal/fish_hook/steel",1,1));
    event.addTrade("toolsmith", 4, [TradeItem.of("tfc:gem/opal",2,6),TradeItem.of("tfc:metal/ingot/black_steel",2,2)], TradeItem.of("tfc:metal/fish_hook/black_steel",1,1));

    event.addTrade("toolsmith", 5, [TradeItem.of("tfc:gem/emerald",2,6),TradeItem.of("tfc:metal/ingot/blue_steel",2,2)], TradeItem.of("tfc:metal/fish_hook/blue_steel",1,1));
    event.addTrade("toolsmith", 5, [TradeItem.of("tfc:gem/emerald",2,6),TradeItem.of("tfc:metal/ingot/red_steel",2,2)], TradeItem.of("tfc:metal/fish_hook/red_steel",1,1));


    event.addTrade("butcher", 1, [TradeItem.of("tfc:gem/pyrite",1,2),TradeItem.of("tfc:gem/topaz",1,2)], TradeItem.of("tfc:food/pork",2,4));
    event.addTrade("butcher", 1, [TradeItem.of("tfc:gem/pyrite",1,2),TradeItem.of("tfc:gem/topaz",1,2)], TradeItem.of("tfc:food/chicken",2,4));
    event.addTrade("butcher", 1, [TradeItem.of("tfc:gem/topaz",1,2), TradeItem.of("tfc:gem/lapis_lazuli",1,2)], TradeItem.of("tfc:food/rabbit",2,4));
    event.addTrade("butcher", 1, [TradeItem.of("tfc:gem/topaz",1,2), TradeItem.of("tfc:gem/lapis_lazuli",1,2)], TradeItem.of("tfc:food/wolf",2,4));
    event.addTrade("butcher", 1, [TradeItem.of("tfc:gem/lapis_lazuli",1,3),TradeItem.of("tfc:gem/amethyst",1,2)], TradeItem.of("tfc:food/quail",2,4));

    event.addTrade("butcher", 2, [TradeItem.of("tfc:gem/lapis_lazuli",1,3),TradeItem.of("tfc:gem/amethyst",1,2)], TradeItem.of("firmalife:food/bacon",3,6));
    event.addTrade("butcher", 2, [TradeItem.of("tfc:gem/lapis_lazuli",1,3),TradeItem.of("tfc:gem/amethyst",1,2)], TradeItem.of("tfc:food/gran_feline",3,6));
    event.addTrade("butcher", 2, [TradeItem.of("tfc:gem/lapis_lazuli",1,3),TradeItem.of("tfc:gem/amethyst",1,2)], TradeItem.of("tfc:food/chevon",4,8));
    event.addTrade("butcher", 2, [TradeItem.of("tfc:gem/lapis_lazuli",1,3),TradeItem.of("tfc:gem/amethyst",1,2)], TradeItem.of("tfc:food/camelidae",4,8));

    event.addTrade("butcher", 3, [TradeItem.of("tfc:gem/ruby",1,3),TradeItem.of("tfc:gem/amethyst",1,2)], TradeItem.of("tfc:food/venison",4,7));
    event.addTrade("butcher", 3, [TradeItem.of("tfc:gem/ruby",1,3),TradeItem.of("tfc:gem/amethyst",1,2)], TradeItem.of("tfc:food/turtle",4,7));
    event.addTrade("butcher", 3, [TradeItem.of("tfc:gem/ruby",1,3),TradeItem.of("tfc:gem/amethyst",1,2)], TradeItem.of("tfc:food/duck",2,6));
    event.addTrade("butcher", 3, [TradeItem.of("tfc:gem/lapis_lazuli",1,3),TradeItem.of("tfc:gem/amethyst",1,2)], TradeItem.of("tfc:food/mutton",2,6));
    event.addTrade("butcher", 3, [TradeItem.of("tfc:gem/lapis_lazuli",1,3),TradeItem.of("tfc:gem/amethyst",1,2)], TradeItem.of("tfc:food/bear",2,6));

    event.addTrade("butcher", 4, [TradeItem.of("tfc:gem/lapis_lazuli",2,4),TradeItem.of("tfc:gem/amethyst",1,2)], TradeItem.of("tfc:food/horse_meat",6,9));
    event.addTrade("butcher", 4, [TradeItem.of("tfc:gem/lapis_lazuli",2,4),TradeItem.of("tfc:gem/amethyst",1,2)], TradeItem.of("tfc:food/turkey",6,9));
    event.addTrade("butcher", 4, [TradeItem.of("tfc:gem/opal",1,3),TradeItem.of("tfc:gem/sapphire",1,2)], TradeItem.of("tfc:food/pheasant",5,10));
    event.addTrade("butcher", 4, [TradeItem.of("tfc:gem/opal",1,3),TradeItem.of("tfc:gem/sapphire",1,2)], TradeItem.of("tfc:food/peafowl",6,10));

    event.addTrade("butcher", 5, [TradeItem.of("tfc:gem/sapphire",2,4),TradeItem.of("tfc:gem/amethyst",1,2)], TradeItem.of("tfc:food/beef",8,12));
    event.addTrade("butcher", 5, [TradeItem.of("tfc:gem/sapphire",2,4),TradeItem.of("tfc:gem/amethyst",1,2)], TradeItem.of("tfc:food/chicken",8,12));
    event.addTrade("butcher", 5, [TradeItem.of("tfc:gem/sapphire",2,4),TradeItem.of("tfc:gem/amethyst",1,2)], TradeItem.of("tfc:food/venison",8,12));
    event.addTrade("butcher", 5, [TradeItem.of("tfc:gem/sapphire",2,4),TradeItem.of("tfc:gem/amethyst",1,2)], TradeItem.of("tfc:food/cooked_horse_meat",8,12));
    event.addTrade("butcher", 5, [TradeItem.of("tfc:gem/opal",1,1),TradeItem.of("tfc:gem/sapphire",1,2)], TradeItem.of("tfc:food/cooked_pheasant",6,20));
    event.addTrade("butcher", 5, [TradeItem.of("tfc:gem/opal",1,1),TradeItem.of("tfc:gem/sapphire",1,2)], TradeItem.of("tfc:food/cooked_beef",6,20));
    event.addTrade("butcher", 5, [TradeItem.of("tfc:gem/opal",1,1),TradeItem.of("tfc:gem/sapphire",1,2)], TradeItem.of("tfc:food/cooked_turkey",6,20));


    event.addTrade("leatherworker", 1, [TradeItem.of("tfc:gem/lapis_lazuli",4,6)], TradeItem.of("waterflasks:leather_flask",1,1));
    event.addTrade("leatherworker", 1, [TradeItem.of("tfc:gem/lapis_lazuli",4,6)], TradeItem.of("minecraft:leather",2,4));
    event.addTrade("leatherworker", 1, [TradeItem.of("tfc:small_raw_hide",4,5)], TradeItem.of("tfc:gem/ruby",1,2));

    event.addTrade("leatherworker", 2, [TradeItem.of("tfc:gem/amethyst",2,4)], TradeItem.of("minecraft:leather_helmet",1,1));
    event.addTrade("leatherworker", 2, [TradeItem.of("tfc:small_raw_hide",4,5)], TradeItem.of("tfc:gem/ruby",1,1));

    event.addTrade("leatherworker", 3, [TradeItem.of("tfc:gem/sapphire",2,6)], TradeItem.of("minecraft:leather_chestplate",1,1));
    event.addTrade("leatherworker", 3, [TradeItem.of("tfc:gem/sapphire",2,6)], TradeItem.of("minecraft:leather_leggings",1,1));
    event.addTrade("leatherworker", 3, [TradeItem.of("tfc:gem/sapphire",2,6)], TradeItem.of("minecraft:leather_boots",1,1));

    event.addTrade("leatherworker", 4, [TradeItem.of("tfc:medium_raw_hide",2,4)], TradeItem.of("tfc:gem/opal",2,4));
    event.addTrade("leatherworker", 4, [TradeItem.of("tfc:large_raw_hide",1,3)], TradeItem.of("tfc:gem/emerald",1,1));

    event.addTrade("leatherworker", 5, [TradeItem.of("minecraft:leather",5,10)], TradeItem.of("tfc:gem/emerald",1,2));

    event.addTrade("mason", 1, [TradeItem.of("tfc:gem/emerald",4,16)], TradeItem.of("minecraft:clay",8,32));
    event.addTrade("mason", 1, [TradeItem.of("tfc:gem/emerald",4,16)], TradeItem.of("tfc:rock/raw/gabbro",8,32));
    event.addTrade("mason", 1, [TradeItem.of("tfc:gem/emerald",4,16)], TradeItem.of("tfc:rock/raw/andesite",8,32));
    event.addTrade("mason", 1, [TradeItem.of("tfc:gem/emerald",4,16)], TradeItem.of("tfc:rock/raw/conglomerate",8,32));
    event.addTrade("mason", 1, [TradeItem.of("tfc:gem/emerald",4,16)], TradeItem.of("tfc:rock/raw/dolomite",8,32));

    event.addTrade("mason", 2, [TradeItem.of("tfc:gem/emerald",4,16)], TradeItem.of("minecraft:calcite",8,32));
    event.addTrade("mason", 2, [TradeItem.of("tfc:gem/emerald",4,16)], TradeItem.of("tfc:rock/raw/schist",8,32));
    event.addTrade("mason", 2, [TradeItem.of("tfc:gem/emerald",4,16)], TradeItem.of("tfc:rock/raw/phyllite",8,32));
    event.addTrade("mason", 2, [TradeItem.of("tfc:gem/emerald",4,16)], TradeItem.of("tfc:rock/raw/chalk",8,32));

    event.addTrade("mason", 3, [TradeItem.of("tfc:gem/emerald",8,24)], TradeItem.of("tfc:rock/raw/basalt",8,32));
    event.addTrade("mason", 3, [TradeItem.of("tfc:gem/emerald",8,24)], TradeItem.of("tfc:rock/raw/marble",8,32));

    event.addTrade("mason", 4, [TradeItem.of("tfc:gem/ruby",8,24)], TradeItem.of("tfc:rock/hardened/gabbro",8,32));
    event.addTrade("mason", 4, [TradeItem.of("tfc:gem/ruby",8,24)], TradeItem.of("tfc:rock/hardened/andesite",8,32));
    event.addTrade("mason", 4, [TradeItem.of("tfc:gem/ruby",8,24)], TradeItem.of("tfc:rock/hardened/conglomerate",8,32));
    event.addTrade("mason", 4, [TradeItem.of("tfc:gem/ruby",8,24)], TradeItem.of("tfc:rock/hardened/dolomite",8,32));

    event.addTrade("mason", 5, [TradeItem.of("tfc:gem/ruby",8,16)], TradeItem.of("tfc:rock/hardened/schist",8,32));
    event.addTrade("mason", 5, [TradeItem.of("tfc:gem/ruby",8,16)], TradeItem.of("tfc:rock/hardened/phyllite",8,32));
    event.addTrade("mason", 5, [TradeItem.of("tfc:gem/ruby",8,16)], TradeItem.of("tfc:rock/hardened/chalk",8,32));
    event.addTrade("mason", 5, [TradeItem.of("tfc:gem/ruby",8,16)],TradeItem.of("tfc:rock/hardened/marble",8,32));


    event.addTrade("shepherd", 1, [TradeItem.of("tfc:gem/emerald",4,16)], TradeItem.of("tfc:small_raw_hide",1,4));

    event.addTrade("shepherd", 2, [TradeItem.of("tfc:gem/emerald",8,16)], TradeItem.of("tfc:medium_raw_hide",1,4));

    event.addTrade("shepherd", 3, [TradeItem.of("tfc:gem/emerald",16,24)], TradeItem.of("tfc:large_raw_hide",1,4));

    event.addTrade("shepherd", 1, [TradeItem.of("tfc:gem/emerald",32,64)], TradeItem.of("minecraft:leather",4,8));

    event.addTrade("shepherd", 5, [TradeItem.of("tfc:gem/opal",4,16)], TradeItem.of("tfc:treated_hide",1,3));


    event.addTrade("fletcher", 1, [TradeItem.of("tfc:gem/emerald",8,32)], TradeItem.of("bsa:stone/arrowhead",2,8));
    event.addTrade("fletcher", 1, [TradeItem.of("tfc:gem/emerald",8,32)], TradeItem.of("bsa:bone/arrowhead",2,8));

    event.addTrade("fletcher", 2, [TradeItem.of("tfc:gem/emerald",8,32)], TradeItem.of("minecraft:flint",2,8));
    event.addTrade("fletcher", 2, [TradeItem.of("tfc:gem/amethyst",8,32)], TradeItem.of("bsa:sinew_string",8,16));

    event.addTrade("fletcher", 3, [TradeItem.of("tfc:gem/emerald",4,24)], TradeItem.of("minecraft:bow",1,1));
    event.addTrade("fletcher", 3, [TradeItem.of("tfc:gem/emerald",8,24)], TradeItem.of("minecraft:arrow",8,24));

    event.addTrade("fletcher", 4, [TradeItem.of("tfc:gem/ruby",6,12)], TradeItem.of("tfc:glow_arrow",4,16));
    event.addTrade("fletcher", 4, [TradeItem.of("tfc:gem/sapphire",16,48)], TradeItem.of("minecraft:crossbow",1,1));

    event.addTrade("fletcher", 5, [TradeItem.of("tfc:gem/opal",28,46)], TradeItem.of("magistuarmory:longbow",1,1));
    event.addTrade("fletcher", 5, [TradeItem.of("tfc:gem/emerald",28,46)], TradeItem.of("magistuarmory:heavy_crossbow",1,1));
})