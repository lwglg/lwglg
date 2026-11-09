import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

export function writeCharts(charts, outDir) {
  mkdirSync(outDir, { recursive: true });

  return charts.map(({ fileName, content }) => {
    const target = join(outDir, fileName);

    writeFileSync(target, content, 'utf8');

    return target;
  });
}
