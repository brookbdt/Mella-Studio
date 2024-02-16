<script lang="ts">
	// Example product data - replace with actual product data
	import Product1 from '$lib/assets/images/Product1.jpeg';
	import Product2 from '$lib/assets/images/Product2.jpeg';
	import Product3 from '$lib/assets/images/Product3.jpeg';
	interface Product {
		id: number;
		name: string;
		description: string;
		imageUrl: string;
	}

	const products: Product[] = [
		{ id: 1, name: 'Sefef', description: 'Wow Sefef', imageUrl: Product1 },
		{ id: 2, name: 'Chis', description: 'Wow Chis', imageUrl: Product2 },
		{ id: 3, name: 'Gum Gum', description: 'Wow Gum Gum', imageUrl: Product3 }
		// Add more products as needed
	];
</script>

<section class="py-12 bg-secondary">
	<div class="container mx-auto text-center">
		<h2 class="text-3xl md:text-4xl font-bold text-tertiary mb-8">Featured Products</h2>
		<div class="flex flex-wrap justify-center items-center -mx-4">
			{#each products as product}
				<div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-8">
					<div
						class="bg-white rounded-lg overflow-hidden shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-xl hover:cursor-pointer"
					>
						<img
							src={product.imageUrl}
							alt={product.name}
							class="w-full h-auto transition-transform duration-500 hover:scale-110"
						/>
						<div class="p-6">
							<h3 class="font-semibold text-lg mb-2">{product.name}</h3>
							<p class="text-gray-700">{product.description}</p>
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
</style>
