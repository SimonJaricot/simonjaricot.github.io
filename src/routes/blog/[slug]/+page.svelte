<script lang="ts">
	import type { PageLoad } from './$types';

	let { data }: PageLoad = $props();
</script>

<h1>{data.title}</h1>
<div>
	{@html data.content}
</div>
