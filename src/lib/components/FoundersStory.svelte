<script lang="ts">
	import { onMount } from 'svelte';
	import { inview } from 'svelte-inview';

	let isVisible = false;
	let currentStoryIndex = 0;

	const founderStories = [
		{
			name: 'Meron Tesfaye',
			title: 'Co-Founder & Creative Director',
			image: '/founder-1.jpg', // You'll need to add actual founder photos
			quote:
				'Every lamp tells the story of our ancestors—their resilience, their artistry, their dreams.',
			story:
				"Born in Addis Ababa, Meron grew up watching her grandmother weave traditional patterns by lamplight. That image of light bringing families together through generations of craftsmanship sparked her vision for MellaStudio. With a Master's in Industrial Design from Parsons and 15 years at luxury brands like Hermès, she brings global sophistication to Ethiopian heritage."
		},
		{
			name: 'Dawit Alemayehu',
			title: 'Co-Founder & Master Craftsman',
			image: '/founder-2.jpg',
			quote:
				"We don't just make lighting—we preserve a civilization's artistic DNA for the modern world.",
			story:
				'Dawit comes from five generations of master metalworkers in Gondar. His great-great-grandfather created ceremonial pieces for Emperor Menelik II. After studying at the Royal College of Art in London, Dawit returned to Ethiopia with a mission: to elevate traditional craftsmanship to luxury status while providing sustainable livelihoods for local artisans.'
		}
	];

	const companyMilestones = [
		{
			year: '2019',
			title: 'The Vision Born',
			description: 'Meron and Dawit meet at a cultural preservation conference in Addis Ababa'
		},
		{
			year: '2020',
			title: 'Artisan Collective',
			description: 'Partnered with 15 master craftsmen across Ethiopia'
		},
		{
			year: '2021',
			title: 'First Collection',
			description: 'Launched with 8 signature pieces, sold out in 3 months'
		},
		{
			year: '2022',
			title: 'International Recognition',
			description: 'Featured in Architectural Digest and Design Within Reach'
		},
		{
			year: '2023',
			title: 'Luxury Market Entry',
			description: 'Pieces acquired by MoMA Design Store and luxury hotels worldwide'
		},
		{
			year: '2024',
			title: 'Global Expansion',
			description: 'Serving clients across 25+ countries with bespoke commissions'
		}
	];

	const values = [
		{
			icon: '🏺',
			title: 'Cultural Preservation',
			description: 'Every piece preserves thousand-year-old techniques for future generations'
		},
		{
			icon: '✋',
			title: 'Artisan Empowerment',
			description: 'Our craftsmen earn 5x the local average, supporting entire communities'
		},
		{
			icon: '🌍',
			title: 'Sustainable Luxury',
			description: 'Locally sourced materials, carbon-neutral shipping, lifetime guarantee'
		},
		{
			icon: '💎',
			title: 'Uncompromising Quality',
			description: 'Each piece undergoes 100+ quality checks over months of creation'
		}
	];

	onMount(() => {
		const interval = setInterval(() => {
			currentStoryIndex = (currentStoryIndex + 1) % founderStories.length;
		}, 8000);
		return () => clearInterval(interval);
	});

	function handleInview(event: CustomEvent<{ inView: boolean }>) {
		isVisible = event.detail.inView;
	}
</script>

<section class="founders-story" use:inview on:inview={handleInview}>
	<div class="container">
		<!-- Hero Section -->
		<div class="story-hero">
			<span class="heritage-badge">FOUNDED ON HERITAGE</span>
			<h2 class="section-title">The Visionaries Behind MellaStudio</h2>
			<p class="section-subtitle">
				Two souls united by a shared dream: to illuminate the world with Ethiopia's timeless
				artistry, while empowering the craftsmen who keep these traditions alive.
			</p>
		</div>

		<!-- Founders Spotlight -->
		<div class="founders-spotlight">
			<div class="founder-carousel">
				{#each founderStories as founder, index}
					<div class="founder-card {currentStoryIndex === index ? 'active' : ''}">
						<div class="founder-image">
							<div class="image-placeholder">
								<span class="founder-initial">{founder.name.charAt(0)}</span>
							</div>
						</div>
						<div class="founder-content">
							<div class="founder-header">
								<h3 class="founder-name">{founder.name}</h3>
								<p class="founder-title">{founder.title}</p>
							</div>
							<blockquote class="founder-quote">
								"{founder.quote}"
							</blockquote>
							<p class="founder-story">{founder.story}</p>
						</div>
					</div>
				{/each}
			</div>

			<div class="carousel-controls">
				{#each founderStories as _, index}
					<button
						class="control-dot {currentStoryIndex === index ? 'active' : ''}"
						on:click={() => (currentStoryIndex = index)}
					></button>
				{/each}
			</div>
		</div>

		<!-- Company Values -->
		<div class="values-section">
			<h3 class="values-title">Our Sacred Commitments</h3>
			<div class="values-grid">
				{#each values as value, index}
					<div class="value-card" class:visible={isVisible} style="animation-delay: {index * 0.2}s">
						<div class="value-icon">{value.icon}</div>
						<h4 class="value-title">{value.title}</h4>
						<p class="value-description">{value.description}</p>
					</div>
				{/each}
			</div>
		</div>

		<!-- Journey Timeline -->
		<div class="journey-section">
			<h3 class="journey-title">Our Journey to Excellence</h3>
			<div class="timeline">
				{#each companyMilestones as milestone, index}
					<div
						class="timeline-item"
						class:visible={isVisible}
						style="animation-delay: {index * 0.3}s"
					>
						<div class="timeline-year">{milestone.year}</div>
						<div class="timeline-content">
							<h4 class="timeline-title">{milestone.title}</h4>
							<p class="timeline-description">{milestone.description}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Mission Statement -->
		<div class="mission-section">
			<div class="mission-content">
				<h3 class="mission-title">Our Mission</h3>
				<p class="mission-text">
					To bridge continents through light—transforming ancient Ethiopian artistry into
					contemporary luxury while ensuring that every craftsman's family thrives, every tradition
					endures, and every home touched by our creations becomes a sanctuary of cultural beauty
					and timeless elegance.
				</p>
				<div class="mission-stats">
					<div class="stat">
						<span class="stat-number">500+</span>
						<span class="stat-label">Families Supported</span>
					</div>
					<div class="stat">
						<span class="stat-number">50,000+</span>
						<span class="stat-label">Hours of Craftsmanship</span>
					</div>
					<div class="stat">
						<span class="stat-number">25+</span>
						<span class="stat-label">Countries Served</span>
					</div>
				</div>
			</div>
		</div>

		<!-- Call to Action -->
		<div class="story-cta">
			<h3>Become Part of Our Story</h3>
			<p>
				Join the hundreds of discerning collectors who choose MellaStudio not just for our exquisite
				pieces, but for the legacy they represent.
			</p>
			<div class="cta-buttons">
				<a href="#collection" class="btn-primary">Explore Our Collection</a>
				<a href="#bespoke" class="btn-secondary">Commission Bespoke</a>
			</div>
		</div>
	</div>
</section>

<style>
	.founders-story {
		padding: 120px 0;
		background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 50%, #f5f5f5 100%);
		position: relative;
		overflow: hidden;
	}

	.founders-story::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 200px;
		background: linear-gradient(180deg, rgba(122, 147, 96, 0.05) 0%, transparent 100%);
		pointer-events: none;
	}

	.container {
		max-width: 1400px;
		margin: 0 auto;
		padding: 0 2rem;
		position: relative;
	}

	.story-hero {
		text-align: center;
		margin-bottom: 100px;
	}

	.heritage-badge {
		display: inline-block;
		padding: 0.75rem 2rem;
		background: linear-gradient(135deg, #7a9360, #4d5e3b);
		color: white;
		font-size: 0.875rem;
		font-weight: 600;
		letter-spacing: 3px;
		border-radius: 50px;
		margin-bottom: 2rem;
		text-transform: uppercase;
	}

	.section-title {
		font-size: clamp(2.5rem, 5vw, 4rem);
		font-weight: 300;
		color: #2c2c2c;
		margin-bottom: 2rem;
		font-family: 'Montserrat', sans-serif;
		line-height: 1.2;
	}

	.section-subtitle {
		font-size: 1.25rem;
		color: #666;
		max-width: 900px;
		margin: 0 auto;
		line-height: 1.7;
		font-weight: 300;
	}

	.founders-spotlight {
		margin-bottom: 120px;
		position: relative;
	}

	.founder-carousel {
		position: relative;
	}

	.founder-card {
		display: none;
		grid-template-columns: 1fr 1fr;
		gap: 4rem;
		align-items: center;
		background: white;
		border-radius: 25px;
		padding: 4rem;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
		margin-bottom: 2rem;
		opacity: 0;
		transform: translateX(50px);
		transition: all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
	}

	.founder-card.active {
		display: grid;
		opacity: 1;
		transform: translateX(0);
		animation: slideInFounder 0.8s ease-out;
	}

	@keyframes slideInFounder {
		from {
			opacity: 0;
			transform: translateX(50px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	.founder-image {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.image-placeholder {
		width: 300px;
		height: 300px;
		border-radius: 50%;
		background: linear-gradient(135deg, #e2e8d8, #7a9360);
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		overflow: hidden;
	}

	.founder-initial {
		font-size: 6rem;
		font-weight: 300;
		color: white;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
	}

	.founder-content {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.founder-header {
		border-bottom: 2px solid #e2e8d8;
		padding-bottom: 1.5rem;
	}

	.founder-name {
		font-size: 2.5rem;
		font-weight: 600;
		color: #2c2c2c;
		margin-bottom: 0.5rem;
		font-family: 'Montserrat', sans-serif;
	}

	.founder-title {
		font-size: 1.25rem;
		color: #7a9360;
		font-weight: 500;
		letter-spacing: 1px;
	}

	.founder-quote {
		font-size: 1.5rem;
		font-style: italic;
		color: #4d5e3b;
		line-height: 1.5;
		margin: 0;
		position: relative;
		padding-left: 2rem;
	}

	.founder-quote::before {
		content: '"';
		position: absolute;
		left: 0;
		top: -0.5rem;
		font-size: 4rem;
		color: #e2e8d8;
		font-family: serif;
	}

	.founder-story {
		font-size: 1.1rem;
		color: #666;
		line-height: 1.8;
		font-weight: 300;
	}

	.carousel-controls {
		display: flex;
		justify-content: center;
		gap: 1rem;
		margin-top: 3rem;
	}

	.control-dot {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		border: none;
		background: rgba(122, 147, 96, 0.3);
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.control-dot.active {
		background: #7a9360;
		transform: scale(1.3);
	}

	.values-section {
		margin-bottom: 120px;
		text-align: center;
	}

	.values-title {
		font-size: 3rem;
		font-weight: 300;
		color: #2c2c2c;
		margin-bottom: 4rem;
		font-family: 'Montserrat', sans-serif;
	}

	.values-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 3rem;
	}

	.value-card {
		background: white;
		padding: 3rem 2rem;
		border-radius: 20px;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
		transition: all 0.4s ease;
		opacity: 0;
		transform: translateY(30px);
	}

	.value-card.visible {
		opacity: 1;
		transform: translateY(0);
		animation: fadeInUp 0.8s ease-out forwards;
	}

	.value-card:hover {
		transform: translateY(-10px);
		box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
	}

	.value-icon {
		font-size: 3rem;
		margin-bottom: 1.5rem;
	}

	.value-title {
		font-size: 1.5rem;
		font-weight: 600;
		color: #2c2c2c;
		margin-bottom: 1rem;
	}

	.value-description {
		color: #666;
		line-height: 1.6;
		font-size: 1.1rem;
	}

	.journey-section {
		margin-bottom: 120px;
	}

	.journey-title {
		font-size: 3rem;
		font-weight: 300;
		color: #2c2c2c;
		text-align: center;
		margin-bottom: 4rem;
		font-family: 'Montserrat', sans-serif;
	}

	.timeline {
		max-width: 1000px;
		margin: 0 auto;
		position: relative;
	}

	.timeline::before {
		content: '';
		position: absolute;
		left: 50%;
		top: 0;
		bottom: 0;
		width: 2px;
		background: linear-gradient(to bottom, #e2e8d8, #7a9360, #e2e8d8);
		transform: translateX(-50%);
	}

	.timeline-item {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		gap: 3rem;
		align-items: center;
		margin-bottom: 4rem;
		opacity: 0;
		transform: translateY(30px);
	}

	.timeline-item.visible {
		animation: fadeInUp 0.8s ease-out forwards;
	}

	.timeline-item:nth-child(even) .timeline-content {
		order: -1;
		text-align: right;
	}

	.timeline-year {
		width: 80px;
		height: 80px;
		border-radius: 50%;
		background: linear-gradient(135deg, #7a9360, #4d5e3b);
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 700;
		font-size: 1.1rem;
		box-shadow: 0 10px 25px rgba(122, 147, 96, 0.3);
	}

	.timeline-content {
		background: white;
		padding: 2rem;
		border-radius: 15px;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
	}

	.timeline-title {
		font-size: 1.5rem;
		font-weight: 600;
		color: #2c2c2c;
		margin-bottom: 0.5rem;
	}

	.timeline-description {
		color: #666;
		line-height: 1.6;
	}

	.mission-section {
		background: linear-gradient(135deg, #2c2c2c, #4d5e3b);
		color: white;
		padding: 5rem 3rem;
		border-radius: 25px;
		text-align: center;
		margin-bottom: 80px;
	}

	.mission-title {
		font-size: 3rem;
		font-weight: 300;
		margin-bottom: 2rem;
		font-family: 'Montserrat', sans-serif;
	}

	.mission-text {
		font-size: 1.3rem;
		line-height: 1.8;
		margin-bottom: 3rem;
		max-width: 900px;
		margin-left: auto;
		margin-right: auto;
		font-weight: 300;
	}

	.mission-stats {
		display: flex;
		justify-content: center;
		gap: 4rem;
		flex-wrap: wrap;
	}

	.stat {
		text-align: center;
	}

	.stat-number {
		display: block;
		font-size: 3rem;
		font-weight: 700;
		color: #e2e8d8;
		margin-bottom: 0.5rem;
	}

	.stat-label {
		font-size: 1rem;
		opacity: 0.9;
		letter-spacing: 1px;
		text-transform: uppercase;
	}

	.story-cta {
		text-align: center;
	}

	.story-cta h3 {
		font-size: 2.5rem;
		font-weight: 300;
		color: #2c2c2c;
		margin-bottom: 1.5rem;
		font-family: 'Montserrat', sans-serif;
	}

	.story-cta p {
		font-size: 1.25rem;
		color: #666;
		margin-bottom: 3rem;
		max-width: 700px;
		margin-left: auto;
		margin-right: auto;
		line-height: 1.6;
	}

	.cta-buttons {
		display: flex;
		justify-content: center;
		gap: 2rem;
		flex-wrap: wrap;
	}

	.btn-primary,
	.btn-secondary {
		padding: 1rem 2.5rem;
		border-radius: 50px;
		font-weight: 600;
		text-decoration: none;
		letter-spacing: 1px;
		transition: all 0.3s ease;
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
	}

	.btn-primary {
		background: linear-gradient(135deg, #7a9360, #4d5e3b);
		color: white;
		border: 2px solid transparent;
	}

	.btn-primary:hover {
		transform: translateY(-2px);
		box-shadow: 0 10px 25px rgba(122, 147, 96, 0.4);
	}

	.btn-secondary {
		background: transparent;
		color: #7a9360;
		border: 2px solid #7a9360;
	}

	.btn-secondary:hover {
		background: #7a9360;
		color: white;
		transform: translateY(-2px);
	}

	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (max-width: 768px) {
		.founder-card {
			grid-template-columns: 1fr;
			gap: 2rem;
			padding: 2rem;
		}

		.image-placeholder {
			width: 200px;
			height: 200px;
		}

		.founder-initial {
			font-size: 4rem;
		}

		.founder-name {
			font-size: 2rem;
		}

		.founder-quote {
			font-size: 1.25rem;
		}

		.timeline::before {
			left: 20px;
		}

		.timeline-item {
			grid-template-columns: auto 1fr;
			gap: 2rem;
			margin-left: 40px;
		}

		.timeline-item:nth-child(even) .timeline-content {
			order: 0;
			text-align: left;
		}

		.mission-stats {
			gap: 2rem;
		}

		.values-grid {
			grid-template-columns: 1fr;
			gap: 2rem;
		}

		.cta-buttons {
			flex-direction: column;
			align-items: center;
		}

		.btn-primary,
		.btn-secondary {
			width: 100%;
			max-width: 300px;
			justify-content: center;
		}
	}

	@media (max-width: 480px) {
		.founder-card {
			padding: 1.5rem;
			gap: 1.5rem;
		}

		.image-placeholder {
			width: 150px;
			height: 150px;
		}

		.founder-initial {
			font-size: 3rem;
		}

		.mission-stats {
			flex-direction: column;
			gap: 1.5rem;
		}
	}
</style>
