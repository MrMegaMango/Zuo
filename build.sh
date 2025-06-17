#!/bin/bash
curl -L https://github.com/gohugoio/hugo/releases/download/v0.144.2/hugo_extended_0.144.2_Linux-64bit.tar.gz | tar -xz
mv hugo /usr/local/bin/

# Build Hugo site only (temporarily disable SvelteKit)
cd site
hugo --gc --minify

# Create Vercel output structure for static deployment
mkdir -p ../.vercel/output/static

# Copy Hugo output (root site)
cp -r public/* ../.vercel/output/static/

# Create minimal Vercel config for static deployment
cat > ../.vercel/output/config.json << 'EOF'
{
  "version": 3
}
EOF