<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { goto } from '$app/navigation';

	// Import CMS functionality
	import {
		featuredProducts,
		productsLoading,
		productsError,
		productsReady,
		publishedFeaturedProducts,
		fetchFeaturedProducts,
		formatProductPrice,
		type FeaturedProduct
	} from '$lib/cms/products';

	// CMS-ready component props
	export let sectionTitle: string = 'SHOP THE LOOK';
	export let sectionSubtitle: string = 'ENDLESS INSPIRATION FOR STYLING YOUR NEW LIGHTS';
	export let sectionDescription: string =
		'Designer lighting without the designer markup. Our lamps are timeless pieces that never truly go out of style. At Mella Studio, we offer innovative, contemporary lighting with designs to complement any space.';
	export let ctaText: string = 'SHOP ALL';
	export let ctaLink: string = '/collection';
	export let showPricing: boolean = true;
	export let showRatings: boolean = false; // Disabled for CMS - ratings not in CMS data
	export let backgroundColor: string = 'bg-white';
	export let limit: number = 3; // Number of products to display

	// State management
	let sectionElement: HTMLElement;
	let isVisible = false;
	let hoveredProduct: string | null = null;

	onMount(() => {
		// Fetch featured products from CMS
		fetchFeaturedProducts(5).catch((error) => {
			console.error('Failed to load featured products:', error);
		});

		// Set up intersection observer for animations
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						isVisible = true;
					}
				});
			},
			{ threshold: 0.1 }
		);

		if (sectionElement) {
			observer.observe(sectionElement);
		}

		return () => observer.disconnect();
	});

	// Handle product click navigation
	function handleProductClick(product: FeaturedProduct) {
		// Use slug from CMS or create from name
		const slug =
			product.slug ||
			product.name
				.toLowerCase()
				.replace(/[^a-z0-9]+/g, '-')
				.replace(/(^-|-$)/g, '');

		// Navigate to product detail page
		goto(`/product/${slug}`);
	}

	// Get primary image from product images array
	function getPrimaryImage(product: FeaturedProduct): string {
		if (product.images && product.images.length > 0) {
			return product.images[0].fileUrl || product.images[0].fileKey;
		}
		return '/src/lib/assets/images/placeholder.jpg'; // Fallback image
	}

	// Get lit/hover image from product images array
	function getLitImage(product: FeaturedProduct): string | null {
		if (product.images && product.images.length > 1) {
			// Look for a second image or one with 'lit' or 'night' in the name
			const litImage =
				product.images.find(
					(img) =>
						img.fileName?.toLowerCase().includes('lit') ||
						img.fileName?.toLowerCase().includes('night')
				) || product.images[1];

			return litImage?.fileUrl || litImage?.fileKey || null;
		}
		return null;
	}
</script>

<section bind:this={sectionElement} class="relative py-20 lg:py-32 overflow-hidden">
	<!-- Background Elements -->
	<div class="absolute inset-0 opacity-3">
		<div
			class="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-amber-100 to-transparent rounded-full blur-3xl"
		></div>
		<div
			class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-radial from-yellow-100 to-transparent rounded-full blur-3xl"
		></div>
	</div>

	<div class="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
		<!-- Header Section -->
		{#if isVisible}
			<div class="text-center mb-24 w-full">
				<div class="mb-8" in:fly={{ y: 30, duration: 800, delay: 200, easing: quintOut }}>
					<span class="text-sm font-medium tracking-[0.3em] text-gray-500 uppercase">
						MELLA STUDIO
					</span>
				</div>

				<div class="flex justify-center mb-12">
					<h2
						class="text-5xl md:text-6xl lg:text-7xl xl:text-9xl 2xl:text-8xl font-normal text-gray-800 tracking-tight leading-none whitespace-nowrap"
						in:fly={{ y: 50, duration: 1000, delay: 400, easing: quintOut }}
					>
						{sectionTitle}
					</h2>
				</div>

				<div
					class="mb-16 max-w-5xl mx-auto"
					in:fly={{ y: 30, duration: 800, delay: 600, easing: quintOut }}
				>
					<h3 class="text-xl font-medium tracking-[0.2em] text-gray-700 uppercase mb-8">
						{sectionSubtitle}
					</h3>
					<p class="text-2xl text-gray-600 leading-relaxed">
						{sectionDescription}
					</p>
				</div>
			</div>
		{/if}

		<!-- Products Grid - Huge Products, Max 3 Columns -->
		<div class="max-w-screen-2xl mx-auto">
			{#if $productsLoading}
				<div class="flex justify-center items-center py-20">
					<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
				</div>
			{:else if $productsError}
				<div class="text-center py-20">
					<p class="text-red-600 mb-4">Error loading products: {$productsError}</p>
					<button
						class="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-700"
						on:click={() => fetchFeaturedProducts(limit)}
					>
						Retry
					</button>
				</div>
			{:else}
				<div
					class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-16 lg:gap-20 xl:gap-28 2xl:gap-32 mb-24"
				>
					{#each $publishedFeaturedProducts as product, index}
						{#if isVisible}
							<div
								class="group relative"
								in:fly={{
									y: 60,
									duration: 800,
									delay: 800 + index * 150,
									easing: quintOut
								}}
								on:mouseenter={() => (hoveredProduct = product.id)}
								on:mouseleave={() => (hoveredProduct = null)}
							>
								<!-- Product Card - Much Larger -->
								<div
									class="relative bg-gray-50 overflow-hidden cursor-pointer"
									style="aspect-ratio: 4/5;"
								>
									<!-- Product Image with Seamless Crossfade -->
									<div class="relative w-full h-full">
										<!-- Default Image -->
										<img
											src={getPrimaryImage(product)}
											alt={product.name}
											class="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
											class:opacity-100={hoveredProduct !== product.id}
											class:opacity-0={hoveredProduct === product.id && getLitImage(product)}
											loading="lazy"
										/>

										<!-- Lit/Hover Image -->
										{#if getLitImage(product)}
											<img
												src={getLitImage(product)}
												alt={`${product.name} lit`}
												class="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
												class:opacity-0={hoveredProduct !== product.id}
												class:opacity-100={hoveredProduct === product.id}
												loading="lazy"
											/>
										{/if}

										<!-- Status Badge -->
										{#if product.status === 'featured'}
											<div class="absolute top-8 left-8 z-20">
												<span
													class="px-5 py-2.5 bg-black text-white text-xs font-medium tracking-[0.15em] uppercase"
												>
													FEATURED
												</span>
											</div>
										{/if}

										<!-- Elegant Explore Look Button - Slides from Left -->
										{#if hoveredProduct === product.id}
											<div
												class="absolute -left-1 top-1/2 transform -translate-y-1/2"
												in:fly={{ x: -30, duration: 400, easing: quintOut }}
											>
												<button
													class="w-24 h-24 bg-black text-white rounded-full flex flex-col items-center justify-center hover:bg-gray-900 hover:scale-105 transition-all duration-300 shadow-xl"
													on:click={() => handleProductClick(product)}
													aria-label="Explore look"
												>
													<span class="text-xs font-medium tracking-wide uppercase leading-tight">
														EXPLORE
													</span>
													<span class="text-xs font-medium tracking-wide uppercase leading-tight">
														LOOK
													</span>
												</button>
											</div>
										{/if}

										<!-- Out of Stock Overlay -->
										{#if product.status !== 'published'}
											<div class="absolute inset-0 bg-white/95 flex items-center justify-center">
												<span class="text-gray-900 text-2xl font-light tracking-[0.2em] uppercase">
													{product.status?.toUpperCase() || 'UNAVAILABLE'}
												</span>
											</div>
										{/if}
									</div>
								</div>

								<!-- Product Info - More Spacious -->
								<div class="mt-10 space-y-4">
									<!-- Product Name -->
									<h3
										class="text-2xl font-normal text-gray-900 uppercase tracking-[0.1em] hover:text-gray-600 transition-colors cursor-pointer"
									>
										{product.name}
									</h3>

									<!-- Category -->
									{#if product.categoryName}
										<p class="text-sm text-gray-500 uppercase tracking-[0.1em]">
											{product.categoryName}
										</p>
									{/if}

									<!-- Price -->
									{#if showPricing && product.price}
										{@const priceInfo = formatProductPrice(product.price, product.originalPrice)}
										<div class="flex items-center gap-5">
											<span class="text-2xl font-medium text-gray-900">
												{priceInfo.price}
											</span>
											{#if priceInfo.hasDiscount && priceInfo.originalPrice}
												<span class="text-lg text-gray-400 line-through">
													{priceInfo.originalPrice}
												</span>
											{/if}
										</div>
									{/if}

									<!-- Short Description - Elegant Reveal -->
									{#if hoveredProduct === product.id && product.shortDescription}
										<p
											class="text-base text-gray-600 italic leading-relaxed mt-6 max-w-md"
											in:fade={{ duration: 400, delay: 200 }}
										>
											"{product.shortDescription}"
										</p>
									{/if}
								</div>
							</div>
						{/if}
					{/each}
				</div>
			{/if}
		</div>

		<!-- Call to Action -->
		{#if isVisible}
			<div
				class="text-center max-w-4xl mx-auto"
				in:fly={{ y: 30, duration: 800, delay: 1200, easing: quintOut }}
			>
				<a
					href={ctaLink}
					class="group inline-flex items-center gap-5 bg-black text-white px-20 py-6 font-light tracking-[0.15em] uppercase text-xl hover:bg-gray-900 transition-all duration-500"
				>
					<span>{ctaText}</span>
					<svg
						class="w-6 h-6 transform group-hover:translate-x-2 transition-transform duration-500"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7"
						></path>
					</svg>
				</a>
			</div>
		{/if}
	</div>
</section>

<style>
	/* Custom gradient utilities */
	/* .bg-gradient-radial {
		background: radial-gradient(circle, var(--tw-gradient-stops));
	} */

	/* Smooth focus states for accessibility */
	button:focus-visible {
		@apply outline-none ring-2 ring-gray-300 ring-offset-4 ring-offset-white;
	}

	/* Reduced motion support */
	@media (prefers-reduced-motion: reduce) {
		* {
			animation-duration: 0.01ms !important;
			animation-iteration-count: 1 !important;
			transition-duration: 0.01ms !important;
		}
	}

	/* Enhanced hover effects for luxury feel */
	.group:hover .group-hover\:scale-103 {
		transform: scale(1.03);
	}

	/* Typography enhancements */
	.tracking-tight {
		letter-spacing: -0.025em;
	}

	/* Premium shadow effects */
	.shadow-2xl {
		box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
	}

	/* Luxury spacing */
	.max-w-8xl {
		max-width: 88rem;
	}
</style>
