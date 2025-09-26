#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Script to resolve symlinks by replacing them with actual copies
 * This is needed for deployment platforms that don't support symlinks
 */

function copyRecursive(src, dest) {
  try {
    const stats = fs.lstatSync(src);
    
    if (stats.isDirectory()) {
      // Create destination directory if it doesn't exist
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
      }
      
      // Copy all items in the directory
      const items = fs.readdirSync(src);
      items.forEach(item => {
        const srcItem = path.join(src, item);
        const destItem = path.join(dest, item);
        copyRecursive(srcItem, destItem);
      });
    } else {
      // Copy file
      fs.copyFileSync(src, dest);
    }
  } catch (error) {
    console.warn(`Warning: Could not copy ${src} to ${dest}:`, error.message);
  }
}

function resolveSymlink(symlinkPath, description) {
  try {
    const stats = fs.lstatSync(symlinkPath);
    
    if (stats.isSymbolicLink()) {
      console.log(`🔗 Resolving symlink: ${description}`);
      
      // Read the symlink target
      const target = fs.readlinkSync(symlinkPath);
      const absoluteTarget = path.resolve(path.dirname(symlinkPath), target);
      
      console.log(`   From: ${symlinkPath}`);
      console.log(`   To:   ${absoluteTarget}`);
      
      // Check if target exists
      if (!fs.existsSync(absoluteTarget)) {
        console.warn(`⚠️  Warning: Symlink target does not exist: ${absoluteTarget}`);
        return;
      }
      
      // Remove the symlink
      fs.unlinkSync(symlinkPath);
      
      // Copy the actual content
      copyRecursive(absoluteTarget, symlinkPath);
      
      console.log(`✅ Successfully resolved: ${description}`);
    } else {
      console.log(`ℹ️  Not a symlink: ${description}`);
    }
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log(`ℹ️  Symlink not found: ${description}`);
    } else {
      console.error(`❌ Error resolving symlink ${description}:`, error.message);
    }
  }
}

function restoreSymlink(symlinkPath, targetPath, description) {
  try {
    if (fs.existsSync(symlinkPath)) {
      const stats = fs.lstatSync(symlinkPath);
      
      if (!stats.isSymbolicLink()) {
        console.log(`🔄 Restoring symlink: ${description}`);
        
        // Remove the directory/file
        if (stats.isDirectory()) {
          fs.rmSync(symlinkPath, { recursive: true, force: true });
        } else {
          fs.unlinkSync(symlinkPath);
        }
        
        // Create symlink
        fs.symlinkSync(targetPath, symlinkPath);
        
        console.log(`✅ Successfully restored symlink: ${description}`);
      } else {
        console.log(`ℹ️  Already a symlink: ${description}`);
      }
    }
  } catch (error) {
    console.error(`❌ Error restoring symlink ${description}:`, error.message);
  }
}

// Main function
function main() {
  const command = process.argv[2];
  
  // Symlink configurations
  const symlinks = [
    {
      path: 'src/content',
      target: '../../content',
      description: 'Content directory'
    },
    {
      path: 'public/images',
      target: '../../content/images', 
      description: 'Images directory'
    }
  ];
  
  console.log('🚀 Symlink resolver script\n');
  
  if (command === 'resolve') {
    console.log('📋 Resolving symlinks for production deployment...\n');
    
    symlinks.forEach(config => {
      resolveSymlink(config.path, config.description);
    });
    
    console.log('\n✨ Symlink resolution complete!');
    console.log('💡 Your project is now ready for deployment.');
    
  } else if (command === 'restore') {
    console.log('📋 Restoring symlinks for development...\n');
    
    symlinks.forEach(config => {
      restoreSymlink(config.path, config.target, config.description);
    });
    
    console.log('\n✨ Symlink restoration complete!');
    console.log('💡 Your project is back to development mode.');
    
  } else {
    console.log('Usage:');
    console.log('  node resolve-symlinks.js resolve   # Convert symlinks to copies (for production)');
    console.log('  node resolve-symlinks.js restore   # Convert copies back to symlinks (for development)');
    console.log('');
    console.log('Examples:');
    console.log('  npm run build:prod    # Resolves symlinks and builds');
    console.log('  npm run dev:restore   # Restores symlinks for development');
    process.exit(1);
  }
}

// Run the script
main();