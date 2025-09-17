import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
  if (params.slug === 'hello-world') {
    return {
      title: 'Hello World',
      content: 'Welcome to my blog!'
    };
  }

  error(404, 'Post not found');
};

export const prerender = true;
