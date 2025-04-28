# LG-WebOS-enact-app
LG WebOS app generated with AI tools

## Mission statement
Experiment goal is to generate a Enact framework app with packaging automation using VSCode and GenAI tools.

## File structure
- **README**: This file
- **documentation**: Folder containing additional documentation (technical specification, user stories, defect log, development log, enhancement ideas, etc.)
- **development**: Folder containing all application development files (source code, additional resources, node, build output, etc.)

ChatGPT research output: 
## Best Practices for LG webOS 4.4.3 App Development

This app is designed to run on LG TVs, specifically the OLED65C8 model with webOS 4.4.3. The following best practices were derived from current development research:

- **Framework Choice**: Use the Enact framework (v1.x) with the Moonstone UI library for maximum compatibility and stability.
- **Web Engine Compatibility**: webOS 4.4.3 uses Chromium 53. All code should be transpiled to ES5 standards using tools like Babel to ensure browser compatibility.
- **Performance Optimization**:
  - Keep memory usage low (target heap usage well below 250 MB).
  - Use virtualized lists (`VirtualList`, `VirtualGridList`) to efficiently render large sets of UI items.
  - Minimize bundle size and avoid unnecessary libraries or heavy DOM operations.
- **Remote Control Navigation**:
  - Prioritize 5-way (up/down/left/right/select) navigation support.
  - Ensure all interactive elements are focusable and accessible using Spotlight focus management.
- **Design Guidelines**:
  - Design for TV screen resolution (1080p) and safe areas.
  - Provide large, easily selectable UI targets suitable for remote control input.
  - Avoid hover states and mouse-dependent interactions.
- **Testing**:
  - Test apps directly on the TV or use the official LG Emulator.
  - Validate app behavior against actual device constraints (memory, CPU, input responsiveness).
- **Deployment**:
  - Use LG's webOS CLI and VSCode Studio extension for packaging and deploying applications.
  - Include accurate `appinfo.json` metadata, including correct UUIDs and permissions.
- **Additional Recommendations**:
  - Leverage Enact’s `@enact/webos` module for system service integration.
  - Follow TV-specific UX principles to ensure a high-quality, reliable user experience.

Adhering to these guidelines ensures optimal performance and user experience on 2018–2019 generation LG TVs.
