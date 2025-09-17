import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: ['.md'],
			highlight: false
		})
	],
	kit: {
		adapter: adapter(),
		prerender: {
			entries: [
				'/',
				'/about',
				'/contact',
				'/projects',
				'/post/hello-world',
				'/post/second-post',
				'/post/typescript-tips',
				'/post/web-performance',
				'/post/svelte-state-management',
				'/post/css-grid-layouts',
				'/p/1',
				'/p/2'
			]
		}
	},
	extensions: ['.svelte', '.svx', '.md']
};

export default config;
