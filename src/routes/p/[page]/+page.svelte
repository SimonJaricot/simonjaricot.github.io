<script lang="ts">
	import Image from '$lib/components/Image.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const { posts, currentPage, totalPages, hasNextPage, hasPrevPage, totalPosts } = data;
</script>

<svelte:head>
	<title>blog posts - page {currentPage} - simon's blog</title>
	<meta
		name="description"
		content="Browse all blog posts about web development, programming, and technology. Page {currentPage} of {totalPages}."
	/>
</svelte:head>

<div class="max-w-4xl">
	{#if posts.length > 0}
		<div class="mb-12 space-y-8">
			{#each posts as post}
				<article class="border-b border-stone-200 pb-8 last:border-b-0">
					{#if post.cover}
						<div class="mb-4">
							<Image
								src={post.cover}
								alt={post.title}
								class="aspect-video w-full rounded-lg object-cover"
								sizes="(max-width: 768px) 100vw, 1200px"
								caption={post.coverCaption}
							/>
						</div>
					{/if}
					<header class="mb-4">
						<h2 class="mb-2 text-xl font-semibold">
							<a
								href="/post/{post.slug}"
								class="text-stone-900 transition-colors duration-200 hover:text-blue-900"
							>
								{post.title}
							</a>
						</h2>
						<time class="text-sm text-stone-500" datetime={post.date}>
							{new Date(post.date).toLocaleDateString('en-US', {
								year: 'numeric',
								month: 'long',
								day: 'numeric'
							})}
						</time>
					</header>

					<p class="mb-4 text-stone-700">{post.summary}</p>

					<a
						href="/post/{post.slug}"
						class="inline-flex items-center font-medium text-blue-700 transition-colors duration-200 hover:text-blue-900"
					>
						Read more →
					</a>
				</article>
			{/each}
		</div>

		<!-- Pagination -->
		<Pagination {currentPage} {totalPages} basePath="/p" firstPagePath="/" />
	{:else}
		<div class="py-12 text-center">
			<p class="text-lg text-stone-500">No posts found.</p>
			<a
				href="/"
				class="mt-4 inline-flex items-center font-medium text-blue-700 transition-colors duration-200 hover:text-blue-900"
			>
				← Back to Home
			</a>
		</div>
	{/if}
</div>
