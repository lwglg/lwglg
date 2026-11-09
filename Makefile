.DEFAULT_GOAL := help

OWNER   ?= lwglg
OUT_DIR ?= stats
NPM     ?= npm

.PHONY: help install install-ci lint lint-fix format format-check test check generate sample ci clean

help: ## List available targets
	@grep -E '^[a-zA-Z_-]+:.*?## ' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "} {printf "  \033[36m%-14s\033[0m %s\n", $$1, $$2}'

install: ## Install dependencies (updates the lockfile if needed)
	$(NPM) install

install-ci: ## Install dependencies exactly as locked (used in CI)
	$(NPM) ci

lint: ## Run ESLint
	$(NPM) run lint

lint-fix: ## Run ESLint and apply automatic fixes
	$(NPM) run lint:fix

format: ## Format all files with Prettier
	$(NPM) run format

format-check: ## Check formatting without changing files
	$(NPM) run format:check

test: ## Run the unit tests (node:test)
	$(NPM) test

check: lint format-check test ## Run every quality gate (lint, format, tests)

generate: ## Generate the charts for OWNER (needs GITHUB_TOKEN for good rate limits)
	OUT_DIR=$(OUT_DIR) $(NPM) run --silent generate -- $(OWNER)

sample: ## Generate the charts from built-in sample data (no network)
	OUT_DIR=$(OUT_DIR) $(NPM) run --silent generate:sample

ci: install-ci check sample ## Full pipeline as run on GitHub Actions

clean: ## Remove generated charts and installed dependencies
	rm -rf $(OUT_DIR) node_modules
