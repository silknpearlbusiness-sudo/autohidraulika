function parseSections(raw, headings) {
  const sorted = headings.map((h) => ({ h, idx: raw.indexOf(h) })).filter((x) => x.idx !== -1).sort((a, b) => a.idx - b.idx);
  const result = [];
  let cursor = 0;
  for (let i = 0; i < sorted.length; i++) {
    const { h, idx } = sorted[i];
    const pre = raw.slice(cursor, idx).trim();
    if (pre) result.push({ paragraphs: splitParagraphs(pre) });
    const end = i + 1 < sorted.length ? sorted[i + 1].idx : raw.length;
    const body = raw.slice(idx + h.length, end).trim();
    result.push({ heading: h, paragraphs: splitParagraphs(body) });
    cursor = end;
  }
  const tail = raw.slice(cursor).trim();
  if (tail) result.push({ paragraphs: splitParagraphs(tail) });
  return result;
}
function splitParagraphs(text, maxLen = 480) {
  if (!text) return [];
  if (text.length <= maxLen) return [text];
  const sentences = text.split(new RegExp("(?<=[.!?])\\s+"));
  const chunks = [];
  let buf = "";
  for (const s of sentences) {
    const next = buf ? buf + " " + s : s;
    if (next.length > maxLen && buf) {
      chunks.push(buf.trim());
      buf = s;
    } else {
      buf = next;
    }
  }
  if (buf) chunks.push(buf.trim());
  return chunks.length ? chunks : [text];
}
export {
  parseSections as p
};
