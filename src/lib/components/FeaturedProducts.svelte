<script lang="ts">
	import Product1 from '$lib/assets/images/Product1.jpeg';
	import Product2 from '$lib/assets/images/Product2.jpeg';
	import Product5 from '$lib/assets/images/Product5.jpg';

	// import luna1 from '$lib/assets/images/luna11';
	import luna2 from '$lib/assets/images/luna12.png';
	// import luna3 from '$lib/assets/images/luna13.PNG';
	// import luna5 from '$lib/assets/images/luna15.PNG';
	import luna8 from '$lib/assets/images/luna18.png';
	import luna9 from '$lib/assets/images/luna19.png';
	// import luna10 from '$lib/assets/images/luna20.PNG';
	import lamp2 from '$lib/assets/images/lamp2.jpg';
	// import new1 from '$lib/assets/images/new1.JPG';
	import new10 from '$lib/assets/images/new10.jpg';
	import new11 from '$lib/assets/images/new11.jpg';
	import new12 from '$lib/assets/images/new12.jpg';
	import new13 from '$lib/assets/images/new13.jpg';
	import new14 from '$lib/assets/images/new14.jpg';
	import new15 from '$lib/assets/images/new15.jpg';
	import new16 from '$lib/assets/images/new16.jpg';
	import new17 from '$lib/assets/images/new17.jpg';
	import new18 from '$lib/assets/images/new18.jpg';
	import new2 from '$lib/assets/images/new2.jpg';
	import new3 from '$lib/assets/images/new3.jpg';
	import new4 from '$lib/assets/images/new4.jpg';
	import new5 from '$lib/assets/images/new5.jpg';
	import new6 from '$lib/assets/images/new6.jpg';
	import new7 from '$lib/assets/images/new7.jpg';
	import new8 from '$lib/assets/images/new8.jpg';
	import new9 from '$lib/assets/images/new9.jpg';

	interface Product {
		id: number;
		name: string;
		description: string;
		imageUrl: string;
		isSoldOut?: boolean;
	}

	const products: Product[] = [
		// { id: 7, name: '80 * 80 cm (L)', description: 'Light source: 6 Watt', imageUrl: Product8 },
		{ id: 4, name: 'Mender Pendant', description: '70 x 70 x 110 cm', imageUrl: new2 },
		{ id: 4, name: 'Gum Gum Pedant (M)', description: '60 x 60 x 30 cm', imageUrl: new3 },
		{ id: 4, name: 'Gum Gum Pendant (S)', description: '40 x 40 x 25 cm', imageUrl: new4 },
		{ id: 5, name: 'Gum Gum Pendant', description: '40 x 40 cm', imageUrl: Product5 },
		// { id: 6, name: '6 * 80 cm (L)', description: 'Light source: 6 Watt', imageUrl: Product9 },
		// { id: 8, name: '7 * 80 cm (L)', description: 'Light source: 6 Watt', imageUrl: Product10 },
		///
		{ id: 16, name: 'Nikisat Table Lamp', description: '30 x 30 x 50 cm', imageUrl: new5 },

		{ id: 9, name: 'Getseta Table Lamp', description: '30 x 30 x 50 cm', imageUrl: new6 },
		{ id: 9, name: 'Qedamawi Table Lamp', description: '30 x 30 x 50 cm', imageUrl: new7 },
		{ id: 9, name: 'Qedamawi Table Lamp', description: '30 x 30 x 50 cm', imageUrl: new8 },
		{ id: 9, name: 'Tilet Table Lamp', description: '30 x 30 x 50 cm', imageUrl: new9 },
		{ id: 9, name: 'Eskista Table Lamp', description: '30 x 30 x 50 cm', imageUrl: new10 },
		{ id: 9, name: 'Uttu Table Lamp', description: '30 x 30 x 50 cm', imageUrl: new11 },
		{ id: 9, name: 'Maezen Table Lamp', description: '30 x 30 x 50 cm', imageUrl: new12 },

		// { id: 10, name: '9 * 80 cm (L)', description: 'Light source: 6 Watt', imageUrl: luna1 },
		{ id: 13, name: 'Qedamawi Floor Lamp', description: '50 x 50 x 150', imageUrl: new14 },
		{ id: 9, name: 'Qedamawi Floor Lamp', description: '50 x 50 x 150 cm', imageUrl: new15 },
		{ id: 9, name: 'Qedamawi Floor Lamp', description: '50 x 50 x 150 cm', imageUrl: new16 },
		{ id: 9, name: 'Ensosila Floor Lamp', description: '30 x 30 x 180 cm', imageUrl: new13 },
		{ id: 11, name: 'Srgud Pendant', description: '60 x 60 cm', imageUrl: luna2, isSoldOut: true },
		// { id: 12, name: '80 * 80 cm (L)', description: 'Light source: 6 Watt', imageUrl: luna3 },
		// { id: 14, name: '80 * 80 cm (L)', description: 'Light source: 6 Watt', imageUrl: luna5 },
		{
			id: 18,
			name: 'Fendisha Pendant',
			description: '90 x 90 cm',
			imageUrl: luna9,
			isSoldOut: true
		},

		////
		// { id: 9, name: '80 * 80 cm (L)', description: 'Light source: 6 Watt', imageUrl: Product11 },

		{
			id: 17,
			name: 'Fendisha Pendant',
			description: '90 x 90 cm',
			imageUrl: luna8,
			isSoldOut: true
		},

		{
			id: 13,
			name: 'Zuret Lamp',
			description: '25 x 25 x 30 cm',
			imageUrl: lamp2,
			isSoldOut: true
		},
		{
			id: 13,
			name: 'Poppy Lamp',
			description: '30 x 30 cm x 40cm',
			imageUrl: new18,
			isSoldOut: true
		},
		{
			id: 13,
			name: 'Rose Lamp',
			description: '20 x 20 x 30 cm',
			imageUrl: new17,
			isSoldOut: true
		},

		{ id: 1, name: '', description: '70 x 70 cm', imageUrl: Product1, isSoldOut: true },
		{ id: 2, name: '', description: '50 x 50 cm', imageUrl: Product2, isSoldOut: true }

		// { id: 19, name: '80 * 80 cm (L)', description: 'Light source: 6 Watt', imageUrl: luna10 }
	];
</script>

<section class="py-24 bg-gray-50">
	<div class="container mx-auto text-center">
		<h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-12">Our Products</h2>
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

						<!-- Add Sold Out Overlay -->
						{#if product.isSoldOut}
							<div
								class="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300"
							>
								<span class="text-white text-xl font-light tracking-wider uppercase">Sold Out</span>
							</div>
						{/if}

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
	/* Keep your existing styles */
	.hover\:shadow-xl:hover {
		box-shadow:
			0 10px 15px -3px rgba(0, 0, 0, 0.1),
			0 4px 6px -4px rgba(0, 0, 0, 0.1);
	}

	.hover\:shadow-2xl:hover {
		box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
	}

	.group-hover .text-white {
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
	}
</style>
