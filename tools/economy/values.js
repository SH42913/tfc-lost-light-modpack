// Hand-set base worth (what a villager SELLS for), same scale as Bountiful: 1 emerald = 1000.
// A villager BUYS for worth * BUY (economy.js). Items with a recipe in recipes.js never cost
// less than their materials, so most metal/leather/cloth goods have no entry here.
const COLORS = ['white', 'orange', 'magenta', 'light_blue', 'yellow', 'lime', 'pink', 'gray',
  'light_gray', 'cyan', 'purple', 'blue', 'brown', 'green', 'red', 'black'];

const V = {};

// currency: TFC gems (villagers buy them at full worth, see economy.CURRENCY)
Object.assign(V, {
  'tfc:gem/pyrite': 700, 'tfc:gem/lapis_lazuli': 800, 'tfc:gem/amethyst': 800, 'tfc:gem/opal': 900, 'tfc:gem/emerald': 1000,
  'tfc:gem/topaz': 1100, 'tfc:gem/ruby': 1200, 'tfc:gem/sapphire': 1200, 'tfc:gem/diamond': 1500,
});

for (const c of COLORS) {
  V[`minecraft:${c}_dye`] = 80;
  V[`minecraft:${c}_wool`] = 300;
  V[`minecraft:${c}_carpet`] = 150;
  V[`minecraft:${c}_bed`] = 2500;
  V[`minecraft:${c}_banner`] = 1200;
}
for (const f of ['dandelion', 'poppy', 'blue_orchid', 'allium', 'houstonia', 'tulip_red', 'tulip_orange', 'tulip_white',
  'tulip_pink', 'oxeye_daisy', 'pickerelweed', 'lily_of_the_valley', 'lady_fern']) V[`tfc:plant/${f}`] = 300;
for (const c of ['brain', 'bubble', 'fire', 'horn', 'tube']) V[`minecraft:${c}_coral_block`] = 1500;
for (const w of ['acacia', 'birch', 'hickory', 'palm', 'spruce', 'kapok', 'sequoia', 'willow']) V[`tfc:wood/sapling/${w}`] = 1000;
for (const d of ['gazelle_horns', 'duck', 'horse', 'unicorn', 'bullhorns', 'dragon', 'antlers', 'bear', 'lily', 'lion',
  'demon_horns', 'griffin']) V[`magistuarmory:${d}_decoration`] = 1000;
for (const d of ['laurel_wreath', 'bronze_small_wings', 'bronze_horns', 'fur_cloak']) V[`antiquelegacy:${d}_decoration`] = 1000;

// tool-head molds (fired): useful enough to cost more than the 5 clay they take
for (const h of ['axe_head', 'chisel_head', 'hammer_head', 'hoe_head', 'javelin_head', 'knife_blade', 'mace_head', 'pickaxe_head',
  'propick_head', 'saw_blade', 'scythe_blade', 'shovel_head', 'sword_blade']) V[`tfc:ceramic/${h}_mold`] = 1000;

Object.assign(V, {
  // antiquelegacy
  'antiquelegacy:golden_laurel_wreath_decoration': 8000,

  // aquaculture
  'aquaculture:double_hook': 1500,
  'aquaculture:gold_hook': 3000,
  'aquaculture:heavy_hook': 1500,
  'aquaculture:light_hook': 1500,
  'aquaculture:note_hook': 3000,
  'aquaculture:redstone_hook': 3000,
  'aquaculture:tackle_box': 3000,
  'aquaculture:worm': 100,

  // bountiful
  'bountiful:decree': 800,

  // bsa
  'bsa:sinew': 200,
  'bsa:sinew_string': 440,

  // create
  'create:andesite_alloy': 380,
  'create:andesite_casing': 750,
  'create:basin': 1500,
  'create:belt_connector': 1000,
  'create:brass_casing': 2000,
  'create:cogwheel': 310,
  'create:deployer': 7000,
  'create:electron_tube': 1900,
  'create:encased_fan': 4000,
  'create:fluid_tank': 2500,
  'create:gearbox': 1200,
  'create:goggles': 3000,
  'create:hand_crank': 800,
  'create:large_cogwheel': 500,
  'create:mechanical_drill': 4500,
  'create:mechanical_mixer': 6000,
  'create:mechanical_press': 5000,
  'create:mechanical_pump': 3500,
  'create:mechanical_saw': 4500,
  'create:millstone': 3000,
  'create:precision_mechanism': 10000,
  'create:shaft': 130,
  'create:water_wheel': 2500,
  'create:windmill_bearing': 4000,
  'create:wrench': 2000,

  // farmersdelight
  'farmersdelight:brown_mushroom_colony': 800,
  'farmersdelight:red_mushroom_colony': 800,
  'farmersdelight:rich_soil': 800,

  // firmaciv
  'firmaciv:barometer': 5000,
  'firmaciv:canoe_paddle': 1500,
  'firmaciv:firmaciv_compass': 3000,
  'firmaciv:kayak_paddle': 1800,
  'firmaciv:large_waterproof_hide': 2000,
  'firmaciv:medium_triangular_sail': 6000,
  'firmaciv:nav_clock': 7000,
  'firmaciv:rope_coil': 400,
  'firmaciv:sextant': 6000,
  'firmaciv:small_triangular_sail': 3000,

  // firmalife
  'firmalife:beeswax': 300,
  'firmalife:food/bacon': 200,
  'firmalife:food/cooked_bacon': 300,
  'firmalife:plant/basil': 1500,
  'firmalife:plant/bay_laurel': 2000,
  'firmalife:plant/cardamom': 2000,
  'firmalife:plant/cilantro': 1500,
  'firmalife:plant/cocoa_sapling': 3500,
  'firmalife:plant/cumin': 1500,
  'firmalife:plant/fig_sapling': 3500,
  'firmalife:plant/oregano': 1500,
  'firmalife:plant/pimento': 1500,
  'firmalife:plant/pineapple_bush': 3500,
  'firmalife:plant/vanilla': 2000,
  'firmalife:plant/wild_red_grapes': 2500,
  'firmalife:plant/wild_white_grapes': 2500,
  'firmalife:raw_honey': 600,

  // forge
  'forge:cobblestone': 30,

  // knightsofterrafirma
  'knightsofterrafirma:bismuth_bronze_bastard_sword': 19500,
  'knightsofterrafirma:bismuth_bronze_claymore': 19500,
  'knightsofterrafirma:bismuth_bronze_claymore_blade': 15000,
  'knightsofterrafirma:black_bronze_flame_bladed_sword_blade': 16000,
  'knightsofterrafirma:black_bronze_zweihander_blade': 16000,
  'knightsofterrafirma:bronze_antique_sword': 19500,
  'knightsofterrafirma:bronze_celtic_sword': 19500,
  'knightsofterrafirma:bronze_gladius': 19500,
  'knightsofterrafirma:bronze_rhomphaia': 19500,
  'knightsofterrafirma:bronze_rhomphaia_blade': 15000,
  'knightsofterrafirma:bronze_zweihander_blade': 15000,
  'knightsofterrafirma:copper_ahlspiess_blade': 4500,
  'knightsofterrafirma:copper_estoc_blade': 4500,
  'knightsofterrafirma:copper_katzbalger_blade': 4500,
  'knightsofterrafirma:copper_short_sword_blade': 4500,
  'knightsofterrafirma:copper_stiletto_blade': 4500,

  // magistuarmory
  'magistuarmory:bronze_heatershield': 7500,
  'magistuarmory:bronze_roundshield': 7500,
  'magistuarmory:copper_heatershield': 3500,
  'magistuarmory:copper_roundshield': 3500,
  'magistuarmory:crown_decoration': 8000,
  'magistuarmory:iron_heatershield': 11500,
  'magistuarmory:iron_kiteshield': 11500,
  'magistuarmory:minicrown_decoration': 6000,

  // minecraft
  'minecraft:blue_ice': 3000,
  'minecraft:bone': 80,
  'minecraft:bone_meal': 50,
  'minecraft:book': 350,
  'minecraft:charcoal': 80,
  'minecraft:clay_ball': 50,
  'minecraft:clock': 3500,
  'minecraft:compass': 2800,
  'minecraft:creeper_banner_pattern': 2500,
  'minecraft:enchanted_golden_apple': 40000,
  'minecraft:ender_pearl': 1500,
  'minecraft:experience_bottle': 600,
  'minecraft:feather': 40,
  'minecraft:flower_banner_pattern': 2500,
  'minecraft:glass_bottle': 130,
  'minecraft:glass_pane': 150,
  'minecraft:globe_banner_pattern': 2500,
  'minecraft:glow_ink_sac': 250,
  'minecraft:glowstone': 600,
  'minecraft:golden_apple': 6000,
  'minecraft:gunpowder': 400,
  'minecraft:ink_sac': 100,
  'minecraft:item_frame': 300,
  'minecraft:kelp': 40,
  'minecraft:lantern': 1200,
  'minecraft:lead': 800,
  'minecraft:leather': 300,
  'minecraft:leather_boots': 1200,
  'minecraft:leather_chestplate': 2500,
  'minecraft:leather_helmet': 1500,
  'minecraft:leather_horse_armor': 2000,
  'minecraft:leather_leggings': 2100,
  'minecraft:logs': 80,
  'minecraft:map': 800,
  'minecraft:mojang_banner_pattern': 2500,
  'minecraft:moss_block': 500,
  'minecraft:name_tag': 2500,
  'minecraft:nautilus_shell': 1500,
  'minecraft:packed_ice': 1500,
  'minecraft:paper': 80,
  'minecraft:piglin_banner_pattern': 2500,
  'minecraft:pointed_dripstone': 500,
  'minecraft:rotten_flesh': 80,
  'minecraft:saddle': 4000,
  'minecraft:skull_banner_pattern': 2500,
  'minecraft:slime_ball': 500,
  'minecraft:spider_eye': 190,
  'minecraft:spyglass': 4500,
  'minecraft:stick': 10,
  'minecraft:string': 50,
  'minecraft:writable_book': 900,

  // sns
  'sns:frame_pack': 5000,
  'sns:hiking_boots': 3000,
  'sns:leather_sack': 3000,
  'sns:lunchbox': 3000,
  'sns:metal/horseshoes/steel': 20000,
  'sns:mob_net': 2500,
  'sns:ore_sack': 2500,
  'sns:quiver': 2500,
  'sns:reinforced_fabric': 600,
  'sns:seed_pouch': 2500,
  'sns:steel_toe_hiking_boots': 20000,
  'sns:straw_basket': 1200,

  // tfc
  'tfc:alabaster/bricks': 150,
  'tfc:alabaster/raw': 130,
  'tfc:blubber': 250,
  'tfc:brass_mechanisms': 2500,
  'tfc:brick/andesite': 30,
  'tfc:brick/basalt': 30,
  'tfc:brick/chalk': 30,
  'tfc:brick/granite': 30,
  'tfc:brick/limestone': 30,
  'tfc:brick/marble': 30,
  'tfc:bucket/pufferfish': 4000,
  'tfc:bucket/tropical_fish': 4000,
  'tfc:burlap_cloth': 120,
  'tfc:candle': 200,
  'tfc:ceramic/large_vessel': 2000,
  'tfc:ceramic/vessel': 1000,
  'tfc:ceramic/jug': 600,
  'tfc:ceramic/pot': 600,
  'tfc:ceramic/bowl': 300,
  'tfc:ceramic/ingot_mold': 800,
  'tfc:ceramic/bell_mold': 1000,
  'tfc:fire_bricks': 800,
  'tfc:fire_clay': 250,
  'tfc:food/barley': 60,
  'tfc:food/barley_bread': 120,
  'tfc:food/bear': 310,
  'tfc:food/beef': 190,
  'tfc:food/beet': 80,
  'tfc:food/blueberry': 90,
  'tfc:food/bluegill': 250,
  'tfc:food/cabbage': 80,
  'tfc:food/calamari': 380,
  'tfc:food/camelidae': 310,
  'tfc:food/carrot': 80,
  'tfc:food/cheese': 400,
  'tfc:food/chevon': 190,
  'tfc:food/chicken': 190,
  'tfc:food/cod': 250,
  'tfc:food/cooked_beef': 250,
  'tfc:food/cooked_chevon': 250,
  'tfc:food/cooked_chicken': 250,
  'tfc:food/cooked_cod': 250,
  'tfc:food/cooked_duck': 250,
  'tfc:food/cooked_lake_trout': 250,
  'tfc:food/cooked_mutton': 250,
  'tfc:food/cooked_pork': 250,
  'tfc:food/cooked_rainbow_trout': 250,
  'tfc:food/cooked_salmon': 250,
  'tfc:food/cooked_turkey': 250,
  'tfc:food/cooked_venison': 250,
  'tfc:food/cranberry': 90,
  'tfc:food/crappie': 250,
  'tfc:food/duck': 190,
  'tfc:food/elderberry': 90,
  'tfc:food/fresh_seaweed': 50,
  'tfc:food/garlic': 80,
  'tfc:food/gran_feline': 310,
  'tfc:food/green_apple': 110,
  'tfc:food/horse_meat': 310,
  'tfc:food/lake_trout': 250,
  'tfc:food/largemouth_bass': 250,
  'tfc:food/maize': 60,
  'tfc:food/mutton': 190,
  'tfc:food/oat': 60,
  'tfc:food/oat_bread': 120,
  'tfc:food/olive': 110,
  'tfc:food/onion': 80,
  'tfc:food/peach': 110,
  'tfc:food/pheasant': 190,
  'tfc:food/plum': 110,
  'tfc:food/pork': 190,
  'tfc:food/potato': 80,
  'tfc:food/quail': 190,
  'tfc:food/rabbit': 190,
  'tfc:food/rainbow_trout': 250,
  'tfc:food/raspberry': 90,
  'tfc:food/red_apple': 110,
  'tfc:food/rice': 60,
  'tfc:food/rye': 60,
  'tfc:food/rye_bread': 120,
  'tfc:food/salmon': 250,
  'tfc:food/shellfish': 380,
  'tfc:food/smallmouth_bass': 250,
  'tfc:food/soybean': 80,
  'tfc:food/squash': 80,
  'tfc:food/strawberry': 90,
  'tfc:food/sugarcane': 60,
  'tfc:food/tomato': 80,
  'tfc:food/tropical_fish': 380,
  'tfc:food/turkey': 190,
  'tfc:food/venison': 310,
  'tfc:food/wheat': 60,
  'tfc:food/wheat_bread': 120,
  'tfc:food/wolf': 310,
  'tfc:glue': 150,
  'tfc:groundcover/clam': 190,
  'tfc:groundcover/driftwood': 80,
  'tfc:groundcover/mollusk': 190,
  'tfc:groundcover/mussel': 190,
  'tfc:jute': 50,
  'tfc:jute_fiber': 40,
  'tfc:kaolin_clay': 500,
  'tfc:large_raw_hide': 1300,
  'tfc:large_sheepskin_hide': 1500,
  'tfc:lens': 1900,
  'tfc:lumber': 40,
  'tfc:medium_raw_hide': 750,
  'tfc:medium_sheepskin_hide': 1000,
  'tfc:metal/ingot/bismuth_bronze': 6500,
  'tfc:metal/ingot/black_bronze': 7000,
  'tfc:metal/ingot/black_steel': 20000,
  'tfc:metal/ingot/brass': 4400,
  'tfc:metal/ingot/bronze': 6500,
  'tfc:metal/ingot/copper': 3000,
  'tfc:metal/ingot/gold': 4000,
  'tfc:metal/ingot/steel': 13000,
  'tfc:metal/ingot/tin': 3100,
  'tfc:metal/ingot/wrought_iron': 10000,
  'tfc:metal/ingot/zinc': 3100,
  'tfc:mortar': 60,
  'tfc:ore/bituminous_coal': 150,
  'tfc:ore/lignite': 110,
  'tfc:ore/normal_bismuthinite': 630,
  'tfc:ore/normal_cassiterite': 630,
  'tfc:ore/normal_hematite': 810,
  'tfc:ore/normal_limonite': 810,
  'tfc:ore/normal_magnetite': 810,
  'tfc:ore/normal_malachite': 500,
  'tfc:ore/normal_native_copper': 500,
  'tfc:ore/normal_native_gold': 810,
  'tfc:ore/normal_native_silver': 750,
  'tfc:ore/normal_sphalerite': 630,
  'tfc:ore/normal_tetrahedrite': 500,
  'tfc:plant/banana_sapling': 2500,
  'tfc:plant/barrel_cactus': 800,
  'tfc:plant/cherry_sapling': 2500,
  'tfc:plant/green_apple_sapling': 2500,
  'tfc:plant/jungle_vines': 300,
  'tfc:plant/leafy_kelp': 800,
  'tfc:plant/lemon_sapling': 2500,
  'tfc:plant/olive_sapling': 2500,
  'tfc:plant/orange_sapling': 2500,
  'tfc:plant/peach_sapling': 2500,
  'tfc:plant/plum_sapling': 2500,
  'tfc:plant/red_apple_sapling': 2500,
  'tfc:plant/water_lily': 500,
  'tfc:powder/flux': 130,
  'tfc:powder/lime': 50,
  'tfc:powder/salt': 150,
  'tfc:powder/saltpeter': 100,
  'tfc:powder/sulfur': 100,
  'tfc:powder/wood_ash': 40,
  'tfc:pumpkin': 300,
  'tfc:rock/bricks/basalt': 90,
  'tfc:rock/bricks/granite': 90,
  'tfc:rock/bricks/marble': 90,
  'tfc:rock/chiseled/basalt': 120,
  'tfc:rock/chiseled/granite': 120,
  'tfc:rock/chiseled/marble': 120,
  'tfc:rock/hardened/andesite': 60,
  'tfc:rock/hardened/basalt': 60,
  'tfc:rock/hardened/chalk': 60,
  'tfc:rock/hardened/conglomerate': 60,
  'tfc:rock/hardened/dolomite': 60,
  'tfc:rock/hardened/gabbro': 60,
  'tfc:rock/hardened/marble': 60,
  'tfc:rock/hardened/phyllite': 60,
  'tfc:rock/hardened/schist': 60,
  'tfc:rock/raw/andesite': 50,
  'tfc:rock/raw/basalt': 50,
  'tfc:rock/raw/chalk': 50,
  'tfc:rock/raw/granite': 50,
  'tfc:rock/raw/limestone': 50,
  'tfc:rock/raw/marble': 50,
  'tfc:sand/red': 80,
  'tfc:sand/yellow': 60,
  'tfc:sea_pickle': 1000,
  'tfc:seeds/barley': 150,
  'tfc:seeds/beet': 150,
  'tfc:seeds/cabbage': 150,
  'tfc:seeds/carrot': 150,
  'tfc:seeds/garlic': 150,
  'tfc:seeds/jute': 150,
  'tfc:seeds/maize': 150,
  'tfc:seeds/melon': 150,
  'tfc:seeds/oat': 150,
  'tfc:seeds/onion': 150,
  'tfc:seeds/potato': 150,
  'tfc:seeds/pumpkin': 150,
  'tfc:seeds/rice': 150,
  'tfc:seeds/rye': 150,
  'tfc:seeds/soybean': 150,
  'tfc:seeds/squash': 150,
  'tfc:seeds/tomato': 150,
  'tfc:seeds/wheat': 150,
  'tfc:silk_cloth': 600,
  'tfc:small_raw_hide': 380,
  'tfc:small_sheepskin_hide': 630,
  'tfc:soot': 80,
  'tfc:spindle': 500,
  'tfc:stick_bunch': 80,
  'tfc:straw': 20,
  'tfc:treated_hide': 800,
  'tfc:unrefined_paper': 50,
  'tfc:wood/planks/oak_bookshelf': 1500,
  'tfc:wool': 130,
  'tfc:wool_cloth': 250,

  // tfc_arch
  'tfc_arch:bone_arrow': 60,
  'tfc_arch:bone_arrowhead': 60,
  'tfc_arch:bronze_arrow': 500,
  'tfc_arch:bronze_crossbow': 14900,
  'tfc_arch:copper_arrow': 250,
  'tfc_arch:copper_arrowhead': 380,
  'tfc_arch:copper_crossbow': 6900,
  'tfc_arch:flint_arrow': 60,
  'tfc_arch:flint_arrowhead': 60,
  'tfc_arch:longbow': 6000,
  'tfc_arch:plains_bow': 3500,
  'tfc_arch:shortbow': 2500,
  'tfc_arch:stone_arrow': 60,
  'tfc_arch:stone_arrowhead': 60,
  'tfc_arch:wrought_iron_arrow': 800,
  'tfc_arch:wrought_iron_crossbow': 23000,

  // waterflasks
  'waterflasks:iron_flask': 12000,
  'waterflasks:leather_flask': 1500,

  // waystones
  'waystones:return_scroll': 2500,
  'waystones:warp_scroll': 3000,
});

// --- trade goods (villager trades only, not in Bountiful pools) ------------------------
const tier = (prefix, suffix, prices) => { for (const [m, w] of Object.entries(prices)) V[`${prefix}${m}${suffix}`] = w; };
const TOOL = { copper: 3500, bronze: 7500, wrought_iron: 11500 };
const WEAPON2 = { copper: 7500, bronze: 15000 }; // 2-ingot weapons
const SHIELD = { copper: 3500, bronze: 7500 };
for (const w of ['oak', 'birch', 'spruce']) {
  V[`tfc:wood/planks/${w}_loom`] = 1500;
  V[`tfc:wood/sewing_table/${w}`] = 2000;
  V[`tfc:wood/scribing_table/${w}`] = 2000;
  V[`tfc:wood/lectern/${w}`] = 1500;
  V[`tfc:wood/planks/${w}_bookshelf`] = 1500;
  V[`supplementaries:tfc/sign_post_${w}`] = 400;
  V[`tfc:wood/sign/${w}`] = 200;
}
for (const f of ['plum', 'cherry', 'blueberry', 'strawberry', 'peach', 'red_apple', 'orange', 'raspberry']) V[`tfc:jar/${f}`] = 500;
for (const c of ['cheddar', 'chevre', 'feta', 'gouda', 'rajya_metok', 'shosha']) V[`firmalife:${c}_wheel`] = 3000;
for (const c of ['red', 'blue', 'white', 'yellow', 'green', 'black']) V[`tfc:candle/${c}`] = 250;
for (const a of ['acacia_koa', 'atlas_cedar', 'bald_cypress', 'baobab', 'eucalyptus', 'giant_rosewood', 'hevea', 'ipe']) V[`afc:wood/sapling/${a}`] = 1000;
tier('precisionprospecting:metal/prospector_hammer/', '', TOOL);
tier('precisionprospecting:metal/mineral_prospector/', '', TOOL);
tier('precisionprospecting:metal/prospector_drill/', '', TOOL);
tier('rnr:metal/mattock/', '', TOOL);
tier('tfcscraping:metal/scraping_knife/', '', TOOL);
tier('tfc_derbys_spindles:', '_spindle', TOOL);
for (const w of ['shortsword', 'stylet', 'estoc', 'pike', 'heavymace', 'morgenstern', 'lochaberaxe']) tier('magistuarmory:', `_${w}`, WEAPON2);
for (const w of ['claymore', 'zweihander', 'bastardsword']) V[`magistuarmory:bronze_${w}`] = 22000;
for (const s of ['buckler', 'kiteshield', 'target', 'pavese', 'rondache', 'tartsche']) tier('magistuarmory:', `_${s}`, SHIELD);
for (const w of ['gladius', 'kopis', 'xiphos', 'spatha', 'doru']) V[`antiquelegacy:iron_${w}`] = 25000;
for (const r of ['ring_luck', 'ring_speed', 'ring_night_vision', 'ring_water_breathing', 'ring_jump_boost']) V[`ringsofascension:${r}`] = 15000;

Object.assign(V, {
  // farmer
  'tfc:seeds/red_bell_pepper': 150, 'tfc:seeds/yellow_bell_pepper': 150,
  'firmalife:watering_can': 1500, 'firmalife:seed_ball': 200, 'firmalife:beehive_frame': 600,
  'tfc:compost': 100, 'tfc:groundcover/guano': 80,
  // butcher
  'firmalife:food/pickled_egg': 300, 'pemmican:pemmican': 400, 'firmalife:rennet': 400, 'firmalife:cheesecloth': 500,
  'survivorsdelight:skillet/copper': 4500, 'survivorsdelight:skillet/steel': 18000,
  'bsa:dried_sinew': 250, 'tfc:goat_horn': 400, 'bsa:sabertooth_fang': 1500,
  // fisherman
  'aquaculture:bobber': 300, 'aquaculture:fishing_line': 300, 'aquaculture:oak_fish_mount': 1500, 'aquaculture:worm_farm': 1500,
  'tfc:jute_net': 800, 'bsa:bone/fish_hook': 200, 'bsa:bone/fishing_rod': 600, 'supplementaries:rope': 60,
  'aquaculture:fish_bones': 40, 'aquaculture:algae': 40, 'aquaculture:message_in_a_bottle': 1500, 'aquaculture:tin_can': 50,
  'tfc:groundcover/sea_urchin': 190, 'tfc:food/dried_kelp': 60, 'tfc:food/dried_seaweed': 60,
  'aquaculture:treasure_chest': 8000, 'aquaculture:neptunes_bounty': 20000, 'survivorsaquaculture:neptunian_pearl': 5000,
  // shepherd
  'farmersdelight:canvas': 400, 'farmersdelight:canvas_rug': 600, 'farmersdelight:half_tatami_mat': 400, 'farmersdelight:full_tatami_mat': 800,
  'supplementaries:doormat': 300, 'tfc:thatch_bed': 500,
  'firmalife:pineapple_fiber': 40, 'firmalife:pineapple_yarn': 60, 'supplementaries:flax': 40,
  // leatherworker
  'sns:leather_strip': 300, 'sns:bound_leather_strip': 600, 'sns:buckle': 1500, 'sns:burlap_sack': 1500, 'sns:pack_frame': 2500,
  'sns:reinforced_fiber': 300, 'waterflasks:leather_side': 700, 'waterflasks:bladder': 400, 'bsa:hide_door': 800,
  'antiquelegacy:sandals': 1500, 'firmalife:pineapple_leather': 500,
  'firmalife:beekeeper_helmet': 2000, 'firmalife:beekeeper_chestplate': 2000, 'firmalife:beekeeper_leggings': 2000, 'firmalife:beekeeper_boots': 2000,
  'tfc:small_scraped_hide': 420, 'tfc:medium_scraped_hide': 850, 'tfc:large_scraped_hide': 1400,
  'tfc:small_prepared_hide': 470, 'tfc:medium_prepared_hide': 950, 'tfc:large_prepared_hide': 1500,
  // mason
  'rnr:ceramic_roof_tile': 60, 'rnr:ceramic_roof': 250, 'rnr:brick_road': 150, 'rnr:hoggin': 40, 'rnr:base_course': 60,
  'rnr:flagstone/red_sandstone': 60, 'firmalife:tiles': 100, 'firmalife:sealed_bricks': 150, 'firmalife:rustic_bricks': 120,
  'tfc:smooth_mud_bricks': 60, 'tfc:daub': 40, 'tfc:wattle': 40, 'chalk:chalk_box': 600, 'chalk:white_chalk': 100, 'chalk:red_chalk': 100,
  'supplementaries:timber_frame': 80, 'supplementaries:timber_brace': 80, 'supplementaries:timber_cross_brace': 80, 'alekiroofs:brick_roofing': 120,
  'tfc:aggregate': 20, 'rnr:crushed_base_course': 30, 'rnr:hoggin_mix': 30, 'tfc:groundcover/pumice': 100, 'tfc:calcite': 150, 'tfc:ore/gypsum': 150,
  'tfc:crucible': 3000,
  // toolsmith
  'tfc:gem_saw': 3000, 'tfc:firestarter': 100, 'supplementaries:wrench': 1500, 'tfc:sandpaper': 300, 'tfc:powder/charcoal': 30,
  'tfc:metal/chain/copper': 400, 'tfc:metal/chain/bronze': 800, 'tfc:metal/chain/wrought_iron': 1200,
  'tfc:metal/bars/copper': 400, 'tfc:metal/bars/wrought_iron': 1200,
  // weaponsmith / armorer
  'valarian_conquest:bandit_sword': 30000, 'valarian_conquest:heavy_axe': 30000, 'valarian_conquest:light_axe': 25000,
  'valarian_conquest:knights_spear': 30000, 'valarian_conquest:mercenary_sword': 30000,
  'knightsofterrafirma:copper_heavy_mace_head': 4500,
  'antiquelegacy:linothorax': 4000, 'antiquelegacy:phrygian_cap': 1500, 'antiquelegacy:hamata': 40000, 'antiquelegacy:iron_chainmail': 50000,
  'antiquelegacy:bronze_montefortino_helmet': 40000, 'antiquelegacy:bronze_roman_greaves': 40000, 'antiquelegacy:greek_greaves': 40000,
  // fletcher
  'tfc_arch:shortbow_frame': 1500, 'tfc_arch:plains_bow_frame': 2500, 'tfc_arch:longbow_frame': 4000, 'tfc_arch:crossbow_frame': 1500,
  'tfc_arch:paper_fletching': 50, 'supplementaries:rope_arrow': 300, 'mowziesmobs:blowgun': 2000, 'mowziesmobs:dart': 100,
  'bsa:stone/arrowhead/flint': 60,
  // cleric
  'tfc_spirits:crucifix': 3000, 'tfc_spirits:adder_stone': 4000, 'tfc_spirits:evil_eye_talisman': 4000, 'tfc_spirits:wildrunner_charm': 5000,
  'tfc_spirits:holy_water_bucket': 2000, 'tfc_spirits:tiny_carved_skull': 1500, 'tfc_spirits:runestone': 3000, 'tfc_spirits:spirit_seal': 6000,
  'supplementaries:candle_holder': 400, 'supplementaries:urn': 600, 'supplementaries:soap': 200,
  'tfc_spirits:silvery_string': 300, 'tfc_spirits:withered_matter': 300, 'tfc_spirits:fairy_ring_mushroom': 400,
  'beneath:pure_death': 1500, 'beneath:pure_decay': 1500, 'beneath:pure_sorrow': 1500, 'beneath:pure_flame': 1500,
  // librarian
  'supplementaries:hourglass': 2500, 'supplementaries:globe': 3000, 'supplementaries:notice_board': 800, 'supplementaries:blackboard': 1000,
  'supplementaries:key': 1500, 'supplementaries:antique_ink': 1500, 'create:clipboard': 800, 'beneath:lost_page': 2000,
  'tfc:papyrus': 30, 'firmalife:bottle_label': 50,
  // cartographer
  'supplementaries:altimeter': 4000, 'supplementaries:slice_map': 2500, 'supplementaries:globe_sepia': 3000, 'supplementaries:wind_vane': 1500,
  'firmaciv:unfinished_barometer': 2500, 'firmaciv:unfinished_sextant': 3000, 'firmaciv:unfinished_nav_clock': 3500,
  'tfc:silica_glass_bottle': 200, 'firmaciv:copper_bolt': 300,
  // wanderer
  'firmalife:cinnamon_bark': 1500, 'afc:maple_sugar': 300, 'afc:birch_sugar': 300, 'afc:rubber_bar': 500,
  'beneath:ghost_pepper': 1500, 'beneath:gleamflower': 1000, 'create:rose_quartz': 800, 'create:polished_rose_quartz': 1200,
  'firmalife:plant/nightshade_bush': 3000,
  // adventurer
  'magical_relics:random_artifact': 8000, 'magical_relics:wood_ring_artifact': 4000, 'magical_relics:stone_amulet_artifact': 5000,
  'magical_relics:iron_trinket_artifact': 6000, 'magical_relics:raw_manaessence': 500,
  'mca:engagement_ring': 3000, 'mca:wedding_ring': 5000, 'mca:matchmakers_ring': 3000, 'mca:bouquet': 500, 'mca:whistle': 1000,
  'mca:needle_and_thread': 500, 'mca:comb': 300, 'aquaculture:lockbox': 3000,
  'tfc_dynamite:crude_dynamite_stick': 800, 'tfc_dynamite:fuse_cord': 100,
  'supplementaries:bomb': 1500, 'supplementaries:slingshot': 1500, 'supplementaries:flute': 800, 'supplementaries:cage': 1500,
});

module.exports = { V, COLORS };
