import { getPages } from '$lib/pages.js';

export async function load() {
	const pages = await getPages();
	
	return {
		pages
	};
}

export const prerender = true;
