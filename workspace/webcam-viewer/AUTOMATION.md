# Webcam Viewer Automation System

This document explains the automation system for building, packaging, and deploying the Webcam Viewer app to LG WebOS TVs.

## System Overview

Our automation is built on three components working together:

1. **package.json scripts** - Simple entry points to automation commands
2. **build.js** - Main automation tool with CLI and interactive interfaces
3. **deploy.sh** - Legacy bash script (deprecated; use build.js instead)

## Role Separation

To ensure simplicity and avoid duplicate functionality, each component has a specific role:

### package.json

The package.json file contains npm script aliases that serve as simple entry points to our build.js tool. These aliases provide convenient names for common operations:

```bash
# Build commands
npm run build           # Development build
npm run build:prod      # Production build

# Deployment commands
npm run deploy          # Deploy development build to TV
npm run deploy:prod     # Deploy production build to TV
npm run package         # Just package the app
npm run install-tv      # Just install the packaged app
npm run launch-tv       # Just launch the app on TV

# Utilities
npm run devices         # List configured devices
```

### build.js

The build.js script is our primary automation tool. It provides:

1. Interactive menu-based usage
2. Command-line interface for CI/CD pipelines
3. Comprehensive resource management and validation
4. TV device management integration

#### CLI Usage:

```bash
# Basic commands
node build.js build              # Build the app (development)
node build.js build --prod       # Build the app (production)
node build.js deploy             # Build, package, install, launch
node build.js package            # Build and package only
node build.js install            # Install to TV
node build.js launch             # Launch on TV
node build.js devices            # List configured devices

# Options
--prod                          # Production mode
--device=<name>                 # Target specific device
--no-launch                     # Skip auto-launch
```

#### Interactive Usage:

Simply run `node build.js` without arguments for an interactive menu.

### deploy.sh (Deprecated)

The deploy.sh script is maintained for backward compatibility but all new development should use build.js instead.

## Best Practices

1. Use npm script aliases for day-to-day development (e.g., `npm run deploy`)
2. Use build.js directly for advanced options (`node build.js deploy --device=emulator`)
3. Use the interactive mode for exploring all available options (`node build.js`)
4. Avoid modifying deploy.sh as it's considered deprecated

## Extending the System

When adding new automation features:

1. Add new functionality to build.js
2. Create simple aliases in package.json
3. Do not add duplicate functionality to deploy.sh