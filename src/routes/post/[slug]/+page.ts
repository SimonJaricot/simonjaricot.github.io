import { error } from '@sveltejs/kit';
import { getPost, getAdjacentPosts } from '$lib/posts.ts';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, depends }) => {
	// Add explicit dependency tracking to ensure the loader re-runs
	// when navigating between posts
	depends(`post:${params.slug}`);

	const post = await getPost(params.slug);

	if (!post || !post.published) {
		error(404, 'Post not found');
	}

	// Get adjacent posts for navigation
	const { previousPost, nextPost } = await getAdjacentPosts(params.slug);

	return {
		post,
		previousPost,
		nextPost,
		// Add the current slug to help with reactivity
		slug: params.slug
	};
};

export const prerender = true;
