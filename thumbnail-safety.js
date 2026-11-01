// Protect the main process from untrusted download thumbnail URLs and oversized responses.
const { isIP } = require('node:net');
const MAX_BYTES = 400 * 1024;

function isSafeThumbnailUrl(input) {
  if (typeof input !== 'string' || input.length > 2048) return false;
  try {
    const url = new URL(input);
    const host = url.hostname.toLowerCase().replace(/^\[|\]$/g, '');
    return url.protocol === 'https:' && !url.username && !url.password &&
      (!url.port || url.port === '443') && host.includes('.') &&
      !isIP(host) && host !== 'localhost' &&
      !['.localhost', '.local', '.internal', '.test'].some(x => host.endsWith(x));
  } catch { return false; }
}

async function readImageWithLimit(response, max = MAX_BYTES) {
  if (!response?.ok || !response.body) return null;
  const len = response.headers.get('content-length');
  if (len !== null && (Number(len) > max || !Number.isFinite(Number(len)))) return null;
  const reader = response.body.getReader();
  const chunks = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > max) { await reader.cancel(); return null; }
      chunks.push(Buffer.from(value));
    }
    return Buffer.concat(chunks, size);
  } finally {
    reader.releaseLock();
  }
}

module.exports = { isSafeThumbnailUrl, readImageWithLimit, MAX_BYTES };
