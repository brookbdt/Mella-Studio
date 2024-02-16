<script lang="ts">
	import alllights from '$lib/assets/images/alllights.jpeg';
	import alldrawings from '$lib/assets/images/alldrawings.jpeg';
	import valentines from '$lib/assets/images/valentines.jpg';
</script>

<section class="py-12 bg-secondary text-tertiary">
	<div class="container mx-auto max-w-4xl">
		<div class="text-center mb-12">
			<h2 class="text-3xl md:text-4xl font-light mb-4">About Mella Studio</h2>
			<p class="text-lg">Crafting Unique Experiences Through Design</p>
		</div>

		<div class="flex flex-wrap -mx-4">
			<div class="w-full md:w-1/2 px-4 mb-8 md:mb-0 overflow-hidden">
				<div class="mb-6 md:mb-8 perspective">
					<img
						src={valentines}
						alt="Mella Studio Craftsmanship"
						class="rounded-lg shadow-lg transform-gpu hover:scale-105 transition-transform duration-700 ease-in-out hover:rotate-3d hover:cursor-pointer"
					/>
				</div>
			</div>
			<div class="w-full md:w-1/2 px-4 flex flex-col justify-center items-center">
				<p class="mb-4 text-justify">
					At Mella Studio, we blend traditional arts and crafts with modern design principles to
					create one-of-a-kind light products and architectural solutions. Our approach is deeply
					rooted in the rich cultural heritage of Ethiopia, and each piece we craft tells a story of
					meticulous craftsmanship and innovative design.
				</p>
				<p class="mb-4 text-justify">
					Led by a team of visionary architects, Mella Studio is on a mission to redefine the
					boundaries of design. Our work is not just about creating objects or spaces; it's about
					fostering a creative and productive community that transcends borders and brings Ethiopian
					artistry to the forefront of the global design scene.
				</p>
				<p class="text-justify">
					Join us in our journey to illuminate the world with the unique spirit of Ethiopian
					craftsmanship.
				</p>
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
</style>
