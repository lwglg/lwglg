import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  collectLanguageStats,
  countPrimaryLanguages,
  mergeCounts,
} from '../src/github/collect.mjs';

const REPOS = [
  { name: 'a', language: 'Go', fork: false },
  { name: 'b', language: 'Go', fork: false },
  { name: 'c', language: null, fork: false },
  { name: 'forked', language: 'Rust', fork: true },
];

const fakeClient = {
  async get(path) {
    if (path.startsWith('/users/')) {
      return REPOS;
    }

    return { Go: 100, Shell: 10 };
  },
};

test('mergeCounts accumulates values', () => {
  assert.deepEqual(mergeCounts({ A: 1 }, { A: 2, B: 3 }), { A: 3, B: 3 });
});

test('countPrimaryLanguages ignores repos without a language', () => {
  assert.deepEqual(countPrimaryLanguages(REPOS), { Go: 2, Rust: 1 });
});

test('collectLanguageStats skips forks and aggregates bytes', async () => {
  const stats = await collectLanguageStats(fakeClient, 'me');

  assert.deepEqual(stats.repos, { Go: 2 });
  assert.deepEqual(stats.bytes, { Go: 300, Shell: 30 });
});
