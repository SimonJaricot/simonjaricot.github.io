<script lang="ts" module>
	// Export the Image component so it's available to MDsveX content
	export { default as Image } from '$lib/components/Image.svelte';
</script>

<script lang="ts">
	interface Props {
		children?: any;
	}

	let { children }: Props = $props();
</script>

<!-- 
	MDsveX Layout Component
	This layout provides custom components to replace default HTML elements in markdown.
	The Image component replaces standard img tags to enable enhanced image processing.
-->
{@render children?.()}