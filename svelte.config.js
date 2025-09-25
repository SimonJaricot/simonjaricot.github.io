import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';
import urls from 'rehype-urls';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { visit } from 'unist-util-visit';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

/**
 * Rehype plugin to transform img elements to use our enhanced Image component
 */
function transformImages() {
  return function (tree) {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'img') {
        // Transform img element to use our Image component
        node.tagName = 'Image';
        
        // Ensure we have the required props
        if (!node.properties) {
          node.properties = {};
        }
        
        // Map HTML img attributes to our Image component props
        const { src, alt, title, class: className, ...otherProps } = node.properties;
        
        // Use alt text as caption if it exists and is meaningful
        // Skip empty alt text or generic descriptions
        const caption = alt && alt.trim() && alt.trim() !== '' ? alt.trim() : (title || '');
        
        node.properties = {
          src: src || '',
          alt: alt || '',
          // Include caption if we have meaningful text
          ...(caption ? { caption } : {}),
          // Only include class if it has a value, otherwise omit it to use defaults
          ...(className ? { class: className } : {}),
          ...otherProps
        };
      }
    });
  };
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
      layout: resolve(__dirname, 'src/lib/mdsvex.svelte'),
      rehypePlugins: [
        [urls, processUrl],
        transformImages
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
  },
  extensions: ['.svelte', '.svx', '.md']
};

export default config;
