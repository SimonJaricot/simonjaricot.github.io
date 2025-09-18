import { error } from '@sveltejs/kit';
import { getPublishedPosts, paginatePosts } from '$lib/posts.js';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const page = parseInt(params.page);

	if (isNaN(page) || page < 1) {
		error(404, 'Page not found');
	}

	const allPosts = await getPublishedPosts();
	const paginatedData = paginatePosts(allPosts, page, 5);

	if (page > paginatedData.totalPages && paginatedData.totalPages > 0) {
		error(404, 'Page not found');
	}

	return {
		...paginatedData,
		totalPosts: allPosts.length
	};
};

export const prerender = true;
