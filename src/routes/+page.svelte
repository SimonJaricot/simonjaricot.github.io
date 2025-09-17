<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
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

	<section>
		<h2 class="mb-6 text-2xl font-semibold text-gray-900">Latest Posts</h2>

		{#if data.posts.length > 0}
			<div class="space-y-8">
				{#each data.posts as post}
					<article class="border-b border-gray-200 pb-8 last:border-b-0">
						<header class="mb-4">
							<h3 class="mb-2 text-xl font-semibold">
								<a
									href="/post/{post.slug}"
									class="text-gray-900 transition-colors duration-200 hover:text-blue-600"
								>
									{post.title}
								</a>
							</h3>
							<time class="text-sm text-gray-500" datetime={post.date}>
								{new Date(post.date).toLocaleDateString('en-US', {
									year: 'numeric',
									month: 'long',
									day: 'numeric'
								})}
							</time>
						</header>

						<p class="mb-4 text-gray-700">{post.description}</p>

						<a
							href="/post/{post.slug}"
							class="inline-flex items-center font-medium text-blue-600 transition-colors duration-200 hover:text-blue-800"
						>
							Read more →
						</a>
					</article>
				{/each}
			</div>

			<div class="mt-12 text-center">
				<a
					href="/p/1"
					class="inline-flex items-center rounded-md border border-gray-300 px-6 py-3 text-gray-700 transition-colors duration-200 hover:border-gray-400 hover:text-gray-900"
				>
					View All Posts
				</a>
			</div>
		{:else}
			<p class="text-lg text-gray-500">No posts available yet. Check back soon!</p>
		{/if}
	</section>
</div>
