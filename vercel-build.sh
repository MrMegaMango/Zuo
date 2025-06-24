#!/bin/bash
set -e

# Download and install Hugo
curl -L https://github.com/gohugoio/hugo/releases/download/v0.144.2/hugo_extended_0.144.2_Linux-64bit.tar.gz | tar -xz
mv hugo /usr/local/bin/

# Build SvelteKit app
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

# Build Hugo site
cd ../site
hugo --gc --minify