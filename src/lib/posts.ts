export interface Post {
	title: string;
	summary: string;
	content: any; // Svelte component
	date: string;
	published: boolean;
	slug: string;
}

export interface PostMeta {
	title: string;
	summary: string;
	date: string;
	published: boolean;
}

export async function getPosts(): Promise<Post[]> {
	const modules = import.meta.glob('/src/content/posts/*.md');
	const posts: Post[] = [];

	for (const path in modules) {
		const mod = (await modules[path]()) as any;
		const slug = path.replace('/src/content/posts/', '').replace('.md', '');

		if (mod.metadata) {
			const post: Post = {
				...mod.metadata,
				slug,
				content: '' // We'll load content separately when needed
			};

			posts.push(post);
		}
	}

	return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPost(slug: string): Promise<Post | null> {
	try {
		const post = await import(`../content/posts/${slug}.md`);
		return {
			...post.metadata,
			slug,
			content: post.default
		};
	} catch (error) {
		console.error('Error loading post:', slug, error);
		return null;
	}
}

export async function getPublishedPosts(): Promise<Post[]> {
	const posts = await getPosts();
	return posts.filter((post) => post.published);
}

export function paginatePosts(posts: Post[], page: number, perPage: number = 5) {
	const start = (page - 1) * perPage;
	const end = start + perPage;

	return {
		posts: posts.slice(start, end),
		totalPages: Math.ceil(posts.length / perPage),
		currentPage: page,
		hasNextPage: end < posts.length,
		hasPrevPage: page > 1
	};
}
