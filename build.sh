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

# Copy the client assets (JS, CSS, etc.)
if [ -d ".svelte-kit/output/client" ]; then
    cp -r .svelte-kit/output/client/* ../site/static/app/
fi

# Copy prerendered HTML files to the app directory
if [ -d ".svelte-kit/output/prerendered/pages" ]; then
    # Copy index.html to the app root
    if [ -f ".svelte-kit/output/prerendered/pages/index.html" ]; then
        cp .svelte-kit/output/prerendered/pages/index.html ../site/static/app/
    fi
    
    # Copy other pages (about.html, world-map.html, etc.)
    find .svelte-kit/output/prerendered/pages -name "*.html" -not -name "index.html" | while read file; do
        # Get relative path from pages directory
        relpath=$(realpath --relative-to=.svelte-kit/output/prerendered/pages "$file")
        # Create directory structure if needed
        mkdir -p "../site/static/app/$(dirname "$relpath")"
        # Copy the file
        cp "$file" "../site/static/app/$relpath"
    done
fi

# Build Hugo site
cd ../site
hugo server 