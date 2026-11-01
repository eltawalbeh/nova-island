const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const excluded = new Set(['node_modules', 'dist', '.git', 'promo', 'build']);
let checked = 0;
function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory() && !excluded.has(e.name)) walk(path.join(dir, e.name));
    else if (e.isFile() && e.name.endsWith('.js')) {
      const file = path.join(dir, e.name);
      const r = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
      if (r.status !== 0) { process.stderr.write(r.stderr || r.stdout || 'Syntax check failed: ' + file + '\n'); process.exitCode = 1; }
      else checked++;
    }
  }
}
walk(root);
console.log('JavaScript files with valid syntax:', checked);
