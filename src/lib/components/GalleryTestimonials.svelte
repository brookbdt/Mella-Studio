<script lang="ts">
	import gallery1 from '$lib/assets/images/gallery1.jpeg';
	import gallery2 from '$lib/assets/images/gallery2.jpeg';
	// Example gallery items and testimonials - replace with actual data
	interface GalleryItem {
		id: number;
		imageUrl: string;
		caption: string;
	}

	interface Testimonial {
		id: number;
		quote: string;
		author: string;
		position: string; // Position of the author or relation to the project
	}

	const galleryItems: GalleryItem[] = [
		{ id: 1, imageUrl: gallery1, caption: 'Project 1' },
		{ id: 2, imageUrl: gallery2, caption: 'Product in Use' }
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
			Our Work & Testimonials
		</h2>

		<div class="grid md:grid-cols-2 gap-8 items-start">
			{#each galleryItems as item, i (item.id)}
				<div class="flex flex-col mb-8 md:mb-0">
					<img
						src={item.imageUrl}
						alt={`Gallery item ${i + 1}`}
						class="rounded-lg shadow-lg mb-4 transition duration-500 hover:scale-105"
					/>
					<p class="text-center mt-2 text-white">{item.caption}</p>
				</div>
				{#if testimonials[i]}
					<div
						class="flex flex-col justify-center items-center text-center bg-white p-6 rounded-lg shadow-lg transition duration-500 hover:scale-105"
					>
						<blockquote class="italic">"{testimonials[i].quote}"</blockquote>
						<p class="font-semibold mt-4">{testimonials[i].author}</p>
						<p class="text-sm">{testimonials[i].position}</p>
					</div>
				{/if}
			{/each}
		</div>
	</div>
</section>

<style>
	/* Additional custom styles if needed */
</style>
