// DSL for describing villager trades. Profession files call these helpers;
// gen_trades.js turns the result into Custom Villager Trades JSON.

/**
 * Villager SELLS `items` (one random variant) to the player for gems.
 * @param {number} level   villager level 1..5 (ignored for the wanderer)
 * @param {string|string[]} items  item id or variants (multiOffer)
 * @param {number} amount  stack size; with opts.max -> random amount in [amount, max]
 * @param {object} [opts]
 *   max      - upper bound (inclusive) for a random amount
 *   worth    - override per-unit worth
 *   uses     - override maxUses
 *   rare     - wanderer only: rare trade
 *   extra    - [id, amount] additional request (e.g. a book for an enchanted book)
 *   nbt      - advancedNBTData string applied to every variant
 *   name     - customName
 *   enchants - [{id, level}] semi-random enchantments (one is chosen)
 *   key      - UTID suffix when the same item is sold in several trades (e.g. potions)
 */
function sell(level, items, amount, opts = {}) {
  return { kind: 'sell', level, items: [].concat(items), amount, ...opts };
}

/**
 * Villager BUYS `items` (one random variant) from the player and pays gems.
 * @param {number} level
 * @param {string|string[]} items  item id or variants (multiRequest)
 * @param {number} [amount]  how many items the player gives; default - auto (~1.5 emerald worth)
 * @param {object} [opts]  worth, uses, rare
 */
function buy(level, items, amount, opts = {}) {
  return { kind: 'buy', level, items: [].concat(items), amount, ...opts };
}

/**
 * Commission: the player brings `input` and pays a work fee in gems, the villager makes `items`.
 * Fee = half of the work's worth, with a 1-gem minimum and an anti-resale floor - see gen_trades.js.
 * @param {number} level
 * @param {string|string[]} items  result id or variants (multiOffer: the villager specialises in one)
 * @param {number} amount  result stack size
 * @param {[string, number]} input  [id, amount] the player brings (additionalRequest, single item)
 * @param {object} [opts]  worth (per-unit result worth), uses, key
 */
function craft(level, items, amount, input, opts = {}) {
  return { kind: 'craft', level, items: [].concat(items), amount, input, ...opts };
}

/** `prefix + x + suffix` for every x. */
const each = (prefix, list, suffix = '') => list.map((x) => prefix + x + suffix);

module.exports = { sell, buy, craft, each };
