import { formatBytes, formatPercent, formatRepoCount } from './format/units.mjs';
import { buildSlices } from './stats/aggregate.mjs';
import { renderDonut } from './svg/donut.mjs';

const createDescriber = (formatValue) => (segment) =>
  `${segment.name}: ${formatPercent(segment.percent)} (${formatValue(segment.value)})`;

export const CHART_DEFINITIONS = [
  {
    fileName: 'languages-by-code.svg',
    title: 'Languages by code volume',
    source: 'bytes',
    formatValue: formatBytes,
  },
  {
    fileName: 'languages-by-repos.svg',
    title: 'Languages by repository',
    source: 'repos',
    formatValue: formatRepoCount,
  },
];

export function buildCharts(stats) {
  return CHART_DEFINITIONS.map(({ fileName, title, source, formatValue }) => ({
    fileName,
    content: renderDonut({
      title,
      slices: buildSlices(stats[source]),
      describe: createDescriber(formatValue),
    }),
  }));
}
