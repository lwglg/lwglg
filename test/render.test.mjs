import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { main, parseArguments } from '../src/cli.mjs';
import { createClient } from '../src/github/client.mjs';

test('parseArguments requires an owner unless --sample is set', () => {
  assert.throws(() => parseArguments([]), /Usage/);
  assert.deepEqual(parseArguments(['me']), { owner: 'me', sample: false });
  assert.equal(parseArguments(['--sample']).sample, true);
});

test('main writes SVG charts with percentages and hover outlines', async () => {
  const outDir = mkdtempSync(join(tmpdir(), 'stats-'));
  const [first] = await main(['--sample'], { OUT_DIR: outDir });
  const svg = readFileSync(first, 'utf8');

  assert.match(svg, /^<svg /);
  assert.match(svg, /class="outline"/);
  assert.match(svg, /\.outline:hover/);
  assert.match(svg, /class="percent"[^>]*>\d+%</);
});

test('client throws a descriptive error on HTTP failure', async () => {
  const client = createClient({ fetchImpl: async () => ({ ok: false, status: 403 }) });

  await assert.rejects(client.get('/x'), /\/x failed with status 403/);
});
