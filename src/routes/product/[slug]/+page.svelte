<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import type { PageData } from './$types';
	import type { Product, ProductVariant, Review } from './+page.server';
	import { cartStore } from '$lib/stores/cart';
	import { browser } from '$app/environment';
	import Navbar from '$lib/components/Navbar.svelte';

	// Component props
	export let data: PageData;

	// Component state
	let selectedImageIndex = 0;
	let selectedVariant: ProductVariant | null = null;
	let quantity = 1;

	// Expandable sections state
	let expandedSpecSections = {
		measurements: false,
		specifications: false,
		dimensions: false
	};

	// Initialize product data and first variant
	$: product = data.product;
	$: if (product && !selectedVariant) {
		selectedVariant = product.variants[0];
	}

	// Helper functions
	function selectImage(index: number) {
		selectedImageIndex = index;
	}

	function selectVariant(variant: ProductVariant) {
		selectedVariant = variant;
		// If variant has a specific image, switch to it or find it in the product images
		if (variant.imageUrl) {
			// Find the image index that matches this variant's image
			const variantImageIndex = product?.productImages.findIndex(
				(img) => img.url === variant.imageUrl
			);
			if (variantImageIndex !== undefined && variantImageIndex >= 0) {
				selectedImageIndex = variantImageIndex;
			}
		}
	}

	function toggleSpecSection(section: keyof typeof expandedSpecSections) {
		expandedSpecSections[section] = !expandedSpecSections[section];
	}

	function navigateToProduct(slug: string) {
		window.location.href = `/product/${slug}`;
	}

	function addToCart() {
		if (!product || !selectedVariant) return;

		const cartItem = {
			id: product.slug,
			name: product.name,
			price: selectedVariant.price || product.price,
			imageUrl: product.imageUrl,
			variant: {
				id: selectedVariant.id,
				name: selectedVariant.name,
				colorName: selectedVariant.colorName
			}
		};

		cartStore.addItem(cartItem, quantity);

		// Show success message (could be replaced with a toast notification)
		alert(`Added ${quantity}x ${product.name} (${selectedVariant.colorName}) to cart!`);
	}

	function generateStars(rating: number): string {
		const fullStars = Math.floor(rating);
		const hasHalfStar = rating % 1 !== 0;
		let stars = '★'.repeat(fullStars);
		if (hasHalfStar) stars += '☆';
		return stars;
	}

	function formatPrice(price: number): string {
		return `$${price.toLocaleString()}`;
	}

	// SEO and structured data helpers
	function getPageTitle(): string {
		return (
			product?.seo.metaTitle || `${product?.name} - MellaStudio | Handcrafted Ethiopian Lighting`
		);
	}

	function getPageDescription(): string {
		return product?.seo.metaDescription || product?.shortDescription || '';
	}

	function getStructuredData() {
		if (!product) return '';

		const structuredData = {
			'@context': 'https://schema.org/',
			'@type': 'Product',
			name: product.name,
			image: product.imageUrl,
			description: product.description,
			sku: product.seo.structuredData.sku,
			mpn: product.seo.structuredData.mpn,
			brand: {
				'@type': 'Brand',
				name: product.seo.structuredData.brand
			},
			offers: {
				'@type': 'Offer',
				url: browser ? window.location.href : '',
				priceCurrency: 'ETB',
				price: product.price,
				availability: `https://schema.org/${product.seo.structuredData.availability}`,
				itemCondition: `https://schema.org/${product.seo.structuredData.condition}Product`
			},
			aggregateRating: {
				'@type': 'AggregateRating',
				ratingValue: product.rating,
				reviewCount: product.reviewCount
			},
			review: product.reviewsSection.reviews.map((review) => ({
				'@type': 'Review',
				reviewRating: {
					'@type': 'Rating',
					ratingValue: review.rating,
					bestRating: '5'
				},
				author: {
					'@type': 'Person',
					name: review.customerName
				},
				reviewBody: review.content,
				datePublished: review.date
			}))
		};

		return JSON.stringify(structuredData);
	}

	// Calculate recommendation percentage for reviews
	function getRecommendationPercentage(): number {
		if (!product?.reviewsSection.reviews.length) return 0;
		const recommendedCount = product.reviewsSection.reviews.filter((r) => r.isRecommended).length;
		return Math.round((recommendedCount / product.reviewsSection.reviews.length) * 100);
	}
</script>

<svelte:head>
	{#if product}
		<title>{getPageTitle()}</title>
		<meta name="description" content={getPageDescription()} />
		<meta name="keywords" content={product.seo.keywords.join(', ')} />

		<!-- Open Graph -->
		<meta property="og:title" content={product.seo.openGraph.title || getPageTitle()} />
		<meta
			property="og:description"
			content={product.seo.openGraph.description || getPageDescription()}
		/>
		<meta property="og:image" content={product.seo.openGraph.image || product.imageUrl} />
		<meta property="og:image:alt" content={product.seo.openGraph.imageAlt || product.name} />
		<meta property="og:type" content="product" />

		<!-- Twitter Card -->
		<meta name="twitter:card" content="summary_large_image" />
		<meta name="twitter:title" content={product.seo.openGraph.title || getPageTitle()} />
		<meta
			name="twitter:description"
			content={product.seo.openGraph.description || getPageDescription()}
		/>
		<meta name="twitter:image" content={product.seo.openGraph.image || product.imageUrl} />

		<!-- Structured Data -->
		{@html `<script type="application/ld+json">${getStructuredData()}</script>`}
	{:else}
		<title>Product - MellaStudio</title>
	{/if}
</svelte:head>

<!-- Navigation breadcrumb -->
<Navbar />
<main class="min-h-screen bg-mellastudio-very-light mt-20">
	{#if product}
		<!-- Product Detail Page -->
		<div class="max-w-[1800px] mx-auto px-6 sm:px-8 lg:px-12 py-16">
			<div class="grid grid-cols-1 xl:grid-cols-3 gap-16 2xl:gap-24">
				<!-- Image Gallery -->
				<div class="xl:col-span-2 flex gap-8" in:fly={{ x: -50, duration: 800, easing: quintOut }}>
					<!-- Image Thumbnails - Left Side Vertical -->
					<div class="flex flex-col gap-4 w-32 flex-shrink-0">
						{#each product.productImages as image, index}
							<button
								class="w-32 h-32 bg-gray-50 overflow-hidden border-2 transition-all duration-300 {selectedImageIndex ===
								index
									? 'border-black shadow-lg'
									: 'border-transparent hover:border-gray-300 hover:shadow-md'}"
								on:click={() => selectImage(index)}
							>
								<img src={image.url} alt={image.alt} class="w-full h-full object-cover" />
							</button>
						{/each}
					</div>

					<!-- Main Image -->
					<div class="flex-1">
						<div
							class="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden w-full shadow-2xl min-h-[700px] 2xl:min-h-[800px]"
						>
							<img
								src={product.productImages[selectedImageIndex]?.url || product.imageUrl}
								alt={product.productImages[selectedImageIndex]?.alt || product.name}
								class="w-full h-full object-cover transition-all duration-500 hover:scale-105"
							/>
						</div>
					</div>
				</div>

				<!-- Product Information -->
				<div
					class="xl:col-span-1 space-y-10"
					in:fly={{ x: 50, duration: 800, delay: 200, easing: quintOut }}
				>
					<!-- Product Header -->
					<div class="border-b border-gray-100 pb-8">
						{#if product.isSignature}
							<span
								class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-black to-gray-800 text-white text-xs font-semibold tracking-wider uppercase mb-6 rounded-full shadow-lg"
							>
								<span class="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
								SIGNATURE COLLECTION
							</span>
						{/if}

						<h1
							class="text-4xl xl:text-5xl font-extralight text-gray-900 mb-6 tracking-tight leading-tight"
						>
							{product.name}
						</h1>

						<!-- Rating -->
						<div class="flex items-center gap-4 mb-8">
							<span class="text-yellow-400 text-xl">{generateStars(product.rating)}</span>
							<span class="text-gray-700 font-semibold text-lg">{product.rating}</span>
							<span class="text-gray-500">({product.reviewCount} reviews)</span>
						</div>

						<!-- Price -->
						<div class="flex items-center gap-6 mb-8">
							<span class="text-4xl xl:text-4xl font-light text-gray-900">
								{formatPrice(selectedVariant?.price || product.price)}
							</span>
							{#if product.originalPrice && product.originalPrice > (selectedVariant?.price || product.price)}
								<span class="text-2xl text-gray-400 line-through">
									{formatPrice(product.originalPrice)}
								</span>
								<span
									class="px-3 py-1.5 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-semibold rounded-full shadow-md"
								>
									Save {Math.round(
										((product.originalPrice - (selectedVariant?.price || product.price)) /
											product.originalPrice) *
											100
									)}%
								</span>
							{/if}
						</div>

						<p class="text-gray-600 leading-relaxed text-lg">
							{product.shortDescription}
						</p>
					</div>

					<!-- Color/Variant Selection -->
					{#if product.variants && product.variants.length > 0}
						<div class="border-b border-gray-100 pb-8">
							<h3 class="text-xl font-medium text-gray-900 mb-6">
								Color: <span class="font-normal text-gray-600">{selectedVariant?.colorName}</span>
							</h3>
							<div class="flex gap-4">
								{#each product.variants as variant}
									<button
										class="w-16 h-16 rounded-full border-3 transition-all duration-300 shadow-md hover:shadow-lg {selectedVariant?.id ===
										variant.id
											? 'border-black scale-110 shadow-xl'
											: 'border-gray-300 hover:border-gray-500'}"
										style="background-color: {variant.colorHex}"
										on:click={() => selectVariant(variant)}
										disabled={!variant.inStock}
										title={variant.colorName}
									>
										{#if !variant.inStock}
											<div
												class="w-full h-full rounded-full bg-white/80 flex items-center justify-center"
											>
												<span class="text-sm text-gray-600">✕</span>
											</div>
										{/if}
										{#if selectedVariant?.id === variant.id}
											<div
												class="w-full h-full rounded-full border-2 border-white flex items-center justify-center"
											>
												<span class="text-white text-lg">✓</span>
											</div>
										{/if}
									</button>
								{/each}
							</div>
						</div>
					{/if}

					<!-- Quantity & Add to Cart -->
					<div class="border-b border-gray-100 pb-8">
						<div class="flex items-center gap-6 mb-8">
							<div class="flex items-center border-2 border-gray-200 overflow-hidden">
								<button
									class="px-6 py-3 hover:bg-gray-50 transition-colors text-lg font-medium"
									on:click={() => (quantity = Math.max(1, quantity - 1))}
								>
									−
								</button>
								<span
									class="px-6 py-3 border-x-2 border-gray-200 min-w-[80px] text-center text-lg font-medium"
									>{quantity}</span
								>
								<button
									class="px-6 py-3 hover:bg-gray-50 transition-colors text-lg font-medium"
									on:click={() => (quantity += 1)}
								>
									+
								</button>
							</div>
							<span class="text-gray-600 font-medium">
								{product.stockQuantity > 10
									? '✅ In Stock'
									: `⚡ Only ${product.stockQuantity} left`}
							</span>
						</div>

						<button
							class="w-full bg-gradient-to-r from-black to-gray-800 text-white py-5 text-lg font-semibold tracking-wider uppercase hover:from-gray-900 hover:to-black transition-all duration-300 mb-6 disabled:bg-gray-300 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
							on:click={addToCart}
							disabled={!product.inStock || !selectedVariant?.inStock}
						>
							{!product.inStock ? 'Out of Stock' : 'Add to Cart'}
						</button>

						{#if product.freeShippingEligible}
							<p class="text-green-600 font-semibold flex items-center gap-2 text-lg">
								<span class="text-green-500">🚚</span> Free shipping worldwide
							</p>
						{/if}
					</div>

					<!-- Key Features -->
					<div class="border-b border-gray-100 pb-8">
						<h3 class="text-2xl font-medium text-gray-900 mb-6">Key Features</h3>
						<ul class="space-y-4">
							{#each product.features as feature}
								<li class="flex items-center gap-4 text-gray-700 text-lg">
									<span class="w-2 h-2 bg-gradient-to-r from-black to-gray-600 rounded-full"></span>
									{feature}
								</li>
							{/each}
						</ul>
					</div>

					<!-- Technical Specifications - Compact -->
					<div class="border-b border-gray-100 pb-8">
						<h3 class="text-2xl font-medium text-gray-900 mb-6">Specifications</h3>
						<div class="space-y-6">
							<!-- Dynamic Measurement Section -->
							<div class="space-y-4">
								<button
									class="w-full text-left flex justify-between items-center py-3 border-b border-gray-200/60 hover:border-gray-300 transition-colors duration-300"
									on:click={() => toggleSpecSection('measurements')}
								>
									<h4 class="text-lg font-medium text-gray-900">
										{product.specificationsSection.measurementSection.title}
									</h4>
									<svg
										class="w-4 h-4 text-gray-500 transition-transform duration-300 {expandedSpecSections.measurements
											? 'rotate-180'
											: ''}"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="1.5"
											d="M19 9l-7 7-7-7"
										/>
									</svg>
								</button>

								{#if expandedSpecSections.measurements}
									<div class="space-y-3 pt-2" transition:fade={{ duration: 200 }}>
										{#each product.specificationsSection.measurementSection.items as item}
											<div
												class="flex justify-between items-center py-2 border-b border-gray-100/60 last:border-b-0"
											>
												<span class="text-gray-600 font-medium text-sm">
													{item.label}
												</span>
												<span class="text-base font-medium text-gray-900">
													{item.value}
												</span>
											</div>
										{/each}
									</div>
								{/if}
							</div>

							<!-- Dynamic Specs Section -->
							<div class="space-y-4">
								<button
									class="w-full text-left flex justify-between items-center py-3 border-b border-gray-200/60 hover:border-gray-300 transition-colors duration-300"
									on:click={() => toggleSpecSection('specifications')}
								>
									<h4 class="text-lg font-medium text-gray-900">
										{product.specificationsSection.specsSection.title}
									</h4>
									<svg
										class="w-4 h-4 text-gray-500 transition-transform duration-300 {expandedSpecSections.specifications
											? 'rotate-180'
											: ''}"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="1.5"
											d="M19 9l-7 7-7-7"
										/>
									</svg>
								</button>

								{#if expandedSpecSections.specifications}
									<div class="space-y-3 pt-2" transition:fade={{ duration: 200 }}>
										{#each product.specificationsSection.specsSection.items as spec}
											<div
												class="flex justify-between items-center py-2 border-b border-gray-100/60 last:border-b-0"
											>
												<span class="text-gray-600 font-medium text-sm flex items-center gap-2">
													{#if spec.icon}
														<span class="text-sm opacity-60">{spec.icon}</span>
													{/if}
													{spec.label}
												</span>
												<span class="text-base font-medium text-gray-900">
													{spec.value}
												</span>
											</div>
										{/each}
									</div>
								{/if}
							</div>

							<!-- Technical Diagram Dimensions -->
							{#if product.technicalDiagram.showDimensions && product.technicalDiagram.dimensions}
								<div class="space-y-4">
									<button
										class="w-full text-left flex justify-between items-center py-3 border-b border-gray-200/60 hover:border-gray-300 transition-colors duration-300"
										on:click={() => toggleSpecSection('dimensions')}
									>
										<h4 class="text-lg font-medium text-gray-900">Technical Dimensions</h4>
										<svg
											class="w-4 h-4 text-gray-500 transition-transform duration-300 {expandedSpecSections.dimensions
												? 'rotate-180'
												: ''}"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="1.5"
												d="M19 9l-7 7-7-7"
											/>
										</svg>
									</button>

									{#if expandedSpecSections.dimensions}
										<div class="space-y-3 pt-2" transition:fade={{ duration: 200 }}>
											{#each product.technicalDiagram.dimensions as dimension}
												<div
													class="flex justify-between items-center py-2 border-b border-gray-100/60 last:border-b-0"
												>
													<span class="text-gray-600 font-medium text-sm">{dimension.label}</span>
													<span class="text-base font-medium text-gray-900">{dimension.value}</span>
												</div>
											{/each}
										</div>
									{/if}
								</div>
							{/if}
						</div>
					</div>
				</div>
			</div>

			<!-- Related Products Section - CMS Ready -->
			{#if product.relatedProducts && product.relatedProducts.length > 0}
				<div class="mt-20 border-t border-gray-200 pt-16">
					<div class="text-center mb-16">
						<h2 class="text-4xl font-light text-gray-900 tracking-tight mb-4">You May Also Love</h2>
						<p class="text-lg text-gray-600">Discover more pieces from our curated collection</p>
					</div>

					<!-- Related Products Grid - Matches FeaturedProducts styling -->
					<div class="max-w-screen-2xl mx-auto">
						<div
							class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-16 lg:gap-20 xl:gap-28 2xl:gap-32"
						>
							{#each product.relatedProducts as relatedProduct, index}
								<div
									class="group relative cursor-pointer"
									in:fly={{
										y: 60,
										duration: 800,
										delay: 200 + index * 150,
										easing: quintOut
									}}
									on:click={() => navigateToProduct(relatedProduct.slug)}
									on:keydown={(e) => e.key === 'Enter' && navigateToProduct(relatedProduct.slug)}
									role="button"
									tabindex="0"
								>
									<!-- Product Card -->
									<div class="relative bg-gray-50 overflow-hidden" style="aspect-ratio: 4/5;">
										<!-- Product Image with Seamless Crossfade -->
										<div class="relative w-full h-full">
											<!-- Default Image -->
											<img
												src={relatedProduct.imageUrl}
												alt={relatedProduct.name}
												class="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
												class:opacity-100={true}
												class:opacity-0={false}
												loading="lazy"
											/>

											<!-- Lit/Hover Image -->
											{#if relatedProduct.imageUrlLit && relatedProduct.imageUrlLit !== relatedProduct.imageUrl}
												<img
													src={relatedProduct.imageUrlLit}
													alt={`${relatedProduct.name} lit`}
													class="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out opacity-0 group-hover:opacity-100"
													loading="lazy"
												/>
											{/if}
										</div>

										<!-- Signature Badge -->
										{#if relatedProduct.isSignature}
											<div class="absolute top-8 left-8 z-20">
												<span
													class="px-5 py-2.5 bg-black text-white text-xs font-medium tracking-[0.15em] uppercase"
												>
													SIGNATURE
												</span>
											</div>
										{/if}

										<!-- Elegant Explore Look Button - Slides from Left on Hover -->
										<div
											class="absolute -left-1 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-400"
										>
											<button
												class="w-24 h-24 bg-black text-white rounded-full flex flex-col items-center justify-center hover:bg-gray-900 hover:scale-105 transition-all duration-300 shadow-xl"
												on:click|stopPropagation={() => navigateToProduct(relatedProduct.slug)}
												aria-label="View product"
											>
												<span class="text-xs font-medium tracking-wide uppercase leading-tight">
													VIEW
												</span>
												<span class="text-xs font-medium tracking-wide uppercase leading-tight">
													PRODUCT
												</span>
											</button>
										</div>

										<!-- Sold Out Overlay -->
										{#if relatedProduct.isSoldOut}
											<div class="absolute inset-0 bg-white/95 flex items-center justify-center">
												<span class="text-gray-900 text-2xl font-light tracking-[0.2em] uppercase">
													SOLD OUT
												</span>
											</div>
										{/if}
									</div>

									<!-- Product Info -->
									<div class="mt-10 space-y-4">
										<!-- Rating -->
										{#if relatedProduct.rating}
											<div class="flex items-center gap-3 text-base">
												<span class="text-yellow-400 text-lg"
													>{generateStars(relatedProduct.rating)}</span
												>
												<span class="text-gray-600 font-medium">{relatedProduct.rating}</span>
												<span class="text-gray-400">({relatedProduct.reviewCount})</span>
											</div>
										{/if}

										<!-- Product Name -->
										<h3
											class="text-2xl font-light text-gray-900 uppercase tracking-[0.1em] hover:text-gray-600 transition-colors"
										>
											{relatedProduct.name}
										</h3>

										<!-- Price -->
										<div class="flex items-center gap-5">
											<span class="text-2xl font-medium text-gray-900">
												{formatPrice(relatedProduct.price)}
											</span>
											{#if relatedProduct.originalPrice && relatedProduct.originalPrice > relatedProduct.price}
												<span class="text-lg text-gray-400 line-through">
													{formatPrice(relatedProduct.originalPrice)}
												</span>
											{/if}
										</div>

										<!-- Cultural Story -->
										{#if relatedProduct.culturalStory}
											<p
												class="text-base text-gray-600 italic leading-relaxed mt-6 max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-400"
											>
												"{relatedProduct.culturalStory}"
											</p>
										{/if}
									</div>
								</div>
							{/each}
						</div>
					</div>

					<!-- View All Products CTA -->
					<div class="text-center mt-16">
						<a
							href="/collection"
							class="inline-block bg-black text-white px-12 py-4 font-semibold tracking-wide uppercase hover:bg-gray-900 transition-colors duration-300"
						>
							EXPLORE FULL COLLECTION
						</a>
					</div>
				</div>
			{/if}

			<!-- Reviews Section - Elegant & Minimal -->
			<div class="mt-32 pt-20">
				<div class="max-w-5xl mx-auto">
					<!-- Section Header with Subtle Divider -->
					<div class="text-center mb-20">
						<div class="inline-flex items-center gap-8 mb-8">
							<div class="w-16 h-px bg-gradient-to-r from-transparent to-gray-300"></div>
							<h2 class="text-3xl font-extralight text-gray-900 tracking-[0.2em] uppercase">
								{product.reviewsSection.title}
							</h2>
							<div class="w-16 h-px bg-gradient-to-l from-transparent to-gray-300"></div>
						</div>

						{#if product.reviewsSection.subtitle}
							<p class="text-gray-500 font-light italic text-lg max-w-xl mx-auto leading-relaxed">
								{product.reviewsSection.subtitle}
							</p>
						{/if}

						<!-- Elegant Rating Summary -->
						{#if product.reviewsSection.showRatingSummary}
							<div class="mt-12 inline-flex items-center gap-4">
								<span class="text-yellow-400 text-xl tracking-wide"
									>{generateStars(product.rating)}</span
								>
								<span class="text-2xl font-light text-gray-900">{product.rating}</span>
								<span class="text-gray-500 font-light">from {product.reviewCount} reviews</span>
							</div>

							{#if product.reviewsSection.ratingSummaryText}
								<p class="text-sm text-gray-400 mt-6 font-light">
									{getRecommendationPercentage()}% recommend this piece
								</p>
							{/if}
						{/if}
					</div>

					<!-- Refined Individual Reviews -->
					{#if product.reviewsSection.reviews && product.reviewsSection.reviews.length > 0}
						<div class="space-y-20 max-w-4xl mx-auto">
							{#each product.reviewsSection.reviews as review}
								<article class="relative" itemscope itemtype="https://schema.org/Review">
									<!-- Review Header -->
									<header class="flex justify-between items-start mb-8">
										<div class="space-y-3">
											<h4
												class="font-light text-gray-900 text-2xl tracking-wide"
												itemprop="author"
												itemscope
												itemtype="https://schema.org/Person"
											>
												<span itemprop="name">{review.customerName}</span>
											</h4>
											<p class="text-xs text-gray-400 tracking-[0.2em] uppercase font-light">
												{review.customerLocation}
												{#if review.isVerifiedBuyer}
													• Verified Purchase
												{/if}
											</p>
										</div>

										<div class="text-right space-y-2">
											<div
												class="text-yellow-400 text-xl"
												itemprop="reviewRating"
												itemscope
												itemtype="https://schema.org/Rating"
											>
												<meta itemprop="ratingValue" content={review.rating.toString()} />
												<meta itemprop="bestRating" content="5" />
												{generateStars(review.rating)}
											</div>
											<time
												class="text-xs text-gray-400 font-light block"
												itemprop="datePublished"
												datetime={review.date}
											>
												{review.date}
											</time>
										</div>
									</header>

									<!-- Review Content -->
									<div class="space-y-6">
										<h5
											class="text-xl font-light text-gray-900 italic leading-relaxed"
											itemprop="name"
										>
											"{review.title}"
										</h5>

										<p
											class="text-gray-600 leading-relaxed font-light text-lg max-w-3xl"
											itemprop="reviewBody"
										>
											{review.content}
										</p>
									</div>

									<!-- Review Footer -->
									<footer class="mt-8 flex items-center justify-between text-sm">
										{#if review.isRecommended}
											<span class="text-gray-500 font-light"> Recommends this piece </span>
										{:else}
											<span></span>
										{/if}

										{#if review.helpfulCount && review.helpfulCount > 0}
											<span class="text-gray-400 font-light">
												{review.helpfulCount} found helpful
											</span>
										{/if}
									</footer>

									<!-- Subtle Divider -->
									<div class="mt-12 w-24 h-px bg-gray-200 mx-auto"></div>
								</article>
							{/each}
						</div>
					{/if}

					<!-- Elegant Write Review Button -->
					{#if product.reviewsSection.showWriteReviewButton}
						<div class="text-center mt-16">
							<button
								class="group inline-flex items-center gap-3 text-gray-600 hover:text-gray-900 transition-colors duration-300"
							>
								<span
									class="w-8 h-px bg-gray-300 group-hover:bg-gray-600 transition-colors duration-300"
								></span>
								<span class="font-light tracking-[0.1em] uppercase text-sm">
									{product.reviewsSection.writeReviewButtonText}
								</span>
								<span
									class="w-8 h-px bg-gray-300 group-hover:bg-gray-600 transition-colors duration-300"
								></span>
							</button>
						</div>
					{/if}
				</div>
			</div>

			<!-- Warranty & Care - Elegant & Minimal -->
			<div class="mt-32 py-20">
				<div class="max-w-4xl mx-auto">
					<!-- Section Header -->
					<div class="text-center mb-20">
						<div class="inline-flex items-center gap-8 mb-8">
							<div class="w-16 h-px bg-gradient-to-r from-transparent to-gray-300"></div>
							<h3 class="text-2xl font-extralight text-gray-900 tracking-[0.25em] uppercase">
								Care & Confidence
							</h3>
							<div class="w-16 h-px bg-gradient-to-l from-transparent to-gray-300"></div>
						</div>
						<p class="text-gray-500 font-light italic max-w-2xl mx-auto leading-relaxed">
							Every piece is backed by our commitment to exceptional craftsmanship
						</p>
					</div>

					<!-- Clean Layout -->
					<div class="grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-32">
						<!-- Warranty -->
						<div class="text-center md:text-left space-y-8">
							<div class="space-y-4">
								<h4 class="text-2xl font-light text-gray-900 tracking-wide">Warranty Protection</h4>
								<div class="w-12 h-px bg-gray-300 mx-auto md:mx-0"></div>
							</div>

							<p class="text-gray-600 font-light leading-relaxed text-lg max-w-md mx-auto md:mx-0">
								{product.warranty}
							</p>

							<p class="text-sm text-gray-500 font-light">Comprehensive coverage included</p>
						</div>

						<!-- Returns -->
						<div class="text-center md:text-left space-y-8">
							<div class="space-y-4">
								<h4 class="text-2xl font-light text-gray-900 tracking-wide">Easy Returns</h4>
								<div class="w-12 h-px bg-gray-300 mx-auto md:mx-0"></div>
							</div>

							<p class="text-gray-600 font-light leading-relaxed text-lg max-w-md mx-auto md:mx-0">
								{product.returns.policy}
							</p>

							<p class="text-sm text-gray-500 font-light">Seamless return experience</p>
						</div>
					</div>
				</div>
			</div>

			<!-- Cultural Story & Heritage - Clean -->
			<div class="mt-32 py-24" in:fly={{ y: 50, duration: 800, delay: 400, easing: quintOut }}>
				<div class="max-w-5xl mx-auto px-6">
					<!-- Section Header -->
					<div class="text-center mb-20">
						<div class="inline-flex items-center gap-8 mb-8">
							<div
								class="w-20 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"
							></div>
							<h2 class="text-3xl font-extralight text-gray-900 tracking-[0.3em] uppercase">
								The Story Behind
							</h2>
							<div
								class="w-20 h-px bg-gradient-to-l from-transparent via-gray-300 to-transparent"
							></div>
						</div>
						<p class="text-gray-500 font-light italic text-lg max-w-2xl mx-auto leading-relaxed">
							Each piece carries the soul of Ethiopian craftsmanship, bridging ancient traditions
							with contemporary elegance
						</p>
					</div>

					<!-- Content Layout -->
					<div class="relative">
						<!-- Decorative Central Line -->
						<div
							class="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent transform -translate-x-1/2"
						></div>

						<div class="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20">
							<!-- Cultural Heritage -->
							<div class="space-y-8 md:pr-8">
								<div class="space-y-6">
									<div class="inline-flex items-center gap-3 mb-8">
										<div
											class="w-2 h-2 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full"
										></div>
										<h3 class="text-xl font-light text-gray-900 tracking-[0.15em] uppercase">
											Cultural Heritage
										</h3>
									</div>

									<!-- Quote-style story -->
									<div class="relative">
										<div class="absolute -left-4 -top-2">
											<span class="text-4xl text-gray-200 font-serif leading-none">"</span>
										</div>
										<blockquote
											class="text-gray-600 font-light leading-relaxed text-lg italic pl-8 border-l border-gray-200/60"
										>
											{product.culturalStory}
										</blockquote>
									</div>
								</div>

								<!-- Artisan Details -->
								<div class="space-y-4 pt-8 border-t border-gray-200/60">
									<div class="space-y-2">
										<span class="text-xs text-gray-500 font-light tracking-[0.2em] uppercase"
											>Artisan</span
										>
										<p class="text-gray-900 font-light text-xl">{product.artisan}</p>
									</div>
									<p class="text-gray-500 text-sm font-light">
										{product.craftingTime} creation time
									</p>
								</div>
							</div>

							<!-- Craftsmanship -->
							<div class="space-y-8 md:pl-8">
								<div class="space-y-6">
									<div class="inline-flex items-center gap-3 mb-8">
										<div
											class="w-2 h-2 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full"
										></div>
										<h3 class="text-xl font-light text-gray-900 tracking-[0.15em] uppercase">
											Craftsmanship
										</h3>
									</div>

									<div class="prose prose-gray max-w-none">
										<p
											class="text-gray-600 font-light leading-relaxed text-lg first-letter:text-4xl first-letter:font-light first-letter:text-gray-900 first-letter:float-left first-letter:mr-2 first-letter:mt-1"
										>
											{product.description}
										</p>
									</div>
								</div>

								<!-- Craftsmanship Details -->
								<div class="space-y-6 pt-8 border-t border-gray-200/60">
									<span class="text-xs text-gray-500 font-light tracking-[0.2em] uppercase"
										>Handcrafted Excellence</span
									>
									<div class="space-y-4 text-sm text-gray-600 font-light">
										<p>Traditional Ethiopian techniques</p>
										<p>Sustainable materials & practices</p>
										<p>Unique, one-of-a-kind piece</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	{/if}
</main>

<style>
	/* Loading animation */
	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.animate-spin {
		animation: spin 1s linear infinite;
	}
</style>
