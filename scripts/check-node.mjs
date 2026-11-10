import { readFileSync } from 'node:fs';

const expected = readFileSync(new URL('../.nvmrc', import.meta.url), 'utf8').trim();
if (process.versions.node.split('.')[0] !== expected) {
  console.error(`Node.js ${expected}.x is required; found ${process.version}. Select the version in .nvmrc (for example, nvm install && nvm use).`);
  process.exit(1);
}
console.log(`Node.js ${process.version}; ${process.env.npm_config_user_agent ?? 'direct invocation'}`);
