// Only alter the working copy used for the test build, without modifying upstream notices.
const fs = require('node:fs');
const paths = [
  'index.html', 'renderer.js', 'mini/index.html', 'mini/mini.js',
  'prefs/index.html', 'prefs-window.js', 'prefs/prefs.js', 'prefs/prefs.css',
];
for (const path of paths) {
  if (!fs.existsSync(path)) continue;
  const original = fs.readFileSync(path, 'utf8');
  const changed = original.replaceAll('Nova Island', 'Island Dev');
  if (changed !== original) fs.writeFileSync(path, changed);
}
