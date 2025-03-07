import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter({
      pages: '../site/static/app',
      assets: '../site/static/app',
      fallback: 'index.html',
      precompress: false
    }),
    paths: {
      base: '/app',
      relative: false
    }
  }
};

export default config;







