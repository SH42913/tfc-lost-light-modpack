// Dump ESO recipes to a human-readable CSV. Usage: node dump_eso.js <instanceRoot> <out.csv>
const fs = require('fs');
const path = require('path');
const [root, out] = process.argv.slice(2);
const dir = path.join(root, 'tfc_structures_datapacks/lost_light_datapack/data/enchanting_system_overhaul/ench-recipes');

const short = (id) => id.replace(/^minecraft:/, '');
const fmt = (s) => s.itemArray
  ? `${s.itemArray[0].amount}× ` + s.itemArray.map((e) => short(e.id) + (e.amount !== s.itemArray[0].amount ? ` (${e.amount}×)` : '')).join(' / ')
  : `${s.amount}× ${short(s.id)}`;
const roman = ['', 'I', 'II', 'III', 'IV', 'V'];
const esc = (v) => /[;"\n]/.test(String(v)) ? `"${String(v).replace(/"/g, '""')}"` : String(v);

// Kind of the metal in slot 4
const JEWEL = /ingot\/(gold|silver|rose_gold|sterling_silver)$/;
function metalKind(slots) {
  const s = slots[3];
  if (!s) return '';
  const list = s.itemArray ? s.itemArray.map((e) => e.id) : [s.id];
  if (!list.every((id) => JEWEL.test(id))) return 'обычный (наносится на предмет)';
  const hasGold = list.some((id) => /gold/.test(id));
  const hasSilver = list.some((id) => /silver/.test(id));
  return hasGold && hasSilver ? 'на выбор' : hasGold ? 'тематический: золото' : 'тематический: серебро';
}

const rows = [['Зачарование', 'Уровень', 'Опыт (уровни)', 'Слот 1', 'Слот 2', 'Слот 3', 'Слот 4', 'Металл', 'Мод']];
const recipes = fs.readdirSync(dir).map((f) => JSON.parse(fs.readFileSync(path.join(dir, f))));
recipes.sort((a, b) => a.enchantment_id.localeCompare(b.enchantment_id));
for (const r of recipes) {
  for (const [lvl, slots] of Object.entries(r.levels)) {
    const cells = slots.map(fmt);
    while (cells.length < 4) cells.push('');
    rows.push([short(r.enchantment_id), roman[lvl] || lvl, r.xp[lvl] ?? '', ...cells, metalKind(slots), (r.dependsOn || []).join(', ')]);
  }
}
// Default recipe is disabled in config (enableDefaultRecipe: false), so it is not dumped
// BOM + ';' so Excel with Russian locale opens it correctly
fs.writeFileSync(out, '﻿' + rows.map((r) => r.map(esc).join(';')).join('\r\n') + '\r\n');
console.log('rows', rows.length - 1);
