<!--
  @component
  A reusable pagination component for navigating between pages of content.
  
  Features:
  - Previous/Next navigation with proper disabled states
  - Direct page number links with smart range display
  - Accessible markup with ARIA labels
  - Responsive design matching the blog's color scheme
  - TypeScript support with proper prop interfaces
  
  @example
  ```svelte
  <Pagination 
    currentPage={2} 
    totalPages={10} 
    basePath="/p" 
    firstPagePath="/" 
  />
  ```
-->

<script lang="ts">
	/**
	 * Props interface for the Pagination component
	 */
	interface PaginationProps {
		/** Current active page number (1-indexed) */
		currentPage: number;
		/** Total number of pages available */
		totalPages: number;
		/** Base path for pagination URLs (e.g., '/p' for /p/2, /p/3, etc.) */
		basePath: string;
		/** Path for the first page (usually '/' for home) */
		firstPagePath?: string;
		/** Additional CSS classes to apply to the nav element */
		class?: string;
	}

	let {
		currentPage,
		totalPages,
		basePath,
		firstPagePath = '/',
		class: className = ''
	}: PaginationProps = $props();

	/**
	 * Generates the URL for a given page number
	 * @param pageNum - The page number to generate URL for
	 * @returns The appropriate URL for the page
	 */
	function getPageUrl(pageNum: number): string {
		if (pageNum === 1) {
			return firstPagePath;
		}
		return `${basePath}/${pageNum}`;
	}

	/**
	 * Determines if a page number should be displayed in the pagination
	 * Shows: first page, last page, current page ± 1, and ellipsis for gaps
	 * @param pageNum - The page number to check
	 * @returns True if the page should be displayed
	 */
	function shouldShowPage(pageNum: number): boolean {
		// Always show first and last page
		if (pageNum === 1 || pageNum === totalPages) {
			return true;
		}
		// Show pages within 1 of current page
		if (pageNum >= currentPage - 1 && pageNum <= currentPage + 1) {
			return true;
		}
		return false;
	}

	/**
	 * Determines if ellipsis should be shown before a page number
	 * @param pageNum - The page number to check
	 * @returns True if ellipsis should be displayed
	 */
	function shouldShowEllipsis(pageNum: number): boolean {
		return pageNum === currentPage - 2 || pageNum === currentPage + 2;
	}

	// Computed values for navigation state
	const hasPrevPage = $derived(currentPage > 1);
	const hasNextPage = $derived(currentPage < totalPages);
	const prevPageUrl = $derived(getPageUrl(currentPage - 1));
	const nextPageUrl = $derived(getPageUrl(currentPage + 1));

	// Generate array of page numbers for iteration
	const pageNumbers = $derived(Array.from({ length: totalPages }, (_, i) => i + 1));
</script>

<!--
  Pagination navigation component
  Uses semantic nav element with proper ARIA labels for accessibility
-->
<nav class="flex items-center pt-6 {className}" aria-label="Pagination navigation">
	<!-- Previous page button -->
	<div class="flex items-center">
		{#if hasPrevPage}
			<a
				href={prevPageUrl}
				class="me-4 inline-flex items-center text-sm font-medium text-blue-700 transition-colors duration-200 hover:text-blue-900"
				aria-label="Go to previous page"
			>
				prev
			</a>
		{:else}
			<span
				class="items-centertext-sm me-4 inline-flex cursor-not-allowed text-sm font-medium text-stone-400"
				aria-label="Previous page (disabled)"
			>
				prev
			</span>
		{/if}
	</div>

	<!-- Page numbers -->
	<div class="flex items-center space-x-2" aria-label="Page numbers">
		{#each pageNumbers as pageNum}
			{#if pageNum === currentPage}
				<!-- Current page indicator -->
				<span
					class="inline-flex items-center text-sm font-medium text-stone-400 underline"
					aria-current="page"
					aria-label="Current page, page {pageNum}"
				>
					{pageNum}
				</span>
			{:else if shouldShowPage(pageNum)}
				<!-- Clickable page link -->
				<a
					href={getPageUrl(pageNum)}
					class="inline-flex items-center text-sm font-medium text-blue-700 transition-colors duration-200 hover:text-blue-900"
					aria-label="Go to page {pageNum}"
				>
					{pageNum}
				</a>
			{:else if shouldShowEllipsis(pageNum)}
				<!-- Ellipsis indicator for skipped pages -->
				<span
					class="inline-flex items-center px-2 py-2 text-sm font-medium text-stone-500"
					aria-hidden="true"
				>
					…
				</span>
			{/if}
		{/each}
	</div>

	<!-- Next page button -->
	<div class="flex items-center">
		{#if hasNextPage}
			<a
				href={nextPageUrl}
				class="ms-4 inline-flex items-center text-sm font-medium text-blue-700 transition-colors duration-200 hover:text-blue-900"
				aria-label="Go to next page"
			>
				next
			</a>
		{:else}
			<span
				class="items-centertext-sm ms-4 inline-flex cursor-not-allowed text-sm font-medium text-stone-400"
				aria-label="Next page (disabled)"
			>
				next
			</span>
		{/if}
	</div>
</nav>

