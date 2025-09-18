import { error } from '@sveltejs/kit';
import { getPost } from '$lib/posts.js';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const post = await getPost(params.slug);

	if (!post || !post.published) {
		error(404, 'Post not found');
	}

	return {
		post
	};
};

export const prerender = true;
