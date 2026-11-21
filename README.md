While TerraFirmaCraft aims at realistic technology and world presentation, I always miss the spirit of exploring structures that vanilla Minecraft has.
So this modpack combines TFC core gameplay with the feel of vanilla Minecraft.
https://www.curseforge.com/minecraft/modpacks/tfc-lost-light

It's inspired by TerraFirmaAdventure, but I don't like how compatibility between TFC and other mods was implemented there, so I want to do it better.
The main source of inspiration, though, is Middle-earth by J. R. R. Tolkien.

### Requirements
- Minecraft 1.20.1
- Forge 47.4.28
- Recommended RAM: 8 GB

TerraFirmaCraft is the foundation of this modpack: realistic world generation and technology from the Stone Age to the pre-industrial era.
The Stone Age is improved with the Better Stone Age mod.
The Middle Ages are improved with various TFC addons.
Pre-industrial technology is improved with the Create mod.
The Distant Horizons mod lets you enjoy the view from the nearest mountain.
And on top of that: a lot of QoL and optimization mods.

Structures are back in the TFC world, so now you have more reasons to explore the Overworld, and the Nether is reachable too.
So, pack your backpack, take your sword, mount your horse and set off on adventures! :)
By the way, TFC Lost Light has its own Discord, you're welcome to join: https://discord.gg/rJb8mGTg4Q

If you prefer vanilla music, just disable the Medieval Music mod.

If you experience low FPS, you may disable the following mods:
- Distant Horizons
- Stellar View

The modpack also includes the Dynamic Trees mods.
They're disabled by default, but you may enable them (rename `.jar.disabled` to `.jar` in the `mods` folder, or enable them in CurseForge).
Do it before creating a world, since they change world generation:
- Dynamic Trees
- Dynamic Trees Addon Lib
- Dynamic Trees+
- Dynamic Trees TFC
- Dynamic Trees TFC - Seeds
- Dynamic Trees AFC (compatibility with ArborFirmaCraft)
- Burnt DT (compatibility with Burnt)

There are also a few disabled tools for modpack development and debugging, not needed for playing:
- Spark (performance profiler)
- ProbeJS (KubeJS typings generator)
- KubeJS Offline (KubeJS documentation generator)

### AI usage
AI tools were used while creating this modpack, namely for:
- the logo
- texts (descriptions, quests, tips)
- content configuration (configs, scripts, recipes, quests, structure settings)

### How to adapt the modpack for a dedicated server
- Copy the modpack folder
- Remove all folders and files except the following folders:
  - `config`
  - `defaultconfigs`
  - `kubejs`
  - `mods`
  - `tfc_structures_datapacks`
- From the `kubejs` folder, remove all folders and files except the following folders:
  - `config`
  - `data`
  - `server_scripts`
  - `startup_scripts`
- From the `mods` folder, remove the following files:
  - `alekiEHM-FORGE-1.20.1-1.0.6.jar`
  - `AmbientSounds_FORGE_v6.1.11_mc1.20.1.jar`
  - `BadOptimizations-2.3.1-1.20.1.jar`
  - `BetterAdvancements-Forge-1.20.1-0.4.2.25.jar`
  - `chat_heads-0.14.0-forge-1.20.jar`
  - `controllable-forge-1.20.1-0.21.7.jar`
  - `CrashAssistant-forge-1.19-1.20.1-1.10.19.jar`
  - `Ding-1.20.1-Forge-1.5.0.jar`
  - `DistantHorizons-2.3.6-b-1.20.1-fabric-forge.jar`
  - `embeddium-0.3.31+mc1.20.1.jar`
  - `entity_model_features_1.20.1-forge-3.0.1.jar`
  - `entity_sound_features_1.20.4-forge-0.7.1.jar`
  - `entity_texture_features_1.20.1-forge-7.0.2.jar`
  - `entityculling-forge-1.9.3-mc1.20.1.jar`
  - `experimentalsettingsdisabler-1.20.1-3.0.jar`
  - `framework-forge-1.20.1-0.7.15.jar`
  - `ImmediatelyFast-Forge-1.5.2+1.20.4.jar`
  - `InventoryProfilesNext-forge-1.20-1.10.19.jar`
  - `ItemPhysicLite_FORGE_v1.6.6_mc1.20.1.jar`
  - `libIPN-forge-1.20-4.0.2.jar`
  - `modelfix-1.15.jar`
  - `notenoughanimations-forge-1.10.6-mc1.20.1.jar`
  - `oculus-mc1.20.1-1.8.0.jar`
  - `particle_core-0.2.6+1.20.1+forge.jar`
  - `skinlayers3d-forge-1.9.2-mc1.20.1.jar`
  - `sodiumextras-forge-1.0.7-1.20.1.jar`
  - `Sounds-2.2.1+1.20.1+forge.jar`
  - `tfc_season_notifier-1.20.1-1.1.0.jar`
  - `zmedievalmusic-1.20.1-2.2.jar`
- Move everything from the copied folder to the server folder
- ???
- **Profit!**