#!/bin/bash
curl -L https://github.com/gohugoio/hugo/releases/download/v0.144.2/hugo_extended_0.144.2_Linux-64bit.tar.gz | tar -xz
mv hugo /usr/local/bin/

# Build SvelteKit app first (static output)
cd svelte
npm run build
cd ..

# Build Hugo site
cd site
hugo --gc --minify
cd ..

# Create Vercel output structure 
mkdir -p .vercel/output/static

# Copy Hugo output (root site)
cp -r site/public/* .vercel/output/static/

# SvelteKit static files are already in the correct location
# (.vercel/output/static/app) due to adapter configuration

# Create minimal Vercel config for static deployment
cat > .vercel/output/config.json << 'EOF'
{
  "version": 3
}
EOF