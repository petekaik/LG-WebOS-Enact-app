#!/usr/bin/env node

/**
 * Webcam Viewer Build Script
 * This script provides a comprehensive build and deployment solution
 * for the LG WebOS Webcam Viewer app.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Configuration
const APP_ID = 'com.morgeweb.webcamviewer';
const APP_VERSION = '1.0.0';
const APP_TITLE = 'Webcam Viewer';

// Directory paths
const ROOT_DIR = __dirname;
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const RESOURCES_DIR = path.join(ROOT_DIR, 'resources');
const WEBOS_META_DIR = path.join(ROOT_DIR, 'webos-meta');

// Required resources
const REQUIRED_RESOURCES = [
  'icon.png',
  'icon-mini.png',
  'icon-large.png',
  'splash.png',
  'bg.png'
];

// Create CLI interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Helper function to run a command
function runCommand(command, options = {}) {
  console.log(`\n> ${command}`);
  try {
    execSync(command, { stdio: 'inherit', ...options });
    return true;
  } catch (error) {
    if (options.ignoreError) {
      console.warn('Command failed but continuing...');
      return false;
    }
    console.error(`\nCommand failed with error code: ${error.status}`);
    process.exit(1);
  }
}

// Helper function to ensure a directory exists
function ensureDirectoryExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
}

// Helper function to check if resource exists, create a placeholder if not
function ensureResourceExists(resourcePath) {
  if (!fs.existsSync(resourcePath)) {
    console.log(`Creating placeholder for: ${path.basename(resourcePath)}`);
    
    // Create an empty file as a placeholder
    fs.writeFileSync(resourcePath, '');
    
    console.warn(`⚠️  Warning: ${path.basename(resourcePath)} is just a placeholder. Replace with actual content.`);
    return false;
  }
  return true;
}

// Clean the dist directory
function cleanDist() {
  console.log('\n🧹 Cleaning dist directory...');
  runCommand('npm run clean');
  ensureDirectoryExists(DIST_DIR);
}

// Build the app
function buildApp(isProd) {
  console.log(`\n🔨 Building app in ${isProd ? 'production' : 'development'} mode...`);
  runCommand(isProd ? 'npm run pack-p' : 'npm run pack');
}

// Copy resources to dist
function copyResources() {
  console.log('\n📦 Copying resources to dist...');
  
  // Copy appinfo.json
  const appinfoPath = path.join(WEBOS_META_DIR, 'appinfo.json');
  if (fs.existsSync(appinfoPath)) {
    fs.copyFileSync(appinfoPath, path.join(DIST_DIR, 'appinfo.json'));
    console.log('✅ Copied appinfo.json');
  } else {
    console.error('❌ appinfo.json not found!');
    process.exit(1);
  }
  
  // Copy resource files
  ensureDirectoryExists(RESOURCES_DIR);
  let missingResources = false;
  
  REQUIRED_RESOURCES.forEach(resource => {
    const sourcePath = path.join(RESOURCES_DIR, resource);
    const destPath = path.join(DIST_DIR, resource);
    
    if (ensureResourceExists(sourcePath)) {
      fs.copyFileSync(sourcePath, destPath);
      console.log(`✅ Copied ${resource}`);
    } else {
      // Copy the placeholder anyway
      fs.copyFileSync(sourcePath, destPath);
      missingResources = true;
    }
  });
  
  if (missingResources) {
    console.warn('\n⚠️  Some resources are placeholders. Replace them with actual content for production.');
  }
}

// Package the app
function packageApp() {
  console.log('\n📱 Packaging app...');
  runCommand('ares-package ./dist');
}

// Install the app to the TV
function installApp(device) {
  const deviceOption = device ? `--device ${device}` : '';
  console.log(`\n📲 Installing app to TV ${device ? `(${device})` : ''}...`);
  runCommand(`ares-install ${deviceOption} ${APP_ID}*.ipk`);
}

// Launch the app on the TV
function launchApp(device) {
  const deviceOption = device ? `--device ${device}` : '';
  console.log(`\n🚀 Launching app on TV ${device ? `(${device})` : ''}...`);
  runCommand(`ares-launch ${deviceOption} ${APP_ID}`);
}

// List available devices
function listDevices() {
  console.log('\n📺 Available devices:');
  runCommand('ares-setup-device --list');
}

// Main menu
function showMainMenu() {
  console.log('\n===== Webcam Viewer Build Tool =====');
  console.log('1) Build (Development)');
  console.log('2) Build (Production)');
  console.log('3) Full Deploy (Development)');
  console.log('4) Full Deploy (Production)');
  console.log('5) List Devices');
  console.log('6) Launch App on TV');
  console.log('7) Create Resources');
  console.log('8) Exit');
  
  rl.question('\nSelect an option: ', (answer) => {
    switch(answer) {
      case '1':
        cleanDist();
        buildApp(false);
        copyResources();
        showMainMenu();
        break;
      case '2':
        cleanDist();
        buildApp(true);
        copyResources();
        showMainMenu();
        break;
      case '3':
        cleanDist();
        buildApp(false);
        copyResources();
        packageApp();
        rl.question('Device name (leave blank for default): ', (device) => {
          installApp(device || '');
          launchApp(device || '');
          showMainMenu();
        });
        break;
      case '4':
        cleanDist();
        buildApp(true);
        copyResources();
        packageApp();
        rl.question('Device name (leave blank for default): ', (device) => {
          installApp(device || '');
          launchApp(device || '');
          showMainMenu();
        });
        break;
      case '5':
        listDevices();
        showMainMenu();
        break;
      case '6':
        rl.question('Device name (leave blank for default): ', (device) => {
          launchApp(device || '');
          showMainMenu();
        });
        break;
      case '7':
        ensureDirectoryExists(RESOURCES_DIR);
        REQUIRED_RESOURCES.forEach(resource => {
          ensureResourceExists(path.join(RESOURCES_DIR, resource));
        });
        showMainMenu();
        break;
      case '8':
        console.log('Exiting...');
        rl.close();
        break;
      default:
        console.log('Invalid option, please try again.');
        showMainMenu();
        break;
    }
  });
}

// Start the tool
console.log(`
╔══════════════════════════════════════╗
║                                      ║
║      WEBCAM VIEWER DEPLOY TOOL       ║
║                                      ║
║  App ID: ${APP_ID}    ║
║  Version: ${APP_VERSION}                       ║
║                                      ║
╚══════════════════════════════════════╝
`);

// Check if running with command line arguments
const args = process.argv.slice(2);
if (args.length > 0) {
  // Command line mode
  const command = args[0];
  const isProd = args.includes('--prod') || args.includes('-p');
  const device = args.find(arg => arg.startsWith('--device='))?.split('=')[1] || '';
  const noLaunch = args.includes('--no-launch');
  
  if (command === 'build') {
    cleanDist();
    buildApp(isProd);
    copyResources();
  } else if (command === 'package') {
    cleanDist();
    buildApp(isProd);
    copyResources();
    packageApp();
  } else if (command === 'install') {
    packageApp();
    installApp(device);
  } else if (command === 'launch') {
    launchApp(device);
  } else if (command === 'deploy') {
    cleanDist();
    buildApp(isProd);
    copyResources();
    packageApp();
    installApp(device);
    if (!noLaunch) {
      launchApp(device);
    }
  } else if (command === 'devices') {
    listDevices();
  } else {
    console.log(`
Usage: node build.js [command] [options]

Commands:
  build     Build the application
  package   Build and package the application
  install   Package and install the application
  launch    Launch the application on TV
  deploy    Complete build, package, install, and launch
  devices   List available devices

Options:
  --prod, -p         Production build
  --device=<name>    Specify device name
  --no-launch        Don't launch after install
    `);
  }
  
  process.exit(0);
} else {
  // Interactive mode
  showMainMenu();
}