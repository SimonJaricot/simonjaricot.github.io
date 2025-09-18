<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const { post } = data;
</script>

<svelte:head>
	<title>{post.title} - My Blog</title>
	<meta name="description" content={post.summary} />
	<meta property="og:title" content={post.title} />
	<meta property="og:description" content={post.summary} />
	<meta property="og:type" content="article" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={post.title} />
	<meta name="twitter:description" content={post.summary} />
</svelte:head>

<article class="max-w-4xl">
	<header class="mb-8 border-b border-gray-200 pb-6">
		<h1 class="mb-4 text-4xl font-bold text-gray-900">{post.title}</h1>
		<div class="flex items-center text-gray-600">
			<time datetime={post.date} class="text-sm">
				{new Date(post.date).toLocaleDateString('en-US', {
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				})}
			</time>
		</div>
		<p class="mt-4 text-xl text-gray-700">{post.summary}</p>
	</header>

	<div class="prose prose-lg max-w-none">
		<post.content />
	</div>

	<footer class="mt-12 border-t border-gray-200 pt-6">
		<nav class="flex items-center justify-between">
			<a
				href="/"
				class="inline-flex items-center font-medium text-blue-600 transition-colors duration-200 hover:text-blue-800"
			>
				← Back to Home
			</a>
			<a
				href="/p/1"
				class="inline-flex items-center font-medium text-blue-600 transition-colors duration-200 hover:text-blue-800"
			>
				All Posts →
			</a>
		</nav>
	</footer>
</article>
