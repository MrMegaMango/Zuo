import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter({
      pages: '../.vercel/output/static/app',
      assets: '../.vercel/output/static/app',
      fallback: undefined,
      precompress: false,
      strict: true
    }),
    paths: {
      base: '/app',
      relative: false
    },
    prerender: {
      handleHttpError: 'warn',
      handleMissingId: 'warn',
      entries: ['*']
    }
  }
};

export default config;







