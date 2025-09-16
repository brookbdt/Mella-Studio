<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	// Import images for "In Real Life" section
	import new2 from '$lib/assets/images/new2.jpg';
	import new3 from '$lib/assets/images/new3.jpg';
	import new5 from '$lib/assets/images/new5.jpg';
	import new6 from '$lib/assets/images/new6.jpg';
	import new7 from '$lib/assets/images/new7.jpg';
	import new8 from '$lib/assets/images/new8.jpg';
	import new9 from '$lib/assets/images/new9.jpg';
	import gallery1 from '$lib/assets/images/gallery1.jpg';
	import gallery2 from '$lib/assets/images/gallery2.jpg';

	// Import the redesigned Partners component
	import OurPartners from './OurPartners.svelte';

	interface Testimonial {
		id: string;
		name: string;
		title: string;
		location: string;
		image?: string;
		rating: number;
		purchaseValue: number;
		purchaseDate: string;
		productsPurchased: string[];
		quote: string;
		fullReview: string;
		beforeImage?: string;
		afterImage?: string;
		videoUrl?: string;
		verified: boolean;
		featured: boolean;
		personalStory?: string;
		emotionalConnection?: string;
		favoriteFeature?: string;
		artisanMention?: string;
		spaceTransformation?: string;
	}

	interface HeartSignal {
		icon: string;
		title: string;
		description: string;
		emotionalBenefit: string;
	}

	interface RealLifeImage {
		id: string;
		url: string;
		alt: string;
		caption?: string;
		customerName?: string;
		location?: string;
		productName?: string;
		isVideo?: boolean;
		aspectRatio?: string;
		position?: {
			top: string;
			left: string;
			width: string;
			height: string;
		};
	}

	// Default testimonials with sophisticated, warm storytelling
	const defaultTestimonials: Testimonial[] = [
		{
			id: 'beloved-001',
			name: 'Hanan Abdullahi',
			title: 'Art Curator & Mother',
			location: 'Manhattan, New York',
			image: '', // CMS placeholder - will show initials if empty
			rating: 5,
			purchaseValue: 8500,
			purchaseDate: '2024-01-15',
			productsPurchased: ['Mender Heritage Pendant', 'Qedamawi Royal Table Lamp'],
			quote:
				'Every evening when I light my Mella pieces, my whole home feels transformed. My daughter says our dining room now feels like where stories live.',
			fullReview:
				"There's something profoundly moving about coming home to these beautiful lights. After long days at the museum, the gentle glow from my Mender pendant welcomes me with such warmth. My teenage daughter, who rarely comments on home decor, told me our dining room now feels like 'a place where stories come alive.' The craftsmanship is exquisite, but it's the feeling these pieces create that truly matters - a sense of belonging, beauty, and home.",
			verified: true,
			featured: true,
			personalStory:
				"As a busy professional and mother, I wanted our home to feel like a sanctuary. These lights don't just illuminate - they nurture.",
			emotionalConnection:
				'Each piece holds the stories of Ethiopian artisans, and I feel connected to their heritage and craft every day.',
			favoriteFeature:
				'The way the light dances through the patterns creates the most beautiful shadows on our walls',
			artisanMention: 'Master Alemayehu',
			spaceTransformation:
				"Our dining room went from functional to magical - it's now where our family naturally gathers"
		},
		{
			id: 'beloved-002',
			name: 'Isabella Rossi',
			title: 'Interior Designer & Art Collector',
			location: 'Milano, Italy',
			image: '', // CMS placeholder
			rating: 5,
			purchaseValue: 15600,
			purchaseDate: '2023-08-22',
			productsPurchased: ['Qedamawi Collection', 'Custom Consultation'],
			quote:
				"In 25 years of creating beautiful spaces, I've learned that true luxury isn't about price - it's about how a space makes you feel. Mella Studio understands this deeply.",
			fullReview:
				"When my granddaughter visits and sees the Qedamawi lamps glowing in my studio, she calls them 'fairy lights for grown-ups.' That's exactly what they are - they bring wonder and beauty into everyday moments. My clients don't just buy these pieces; they fall in love with them. There's an intimacy and warmth that you simply can't find elsewhere. Every piece tells a story of love, tradition, and the gentle hands that crafted it.",
			verified: true,
			featured: true,
			personalStory:
				'These pieces remind me why I became a designer - to create spaces that nurture the soul',
			emotionalConnection: 'I see generations of wisdom and artistry in every curve and pattern',
			favoriteFeature: 'The way each piece seems to hold and reflect the love put into creating it',
			artisanMention: 'Master Tigist',
			spaceTransformation:
				'My studio became a place of inspiration where both my clients and I feel deeply at peace'
		},
		{
			id: 'beloved-003',
			name: 'Selamawit Tadesse',
			title: 'Writer & Mindfulness Coach',
			location: 'London, England',
			image: '', // CMS placeholder
			rating: 5,
			purchaseValue: 4200,
			purchaseDate: '2024-02-10',
			productsPurchased: ['Nikisat Table Lamp', 'Meditation Corner Setup'],
			quote:
				'My morning practice transformed completely when I added the Nikisat lamp. The gentle light feels like being held by warm, loving energy.',
			fullReview:
				"As someone who teaches mindfulness and writes about finding peace in daily life, I can honestly say that these lights have become integral to my practice. The Nikisat lamp in my meditation corner creates such a sacred atmosphere. Students often comment on how different the energy feels in my space. It's not just about the beauty - though they are breathtaking - it's about the intention and love woven into every piece. They create sanctuaries, not just illumination.",
			verified: true,
			featured: true,
			personalStory:
				'I wanted lighting that would support my spiritual practice and create calm in my busy London flat',
			emotionalConnection:
				'These pieces connect me to ancient wisdom and the healing power of beautiful, intentional objects',
			favoriteFeature:
				'The incredibly soothing quality of the light - it feels healing and nurturing',
			artisanMention: 'Master Dawit',
			spaceTransformation:
				'My small flat became a peaceful retreat where I can truly restore and create'
		},
		{
			id: 'beloved-004',
			name: 'Zara Mengiste',
			title: 'Tech Executive',
			location: 'San Francisco, California',
			image: '', // CMS placeholder
			rating: 5,
			purchaseValue: 6800,
			purchaseDate: '2024-03-05',
			productsPurchased: ['Ensosila Floor Lamp', 'Custom Consultation'],
			quote:
				'These pieces bring such warmth to my home office. Every video call, colleagues ask about the beautiful lighting behind me.',
			fullReview:
				"Working in tech, I'm surrounded by screens and artificial light all day. Coming home to the warm glow of my Ensosila lamp feels like stepping into a completely different world. The craftsmanship is incredible, and there's something so grounding about having a piece that connects me to my Ethiopian heritage in my California home.",
			verified: true,
			featured: false,
			personalStory: 'I wanted to bring warmth and heritage into my modern home',
			emotionalConnection:
				'These pieces connect me to my roots while fitting perfectly in my contemporary space',
			favoriteFeature: 'The way the lamp transforms the entire energy of my workspace',
			artisanMention: 'Master Haile',
			spaceTransformation: 'My home office became a place I actually want to spend time in'
		},
		{
			id: 'beloved-005',
			name: 'Meron Kassahun',
			title: 'Doctor & Mother',
			location: 'Toronto, Canada',
			image: '', // CMS placeholder
			rating: 5,
			purchaseValue: 5200,
			purchaseDate: '2023-12-18',
			productsPurchased: ['Tilet Table Lamp Set', 'Bedroom Setup'],
			quote:
				'After long shifts at the hospital, these lights welcome me home with such gentle beauty. My children love the soft glow in their bedtime stories.',
			fullReview:
				"As a pediatrician, I see how light affects mood and comfort every day. These lamps create the most nurturing atmosphere in our home. My kids actually prefer the warm light of our Mella lamps to overhead lighting for their bedtime routine. It's become part of our family's rhythm.",
			verified: true,
			featured: false,
			personalStory: 'I wanted lighting that would create calm after stressful days',
			emotionalConnection: 'The gentle light helps our whole family unwind and connect',
			favoriteFeature: 'How the soft light makes everything feel more peaceful and intimate',
			artisanMention: 'Master Tigist',
			spaceTransformation: 'Our bedroom became a true sanctuary for rest and family time'
		}
	];

	// Minimal, impactful benefits
	const defaultHeartSignals: HeartSignal[] = [
		{
			icon: '',
			title: 'Handcrafted',
			description: 'Made by Ethiopian artisans',
			emotionalBenefit: 'Unique & meaningful'
		},
		{
			icon: '',
			title: 'Transform',
			description: 'Instantly warmer spaces',
			emotionalBenefit: 'Home you love'
		},
		{
			icon: '',
			title: 'Sustainable',
			description: 'Built to last generations',
			emotionalBenefit: 'Feel good choice'
		},
		{
			icon: '',
			title: 'Support',
			description: 'Helps Ethiopian families',
			emotionalBenefit: 'Make a difference'
		}
	];

	// Natural scattered layout with mixed orientations
	const defaultRealLifeImages: RealLifeImage[] = [
		{
			id: 'irl-001',
			url: new6,
			alt: 'Beautiful lamp in modern interior',
			caption: 'Perfect lighting for our bedroom',
			customerName: 'Sarah M.',
			location: 'Brooklyn, NY',
			productName: 'Mender Pendant',
			aspectRatio: '3/4', // Vertical
			position: { top: '5%', left: '8%', width: '22%', height: '45%' }
		},
		{
			id: 'irl-002',
			url: gallery1,
			alt: 'Elegant pendant in dining area',
			caption: 'Creates such warm ambiance',
			customerName: 'Maya T.',
			location: 'Seattle, WA',
			productName: 'Qedamawi Pendant',
			aspectRatio: '4/3', // Horizontal
			position: { top: '12%', left: '35%', width: '30%', height: '28%' }
		},
		{
			id: 'irl-003',
			url: new7,
			alt: 'Reading corner with beautiful lighting',
			caption: 'My favorite spot in the house',
			customerName: 'Jennifer L.',
			location: 'Austin, TX',
			productName: 'Reading Lamp',
			aspectRatio: '1/1', // Square
			position: { top: '8%', left: '70%', width: '24%', height: '32%' }
		},
		{
			id: 'irl-004',
			url: gallery2,
			alt: 'Living room with statement lighting',
			caption: 'Transforms our entire space',
			customerName: 'David K.',
			location: 'Portland, OR',
			productName: 'Floor Lamp',
			aspectRatio: '4/3', // Horizontal
			position: { top: '58%', left: '15%', width: '28%', height: '26%' }
		},
		{
			id: 'irl-005',
			url: new8,
			alt: 'Cozy corner with modern lamp',
			caption: 'Perfect for evening reading',
			customerName: 'Ahmed R.',
			location: 'Toronto, CA',
			productName: 'Table Lamp',
			aspectRatio: '3/4', // Vertical
			position: { top: '45%', left: '48%', width: '20%', height: '42%' }
		},
		{
			id: 'irl-006',
			url: new9,
			alt: 'Modern workspace with elegant lighting',
			caption: 'Makes working from home beautiful',
			customerName: 'Lisa K.',
			location: 'San Francisco, CA',
			productName: 'Desk Lamp',
			aspectRatio: '4/3', // Horizontal
			position: { top: '52%', left: '72%', width: '25%', height: '22%' }
		}
	];

	// CMS-Ready Props with sophisticated, subtle defaults
	export let sectionTitle: string = 'Voices of Distinction';
	export let sectionSubtitle: string =
		'Beautiful stories from those who have transformed their homes into sanctuaries of light, warmth, and connection';
	export let badgeText: string = 'HEARTFELT STORIES FROM OUR COMMUNITY';
	export let showHeartSignals: boolean = true;
	export let showFeaturedCarousel: boolean = true;
	export let showAllReviews: boolean = true;
	export let showRealLifeSection: boolean = true;
	export let showPartnersSection: boolean = true;
	export let realLifeTitle: string = 'In Real Life';
	export let realLifeSubtitle: string =
		'See how our lighting transforms real homes, captured by the people who live with them every day';
	export let ctaTitle: string = 'Create Your Own Story';
	export let ctaSubtitle: string =
		'Join discerning homeowners who have chosen to surround themselves with meaningful beauty';
	export let primaryCtaText: string = 'Discover Your Perfect Piece';
	export let primaryCtaLink: string = '/collection';
	export let secondaryCtaText: string = 'Share Your Story';
	export let secondaryCtaLink: string = '/contact';
	export let testimonials: Testimonial[] = defaultTestimonials;
	export let heartSignals: HeartSignal[] = defaultHeartSignals;
	export let realLifeImages: RealLifeImage[] = defaultRealLifeImages;
	export let backgroundColor: string = 'bg-gradient-to-br from-sage-50 via-cream-50 to-warm-50';

	// Partners section configuration
	export let partnersTitle: string = 'Trusted by Exceptional Brands';
	export let partnersSubtitle: string =
		'We collaborate with distinguished partners who share our commitment to beauty and craftsmanship';

	// Animation and interaction state
	let sectionElement: HTMLElement;
	let carouselElement: HTMLElement;
	let heartElement: HTMLElement;
	let realLifeElement: HTMLElement;
	let isVisible = false;
	let carouselVisible = false;
	let heartVisible = false;
	let realLifeVisible = false;
	let currentTestimonial = 0;
	let showFullReview = false;
	let currentFullReview = '';
	let hoveredHeart: number | null = null;
	let hoveredImage: string | null = null;

	// Computed values
	$: featuredTestimonials = testimonials.filter((t) => t.featured);

	// Intersection Observer for sophisticated entrance animations
	onMount(() => {
		const observerOptions = {
			threshold: 0.1,
			rootMargin: '0px 0px -50px 0px'
		};

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const target = entry.target;
					if (target === sectionElement) isVisible = true;
					if (target === carouselElement) carouselVisible = true;
					if (target === heartElement) heartVisible = true;
					if (target === realLifeElement) realLifeVisible = true;
				}
			});
		}, observerOptions);

		// Observe multiple elements for elegant animations
		const elementsToObserve = [sectionElement, carouselElement, heartElement];
		if (realLifeElement) elementsToObserve.push(realLifeElement);

		elementsToObserve.forEach((el) => {
			if (el) observer.observe(el);
		});

		// Thoughtful auto-rotate for featured testimonials
		const interval = setInterval(() => {
			if (featuredTestimonials.length > 0) {
				currentTestimonial = (currentTestimonial + 1) % featuredTestimonials.length;
			}
		}, 10000);

		return () => {
			observer.disconnect();
			clearInterval(interval);
		};
	});

	// Utility functions
	function formatDate(dateString: string): string {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long'
		});
	}

	function renderStars(rating: number): string {
		return '★'.repeat(rating) + '☆'.repeat(5 - rating);
	}

	function openFullReview(review: string): void {
		currentFullReview = review;
		showFullReview = true;
	}

	function selectTestimonial(index: number): void {
		currentTestimonial = index;
	}
</script>

<section
	bind:this={sectionElement}
	class="relative py-12 sm:py-16 lg:py-24 xl:py-32 overflow-hidden bg-gradient-to-br from-green-50/30 via-amber-50/20 to-sage-100/40"
>
	<!-- Sophisticated, subtle background elements -->

	<!-- Responsive floating elements -->
	<div
		class="absolute top-1/4 left-4 sm:left-8 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-sage-400/20 rounded-full animate-float-gentle"
	></div>
	<div
		class="absolute top-2/3 right-6 sm:right-12 w-2 sm:w-3 h-2 sm:h-3 bg-amber-400/15 rounded-full animate-float-gentle-delayed"
	></div>
	<div
		class="absolute bottom-1/4 left-1/3 w-1 sm:w-1.5 h-1 sm:h-1.5 bg-green-400/20 rounded-full animate-float-gentle-slow"
	></div>

	<div class="relative z-10 w-full px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
		<!-- Responsive Header Section -->
		{#if isVisible}
			<div class="text-center mb-16 sm:mb-20 lg:mb-24 xl:mb-32 w-full">
				<div
					class="mb-6 sm:mb-8 lg:mb-12"
					in:fly={{ y: 30, duration: 800, delay: 200, easing: quintOut }}
				>
					<span
						class="inline-block px-4 sm:px-6 md:px-8 lg:px-12 py-2 sm:py-3 lg:py-4 bg-gradient-to-r from-sage-100/60 to-green-100/60 border border-sage-200/40 text-sage-800 text-xs sm:text-sm lg:text-base font-medium tracking-[0.2em] sm:tracking-[0.25em] rounded-full uppercase backdrop-blur-sm shadow-sm"
					>
						{badgeText}
					</span>
				</div>

				<!-- Fully Responsive Dominant Title -->
				<div class="flex justify-center mb-8 sm:mb-12 lg:mb-16 overflow-hidden">
					<h2
						class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl text-10xl font-light text-gray-900 tracking-tight leading-none text-center px-2"
						in:fly={{ y: 50, duration: 1000, delay: 400, easing: quintOut }}
					>
						{sectionTitle}
					</h2>
				</div>

				<div
					class="mb-12 sm:mb-16 lg:mb-20 xl:mb-24 max-w-sm sm:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto px-4"
					in:fly={{ y: 30, duration: 800, delay: 600, easing: quintOut }}
				>
					<p
						class="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-gray-600 leading-relaxed font-light"
					>
						{sectionSubtitle}
					</p>
				</div>
			</div>
		{/if}

		<!-- Responsive Featured Stories -->
		{#if showFeaturedCarousel && featuredTestimonials.length > 0}
			<div bind:this={carouselElement} class="mb-16 sm:mb-20 lg:mb-24 xl:mb-32">
				{#if carouselVisible}
					<div class="relative max-w-sm sm:max-w-2xl lg:max-w-5xl xl:max-w-7xl mx-auto">
						<div class="overflow-hidden">
							<div
								class="flex transition-transform duration-1000 ease-out"
								style="transform: translateX(-{currentTestimonial * 100}%)"
							>
								{#each featuredTestimonials as testimonial, index}
									<div class="w-full flex-shrink-0">
										<div
											class="max-w-sm sm:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8"
										>
											<!-- Responsive Rating -->
											<div
												class="text-xl sm:text-2xl lg:text-3xl text-amber-500 mb-4 sm:mb-6 lg:mb-8"
											>
												{renderStars(testimonial.rating)}
											</div>

											<!-- Responsive Quote -->
											<blockquote
												class="text-lg sm:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-gray-800 leading-relaxed font-light mb-6 sm:mb-8 lg:mb-12 max-w-xs sm:max-w-lg lg:max-w-2xl xl:max-w-4xl mx-auto"
											>
												"{testimonial.quote}"
											</blockquote>

											<!-- Responsive Author -->
											<div
												class="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6 lg:mb-8"
											>
												{#if testimonial.image}
													<img
														src={testimonial.image}
														alt={testimonial.name}
														class="w-12 sm:w-14 lg:w-16 h-12 sm:h-14 lg:h-16 rounded-full object-cover"
													/>
												{:else}
													<div
														class="w-12 sm:w-14 lg:w-16 h-12 sm:h-14 lg:h-16 rounded-full bg-gray-800 flex items-center justify-center text-white text-base sm:text-lg lg:text-xl font-light"
													>
														{testimonial.name.charAt(0)}
													</div>
												{/if}
												<div class="text-center sm:text-left">
													<div class="text-sm sm:text-base lg:text-lg font-medium text-gray-900">
														{testimonial.name}
													</div>
													<div class="text-xs sm:text-sm lg:text-base text-gray-500">
														{testimonial.location}
													</div>
												</div>
											</div>

											<!-- Responsive Button -->
											<button
												class="text-sm sm:text-base text-gray-600 hover:text-gray-800 transition-colors duration-300 border-b border-gray-300 hover:border-gray-800 pb-1"
												on:click={() => openFullReview(testimonial.fullReview)}
											>
												Read their full story
											</button>
										</div>
									</div>
								{/each}
							</div>
						</div>

						<!-- Responsive Dots -->
						<div class="flex justify-center mt-8 sm:mt-12 lg:mt-16 gap-2 sm:gap-3 lg:gap-4">
							{#each featuredTestimonials as _, index}
								<button
									class="w-2 sm:w-2.5 lg:w-3 h-2 sm:h-2.5 lg:h-3 rounded-full transition-all duration-300 {currentTestimonial ===
									index
										? 'bg-gray-800 scale-110'
										: 'bg-gray-300 hover:bg-gray-400'}"
									on:click={() => selectTestimonial(index)}
								></button>
							{/each}
						</div>
					</div>
				{/if}
			</div>
		{/if}

		<!-- Responsive Benefits Grid -->
		{#if showHeartSignals}
			<div bind:this={heartElement} class="mb-16 sm:mb-20 lg:mb-24 xl:mb-32">
				{#if heartVisible}
					<div
						class="text-center mb-12 sm:mb-16 lg:mb-20 max-w-sm sm:max-w-2xl lg:max-w-4xl mx-auto px-4"
					>
						<h3
							class="text-xl sm:text-2xl lg:text-3xl xl:text-6xl font-light text-gray-900 mb-3 sm:mb-4 lg:mb-6"
						>
							Why Choose Mella Studio
						</h3>
						<p class="text-sm sm:text-base lg:text-lg text-gray-600">
							Beautiful lighting that makes a difference
						</p>
					</div>

					<div
						class="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 2xl:gap-20 max-w-sm sm:max-w-2xl lg:max-w-5xl xl:max-w-7xl mx-auto px-4"
					>
						{#each heartSignals as signal, index}
							<div
								class="text-center"
								in:fly={{ y: 20, duration: 400, delay: 200 + index * 100, easing: quintOut }}
							>
								<div class="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl mb-3 sm:mb-4 lg:mb-6">
									{signal.icon}
								</div>
								<h4
									class="text-sm sm:text-base lg:text-lg xl:text-xl font-medium text-gray-900 mb-1 sm:mb-2 lg:mb-3"
								>
									{signal.title}
								</h4>
								<p class="text-xs sm:text-sm lg:text-base text-gray-600 mb-1 sm:mb-2">
									{signal.description}
								</p>
								<p class="text-xs sm:text-sm text-gray-800 font-medium">
									{signal.emotionalBenefit}
								</p>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		{/if}

		<!-- Responsive Stories Grid -->

		<!-- Responsive "In Real Life" Section -->
		{#if showRealLifeSection && realLifeImages.length > 0}
			<div bind:this={realLifeElement} class="mb-16 sm:mb-20 lg:mb-24 xl:mb-32">
				{#if realLifeVisible}
					<div
						class="text-center mb-12 sm:mb-16 lg:mb-20 max-w-sm sm:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto px-4"
					>
						<!-- Prominent "IN REAL" + "Life" Typography -->
						<div class="mb-4 sm:mb-6 lg:mb-8">
							<!-- "IN REAL" - Bold and Dominant -->
							<h3
								class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-black text-gray-900 tracking-tight leading-none mb-2 sm:mb-3 lg:mb-4"
							>
								IN REAL
							</h3>
							<!-- "Life" - Playful placement with sophisticated styling -->
							<div class="relative flex justify-center">
								<span
									class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-light text-gray-600 italic tracking-wide transform -rotate-1 relative z-10"
								>
									Life
								</span>
								<!-- Subtle decorative underline -->
								<div
									class="absolute bottom-1 sm:bottom-2 lg:bottom-3 left-1/2 transform -translate-x-1/2 w-16 sm:w-20 lg:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-amber-400 to-sage-400 rounded-full"
								></div>
							</div>
						</div>

						<p
							class="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-600 max-w-xs sm:max-w-lg lg:max-w-2xl xl:max-w-3xl mx-auto font-light"
						>
							{realLifeSubtitle}
						</p>
					</div>

					<!-- Natural Scattered Layout -->
					<div
						class="relative max-w-7xl mx-auto px-4 min-h-[780px] sm:min-h-[500px] lg:min-h-[600px]"
					>
						{#each realLifeImages as image, index}
							{@const defaultPosition = { top: '0%', left: '0%', width: '25%', height: '35%' }}
							{@const imagePosition = image.position || defaultPosition}
							{@const mobilePositions = [
								{ top: '0%', left: '0%', width: '100%', height: '200px' },
								{ top: '220px', left: '0%', width: '48%', height: '180px' },
								{ top: '220px', left: '52%', width: '48%', height: '180px' },
								{ top: '420px', left: '0%', width: '48%', height: '160px' },
								{ top: '420px', left: '52%', width: '48%', height: '160px' },
								{ top: '600px', left: '24%', width: '48%', height: '160px' }
							]}
							{@const mobilePosition = mobilePositions[index] || mobilePositions[0]}

							<div
								class="absolute group cursor-pointer hidden sm:block"
								style="top: {imagePosition.top}; left: {imagePosition.left}; width: {imagePosition.width}; height: {imagePosition.height};"
								in:fly={{
									y: 20,
									duration: 600,
									delay: 200 + index * 100,
									easing: quintOut
								}}
								on:mouseenter={() => (hoveredImage = image.id)}
								on:mouseleave={() => (hoveredImage = null)}
							>
								<!-- Flat Image Container -->
								<div class="relative w-full h-full">
									<img
										src={image.url}
										alt={image.alt}
										class="w-full h-full object-cover"
										style="aspect-ratio: {image.aspectRatio || '4/3'}"
										loading="lazy"
									/>

									<!-- Simple Overlay on Hover -->
									{#if hoveredImage === image.id}
										<div
											class="absolute inset-0 bg-black/10 flex items-end p-3"
											in:fade={{ duration: 200 }}
										>
											<div class="text-gray-900 bg-white/95 px-3 py-2 text-xs">
												{#if image.caption}
													<p class="font-medium">"{image.caption}"</p>
												{/if}
												{#if image.customerName}
													<p class="opacity-70 mt-1">— {image.customerName}</p>
												{/if}
											</div>
										</div>
									{/if}
								</div>
							</div>

							<!-- Mobile Layout -->
							{#if index < 6}
								<div
									class="absolute group cursor-pointer block sm:hidden"
									style="top: {mobilePosition.top}; left: {mobilePosition.left}; width: {mobilePosition.width}; height: {mobilePosition.height};"
									in:fly={{
										y: 20,
										duration: 600,
										delay: 200 + index * 100,
										easing: quintOut
									}}
									on:mouseenter={() => (hoveredImage = image.id)}
									on:mouseleave={() => (hoveredImage = null)}
								>
									<!-- Flat Image Container -->
									<div class="relative w-full h-full">
										<img
											src={image.url}
											alt={image.alt}
											class="w-full h-full object-cover"
											loading="lazy"
										/>

										<!-- Simple Overlay on Hover -->
										{#if hoveredImage === image.id}
											<div
												class="absolute inset-0 bg-black/10 flex items-end p-3"
												in:fade={{ duration: 200 }}
											>
												<div class="text-gray-900 bg-white/95 px-3 py-2 text-xs">
													{#if image.caption}
														<p class="font-medium">"{image.caption}"</p>
													{/if}
													{#if image.customerName}
														<p class="opacity-70 mt-1">— {image.customerName}</p>
													{/if}
												</div>
											</div>
										{/if}
									</div>
								</div>
							{/if}
						{/each}
					</div>
				{/if}
			</div>
		{/if}

		<!-- Partners Section -->
		{#if showPartnersSection}
			<div class="">
				<OurPartners
					sectionTitle={partnersTitle}
					sectionSubtitle={partnersSubtitle}
					backgroundColor="bg-transparent"
				/>
			</div>
		{/if}
	</div>
</section>

<!-- Full Story Modal -->
{#if showFullReview}
	<div
		class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
		on:click={() => (showFullReview = false)}
		in:fade={{ duration: 300 }}
	>
		<div
			class="bg-white rounded-3xl max-w-4xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
			on:click|stopPropagation
		>
			<div class="relative p-8 lg:p-12">
				<button
					class="absolute top-6 right-6 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
					on:click={() => (showFullReview = false)}
				>
					<span class="text-xl text-gray-700">×</span>
				</button>

				<div class="pr-12">
					<h4 class="text-2xl lg:text-3xl font-light text-gray-900 mb-8">A Beautiful Story</h4>
					<div class="prose prose-lg max-w-none">
						<p class="text-gray-800 leading-relaxed text-lg">
							{currentFullReview}
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	/* Custom gradient utilities */
	.bg-gradient-radial {
		background: radial-gradient(circle, var(--tw-gradient-stops));
	}

	/* Gentle floating animations */
	@keyframes float-gentle {
		0%,
		100% {
			transform: translateY(0px);
		}
		50% {
			transform: translateY(-15px);
		}
	}

	@keyframes float-gentle-delayed {
		0%,
		100% {
			transform: translateY(0px);
		}
		50% {
			transform: translateY(-20px);
		}
	}

	@keyframes float-gentle-slow {
		0%,
		100% {
			transform: translateY(0px);
		}
		50% {
			transform: translateY(-10px);
		}
	}

	.animate-float-gentle {
		animation: float-gentle 8s ease-in-out infinite;
	}

	.animate-float-gentle-delayed {
		animation: float-gentle-delayed 10s ease-in-out infinite 2s;
	}

	.animate-float-gentle-slow {
		animation: float-gentle-slow 12s ease-in-out infinite 4s;
	}

	/* Sophisticated typography */
	.font-light {
		font-weight: 300;
	}

	/* Elegant shadow effects */
	.hover\:shadow-xl:hover {
		box-shadow: 0 20px 40px -12px rgba(134, 156, 120, 0.15);
	}

	/* Glass morphism for sophistication */
	.backdrop-blur-sm {
		backdrop-filter: blur(8px) saturate(1.5);
	}

	/* Prose styling for modal */
	.prose {
		color: #374151;
		line-height: 1.75;
	}

	.prose p {
		margin-bottom: 1.25em;
	}

	.prose-lg {
		font-size: 1.125rem;
		line-height: 1.7;
	}

	/* Sophisticated focus states */
	button:focus-visible,
	a:focus-visible {
		outline: 2px solid #6b7c5b;
		outline-offset: 2px;
	}

	/* Reduced motion support */
	@media (prefers-reduced-motion: reduce) {
		* {
			animation-duration: 0.01ms !important;
			animation-iteration-count: 1 !important;
			transition-duration: 0.01ms !important;
		}

		.animate-float-gentle,
		.animate-float-gentle-delayed,
		.animate-float-gentle-slow {
			animation: none;
		}
	}

	/* Enhanced mobile responsiveness */
	@media (max-width: 640px) {
		/* Mobile title adjustments */
		h2 {
			word-break: break-word;
			line-height: 1.1;
		}

		/* Stack benefits on mobile */
		.grid-cols-2 {
			gap: 1.5rem;
		}

		/* Better mobile carousel */
		.overflow-hidden {
			touch-action: pan-x;
		}
	}

	@media (max-width: 768px) {
		/* Tablet adjustments */
		.lg\:grid-cols-4 {
			grid-template-columns: repeat(2, 1fr);
		}

		.lg\:grid-cols-3 {
			grid-template-columns: 1fr;
		}

		/* Better spacing on tablet */
		.xl\:gap-20 {
			gap: 3rem;
		}
	}

	@media (min-width: 1920px) {
		/* 4K and ultra-wide support */
		.text-10xl {
			font-size: 8rem;
		}

		.max-w-8xl {
			max-width: 88rem;
		}
	}

	/* Touch device optimizations */
	@media (hover: none) {
		button:hover {
			transform: none;
			background-color: initial;
		}

		.hover\:bg-gray-400:hover {
			background-color: #9ca3af;
		}

		.hover\:scale-110:hover {
			transform: none;
		}
	}

	/* High DPI displays */
	@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
		.blur-xl {
			backdrop-filter: blur(20px);
		}

		.backdrop-blur-sm {
			backdrop-filter: blur(4px);
		}
	}

	/* Landscape phone orientation */
	@media (max-height: 500px) and (orientation: landscape) {
		.py-12 {
			padding-top: 2rem;
			padding-bottom: 2rem;
		}

		.mb-16 {
			margin-bottom: 2rem;
		}
	}

	/* Print styles */
	@media print {
		.animate-float-gentle,
		.animate-float-gentle-delayed,
		.animate-float-gentle-slow {
			animation: none;
		}

		.bg-gradient-to-br {
			background: white;
		}

		.absolute {
			display: none;
		}
	}
</style>
