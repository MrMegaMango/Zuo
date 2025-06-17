#!/bin/bash
curl -L https://github.com/gohugoio/hugo/releases/download/v0.144.2/hugo_extended_0.144.2_Linux-64bit.tar.gz | tar -xz
mv hugo /usr/local/bin/
cd svelte
npm install
npm run build
# Move the Vercel output to the root
mkdir -p ../.vercel/output
cp -r .vercel/output/* ../.vercel/output/
cd ../site
hugo --gc --minify
# Copy Hugo output to static directory in Vercel output
mkdir -p ../.vercel/output/static
cp -r public/* ../.vercel/output/static/