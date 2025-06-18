import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter({
      split: false,
      runtime: 'nodejs20.x'
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







