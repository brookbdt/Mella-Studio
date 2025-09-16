<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	// Import product images
	import new2 from '$lib/assets/images/new2.jpg';
	import new3 from '$lib/assets/images/new3.jpg';
	import new5 from '$lib/assets/images/new5.jpg';
	import new14 from '$lib/assets/images/new14.jpg';
	import new7 from '$lib/assets/images/new7.jpg';
	import new8 from '$lib/assets/images/new8.jpg';
	import new13 from '$lib/assets/images/new13.jpg';
	import new15 from '$lib/assets/images/new15.jpg';

	// Product interface - CMS ready
	interface Product {
		id: string;
		name: string;
		slug: string;
		price: number;
		originalPrice?: number;
		rating: number;
		reviewCount: number;
		imageUrl: string;
		hoverImageUrl?: string;
		category: 'floor-lamps' | 'table-lamps' | 'pendant-lights' | 'string-lights';
		isNew?: boolean;
		colors: Array<{
			name: string;
			hex: string;
		}>;
		inStock: boolean;
	}

	// CMS-ready products data
	const products: Product[] = [
		{
			id: 'mender-pendant',
			name: 'Mender Pendant',
			slug: 'mender-pendant',
			price: 2400,
			originalPrice: 3200,
			rating: 4.8,
			reviewCount: 127,
			imageUrl: new2,
			hoverImageUrl: new3,
			category: 'pendant-lights',
			isNew: false,
			colors: [
				{ name: 'Natural', hex: '#F5F5DC' },
				{ name: 'Charcoal', hex: '#36454F' }
			],
			inStock: true
		},
		{
			id: 'qedamawi-table-lamp',
			name: 'Qedamawi Table Lamp',
			slug: 'nikisat-table-lamp',
			price: 980,
			originalPrice: 1400,
			rating: 4.7,
			reviewCount: 203,
			imageUrl: new7,
			hoverImageUrl: new8,
			category: 'table-lamps',
			isNew: true,
			colors: [
				{ name: 'Brass', hex: '#B8860B' },
				{ name: 'Black', hex: '#2C2C2C' }
			],
			inStock: true
		},
		{
			id: 'ensosila-floor-lamp',
			name: 'Ensosila Floor Lamp',
			slug: 'qedamawi-floor-lamp',
			price: 3200,
			originalPrice: 4500,
			rating: 4.9,
			reviewCount: 156,
			imageUrl: new13,
			hoverImageUrl: new15,
			category: 'floor-lamps',
			isNew: false,
			colors: [
				{ name: 'Bronze', hex: '#CD7F32' },
				{ name: 'Charcoal', hex: '#36454F' }
			],
			inStock: true
		},
		{
			id: 'gum-gum-pendant',
			name: 'Gum Gum Pendant',
			slug: 'gum-gum-pendant',
			price: 1800,
			originalPrice: 2400,
			rating: 4.9,
			reviewCount: 89,
			imageUrl: new5,
			hoverImageUrl: new14,
			category: 'pendant-lights',
			isNew: true,
			colors: [
				{ name: 'Natural', hex: '#DEB887' },
				{ name: 'Deep Brown', hex: '#8B4513' }
			],
			inStock: true
		}
		// Add more products as needed...
	];

	// State management
	let selectedCategory = 'all';
	let selectedPrice = 'all';
	let selectedType = 'all';
	let selectedMaterial = 'all';
	let selectedShade = 'all';
	let selectedColor = 'all';
	let filteredProducts = products;
	let totalProducts = products.length;

	// Get category from URL params (for navbar filtering)
	$: urlCategory = $page.url.searchParams.get('category') || 'all';
	$: if (urlCategory !== selectedCategory) {
		selectedCategory = urlCategory;
	}

	// Filter products based on selected filters
	$: {
		filteredProducts = products.filter((product) => {
			// Category filter
			if (selectedCategory !== 'all' && product.category !== selectedCategory) {
				return false;
			}

			// Price filter
			if (selectedPrice !== 'all') {
				if (selectedPrice === 'under-1000' && product.price >= 1000) return false;
				if (selectedPrice === '1000-2000' && (product.price < 1000 || product.price > 2000))
					return false;
				if (selectedPrice === '2000-3000' && (product.price < 2000 || product.price > 3000))
					return false;
				if (selectedPrice === 'over-3000' && product.price <= 3000) return false;
			}

			return true;
		});
		totalProducts = filteredProducts.length;
	}

	// Filter options - CMS ready
	const filterOptions = {
		categories: [
			{ value: 'all', label: 'All' },
			{ value: 'floor-lamps', label: 'Floor Lamps' },
			{ value: 'table-lamps', label: 'Table Lamps' },
			{ value: 'pendant-lights', label: 'Pendant Lights' },
			{ value: 'string-lights', label: 'String Lights' }
		],
		prices: [
			{ value: 'all', label: 'All' },
			{ value: 'under-1000', label: 'Under $1,000' },
			{ value: '1000-2000', label: '$1,000 - $2,000' },
			{ value: '2000-3000', label: '$2,000 - $3,000' },
			{ value: 'over-3000', label: 'Over $3,000' }
		],
		types: [
			{ value: 'all', label: 'All' },
			{ value: 'pendant', label: 'Pendant' },
			{ value: 'floor', label: 'Floor' },
			{ value: 'table', label: 'Table' }
		],
		materials: [
			{ value: 'all', label: 'All' },
			{ value: 'brass', label: 'Brass' },
			{ value: 'steel', label: 'Steel' },
			{ value: 'fabric', label: 'Fabric' }
		],
		shades: [
			{ value: 'all', label: 'All' },
			{ value: 'white', label: 'White' },
			{ value: 'black', label: 'Black' },
			{ value: 'natural', label: 'Natural' }
		],
		colors: [
			{ value: 'all', label: 'All' },
			{ value: 'gold', label: 'Gold' },
			{ value: 'silver', label: 'Silver' },
			{ value: 'black', label: 'Black' }
		]
	};

	// Functions
	function formatPrice(price: number): string {
		return `$${price.toLocaleString()}`;
	}

	function generateStars(rating: number): string {
		const fullStars = Math.floor(rating);
		const hasHalfStar = rating % 1 !== 0;
		let stars = '★'.repeat(fullStars);
		if (hasHalfStar) stars += '☆';
		return stars;
	}

	function navigateToProduct(slug: string) {
		goto(`/product/${slug}`);
	}

	function clearAllFilters() {
		selectedCategory = 'all';
		selectedPrice = 'all';
		selectedType = 'all';
		selectedMaterial = 'all';
		selectedShade = 'all';
		selectedColor = 'all';
		goto('/collection');
	}

	// Initialize on mount
	onMount(() => {
		// Any initialization logic
	});
</script>

<svelte:head>
	<title>Collection | MellaStudio - Ethiopian Heritage Lighting</title>
	<meta
		name="description"
		content="Discover MellaStudio's luxury Ethiopian lighting collection. Each piece handcrafted by master artisans, bringing cultural heritage into contemporary spaces."
	/>
	<meta property="og:title" content="Luxury Ethiopian Lighting Collection | MellaStudio" />
	<meta
		property="og:description"
		content="Handcrafted lighting where ancient Ethiopian artistry meets contemporary luxury."
	/>
</svelte:head>

<Navbar />

<main class="collection-page">
	<!-- Header Section -->
	<section class="header-section">
		<div class="header-content">
			<h1 class="page-title">ALL</h1>
			<div class="header-description">
				<p>Looking for modern floor lamps or a new table lamp that won't break the bank?</p>
				<p>
					MellaStudio offers designer lighting without the designer price tag. Imagine the perfect
					pair of diamond stud earrings or your favorite red lipstick - our lamps are timeless
					pieces that never go out of style. Whether you're seeking a contemporary floor lamp to
					brighten your living room or a stylish table lamp to accent your bedroom, MellaStudio has
					the perfect solution. Our energy-efficient lighting is designed to complement any space,
					while our commitment to sustainability means you can feel good about your purchase. Shop
					MellaStudio and discover the perfect lighting solution for your home.
				</p>
			</div>
		</div>
	</section>

	<!-- Filters Section -->
	<section class="filters-section">
		<div class="filters-container">
			<div class="filter-row">
				<div class="filter-label">Filter:</div>
				<div class="filter-groups">
					<div class="filter-group">
						<select bind:value={selectedPrice} class="filter-select">
							<option value="all">Price</option>
							{#each filterOptions.prices.slice(1) as option}
								<option value={option.value}>{option.label}</option>
							{/each}
						</select>
					</div>
					<div class="filter-group">
						<select bind:value={selectedType} class="filter-select">
							<option value="all">Type</option>
							{#each filterOptions.types.slice(1) as option}
								<option value={option.value}>{option.label}</option>
							{/each}
						</select>
					</div>
					<div class="filter-group">
						<select bind:value={selectedMaterial} class="filter-select">
							<option value="all">Material</option>
							{#each filterOptions.materials.slice(1) as option}
								<option value={option.value}>{option.label}</option>
							{/each}
						</select>
					</div>
					<div class="filter-group">
						<select bind:value={selectedShade} class="filter-select">
							<option value="all">Shade</option>
							{#each filterOptions.shades.slice(1) as option}
								<option value={option.value}>{option.label}</option>
							{/each}
						</select>
					</div>
					<div class="filter-group">
						<select bind:value={selectedColor} class="filter-select">
							<option value="all">Color</option>
							{#each filterOptions.colors.slice(1) as option}
								<option value={option.value}>{option.label}</option>
							{/each}
						</select>
					</div>
				</div>
			</div>
			<div class="results-info">
				<span class="product-count">{totalProducts} products</span>
			</div>
		</div>
	</section>

	<!-- Products Grid -->
	<section class="products-section">
		<div class="products-container">
			<div class="products-grid">
				{#each filteredProducts as product}
					<div class="product-card" on:click={() => navigateToProduct(product.slug)}>
						<div class="product-image-container">
							<img src={product.imageUrl} alt={product.name} class="product-image primary-image" />
							{#if product.hoverImageUrl}
								<img
									src={product.hoverImageUrl}
									alt={product.name}
									class="product-image hover-image"
								/>
							{/if}
							{#if product.isNew}
								<span class="new-badge">NEW</span>
							{/if}
							{#if product.originalPrice}
								<span class="sale-badge">SALE</span>
							{/if}
						</div>

						<div class="product-info">
							<h3 class="product-name">{product.name}</h3>

							<div class="product-rating">
								<span class="stars">{generateStars(product.rating)}</span>
								<span class="rating-score">{product.rating}</span>
								<span class="review-count">({product.reviewCount})</span>
							</div>

							<div class="product-pricing">
								<span class="current-price">{formatPrice(product.price)}</span>
								{#if product.originalPrice}
									<span class="original-price">{formatPrice(product.originalPrice)}</span>
									<span class="sale-percentage">
										SAVE {Math.round(
											((product.originalPrice - product.price) / product.originalPrice) * 100
										)}%
									</span>
								{/if}
							</div>

							{#if product.colors.length > 0}
								<div class="product-colors">
									{#each product.colors as color}
										<div
											class="color-swatch"
											style="background-color: {color.hex}"
											title={color.name}
										></div>
									{/each}
								</div>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>
</main>

<Footer />

<style>
	.collection-page {
		background: #faf9f7;
		min-height: 100vh;
		padding-top: 80px;
	}

	/* Header Section */
	.header-section {
		text-align: center;
		padding: 40px 20px;
		max-width: 1200px;
		margin: 0 auto;
	}

	.page-title {
		font-size: clamp(3rem, 8vw, 5rem);
		font-weight: 300;
		color: #2c2c2c;
		margin-bottom: 2rem;
		letter-spacing: 0.02em;
		font-family: 'Inter', sans-serif;
	}

	.header-description {
		max-width: 800px;
		margin: 0 auto;
		color: #666;
		line-height: 1.6;
		font-size: 1rem;
	}

	.header-description p {
		margin-bottom: 1rem;
	}

	/* Filters Section */
	.filters-section {
		border-bottom: 1px solid #e5e5e5;
		padding: 20px 0;
	}

	.filters-container {
		max-width: 1400px;
		margin: 0 auto;
		padding: 0 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.filter-row {
		display: flex;
		align-items: center;
		gap: 20px;
	}

	.filter-label {
		font-weight: 500;
		color: #2c2c2c;
		font-size: 0.9rem;
	}

	.filter-groups {
		display: flex;
		gap: 15px;
	}

	.filter-select {
		padding: 8px 12px;
		border: 1px solid #d0d0d0;
		background: white;
		font-size: 0.9rem;
		color: #666;
		cursor: pointer;
		min-width: 120px;
	}

	.filter-select:focus {
		outline: none;
		border-color: #2c2c2c;
	}

	.results-info {
		color: #666;
		font-size: 0.9rem;
	}

	.product-count {
		font-weight: 500;
	}

	/* Products Section */
	.products-section {
		padding: 40px 0 80px;
	}

	.products-container {
		max-width: 1400px;
		margin: 0 auto;
		padding: 0 20px;
	}

	.products-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		gap: 40px;
	}

	/* Product Card */
	.product-card {
		cursor: pointer;
		transition: transform 0.2s ease;
	}

	.product-card:hover {
		transform: translateY(-2px);
	}

	.product-image-container {
		position: relative;
		aspect-ratio: 1;
		overflow: hidden;
		background: #f8f8f8;
		margin-bottom: 16px;
	}

	.product-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: opacity 0.3s ease;
	}

	.hover-image {
		position: absolute;
		top: 0;
		left: 0;
		opacity: 0;
	}

	.product-card:hover .hover-image {
		opacity: 1;
	}

	.new-badge,
	.sale-badge {
		position: absolute;
		top: 12px;
		left: 12px;
		background: #2c2c2c;
		color: white;
		padding: 4px 8px;
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.5px;
	}

	.sale-badge {
		background: #e74c3c;
	}

	/* Product Info */
	.product-info {
		text-align: left;
	}

	.product-name {
		font-size: 1.1rem;
		font-weight: 500;
		color: #2c2c2c;
		margin-bottom: 8px;
		line-height: 1.3;
	}

	.product-rating {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-bottom: 8px;
	}

	.stars {
		color: #ffc107;
		font-size: 0.9rem;
	}

	.rating-score {
		font-weight: 600;
		color: #2c2c2c;
		font-size: 0.9rem;
	}

	.review-count {
		color: #666;
		font-size: 0.9rem;
	}

	.product-pricing {
		display: flex;
		align-items: center;
		gap: 12px;
		margin-bottom: 12px;
	}

	.current-price {
		font-size: 1.1rem;
		font-weight: 600;
		color: #2c2c2c;
	}

	.original-price {
		font-size: 0.9rem;
		color: #999;
		text-decoration: line-through;
	}

	.sale-percentage {
		font-size: 0.75rem;
		color: #e74c3c;
		font-weight: 600;
		background: #ffebee;
		padding: 2px 6px;
	}

	.product-colors {
		display: flex;
		gap: 8px;
	}

	.color-swatch {
		width: 20px;
		height: 20px;
		border: 1px solid #ddd;
		cursor: pointer;
		transition: transform 0.2s ease;
	}

	.color-swatch:hover {
		transform: scale(1.1);
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.filters-container {
			flex-direction: column;
			gap: 15px;
			align-items: stretch;
		}

		.filter-row {
			flex-direction: column;
			gap: 15px;
			align-items: stretch;
		}

		.filter-groups {
			flex-wrap: wrap;
			gap: 10px;
		}

		.filter-select {
			min-width: auto;
			flex: 1;
		}

		.products-grid {
			grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
			gap: 30px;
		}
	}

	@media (max-width: 480px) {
		.header-section {
			padding: 30px 15px;
		}

		.products-container {
			padding: 0 15px;
		}

		.products-grid {
			grid-template-columns: 1fr;
			gap: 25px;
		}
	}
</style>
