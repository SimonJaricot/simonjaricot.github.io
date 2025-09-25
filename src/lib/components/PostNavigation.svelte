<script lang="ts">
	import type { PostMeta } from '$lib/posts.js';

	/**
	 * PostNavigation component for navigating between blog posts
	 * Provides simple previous/next post navigation with titles
	 * Uses semantic anchor tags for static site compatibility
	 */
	interface Props {
		previousPost?: PostMeta | null;
		nextPost?: PostMeta | null;
	}

	let { previousPost = null, nextPost = null }: Props = $props();
</script>

<nav class="flex items-center justify-between pt-6" aria-label="Post navigation">
	<!-- Previous Post -->
	<div class="flex items-center">
		{#if previousPost}
			<a
				href="/post/{previousPost.slug}"
				class="inline-flex items-center text-sm font-medium text-blue-700 transition-colors duration-200 hover:text-blue-900"
				aria-label="Previous post: {previousPost.title}"
			>
				prev: {previousPost.title}
			</a>
		{/if}
	</div>

	<!-- Next Post -->
	<div class="flex items-center">
		{#if nextPost}
			<a
				href="/post/{nextPost.slug}"
				class="inline-flex items-center text-sm font-medium text-blue-700 transition-colors duration-200 hover:text-blue-900"
				aria-label="Next post: {nextPost.title}"
			>
				next: {nextPost.title}
			</a>
		{/if}
	</div>
</nav>

