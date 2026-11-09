# Development

Chart generator for the profile README (`stats/*.svg`). Requires Node.js 26 (LTS), see `.nvmrc`.

## Commands

Run `make help` for the full list.

| Command         | What it does                                    |
| --------------- | ----------------------------------------------- |
| `make install`  | Install dependencies                            |
| `make check`    | Lint + format check + tests (all quality gates) |
| `make lint-fix` | Apply ESLint auto-fixes                         |
| `make format`   | Format with Prettier                            |
| `make sample`   | Generate charts from built-in sample data       |
| `make generate` | Generate charts for `OWNER` (default `lwglg`)   |

## Layout

| Path                      | Responsibility                                   |
| ------------------------- | ------------------------------------------------ |
| `src/index.mjs`           | Entry point (error handling, exit code)          |
| `src/cli.mjs`             | Argument parsing and orchestration               |
| `src/config.mjs`          | Constants: palette, chart geometry, limits       |
| `src/github/`             | GitHub API client, data collection, sample data  |
| `src/stats/aggregate.mjs` | Ranking and grouping data into slices            |
| `src/format/units.mjs`    | Human-readable values                            |
| `src/svg/`                | Geometry, styles, segments, legend, donut layout |
| `src/charts.mjs`          | Chart definitions (which data, title, file name) |
| `src/output/write.mjs`    | Writing files to disk                            |

## Quality rules (ESLint)

- McCabe complexity ≤ 4, ≤ 20 lines and ≤ 8 statements per function, nesting depth ≤ 2, ≤ 3 parameters.
- Blank lines between declarations, functions, decisions, loops and flow control (`return`, `throw`, ...).
- Prettier owns formatting (`.prettierrc.json`).

## CI/CD

- `ci.yml`: lint, format check, tests and a sample generation on every push/PR; also reusable.
- `profile-stats.yml`: runs `ci.yml` first, then regenerates and commits the charts (daily, on `src/` changes, or manually).
