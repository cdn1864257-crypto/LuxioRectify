#!/usr/bin/env node

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🚀 Starting frontend development server...');

const child = spawn('npm', ['run', 'dev'], {
  cwd: join(__dirname, 'frontend'),
  stdio: 'inherit',
  shell: true
});

child.on('error', (error) => {
  console.error('❌ Failed to start frontend:', error);
  process.exit(1);
});

child.on('close', (code) => {
  console.log(`Frontend server exited with code ${code}`);
  process.exit(code);
});

process.on('SIGINT', () => {
  console.log('\n👋 Stopping frontend server...');
  child.kill('SIGINT');
});

process.on('SIGTERM', () => {
  child.kill('SIGTERM');
});