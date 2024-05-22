<script lang="ts">
	import Product1 from '$lib/assets/images/Product1.jpeg';
	import Product2 from '$lib/assets/images/Product2.jpeg';
	import Product3 from '$lib/assets/images/Product3.jpeg';
	import Product4 from '$lib/assets/images/Product4.jpg';
	import Product5 from '$lib/assets/images/Product5.jpg';
	import Product6 from '$lib/assets/images/Product6.jpg';
	import Product7 from '$lib/assets/images/Product7.jpg';

	import Product9 from '$lib/assets/images/Product9.jpg';
	import Product10 from '$lib/assets/images/Product10.jpg';
	import Product11 from '$lib/assets/images/product11.jpg';
	// import luna1 from '$lib/assets/images/luna11';
	import luna2 from '$lib/assets/images/luna12.png';
	// import luna3 from '$lib/assets/images/luna13.PNG';
	import luna4 from '$lib/assets/images/luna14.png';
	// import luna5 from '$lib/assets/images/luna15.PNG';
	import luna6 from '$lib/assets/images/luna16.png';
	import luna7 from '$lib/assets/images/luna17.png';
	import luna8 from '$lib/assets/images/luna18.png';
	import luna9 from '$lib/assets/images/luna19.png';
	// import luna10 from '$lib/assets/images/luna20.PNG';
	import lamp2 from '$lib/assets/images/lamp2.jpg';
	import lamp3 from '$lib/assets/images/lamp3.jpg';
	import qedamawi2 from '$lib/assets/images/qedamawi2.jpg';
	import roseLamp from '$lib/assets/images/roseLamp.jpg';

	interface Product {
		id: number;
		name: string;
		description: string;
		imageUrl: string;
	}

	const products: Product[] = [
		{ id: 1, name: '', description: '70 x 70 cm', imageUrl: Product1 },
		{ id: 2, name: '', description: '50 x 50 cm', imageUrl: Product2 },
		{ id: 3, name: '', description: '60 x 60 cm', imageUrl: Product3 },
		// { id: 7, name: '80 * 80 cm (L)', description: 'Light source: 6 Watt', imageUrl: Product8 },
		{ id: 4, name: 'Rose lamp', description: '20 x 20 x 30 cm', imageUrl: Product4 },
		{ id: 5, name: 'Gum Gum Pendant', description: '40 x 40 cm', imageUrl: Product5 },
		// { id: 6, name: '6 * 80 cm (L)', description: 'Light source: 6 Watt', imageUrl: Product9 },
		// { id: 8, name: '7 * 80 cm (L)', description: 'Light source: 6 Watt', imageUrl: Product10 },
		///
		{ id: 16, name: 'Cloud Ceiling', description: '25m x  5m', imageUrl: luna7 },

		{ id: 9, name: 'Mushrit Table Lamp', description: '30 x 30 x 40 cm', imageUrl: Product11 },
		// { id: 10, name: '9 * 80 cm (L)', description: 'Light source: 6 Watt', imageUrl: luna1 },
		{ id: 11, name: 'Srgud Pendant', description: '60 x 60 cm', imageUrl: luna2 },
		// { id: 12, name: '80 * 80 cm (L)', description: 'Light source: 6 Watt', imageUrl: luna3 },
		// { id: 14, name: '80 * 80 cm (L)', description: 'Light source: 6 Watt', imageUrl: luna5 },
		{ id: 18, name: 'Fendisha Pendant', description: '90 x 90 cm', imageUrl: luna9 },

		{ id: 15, name: 'Cloud Ceiling', description: '25m x  5m', imageUrl: luna6 },
		////
		// { id: 9, name: '80 * 80 cm (L)', description: 'Light source: 6 Watt', imageUrl: Product11 },

		{ id: 17, name: 'Fendisha Pendant', description: '90 x 90 cm', imageUrl: luna8 },
		{ id: 13, name: 'Srgud Pendant', description: '60 x 60 cm x 35 cm', imageUrl: luna4 },
		{ id: 13, name: 'Zuret Lamp', description: '25 x 25 x 30 cm', imageUrl: lamp2 },
		{ id: 13, name: 'Poppy Lamp', description: '30 x 30 cm x 40cm', imageUrl: lamp3 },
		{ id: 13, name: 'Rose Lamp', description: '20 x 20 x 30 cm', imageUrl: roseLamp },
		{ id: 13, name: 'Qedamawi Floor Lamp', description: '40 x 40 x 150', imageUrl: qedamawi2 }

		// { id: 19, name: '80 * 80 cm (L)', description: 'Light source: 6 Watt', imageUrl: luna10 }
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
