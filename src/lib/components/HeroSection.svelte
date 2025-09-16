<script lang="ts">
	import { onMount } from 'svelte';
	import {
		activeHeroSection,
		heroLoading,
		heroError,
		heroReady,
		defaultHeroSections,
		type HeroSection
	} from '$lib/cms/hero';
	import wideLanding from '$lib/assets/images/Etegen Profile cover.jpg';
	import wideLandingSmall from '$lib/assets/images/etege long cover.jpg';

	// Use CMS hero section with fallback to default
	$: heroData = $activeHeroSection || {
		id: 'default-fallback',
		tenantId: '23b5b436-cb52-4a97-baaa-dc37f86b6d19',
		...defaultHeroSections[0],
		backgroundMedia: {
			desktop: wideLandingSmall,
			mobile: wideLanding
		},
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	};

	$: console.log('heroData', heroData);

	let mounted = false;
	let heroRef: HTMLElement;
	let scrollY = 0;

	// Dynamic headline parsing
	$: headlineWords = heroData.headline.trim().split(/\s+/);
	$: firstWord = headlineWords[0] || '';
	$: lastWord = headlineWords[headlineWords.length - 1] || '';
	$: middleWords = headlineWords.slice(1, -1).join(' ');

	onMount(() => {
		mounted = true;

		const handleScroll = () => {
			scrollY = window.scrollY;
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});

	// Subtle parallax
	$: parallaxTransform = `translateY(${scrollY * 0.2}px)`;
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Playfair+Display:wght@300;400;500;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<section
	bind:this={heroRef}
	class="relative overflow-hidden min-h-screen flex items-center justify-center bg-mellastudio-very-light pt-20"
	class:animate-in={mounted}
>
	<!-- Clean Background -->
	<div class="absolute inset-0 z-0">
		<div
			class="relative w-full h-full transition-transform duration-75 ease-out"
			style="transform: {parallaxTransform};"
		>
			<!-- Responsive background image -->
			<img
				src={heroData.backgroundMedia.desktop}
				alt="MellaStudio Ethiopian Heritage Lighting"
				class="w-full h-full object-cover object-center block md:block"
				style="object-position: center bottom;"
			/>
			<!-- Mobile-specific image -->
			<img
				src={heroData.backgroundMedia.mobile}
				alt="MellaStudio Ethiopian Heritage Lighting"
				class="w-full h-full object-cover object-center block md:hidden"
				style="object-position: center bottom;"
			/>
		</div>

		<!-- Minimal overlay -->
		<!-- <div class="absolute inset-0 bg-white/70"></div> -->
	</div>

	<!-- CMS Loading and Error States -->
	{#if $heroLoading}
		<div class="absolute inset-0 z-20 flex items-center justify-center bg-white/80">
			<div class="text-center">
				<div
					class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"
				></div>
				<p class="text-gray-600 text-sm">Loading hero content...</p>
			</div>
		</div>
	{/if}

	{#if $heroError}
		<div
			class="absolute top-4 right-4 z-20 bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded text-xs"
		>
			CMS Error: {$heroError}
		</div>
	{/if}

	<!-- Content -->
	<div class="relative z-10 w-full h-full flex items-center px-6 md:px-12 lg:px-16">
		<div class="max-w-4xl mt-16 md:mt-40">
			<h1
				class="font-montserrat font-normal leading-tight mb-6 text-4xl md:text-7xl lg:text-6xl opacity-0 transform translate-x-12 transition-all duration-1000 ease-out headline"
				class:animate-in={mounted}
			>
				<!-- First Word with The Seasons Font -->
				<span class="first-word font-seasons" style="color: {heroData.firstWordStyle.color};">
					{firstWord}
				</span>

				<!-- Middle Words -->
				{#if middleWords}
					<span class="middle-words text-gray-900 font-light">
						{' ' + middleWords + ' '}
					</span>
				{/if}

				<!-- Last Word with The Seasons Font -->
				<span class="last-word font-seasons" style="color: {heroData.lastWordStyle.color};">
					{lastWord}
				</span>
			</h1>

			<p
				class="text-lg md:text-xl font-light leading-relaxed opacity-0 transform translate-y-8 transition-all duration-1000 ease-out text-gray-700 subtitle max-w-3xl"
				class:animate-in={mounted}
			>
				{heroData.subtitle}
			</p>

			<!-- Clean CTA -->
			<div
				class="mt-8 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out cta-section"
				class:animate-in={mounted}
			>
				<a
					href={heroData.cta.href}
					class="inline-block px-12 py-4 rounded-3xl bg-black text-white font-light tracking-[0.15em] uppercase hover:bg-gray-900 transition-all duration-500 hover:-translate-y-0.5 text-base shadow-lg"
				>
					{heroData.cta.text}
				</a>
			</div>
		</div>

		<!-- Simple Scroll Indicator -->
		<div
			class="absolute -bottom-40 left-1/2 transform -translate-x-1/2 opacity-0 transition-all duration-1000 ease-out scroll-indicator"
			class:animate-in={mounted}
		>
			<div class="flex flex-col items-center text-gray-500 text-xs">
				<span class="mb-2 tracking-wider uppercase font-light">Scroll</span>
				<div class="w-px h-6 bg-gray-400"></div>
			</div>
		</div>
	</div>
</section>

<style>
	.font-montserrat {
		font-family: 'Montserrat', sans-serif;
	}

	.animate-in.animate-in {
		opacity: 1 !important;
		transform: translateY(0) !important;
	}

	/* Staggered animation delays */
	.headline.animate-in {
		transition-delay: 0.2s;
	}

	.subtitle.animate-in {
		transition-delay: 0.4s;
	}

	.cta-section.animate-in {
		transition-delay: 0.6s;
	}

	.scroll-indicator.animate-in {
		transition-delay: 0.8s;
	}

	/* Responsive adjustments */
	@media (max-width: 768px) {
		.headline {
			line-height: 1.1;
		}

		.first-word,
		.last-word {
			display: block;
			margin: 0.1em 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		* {
			animation-duration: 0.01ms !important;
			transition-duration: 0.01ms !important;
		}
	}
</style>
