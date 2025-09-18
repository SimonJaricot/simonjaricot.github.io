<script lang="ts">
	import { getImage, hasEnhancedImage } from '$lib/images.js';
	import { browser } from '$app/environment';

	interface Props {
		src: string;
		alt: string;
		class?: string;
		sizes?: string;
	}

	let { src, alt, class: className = '', sizes }: Props = $props();

	// Safely check if src is defined and is a string
	if (!src || typeof src !== 'string') {
		console.warn('Image component received invalid src:', src);
	}

	// Check if this is an enhanced image key or a regular path
	const isEnhancedKey = src && hasEnhancedImage(src);
	const imageSrc = isEnhancedKey ? getImage(src) : src;
	const isStaticPath = src && src.startsWith('/images/');
	
	// Create a simple fallback for development
	const finalSrc = (() => {
		if (isEnhancedKey) {
			// For enhanced image keys, use the static images path
			return `/images/${src}.jpeg`;
		} else {
			return src;
		}
	})();
</script>

{#if finalSrc}
	<!-- Always use regular img tag for now to avoid SSR/dev issues -->
	<img 
		src={finalSrc}
		{alt} 
		class={className}
	/>
{/if}