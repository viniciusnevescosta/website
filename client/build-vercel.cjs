#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Starting Vercel build process...\n');

function copyRecursive(src, dest) {
  try {
    const stats = fs.statSync(src);
    
    if (stats.isDirectory()) {
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
      }
      
      fs.readdirSync(src).forEach(item => {
        if (!item.startsWith('.')) {
          copyRecursive(path.join(src, item), path.join(dest, item));
        }
      });
    } else {
      fs.copyFileSync(src, dest);
    }
  } catch (error) {
    console.warn(`Warning: Could not copy ${src}:`, error.message);
  }
}

function removeIfExists(targetPath) {
  try {
    if (fs.existsSync(targetPath)) {
      const stats = fs.lstatSync(targetPath);
      if (stats.isSymbolicLink()) {
        fs.unlinkSync(targetPath);
      } else if (stats.isDirectory()) {
        fs.rmSync(targetPath, { recursive: true, force: true });
      } else {
        fs.unlinkSync(targetPath);
      }
    }
  } catch (error) {
    console.warn(`Warning: Could not remove ${targetPath}:`, error.message);
  }
}

// Step 1: Remove existing symlinks/directories
console.log('🧹 Cleaning existing symlinks...');
removeIfExists('src/content');
removeIfExists('public/images');

// Step 2: Copy external content to src/content
console.log('📁 Copying content from ../content to src/content...');
const contentSource = path.resolve('../content');
const contentDest = path.resolve('src/content');

if (fs.existsSync(contentSource)) {
  copyRecursive(contentSource, contentDest);
  console.log('✅ Content copied successfully');
} else {
  console.error('❌ Error: ../content directory not found!');
  process.exit(1);
}

// Step 3: Copy images to public/images
console.log('🖼️  Copying images to public/images...');
const imagesSource = path.resolve('../content/images');
const imagesDest = path.resolve('public/images');

if (fs.existsSync(imagesSource)) {
  copyRecursive(imagesSource, imagesDest);
  console.log('✅ Images copied successfully');
} else {
  console.log('ℹ️  No images directory found, creating empty one...');
  fs.mkdirSync(imagesDest, { recursive: true });
}

// Step 4: Run the actual build
console.log('\n🔨 Running Astro build...');
try {
  execSync('astro check && astro build', { stdio: 'inherit' });
  console.log('\n✅ Build completed successfully!');
} catch (error) {
  console.error('\n❌ Build failed:', error.message);
  process.exit(1);
}

console.log('\n🎉 Vercel build process completed!');