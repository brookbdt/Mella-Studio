<script lang="ts">
	import alllights from '$lib/assets/images/alllights.jpeg';
	import alldrawings from '$lib/assets/images/alldrawings.jpeg';
	import about2 from '$lib/assets/images/about2.png';
	import about from '$lib/assets/images/about.png';
</script>

<section class="py-16 bg-gradient-to-r from-blue-50 to-gray-100 text-gray-900">
	<div class="container mx-auto px-4 max-w-7xl">
		<!-- Title and Main Description -->
		<div class="mb-16">
			<h2 class="text-4xl font-bold text-gray-900 mb-6">About Mella Studio</h2>
			<p class="text-lg text-gray-700 max-w-2xl text-justify">
				At Mella Studio, we blend traditional arts with modern design to create unique lighting
				products and architectural solutions. Our approach is rooted in Ethiopia's rich cultural
				heritage, making each piece a narrative of meticulous craftsmanship and innovation.
			</p>
		</div>

		<!-- First Image and Description -->
		<div class="flex flex-wrap md:flex-nowrap items-center mb-16">
			<div class="w-full md:w-1/2">
				<img
					src={about}
					alt="Mella Studio Craftsmanship"
					class="rounded-xl transform transition duration-300 hover:scale-105 mb-8 md:mb-0"
				/>
			</div>
			<div class="w-full md:w-1/2 md:pl-10">
				<p class="text-lg text-gray-700 text-justify">
					Led by visionary architects, Mella Studio is on a mission to redefine the boundaries of
					design. Our work is not just about creating objects or spaces; it's about fostering a
					creative community that transcends borders and brings Ethiopian artistry to the forefront
					of the global design scene.
				</p>
			</div>
		</div>

		<!-- Second Description and Image -->
		<div class="flex ml-0 flex-wrap md:flex-nowrap items-center">
			<div class="w-full md:w-1/2 md:pr-10 mx-auto">
				<p class="text-lg text-gray-700 max-w-3xl mb-8 text-justify md:mb-0">
					Join us on our journey to illuminate the world with the unique spirit of Ethiopian
					craftsmanship. Each project we undertake is a step towards bringing a new perspective to
					design, blending traditional techniques with contemporary aesthetics to create something
					truly unique.
				</p>
			</div>
			<div class="w-full ml-0 md:w-1/2">
				<img
					src={about2}
					alt="Mella Studio Workshop"
					class="rounded-xl w-full transform transition duration-300 hover:scale-105"
				/>
			</div>
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
