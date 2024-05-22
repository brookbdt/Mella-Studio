<script lang="ts">
	import { onMount } from 'svelte';
	import { CountUp } from 'countup.js';

	export let endVal: number;
	export let duration: number;
	export let id: string;

	let countUpInstance: CountUp;

	function formatNumber(value) {
		return `${value.toLocaleString()}+`;
	}

	onMount(() => {
		countUpInstance = new CountUp(id, endVal, {
			duration,
			formattingFn: formatNumber
		});
		if (!countUpInstance.error) {
			countUpInstance.start();
		} else {
			console.error(countUpInstance.error);
		}
	});

	$: if (countUpInstance) {
		countUpInstance.update(endVal);
	}
</script>

<div {id} class="text-7xl font-bold text-primary"></div>
