import { MIN_LABEL_PERCENT } from '../config.mjs';
import { formatPercent } from '../format/units.mjs';
import { escapeXml } from './escape.mjs';
import { arcPath, polar } from './geometry.mjs';

const toArc = (segment, chart) => ({
  cx: chart.cx,
  cy: chart.cy,
  outer: chart.outerRadius,
  inner: chart.innerRadius,
  start: segment.start,
  end: segment.end,
});

export function renderFill(segment, chart) {
  return `<path d="${arcPath(toArc(segment, chart))}" fill="${segment.color}"/>`;
}

export function renderOutline(segment, chart, describe) {
  const tooltip = escapeXml(describe(segment));

  return `<path class="outline" d="${arcPath(toArc(segment, chart))}"><title>${tooltip}</title></path>`;
}

export function renderPercentLabel(segment, chart) {
  if (segment.percent < MIN_LABEL_PERCENT) {
    return '';
  }

  const middle = (segment.start + segment.end) / 2;
  const radius = (chart.outerRadius + chart.innerRadius) / 2;
  const { x, y } = polar(chart, radius, middle);
  const baseline = (y + chart.labelBaselineOffset).toFixed(1);

  return `<text class="percent" x="${x.toFixed(1)}" y="${baseline}">${formatPercent(segment.percent, 0)}</text>`;
}
