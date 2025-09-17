import { getPublishedPosts } from '$lib/posts.js';

export async function load() {
	const allPosts = await getPublishedPosts();
	const recentPosts = allPosts.slice(0, 5);

	return {
		posts: recentPosts
	};
}
