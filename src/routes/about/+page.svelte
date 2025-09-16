<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import new20 from '$lib/assets/images/new20.png';
	import new21 from '$lib/assets/images/new21.png';
	import { onMount } from 'svelte';

	let mounted = false;

	onMount(() => {
		mounted = true;
	});
</script>

<svelte:head>
	<title>Our Story | MellaStudio - Ethiopian Heritage Meets Contemporary Design</title>
	<meta
		name="description"
		content="Discover the story behind MellaStudio - where Ethiopian craftsmanship meets contemporary luxury. Learn about our mission to create unique lighting that infuses culture into modern spaces."
	/>
</svelte:head>

<Navbar />

<main class="about-page">
	<!-- Hero Section -->
	<section class="hero-section">
		<div class="hero-content" class:animate-in={mounted}>
			<span class="mission-badge">OUR MISSION</span>
			<h1 class="page-title">
				MELLASTUDIO WAS FOUNDED WITH A SIMPLE PREMISE IN MIND:
				<span class="gradient-text">
					OFFER DESIGNER LIGHTING AT PRICES ACCESSIBLE TO EVERYONE.
				</span>
			</h1>
		</div>
	</section>

	<!-- Story Section -->
	<section class="story-section">
		<div class="story-container">
			<div class="story-grid">
				<div class="story-content">
					<h2 class="story-title">OUR STORY</h2>
					<div class="story-text">
						<p>
							Mella Studio crafts more than lighting – we create conversations. Each piece tells a
							story of Ethiopia's rich artistic heritage, reimagined for contemporary spaces.
						</p>
						<p>
							Our artisans transform centuries-old patterns and cultural motifs into sophisticated
							lighting solutions that make statements in modern homes and offices. From hand-crafted
							table lamps to statement pendant lights, every Mella creation bridges the gap between
							Ethiopia's artistic legacy and contemporary design.
						</p>
					</div>
				</div>
				<div class="story-image">
					<img src={new20} alt="Ethiopian Artisan at Work" />
				</div>
			</div>
		</div>
	</section>

	<!-- Mission Statement -->
	<section class="mission-section">
		<div class="mission-container">
			<div class="mission-content">
				<h2 class="mission-title">
					WE BELIEVE GREAT DESIGN SHOULDN'T BE AVAILABLE TO A SELECT FEW
					<span class="highlight"
						>AND YOU SHOULDN'T HAVE TO COMPROMISE ON QUALITY IF YOU WANT SOMETHING AFFORDABLE.</span
					>
				</h2>
			</div>
		</div>
	</section>

	<!-- Values Section -->
	<section class="values-section">
		<div class="values-container">
			<div class="values-grid">
				<div class="values-image">
					<img src={new21} alt="MellaStudio Workshop" />
				</div>
				<div class="values-content">
					<h3 class="values-subtitle">INNOVATION</h3>
					<h2 class="values-title">ALWAYS LEADING THE WAY</h2>
					<div class="values-text">
						<p>
							We're constantly studying light and finding ways to improve our products. We outfit
							all of our lights with energy efficient LEDs and we were the first to make solar
							string lights and to add USB and wireless charging on our lamps.
						</p>
						<p>
							We're constantly looking to innovate and are listening to what our customers have to
							say.
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Heritage Section -->
	<section class="heritage-section">
		<div class="heritage-container">
			<div class="heritage-content">
				<span class="heritage-badge">HERITAGE</span>
				<h2 class="heritage-title">Crafting Culture, by Hand</h2>
				<p class="heritage-description">
					Mella Studio's vision is to create unique lighting products and infuse Ethiopian culture
					into both local and international clients' surroundings. Our team of architects, artists,
					and designers transcend the traditional boundaries of these professions, intending to
					deliver awe-inspiring spaces that redefine perceptions and expectations.
				</p>
				<div class="heritage-highlight">
					<p>
						In essence, Mella Studio is not just another studio;
						<strong>it's a hub for creativity.</strong>
					</p>
				</div>
			</div>
		</div>
	</section>
</main>

<Footer />

<style>
	.about-page {
		background: #faf9f7;
		min-height: 100vh;
		padding-top: 80px;
	}

	/* Hero Section */
	.hero-section {
		padding: 80px 20px 120px;
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

	.mission-badge {
		display: inline-block;
		font-size: 0.875rem;
		font-weight: 600;
		letter-spacing: 2px;
		color: #666;
		margin-bottom: 2rem;
		text-transform: uppercase;
	}

	.page-title {
		font-size: clamp(2rem, 6vw, 4rem);
		font-weight: 300;
		line-height: 1.2;
		color: #2c2c2c;
		max-width: 1000px;
		margin: 0 auto;
		font-family: 'Inter', sans-serif;
	}

	.gradient-text {
		color: #a8b4a0;
		font-weight: 300;
	}

	/* Story Section */
	.story-section {
		padding: 80px 20px;
		background: white;
	}

	.story-container {
		max-width: 1400px;
		margin: 0 auto;
	}

	.story-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 80px;
		align-items: center;
	}

	.story-title {
		font-size: clamp(2rem, 4vw, 3rem);
		font-weight: 300;
		color: #2c2c2c;
		margin-bottom: 2rem;
		font-family: 'Inter', sans-serif;
	}

	.story-text p {
		font-size: 1.125rem;
		line-height: 1.7;
		color: #666;
		margin-bottom: 1.5rem;
	}

	.story-image img {
		width: 100%;
		height: auto;
		object-fit: cover;
	}

	/* Mission Section */
	.mission-section {
		padding: 120px 20px;
		background: #faf9f7;
	}

	.mission-container {
		max-width: 1200px;
		margin: 0 auto;
		text-align: center;
	}

	.mission-title {
		font-size: clamp(2rem, 5vw, 3.5rem);
		font-weight: 300;
		line-height: 1.3;
		color: #2c2c2c;
		font-family: 'Inter', sans-serif;
	}

	.highlight {
		color: #a8b4a0;
		font-weight: 300;
	}

	/* Values Section */
	.values-section {
		padding: 80px 20px;
		background: white;
	}

	.values-container {
		max-width: 1400px;
		margin: 0 auto;
	}

	.values-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 80px;
		align-items: center;
	}

	.values-subtitle {
		font-size: 0.875rem;
		font-weight: 600;
		letter-spacing: 2px;
		color: #666;
		margin-bottom: 1rem;
		text-transform: uppercase;
	}

	.values-title {
		font-size: clamp(2rem, 4vw, 3rem);
		font-weight: 300;
		color: #2c2c2c;
		margin-bottom: 2rem;
		font-family: 'Inter', sans-serif;
	}

	.values-text p {
		font-size: 1.125rem;
		line-height: 1.7;
		color: #666;
		margin-bottom: 1.5rem;
	}

	.values-image img {
		width: 100%;
		height: auto;
		object-fit: cover;
	}

	/* Heritage Section */
	.heritage-section {
		padding: 120px 20px;
		background: #f8f8f8;
	}

	.heritage-container {
		max-width: 800px;
		margin: 0 auto;
		text-align: center;
	}

	.heritage-badge {
		display: inline-block;
		font-size: 0.875rem;
		font-weight: 600;
		letter-spacing: 2px;
		color: #666;
		margin-bottom: 2rem;
		text-transform: uppercase;
	}

	.heritage-title {
		font-size: clamp(2.5rem, 5vw, 4rem);
		font-weight: 300;
		color: #2c2c2c;
		margin-bottom: 2rem;
		font-family: 'Inter', sans-serif;
	}

	.heritage-description {
		font-size: 1.125rem;
		line-height: 1.7;
		color: #666;
		margin-bottom: 3rem;
	}

	.heritage-highlight {
		padding: 2rem;
		background: white;
		border-left: 4px solid #a8b4a0;
	}

	.heritage-highlight p {
		font-size: 1.25rem;
		color: #2c2c2c;
		margin: 0;
		line-height: 1.6;
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.hero-section {
			padding: 60px 15px 80px;
		}

		.story-grid,
		.values-grid {
			grid-template-columns: 1fr;
			gap: 40px;
		}

		.values-grid {
			grid-template-rows: auto auto;
		}

		.values-image {
			order: -1;
		}

		.story-section,
		.values-section {
			padding: 60px 15px;
		}

		.mission-section,
		.heritage-section {
			padding: 80px 15px;
		}
	}

	@media (max-width: 480px) {
		.about-page {
			padding-top: 70px;
		}

		.hero-section {
			padding: 40px 15px 60px;
		}

		.story-section,
		.values-section {
			padding: 40px 15px;
		}

		.mission-section,
		.heritage-section {
			padding: 60px 15px;
		}
	}
</style>
