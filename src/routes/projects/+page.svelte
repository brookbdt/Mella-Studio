<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let mounted = false;
	let selectedCategory = 'all';

	$: projectsData = data.projects;
	$: filteredProjects =
		selectedCategory === 'all'
			? projectsData.projects
			: projectsData.projects.filter(
					(project) => project.category.toLowerCase() === selectedCategory
				);

	onMount(() => {
		mounted = true;
	});

	function selectCategory(categoryId: string) {
		selectedCategory = categoryId;
	}
</script>

<svelte:head>
	<title>Projects | MellaStudio - Our Lighting Design Portfolio</title>
	<meta
		name="description"
		content="Explore MellaStudio's portfolio of completed lighting projects. From luxury hotels to modern residences, see how we transform spaces through light."
	/>
</svelte:head>

<Navbar />

<main class="projects-page">
	<!-- Hero Section -->
	<section class="hero-section">
		<div class="hero-content" class:animate-in={mounted}>
			<span class="category-badge">PORTFOLIO</span>
			<h1 class="page-title">
				{projectsData.hero.title}
			</h1>
			<p class="hero-subtitle">
				{projectsData.hero.subtitle}
			</p>
			<p class="hero-description">
				{projectsData.hero.description}
			</p>
		</div>
	</section>

	<!-- Featured Project -->
	<section class="featured-project-section">
		<div class="featured-container">
			<div class="featured-grid">
				<div class="featured-image">
					<img src={projectsData.featured.heroImage} alt={projectsData.featured.name} />
					<div class="featured-overlay">
						<span class="project-year">{projectsData.featured.year}</span>
						<span class="project-category">{projectsData.featured.category}</span>
					</div>
				</div>
				<div class="featured-content">
					<h2 class="featured-title">{projectsData.featured.name}</h2>
					<p class="featured-location">{projectsData.featured.location}</p>
					<p class="featured-description">{projectsData.featured.description}</p>

					<div class="project-details">
						<div class="detail-section">
							<h3>Challenge</h3>
							<p>{projectsData.featured.challenge}</p>
						</div>
						<div class="detail-section">
							<h3>Solution</h3>
							<p>{projectsData.featured.solution}</p>
						</div>
					</div>

					<div class="project-results">
						<h3>Results</h3>
						<ul>
							{#each projectsData.featured.results as result}
								<li>{result}</li>
							{/each}
						</ul>
					</div>

					<button class="view-case-study-btn">View Full Case Study</button>
				</div>
			</div>
		</div>
	</section>

	<!-- Project Stats -->
	<section class="stats-section">
		<div class="stats-container">
			<div class="stats-grid">
				<div class="stat-item">
					<span class="stat-number">{projectsData.stats.projectsCompleted}</span>
					<span class="stat-label">Projects Completed</span>
				</div>
				<div class="stat-item">
					<span class="stat-number">{projectsData.stats.clientsSatisfied}</span>
					<span class="stat-label">Clients Satisfied</span>
				</div>
				<div class="stat-item">
					<span class="stat-number">{projectsData.stats.squareFeetLit}</span>
					<span class="stat-label">Square Feet Illuminated</span>
				</div>
				<div class="stat-item">
					<span class="stat-number">{projectsData.stats.yearsExperience}</span>
					<span class="stat-label">Years of Experience</span>
				</div>
			</div>
		</div>
	</section>

	<!-- Category Filter -->
	<section class="filter-section">
		<div class="filter-container">
			<h2 class="filter-title">All Projects</h2>
			<div class="filter-tabs">
				{#each projectsData.categories as category}
					<button
						class="filter-tab"
						class:active={selectedCategory === category.id}
						on:click={() => selectCategory(category.id)}
					>
						{category.name} ({category.count})
					</button>
				{/each}
			</div>
		</div>
	</section>

	<!-- Projects Grid -->
	<section class="projects-grid-section">
		<div class="projects-container">
			<div class="projects-grid">
				{#each filteredProjects as project}
					<div class="project-card">
						<div class="project-image">
							<img src={project.imageUrl} alt={project.name} />
							<div class="project-overlay">
								<div class="project-meta">
									<span class="project-year">{project.year}</span>
									<span class="project-category">{project.category}</span>
								</div>
								<button class="view-project-btn">View Project</button>
							</div>
						</div>
						<div class="project-content">
							<h3 class="project-name">{project.name}</h3>
							<p class="project-location">{project.location}</p>
							<p class="project-description">{project.description}</p>

							<div class="project-highlights">
								{#each project.highlights as highlight}
									<span class="highlight-tag">{highlight}</span>
								{/each}
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>
</main>

<Footer />

<style>
	.projects-page {
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

	/* Featured Project */
	.featured-project-section {
		padding: 80px 20px;
		background: white;
	}

	.featured-container {
		max-width: 1400px;
		margin: 0 auto;
	}

	.featured-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 80px;
		align-items: center;
	}

	.featured-image {
		position: relative;
		height: 600px;
		border-radius: 16px;
		overflow: hidden;
	}

	.featured-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.featured-overlay {
		position: absolute;
		top: 20px;
		left: 20px;
		display: flex;
		gap: 10px;
	}

	.project-year,
	.project-category {
		background: rgba(255, 255, 255, 0.9);
		padding: 8px 16px;
		border-radius: 20px;
		font-size: 0.875rem;
		font-weight: 500;
		color: #2c2c2c;
	}

	.featured-title {
		font-size: 2.5rem;
		font-weight: 300;
		color: #2c2c2c;
		margin-bottom: 0.5rem;
	}

	.featured-location {
		color: #a8b4a0;
		font-weight: 500;
		margin-bottom: 2rem;
	}

	.featured-description {
		font-size: 1.125rem;
		color: #666;
		line-height: 1.6;
		margin-bottom: 2rem;
	}

	.project-details {
		margin-bottom: 2rem;
	}

	.detail-section {
		margin-bottom: 1.5rem;
	}

	.detail-section h3 {
		font-size: 1rem;
		font-weight: 600;
		color: #2c2c2c;
		margin-bottom: 0.5rem;
		text-transform: uppercase;
		letter-spacing: 1px;
	}

	.detail-section p {
		color: #666;
		line-height: 1.6;
	}

	.project-results h3 {
		font-size: 1rem;
		font-weight: 600;
		color: #2c2c2c;
		margin-bottom: 1rem;
		text-transform: uppercase;
		letter-spacing: 1px;
	}

	.project-results ul {
		list-style: none;
		padding: 0;
		margin-bottom: 2rem;
	}

	.project-results li {
		color: #666;
		margin-bottom: 0.5rem;
		padding-left: 1rem;
		position: relative;
	}

	.project-results li::before {
		content: '✓';
		position: absolute;
		left: 0;
		color: #a8b4a0;
		font-weight: bold;
	}

	.view-case-study-btn {
		padding: 12px 32px;
		background: #2c2c2c;
		color: white;
		border: none;
		border-radius: 25px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.view-case-study-btn:hover {
		background: #a8b4a0;
	}

	/* Stats Section */
	.stats-section {
		padding: 80px 20px;
		background: #2c2c2c;
	}

	.stats-container {
		max-width: 1200px;
		margin: 0 auto;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 40px;
		text-align: center;
	}

	.stat-item {
		color: white;
	}

	.stat-number {
		display: block;
		font-size: 3rem;
		font-weight: 300;
		margin-bottom: 0.5rem;
		color: #a8b4a0;
	}

	.stat-label {
		font-size: 0.875rem;
		text-transform: uppercase;
		letter-spacing: 1px;
		color: #ccc;
	}

	/* Filter Section */
	.filter-section {
		padding: 60px 20px 40px;
		background: white;
		border-bottom: 1px solid #e5e5e5;
	}

	.filter-container {
		max-width: 1400px;
		margin: 0 auto;
		text-align: center;
	}

	.filter-title {
		font-size: 2rem;
		font-weight: 300;
		color: #2c2c2c;
		margin-bottom: 2rem;
	}

	.filter-tabs {
		display: flex;
		justify-content: center;
		gap: 1rem;
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

	/* Projects Grid */
	.projects-grid-section {
		padding: 60px 20px 80px;
		background: white;
	}

	.projects-container {
		max-width: 1400px;
		margin: 0 auto;
	}

	.projects-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
		gap: 40px;
	}

	.project-card {
		background: #faf9f7;
		border-radius: 16px;
		overflow: hidden;
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;
	}

	.project-card:hover {
		transform: translateY(-8px);
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
	}

	.project-image {
		position: relative;
		height: 300px;
		overflow: hidden;
	}

	.project-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.3s ease;
	}

	.project-card:hover .project-image img {
		transform: scale(1.05);
	}

	.project-overlay {
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0.6);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 20px;
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.project-card:hover .project-overlay {
		opacity: 1;
	}

	.project-meta {
		display: flex;
		gap: 10px;
	}

	.view-project-btn {
		padding: 12px 24px;
		background: white;
		color: #2c2c2c;
		border: none;
		border-radius: 25px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.3s ease;
		align-self: flex-start;
	}

	.view-project-btn:hover {
		background: #a8b4a0;
		color: white;
	}

	.project-content {
		padding: 30px;
	}

	.project-name {
		font-size: 1.5rem;
		font-weight: 300;
		color: #2c2c2c;
		margin-bottom: 0.5rem;
	}

	.project-location {
		color: #a8b4a0;
		font-weight: 500;
		margin-bottom: 1rem;
		font-size: 0.875rem;
	}

	.project-description {
		color: #666;
		line-height: 1.6;
		margin-bottom: 1.5rem;
	}

	.project-highlights {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
	}

	.highlight-tag {
		background: #e5e5e5;
		color: #666;
		padding: 4px 12px;
		border-radius: 12px;
		font-size: 0.75rem;
		font-weight: 500;
	}

	/* Responsive */
	@media (max-width: 1024px) {
		.featured-grid {
			grid-template-columns: 1fr;
			gap: 40px;
		}

		.featured-image {
			height: 400px;
		}
	}

	@media (max-width: 768px) {
		.projects-grid {
			grid-template-columns: 1fr;
		}

		.filter-tabs {
			gap: 0.5rem;
		}

		.stats-grid {
			grid-template-columns: repeat(2, 1fr);
		}

		.featured-title {
			font-size: 2rem;
		}
	}
</style>
