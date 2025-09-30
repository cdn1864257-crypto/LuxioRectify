#!/usr/bin/env node

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🚀 Starting development servers...\n');

// Start backend server on port 3001
console.log('📦 Starting backend API on port 3001...');
const backend = spawn('npx', ['tsx', 'server/index.ts'], {
  cwd: __dirname,
  stdio: 'pipe',
  shell: true,
  env: { ...process.env, BACKEND_PORT: '3001' }
});

backend.stdout.on('data', (data) => {
  console.log(`[Backend] ${data.toString().trim()}`);
});

backend.stderr.on('data', (data) => {
  console.error(`[Backend Error] ${data.toString().trim()}`);
});

// Wait a bit for backend to start, then start frontend
setTimeout(() => {
  console.log('🎨 Starting frontend on port 5000...\n');
  const frontend = spawn('npm', ['run', 'dev'], {
    cwd: join(__dirname, 'frontend'),
    stdio: 'inherit',
    shell: true
  });

  frontend.on('error', (error) => {
    console.error('❌ Failed to start frontend:', error);
    backend.kill();
    process.exit(1);
  });

  frontend.on('close', (code) => {
    console.log(`Frontend server exited with code ${code}`);
    backend.kill();
    process.exit(code);
  });

  process.on('SIGINT', () => {
    console.log('\n👋 Stopping servers...');
    frontend.kill('SIGINT');
    backend.kill('SIGINT');
  });

  process.on('SIGTERM', () => {
    frontend.kill('SIGTERM');
    backend.kill('SIGTERM');
  });
}, 2000);

backend.on('error', (error) => {
  console.error('❌ Failed to start backend:', error);
  process.exit(1);
});

backend.on('close', (code) => {
  console.log(`Backend server exited with code ${code}`);
  process.exit(code);
});
