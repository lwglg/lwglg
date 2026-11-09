import { CHART } from '../config.mjs';
import { escapeXml } from './escape.mjs';
import { layoutSegments } from './geometry.mjs';
import { renderLegendRow } from './legend.mjs';
import { renderFill, renderOutline, renderPercentLabel } from './segments.mjs';
import { STYLESHEET } from './styles.mjs';

function renderBody(segments, chart, describe) {
  return [
    ...segments.map((segment) => renderFill(segment, chart)),
    ...segments.map((segment) => renderOutline(segment, chart, describe)),
    ...segments.map((segment) => renderPercentLabel(segment, chart)),
    ...segments.map((segment, index) => renderLegendRow(segment, index, chart)),
  ].join('\n');
}

function wrapDocument({ title, chart, body }) {
  const safeTitle = escapeXml(title);
  const size = `width="${chart.width}" height="${chart.height}"`;
  const namespace = 'xmlns="http://www.w3.org/2000/svg"';

  return [
    `<svg ${namespace} ${size} viewBox="0 0 ${chart.width} ${chart.height}" role="img" aria-label="${safeTitle}">`,
    `<style>${STYLESHEET}</style>`,
    `<text class="title" x="16" y="28">${safeTitle}</text>`,
    body,
    '</svg>',
    '',
  ].join('\n');
}

export function renderDonut({ title, slices, describe, chart = CHART }) {
  const segments = layoutSegments(slices);

  return wrapDocument({ title, chart, body: renderBody(segments, chart, describe) });
}
