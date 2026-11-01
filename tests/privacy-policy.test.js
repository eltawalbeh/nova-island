const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { mayReadClipboard } = require('../privacy-policy');

test('clipboard text access is disabled by default', () => {
  assert.equal(mayReadClipboard({ clipboardHistory: false, smartClipboard: false }), false);
  assert.equal(mayReadClipboard({}), false);
  assert.equal(mayReadClipboard(null), false);
});
test('clipboard text is accessed only after explicit feature activation', () => {
  assert.equal(mayReadClipboard({ clipboardHistory: true, smartClipboard: false }), true);
  assert.equal(mayReadClipboard({ clipboardHistory: false, smartClipboard: true }), true);
  assert.equal(mayReadClipboard({ clipboardHistory: 'true', smartClipboard: 1 }), false);
});
test('clipboard read paths check policy before reading', () => {
  const source = fs.readFileSync(require('node:path').join(__dirname, '..', 'system.js'), 'utf8');
  assert.match(source, /if \(mayReadClipboard\(features\.get\(\)\)\) \{\s*clipboard\.readText\(\)/);
  assert.match(source, /if \(isPrivate \|\| !mayReadClipboard\(features\.get\(\)\)\) return;/);
});
