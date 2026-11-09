import assert from 'node:assert/strict';
import { test } from 'node:test';
import { arcPath, layoutSegments, polar, START_ANGLE } from '../src/svg/geometry.mjs';

test('polar converts angle to coordinates', () => {
  const { x, y } = polar({ cx: 10, cy: 10 }, 5, 0);

  assert.equal(x, 15);
  assert.equal(y, 10);
});

test('layoutSegments covers a full turn contiguously', () => {
  const segments = layoutSegments([{ percent: 25 }, { percent: 75 }]);

  assert.equal(segments[0].start, START_ANGLE);
  assert.equal(segments[0].end, segments[1].start);
  assert.ok(Math.abs(segments[1].end - segments[0].start - Math.PI * 2) < 1e-9);
});

test('arcPath handles a 100% segment without degenerating', () => {
  const path = arcPath({ cx: 0, cy: 0, outer: 10, inner: 5, start: 0, end: Math.PI * 2 });

  assert.match(path, /^M.*Z$/);
  assert.match(path, / 0 1 1 /);
});
