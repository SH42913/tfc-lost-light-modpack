// Generator for Custom Villager Trades configs (TFC Lost Light).
// Usage: node tools/trades/gen_trades.js <instanceRoot>
//
// Prices come from tools/economy (shared with the Bountiful pools): a villager sells at economy.sell,
// buys at economy.buy. Currency = any TFC gem, amount scaled by gem worth.
const fs = require('fs');
const path = require('path');
const eco = require('../economy/economy');

const root = process.argv[2];
if (!root) throw new Error('usage: node gen_trades.js <instanceRoot>');
const outDir = path.join(root, 'config/custom trades');
const items = eco.loadItems(root);

const GEMS = ['pyrite', 'lapis_lazuli', 'amethyst', 'opal', 'emerald', 'topaz', 'ruby', 'sapphire', 'diamond']
  .map((g) => ({ id: 'tfc:gem/' + g, worth: eco.sell('tfc:gem/' + g) }));

const noPrice = new Set();
function sellWorth(id, t) {
  const w = (t && t.worth) || eco.sell(id);
  if (!w) noPrice.add(id);
  return w || 1000;
}
function buyWorth(id, t) {
  const w = t && t.worth ? eco.round(t.worth * eco.BUY) : eco.buy(id);
  if (!w) noPrice.add(id);
  return w || 1000;
}

// --- trade building --------------------------------------------------------------
const SELL_XP = [1, 5, 10, 15, 30];
const BUY_XP = [2, 10, 20, 30, 30];
const errors = [];
const warnings = [];
const check = (id, where) => { if (!items.has(id)) errors.push(`${where}: unknown item ${id}`); return id; };

// Commissions: fee = half of the work's worth (product - what the input would sell for), but never so low that
// reselling the product pays it back, and at least one gem.
const FEE_MIN = 700;
const crafts = [];

const usesFor = (w) => (w <= 1500 ? 16 : w <= 5000 ? 12 : w <= 15000 ? 6 : 3);

function stack(id, amount, t) {
  const s = { itemKey: id, amount };
  if (t && t.max && t.max > amount) s.amountRange = t.max + 1; // CVT range is exclusive
  if (t && t.name) s.customName = t.name;
  if (t && t.nbt) s.advancedNBTData = t.nbt;
  if (t && t.enchants) s.semiRandomEnchantments = t.enchants.map((e) => ({ enchantmentKey: e.id, enchantmentLevel: e.level }));
  return s;
}

function build(prof, t, where) {
  const L = t.level;
  const out = {};
  let total;
  if (t.kind === 'sell') {
    t.items.forEach((id) => check(id, where));
    const avg = t.max ? (t.amount + t.max) / 2 : t.amount;
    const worths = t.items.map((id) => sellWorth(id, t));
    if (Math.max(...worths) > 1.5 * Math.min(...worths)) warnings.push(`${where}: variants differ in worth ${Math.min(...worths)}..${Math.max(...worths)}, priced by max`);
    total = Math.max(...worths) * avg;
    out.multiOffer = t.items.map((id) => stack(id, t.amount, t));
    out.multiRequest = GEMS.map((g) => ({ itemKey: g.id, amount: Math.max(1, Math.ceil(total / g.worth)) }))
      .filter((s) => s.amount <= 64);
    if (out.multiRequest.length < 3) errors.push(`${where}: too expensive (${total})`);
    if (t.extra) out.additionalRequest = { itemKey: check(t.extra[0], where), amount: t.extra[1] };
  } else if (t.kind === 'buy') {
    t.items.forEach((id) => check(id, where));
    const unit = Math.min(...t.items.map((id) => buyWorth(id, t)));
    const amount = t.amount ?? Math.min(64, Math.ceil(1500 / unit));
    total = unit * amount;
    out.multiRequest = t.items.map((id) => ({ itemKey: id, amount }));
    out.multiOffer = GEMS.map((g) => ({ itemKey: g.id, amount: Math.floor(total / g.worth) }))
      .filter((s) => s.amount >= 1 && s.amount <= 64);
    if (out.multiOffer.length < 3) errors.push(`${where}: buy pays too little/much (${total})`);
  } else if (t.kind === 'craft') {
    t.items.forEach((id) => check(id, where));
    const [inId, inAmount] = t.input;
    check(inId, where);
    const n = t.amount;
    const prodSell = Math.max(...t.items.map((id) => sellWorth(id, t))) * n;
    const inSell = sellWorth(inId) * inAmount;
    const inBuy = buyWorth(inId) * inAmount;
    total = Math.max(FEE_MIN, (prodSell - inBuy) / 2, eco.BUY * (prodSell - inSell));
    if (total + inBuy >= prodSell) errors.push(`${where}: commission (${Math.round(total)} + input ${inBuy}) is not cheaper than buying (${prodSell})`);
    crafts.push(`${where.padEnd(18)} ${inAmount} ${inId} -> ${n} ${t.items[0]}${t.items.length > 1 ? ' (+' + (t.items.length - 1) + ')' : ''}: fee ${Math.round(total)}, buy ready ${prodSell}`);
    out.multiOffer = t.items.map((id) => stack(id, n, t));
    out.multiRequest = GEMS.map((g) => ({ itemKey: g.id, amount: Math.max(1, Math.ceil(total / g.worth)) }))
      .filter((s) => s.amount <= 64);
    if (out.multiRequest.length < 3) errors.push(`${where}: fee too high (${total})`);
    out.additionalRequest = { itemKey: inId, amount: inAmount };
    if (inAmount < 1 || inAmount > 64) errors.push(`${where}: bad input amount ${inAmount}`);
  } else throw new Error('unknown kind ' + t.kind);

  // single variants -> plain offer/request
  for (const [multi, single] of [['multiOffer', 'offer'], ['multiRequest', 'request']]) {
    if (out[multi].length === 1) { out[single] = out[multi][0]; delete out[multi]; }
  }
  const sold = t.kind !== 'buy';
  const res = {};
  for (const k of ['offer', 'multiOffer', 'request', 'multiRequest', 'additionalRequest']) if (out[k]) res[k] = out[k];
  res.tradeExp = (sold ? SELL_XP : BUY_XP)[L - 1];
  const craftKind = t.kind === 'craft';
  res.maxUses = t.uses ?? (craftKind ? (total <= 5000 ? 12 : 6) : sold ? usesFor(total) : L <= 2 ? 16 : 12);
  res.priceMultiplier = sold && !craftKind && total >= 3000 ? 0.2 : 0.05;
  res.demand = 0;
  res.tradeLevel = L;
  if (t.rare !== undefined || prof.wanderer) res.isRare = !!t.rare;
  const key = t.key ?? t.items[0].replace(/^[a-z_]+:/, '').replace(/\//g, '_');
  res.UTID = `${prof.id}:${craftKind ? 'crafts' : sold ? 'sells' : 'buys'}_${key}${t.items.length > 1 ? '_etc' : ''}_l${L}`;
  res._total = total; res._kind = t.kind; res._items = t.items; res._amount = t.max || t.amount || null;
  return res;
}

// --- generate --------------------------------------------------------------------
const profDir = path.join(__dirname, 'professions');
const files = [];
const allTrades = [];
for (const f of fs.readdirSync(profDir).filter((f) => f.endsWith('.js')).sort()) {
  const prof = require(path.join(profDir, f));
  const name = f.replace(/\.js$/, '');
  const trades = prof.trades.map((t, i) => build(prof, t, `${name}#${i + 1}`));

  const utids = new Set();
  for (const t of trades) {
    if (utids.has(t.UTID)) errors.push(`${name}: duplicate UTID ${t.UTID}`);
    utids.add(t.UTID);
  }
  if (prof.wanderer) {
    const rare = trades.filter((t) => t.isRare).length;
    if (trades.length - rare < prof.maxCommonTrades || rare < prof.maxRareTrades) errors.push(`${name}: not enough common/rare trades`);
  } else {
    for (let L = 1; L <= 5; L++) {
      const n = trades.filter((t) => t.tradeLevel === L).length;
      if (n < (prof.maxTrades ?? 3) && !prof.allowShortLevels) errors.push(`${name}: level ${L} has only ${n} trades`);
    }
  }
  allTrades.push(...trades.map((t) => ({ ...t, prof: name })));

  const json = { profession: prof.wanderer ? 'wanderer' : prof.id, removeOtherTrades: true };
  if (prof.wanderer) { json.maxCommonTrades = prof.maxCommonTrades; json.maxRareTrades = prof.maxRareTrades; }
  else json.maxTrades = prof.maxTrades ?? 3;
  json.trades = trades.map(({ _total, _kind, _items, _amount, ...t }) => t);
  const rel = prof.wanderer ? 'wanderer/wanderer.json' : name + '.json';
  files.push([rel, JSON.stringify(json, null, 2) + '\n']);
}

if (noPrice.size) errors.push('no worth in Bountiful pools or prices.js: ' + [...noPrice].join(' '));

// --- arbitrage check: any cycle of trades returning > 100% of the input ------------
const edges = {};
const addEdge = (a, b, rate, d) => { const k = a + '>' + b; if (!edges[k] || edges[k].rate < rate) edges[k] = { a, b, rate, d }; };
for (const t of allTrades) {
  if (t.additionalRequest) continue;
  const reqs = t.request ? [t.request] : t.multiRequest;
  const offs = t.offer ? [t.offer] : t.multiOffer;
  for (const r of reqs) for (const o of offs) {
    const oAmount = o.amountRange ? o.amountRange - 1 : o.amount; // worst case
    addEdge(r.itemKey, o.itemKey, oAmount / r.amount, `${t.prof} L${t.tradeLevel}: ${r.amount} ${r.itemKey} -> ${oAmount} ${o.itemKey}`);
  }
}
const adj = {};
for (const e of Object.values(edges)) (adj[e.a] ||= []).push(e);
const cycles = [];
function dfs(start, cur, prod, trail, seen) {
  if (trail.length >= 4) return;
  for (const e of adj[cur] || []) {
    if (e.b === start) { if (prod * e.rate > 1.0001) cycles.push([prod * e.rate, [...trail, e.d]]); }
    else if (!seen.has(e.b) && e.b > start) dfs(start, e.b, prod * e.rate, [...trail, e.d], new Set([...seen, e.b]));
  }
}
for (const n of Object.keys(adj)) dfs(n, n, 1, [], new Set([n]));
for (const [g, p] of cycles.sort((x, y) => y[0] - x[0]).slice(0, 10)) errors.push(`arbitrage x${g.toFixed(2)}: ${p.join('  =>  ')}`);

if (process.env.SHOW_CRAFTS) for (const c of crafts) console.log('CRAFT', c);
for (const w of warnings) console.log('WARN', w);
if (errors.length) {
  console.error(errors.join('\n'));
  console.error(`\n${errors.length} error(s), nothing written`);
  process.exit(1);
}

// --- write -----------------------------------------------------------------------
const written = new Set();
for (const [rel, txt] of files) {
  fs.mkdirSync(path.dirname(path.join(outDir, rel)), { recursive: true });
  fs.writeFileSync(path.join(outDir, rel), txt);
  written.add(rel);
}
for (const f of fs.readdirSync(outDir)) {
  if (f.endsWith('.json') && !written.has(f)) console.log('STALE (not generated):', f);
}
const byProf = {};
for (const t of allTrades) byProf[t.prof] = (byProf[t.prof] || 0) + 1;
for (const [p, n] of Object.entries(byProf)) console.log(`${p.padEnd(14)} ${n} trades`);
