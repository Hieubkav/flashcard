#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const target = process.argv[2];

if (!target) {
  console.error('tee.js: missing destination file argument');
  process.exit(1);
}

const destination = path.resolve(process.cwd(), target);
const logStream = fs.createWriteStream(destination, { flags: 'w' });

const cleanup = () => {
  if (!logStream.closed) {
    logStream.end();
  }
};

process.on('SIGINT', () => {
  cleanup();
  process.exit(0);
});
process.on('SIGTERM', () => {
  cleanup();
  process.exit(0);
});
process.on('exit', cleanup);

logStream.on('error', (error) => {
  console.error(`tee.js: error writing to ${destination}:`, error);
  process.exit(1);
});

process.stdin.on('error', (error) => {
  console.error('tee.js: error reading stdin:', error);
});

process.stdin.on('data', (chunk) => {
  process.stdout.write(chunk);
  logStream.write(chunk);
});

process.stdin.on('end', cleanup);
process.stdin.resume();
