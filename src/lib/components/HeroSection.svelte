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
	import hero10small from '$lib/assets/images/hero10small.jpg';
</script>

<div class="container">
	<picture>
		<source media="(max-width: 768px)" srcset={hero10small} />
		<source media="(min-width: 769px)" srcset={hero10} />
		<img src={hero10} alt="Mella Studio Product" class="hero-image" />
	</picture>

	<div class="overlay"></div>

	<div class="content">
		<h1
			class="ext-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-snug"
		>
			Elevate Your Space with<br /> Mella Studio
		</h1>
		<p class="text-sm sm:text-base md:text-lg lg:text-xl text-white mt-4">
			Handcrafted lighting and innovative architectural designs
		</p>
		<a
			href="#products"
			class="explore-button inline-block bg-primary text-white font-semibold px-2 py-1 sm:px-4 sm:py-2 hover:text-primary rounded-lg shadow hover:bg-secondary transition duration-300 mt-4 sm:mt-6"
			>Explore Our Collection</a
		>
	</div>
</div>

<style>
	.container {
		position: relative;
		max-width: 100%;
		height: 50vh;
		overflow: hidden;
	}

	.hero-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.overlay {
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0.2);
	}

	.content {
		position: absolute;
		top: 50%;
		left: 35%;
		transform: translate(-50%, -50%);
		text-align: left;
		padding: 1em;
		color: white;
	}

	h1 {
		font-size: clamp(1.5rem, 5vw, 5rem);
	}

	p {
		margin-top: 1rem;
		font-size: clamp(0.8rem, 2vw, 1.5rem);
	}

	.explore-button {
		display: inline-block;
		background: var(--primary-color, #7a9360);
		color: white;
		padding: 0.5em 1em;
		margin-top: 1rem;
		border-radius: 0.5em;
		transition: background-color 0.3s ease;
	}

	.explore-button:hover {
		background: var(--secondary-color, green);
	}

	/* Additional media queries if needed */
</style>
