import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

const BLOCK_STATEMENTS = ['if', 'for', 'while', 'do', 'switch', 'try', 'function', 'class'];
const DECLARATIONS = ['const', 'let', 'var'];

// Blank lines separate logical blocks: declarations, functions, decisions, loops, flow control.
const paddingRules = [
  'error',
  { blankLine: 'always', prev: DECLARATIONS, next: '*' },
  { blankLine: 'any', prev: DECLARATIONS, next: DECLARATIONS },
  { blankLine: 'always', prev: '*', next: [...BLOCK_STATEMENTS, 'block-like'] },
  { blankLine: 'always', prev: [...BLOCK_STATEMENTS, 'block-like'], next: '*' },
  { blankLine: 'always', prev: '*', next: ['return', 'throw', 'break', 'continue'] },
  { blankLine: 'always', prev: ['multiline-const', 'multiline-expression'], next: '*' },
  { blankLine: 'always', prev: '*', next: ['multiline-const', 'multiline-expression'] },
  { blankLine: 'always', prev: 'import', next: '*' },
  { blankLine: 'any', prev: 'import', next: 'import' },
  { blankLine: 'always', prev: '*', next: 'export' },
  { blankLine: 'always', prev: 'export', next: '*' },
];

// Small, flat functions with low McCabe cyclomatic complexity.
const maintainabilityRules = {
  complexity: ['error', 4],
  'max-depth': ['error', 2],
  'max-lines': ['error', { max: 120, skipBlankLines: true, skipComments: true }],
  'max-lines-per-function': ['error', { max: 20, skipBlankLines: true, skipComments: true }],
  'max-nested-callbacks': ['error', 3],
  'max-params': ['error', 3],
  'max-statements': ['error', 8],
  'no-nested-ternary': 'error',
};

const styleRules = {
  curly: ['error', 'all'],
  eqeqeq: ['error', 'always'],
  'no-else-return': 'error',
  'no-var': 'error',
  'prefer-const': 'error',
  '@stylistic/padding-line-between-statements': paddingRules,
};

export default [
  { ignores: ['node_modules/', 'stats/'] },
  js.configs.recommended,
  prettier,
  {
    files: ['**/*.mjs'],
    languageOptions: { ecmaVersion: 'latest', sourceType: 'module', globals: globals.node },
    plugins: { '@stylistic': stylistic },
    rules: { ...maintainabilityRules, ...styleRules },
  },
  {
    files: ['test/**/*.mjs'],
    rules: { 'max-lines-per-function': 'off', 'max-statements': 'off' },
  },
];
