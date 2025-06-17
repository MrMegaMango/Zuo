#!/bin/bash
curl -L https://github.com/gohugoio/hugo/releases/download/v0.144.2/hugo_extended_0.144.2_Linux-64bit.tar.gz | tar -xz
mv hugo /usr/local/bin/
cd svelte
npm install
npm run build
cd ../site
hugo --gc --minify
cp -r ../svelte/.svelte-kit/output/server/. ../api/ 