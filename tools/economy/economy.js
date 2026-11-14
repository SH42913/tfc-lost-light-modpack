// Shared economy for Bountiful pools and villager trades.
//   value(id) = max(hand worth from values.js, max over recipes of materials * (1 + labor) / out)
//   sell(id)  = value(id)          - a villager sells / Bountiful rewards
//   buy(id)   = value(id) * BUY    - a villager buys / Bountiful objectives (gems: full worth)
const fs = require('fs');
const path = require('path');
const { V, COLORS } = require('./values');
const { RECIPES } = require('./recipes');

const BUY = 0.8;
const CURRENCY = new Set(Object.keys(V).filter((id) => id.startsWith('tfc:gem/')));

const round = (x) => (x < 10 ? Math.round(x) : x < 100 ? Math.round(x / 5) * 5 : x < 1000 ? Math.round(x / 10) * 10 : Math.round(x / 100) * 100);

const byId = {};
for (const rec of RECIPES) (byId[rec.id] ||= []).push(rec);

const memo = {};
const raised = {}; // id -> [hand, recipe]
function value(id, stack = []) {
  if (id in memo) return memo[id];
  if (stack.includes(id)) throw new Error('recipe cycle: ' + [...stack, id].join(' -> '));
  let fromRecipe = 0;
  for (const rec of byId[id] || []) {
    let sum = 0;
    for (const [inId, n] of Object.entries(rec.in)) {
      const v = value(inId, [...stack, id]);
      if (!v) { sum = NaN; break; }
      sum += v * n;
    }
    if (!Number.isNaN(sum)) fromRecipe = Math.max(fromRecipe, (sum * (1 + rec.labor)) / rec.out);
  }
  const hand = V[id] || 0;
  if (hand && fromRecipe > hand) raised[id] = [hand, round(fromRecipe)];
  const v = Math.max(hand, fromRecipe);
  return (memo[id] = v ? round(v) : undefined);
}

const sell = (id) => value(id);
const buy = (id) => {
  const v = value(id);
  return v && (CURRENCY.has(id) ? v : round(v * BUY));
};

// Items of mods added after the last `/kubejs dump_registry minecraft:item` (drop once items.txt is regenerated).
const NOT_IN_DUMP = ['bountiful:decree'];
function loadItems(root) {
  const ids = fs.readFileSync(path.join(root, 'kubejs/probe/items.txt'), 'utf8').split(/\r?\n/).filter(Boolean);
  return new Set([...ids, ...NOT_IN_DUMP]);
}

// Hand prices that recipes pushed up (worth knowing when tuning values.js).
function report() {
  return Object.entries(raised).sort().map(([id, [h, r]]) => `${id.padEnd(48)} ${String(h).padStart(6)} -> ${r}`);
}

module.exports = { value, sell, buy, BUY, CURRENCY, COLORS, RECIPES, loadItems, report, round };
