export interface Page {
	title: string;
	summary: string;
	content: any; // Svelte component
	slug: string;
}

export interface PageMeta {
	title: string;
	summary: string;
}

export async function getPages(): Promise<Page[]> {
	const modules = import.meta.glob('/src/content/pages/*.md');
	const pages: Page[] = [];

	for (const path in modules) {
		const mod = (await modules[path]()) as any;
		const slug = path.replace('/src/content/pages/', '').replace('.md', '');

		if (mod.metadata) {
			const page: Page = {
				...mod.metadata,
				slug,
				content: mod.default
			};

			pages.push(page);
		}
	}

	return pages.sort((a, b) => a.title.localeCompare(b.title));
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