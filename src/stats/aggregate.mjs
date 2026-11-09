import { MAX_SLICES, OTHER_COLOR, PALETTE } from '../config.mjs';

const sumValues = (entries) => entries.reduce((total, [, value]) => total + value, 0);

export function rankEntries(counts) {
  return Object.entries(counts).sort(([, a], [, b]) => b - a);
}

function appendOther(top, rest) {
  const restTotal = sumValues(rest);

  if (restTotal === 0) {
    return top;
  }

  return [...top, ['Other', restTotal]];
}

export function buildSlices(counts) {
  const ranked = rankEntries(counts);
  const total = sumValues(ranked) || 1;
  const entries = appendOther(ranked.slice(0, MAX_SLICES), ranked.slice(MAX_SLICES));

  return entries.map(([name, value], index) => ({
    name,
    value,
    percent: (value / total) * 100,
    color: PALETTE[index] ?? OTHER_COLOR,
  }));
}
