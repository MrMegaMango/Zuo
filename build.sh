#!/bin/bash

# Clean previous builds
rm -rf svelte/build
rm -rf site/static/app

# Build Svelte app
cd svelte
npm install
npm run build

# Create the app directory in Hugo's static folder if it doesn't exist
mkdir -p ../site/static/app

# Copy the built Svelte app to Hugo's static directory
cp -r build/client/* ../site/static/app/

# Build Hugo site
cd ../site
hugo server 