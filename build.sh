#!/bin/bash
set -e

# Default to development mode
MODE=${1:-dev}

# Clean previous builds
rm -rf svelte/build
rm -rf site/static/app

# Build Svelte app
cd svelte
npm install
npm run build

# Copy SvelteKit output to Hugo static directory
mkdir -p ../site/static/app

# Copy client assets
cp -r .svelte-kit/output/client/* ../site/static/app/

# Copy prerendered HTML files
find .svelte-kit/output/prerendered/pages -name '*.html' | while read file; do
    relpath=$(realpath --relative-to=.svelte-kit/output/prerendered/pages "$file")
    mkdir -p "../site/static/app/$(dirname "$relpath")"
    cp "$file" "../site/static/app/$relpath"
done

# Build Hugo site based on mode
cd ../site
if [ "$MODE" = "prod" ]; then
    echo "Building for production..."
    hugo --gc --minify
else
    echo "Starting development server..."
    hugo server
fi 