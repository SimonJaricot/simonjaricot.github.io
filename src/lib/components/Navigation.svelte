<script lang="ts">
	import { page } from '$app/stores';

	const navItems = [
		{ href: '/', label: 'Home' },
		{ href: '/about', label: 'About' },
		{ href: '/projects', label: 'Projects' },
		{ href: '/contact', label: 'Contact' }
	];
</script>

<nav class="mb-8 border-b border-gray-200 pb-4">
	<div class="container mx-auto px-4">
		<div class="flex items-center justify-between">
			<a href="/" class="text-xl font-bold text-gray-900 hover:text-gray-700"> My Blog </a>

			<div class="flex space-x-6">
				{#each navItems as item}
					<a
						href={item.href}
						class="text-gray-600 transition-colors duration-200 hover:text-gray-900"
						class:text-gray-900={$page.url.pathname === item.href}
						class:font-medium={$page.url.pathname === item.href}
					>
						{item.label}
					</a>
				{/each}
			</div>
		</div>
	</div>
</nav>
