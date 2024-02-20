<script lang="ts">
	import gallery1 from '$lib/assets/images/gallery1.jpg';
	import gallery2 from '$lib/assets/images/gallery2.jpg';
	import gallery3 from '$lib/assets/images/gallery3.jpg';
	import gallery4 from '$lib/assets/images/gallery4.jpg';
	import gallery5 from '$lib/assets/images/gallery5.jpg';

	import { onMount } from 'svelte';

	// Define the type for your gallery items
	// Define the type for your gallery items
	interface GalleryItem {
		id: number; // Assume each item has a unique string ID, adjust the type as needed
		imageUrl: string;
		caption: string;
		size: string;
	}

	let firstImageHeight: number = 0; // To store the height of the first image

	// Function to update all images' height after the first image is loaded
	function updateHeight(event: Event): void {
		const target = event.target as HTMLImageElement; // Cast the event target to an HTMLImageElement
		firstImageHeight = target.offsetHeight; // Get the height of the first image
	}
	interface Testimonial {
		id: number;
		quote: string;
		author: string;
		position: string; // Position of the author or relation to the project
	}

	const galleryItems: GalleryItem[] = [
		{ id: 1, imageUrl: gallery1, caption: 'The Shepherd ', size: '60 X 110 cm ' },
		{ id: 2, imageUrl: gallery2, caption: ' Brotherhood ', size: '85 x 110 cm ' },
		{ id: 3, imageUrl: gallery3, caption: 'Sisters ', size: '30x 70 cm' },
		{ id: 4, imageUrl: gallery4, caption: 'Axum', size: ' 25 X 30 cm ' },
		{ id: 5, imageUrl: gallery5, caption: 'Passengers ', size: '100 x 100 cm ' }

		// Add more items as needed
	];

	const testimonials: Testimonial[] = [
		{
			id: 1,
			quote: 'Mella Studio transformed our space with their innovative designs.',
			author: 'Jane Doe',
			position: 'CEO, Acme Inc.'
		},
		{
			id: 2,
			quote: 'The attention to detail and craftsmanship is unparalleled.',
			author: 'John Smith',
			position: 'Homeowner'
		}
		// Add more testimonials as needed
	];
</script>

<section class="py-12 bg-primary">
	<div class="container mx-auto px-4">
		<h2 class="text-3xl md:text-4xl font-bold text-center text-white mb-12">
			Our Embroidery & Texture Arts
		</h2>

		<div class="grid md:grid-cols-3 gap-8 items-start">
			{#each galleryItems as item, i (item.id)}
				<div class="group cursor-pointer flex flex-col mb-8 md:mb-0">
					<div class="relative overflow-hidden rounded-lg shadow-lg">
						<img
							src={item.imageUrl}
							alt={`Gallery item ${i + 1}`}
							class="transition duration-500 hover:scale-105 h-auto max-h-[400px] w-full mx-auto group-hover:scale-110 ease-in-out"
						/>
						<div
							class="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/60 to-transparent"
						>
							<p class="text-center text-white">{item.caption}</p>
							<p class="text-center text-white">{item.size}</p>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	/* Additional custom styles if needed */
</style>
