#!/bin/bash
curl -L https://github.com/gohugoio/hugo/releases/download/v0.144.2/hugo_extended_0.144.2_Linux-64bit.tar.gz | tar -xz
mv hugo /usr/local/bin/

# Build SvelteKit app first (generates Vercel functions + static files)
cd svelte
npm run build
cd ..

# Build Hugo site
cd site
hugo --gc --minify
cd ..

# Ensure Vercel output directory exists
mkdir -p .vercel/output/static

# Copy Hugo output to Vercel static directory (root site)
cp -r site/public/* .vercel/output/static/

# Verify the build output structure
echo "Build completed successfully!"
echo "Vercel output structure:"
ls -la .vercel/output/
echo "Static files:"
ls -la .vercel/output/static/ | head -10