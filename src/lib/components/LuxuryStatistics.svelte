<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	// CMS-Ready Props
	export let sectionTitle = 'WHY SHOP MELLASTUDIO';
	export let sectionSubtitle =
		'Experience the difference of authentic Ethiopian craftsmanship and heritage-driven luxury';
	export let showBadge = true;
	export let badgeText = 'THE MELLASTUDIO DIFFERENCE';

	// Reasons Data - CMS Ready
	export let reasons = [
		{
			id: 'heritage',
			icon: '🏛️',
			title: 'AUTHENTIC ETHIOPIAN HERITAGE',
			subtitle: '2,847 YEARS OF CRAFTSMANSHIP',
			description:
				'Each piece carries the authentic traditions of Ethiopian artisans, connecting your space to millennia of cultural heritage and master craftsmanship.',
			highlight: 'Heritage Certified'
		},
		{
			id: 'luxury',
			icon: '💎',
			title: 'MUSEUM-QUALITY CONSTRUCTION',
			subtitle: 'LIFETIME CRAFTSMANSHIP GUARANTEE',
			description:
				'Hand-forged by master artisans using time-honored techniques, every piece meets the exacting standards of luxury collectors worldwide.',
			highlight: 'Luxury Grade'
		},
		{
			id: 'global',
			icon: '⭐',
			title: 'GLOBAL COLLECTOR NETWORK',
			subtitle: '25+ COUNTRIES • 500+ SATISFIED CLIENTS',
			description:
				'Join an exclusive community of discerning collectors from Manhattan penthouses to Milano galleries who choose MellaStudio.',
			highlight: 'Worldwide Recognition'
		}
	];

	// Animation Control
	let isVisible = false;
	let sectionRef: HTMLElement;

	onMount(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					isVisible = true;
				}
			},
			{ threshold: 0.2 }
		);

		if (sectionRef) {
			observer.observe(sectionRef);
		}

		return () => {
			if (sectionRef) {
				observer.unobserve(sectionRef);
			}
		};
	});
</script>

<section bind:this={sectionRef} class="relative py-20 lg:py-32 overflow-hidden">
	<div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<!-- Header Section -->
		{#if isVisible}
			<div class="text-center mb-16" in:fade={{ duration: 800, delay: 200 }}>
				{#if showBadge}
					<div class="inline-block mb-8" in:fly={{ y: 30, duration: 600, delay: 300 }}>
						<span
							class="px-6 py-2 bg-mellastudio-accent border border-mellastudio text-gray-700 text-sm font-medium tracking-[0.2em] rounded-full uppercase"
						>
							{badgeText}
						</span>
					</div>
				{/if}

				<h2
					class="text-4xl sm:text-5xl lg:text-6xl font-light mb-6 text-gray-900 tracking-tight"
					in:fly={{ y: 40, duration: 800, delay: 400 }}
				>
					{sectionTitle}
				</h2>

				<p
					class="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
					in:fly={{ y: 40, duration: 800, delay: 500 }}
				>
					{sectionSubtitle}
				</p>
			</div>
		{/if}

		<!-- Reasons Grid -->
		{#if isVisible}
			<div class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
				{#each reasons as reason, index (reason.id)}
					<div
						class="text-center group"
						in:fly={{
							y: 60,
							duration: 800,
							delay: 600 + index * 200
						}}
					>
						<!-- Icon -->
						<div class="mb-8">
							<div
								class="text-6xl lg:text-7xl mb-4 group-hover:scale-110 transition-transform duration-500"
							>
								{reason.icon}
							</div>
							{#if reason.highlight}
								<span
									class="inline-block px-4 py-1 bg-mellastudio-light border border-mellastudio text-xs font-semibold text-gray-600 rounded-full uppercase tracking-wider"
								>
									{reason.highlight}
								</span>
							{/if}
						</div>

						<!-- Title -->
						<h3 class="text-xl lg:text-2xl font-semibold text-gray-900 mb-3 leading-tight">
							{reason.title}
						</h3>

						<!-- Subtitle -->
						<p class="text-sm font-medium text-gray-500 mb-6 tracking-wider uppercase">
							{reason.subtitle}
						</p>

						<!-- Description -->
						<p class="text-gray-600 leading-relaxed text-lg max-w-md mx-auto">
							{reason.description}
						</p>
					</div>
				{/each}
			</div>
		{/if}

		<!-- Bottom Accent -->
		{#if isVisible}
			<div class="mt-16 text-center" in:fade={{ duration: 800, delay: 1200 }}>
				<div class="inline-flex items-center gap-4 text-gray-400 text-sm">
					<div class="w-8 h-0.5 bg-gradient-to-r from-transparent to-mellastudio-border"></div>
					<span class="tracking-[0.2em] uppercase font-light">Handcrafted for Eternity</span>
					<div class="w-8 h-0.5 bg-gradient-to-l from-transparent to-mellastudio-border"></div>
				</div>
			</div>
		{/if}
	</div>
</section>

<style>
	/* Ensure smooth animations */
	@media (prefers-reduced-motion: reduce) {
		.group {
			transition: none;
		}
	}

	/* Enhanced hover effects */
	.group:hover {
		transform: translateY(-2px);
		transition: transform 0.3s ease;
	}
</style>
