<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const { page } = data;
</script>

<svelte:head>
	<title>{page.title} - My Blog</title>
	<meta name="description" content={page.description} />
</svelte:head>

<div class="max-w-4xl">
	<div class="prose prose-lg max-w-none">
		<page.content />
	</div>
</div>
