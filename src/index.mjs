#!/usr/bin/env node
import { main } from './cli.mjs';

try {
  const files = await main(process.argv.slice(2), process.env);

  console.log(`Generated:\n${files.map((file) => `  - ${file}`).join('\n')}`);
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
