const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
test('Mini Player IPC events validate the sending window', () => {
  const mini = read('mini.js');
  assert.match(mini, /event\.sender === win\.webContents/);
  for (const event of ['mini-time', 'mini-close', 'mini-resize-start', 'mini-resize-end'])
    assert.ok(mini.includes(`ipcMain.on('${event}'`));
});
test('privacy-sensitive features require deliberate opt-in by default', () => {
  const f = read('features.js');
  for (const name of ['clipboardHistory', 'smartClipboard', 'screenshotToast', 'shotAutoShelf'])
    assert.match(f, new RegExp(name + ':\\s*false,'));
});
test('Windows helper has matching source files and build script', () => {
  for (const f of ['NovaHelper.cs', 'Apps.cs', 'YtUrl.cs', 'AddressBar.cs', 'build.cmd', 'nova-helper.exe'])
    assert.ok(fs.existsSync(path.join(root, 'helper', f)), f);
});
