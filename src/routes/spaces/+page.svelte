<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let mounted = false;
	let selectedCategory = 'all';

	$: spacesData = data.spaces;
	$: filteredSpaces =
		selectedCategory === 'all'
			? spacesData.categories.flatMap((cat) => cat.spaces)
			: spacesData.categories.find((cat) => cat.id === selectedCategory)?.spaces || [];

	onMount(() => {
		mounted = true;
	});

	function selectCategory(categoryId: string) {
		selectedCategory = categoryId;
	}
</script>

<svelte:head>
	<title>Spaces | MellaStudio - Lighting for Every Environment</title>
	<meta
		name="description"
		content="Discover how MellaStudio lighting transforms residential and commercial spaces. From intimate homes to grand restaurants, see our lighting in action."
	/>
</svelte:head>

<Navbar />

<main class="spaces-page">
	<!-- Hero Section -->
	<section class="hero-section">
		<div class="hero-content" class:animate-in={mounted}>
			<span class="category-badge">SPACES</span>
			<h1 class="page-title">
				{spacesData.hero.title}
			</h1>
			<p class="hero-subtitle">
				{spacesData.hero.subtitle}
			</p>
			<p class="hero-description">
				{spacesData.hero.description}
			</p>
		</div>
	</section>

	<!-- Category Filter -->
	<section class="filter-section">
		<div class="filter-container">
			<div class="filter-tabs">
				<button
					class="filter-tab"
					class:active={selectedCategory === 'all'}
					on:click={() => selectCategory('all')}
				>
					All Spaces
				</button>
				{#each spacesData.categories as category}
					<button
						class="filter-tab"
						class:active={selectedCategory === category.id}
						on:click={() => selectCategory(category.id)}
					>
						{category.name}
					</button>
				{/each}
			</div>
		</div>
	</section>

	<!-- Spaces Grid -->
	<section class="spaces-grid-section">
		<div class="spaces-container">
			{#if selectedCategory === 'all'}
				{#each spacesData.categories as category}
					<div class="category-section">
						<div class="category-header">
							<h2 class="category-title">{category.name}</h2>
							<p class="category-description">{category.description}</p>
						</div>
						<div class="spaces-grid">
							{#each category.spaces.filter((space) => space.featured) as space}
								<div class="space-card">
									<div class="space-image">
										<img src={space.imageUrl} alt={space.name} />
										<div class="space-overlay">
											<button class="explore-btn">Explore {space.name}</button>
										</div>
									</div>
									<div class="space-content">
										<h3 class="space-name">{space.name}</h3>
										<p class="space-description">{space.description}</p>
									</div>
								</div>
							{/each}
						</div>
					</div>
				{/each}
			{:else}
				<div class="spaces-grid">
					{#each filteredSpaces as space}
						<div class="space-card">
							<div class="space-image">
								<img src={space.imageUrl} alt={space.name} />
								<div class="space-overlay">
									<button class="explore-btn">Explore {space.name}</button>
								</div>
							</div>
							<div class="space-content">
								<h3 class="space-name">{space.name}</h3>
								<p class="space-description">{space.description}</p>
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</section>

	<!-- Featured Installations -->
	<section class="featured-section">
		<div class="featured-container">
			<div class="section-header">
				<h2 class="section-title">{spacesData.featured.title}</h2>
			</div>
			<div class="featured-grid">
				{#each spacesData.featured.projects as project}
					<div class="featured-project">
						<div class="project-image">
							<img src={project.imageUrl} alt={project.name} />
							<div class="project-overlay">
								<span class="project-category">{project.category}</span>
							</div>
						</div>
						<div class="project-content">
							<h3 class="project-name">{project.name}</h3>
							<p class="project-location">{project.location}</p>
							<p class="project-description">{project.description}</p>
							<button class="view-project-btn">View Project</button>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Testimonials -->
	<section class="testimonials-section">
		<div class="testimonials-container">
			<h2 class="testimonials-title">What Our Clients Say</h2>
			<div class="testimonials-grid">
				{#each spacesData.testimonials as testimonial}
					<div class="testimonial-card">
						<blockquote class="testimonial-quote">
							"{testimonial.quote}"
						</blockquote>
						<div class="testimonial-author">
							<strong>{testimonial.author}</strong>
							<span>{testimonial.location}</span>
							<em>{testimonial.project}</em>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>
</main>

<Footer />

<style>
	.spaces-page {
		background: #faf9f7;
		min-height: 100vh;
		padding-top: 80px;
	}

	/* Hero Section */
	.hero-section {
		padding: 80px 20px 60px;
		text-align: center;
		max-width: 1200px;
		margin: 0 auto;
	}

	.hero-content {
		opacity: 0;
		transform: translateY(30px);
		transition: all 1s ease-out;
	}

	.hero-content.animate-in {
		opacity: 1;
		transform: translateY(0);
	}

	.category-badge {
		display: inline-block;
		font-size: 0.875rem;
		font-weight: 600;
		letter-spacing: 2px;
		color: #666;
		margin-bottom: 1.5rem;
		text-transform: uppercase;
	}

	.page-title {
		font-size: clamp(2.5rem, 6vw, 4rem);
		font-weight: 300;
		line-height: 1.2;
		color: #2c2c2c;
		margin-bottom: 1.5rem;
	}

	.hero-subtitle {
		font-size: 1.25rem;
		color: #a8b4a0;
		margin-bottom: 1rem;
	}

	.hero-description {
		font-size: 1rem;
		color: #666;
		max-width: 600px;
		margin: 0 auto;
		line-height: 1.6;
	}

	/* Filter Section */
	.filter-section {
		padding: 40px 20px;
		border-bottom: 1px solid #e5e5e5;
		background: white;
	}

	.filter-container {
		max-width: 1400px;
		margin: 0 auto;
	}

	.filter-tabs {
		display: flex;
		justify-content: center;
		gap: 2rem;
		flex-wrap: wrap;
	}

	.filter-tab {
		padding: 12px 24px;
		border: 1px solid #e5e5e5;
		background: transparent;
		color: #666;
		font-weight: 500;
		border-radius: 25px;
		transition: all 0.3s ease;
		cursor: pointer;
	}

	.filter-tab.active,
	.filter-tab:hover {
		background: #2c2c2c;
		color: white;
		border-color: #2c2c2c;
	}

	/* Spaces Grid */
	.spaces-grid-section {
		padding: 80px 20px;
	}

	.spaces-container {
		max-width: 1400px;
		margin: 0 auto;
	}

	.category-section {
		margin-bottom: 80px;
	}

	.category-header {
		text-align: center;
		margin-bottom: 60px;
	}

	.category-title {
		font-size: 2.5rem;
		font-weight: 300;
		color: #2c2c2c;
		margin-bottom: 1rem;
	}

	.category-description {
		font-size: 1.125rem;
		color: #666;
		max-width: 600px;
		margin: 0 auto;
	}

	.spaces-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 40px;
	}

	.space-card {
		background: white;
		border-radius: 12px;
		overflow: hidden;
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;
	}

	.space-card:hover {
		transform: translateY(-8px);
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
	}

	.space-image {
		position: relative;
		height: 300px;
		overflow: hidden;
	}

	.space-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.3s ease;
	}

	.space-card:hover .space-image img {
		transform: scale(1.05);
	}

	.space-overlay {
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0.6);
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.space-card:hover .space-overlay {
		opacity: 1;
	}

	.explore-btn {
		padding: 12px 24px;
		background: white;
		color: #2c2c2c;
		border: none;
		border-radius: 25px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.explore-btn:hover {
		background: #a8b4a0;
		color: white;
	}

	.space-content {
		padding: 30px;
	}

	.space-name {
		font-size: 1.5rem;
		font-weight: 300;
		color: #2c2c2c;
		margin-bottom: 0.75rem;
	}

	.space-description {
		color: #666;
		line-height: 1.6;
	}

	/* Featured Section */
	.featured-section {
		padding: 80px 20px;
		background: white;
	}

	.featured-container {
		max-width: 1400px;
		margin: 0 auto;
	}

	.section-header {
		text-align: center;
		margin-bottom: 60px;
	}

	.section-title {
		font-size: 2.5rem;
		font-weight: 300;
		color: #2c2c2c;
	}

	.featured-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
		gap: 60px;
	}

	.featured-project {
		background: #faf9f7;
		border-radius: 16px;
		overflow: hidden;
	}

	.project-image {
		position: relative;
		height: 400px;
	}

	.project-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.project-overlay {
		position: absolute;
		top: 20px;
		left: 20px;
	}

	.project-category {
		background: rgba(255, 255, 255, 0.9);
		padding: 8px 16px;
		border-radius: 20px;
		font-size: 0.875rem;
		font-weight: 500;
		color: #2c2c2c;
	}

	.project-content {
		padding: 40px;
	}

	.project-name {
		font-size: 1.75rem;
		font-weight: 300;
		color: #2c2c2c;
		margin-bottom: 0.5rem;
	}

	.project-location {
		color: #a8b4a0;
		font-weight: 500;
		margin-bottom: 1rem;
	}

	.project-description {
		color: #666;
		line-height: 1.6;
		margin-bottom: 2rem;
	}

	.view-project-btn {
		padding: 12px 24px;
		background: #2c2c2c;
		color: white;
		border: none;
		border-radius: 25px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.view-project-btn:hover {
		background: #a8b4a0;
	}

	/* Testimonials */
	.testimonials-section {
		padding: 80px 20px;
		background: #f8f7f5;
	}

	.testimonials-container {
		max-width: 1200px;
		margin: 0 auto;
		text-align: center;
	}

	.testimonials-title {
		font-size: 2.5rem;
		font-weight: 300;
		color: #2c2c2c;
		margin-bottom: 60px;
	}

	.testimonials-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
		gap: 40px;
	}

	.testimonial-card {
		background: white;
		padding: 40px;
		border-radius: 12px;
		text-align: left;
	}

	.testimonial-quote {
		font-size: 1.125rem;
		line-height: 1.7;
		color: #2c2c2c;
		margin-bottom: 1.5rem;
		font-style: italic;
	}

	.testimonial-author strong {
		display: block;
		color: #2c2c2c;
		margin-bottom: 0.25rem;
	}

	.testimonial-author span {
		display: block;
		color: #666;
		font-size: 0.875rem;
		margin-bottom: 0.25rem;
	}

	.testimonial-author em {
		display: block;
		color: #a8b4a0;
		font-size: 0.875rem;
		font-style: normal;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.filter-tabs {
			gap: 1rem;
		}

		.featured-grid {
			grid-template-columns: 1fr;
		}

		.category-title {
			font-size: 2rem;
		}

		.section-title {
			font-size: 2rem;
		}
	}
</style>
