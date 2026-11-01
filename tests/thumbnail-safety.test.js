const test = require('node:test');
const assert = require('node:assert/strict');
const { ReadableStream } = require('node:stream/web');
const { isSafeThumbnailUrl, readImageWithLimit, MAX_BYTES } = require('../thumbnail-safety');

test('only public HTTPS hostnames pass initial URL check', () => {
  assert.equal(isSafeThumbnailUrl('https://images.example.com/x.webp'), true);
  for (const url of ['http://example.com/a.png', 'https://localhost/file', 'https://127.0.0.1/a',
    'https://[::1]/a', 'https://mybox.local/a', 'https://user:pass@example.com/a',
    'https://example.com:8443/x', 'file:///C:/secret.png']) {
    assert.equal(isSafeThumbnailUrl(url), false, url);
  }
});

function response(chunks, headers = {}) {
  return { ok: true, headers: new Headers(headers), body: new ReadableStream({
    start(controller) { for (const chunk of chunks) controller.enqueue(chunk); controller.close(); },
  }) };
}
test('small thumbnails are accepted', async () => {
  const buf = await readImageWithLimit(response([Buffer.alloc(100), Buffer.alloc(80)]));
  assert.equal(buf.length, 180);
});
test('rejects declared oversize before reading', async () => {
  const buf = await readImageWithLimit(response([Buffer.alloc(10)], { 'content-length': String(MAX_BYTES + 1) }));
  assert.equal(buf, null);
});
test('stream limit blocks unannounced oversized images', async () => {
  const buf = await readImageWithLimit(response([Buffer.alloc(MAX_BYTES), Buffer.alloc(1)]));
  assert.equal(buf, null);
});
