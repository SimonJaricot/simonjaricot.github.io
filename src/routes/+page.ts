import { getPublishedPosts, paginatePosts } from '$lib/posts.js';

export async function load() {
	const allPosts = await getPublishedPosts();
	const paginatedData = paginatePosts(allPosts, 1, 5);

	return {
		...paginatedData,
		totalPosts: allPosts.length
	};
}
