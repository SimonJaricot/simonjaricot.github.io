<script lang="ts">
	import Image from '$lib/components/Image.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const { posts, currentPage, totalPages, hasNextPage, hasPrevPage, totalPosts } = data;
</script>

<svelte:head>
	<title>My Blog - Latest Posts</title>
	<meta
		name="description"
		content="Welcome to my blog. Read the latest posts about web development, programming, and technology."
	/>
</svelte:head>

<div class="max-w-4xl">
	<header class="mb-12">
		<h1 class="mb-4 text-4xl font-bold text-stone-900">Welcome to My Blog</h1>
		<p class="text-xl text-stone-600">
			Discover insights about web development, programming, and technology through my latest posts.
		</p>
	</header>

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
							/>
						</div>
					{/if}
					<header class="mb-4">
						<h2 class="mb-2 text-3xl font-semibold">
							<a
								href="/post/{post.slug}"
								class="text-stone-900 transition-colors duration-200 hover:text-blue-700"
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
		<nav class="flex items-center justify-between border-t border-stone-200 pt-6">
			<div class="flex items-center">
				{#if hasPrevPage}
					<a
						href="/p/{currentPage - 1}"
						class="inline-flex items-center rounded-md border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 transition-colors duration-200 hover:border-stone-400 hover:text-stone-900"
					>
						← Previous
					</a>
				{:else}
					<span
						class="inline-flex cursor-not-allowed items-center rounded-md border border-stone-200 px-4 py-2 text-sm font-medium text-stone-400"
					>
						← Previous
					</span>
				{/if}
			</div>

			<div class="flex items-center space-x-2">
				{#each Array(totalPages) as _, i}
					{@const pageNum = i + 1}
					{#if pageNum === currentPage}
						<span
							class="inline-flex items-center rounded-md border border-blue-500 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700"
						>
							{pageNum}
						</span>
					{:else if pageNum === 1 || pageNum === totalPages || (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)}
						<a
							href={pageNum === 1 ? '/' : `/p/${pageNum}`}
							class="inline-flex items-center rounded-md border border-stone-300 px-3 py-2 text-sm font-medium text-stone-700 transition-colors duration-200 hover:border-stone-400 hover:text-stone-900"
						>
							{pageNum}
						</a>
					{:else if pageNum === currentPage - 2 || pageNum === currentPage + 2}
						<span class="inline-flex items-center px-2 py-2 text-sm font-medium text-stone-500">
							…
						</span>
					{/if}
				{/each}
			</div>

			<div class="flex items-center">
				{#if hasNextPage}
					<a
						href="/p/{currentPage + 1}"
						class="inline-flex items-center rounded-md border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 transition-colors duration-200 hover:border-stone-400 hover:text-stone-900"
					>
						Next →
					</a>
				{:else}
					<span
						class="inline-flex cursor-not-allowed items-center rounded-md border border-stone-200 px-4 py-2 text-sm font-medium text-stone-400"
					>
						Next →
					</span>
				{/if}
			</div>
		</nav>
	{:else}
		<div class="py-12 text-center">
			<p class="text-lg text-stone-500">No posts found.</p>
		</div>
	{/if}
</div>
