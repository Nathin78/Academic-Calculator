import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';
import { dirname, resolve } from 'node:path';

const require = createRequire(import.meta.url);
const viteCli = resolve(dirname(require.resolve('vite')), '../../bin/vite.js');
const child = spawn(process.execPath, [viteCli, ...process.argv.slice(2)], {
  stdio: 'inherit',
});

child.on('error', (error) => {
  console.error(error);
  process.exit(1);
});

child.on('exit', (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  process.exit(code ?? 1);
});
