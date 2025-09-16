<script lang="ts">
	import HeroSection from '$lib/components/HeroSection.svelte';
	import FeaturedProducts from '$lib/components/FeaturedProducts.svelte';
	import LuxuryTestimonials from '$lib/components/LuxuryTestimonials.svelte';
	import LuxuryStatistics from '$lib/components/LuxuryStatistics.svelte';
	import LuxuryBespokeCommission from '$lib/components/LuxuryBespokeCommission.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';

	// Statistics data for the luxury statistics component
	const statisticsData = [
		{
			id: 'customersServed',
			icon: '👥',
			title: 'Discerning Clients Served',
			value: 500,
			suffix: '+',
			description: 'Collectors, designers, and connoisseurs worldwide',
			culturalNote: 'Each client becomes part of our extended family'
		},
		{
			id: 'productsSold',
			icon: '💎',
			title: 'Masterpieces Created',
			value: 1250,
			suffix: '+',
			description: 'Each piece uniquely handcrafted',
			culturalNote: 'Every creation carries a story spanning generations'
		},
		{
			id: 'masterArtisans',
			icon: '👑',
			title: 'Master Artisans',
			value: 15,
			suffix: '',
			description: 'Generations of expertise in every piece',
			culturalNote: 'Keepers of 2,847 years of Ethiopian craftsmanship'
		},
		{
			id: 'combinedFollowers',
			icon: '🌍',
			title: 'Global Community',
			value: 50000,
			suffix: '+',
			description: 'Collectors and admirers across 25+ countries',
			culturalNote: 'United by appreciation for authentic heritage'
		}
	];
</script>

<svelte:head>
	<title>MellaStudio - Ethiopian Heritage Meets Contemporary Luxury | Handcrafted Lighting</title>
	<meta
		name="description"
		content="Experience the pinnacle of Ethiopian craftsmanship with MellaStudio's luxury lighting collection. Each piece is handcrafted by master artisans, transforming spaces into cultural sanctuaries. International shipping available."
	/>
	<meta
		name="keywords"
		content="luxury lighting, Ethiopian craftsmanship, handmade lighting, cultural heritage, artisan lighting, premium home decor, bespoke lighting, heritage design"
	/>
	<meta property="og:title" content="MellaStudio - Where Culture Illuminates Luxury" />
	<meta
		property="og:description"
		content="Discover handcrafted Ethiopian lighting that transcends ordinary illumination. Each piece tells a thousand-year story."
	/>
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<Navbar />

<main class="relative bg-mellastudio-very-light">
	<!-- Hero Section - Full viewport with proper navbar integration -->
	<section id="hero" class="relative">
		<HeroSection />
	</section>

	<!-- Featured Products - Curated selection -->
	<section id="featured" class="relative z-20 bg-mellastudio-very-light">
		<FeaturedProducts
			sectionTitle="SHOP THE LOOK"
			sectionSubtitle=""
			showPricing={true}
			ctaText="Explore Full Collection"
			ctaLink="/collection"
		/>
	</section>

	<!-- Our Story Teaser Section -->
	<section id="our-mission" class="relative z-20 bg-white">
		<div class="mission-teaser">
			<div class="mission-container">
				<div class="mission-content">
					<span class="mission-badge">OUR MISSION</span>
					<h2 class="mission-title">
						MELLASTUDIO WAS FOUNDED WITH A SIMPLE PREMISE IN MIND:
						<span class="mission-highlight">
							OFFER DESIGNER LIGHTING AT PRICES ACCESSIBLE TO EVERYONE.
						</span>
					</h2>
					<div class="mission-description">
						<p>
							We use the same factories as your favorite retailers, but because we use a direct to
							consumer model, we bypass traditional retail markups and pass the savings on to you.
						</p>
					</div>
					<div class="mission-cta">
						<a href="/about" class="read-story-btn">READ OUR STORY</a>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Luxury Testimonials - Sophisticated, heartfelt stories -->
	<section id="testimonials" class="relative z-20">
		<LuxuryTestimonials
			sectionTitle="Voices of Distinction"
			sectionSubtitle="Beautiful stories from those who have transformed their homes into sanctuaries of light, warmth, and connection"
			badgeText="HEARTFELT STORIES FROM OUR COMMUNITY"
			showHeartSignals={true}
			showFeaturedCarousel={true}
			showAllReviews={true}
			ctaTitle="Create Your Own Story"
			ctaSubtitle="Join discerning homeowners who have chosen to surround themselves with meaningful beauty"
			primaryCtaText="Discover Your Perfect Piece"
			primaryCtaLink="/collection"
			secondaryCtaText="Share Your Story"
			secondaryCtaLink="/contact"
		/>
	</section>

	<!-- Why Shop MellaStudio Section -->
	<LuxuryStatistics
		sectionTitle="WHY SHOP MELLASTUDIO"
		sectionSubtitle="Experience the difference of authentic Ethiopian craftsmanship and heritage-driven luxury"
		badgeText="THE MELLASTUDIO DIFFERENCE"
	/>

	<!-- Beautiful Lighting Possibilities Section -->
	<!-- <LuxuryBespokeCommission
		badgeText="BEAUTIFUL POSSIBILITIES"
		sectionTitle="Light Your Beautiful Life"
		sectionSubtitle="Every home deserves lighting that reflects the love and care you put into creating your sanctuary. Let us help you bring warmth and beauty to the spaces where your most cherished memories unfold."
		backgroundStyle="light"
		primaryCtaText="Start Your Journey"
		primaryCtaLink="#consultation"
		secondaryCtaText="Explore Our Collection"
		secondaryCtaLink="#collection"
		priceNote="*Personalized pieces start at $5,000. Thoughtfully crafted over 12-16 weeks."
	/> -->
</main>

<Footer />

<style>
	/* Global counter styling with responsive sizing */
	:global(.counter) {
		@apply text-xl sm:text-2xl lg:text-3xl font-bold text-white;
		word-break: keep-all;
		white-space: nowrap;
		display: inline-block;
	}

	/* Smooth scrolling */
	:global(html) {
		scroll-behavior: smooth;
	}

	/* Clean scroll offset for anchor links - minimal and consistent */
	:global(#featured, #testimonials, #bespoke, #our-mission) {
		scroll-margin-top: 100px;
	}

	/* Mission Teaser Section */
	.mission-teaser {
		padding: 120px 20px;
		background: #faf9f7;
	}

	.mission-container {
		max-width: 1200px;
		margin: 0 auto;
		text-align: center;
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

	.mission-title {
		font-size: clamp(2rem, 5vw, 3.5rem);
		font-weight: 300;
		line-height: 1.3;
		color: #2c2c2c;
		margin-bottom: 2rem;
		font-family: 'Inter', dream;
		max-width: 1000px;
		margin-left: auto;
		margin-right: auto;
	}

	.mission-highlight {
		color: #a8b4a0;
		font-weight: 300;
	}

	.mission-description {
		max-width: 600px;
		margin: 0 auto 3rem;
	}

	.mission-description p {
		font-size: 1.125rem;
		line-height: 1.7;
		color: #666;
	}

	.read-story-btn {
		display: inline-block;
		padding: 12px 32px;
		background: #e4a474;
		color: white;
		text-decoration: none;
		font-weight: 500;
		font-size: 0.9rem;
		letter-spacing: 1px;
		text-transform: uppercase;
		transition: all 0.3s ease;
		border: none;
		cursor: pointer;
	}

	.read-story-btn:hover {
		background: #d49660;
		transform: translateY(-2px);
		box-shadow: 0 8px 25px rgba(228, 164, 116, 0.3);
	}

	@media (max-width: 768px) {
		.mission-teaser {
			padding: 80px 15px;
		}

		.mission-title {
			margin-bottom: 1.5rem;
		}

		.mission-description {
			margin-bottom: 2rem;
		}
	}
</style>
