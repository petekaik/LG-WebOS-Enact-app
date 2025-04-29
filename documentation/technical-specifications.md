


# Technical Specifications for Automated Application Development

## Target Device
- **Device**: LG OLED65C8
- **Resolution**: 4K UHD (3840 × 2160)
- **Operating System**: webOS 4.4.3-20 (goldilocks-gorongosa)
- **Web Engine**: Chromium 53

## Development Environment
- **IDE**: Visual Studio Code (VSCode)
  - Recommended extensions: 
    - webOS TV SDK Extension
    - GitHub Copilot (Agent Mode enabled)
    - ESLint
    - Prettier
- **Source Control**: Git (with GitHub repository integration)

## Frameworks and Libraries
- **Application Framework**: Enact Framework v1.13
- **UI Library**: @enact/moonstone
- **JavaScript Compatibility**: ES5 (due to Chromium 53 engine constraints)

## Runtime Environment
- **Node.js**: Recommended version 10.x LTS
  - Compatible with Enact v1.x and ensures tooling stability
  - Includes npm for dependency management
- **Package Manager**: npm (bundled with Node.js)

## Build and Deployment Tools
- **Ares CLI Tools**:
  - `ares-package` — Packages the app into a .ipk file
  - `ares-install` — Installs the .ipk file to the target LG TV
  - `ares-launch` — Launches the app on the TV after installation
  - Installed globally via npm: `npm install -g ares-cli`
  
## Automation
- **Node Scripts**:
  - `npm run build`: Build the project using Enact CLI
  - `npm run package`: Create a .ipk package using ares-package
  - `npm run install`: Install the .ipk to the TV using ares-install
  - `npm run launch`: Launch the app on the TV using ares-launch
  
- **Shell Scripts**:
  - A simple bash script (`deploy.sh`) for streamlined workflow:
    ```bash
    #!/bin/bash
    npm run build
    ares-package ./dist
    ares-install --device tv ./dist/*.ipk
    ares-launch --device tv com.yourdomain.app
    ```
  - This script builds, packages, installs, and launches the app with a single command.

## Best Practices
- Use lightweight components and minimize heavy DOM operations.
- Optimize memory usage to stay well below ~250 MB heap space.
- Test frequently on the real TV device and emulator.
- Focus all interactions on 5-way remote navigation, not mouse input.
- Use Spotlight for focus management.
- Internationalization (i18n) and accessibility (a11y) should be properly integrated.
- Ensure appinfo.json is correctly configured with unique app ID and permissions.
- Always transpile JavaScript code to ES5 to match TV engine compatibility.

## Notes
- Ensure that the TV is in Developer Mode to accept IPK installations.
- Regularly update Enact CLI, webOS CLI tools, and dependencies to maintain compatibility.
- Web-based features relying on newer HTML5/JS APIs should be tested thoroughly due to limited engine support in Chromium 53.