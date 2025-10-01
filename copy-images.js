#!/usr/bin/env node
import { copyFileSync, mkdirSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const sourceDir = 'attached_assets';
const targetDir = 'frontend/public/attached_assets';

function copyDirectory(src, dest) {
  mkdirSync(dest, { recursive: true });
  
  const entries = readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = join(src, entry.name);
    const destPath = join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else if (entry.name.match(/\.(jpg|jpeg|png|webp|gif)$/i)) {
      try {
        copyFileSync(srcPath, destPath);
        console.log(`✓ Copied: ${entry.name}`);
      } catch (err) {
        console.error(`✗ Failed to copy ${entry.name}:`, err.message);
      }
    }
  }
}

console.log('📸 Copying images from attached_assets to frontend/public...\n');
copyDirectory(sourceDir, targetDir);
console.log('\n✅ Done!');
