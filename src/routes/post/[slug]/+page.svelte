<script lang="ts">
	import Image from '$lib/components/Image.svelte';
	import PostNavigation from '$lib/components/PostNavigation.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// Make these reactive to data changes using Svelte 5 derived
	const post = $derived(data.post);
	const previousPost = $derived(data.previousPost);
	const nextPost = $derived(data.nextPost);
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
		<h1 class="text-6xl font-bold text-stone-900">{post.title}</h1>
		<div class="flex items-center text-stone-600">
			<time datetime={post.date} class="text-sm">
				{post.date}
			</time>
		</div>
		<p class="my-4 text-stone-700">{post.summary}</p>
	</header>

	<div class="prose max-w-none">
		<post.content />
	</div>

	<footer class="mt-12">
		<PostNavigation {previousPost} {nextPost} />
	</footer>
</article>
