// Library of custom quest tasks: each helper returns a task for lib.custom(), checked by KubeJS
// (generated into kubejs/server_scripts/quests_custom.js, needs FTB XMod Compat).
// The code is the body of (task, player) => {...}; it runs every `timer` ticks.
const { custom } = require('./lib');

// IDs are checked here: these are not in the registry dumps.
const FOOD_TRAITS = new Set([
  'tfc:salted', 'tfc:brined', 'tfc:pickled', 'tfc:preserved', 'tfc:vinegar', 'tfc:charcoal_grilled', 'tfc:wood_grilled',
  'tfc:wild', 'tfc:burnt_to_a_crisp',
  'firmalife:dried', 'firmalife:aged', 'firmalife:vintage', 'firmalife:fresh', 'firmalife:oven_baked', 'firmalife:hung',
  'firmalife:shelved', 'firmalife:smoked', 'firmalife:rancid_smoked', 'firmalife:fermented', 'firmalife:bee_pollinated',
]);

const list = (ids) => '[' + ids.map((s) => `'${s}'`).join(', ') + ']';
// Loop over the player's inventory; `body` sees `stack`.
// Rhino (KubeJS) quirk: a `const` inside a loop keeps its first value on later iterations without any error,
// so everything assigned inside loops must be `let`.
const forEachStack = (body) => `
const inv = player.inventory
for (let i = 0; i < inv.getContainerSize(); i++) {
  let stack = inv.getItem(i)
  if (stack.isEmpty()) continue
${body.trim().split('\n').map((l) => '  ' + l).join('\n')}
}`;

/**
 * Any fluid container in the inventory (bucket, jug, flask, barrel item...) holding one of `fluids`.
 * opts: title, icon - as for any task.
 */
function hasFluid(fluids, opts = {}) {
  fluids = [].concat(fluids);
  return custom(`
const FluidUtil = Java.loadClass('net.minecraftforge.fluids.FluidUtil')
const FLUIDS = Java.loadClass('net.minecraftforge.registries.ForgeRegistries').FLUIDS
const WANT = ${list(fluids)}${forEachStack(`
let fluid = FluidUtil.getFluidContained(stack).orElse(null)
if (fluid && WANT.indexOf(String(FLUIDS.getKey(fluid.getFluid()))) >= 0) {
  task.progress++
  return
}`)}`, { kind: 'hasFluid', fluids, ...opts });
}

/**
 * A TFC food in the inventory with one of the food traits (`tfc:salted`, `firmalife:smoked`, ...).
 * opts: title, icon.
 */
function hasFoodTrait(traits, opts = {}) {
  traits = [].concat(traits);
  for (const t of traits) if (!FOOD_TRAITS.has(t)) throw new Error(`hasFoodTrait: unknown trait ${t}`);
  return custom(`
const FoodCapability = Java.loadClass('net.dries007.tfc.common.capabilities.food.FoodCapability')
const FoodTrait = Java.loadClass('net.dries007.tfc.common.capabilities.food.FoodTrait')
const WANT = ${list(traits)}${forEachStack(`
let food = FoodCapability.get(stack)
if (!food) continue
let traits = food.getTraits()
for (let j = 0; j < traits.size(); j++) {
  if (WANT.indexOf(String(FoodTrait.getId(traits.get(j)))) >= 0) {
    task.progress++
    return
  }
}`)}`, { kind: 'hasFoodTrait', traits, ...opts });
}

/**
 * Stand where the TFC climate matches: average annual temperature (°C) and annual rainfall (mm).
 * c: { minTemp, maxTemp, minRain, maxRain } - any bound may be omitted. opts: title, icon.
 */
function climate(c, opts = {}) {
  const cond = [
    c.minTemp != null && `t >= ${c.minTemp}`, c.maxTemp != null && `t <= ${c.maxTemp}`,
    c.minRain != null && `r >= ${c.minRain}`, c.maxRain != null && `r <= ${c.maxRain}`,
  ].filter(Boolean);
  if (!cond.length) throw new Error('climate: no bounds');
  return custom(`
const Climate = Java.loadClass('net.dries007.tfc.util.climate.Climate')
const pos = player.blockPosition()
const t = Climate.getAverageTemperature(player.level, pos)
const r = Climate.getRainfall(player.level, pos)
if (${cond.join(' && ')}) task.progress++`, { kind: 'climate', climate: c, ...opts });
}

/** Be at a height: { min, max } in blocks (Y). opts: title, icon. */
function altitude(h, opts = {}) {
  const cond = [h.min != null && `y >= ${h.min}`, h.max != null && `y <= ${h.max}`].filter(Boolean);
  if (!cond.length) throw new Error('altitude: no bounds');
  return custom(`
const y = player.getY()
if (${cond.join(' && ')}) task.progress++`, { kind: 'altitude', altitude: h, ...opts });
}

/**
 * Travel `km` kilometres on foot: walking, sprinting and sneaking together (the vanilla walk_one_cm statistic alone
 * skips sprinting). Progress is shown in metres, so it is visible right away. opts: title, icon.
 * Don't use KubeJS player.stats.get('minecraft:...') here: PlayerStatsJS looks the stat up by a new ResourceLocation,
 * the registry knows custom stats by identity only, and the resulting NullPointerException crashes the server.
 */
function distance(km, opts = {}) {
  return custom(`
const Stats = Java.loadClass('net.minecraft.stats.Stats')
const stats = player.server.playerList.getPlayerStats(player)
const cm = stats.getValue(Stats.CUSTOM.get(Stats.WALK_ONE_CM)) + stats.getValue(Stats.CUSTOM.get(Stats.SPRINT_ONE_CM)) + stats.getValue(Stats.CUSTOM.get(Stats.CROUCH_ONE_CM))
const m = Math.min(${km * 1000}, Math.floor(cm / 100))
if (m > task.progress) task.progress = m`, { kind: 'distance', km, max: km * 1000, timer: 100, ...opts });
}

const MONTHS = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
/** Be in the world during one of the TFC calendar months, e.g. season(['DECEMBER', 'JANUARY', 'FEBRUARY']). */
function season(months, opts = {}) {
  months = [].concat(months);
  for (const m of months) if (!MONTHS.includes(m)) throw new Error(`season: unknown month ${m}`);
  return custom(`
const Calendars = Java.loadClass('net.dries007.tfc.util.calendar.Calendars')
const month = String(Calendars.SERVER.getCalendarMonthOfYear().name())
if (${list(months)}.indexOf(month) >= 0) task.progress++`, { kind: 'season', months, timer: 100, ...opts });
}

/**
 * Be under open sky in the Overworld on a full moon night (moon phase 0 - one night in eight).
 * The very first night of a world is a full moon too, so it is skipped: the earliest one that counts is night 8.
 * opts: title, icon.
 */
function fullMoon(opts = {}) {
  return custom(`
const level = player.level
if (String(level.dimension) != 'minecraft:overworld' || level.getDayTime() < 24000) return
if (level.getMoonPhase() == 0 && level.isNight() && level.canSeeSky(player.blockPosition())) task.progress++`,
  { kind: 'fullMoon', timer: 100, ...opts });
}

/**
 * Stand within 8 blocks of a TFC animal whose familiarity is at least `min` (0..1). opts: title, icon.
 * (TFC animals get pregnant instead of using vanilla breeding, so the animals_bred statistic never moves.)
 */
function nearFamiliar(min, opts = {}) {
  return custom(`
const list = player.level.getEntitiesWithin(player.getBoundingBox().inflate(8))
for (let i = 0; i < list.size(); i++) {
  let e = list.get(i)
  // only TFCAnimalProperties entities have getFamiliarity
  if (e.getFamiliarity && e.getFamiliarity() >= ${min}) {
    task.progress++
    return
  }
}`, { kind: 'nearFamiliar', min, timer: 40, ...opts });
}

/** A rotten TFC food in the inventory. opts: title, icon. */
function hasRottenFood(opts = {}) {
  return custom(`
const FoodCapability = Java.loadClass('net.dries007.tfc.common.capabilities.food.FoodCapability')${forEachStack(`
let food = FoodCapability.get(stack)
if (food && food.isRotten()) {
  task.progress++
  return
}`)}`, { kind: 'hasRottenFood', timer: 100, ...opts });
}

/**
 * Kill `count` mobs of any of the entity types (FTB kill tasks accept a single type).
 * Progress comes from a generated EntityEvents.death handler. opts: title, icon.
 */
function killAny(entities, count = 1, opts = {}) {
  return custom(null, { kind: 'killAny', onKill: [].concat(entities), max: count, ...opts });
}

/**
 * Die to any of the entity types (the attacker, e.g. a creeper's explosion counts as the creeper).
 * Progress comes from the generated EntityEvents.death handler. opts: title, icon.
 */
function diedTo(entities, opts = {}) {
  return custom(null, { kind: 'diedTo', onDeathBy: [].concat(entities), max: 1, ...opts });
}

/**
 * An enchanted item (not an enchanted book) in the inventory with at least `min` enchantments. opts: title, icon.
 */
function hasEnchanted(min = 1, opts = {}) {
  return custom(forEachStack(`
if (String(stack.id) == 'minecraft:enchanted_book' || !stack.isEnchanted()) continue
if (stack.getEnchantmentTags().size() >= ${min}) {
  task.progress++
  return
}`), { kind: 'hasEnchanted', min, ...opts });
}

/**
 * Be inside a village as MCA sees it (VillageManager: the village border MCA builds from its buildings - the same check
 * as its "entering village" notification). Unlike a structure task it works for any village structure (FTB only checks
 * structure pieces, so the open ground between the houses of e.g. a desert oasis village doesn't count) and for
 * villages players built. opts: title, icon.
 */
function inMcaVillage(opts = {}) {
  return custom(`
const VillageManager = Java.loadClass('forge.net.conczin.mca.server.world.data.VillageManager')
const village = VillageManager.get(player.level).findNearestVillage(player).orElse(null)
if (village && village.getPopulation() > 0) task.progress++`, { kind: 'inMcaVillage', timer: 40, ...opts });
}

// ---------- MCA: Reputation (mods/mcareputation-*.jar, API dev.otectus.mcareputation.api.McaReputationApi) ----------
// Tiers of data/mcareputation/mcareputation/reputation_tiers/default.json, lowest first.
const REP_TIERS = ['infamous', 'hated', 'distrusted', 'wary', 'stranger', 'acquaintance', 'friend', 'honored', 'revered'];
const tierIndex = (t) => {
  const i = REP_TIERS.indexOf(t);
  if (i < 0) throw new Error(`reputation: unknown tier ${t}`);
  return i;
};
// Loop over the player's standing snapshots (one per village that knows them); `body` sees `s` and `tier(id)` -
// the index of a tier id in TIERS (-1 for unknown ladders).
const forEachSnapshot = (body) => `
const Api = Java.loadClass('dev.otectus.mcareputation.api.McaReputationApi')
const TIERS = ${list(REP_TIERS)}
const tier = (id) => TIERS.indexOf(String(id))
const hasIncident = (s, want) => {
  const incs = s.incidents()
  for (let j = 0; j < incs.size(); j++) if (want.indexOf(String(incs.get(j).type()).replace(/^.*:/, '')) >= 0) return true
  return false
}
const snaps = Api.getAllSnapshots(player.server, player.uuid)
for (let i = 0; i < snaps.size(); i++) {
  let s = snaps.get(i)
${body.trim().split('\n').map((l) => '  ' + l).join('\n')}
}`;
// Condition on snapshot `s`: tier at least `t`. current: the tier right now; otherwise also the best tier ever reached
// (highWaterTierId), so the quest isn't lost when the standing decays.
const tierAtLeast = (t, current) => (current
  ? `tier(s.tierId()) >= ${tierIndex(t)}`
  : `Math.max(tier(s.tierId()), tier(s.highWaterTierId().orElse(''))) >= ${tierIndex(t)}`);
// Condition on snapshot `s`: it holds an incident whose type path is one of `types` (namespace not compared).
const hasIncident = (types) => `hasIncident(s, ${list(types)})`;

/**
 * Reach reputation tier `t` (or higher) with any village. opts: current (the tier right now, not the best ever reached),
 * title, icon.
 */
function reputationTier(t, opts = {}) {
  const { current, ...rest } = opts;
  return custom(forEachSnapshot(`
if (${tierAtLeast(t, current)}) {
  task.progress++
  return
}`), { kind: 'reputationTier', tier: t, current: !!current, timer: 100, ...rest });
}

/** Fall to reputation tier `t` (or lower) with any village, right now (the lowest tier ever is not stored). */
function reputationTierAtMost(t, opts = {}) {
  return custom(forEachSnapshot(`
if (tier(s.tierId()) >= 0 && tier(s.tierId()) <= ${tierIndex(t)}) {
  task.progress++
  return
}`), { kind: 'reputationTierAtMost', tier: t, timer: 100, ...opts });
}

/**
 * A reputation incident of one of `types` (incident ids without namespace: villager_rescued, villager_cured, raid_repelled,
 * restitution_completed, public_apology, ... - data/mcareputation/mcareputation/incidents/) with any village.
 * opts: orTier ({ tier, current }) - or reach that tier instead; title, icon.
 */
function reputationIncident(types, opts = {}) {
  types = [].concat(types);
  const { orTier, ...rest } = opts;
  const cond = [hasIncident(types), orTier && tierAtLeast(orTier.tier, orTier.current)].filter(Boolean).join(' || ');
  return custom(forEachSnapshot(`
if (${cond}) {
  task.progress++
  return
}`), { kind: 'reputationIncident', types, orTier, timer: 100, ...rest });
}

// ---------- MCA Outlaws (mods/mcaoutlaws-*.jar): illagers drawn as MCA humans, unarmed ones surrender ----------
const nearEntity = (cond, kind, opts, pre = '') => custom(`${pre}
const list = player.level.getEntitiesWithin(player.getBoundingBox().inflate(8))
for (let i = 0; i < list.size(); i++) {
  let e = list.get(i)
  if (${cond}) {
    task.progress++
    return
  }
}`, { kind, timer: 40, ...opts });

/** Stand within 8 blocks of a surrendered outlaw (an unarmed illager). opts: title, icon. */
function nearSurrenderedOutlaw(opts = {}) {
  return nearEntity('OutlawRules.isSurrendered(e)', 'nearSurrenderedOutlaw', opts,
    "const OutlawRules = Java.loadClass('com.tato.mcaoutlaws.OutlawRules')");
}

/**
 * Stand within 8 blocks of a redeemed outlaw: an MCA villager still in outlaw clothes
 * (Redemption -> OutlawLooks.applyTo sets clothes mcaoutlaws:skins/clothing/...). opts: title, icon.
 */
function nearRedeemedOutlaw(opts = {}) {
  return nearEntity(`e.getClothes && String(e.getClothes()).indexOf('mcaoutlaws:') == 0`, 'nearRedeemedOutlaw', opts);
}

module.exports = {
  hasFluid, hasFoodTrait, hasRottenFood, climate, altitude, distance, season, fullMoon, nearFamiliar, killAny, diedTo, hasEnchanted,
  inMcaVillage, reputationTier, reputationTierAtMost, reputationIncident, nearSurrenderedOutlaw, nearRedeemedOutlaw, FOOD_TRAITS,
};
