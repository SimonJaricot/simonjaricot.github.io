<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Navigation from '$lib/components/Navigation.svelte';
	import type { LayoutData } from './$types';

	let { children, data }: { children: any; data: LayoutData } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta property="og:title" content="My SvelteKit App" />
</svelte:head>

<div class="min-h-screen bg-amber-50/50">
	<div class="mx-auto max-w-4xl">
		<Navigation pages={data.pages} />
		<main class="container mx-auto px-4 py-8">
			{@render children?.()}
		</main>
	</div>
</div>
