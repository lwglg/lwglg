import assert from 'node:assert/strict';
import { test } from 'node:test';
import { formatBytes, formatPercent, formatRepoCount } from '../src/format/units.mjs';
import { escapeXml } from '../src/svg/escape.mjs';

test('formatBytes switches between KB and MB', () => {
  assert.equal(formatBytes(1500), '2 KB');
  assert.equal(formatBytes(2_500_000), '2.5 MB');
});

test('formatRepoCount pluralises', () => {
  assert.equal(formatRepoCount(1), '1 repo');
  assert.equal(formatRepoCount(3), '3 repos');
});

test('formatPercent respects digits', () => {
  assert.equal(formatPercent(12.345), '12.3%');
  assert.equal(formatPercent(12.345, 0), '12%');
});

test('escapeXml escapes markup characters', () => {
  assert.equal(escapeXml('a<b>&"c"'), 'a&lt;b&gt;&amp;&quot;c&quot;');
});
