<script lang="ts">
	import Image from '$lib/components/Image.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const { post } = data;
</script>

<svelte:head>
	<title>{post.title} - simon's blog</title>
	<meta name="description" content={post.summary} />
	<meta property="og:title" content={post.title} />
	<meta property="og:description" content={post.summary} />
	<meta property="og:type" content="article" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={post.title} />
	<meta name="twitter:description" content={post.summary} />
</svelte:head>

<article class="max-w-4xl">
	<header class="mb-8 border-b border-stone-200 pb-6">
		{#if post.cover}
			<div class="mb-6">
				<Image
					src={post.cover}
					alt={post.title}
					class="aspect-video w-full rounded-lg object-cover"
					sizes="(max-width: 768px) 100vw, 1200px"
				/>
			</div>
		{/if}
		<h1 class="text-4xl font-bold text-stone-900">{post.title}</h1>
		<div class="flex items-center text-stone-600">
			<time datetime={post.date} class="text-sm">
				{new Date(post.date).toLocaleDateString('en-US', {
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				})}
			</time>
		</div>
		<p class="mt-4 text-stone-700">{post.summary}</p>
	</header>

	<div class="prose max-w-none">
		<post.content />
	</div>

	<footer class="mt-12 border-t border-stone-200 pt-6">
		<nav class="flex items-center justify-between">
			<a
				href="/"
				class="inline-flex items-center font-medium text-blue-700 transition-colors duration-200 hover:text-blue-900"
			>
				← Back to Home
			</a>
			<a
				href="/p/1"
				class="inline-flex items-center font-medium text-blue-700 transition-colors duration-200 hover:text-blue-900"
			>
				All Posts →
			</a>
		</nav>
	</footer>
</article>
