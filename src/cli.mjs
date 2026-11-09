import { parseArgs } from 'node:util';
import { buildCharts } from './charts.mjs';
import { DEFAULT_OUT_DIR } from './config.mjs';
import { createClient } from './github/client.mjs';
import { collectLanguageStats } from './github/collect.mjs';
import { SAMPLE_STATS } from './github/sample-data.mjs';
import { writeCharts } from './output/write.mjs';

export function parseArguments(argv) {
  const { values, positionals } = parseArgs({
    args: argv,
    allowPositionals: true,
    options: { sample: { type: 'boolean', default: false } },
  });

  const [owner] = positionals;

  if (!owner && !values.sample) {
    throw new Error('Usage: node src/index.mjs <owner> [--sample]');
  }

  return { owner, sample: values.sample };
}

function loadStats({ owner, sample }, env) {
  if (sample) {
    return SAMPLE_STATS;
  }

  return collectLanguageStats(createClient({ token: env.GITHUB_TOKEN }), owner);
}

export async function main(argv, env) {
  const options = parseArguments(argv);
  const stats = await loadStats(options, env);
  const files = writeCharts(buildCharts(stats), env.OUT_DIR ?? DEFAULT_OUT_DIR);

  return files;
}
