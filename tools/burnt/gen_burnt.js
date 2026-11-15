// Burnt block mappings for TFC Lost Light. Usage: node tools/burnt/gen_burnt.js <instanceRoot>
// Writes block tags (data/burnt/tags/blocks/*.json) and per-block overrides (data/lost_light/burn_mappings/burnt.json)
// into the pack datapack. Burnt's built-in compat (read from the jar) is taken into account:
// blocks it already maps to the same tag are skipped, a different tag is an error (use an override instead).
// Blocks with an inventory (chests, barrels, shelves, drawers...) are intentionally NOT mapped:
// destroy_in_burn would delete them together with their contents.
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const root = process.argv[2] || '.';
const DP = path.join(root, 'tfc_structures_datapacks/lost_light_datapack/data');
const TAG_DIR = path.join(DP, 'burnt/tags/blocks');
const MAP_FILE = path.join(DP, 'lost_light/burn_mappings/burnt.json');
const blocks = fs.readFileSync(path.join(root, 'kubejs/probe/blocks.txt'), 'utf8').split(/\r?\n/).filter(Boolean);
const blockSet = new Set(blocks);

// ---------- Burnt jar: built-in tags (base data + compat datapack) ----------
function readZip(file) {
  const buf = fs.readFileSync(file);
  let eocd = buf.length - 22;
  while (buf.readUInt32LE(eocd) !== 0x06054b50) eocd--;
  const count = buf.readUInt16LE(eocd + 10);
  let p = buf.readUInt32LE(eocd + 16);
  const entries = {};
  for (let i = 0; i < count; i++) {
    const method = buf.readUInt16LE(p + 10), csize = buf.readUInt32LE(p + 20);
    const nlen = buf.readUInt16LE(p + 28), elen = buf.readUInt16LE(p + 30), clen = buf.readUInt16LE(p + 32);
    const local = buf.readUInt32LE(p + 42);
    const name = buf.toString('utf8', p + 46, p + 46 + nlen);
    entries[name] = () => {
      const start = local + 30 + buf.readUInt16LE(local + 26) + buf.readUInt16LE(local + 28);
      const data = buf.subarray(start, start + csize);
      return (method === 8 ? zlib.inflateRawSync(data) : data).toString('utf8');
    };
    p += 46 + nlen + elen + clen;
  }
  return entries;
}
const jarName = fs.readdirSync(path.join(root, 'mods')).find(f => /^burnt_basic-.*\.jar$/.test(f));
if (!jarName) throw new Error('burnt_basic jar not found in mods/');
const jar = readZip(path.join(root, 'mods', jarName));
const builtin = new Map(); // block id -> Set(tag)
for (const name of Object.keys(jar)) {
  const m = /^(?:datapacks\/compat\/)?data\/burnt\/tags\/blocks\/([a-z_]+)\.json$/.exec(name);
  if (!m) continue;
  for (const v of JSON.parse(jar[name]()).values) {
    const id = typeof v === 'string' ? v : v.id;
    if (id.startsWith('#')) continue;
    if (!builtin.has(id)) builtin.set(id, new Set());
    builtin.get(id).add(m[1]);
  }
}
// built-in per-block overrides (e.g. tfc:thatch -> burnt:smoldering_hay)
for (const name of Object.keys(jar)) {
  if (!/^(datapacks\/compat\/)?data\/[a-z_]+\/burn_mappings\/[a-z_]+\.json$/.test(name)) continue;
  for (const {from} of JSON.parse(jar[name]()).mappings || []) {
    if (!builtin.has(from)) builtin.set(from, new Set());
    builtin.get(from).add('override');
  }
}

// ---------- Rules ----------
// First matching rule wins. tag: Burnt tag name, or null = deliberately not mapped.
// override: Burnt block the source becomes (checked before every tag).
const SLOW_WOODS = /(^|_)(ironwood|ipe|teak|mahogany)$/;
const LARGE_LEAVES = /^(fig|rubber_fig|jaggery_palm|hevea|tualang|red_silk_cotton)$/;
const FRUIT = '(banana|cherry|green_apple|lemon|olive|orange|peach|plum|red_apple|cocoa|fig)'; // tfc + firmalife fruit trees
// Families (wood/<family>/<wood>) and plank variants (wood/planks/<wood>_<variant>) that hold items
const INV_FAMILY = '(chest|trapped_chest|barrel|big_barrel|barrel_press|stomping_barrel|jar_shelf|food_shelf|wine_shelf|hanger|jarbnet|lectern|sewing_table)';
const INV_PLANKS = '(loom|tool_rack)';
const WOOD_NS = '(tfc|afc|firmalife)';

const RULES = [
  // --- TFC ground (built-in compat uses non-existent soil names) ---
  [/^tfc:(grass|clay_grass)\/loam$/, {override: 'burnt:smoldering_grass_start'}], // already in the moss tag
  [/^tfc:(grass|clay_grass)\/(silt|silty_loam|sandy_loam)$/, {tag: 'burns_to_smoldering_grass'}],
  [/^tfc:farmland\/[a-z_]+$/, {tag: 'burns_to_burnt_farmland'}],

  // --- TFC fruit trees, krummholz ---
  [new RegExp(`^(tfc|firmalife):plant/${FRUIT}_leaves$`), {tag: 'burns_to_medium_leaves'}],
  [new RegExp(`^(tfc|firmalife):plant/${FRUIT}_(growing_)?branch$`), {tag: 'burns_to_smoldering_branch', ignite: true}],
  [new RegExp(`^(tfc|firmalife):plant/${FRUIT}_sapling$`), {tag: 'destroy_in_burn'}],
  [/^tfc:plant\/[a-z_]+_krummholz$/, {tag: 'destroy_in_burn'}],

  // --- TFC / AFC wood families ---
  [new RegExp(`^${WOOD_NS}:wood/${INV_FAMILY}/`), {tag: null}],
  [new RegExp(`^${WOOD_NS}:wood/planks/[a-z_]+_${INV_PLANKS}$`), {tag: null}],
  [new RegExp(`^${WOOD_NS}:wood/(log)/([a-z_]+)$`), (m) => ({tag: SLOW_WOODS.test(m[3]) ? 'burns_to_smoldering_log_slow' : 'burns_to_smoldering_log'})],
  [new RegExp(`^${WOOD_NS}:wood/wood/[a-z_]+$`), {tag: 'burns_to_smoldering_wood'}],
  [new RegExp(`^${WOOD_NS}:wood/stripped_log/[a-z_]+$`), {tag: 'burns_to_smoldering_stripped_log'}],
  [new RegExp(`^${WOOD_NS}:wood/stripped_wood/[a-z_]+$`), {tag: 'burns_to_smoldering_stripped_wood'}],
  [new RegExp(`^${WOOD_NS}:wood/leaves/([a-z_]+)$`), (m) => ({tag: LARGE_LEAVES.test(m[2]) ? 'burns_to_large_leaves' : 'burns_to_medium_leaves'})],
  [new RegExp(`^${WOOD_NS}:wood/fallen_leaves/[a-z_]+$`), {tag: 'burns_to_fine_leaves'}],
  [new RegExp(`^${WOOD_NS}:wood/planks/[a-z_]+_(sign|wall_sign|workbench)$`), {tag: 'destroy_in_burn'}],
  [new RegExp(`^${WOOD_NS}:wood/planks/(wall_)?hanging_sign/`), {tag: 'destroy_in_burn'}],
  [new RegExp(`^${WOOD_NS}:wood/planks/[a-z_]+_(log_fence|fence)$`), {tag: 'burns_to_smoldering_fences'}],
  [new RegExp(`^${WOOD_NS}:wood/planks/[a-z_]+_fence_gate$`), {tag: 'burns_to_smoldering_fence_gates'}],
  [new RegExp(`^${WOOD_NS}:wood/planks/[a-z_]+_slab$`), {tag: 'burns_to_smoldering_slabs'}],
  [new RegExp(`^${WOOD_NS}:wood/planks/[a-z_]+_stairs$`), {tag: 'burns_to_smoldering_stairs'}],
  [new RegExp(`^${WOOD_NS}:wood/planks/[a-z_]+_door$`), {tag: 'burns_to_smoldering_door'}],
  [new RegExp(`^${WOOD_NS}:wood/planks/[a-z_]+_trapdoor$`), {tag: 'burns_to_smoldering_trapdoor'}],
  [new RegExp(`^${WOOD_NS}:wood/planks/[a-z_]+_button$`), {tag: 'burns_to_smoldering_button'}],
  [new RegExp(`^${WOOD_NS}:wood/planks/[a-z_]+_pressure_plate$`), {tag: 'burns_to_smoldering_pressure_plate'}],
  [new RegExp(`^${WOOD_NS}:wood/planks/[a-z_]+_bookshelf$`), {tag: 'burns_to_smoldering_planks'}],
  [new RegExp(`^${WOOD_NS}:wood/planks/[a-z_]+$`), {tag: 'burns_to_smoldering_planks'}],
  [new RegExp(`^${WOOD_NS}:wood/(twig|horizontal_support|vertical_support|sapling|scribing_table|sluice|axle|bladed_axle|encased_axle|clutch|gear_box|water_wheel|windmill)/`), {tag: 'destroy_in_burn'}],
  [new RegExp(`^${WOOD_NS}:wood/potted_sapling/`), {tag: null}],
  [/^afc:tree_tap$/, {tag: 'destroy_in_burn'}],

  // --- Roofs ---
  [/^rnr:wood\/shingles\/[a-z_]+_slab$/, {tag: 'burns_to_smoldering_slabs'}],
  [/^rnr:wood\/shingles\/[a-z_]+_stairs$/, {tag: 'burns_to_smoldering_stairs'}],
  [/^rnr:wood\/shingles\/[a-z_]+$/, {tag: 'burns_to_smoldering_planks'}],
  [/^(rnr:thatch_roof|firmaciv:thatch_roofing)$/, {override: 'burnt:smoldering_hay'}],
  [/^(rnr:thatch_roof|firmaciv:thatch_roofing)_(slab|stairs)$/, {tag: 'destroy_in_burn'}],
  [/^rnr:roof_frame(_slab|_stairs)?$/, {tag: 'destroy_in_burn'}],
  [/^(alekiroofs:|firmacivplus:wood\/)(crimson|warped|brick)_roofing$/, {tag: null}], // nether wood does not burn; brick is not wood
  [/^alekiroofs:[a-z_]+_roofing$/, {tag: 'destroy_in_burn'}],
  [/^firmaciv(plus)?:wood\/[a-z_]+_roofing$/, {tag: 'destroy_in_burn'}],

  // --- Boats under construction ---
  [/^(firmaciv|firmacivplus|alekiships):(wood\/)?(watercraft_frame|canoe_component_block)/, {tag: 'destroy_in_burn'}],

  // --- Firmalife ---
  [/^firmalife:grape_trellis_post(_red|_white)?$/, {tag: 'destroy_in_burn'}],
  [/^firmalife:(weathered_)?treated_wood/, {tag: null}], // treated wood and greenhouses: fire-proofed

  // --- Macaw's (mcw_tfc_aio) ---
  [/^mcw_tfc_aio:fences\/[a-z_]+_fences\/[a-z_]+_(highley|pyramid)_gate$/, {tag: 'burns_to_smoldering_fence_gates'}],
  [/^mcw_tfc_aio:fences\/other_fences\//, {tag: 'destroy_in_burn'}], // bamboo fence, hedge
  [/^mcw_tfc_aio:fences\/[a-z_]+_fences\//, {tag: 'burns_to_smoldering_fences'}],
  [/^mcw_tfc_aio:bridges\/(brick|iron)_bridges\//, {tag: null}],
  [/^mcw_tfc_aio:bridges\//, {tag: 'destroy_in_burn'}],
  [/^mcw_tfc_aio:furniture\/[a-z_]+_furniture\/[a-z_]*(chair|coffee_table|_table|_desk)$/, (m) => ({tag: /covered_desk$/.test(m[0]) ? null : 'destroy_in_burn'})],
  [/^mcw_tfc_aio:furniture\//, {tag: null}], // drawers, wardrobes, cupboards, counters, bookshelves: inventories
  [/^mcw_tfc_aio:roofs\/thatch2?_roofs\//, {tag: 'destroy_in_burn'}],
  [/^mcw_tfc_aio:roofs\/awnings\//, {tag: 'destroy_in_burn'}],
  [/^mcw_tfc_aio:roofs\/[a-z_]+_roofs\/[a-z_]+$/, (m) => ({tag: /_roofs\/(base|black|gray|light_gray|white|[a-z_]+_(concrete|terracotta)|bricks?)_/.test(m[0]) ? null : 'destroy_in_burn'})],
];

// Wood names: anything with one of these in the id and no rule is reported as WARN.
const NOT_WOOD = /(fluid|pipe|potted|groundcover|sea_palm|ashtray|pineapple|wooden_bowl)/;
const WOOD_HINT = /(acacia|ash|aspen|birch|blackwood|chestnut|douglas_fir|hickory|kapok|mangrove|maple|oak|palm|pine|rosewood|sequoia|spruce|sycamore|white_cedar|willow|baobab|cypress|eucalyptus|fig|gum_arabic|hevea|ipe|ironwood|mahogany|poplar|redcedar|teak|tualang|wood|plank|log|thatch)/;
const WARN_NS = /^(tfc|afc|rnr|firmaciv|firmacivplus|alekiroofs|alekiships|mcw_tfc_aio|firmalife):/;

// ---------- Classify ----------
const tags = {};       // tag -> [ids]
const overrides = [];  // {from, to}
const errors = [];
const unmatched = [];
let skippedBuiltin = 0;
for (const id of blocks) {
  let res = null;
  for (const [re, act] of RULES) {
    const m = re.exec(id);
    if (m) { res = typeof act === 'function' ? act(m) : act; break; }
  }
  if (!res) {
    if (WARN_NS.test(id) && WOOD_HINT.test(id) && !NOT_WOOD.test(id) && !builtin.has(id)) unmatched.push(id);
    continue;
  }
  if (res.override) {
    if (!blockSet.has(res.override)) errors.push(`override target ${res.override} (for ${id}) not in blocks.txt`);
    overrides.push({from: id, to: res.override});
    continue;
  }
  if (!res.tag) continue;
  const have = builtin.get(id);
  if (have && have.has(res.tag)) { skippedBuiltin++; continue; }
  const conflict = have && [...have].filter(t => t.startsWith('burns_to_') || t === 'destroy_in_burn');
  if (conflict && conflict.length) errors.push(`${id}: built-in ${conflict.join(',')} vs rule ${res.tag} (use an override)`);
  (tags[res.tag] = tags[res.tag] || []).push(id);
  // destroy_in_burn and branch blocks are not in burnt:will_burn_compat, so fire would not reach them on its own
  if (res.tag === 'destroy_in_burn' || res.ignite) (tags.will_burn = tags.will_burn || []).push(id);
}

const seen = new Map();
for (const [tag, ids] of Object.entries(tags)) {
  if (!tag.startsWith('burns_to_') && tag !== 'destroy_in_burn') continue;
  for (const id of ids) {
    if (seen.has(id)) errors.push(`${id} in both ${seen.get(id)} and ${tag}`);
    seen.set(id, tag);
  }
}

if (errors.length) {
  console.error(errors.map(e => 'ERROR ' + e).join('\n'));
  console.error(`${errors.length} error(s), nothing written`);
  process.exit(1);
}

// ---------- Write ----------
fs.rmSync(TAG_DIR, {recursive: true, force: true});
fs.mkdirSync(TAG_DIR, {recursive: true});
for (const [tag, ids] of Object.entries(tags).sort()) {
  const values = ids.sort().map(id => ({id, required: false}));
  fs.writeFileSync(path.join(TAG_DIR, tag + '.json'), JSON.stringify({replace: false, values}, null, 2) + '\n');
  console.log(`${tag}: ${ids.length}`);
}
fs.mkdirSync(path.dirname(MAP_FILE), {recursive: true});
fs.writeFileSync(MAP_FILE, JSON.stringify({mappings: overrides}, null, 2) + '\n');
console.log(`overrides: ${overrides.length}`);
console.log(`already mapped by Burnt itself (skipped): ${skippedBuiltin}`);
if (unmatched.length) {
  console.log(`WARN ${unmatched.length} wooden-looking block(s) without a rule:`);
  const groups = {};
  for (const id of unmatched) { const g = id.replace(/\/[a-z_0-9]+$/, '/*'); (groups[g] = groups[g] || []).push(id); }
  for (const [g, l] of Object.entries(groups)) console.log('  ' + (l.length > 1 ? `${g} (${l.length})` : l[0]));
}
