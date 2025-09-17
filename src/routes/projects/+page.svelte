<svelte:head>
	<title>Projects - My Blog</title>
	<meta
		name="description"
		content="Explore my latest projects, experiments, and contributions to the open source community."
	/>
</svelte:head>

<div class="max-w-4xl">
	<header class="mb-8">
		<h1 class="mb-4 text-4xl font-bold text-gray-900">Projects</h1>
		<p class="text-xl text-gray-600">Here are some of the projects I've been working on lately.</p>
	</header>

	<div class="grid gap-8 md:grid-cols-2">
		<div class="rounded-lg border border-gray-200 p-6">
			<h2 class="mb-3 text-xl font-semibold text-gray-900">SvelteKit Blog</h2>
			<p class="mb-4 text-gray-700">
				A modern blog built with SvelteKit, MDsveX, and Tailwind CSS. Features markdown processing,
				static generation, and responsive design.
			</p>
			<div class="mb-4 flex flex-wrap gap-2">
				<span class="rounded bg-blue-100 px-2 py-1 text-sm text-blue-800">SvelteKit</span>
				<span class="rounded bg-green-100 px-2 py-1 text-sm text-green-800">TypeScript</span>
				<span class="rounded bg-purple-100 px-2 py-1 text-sm text-purple-800">Tailwind CSS</span>
			</div>
			<span class="text-sm text-gray-500"> Coming soon </span>
		</div>

		<div class="rounded-lg border border-gray-200 p-6">
			<h2 class="mb-3 text-xl font-semibold text-gray-900">Coming Soon</h2>
			<p class="mb-4 text-gray-700">
				More projects are on the way! Check back soon to see what I'm building next.
			</p>
			<div class="mb-4 flex flex-wrap gap-2">
				<span class="rounded bg-gray-100 px-2 py-1 text-sm text-gray-600">TBD</span>
			</div>
		</div>
	</div>

	<div class="mt-12 text-center">
		<p class="mb-4 text-gray-600">Want to collaborate on a project or have an idea to discuss?</p>
		<a
			href="/contact"
			class="inline-flex items-center rounded-md border border-blue-600 px-6 py-3 font-medium text-blue-600 transition-colors duration-200 hover:bg-blue-600 hover:text-white"
		>
			Get in Touch
		</a>
	</div>
</div>
