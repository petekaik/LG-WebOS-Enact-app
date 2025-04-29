#!/bin/bash
# WebcamViewer LG WebOS Deployment Script

# Print header
echo "======================================="
echo "  WebcamViewer Deployment Script"
echo "======================================="

# Parse arguments
MODE="dev"
LAUNCH=true
CLEAN=false

while [[ "$#" -gt 0 ]]; do
    case $1 in
        --prod|-p) MODE="prod" ;;
        --no-launch) LAUNCH=false ;;
        --clean|-c) CLEAN=true ;;
        --help|-h) 
            echo "Usage: ./deploy.sh [options]"
            echo "Options:"
            echo "  --prod, -p       Build in production mode"
            echo "  --no-launch      Don't launch the app after installation"
            echo "  --clean, -c      Clean the build before packaging" 
            echo "  --help, -h       Show this help message"
            exit 0
            ;;
        *) echo "Unknown option: $1"; exit 1 ;;
    esac
    shift
done

# Step 1: Clean if requested
if [ "$CLEAN" = true ]; then
    echo "[1/5] Cleaning previous build..."
    npm run clean
else
    echo "[1/5] Skipping clean step..."
fi

# Step 2: Build the app
echo "[2/5] Building app in $MODE mode..."
if [ "$MODE" = "prod" ]; then
    npm run pack-p
else
    npm run pack
fi

# Check if build was successful
if [ $? -ne 0 ]; then
    echo "❌ Build failed. Aborting deployment."
    exit 1
fi

# Step 3: Ensure app icons are copied to the dist directory
echo "[3/5] Copying app resources..."
mkdir -p dist
cp -v webos-meta/appinfo.json dist/
cp -v resources/*.png dist/ 2>/dev/null || echo "No PNG resources to copy"

# Step 4: Package the app
echo "[4/5] Packaging app..."
ares-package ./dist

# Check if packaging was successful
if [ $? -ne 0 ]; then
    echo "❌ Packaging failed. Aborting deployment."
    exit 1
fi

# Step 5: Install the app
echo "[5/5] Installing app to TV..."
ares-install --device tv com.morgeweb.webcamviewer*.ipk

# Check if installation was successful
if [ $? -ne 0 ]; then
    echo "❌ Installation failed."
    exit 1
fi

# Step 6: Launch the app if requested
if [ "$LAUNCH" = true ]; then
    echo "[6/5] Launching app on TV..."
    ares-launch --device tv com.morgeweb.webcamviewer
    
    if [ $? -ne 0 ]; then
        echo "❌ App launch failed."
        exit 1
    fi
else
    echo "[6/5] Skipping app launch as requested."
fi

echo "✅ Deployment completed successfully!"