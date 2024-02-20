<script lang="ts">
	import Product1 from '$lib/assets/images/Product1.jpeg';
	import Product2 from '$lib/assets/images/Product2.jpeg';
	import Product3 from '$lib/assets/images/Product3.jpeg';
	import Product4 from '$lib/assets/images/Product4.jpg';
	import Product5 from '$lib/assets/images/Product5.jpg';
	import Product6 from '$lib/assets/images/Product6.jpg';
	import Product7 from '$lib/assets/images/Product7.jpg';

	interface Product {
		id: number;
		name: string;
		description: string;
		imageUrl: string;
	}

	const products: Product[] = [
		{ id: 1, name: 'Sefef', description: 'Light source: 6 Watt', imageUrl: Product1 },
		{ id: 2, name: 'Chis', description: 'Light source: 6 Watt', imageUrl: Product2 },
		{ id: 3, name: '80 * 80 cm (L)', description: 'Light source: 6 Watt', imageUrl: Product3 },
		{ id: 7, name: '80 * 80 cm (L)', description: 'Light source: 6 Watt', imageUrl: Product7 },
		{ id: 5, name: '80 * 80 cm (L)', description: 'Light source: 6 Watt', imageUrl: Product5 },
		{ id: 4, name: '80 * 80 cm (L)', description: 'Light source: 6 Watt', imageUrl: Product4 },
		{ id: 6, name: '80 * 80 cm (L)', description: 'Light source: 6 Watt', imageUrl: Product6 }
	];
</script>

<section class="py-12 bg-gray-50">
	<div class="container mx-auto text-center">
		<h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-12">Featured Products</h2>
		<div class="flex flex-wrap justify-center items-stretch -mx-auto">
			{#each products as product}
				<div class="p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
					<div
						class="relative overflow-hidden rounded-lg shadow-lg bg-white group cursor-pointer transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl"
					>
						<img
							src={product.imageUrl}
							alt={product.name}
							class="w-full h-auto group-hover:scale-110 transition-transform duration-700 ease-in-out"
						/>
						<div
							class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent"
						>
							<p class="text-white text-sm font-semibold tracking-wide">{product.name}</p>
							<p class="text-white text-xs mt-2">{product.description}</p>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	/* Additional custom styles if needed */
	.hover\:shadow-xl:hover {
		box-shadow:
			0 10px 15px -3px rgba(0, 0, 0, 0.1),
			0 4px 6px -4px rgba(0, 0, 0, 0.1);
	}
	/* Smooth shadow transition */
	.hover\:shadow-2xl:hover {
		box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
	}

	/* Ensures text remains legible as the image scales */
	.group-hover .text-white {
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
	}
</style>
