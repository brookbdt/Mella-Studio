<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	// CMS-Ready Props Interface
	export let sectionData = {
		badge: 'ARTISAN COLLECTION',
		title: 'SHOP THE LOOK',
		subtitle:
			'Each piece in our collection represents months of meticulous craftsmanship, where ancient Ethiopian artistry meets contemporary luxury lighting design.',
		backgroundGradient: 'linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)'
	};

	export let spaceInspiration = {
		title: 'Design Your Perfect Space',
		spaces: {
			'living-room': {
				title: 'Living Room Sanctuary',
				description: 'Create a warm, inviting atmosphere perfect for entertaining and relaxation',
				recommendedProducts: ['mender-pendant-001', 'ensosila-floor-001'],
				lightingTips: 'Layer ambient, task, and accent lighting for the perfect mood',
				backgroundImage: 'linear-gradient(135deg, #f8f9fa, #e2e8d8)'
			},
			bedroom: {
				title: 'Bedroom Retreat',
				description: 'Soft, intimate lighting for rest and reflection',
				recommendedProducts: ['qedamawi-table-001', 'tilet-table-001'],
				lightingTips: 'Use warm, dimmable lights to promote relaxation and better sleep',
				backgroundImage: 'linear-gradient(135deg, #f5f5f5, #e8ede4)'
			},
			'dining-room': {
				title: 'Dining Room Elegance',
				description: 'Statement lighting that elevates every meal into an occasion',
				recommendedProducts: ['mender-pendant-001'],
				lightingTips: 'Pendant lights should hang 30-36 inches above the dining table',
				backgroundImage: 'linear-gradient(135deg, #fafafa, #f0f4ed)'
			}
		}
	};

	export let shippingInfo = {
		title: 'International Shipping Available',
		rates: [
			{ flag: '🇺🇸', country: 'United States', rate: 'Free shipping', time: '3-5 days' },
			{ flag: '🇨🇦', country: 'Canada', rate: '$150', time: '5-7 days' },
			{ flag: '🇪🇺', country: 'Europe', rate: '$280', time: '7-10 days' },
			{ flag: '🇬🇧', country: 'United Kingdom', rate: '$250', time: '7-10 days' },
			{ flag: '🌍', country: 'Worldwide', rate: '$450', time: '14-21 days' }
		],
		note: 'All prices include white-glove delivery and installation consultation.'
	};

	// Import product images
	import Product1 from '$lib/assets/images/Product1.jpeg';
	import Product2 from '$lib/assets/images/Product2.jpeg';
	import Product5 from '$lib/assets/images/Product5.jpg';
	import new2 from '$lib/assets/images/new2.jpg';
	import new3 from '$lib/assets/images/new3.jpg';
	import new4 from '$lib/assets/images/new4.jpg';
	import new5 from '$lib/assets/images/new5.jpg';
	import new6 from '$lib/assets/images/new6.jpg';
	import new7 from '$lib/assets/images/new7.jpg';
	import new8 from '$lib/assets/images/new8.jpg';
	import new9 from '$lib/assets/images/new9.jpg';
	import new10 from '$lib/assets/images/new10.jpg';
	import new11 from '$lib/assets/images/new11.jpg';
	import new12 from '$lib/assets/images/new12.jpg';
	import new13 from '$lib/assets/images/new13.jpg';
	import new14 from '$lib/assets/images/new14.jpg';
	import new15 from '$lib/assets/images/new15.jpg';
	import new16 from '$lib/assets/images/new16.jpg';
	import new17 from '$lib/assets/images/new17.jpg';
	import new18 from '$lib/assets/images/new18.jpg';

	interface Product {
		id: string;
		name: string;
		price: number;
		originalPrice?: number;
		currency: string;
		description: string;
		detailedDescription: string;
		imageUrl: string;
		additionalImages: string[];
		category: 'pendant' | 'table' | 'floor' | 'wall';
		dimensions: {
			width: number;
			height: number;
			depth: number;
			unit: string;
		};
		specifications: {
			material: string;
			lightSource: string;
			wattage: number;
			colorTemperature: string;
			dimmable: boolean;
			craftingTime: string;
			artisan: string;
		};
		inStock: boolean;
		limited: boolean;
		featured: boolean;
		accessories: string[];
		suggestedSpaces: string[];
		shadeOptions?: string[];
		standOptions?: string[];
	}

	const products: Product[] = [
		{
			id: 'mender-pendant-001',
			name: 'Mender Heritage Pendant',
			price: 2850,
			originalPrice: 3200,
			currency: 'USD',
			description: 'A masterpiece of Ethiopian craftsmanship featuring traditional motifs',
			detailedDescription:
				'The Mender Heritage Pendant represents the pinnacle of our artisanal excellence. Each piece is meticulously handcrafted over 1000+ hours by master artisans in Addis Ababa, incorporating patterns that have been passed down through generations. The intricate metalwork tells the story of Ethiopian cultural heritage while providing sophisticated ambient lighting for contemporary spaces.',
			imageUrl: new2,
			additionalImages: [new3, new4, Product5],
			category: 'pendant',
			dimensions: { width: 70, height: 110, depth: 70, unit: 'cm' },
			specifications: {
				material: 'Hand-forged brass with traditional Ethiopian patterns',
				lightSource: 'LED filament bulb included',
				wattage: 12,
				colorTemperature: '2700K warm white',
				dimmable: true,
				craftingTime: '1200 hours',
				artisan: 'Master Tesfaye Alemayehu'
			},
			inStock: true,
			limited: true,
			featured: true,
			accessories: ['ceiling-medallion-gold', 'dimmer-switch-brass', 'hanging-chain-extension'],
			suggestedSpaces: ['dining-room', 'living-room', 'foyer', 'bedroom'],
			shadeOptions: ['traditional-weave', 'modern-mesh', 'glass-geometric'],
			standOptions: ['brass-antique', 'black-steel', 'copper-patina']
		},
		{
			id: 'qedamawi-table-001',
			name: 'Qedamawi Royal Table Lamp',
			price: 1650,
			currency: 'USD',
			description: 'Elegant table lamp inspired by royal Ethiopian architecture',
			detailedDescription:
				'Named after the ancient royal palaces of Ethiopia, the Qedamawi table lamp brings regal elegance to any space. The lampshade features hand-painted traditional patterns while the base is carved from sustainably sourced Ethiopian wood and finished with brass accents.',
			imageUrl: new7,
			additionalImages: [new8, new6],
			category: 'table',
			dimensions: { width: 30, height: 50, depth: 30, unit: 'cm' },
			specifications: {
				material: 'Carved Ethiopian cedar with brass inlay',
				lightSource: 'LED bulb included',
				wattage: 8,
				colorTemperature: '2700K warm white',
				dimmable: true,
				craftingTime: '800 hours',
				artisan: 'Artisan Collective of Gondar'
			},
			inStock: true,
			limited: false,
			featured: true,
			accessories: ['matching-lampshade', 'wooden-base-protector', 'led-bulb-set'],
			suggestedSpaces: ['bedroom', 'study', 'living-room', 'office'],
			shadeOptions: ['fabric-natural', 'parchment-traditional', 'silk-luxury'],
			standOptions: ['wood-natural', 'wood-dark', 'brass-combination']
		},
		{
			id: 'ensosila-floor-001',
			name: 'Ensosila Architectural Floor Lamp',
			price: 3200,
			currency: 'USD',
			description: 'Towering floor lamp inspired by ancient Ethiopian obelisks',
			detailedDescription:
				'The Ensosila floor lamp draws inspiration from the ancient stelae of Axum, standing as a monument to Ethiopian architectural heritage. At 180cm tall, this statement piece commands attention while providing both ambient and task lighting through its innovative dual-lighting system.',
			imageUrl: new13,
			additionalImages: [new14, new15, new16],
			category: 'floor',
			dimensions: { width: 30, height: 180, depth: 30, unit: 'cm' },
			specifications: {
				material: 'Stone composite with bronze detailing',
				lightSource: 'Dual LED system - ambient & task',
				wattage: 20,
				colorTemperature: '2700K/4000K adjustable',
				dimmable: true,
				craftingTime: '2000 hours',
				artisan: 'Master Sculptor Bekele Mesfin'
			},
			inStock: true,
			limited: true,
			featured: true,
			accessories: ['floor-protector-pads', 'touch-dimmer-remote', 'stability-weight'],
			suggestedSpaces: ['living-room', 'office', 'lobby', 'reading-nook']
		},
		{
			id: 'tilet-table-001',
			name: 'Tilet Miniature Elegance',
			price: 980,
			currency: 'USD',
			description: 'Compact luxury for intimate spaces',
			detailedDescription:
				'The Tilet represents refined minimalism in Ethiopian design philosophy. Perfect for creating intimate lighting zones, each piece features micro-detailed traditional patterns that reveal new elements upon closer inspection.',
			imageUrl: new9,
			additionalImages: [new10, new11, new12],
			category: 'table',
			dimensions: { width: 25, height: 35, depth: 25, unit: 'cm' },
			specifications: {
				material: 'Hand-painted ceramic with gold leaf',
				lightSource: 'Compact LED',
				wattage: 5,
				colorTemperature: '2700K warm white',
				dimmable: false,
				craftingTime: '400 hours',
				artisan: 'Ceramic Master Hana Tadesse'
			},
			inStock: true,
			limited: false,
			featured: false,
			accessories: ['protective-base', 'decorative-cord', 'spare-bulb'],
			suggestedSpaces: ['bedroom', 'bathroom', 'hallway', 'kitchen'],
			shadeOptions: ['ceramic-natural', 'ceramic-painted', 'glass-frosted'],
			standOptions: ['ceramic-matching', 'brass-accent', 'wood-minimal']
		}
	];

	// Store for cart functionality
	interface CartItem extends Product {
		selectedShade: string;
		selectedStand: string;
		quantity: number;
		totalPrice: number;
	}
	const cart = writable<CartItem[]>([]);

	let selectedProduct: Product | null = null;
	let selectedImageIndex = 0;
	let selectedShade = '';
	let selectedStand = '';
	let quantity = 1;
	let showCartModal = false;
	let showSpaceModal = false;
	let selectedSpace = '';
	let filterCategory = 'all';
	let sortBy = 'featured';
	let showShippingInfo = false;
	let galleryRef: HTMLElement;
	let isVisible = false;
	let animatedCards = new Set();

	// Intersection Observer for animations
	onMount(() => {
		// Set entrance animation class on cards initially
		setTimeout(() => {
			if (galleryRef) {
				const cards = galleryRef.querySelectorAll('.product-card');
				cards.forEach((card) => card.classList.add('entrance-animation'));
			}
		}, 100);

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						isVisible = true;
						// Staggered animation for product cards
						const cards = entry.target.querySelectorAll('.product-card.entrance-animation');
						cards.forEach((card, index) => {
							setTimeout(() => {
								card.classList.add('animate-in');
								animatedCards.add(index);
							}, index * 150);
						});
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.1, rootMargin: '50px' }
		);

		if (galleryRef) observer.observe(galleryRef);
		return () => observer.disconnect();
	});

	$: filteredProducts = products
		.filter((p) => filterCategory === 'all' || p.category === filterCategory)
		.sort((a, b) => {
			switch (sortBy) {
				case 'price-low':
					return a.price - b.price;
				case 'price-high':
					return b.price - a.price;
				case 'featured':
					return b.featured ? 1 : -1;
				default:
					return 0;
			}
		});

	function openProductModal(product: Product) {
		selectedProduct = product;
		selectedImageIndex = 0;
		selectedShade = product.shadeOptions?.[0] || '';
		selectedStand = product.standOptions?.[0] || '';
		quantity = 1;
	}

	function addToCart() {
		if (!selectedProduct) return;

		const cartItem = {
			...selectedProduct,
			selectedShade,
			selectedStand,
			quantity,
			totalPrice: selectedProduct.price * quantity
		};

		cart.update((items) => [...items, cartItem]);
		showCartModal = true;
		selectedProduct = null;
	}

	function formatPrice(price: number, currency: string = 'USD') {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: currency
		}).format(price);
	}

	function calculateShipping(country: string) {
		const shippingRates: Record<string, { rate: number; time: string }> = {
			US: { rate: 0, time: '3-5 business days' },
			CA: { rate: 150, time: '5-7 business days' },
			EU: { rate: 280, time: '7-10 business days' },
			UK: { rate: 250, time: '7-10 business days' },
			AU: { rate: 320, time: '10-14 business days' },
			JP: { rate: 380, time: '10-14 business days' },
			other: { rate: 450, time: '14-21 business days' }
		};
		return shippingRates[country] || shippingRates['other'];
	}
</script>

<section
	class="luxury-gallery"
	id="collection"
	style="background: {sectionData.backgroundGradient}"
>
	<div class="container">
		<!-- Header Section -->
		<div class="gallery-header" class:animate-in={isVisible}>
			<div class="header-content">
				<span class="collection-badge">{sectionData.badge}</span>
				<h2 class="section-title">{sectionData.title}</h2>
				<p class="section-subtitle">
					{sectionData.subtitle}
				</p>
			</div>

			<!-- Filters & Sort -->
			<div class="controls">
				<div class="filter-group">
					<label for="category">Category:</label>
					<select bind:value={filterCategory} id="category">
						<option value="all">All Products</option>
						<option value="pendant">Pendant Lights</option>
						<option value="table">Table Lamps</option>
						<option value="floor">Floor Lamps</option>
						<option value="wall">Wall Sconces</option>
					</select>
				</div>
				<div class="sort-group">
					<label for="sort">Sort by:</label>
					<select bind:value={sortBy} id="sort">
						<option value="featured">Featured</option>
						<option value="price-low">Price: Low to High</option>
						<option value="price-high">Price: High to Low</option>
					</select>
				</div>
			</div>
		</div>

		<!-- Product Grid -->
		<div class="product-grid" bind:this={galleryRef}>
			{#each filteredProducts as product}
				<div class="product-card" class:featured={product.featured}>
					{#if product.limited}
						<div class="limited-badge">Limited Edition</div>
					{/if}

					<div class="product-image-container">
						<img src={product.imageUrl} alt={product.name} class="product-image" loading="lazy" />
						<div class="image-overlay">
							<button class="quick-view-btn" on:click={() => openProductModal(product)}>
								Quick View
							</button>
						</div>
					</div>

					<div class="product-info">
						<div class="product-header">
							<h3 class="product-name">{product.name}</h3>
							<div class="price-section">
								{#if product.originalPrice}
									<span class="original-price">{formatPrice(product.originalPrice)}</span>
								{/if}
								<span class="current-price">{formatPrice(product.price)}</span>
							</div>
						</div>

						<p class="product-description">{product.description}</p>

						<div class="product-meta">
							<span class="craft-time">🕐 {product.specifications.craftingTime}</span>
							<span class="artisan">✋ {product.specifications.artisan}</span>
						</div>

						<div class="product-actions">
							<button
								class="btn-primary"
								on:click={() => openProductModal(product)}
								disabled={!product.inStock}
							>
								{product.inStock ? 'Customize & Order' : 'Notify When Available'}
							</button>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<!-- Space Configuration Section -->
		<div class="space-inspiration">
			<h3 class="space-title">{spaceInspiration.title}</h3>
			<div class="space-grid">
				{#each Object.entries(spaceInspiration.spaces) as [spaceKey, config]}
					<div
						class="space-card"
						on:click={() => {
							selectedSpace = spaceKey;
							showSpaceModal = true;
						}}
					>
						<div class="space-image" style="background: {config.backgroundImage}"></div>
						<div class="space-content">
							<h4>{config.title}</h4>
							<p>{config.description}</p>
							<span class="explore-space">Explore →</span>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- Product Detail Modal -->
{#if selectedProduct}
	<div class="modal-overlay" on:click={() => (selectedProduct = null)}>
		<div class="product-modal" on:click|stopPropagation>
			<button class="close-btn" on:click={() => (selectedProduct = null)}>×</button>

			<div class="modal-content">
				<div class="modal-gallery">
					<div class="main-image">
						<img
							src={selectedProduct.additionalImages[selectedImageIndex] || selectedProduct.imageUrl}
							alt={selectedProduct.name}
						/>
					</div>
					<div class="thumbnail-strip">
						<button
							class="thumbnail {selectedImageIndex === -1 ? 'active' : ''}"
							on:click={() => (selectedImageIndex = -1)}
						>
							<img src={selectedProduct.imageUrl} alt="Main" />
						</button>
						{#each selectedProduct.additionalImages as img, index}
							<button
								class="thumbnail {selectedImageIndex === index ? 'active' : ''}"
								on:click={() => (selectedImageIndex = index)}
							>
								<img src={img} alt="View {index + 1}" />
							</button>
						{/each}
					</div>
				</div>

				<div class="modal-details">
					<div class="product-header">
						<h2>{selectedProduct.name}</h2>
						<div class="price-display">
							{#if selectedProduct.originalPrice}
								<span class="original-price">{formatPrice(selectedProduct.originalPrice)}</span>
							{/if}
							<span class="current-price">{formatPrice(selectedProduct.price)}</span>
						</div>
					</div>

					<p class="detailed-description">{selectedProduct.detailedDescription}</p>

					<!-- Customization Options -->
					{#if selectedProduct.shadeOptions}
						<div class="customization-section">
							<h4>Choose Your Shade</h4>
							<div class="option-grid">
								{#each selectedProduct.shadeOptions as shade}
									<button
										class="option-btn {selectedShade === shade ? 'selected' : ''}"
										on:click={() => (selectedShade = shade)}
									>
										{shade.replace('-', ' ').toUpperCase()}
									</button>
								{/each}
							</div>
						</div>
					{/if}

					{#if selectedProduct.standOptions}
						<div class="customization-section">
							<h4>Choose Your Stand</h4>
							<div class="option-grid">
								{#each selectedProduct.standOptions as stand}
									<button
										class="option-btn {selectedStand === stand ? 'selected' : ''}"
										on:click={() => (selectedStand = stand)}
									>
										{stand.replace('-', ' ').toUpperCase()}
									</button>
								{/each}
							</div>
						</div>
					{/if}

					<!-- Specifications -->
					<div class="specifications">
						<h4>Specifications</h4>
						<div class="spec-grid">
							<div class="spec-item">
								<span class="spec-label">Dimensions:</span>
								<span class="spec-value">
									{selectedProduct.dimensions.width} × {selectedProduct.dimensions.height} × {selectedProduct
										.dimensions.depth}
									{selectedProduct.dimensions.unit}
								</span>
							</div>
							<div class="spec-item">
								<span class="spec-label">Material:</span>
								<span class="spec-value">{selectedProduct.specifications.material}</span>
							</div>
							<div class="spec-item">
								<span class="spec-label">Light Source:</span>
								<span class="spec-value">{selectedProduct.specifications.lightSource}</span>
							</div>
							<div class="spec-item">
								<span class="spec-label">Power:</span>
								<span class="spec-value"
									>{selectedProduct.specifications.wattage}W, {selectedProduct.specifications
										.colorTemperature}</span
								>
							</div>
						</div>
					</div>

					<!-- Purchase Section -->
					<div class="purchase-section">
						<div class="quantity-selector">
							<label for="quantity">Quantity:</label>
							<div class="quantity-controls">
								<button on:click={() => (quantity = Math.max(1, quantity - 1))}>-</button>
								<input type="number" bind:value={quantity} min="1" max="10" />
								<button on:click={() => (quantity = Math.min(10, quantity + 1))}>+</button>
							</div>
						</div>

						<div class="total-price">
							<span>Total: {formatPrice(selectedProduct.price * quantity)}</span>
						</div>

						<div class="action-buttons">
							<button class="btn-primary large" on:click={addToCart}> Add to Cart </button>
							<button class="btn-secondary" on:click={() => (showShippingInfo = !showShippingInfo)}>
								Shipping Info
							</button>
						</div>

						{#if showShippingInfo}
							<div class="shipping-info">
								<h5>{shippingInfo.title}</h5>
								<div class="shipping-rates">
									{#each shippingInfo.rates as rate}
										<div class="rate-item">
											{rate.flag}
											{rate.country}: {rate.rate} ({rate.time})
										</div>
									{/each}
								</div>
								<p class="shipping-note">
									{shippingInfo.note}
								</p>
							</div>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}

<!-- Cart Modal -->
{#if showCartModal}
	<div class="modal-overlay" on:click={() => (showCartModal = false)}>
		<div class="cart-modal" on:click|stopPropagation>
			<h3>Added to Cart! 🎉</h3>
			<p>Your exquisite piece is now reserved for you.</p>
			<div class="cart-actions">
				<button class="btn-secondary" on:click={() => (showCartModal = false)}
					>Continue Shopping</button
				>
				<button class="btn-primary">Proceed to Checkout</button>
			</div>
		</div>
	</div>
{/if}

<style>
	/* Luxury CSS Variables */
	:root {
		--luxury-gold: #d4af37;
		--deep-green: #4d5e3b;
		--sage-green: #7a9360;
		--warm-white: #fafafa;
		--charcoal: #2c2c2c;
		--glass-bg: rgba(255, 255, 255, 0.25);
		--glass-border: rgba(255, 255, 255, 0.18);
	}

	.luxury-gallery {
		padding: 120px 0;
		background: linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%);
		position: relative;
		overflow: hidden;
	}

	/* Cinematic grain texture overlay */
	.luxury-gallery::before {
		content: '';
		position: absolute;
		inset: 0;
		background-image: radial-gradient(
				circle at 20% 50%,
				rgba(120, 119, 198, 0.03) 0%,
				transparent 50%
			),
			radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 50%),
			radial-gradient(circle at 40% 80%, rgba(122, 147, 96, 0.02) 0%, transparent 50%);
		pointer-events: none;
		animation: grain 8s ease-in-out infinite alternate;
	}

	@keyframes grain {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.8;
		}
	}

	/* Entrance Animations */
	.gallery-header {
		opacity: 0;
		transform: translateY(60px);
		transition: all 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
	}

	.gallery-header.animate-in {
		opacity: 1;
		transform: translateY(0);
	}

	.container {
		max-width: 1400px;
		margin: 0 auto;
		padding: 0 2rem;
	}

	.gallery-header {
		text-align: center;
		margin-bottom: 80px;
	}

	.header-content {
		margin-bottom: 40px;
	}

	.collection-badge {
		display: inline-block;
		padding: 0.75rem 2rem;
		background: linear-gradient(135deg, var(--glass-bg), rgba(122, 147, 96, 0.15));
		backdrop-filter: blur(20px);
		border: 1px solid var(--glass-border);
		color: var(--deep-green);
		font-size: 0.875rem;
		font-weight: 600;
		letter-spacing: 3px;
		border-radius: 50px;
		margin-bottom: 2rem;
		box-shadow:
			0 8px 32px rgba(122, 147, 96, 0.1),
			inset 0 1px 0 rgba(255, 255, 255, 0.4);
		position: relative;
		overflow: hidden;
	}

	.collection-badge::before {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(135deg, transparent, rgba(212, 175, 55, 0.1));
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.collection-badge:hover::before {
		opacity: 1;
	}

	.section-title {
		font-size: clamp(2.5rem, 5vw, 4rem);
		font-weight: 300;
		color: #2c2c2c;
		margin-bottom: 1.5rem;
		font-family: 'Montserrat', sans-serif;
	}

	.section-subtitle {
		font-size: 1.25rem;
		color: #666;
		max-width: 800px;
		margin: 0 auto;
		line-height: 1.6;
	}

	.controls {
		display: flex;
		justify-content: center;
		gap: 2rem;
		flex-wrap: wrap;
	}

	.filter-group,
	.sort-group {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.filter-group label,
	.sort-group label {
		font-weight: 500;
		color: #4d5e3b;
	}

	.filter-group select,
	.sort-group select {
		padding: 0.5rem 1rem;
		border: 2px solid #e2e8d8;
		border-radius: 25px;
		background: white;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.filter-group select:focus,
	.sort-group select:focus {
		outline: none;
		border-color: #7a9360;
	}

	.product-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
		gap: 3rem;
		margin-bottom: 100px;
	}

	.product-card {
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7));
		backdrop-filter: blur(25px);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 24px;
		overflow: hidden;
		box-shadow:
			0 20px 40px rgba(0, 0, 0, 0.08),
			0 8px 16px rgba(122, 147, 96, 0.04),
			inset 0 1px 0 rgba(255, 255, 255, 0.3);
		transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		position: relative;
		will-change: transform;
	}

	.product-card::before {
		content: '';
		position: absolute;
		inset: 0;
		background: radial-gradient(
			circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
			rgba(212, 175, 55, 0.05) 0%,
			transparent 50%
		);
		opacity: 0;
		transition: opacity 0.4s ease;
		pointer-events: none;
		z-index: 1;
	}

	.product-card:hover {
		transform: translateY(-20px) scale(1.02);
		box-shadow:
			0 40px 80px rgba(0, 0, 0, 0.12),
			0 16px 32px rgba(122, 147, 96, 0.08),
			inset 0 1px 0 rgba(255, 255, 255, 0.4);
	}

	.product-card:hover::before {
		opacity: 1;
	}

	.product-card.featured {
		border: 2px solid #7a9360;
	}

	/* Product Card Entrance Animations */
	.product-card {
		opacity: 1;
		transform: translateY(0) scale(1);
	}

	.product-card.entrance-animation {
		opacity: 0;
		transform: translateY(80px) scale(0.95);
		transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
	}

	.product-card.entrance-animation.animate-in {
		opacity: 1;
		transform: translateY(0) scale(1);
	}

	.limited-badge {
		position: absolute;
		top: 1.5rem;
		right: 1.5rem;
		background: linear-gradient(135deg, var(--luxury-gold), #f4e18e);
		backdrop-filter: blur(15px);
		color: var(--charcoal);
		padding: 0.75rem 1.5rem;
		border-radius: 20px;
		font-size: 0.75rem;
		font-weight: 700;
		z-index: 10;
		letter-spacing: 2px;
		text-transform: uppercase;
		box-shadow:
			0 8px 24px rgba(212, 175, 55, 0.3),
			inset 0 1px 0 rgba(255, 255, 255, 0.5);
		border: 1px solid rgba(255, 255, 255, 0.3);
		animation: shimmer 3s ease-in-out infinite;
	}

	@keyframes shimmer {
		0%,
		100% {
			box-shadow:
				0 8px 24px rgba(212, 175, 55, 0.3),
				inset 0 1px 0 rgba(255, 255, 255, 0.5);
		}
		50% {
			box-shadow:
				0 12px 32px rgba(212, 175, 55, 0.4),
				inset 0 1px 0 rgba(255, 255, 255, 0.7);
		}
	}

	.product-image-container {
		position: relative;
		height: 300px;
		overflow: hidden;
	}

	.product-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.6s ease;
	}

	.product-card:hover .product-image {
		transform: scale(1.1);
	}

	.image-overlay {
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0.6);
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.product-card:hover .image-overlay {
		opacity: 1;
	}

	.quick-view-btn {
		background: white;
		color: #2c2c2c;
		border: none;
		padding: 1rem 2rem;
		border-radius: 50px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		letter-spacing: 1px;
	}

	.quick-view-btn:hover {
		background: #7a9360;
		color: white;
		transform: scale(1.05);
	}

	.product-info {
		padding: 2rem;
	}

	.product-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 1rem;
	}

	.product-name {
		font-size: 1.5rem;
		font-weight: 600;
		color: #2c2c2c;
		margin: 0;
		flex: 1;
	}

	.price-section {
		text-align: right;
	}

	.original-price {
		display: block;
		color: #999;
		text-decoration: line-through;
		font-size: 0.875rem;
		margin-bottom: 0.25rem;
	}

	.current-price {
		font-size: 1.5rem;
		font-weight: 700;
		color: #7a9360;
	}

	.product-description {
		color: #666;
		line-height: 1.6;
		margin-bottom: 1.5rem;
	}

	.product-meta {
		display: flex;
		gap: 1rem;
		margin-bottom: 1.5rem;
		font-size: 0.875rem;
		color: #777;
	}

	.btn-primary {
		background: linear-gradient(135deg, #7a9360, #4d5e3b);
		color: white;
		border: none;
		padding: 1rem 2rem;
		border-radius: 50px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		letter-spacing: 1px;
		width: 100%;
	}

	.btn-primary:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: 0 10px 25px rgba(122, 147, 96, 0.4);
	}

	.btn-primary:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.space-inspiration {
		text-align: center;
		margin-top: 100px;
	}

	.space-title {
		font-size: 2.5rem;
		font-weight: 300;
		color: #2c2c2c;
		margin-bottom: 3rem;
	}

	.space-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
	}

	.space-card {
		background: white;
		border-radius: 15px;
		overflow: hidden;
		cursor: pointer;
		transition: transform 0.3s ease;
		box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
	}

	.space-card:hover {
		transform: translateY(-5px);
	}

	.space-image {
		height: 200px;
		background: linear-gradient(135deg, #e2e8d8, #7a9360);
	}

	.space-content {
		padding: 1.5rem;
	}

	.space-content h4 {
		font-size: 1.25rem;
		font-weight: 600;
		margin-bottom: 0.5rem;
		color: #2c2c2c;
	}

	.space-content p {
		color: #666;
		margin-bottom: 1rem;
	}

	.explore-space {
		color: #7a9360;
		font-weight: 600;
	}

	.modal-overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.8);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
		padding: 2rem;
	}

	.product-modal {
		background: white;
		border-radius: 20px;
		max-width: 1200px;
		width: 100%;
		max-height: 90vh;
		overflow-y: auto;
		position: relative;
	}

	.close-btn {
		position: absolute;
		top: 1rem;
		right: 1rem;
		background: none;
		border: none;
		font-size: 2rem;
		cursor: pointer;
		z-index: 10;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.9);
	}

	.modal-content {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 3rem;
		padding: 3rem;
	}

	.modal-gallery {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.main-image {
		aspect-ratio: 1;
		border-radius: 15px;
		overflow: hidden;
	}

	.main-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.thumbnail-strip {
		display: flex;
		gap: 0.5rem;
		overflow-x: auto;
	}

	.thumbnail {
		flex-shrink: 0;
		width: 80px;
		height: 80px;
		border: none;
		border-radius: 8px;
		overflow: hidden;
		cursor: pointer;
		opacity: 0.6;
		transition: opacity 0.3s ease;
	}

	.thumbnail.active {
		opacity: 1;
		border: 2px solid #7a9360;
	}

	.thumbnail img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.modal-details {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.detailed-description {
		color: #666;
		line-height: 1.7;
		font-size: 1.1rem;
	}

	.customization-section h4 {
		font-size: 1.2rem;
		font-weight: 600;
		margin-bottom: 1rem;
		color: #2c2c2c;
	}

	.option-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
		gap: 0.5rem;
	}

	.option-btn {
		padding: 0.75rem 1rem;
		border: 2px solid #e2e8d8;
		background: white;
		border-radius: 10px;
		cursor: pointer;
		transition: all 0.3s ease;
		font-size: 0.875rem;
		font-weight: 500;
	}

	.option-btn.selected {
		border-color: #7a9360;
		background: #f0f4ed;
		color: #4d5e3b;
	}

	.specifications {
		background: #f8f9fa;
		padding: 1.5rem;
		border-radius: 15px;
	}

	.specifications h4 {
		margin-bottom: 1rem;
		color: #2c2c2c;
	}

	.spec-grid {
		display: grid;
		gap: 1rem;
	}

	.spec-item {
		display: grid;
		grid-template-columns: 1fr 2fr;
		gap: 0.5rem;
	}

	.spec-label {
		font-weight: 600;
		color: #4d5e3b;
	}

	.spec-value {
		color: #666;
	}

	.purchase-section {
		background: #fafafa;
		padding: 2rem;
		border-radius: 15px;
		margin-top: auto;
	}

	.quantity-selector {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 1rem;
	}

	.quantity-controls {
		display: flex;
		align-items: center;
		border: 2px solid #e2e8d8;
		border-radius: 8px;
		overflow: hidden;
	}

	.quantity-controls button {
		background: white;
		border: none;
		padding: 0.5rem 1rem;
		cursor: pointer;
		font-weight: 600;
	}

	.quantity-controls input {
		border: none;
		text-align: center;
		width: 60px;
		padding: 0.5rem;
	}

	.total-price {
		text-align: center;
		font-size: 1.5rem;
		font-weight: 700;
		color: #7a9360;
		margin-bottom: 1.5rem;
	}

	.action-buttons {
		display: flex;
		gap: 1rem;
	}

	.btn-primary.large {
		flex: 2;
	}

	.btn-secondary {
		background: white;
		color: #7a9360;
		border: 2px solid #7a9360;
		padding: 1rem 2rem;
		border-radius: 50px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		flex: 1;
	}

	.btn-secondary:hover {
		background: #7a9360;
		color: white;
	}

	.shipping-info {
		margin-top: 1.5rem;
		padding: 1.5rem;
		background: white;
		border-radius: 10px;
		border: 2px solid #e2e8d8;
	}

	.shipping-info h5 {
		margin-bottom: 1rem;
		color: #2c2c2c;
	}

	.shipping-rates {
		display: grid;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}

	.rate-item {
		font-size: 0.875rem;
		color: #666;
	}

	.shipping-note {
		font-size: 0.875rem;
		color: #999;
		font-style: italic;
	}

	.cart-modal {
		background: white;
		padding: 3rem;
		border-radius: 20px;
		text-align: center;
		max-width: 500px;
	}

	.cart-modal h3 {
		font-size: 2rem;
		margin-bottom: 1rem;
		color: #2c2c2c;
	}

	.cart-modal p {
		color: #666;
		margin-bottom: 2rem;
		font-size: 1.1rem;
	}

	.cart-actions {
		display: flex;
		gap: 1rem;
		justify-content: center;
	}

	@media (max-width: 768px) {
		.product-grid {
			grid-template-columns: 1fr;
			gap: 2rem;
		}

		.modal-content {
			grid-template-columns: 1fr;
			padding: 2rem;
		}

		.controls {
			flex-direction: column;
			gap: 1rem;
		}

		.action-buttons {
			flex-direction: column;
		}

		.cart-actions {
			flex-direction: column;
		}
	}
</style>
