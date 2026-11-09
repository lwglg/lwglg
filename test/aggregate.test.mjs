import assert from 'node:assert/strict';
import { test } from 'node:test';
import { OTHER_COLOR } from '../src/config.mjs';
import { buildSlices } from '../src/stats/aggregate.mjs';

test('buildSlices sorts by value and computes percentages', () => {
  const slices = buildSlices({ A: 1, B: 3 });

  assert.deepEqual(
    slices.map((slice) => [slice.name, slice.percent]),
    [
      ['B', 75],
      ['A', 25],
    ],
  );
});

test('buildSlices groups the tail into "Other"', () => {
  const counts = Object.fromEntries(Array.from({ length: 10 }, (_, i) => [`L${i}`, 10 - i]));
  const slices = buildSlices(counts);
  const last = slices.at(-1);

  assert.equal(slices.length, 8);
  assert.equal(last.name, 'Other');
  assert.equal(last.color, OTHER_COLOR);
  assert.equal(last.value, 3 + 2 + 1);
});

test('buildSlices tolerates empty input', () => {
  assert.deepEqual(buildSlices({}), []);
});
