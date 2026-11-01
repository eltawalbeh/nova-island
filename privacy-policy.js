// Only access clipboard text if the user has explicitly enabled a feature needing it.
function mayReadClipboard(settings) {
  return !!(settings && (settings.clipboardHistory === true || settings.smartClipboard === true));
}
module.exports = { mayReadClipboard };
