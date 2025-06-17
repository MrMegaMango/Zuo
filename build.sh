#!/bin/bash
curl -L https://github.com/gohugoio/hugo/releases/download/v0.144.2/hugo_extended_0.144.2_Linux-64bit.tar.gz | tar -xz
mv hugo /usr/local/bin/

# Build SvelteKit app as static
cd svelte
npm install
# Clean build cache to ensure fresh build
rm -rf .svelte-kit build .vercel
npm run build

# Build Hugo site
cd ../site
hugo --gc --minify

# Create Vercel output structure
mkdir -p ../.vercel/output/static

# Copy Hugo output (root site)
cp -r public/* ../.vercel/output/static/

# Copy SvelteKit output to /app path
mkdir -p ../.vercel/output/static/app
cp -r ../svelte/build/* ../.vercel/output/static/app/

# Create Vercel config for static deployment
cat > ../.vercel/output/config.json << 'EOF'
{
  "version": 3,
  "routes": [
    {
      "src": "/app/(.*)",
      "dest": "/app/$1"
    },
    {
      "src": "/app",
      "dest": "/app/index.html"
    },
    {
      "handle": "filesystem"
    }
  ]
}
EOF