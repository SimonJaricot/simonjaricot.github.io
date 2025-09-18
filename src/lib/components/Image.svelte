<script lang="ts">
	import { getImageSizes } from '$lib/images.js';
	
	/**
	 * Dynamically import all images from the images directory with enhanced processing.
	 * This uses Vite's import.meta.glob to automatically discover and import all image files
	 * at build time, making the component truly dynamic - any image added to src/lib/images/
	 * will automatically be available without code changes.
	 */
	const imageModules = import.meta.glob('$lib/images/*.{png,jpg,jpeg,webp,avif,gif}', {
		eager: true,
		query: '?enhanced',
		import: 'default'
	}) as Record<string, any>;
	
	/**
	 * Create a mapping from filename (without extension) to the enhanced image object.
	 * This allows referencing images by their base name (e.g., 'hello' for 'hello.jpeg')
	 */
	const imageMap: Record<string, any> = Object.fromEntries(
		Object.entries(imageModules).map(([path, module]) => {
			// Extract filename without extension from the path
			// e.g., '$lib/images/hello.jpeg' -> 'hello'
			const filename = path.split('/').pop()?.split('.')[0] || '';
			return [filename, module];
		})
	);
	
	interface Props {
		src?: string;
		alt: string;
		class?: string;
		sizes?: string;
	}

	let { src = '', alt, class: className = '', sizes }: Props = $props();
	
	// Default styling for images (same as cover images)
	const defaultClasses = 'aspect-video w-full rounded-lg object-cover';
	const finalClassName = className || defaultClasses;
	
	// Use provided sizes or generate default responsive sizes
	const imageSizes = sizes || getImageSizes();
	
	/**
	 * Get the enhanced image object for the given src.
	 * Returns the enhanced image if available, otherwise returns the src as-is for external URLs.
	 */
	const imagePath = $derived(() => {
		if (!src) return '';
		
		// Check if it's a bare filename we have in our dynamic image map
		if (imageMap[src]) {
			return imageMap[src];
		}
		
		// For external URLs or other paths, return as-is
		return src;
	});
	
	/**
	 * Determine whether to use enhanced:img or regular img tag.
	 * Use enhanced:img for locally managed images, regular img for external URLs.
	 */
	const useEnhanced = $derived(() => {
		if (!src) return false;
		
		// Use enhanced-img if we have a dynamically imported image
		if (imageMap[src]) {
			return true;
		}
		
		return false;
	});
</script>

<!-- Render the image using either enhanced:img for local images or regular img for external URLs -->
{#if src && imagePath()}
	{#if useEnhanced()}
		<enhanced:img 
			src={imagePath()}
			{alt} 
			class={finalClassName}
			sizes={imageSizes}
		/>
	{:else}
		<img src={imagePath()} {alt} class={finalClassName} />
	{/if}
{/if}

