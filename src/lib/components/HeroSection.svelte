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

<div class="relative h-screen w-full overflow-hidden" style="height: 50vh;">
	<img src={hero10} alt="Mella Studio Product" class="w-full h-full object-cover object-center" />

	<!-- Overlay: Semi-transparent black background -->
	<div class="absolute inset-0 bg-black bg-opacity-50"></div>

	<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10">
		<h1 class="text-4xl md:text-6xl text-white font-bold">Elevate Your Space with Mella Studio</h1>
		<p class="text-xl text-white mt-4 mb-4">
			Handcrafted lighting and innovative architectural designs
		</p>
		<a
			href="#products"
			class="bg-primary text-white font-semibold px-6 py-3 hover:text-primary rounded-lg shadow hover:bg-secondary transition duration-300 mt-6"
			>Explore Our Collection</a
		>
	</div>
</div>

<style>
	/* Additional custom styles if needed */
</style>
