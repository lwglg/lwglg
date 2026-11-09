import { formatPercent } from '../format/units.mjs';
import { escapeXml } from './escape.mjs';

export function renderLegendRow(segment, index, chart) {
  const y = chart.legendTop + index * chart.legendStep;
  const swatchY = y - chart.swatchSize + 3;
  const textX = chart.legendX + chart.swatchSize + 8;
  const rightX = chart.width - 16;

  return [
    `<rect x="${chart.legendX}" y="${swatchY}" width="${chart.swatchSize}" height="${chart.swatchSize}" rx="3" fill="${segment.color}"/>`,
    `<text class="label" x="${textX}" y="${y}">${escapeXml(segment.name)}</text>`,
    `<text class="label muted" x="${rightX}" y="${y}" text-anchor="end">${formatPercent(segment.percent)}</text>`,
  ].join('');
}
