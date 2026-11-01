const test = require('node:test');
const assert = require('node:assert/strict');
const { classify, calc } = require('../smartclip');
test('correct arithmetic precedence', () => { assert.equal(calc('2+3*4'), 14); assert.equal(calc('(2+3)*4'), 20); });
test('calculator avoids invalid results', () => { assert.equal(classify('3 / 0'), null); assert.equal(classify('12-10-2026'), null); });
test('recognizes a hex color', () => { assert.deepEqual(classify('#123ABC'), { type: 'color', color: '#123ABC' }); });
test('recognizes a URL without opening it', () => { const r = classify('https://example.com/example'); assert.equal(r.type, 'url'); assert.equal(r.host, 'example.com'); });
test('counts long text', () => { const r = classify(Array(30).fill('word').join(' ')); assert.equal(r.type, 'text'); assert.equal(r.words, 30); });
