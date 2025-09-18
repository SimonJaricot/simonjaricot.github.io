import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';
import urls from 'rehype-urls';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

function processUrl(url, node) {
  if (node.tagName === "a") {
    node.properties.class = "text-link"

    if (!url.href.startsWith("/")) {
      // Open external links in new tab
      node.properties.target = "_blank"
      // Fix a security concern with offsite links
      // See: https://web.dev/external-anchors-use-rel-noopener/
      node.properties.rel = "noopener"
    }
  }
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://svelte.dev/docs/kit/integrations
  // for more information about preprocessors
  preprocess: [
    vitePreprocess(),
    mdsvex({
      extensions: ['.md'],
      highlight: false,
      rehypePlugins: [
        [urls, processUrl]
      ],
    })
  ],
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: undefined,
      precompress: false,
      strict: true,
    }),
    // prerender: {
    //   entries: [
    //     '/',
    //     '/about',
    //     '/post/hello-world',
    //     '/post/second-post',
    //     '/post/typescript-tips',
    //     '/post/web-performance',
    //     '/post/svelte-state-management',
    //     '/post/css-grid-layouts',
    //     '/p/1',
    //     '/p/2'
    //   ]
    // }
  },
  extensions: ['.svelte', '.svx', '.md']
};

export default config;
