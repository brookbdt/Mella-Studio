<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	import Partner1 from '$lib/assets/images/Partner1.png';
	import Partner2 from '$lib/assets/images/Partner2.png';
	import Partner3 from '$lib/assets/images/Partner3.png';
	import Partner4 from '$lib/assets/images/Partner4.png';
	import Partner5 from '$lib/assets/images/Partner5.png';
	import Partner6 from '$lib/assets/images/Partner6.png';
	import Partner7 from '$lib/assets/images/Partner7.png';
	import Partner8 from '$lib/assets/images/Partner8.png';

	interface Partner {
		id: string;
		logo: string;
		name: string;
	}

	// Actual partner logos
	const partners: Partner[] = [
		{ id: 'partner-001', logo: Partner1, name: 'Partner 1' },
		{ id: 'partner-002', logo: Partner2, name: 'Partner 2' },
		{ id: 'partner-003', logo: Partner3, name: 'Partner 3' },
		{ id: 'partner-004', logo: Partner4, name: 'Partner 4' },
		{ id: 'partner-005', logo: Partner5, name: 'Partner 5' },
		{ id: 'partner-006', logo: Partner6, name: 'Partner 6' },
		{ id: 'partner-007', logo: Partner7, name: 'Partner 7' },
		{ id: 'partner-008', logo: Partner8, name: 'Partner 8' }
	];

	// CMS-configurable props
	export let sectionTitle: string = 'Trusted by Exceptional Brands';
	export let sectionSubtitle: string =
		'We collaborate with distinguished partners who share our commitment to beauty and craftsmanship';
	export let showSubtitle: boolean = true;
	export let backgroundColor: string = 'bg-transparent';

	// Animation state
	let sectionElement: HTMLElement;
	let isVisible = false;

	// Intersection Observer for entrance
	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						isVisible = true;
					}
				});
			},
			{ threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
		);

		if (sectionElement) {
			observer.observe(sectionElement);
		}

		return () => observer.disconnect();
	});
</script>

<section bind:this={sectionElement} class="relative overflow-hidden {backgroundColor}">
	<!-- Subtle background elements -->
	<div class="absolute inset-0 opacity-3">
		<div
			class="absolute top-1/3 right-1/4 w-64 sm:w-80 lg:w-96 h-64 sm:h-80 lg:h-96 bg-gradient-radial from-sage-200/30 to-transparent rounded-full blur-3xl"
		></div>
		<div
			class="absolute bottom-1/4 left-1/4 w-48 sm:w-64 lg:w-80 h-48 sm:h-64 lg:h-80 bg-gradient-radial from-amber-200/20 to-transparent rounded-full blur-2xl"
		></div>
	</div>

	<div class="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
		{#if isVisible}
			<!-- Clean Header -->
			<div class="text-center mb-12 sm:mb-16 lg:mb-20 max-w-4xl xl:max-w-5xl mx-auto">
				<div
					class="mb-6 sm:mb-8 lg:mb-10"
					in:fly={{ y: 20, duration: 600, delay: 200, easing: quintOut }}
				>
					<h2
						class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-gray-900 tracking-tight leading-tight"
					>
						{sectionTitle}
					</h2>
				</div>

				{#if showSubtitle}
					<div
						class="max-w-2xl lg:max-w-3xl mx-auto"
						in:fly={{ y: 15, duration: 400, delay: 400, easing: quintOut }}
					>
						<p class="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed font-light">
							{sectionSubtitle}
						</p>
					</div>
				{/if}
			</div>

			<!-- Partner Logos - One Line Display -->
			<div class="max-w-6xl xl:max-w-7xl mx-auto">
				<div
					class="flex flex-wrap items-center justify-center gap-6 sm:gap-8 lg:gap-10 xl:gap-12 2xl:gap-16"
					in:fly={{ y: 15, duration: 600, delay: 600, easing: quintOut }}
				>
					{#each partners as partner, index}
						<div
							class="flex items-center justify-center group"
							in:fly={{
								y: 10,
								duration: 300,
								delay: 800 + index * 100,
								easing: quintOut
							}}
						>
							<img
								src={partner.logo}
								alt={partner.name}
								class="h-8 sm:h-10 lg:h-12 xl:h-14 object-contain filter grayscale opacity-50 group-hover:opacity-80 group-hover:grayscale-0 transition-all duration-300 ease-out"
								loading="lazy"
							/>
						</div>
					{/each}
				</div>
			</div>

			<!-- Trust Statement -->
			<div
				class="text-center mt-12 sm:mt-16 lg:mt-20"
				in:fly={{ y: 10, duration: 400, delay: 1200, easing: quintOut }}
			>
				<p class="text-sm sm:text-base text-gray-500 font-light max-w-2xl mx-auto">
					Join a distinguished community of brands who choose authenticity and exceptional
					craftsmanship
				</p>
			</div>
		{/if}
	</div>
</section>

<style>
	/* Custom gradient utilities */
	.bg-gradient-radial {
		background: radial-gradient(circle, var(--tw-gradient-stops));
	}

	/* Clean typography */
	.font-light {
		font-weight: 300;
	}

	/* Subtle hover effects */
	.group:hover img {
		transform: scale(1.05);
	}

	/* Enhanced accessibility */
	.group:focus-visible {
		outline: 2px solid #6b7c5b;
		outline-offset: 4px;
		border-radius: 8px;
	}

	/* Responsive typography */
	@media (max-width: 640px) {
		h2 {
			line-height: 1.2;
		}
	}

	/* Reduced motion support */
	@media (prefers-reduced-motion: reduce) {
		* {
			animation-duration: 0.01ms !important;
			animation-iteration-count: 1 !important;
			transition-duration: 0.01ms !important;
		}

		.group:hover img {
			transform: none;
		}
	}
</style>
