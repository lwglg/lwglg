const ENTITIES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' };

export function escapeXml(text) {
  return String(text).replace(/[&<>"]/g, (character) => ENTITIES[character]);
}
