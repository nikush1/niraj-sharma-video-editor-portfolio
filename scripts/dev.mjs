// Accept the usual Next.js options and the supervised preview's equivalent flags.
import { spawn } from 'node:child_process';
const args = process.argv.slice(2).filter(arg => arg !== '--strictPort').map(arg => arg === '--host' ? '--hostname' : arg);
const child = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'dev', ...args], {stdio:'inherit',env:process.env});
for(const signal of ['SIGINT','SIGTERM']) process.on(signal,()=>child.kill(signal));
child.on('exit',code=>process.exit(code || 0));
