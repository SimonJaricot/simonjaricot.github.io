<script lang="ts">
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
		<h1 class="mb-4 text-4xl font-bold text-gray-900">Welcome to My Blog</h1>
		<p class="text-xl text-gray-600">
			Discover insights about web development, programming, and technology through my latest posts.
		</p>
	</header>

	{#if posts.length > 0}
		<div class="mb-12 space-y-8">
			{#each posts as post}
				<article class="border-b border-gray-200 pb-8 last:border-b-0">
					{#if post.cover}
						<div class="mb-4">
							<img
								src={post.cover}
								alt={post.title}
								class="aspect-video w-full rounded-lg object-cover"
							/>
						</div>
					{/if}
					<header class="mb-4">
						<h2 class="mb-2 text-xl font-semibold">
							<a
								href="/post/{post.slug}"
								class="text-gray-900 transition-colors duration-200 hover:text-blue-600"
							>
								{post.title}
							</a>
						</h2>
						<time class="text-sm text-gray-500" datetime={post.date}>
							{new Date(post.date).toLocaleDateString('en-US', {
								year: 'numeric',
								month: 'long',
								day: 'numeric'
							})}
						</time>
					</header>

					<p class="mb-4 text-gray-700">{post.summary}</p>

					<a
						href="/post/{post.slug}"
						class="inline-flex items-center font-medium text-blue-600 transition-colors duration-200 hover:text-blue-800"
					>
						Read more →
					</a>
				</article>
			{/each}
		</div>

		<!-- Pagination -->
		<nav class="flex items-center justify-between border-t border-gray-200 pt-6">
			<div class="flex items-center">
				{#if hasPrevPage}
					<a
						href="/p/{currentPage - 1}"
						class="inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 hover:border-gray-400 hover:text-gray-900"
					>
						← Previous
					</a>
				{:else}
					<span
						class="inline-flex cursor-not-allowed items-center rounded-md border border-gray-200 px-4 py-2 text-sm font-medium text-gray-400"
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
							class="inline-flex items-center rounded-md border border-blue-500 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600"
						>
							{pageNum}
						</span>
					{:else if pageNum === 1 || pageNum === totalPages || (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)}
						<a
							href={pageNum === 1 ? '/' : `/p/${pageNum}`}
							class="inline-flex items-center rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 hover:border-gray-400 hover:text-gray-900"
						>
							{pageNum}
						</a>
					{:else if pageNum === currentPage - 2 || pageNum === currentPage + 2}
						<span class="inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500">
							…
						</span>
					{/if}
				{/each}
			</div>

			<div class="flex items-center">
				{#if hasNextPage}
					<a
						href="/p/{currentPage + 1}"
						class="inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 hover:border-gray-400 hover:text-gray-900"
					>
						Next →
					</a>
				{:else}
					<span
						class="inline-flex cursor-not-allowed items-center rounded-md border border-gray-200 px-4 py-2 text-sm font-medium text-gray-400"
					>
						Next →
					</span>
				{/if}
			</div>
		</nav>
	{:else}
		<div class="py-12 text-center">
			<p class="text-lg text-gray-500">No posts found.</p>
		</div>
	{/if}
</div>
