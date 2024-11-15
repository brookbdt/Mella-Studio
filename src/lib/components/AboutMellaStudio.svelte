<script lang="ts">
	import alllights from '$lib/assets/images/alllights.jpeg';
	import alldrawings from '$lib/assets/images/alldrawings.jpeg';
	import new21 from '$lib/assets/images/new21.png';
	import new20 from '$lib/assets/images/new20.png';
</script>

<section class="py-24 bg-gradient-to-r from-blue-50 to-gray-100 text-gray-900">
	<div class="container mx-auto px-4 max-w-7xl">
		<!-- Title and Main Description -->
		<div class="mb-16">
			<h2 class="md:text-4xl text-xl font-bold text-gray-900 mb-6 text-center">
				Crafting Culture, by hand.
			</h2>
			<p class="md:text-lg text-gray-700 max-w-full text-center">
				Mella Studio crafts more than lighting – we create conversations. Each piece tells a story
				of Ethiopia's rich artistic heritage, reimagined for contemporary spaces. Our artisans
				transform centuries-old patterns and cultural motifs into sophisticated lighting solutions
				that make statements in modern homes and offices. From hand-crafted table lamps to statement
				pendant lights, every Mella creation bridges the gap between Ethiopia's artistic legacy and
				contemporary design, bringing warmth and character to spaces that dare to be different.
			</p>
		</div>

		<!-- First Image and Description -->
		<div class=" items-center mb-16">
			<div class="w-full">
				<img
					src={new20}
					alt="Mella Studio Craftsmanship"
					class="rounded-xl transform transition duration-300 hover:scale-105"
				/>
			</div>
			<div class="w-full md:pl-10 mt-20">
				<p class="text-lg text-gray-700 text-center">
					Mella Studio’s vision is to create unique lighting products and infuse Ethiopian culture
					into both local and international clients’ surroundings. Team of architects, artists, and
					designers transcending the traditional boundaries of these professions, intending to
					deliver awe-inspiring spaces that redefine perceptions and expectations.
				</p>
			</div>
		</div>

		<!-- Second Description and Image -->
		<div class=" items-center mb-16">
			<div class="w-full">
				<img
					src={new21}
					alt="Mella Studio Workshop"
					class="rounded-xl w-full transform transition duration-300 hover:scale-105"
				/>
			</div>
		</div>
		<div class="w-full md:pl-10 mt-20">
			<p class="text-lg text-gray-700 text-center">
				In essence, Mella Studio is not just another studio; <span class="font-bold"
					>it’s a hub for creativity.</span
				>
			</p>
		</div>
	</div>
</section>

<style>
	/* Ensuring the images don't stick too closely to the viewport edge on smaller screens */
	@media (max-width: 768px) {
		.container {
			width: calc(100% - 1rem);
		}
	}
	img:hover {
		overflow: hidden;
		z-index: 10;
	}
	/* Custom styles for 3D rotation effect */
	.perspective {
		perspective: 1500px;
	}
	.rotate-3d {
		transform: rotateY(35deg) rotateX(15deg) scale(1.1);
		transition: transform 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275);
	}
	/* Ensure the transform is GPU accelerated for smooth animations */
	.transform-gpu {
		transform-style: preserve-3d;
		will-change: transform;
	}

	.perspective:hover {
		transform: perspective(1000px) rotateX(10deg) rotateY(10deg) scale(1.05); /* Add a 3D hover effect */
		transition: transform 0.5s ease;
	}

	@media (min-width: 768px) {
		.perspective {
			margin-bottom: 2rem; /* Ensure consistent spacing */
		}
	}
</style>
