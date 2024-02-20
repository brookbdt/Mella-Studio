<script lang="ts">
	import Partner1 from '$lib/assets/images/Partner1.png';
	import Partner2 from '$lib/assets/images/Partner2.png';
	import Partner3 from '$lib/assets/images/Partner3.png';
	import Partner4 from '$lib/assets/images/Partner4.png';
	import Partner5 from '$lib/assets/images/Partner5.png';
	import Partner6 from '$lib/assets/images/Partner6.png';
	import Partner7 from '$lib/assets/images/Partner7.png';
	import Partner8 from '$lib/assets/images/Partner8.png';
	// Example partner logo data - replace with actual logo image paths
	const partnerLogos = [
		Partner1,
		Partner2,
		Partner3,
		Partner4,
		Partner5,
		Partner6,
		Partner7,
		Partner8

		// Add more logos as needed
	];
</script>

<section class="bg-secondary py-12">
	<div class="container mx-auto px-4">
		<h2 class="text-3xl md:text-4xl font-bold text-center text-tertiary mb-8">Our Partners</h2>
		<div
			class=" grid grid-cols-2 object-contain filter grayscale hover:cursor-pointer sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center"
		>
			{#each partnerLogos as logo}
				<div class="flex justify-center">
					<img
						src={logo}
						alt="Partner Logo"
						class="h-12 md:h-16 transform transition duration-300 hover:scale-110 hover:grayscale-0"
					/>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	/* Additional custom styles if needed */
</style>
