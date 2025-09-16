<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let mounted = false;
	let selectedCategory = 'all';
	let newsletterEmail = '';

	$: blogData = data.blog;
	$: filteredPosts =
		selectedCategory === 'all'
			? blogData.posts
			: blogData.posts.filter((post) => post.category.toLowerCase() === selectedCategory);

	onMount(() => {
		mounted = true;
	});

	function selectCategory(categoryId: string) {
		selectedCategory = categoryId;
	}

	function handleNewsletterSubmit(event: Event) {
		event.preventDefault();
		// Handle newsletter signup - integrate with CMS/email service
		console.log('Newsletter signup:', newsletterEmail);
		// Reset form
		newsletterEmail = '';
		// Show success message (implement as needed)
	}

	function formatDate(dateString: string) {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<svelte:head>
	<title>Blog | MellaStudio - Lighting Design Insights & Stories</title>
	<meta
		name="description"
		content="Discover the latest in lighting design trends, behind-the-scenes stories, and insights into Ethiopian craftsmanship from the MellaStudio team."
	/>
</svelte:head>

<Navbar />

<main class="blog-page">
	<!-- Hero Section -->
	<section class="hero-section">
		<div class="hero-content" class:animate-in={mounted}>
			<span class="category-badge">BLOG</span>
			<h1 class="page-title">
				{blogData.hero.title}
			</h1>
			<p class="hero-subtitle">
				{blogData.hero.subtitle}
			</p>
			<p class="hero-description">
				{blogData.hero.description}
			</p>
		</div>
	</section>

	<!-- Featured Post -->
	<section class="featured-post-section">
		<div class="featured-container">
			<div class="featured-grid">
				<div class="featured-image">
					<img src={blogData.featured.imageUrl} alt={blogData.featured.title} />
					<div class="featured-overlay">
						<span class="post-category">{blogData.featured.category}</span>
						<span class="read-time">{blogData.featured.readTime}</span>
					</div>
				</div>
				<div class="featured-content">
					<h2 class="featured-title">{blogData.featured.title}</h2>
					<div class="post-meta">
						<span class="author">By {blogData.featured.author}</span>
						<span class="date">{formatDate(blogData.featured.publishedDate)}</span>
					</div>
					<p class="featured-excerpt">{blogData.featured.excerpt}</p>

					<div class="post-tags">
						{#each blogData.featured.tags as tag}
							<span class="tag">{tag}</span>
						{/each}
					</div>

					<button class="read-more-btn">Read Full Article</button>
				</div>
			</div>
		</div>
	</section>

	<!-- Category Filter -->
	<section class="filter-section">
		<div class="filter-container">
			<h2 class="filter-title">All Articles</h2>
			<div class="filter-tabs">
				{#each blogData.categories as category}
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

	<!-- Blog Posts Grid -->
	<section class="posts-grid-section">
		<div class="posts-container">
			<div class="posts-grid">
				{#each filteredPosts as post}
					<article class="post-card">
						<div class="post-image">
							<img src={post.imageUrl} alt={post.title} />
							<div class="post-overlay">
								<span class="post-category">{post.category}</span>
								<button class="read-btn">Read Article</button>
							</div>
						</div>
						<div class="post-content">
							<h3 class="post-title">{post.title}</h3>
							<div class="post-meta">
								<span class="author">By {post.author}</span>
								<span class="date">{formatDate(post.publishedDate)}</span>
								<span class="read-time">{post.readTime}</span>
							</div>
							<p class="post-excerpt">{post.excerpt}</p>

							<div class="post-tags">
								{#each post.tags as tag}
									<span class="tag">{tag}</span>
								{/each}
							</div>
						</div>
					</article>
				{/each}
			</div>
		</div>
	</section>

	<!-- Newsletter Signup -->
	<section class="newsletter-section">
		<div class="newsletter-container">
			<div class="newsletter-content">
				<h2 class="newsletter-title">{blogData.newsletter.title}</h2>
				<p class="newsletter-description">{blogData.newsletter.description}</p>

				<form on:submit={handleNewsletterSubmit} class="newsletter-form">
					<input
						type="email"
						bind:value={newsletterEmail}
						placeholder={blogData.newsletter.placeholder}
						required
						class="newsletter-input"
					/>
					<button type="submit" class="newsletter-btn">Subscribe</button>
				</form>
			</div>
		</div>
	</section>
</main>

<Footer />

<style>
	.blog-page {
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

	/* Featured Post */
	.featured-post-section {
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
		height: 500px;
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

	.post-category,
	.read-time {
		background: rgba(255, 255, 255, 0.9);
		padding: 8px 16px;
		border-radius: 20px;
		font-size: 0.875rem;
		font-weight: 500;
		color: #2c2c2c;
	}

	.featured-title {
		font-size: 2.25rem;
		font-weight: 300;
		color: #2c2c2c;
		margin-bottom: 1rem;
		line-height: 1.3;
	}

	.post-meta {
		display: flex;
		gap: 1rem;
		margin-bottom: 1.5rem;
		font-size: 0.875rem;
		color: #666;
	}

	.featured-excerpt {
		font-size: 1.125rem;
		color: #666;
		line-height: 1.6;
		margin-bottom: 2rem;
	}

	.post-tags {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
		margin-bottom: 2rem;
	}

	.tag {
		background: #f0f0f0;
		color: #666;
		padding: 4px 12px;
		border-radius: 12px;
		font-size: 0.75rem;
		font-weight: 500;
	}

	.read-more-btn {
		padding: 12px 32px;
		background: #2c2c2c;
		color: white;
		border: none;
		border-radius: 25px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.read-more-btn:hover {
		background: #a8b4a0;
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
		font-size: 0.875rem;
	}

	.filter-tab.active,
	.filter-tab:hover {
		background: #2c2c2c;
		color: white;
		border-color: #2c2c2c;
	}

	/* Posts Grid */
	.posts-grid-section {
		padding: 60px 20px 80px;
		background: white;
	}

	.posts-container {
		max-width: 1400px;
		margin: 0 auto;
	}

	.posts-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
		gap: 40px;
	}

	.post-card {
		background: #faf9f7;
		border-radius: 16px;
		overflow: hidden;
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;
	}

	.post-card:hover {
		transform: translateY(-8px);
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
	}

	.post-image {
		position: relative;
		height: 250px;
		overflow: hidden;
	}

	.post-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.3s ease;
	}

	.post-card:hover .post-image img {
		transform: scale(1.05);
	}

	.post-overlay {
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0.6);
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		padding: 20px;
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.post-card:hover .post-overlay {
		opacity: 1;
	}

	.read-btn {
		padding: 8px 16px;
		background: white;
		color: #2c2c2c;
		border: none;
		border-radius: 20px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.3s ease;
		font-size: 0.875rem;
	}

	.read-btn:hover {
		background: #a8b4a0;
		color: white;
	}

	.post-content {
		padding: 30px;
	}

	.post-title {
		font-size: 1.25rem;
		font-weight: 500;
		color: #2c2c2c;
		margin-bottom: 1rem;
		line-height: 1.4;
	}

	.post-excerpt {
		color: #666;
		line-height: 1.6;
		margin-bottom: 1.5rem;
		font-size: 0.9rem;
	}

	/* Newsletter Section */
	.newsletter-section {
		padding: 80px 20px;
		background: #2c2c2c;
	}

	.newsletter-container {
		max-width: 800px;
		margin: 0 auto;
		text-align: center;
	}

	.newsletter-title {
		font-size: 2.5rem;
		font-weight: 300;
		color: white;
		margin-bottom: 1rem;
	}

	.newsletter-description {
		font-size: 1.125rem;
		color: #ccc;
		margin-bottom: 2rem;
		line-height: 1.6;
	}

	.newsletter-form {
		display: flex;
		gap: 1rem;
		max-width: 500px;
		margin: 0 auto;
	}

	.newsletter-input {
		flex: 1;
		padding: 12px 20px;
		border: 1px solid #555;
		background: transparent;
		color: white;
		border-radius: 25px;
		font-size: 1rem;
	}

	.newsletter-input::placeholder {
		color: #999;
	}

	.newsletter-input:focus {
		outline: none;
		border-color: #a8b4a0;
	}

	.newsletter-btn {
		padding: 12px 24px;
		background: #a8b4a0;
		color: white;
		border: none;
		border-radius: 25px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.3s ease;
		white-space: nowrap;
	}

	.newsletter-btn:hover {
		background: #96a28d;
	}

	/* Responsive */
	@media (max-width: 1024px) {
		.featured-grid {
			grid-template-columns: 1fr;
			gap: 40px;
		}

		.featured-image {
			height: 350px;
		}
	}

	@media (max-width: 768px) {
		.posts-grid {
			grid-template-columns: 1fr;
		}

		.newsletter-form {
			flex-direction: column;
		}

		.filter-tabs {
			gap: 0.5rem;
		}

		.featured-title {
			font-size: 1.75rem;
		}

		.newsletter-title {
			font-size: 2rem;
		}
	}
</style>
