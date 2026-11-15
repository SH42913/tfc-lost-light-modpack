// DSL for FTB Quests chapters (1.20.1, FTB Quests 2001.4.x) + SNBT reader/writer + stable IDs.
// Chapter files in chapters/ call these helpers; gen_quests.js turns the result into
// config/ftbquests/quests/**.snbt and lang files.
const crypto = require('crypto');

// ---------- text ----------
// Every visible text is { ru, en }. A plain string is treated as both (e.g. proper names).
const text = (t) => (t == null ? null : typeof t === 'string' ? { ru: t, en: t } : t);

// ---------- items ----------
// spec: 'ns:id' | '#ns:tag' | anyOf(...specs). Tags and alternatives become an FTB Filter System smart filter.
const anyOf = (...specs) => ({ anyOf: specs.flat() });

// ---------- tasks ----------
/**
 * Have `count` of `spec` in the inventory.
 * opts: consume (Heracles MANUAL: player submits and loses the items), crafted (only items crafted by the player),
 *       icon (task icon; default - first plain id of the spec), title ({ru,en}), optional
 */
const item = (spec, count = 1, opts = {}) => ({ type: 'item', spec, count, ...opts });
/** Kill `count` mobs of type `entity`. */
const kill = (entity, count = 1, opts = {}) => ({ type: 'kill', entity, count, ...opts });
/** Look at something for `ticks` (default 1 second). */
const observe = {
  // a list of block ids (or entity ids below) becomes a generated tag in the pack datapack
  block: (id, opts = {}) => ({ type: 'observation', observe: 'block', target: id, ...opts }),
  blockTag: (tag, opts = {}) => ({ type: 'observation', observe: 'block_tag', target: tag.replace(/^#/, ''), ...opts }),
  entity: (id, opts = {}) => ({ type: 'observation', observe: 'entity_type', target: id, ...opts }),
};
const dimension = (dim, opts = {}) => ({ type: 'dimension', dimension: dim, ...opts });
/**
 * Be in a biome / inside a structure. id: 'ns:id', '#ns:tag' or an array of ids - an array becomes a
 * generated tag in the pack datapack (data/lost_light/tags/worldgen/{biome,structure}/quests/...).
 */
const biome = (id, opts = {}) => ({ type: 'biome', biome: id, ...opts });
const structure = (id, opts = {}) => ({ type: 'structure', structure: id, ...opts });
const advancement = (id, criterion = '', opts = {}) => ({ type: 'advancement', advancement: id, criterion, ...opts });
const checkmark = (opts = {}) => ({ type: 'checkmark', ...opts });
/** Reach `value` of a vanilla custom statistic, e.g. stat('minecraft:walk_one_cm', 100000) = walk 1 km. */
const stat = (id, value, opts = {}) => ({ type: 'stat', stat: id, value, ...opts });
/**
 * Custom task checked by a generated KubeJS server script (needs FTB XMod Compat).
 * check: JS source of `(task, player) => {...}` body is wrapped as is; it must call task.progress++ / set task.progress.
 * opts: max (maxProgress, default 1), timer (check interval in ticks, default 20), icon, title
 */
const custom = (check, opts = {}) => ({ type: 'custom', check, ...opts });

// ---------- rewards ----------
const reward = (spec, count = 1, opts = {}) => ({ type: 'item', spec, count, ...opts });
const xp = (amount) => ({ type: 'xp', amount });
const xpLevels = (levels) => ({ type: 'xp_levels', levels });
const command = (cmd, opts = {}) => ({ type: 'command', command: cmd, ...opts });
// Rewards from a reward table (tables.js): one random entry, a choice of one, every entry, or the table's loot crate.
const random = (table, opts = {}) => ({ type: 'random', table, ...opts });
const choice = (table, opts = {}) => ({ type: 'choice', table, ...opts });
const allTable = (table, opts = {}) => ({ type: 'all_table', table, ...opts });
const lootCrate = (table, opts = {}) => ({ type: 'loot', table, ...opts });

// ---------- reward tables (tables.js) ----------
/**
 * table(key, { title, icon, lootSize (default 1), entries: [entry(spec, count, weight)], crate: { name, color } })
 * crate makes the table drop as a loot crate item (reward lootCrate()).
 */
const table = (key, opts) => ({ key, ...opts });
const entry = (spec, count = 1, weight = 1) => ({ spec, count, weight });

// ---------- chapter groups (groups.js) ----------
/** group(key, { title, icon, order }) */
const group = (key, opts) => ({ key, ...opts });

// ---------- quests & chapters ----------
/**
 * quest(key, {
 *   title, subtitle, desc: {ru: [...], en: [...]},   // desc lines; '' = empty line
 *   icon, deps: ['key' | 'chapter/key'], tasks: [...], rewards: [...],
 *   budget,                                          // expected reward worth (economy units, 1 emerald = 1000)
 *   optional, shape, size, minDeps,
 *   hidden: 'deps_visible' | 'deps_complete' | 'invisible',   // hide until deps are visible / complete; invisible until done
 *   from,                                            // source quest in TerraFirmaAdventure (for reference)
 * })
 */
const quest = (key, opts) => ({ key, ...opts });
/** chapter(key, { title, subtitle, icon, order, group, hideUntilDepsVisible, quests: [...], links: [link(...)] }) */
const chapter = (key, opts) => ({ key, ...opts });
/** Show a quest of another chapter here (FTB quest link): link('chapter/key') - position comes from layout.json. */
const link = (target) => ({ target });

// ---------- stable IDs ----------
// FTB parses IDs with Long.parseLong(hex, 16): the top bit must be 0, and 0 means "none".
function stableId(path) {
  const h = crypto.createHash('sha1').update('lost_light/' + path).digest('hex').toUpperCase();
  let id = ((parseInt(h[0], 16) & 7).toString(16) + h.slice(1, 16)).toUpperCase();
  if (/^0+$/.test(id)) id = '0000000000000001';
  return id;
}

// ---------- SNBT writer ----------
class Num {
  constructor(v, suffix) { this.v = v; this.suffix = suffix; }
  toString() {
    if (this.suffix === 'd') return (Number.isInteger(this.v) ? this.v.toFixed(1) : String(this.v)) + 'd';
    return String(this.v) + this.suffix;
  }
}
// Long: a number, or a BigInt for 64-bit values (FTB object IDs referenced as longs, e.g. table_id).
const L = (v) => new Num(typeof v === 'bigint' ? v : Math.round(v), 'L');
const F = (v) => new Num(v, 'f');
const idLong = (hex) => BigInt('0x' + hex);
const D = (v) => new Num(v, 'd');
const B = (v) => new Num(v, 'b');

const quoteStr = (s) => '"' + s.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
const key = (k) => (/^[A-Za-z0-9_.+-]+$/.test(k) ? k : quoteStr(k));

// FTB-like layout: tab indent, one entry per line, keys sorted, short scalar lists inline.
function toSNBT(v, ind = '') {
  if (v instanceof Num) return v.toString();
  if (typeof v === 'string') return quoteStr(v);
  if (typeof v === 'boolean') return String(v);
  if (typeof v === 'number') return Number.isInteger(v) ? String(v) : String(v) + 'd';
  const next = ind + '\t';
  if (Array.isArray(v)) {
    if (!v.length) return '[ ]';
    if (v.every((x) => typeof x === 'string' || x instanceof Num) && v.join('').length < 80 && !v.some((x) => x === ''))
      return '[' + v.map((x) => toSNBT(x)).join(', ') + ']';
    return '[\n' + v.map((x) => next + toSNBT(x, next)).join('\n') + '\n' + ind + ']';
  }
  const keys = Object.keys(v).filter((k) => v[k] !== undefined).sort();
  if (!keys.length) return '{ }';
  return '{\n' + keys.map((k) => next + key(k) + ': ' + toSNBT(v[k], next)).join('\n') + '\n' + ind + '}';
}

// ---------- SNBT reader (enough for FTB quest files) ----------
function parseSNBT(src) {
  let i = 0;
  const ws = () => { while (i < src.length && /[\s,]/.test(src[i])) i++; };
  const str = () => {
    const q = src[i++]; let s = '';
    while (src[i] !== q) { if (src[i] === '\\') i++; s += src[i++]; }
    i++; return s;
  };
  const word = () => {
    const m = /^[A-Za-z0-9_.+-]+/.exec(src.slice(i, i + 256));
    if (!m) throw new Error(`SNBT: unexpected ${JSON.stringify(src.slice(i, i + 20))} at ${i}`);
    i += m[0].length;
    return m[0];
  };
  function value() {
    ws();
    const c = src[i];
    if (c === '{') {
      i++; const o = {};
      for (;;) { ws(); if (src[i] === '}') { i++; return o; }
        const k = src[i] === '"' || src[i] === "'" ? str() : word(); ws();
        if (src[i++] !== ':') throw new Error(`SNBT: expected : after ${k} at ${i}`);
        o[k] = value(); }
    }
    if (c === '[') {
      i++; ws(); if (/^[BIL];/.test(src.slice(i, i + 2))) i += 2;
      const a = []; for (;;) { ws(); if (src[i] === ']') { i++; return a; } a.push(value()); }
    }
    if (c === '"' || c === "'") return str();
    const w = word();
    if (w === 'true' || w === 'false') return w === 'true';
    const m = /^(-?[\d.]+(?:E-?\d+)?)([bBsSlLfFdD]?)$/.exec(w);
    return m ? Number(m[1]) : w;
  }
  return value();
}

module.exports = {
  text, anyOf, item, kill, observe, dimension, biome, structure, advancement, checkmark, stat, custom,
  reward, xp, xpLevels, command, random, choice, allTable, lootCrate,
  table, entry, group, quest, chapter, link,
  stableId, idLong, toSNBT, parseSNBT, L, D, B, F,
};
