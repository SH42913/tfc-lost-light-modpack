// Syncs `default_packs` in config/resourcepackoverrides.json with the resource packs enabled in-game.
// Usage: node tools/packs/sync.js <instanceRoot>
// Source: the `resourcePacks:` line of options.txt — only `file/...` entries (zips from resourcepacks/), same order.
// Built-in packs (vanilla, mod_resources, mod-provided packs) are not listed: they're enabled by their mods.
// Also reports differences with the CurseForge export selection in user-prefs.json (read-only, never edited).
const fs = require('fs');
const path = require('path');

const root = process.argv[2] || '.';
const OPTIONS = path.join(root, 'options.txt');
const OVERRIDES = path.join(root, 'config/resourcepackoverrides.json');
const USER_PREFS = path.join(root, 'user-prefs.json');

// --- enabled packs from options.txt ---
const line = fs.readFileSync(OPTIONS, 'utf8').split(/\r?\n/).find(l => l.startsWith('resourcePacks:'));
if (!line) {
  console.error('ERROR: no resourcePacks: line in options.txt');
  process.exit(1);
}
const enabled = JSON.parse(line.slice('resourcePacks:'.length));
const packs = [...new Set(enabled.filter(p => p.startsWith('file/')))];

// --- rewrite default_packs ---
const raw = fs.readFileSync(OVERRIDES, 'utf8');
const eol = raw.includes('\r\n') ? '\r\n' : '\n';
const json = JSON.parse(raw);
const before = json.default_packs || [];
json.default_packs = packs;

// Gson-style output: 2-space indent, HTML-unsafe chars escaped like the mod writes them (' → ').
const gsonEscape = s => s.replace(/['<>=&]/g, c => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0'));
const out = gsonEscape(JSON.stringify(json, null, 2)).replace(/\n/g, eol) + (/\r?\n$/.test(raw) ? eol : '');

const added = packs.filter(p => !before.includes(p));
const removed = before.filter(p => !packs.includes(p));
if (out === raw) {
  console.log('resourcepackoverrides.json: up to date');
} else {
  fs.writeFileSync(OVERRIDES, out);
  console.log('resourcepackoverrides.json: updated');
  added.forEach(p => console.log('  + ' + p));
  removed.forEach(p => console.log('  - ' + p));
  if (!added.length && !removed.length) console.log('  (order/formatting only)');
}

// --- compare with the CurseForge export selection ---
const selection = JSON.parse(fs.readFileSync(USER_PREFS, 'utf8')).export.filesSelection;
const exported = selection
  .filter(e => e.isSelected && /^resourcepacks\\[^\\]+$/.test(e.path))
  .map(e => e.path.slice('resourcepacks\\'.length));
const enabledFiles = packs.map(p => p.slice('file/'.length));
const notExported = enabledFiles.filter(f => !exported.includes(f));
const notEnabled = exported.filter(f => !enabledFiles.includes(f));
if (!notExported.length && !notEnabled.length) {
  console.log('user-prefs.json export: matches');
} else {
  console.log('user-prefs.json export differs (fix in the CurseForge export dialog):');
  notExported.forEach(f => console.log('  enabled, not exported: ' + f));
  notEnabled.forEach(f => console.log('  exported, not enabled: ' + f));
}
