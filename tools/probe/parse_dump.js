// Extracts `/kubejs dump_registry <registry>` output from logs/latest.log into kubejs/probe/*.txt.
// Usage: node tools/probe/parse_dump.js <instanceRoot>
// For each registry the LAST dump in the log wins. Registries missing from the log are left untouched.
const fs = require('fs');
const path = require('path');

const root = process.argv[2] || '.';
const OUT = {
  'minecraft:item': 'kubejs/probe/items.txt',
  'minecraft:block': 'kubejs/probe/blocks.txt',
  'minecraft:entity_type': 'kubejs/probe/entities.txt',
};

const lines = fs.readFileSync(path.join(root, 'logs/latest.log'), 'utf8').split(/\r?\n/);
const CHAT = /\[CHAT\] (.*)$/;
const sections = {}; // registry -> {ids, total}
let cur = null;
for (const line of lines) {
  const m = CHAT.exec(line);
  if (!m) continue;
  const text = m[1].trim();
  const head = /^List of all entries for registry ([a-z0-9_.-]+:[a-z0-9_/.-]+):$/.exec(text);
  if (head) { cur = { reg: head[1], ids: [], total: null }; continue; }
  if (!cur) continue;
  const entry = /^- (\S+)$/.exec(text);
  if (entry) { cur.ids.push(entry[1]); continue; }
  const total = /^Total: (\d+) entries$/.exec(text);
  if (total) { cur.total = +total[1]; sections[cur.reg] = cur; cur = null; }
}

let failed = false;
for (const [reg, file] of Object.entries(OUT)) {
  const s = sections[reg];
  if (!s) { console.log(`${reg}: no dump in log, ${file} untouched`); continue; }
  if (s.ids.length !== s.total) {
    console.error(`ERROR ${reg}: parsed ${s.ids.length} ids, log says Total: ${s.total}. ${file} not written`);
    failed = true; continue;
  }
  const ids = [...new Set(s.ids)].sort();
  const full = path.join(root, file);
  const old = fs.existsSync(full) ? new Set(fs.readFileSync(full, 'utf8').split(/\r?\n/).filter(Boolean)) : new Set();
  const added = ids.filter(id => !old.has(id));
  const now = new Set(ids);
  const removed = [...old].filter(id => !now.has(id));
  fs.writeFileSync(full, ids.join('\n') + '\n');
  const ns = l => [...new Set(l.map(id => id.split(':')[0]))].join(', ');
  console.log(`${reg} -> ${file}: ${ids.length} ids, +${added.length} -${removed.length}`);
  if (added.length) console.log(`  added namespaces: ${ns(added)}`);
  if (removed.length) console.log(`  removed namespaces: ${ns(removed)}`);
}
if (failed) process.exit(1);
