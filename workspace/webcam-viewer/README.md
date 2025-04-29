# Webcam Viewer for LG WebOS TV

This is a WebOS TV application built with Enact and Moonstone UI framework that allows users to view and monitor webcam feeds on their LG Smart TV.

## Features

- View multiple webcam feeds in a grid layout
- Select a webcam to view in full screen mode
- Configure app settings like auto-refresh intervals
- Optimized for remote control navigation on LG WebOS TVs

## Development Setup

This project was bootstrapped with the Enact CLI.

### Prerequisites

- Node.js (v14 or higher recommended)
- npm (v7 or higher recommended)
- LG webOS TV SDK (for testing on TV)

### Installation

1. Clone the repository
2. Install dependencies:

```sh
npm install
```

### Running the App

#### Development Mode

```sh
npm run serve
```

This will start a development server at [http://localhost:8080](http://localhost:8080).

#### Building for Production

```sh
npm run pack-p
```

This creates a production build in the `dist` directory.

### Deploying to LG WebOS TV

To package the app for WebOS:

```sh
npm run package
```

To install on a connected WebOS device:

```sh
npm run install-app
```

To launch the app on a connected WebOS device:

```sh
npm run launch-app
```

## Project Structure

- `src/App` - Main application component 
- `src/components/WebcamFeed` - Component for displaying individual webcam streams
- `src/components/GridView` - Component for displaying multiple webcams in a grid layout
- `src/components/SettingsPanel` - Component for app settings
- `src/views/MainPanel` - Main application panel
- `webos-meta/appinfo.json` - WebOS application configuration
