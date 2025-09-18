<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{data.page.title} - My Blog</title>
	<meta name="description" content={data.page.summary} />
</svelte:head>

<div class="max-w-4xl">
	<div class="prose prose-lg max-w-none">
		<data.page.content />
	</div>
</div>