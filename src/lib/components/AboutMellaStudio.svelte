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
				A design studio founded by three visionary architects (2022). Operating in the realm of
				interior design, lighting, and Ethiopian-themed embroidery art. It has been transforming
				spaces with its innovative and rich designs.
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
					Mella Studio’s vision is to create unique lighting products and infuse Ethiopian culture
					into both local and international clients’ surroundings.
				</p>
			</div>
		</div>

		<!-- Second Description and Image -->
		<div class="flex ml-0 flex-wrap md:flex-nowrap items-center">
			<div class="w-full md:w-1/2 md:pr-10 mx-auto">
				<p class="text-lg text-gray-700 max-w-3xl mb-8 text-justify md:mb-0">
					Team of architects, artists, and designers transcending the traditional boundaries of
					these professions, intending to deliver awe-inspiring spaces that redefine perceptions and
					expectations.
				</p>

				<!-- <br /><br /> -->
				<div class="flex text-2xl mt-56 items-end">
					<p class="text-2xl text-gray-700 max-w-3xl mb-8 text-justify md:mb-0">
						In essence, Mella Studio is not just another studio; <span class="font-bold"
							>it’s a hub for creativity.</span
						>
					</p>
				</div>
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
