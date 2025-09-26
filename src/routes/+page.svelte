<script lang="ts">
	import Pagination from '$lib/components/Pagination.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const { posts, currentPage, totalPages } = data;
</script>

<svelte:head>
	<title>simon's blog</title>
	<meta
		name="description"
		content="Some tips and tricks on just about anything useless, thus indispensable."
	/>
</svelte:head>

<div class="max-w-4xl">
	<header class="mb-12">
		<p class="text-stone-600">
			Some tips and tricks on just about anything useless, thus indispensable.
		</p>
	</header>

	{#if posts.length > 0}
		<div class="mb-12 space-y-8">
			{#each posts as post}
				<article class="border-b border-stone-200 pb-8 last:border-b-0">
					<header class="mb-4">
						<h2 class="mb-2 text-6xl font-semibold">
							<a
								href="/post/{post.slug}"
								class="text-stone-900 transition-colors duration-200 hover:text-blue-700"
							>
								{post.title}
							</a>
						</h2>
						<time class="text-sm text-stone-500" datetime={post.date}>
							{post.date}
						</time>
					</header>
					<p class="mb-4 text-stone-700">{post.summary}</p>

					<a
						href="/post/{post.slug}"
						class="inline-flex items-center text-blue-700 transition-colors duration-200 hover:text-blue-900"
					>
						read more
					</a>
				</article>
			{/each}
		</div>

		<!-- Pagination -->
		<Pagination {currentPage} {totalPages} basePath="/p" firstPagePath="/" />
	{:else}
		<div class="py-12 text-center">
			<p class="text-lg text-stone-500">No posts found.</p>
		</div>
	{/if}
</div>
