<script lang="ts">
	import hero1 from '$lib/assets/images/hero1.jpeg';
	import hero2 from '$lib/assets/images/hero2.jpeg';
	import hero3 from '$lib/assets/images/hero3.jpeg';
	import hero4 from '$lib/assets/images/hero4.jpeg';
	import hero5 from '$lib/assets/images/hero5.jpeg';
	import hero6 from '$lib/assets/images/hero6.jpeg';
	import hero7 from '$lib/assets/images/hero7.jpeg';
	import hero8 from '$lib/assets/images/hero8.jpeg';
	import hero9 from '$lib/assets/images/hero9.jpg';
	import hero10 from '$lib/assets/images/hero10.jpg';

	// You can import specific images or use a dynamic import based on your project setup
	let heroImages = [
		hero2, // Replace with actual image paths
		hero1, // Replace with actual image paths
		hero3, // Replace with actual image paths
		hero4, // Replace with actual image paths
		hero5, // Replace with actual image paths
		hero6, // Replace with actual image paths
		hero7, // Replace with actual image paths
		hero8, // Replace with actual image paths
		hero9,
		hero10
		// Add more images as needed
	];
	let currentImageIndex = 0;

	// Function to cycle through images if implementing a carousel
	function cycleImages() {
		currentImageIndex = (currentImageIndex + 1) % heroImages.length;
		return heroImages[currentImageIndex];
	}

	// Optional: Set an interval for cycling images if you're using a carousel
	// setInterval(cycleImages, 5000); // Change image every 5 seconds
</script>

<div class="relative max-sm:mx-auto w-full overflow-hidden" style="height: 50vh;">
	<img
		src={hero10}
		alt="Mella Studio Product"
		class="w-full h-full overflow-clip object-cover object-center"
	/>

	<!-- Overlay: Semi-transparent black background -->
	<div class="absolute inset-0 bg-black bg-opacity-20"></div>

	<div
		class="absolute ml-16 mx-auto left-1/4 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-left z-10 p-4"
	>
		<h1
			class="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-snug"
		>
			Elevate Your Space with<br /> Mella Studio
		</h1>
		<p class="text-sm sm:text-base md:text-lg lg:text-xl text-white mt-4">
			Handcrafted lighting and innovative architectural designs
		</p>
		<a
			href="#products"
			class="inline-block bg-primary text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 hover:text-primary rounded-lg shadow hover:bg-secondary transition duration-300 mt-4 sm:mt-6"
			>Explore Our Collection</a
		>
	</div>
</div>

<style>
	/* Additional custom styles if needed */
	.header {
		top: 60%;
	}
	/* Ensure the .header class is responsive */
	@media (min-width: 640px) {
		/* Adjust for md screens */
		.header {
			top: 50%;
		}
	}

	@media (min-width: 768px) {
		/* Adjust for lg screens */
		.header {
			top: 50%;
		}
	}

	@media (min-width: 1024px) {
		/* Adjust for xl screens */
		.header {
			top: 50%;
		}
	}
</style>
