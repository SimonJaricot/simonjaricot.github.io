export interface Page {
	title: string;
	description: string;
	content: any; // Svelte component
	slug: string;
}

export interface PageMeta {
	title: string;
	description: string;
}

export async function getPage(slug: string): Promise<Page | null> {
	try {
		const page = await import(`../content/pages/${slug}.md`);
		return {
			...page.metadata,
			slug,
			content: page.default
		};
	} catch (error) {
		console.error('Error loading page:', slug, error);
		return null;
	}
}