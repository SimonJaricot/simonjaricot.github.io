<script lang="ts">
	import { page } from '$app/stores';
	import type { Page } from '$lib/pages.js';

	interface Props {
		pages?: Page[];
	}

	let { pages = [] }: Props = $props();

	const navItems = [
		{ href: '/', label: 'home' },
		...pages.map((p) => ({ href: `/${p.slug}`, label: p.title }))
	];
</script>

<nav class="mb-8 p-4">
	<div class="container mx-auto px-4">
		<h1>
			<a href="/" class="text-6xl font-bold text-stone-800 hover:text-stone-700"> simon's blog </a>
		</h1>

		<div class="flex space-x-6">
			{#each navItems as item}
				<a
					href={item.href}
					class="text-blue-700 transition-colors duration-200 hover:text-blue-900"
					class:underline={$page.url.pathname === item.href}
				>
					{item.label}
				</a>
			{/each}
		</div>
	</div>
</nav>
