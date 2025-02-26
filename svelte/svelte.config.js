import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess(),

    kit: {
        adapter: adapter({
            fallback: 'index.html'
        }),
        paths: {
            base: '/app'
        },
        prerender: {
            handleHttpError: ({ path, referrer, message }) => {
                // Ignore specific errors related to base path
                if (message.includes('does not begin with `base`')) {
                    return;
                }
                // Throw other errors
                throw new Error(message);
            }
        }
    }
};

export default config;
