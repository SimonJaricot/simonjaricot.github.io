import { error } from '@sveltejs/kit';
import { getPage } from '$lib/pages.js';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const page = await getPage(params.slug);

	if (!page) {
		error(404, 'Page not found');
	}

	return {
		page
	};
};

export const prerender = true;