<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly, scale } from 'svelte/transition';

	// CMS-Ready Props
	export let badgeText = 'BEAUTIFUL POSSIBILITIES';
	export let showBadge = true;
	export let sectionTitle = 'Light Your Beautiful Life';
	export let sectionSubtitle =
		'Every home deserves lighting that reflects the love and care you put into creating your sanctuary. Let us help you bring warmth and beauty to the spaces where your most cherished memories unfold.';
	export let backgroundStyle: 'light' | 'dark' | 'cultural' = 'light';

	// Creating Heirloom Moments Values - CMS Ready
	export let heirloomValues = [
		{
			icon: '',
			title: 'Transform',
			subtitle: 'Spaces into sanctuaries'
		},
		{
			icon: '',
			title: 'Illuminate',
			subtitle: "Life's precious moments"
		},
		{
			icon: '',
			title: 'Create',
			subtitle: 'Timeless beauty'
		},
		{
			icon: '',
			title: 'Cherish',
			subtitle: 'For generations'
		}
	];

	// Heirloom section configuration
	export let showHeirloomSection: boolean = true;
	export let heirloomTitle: string = 'Creating Heirloom Moments';
	export let heirloomSubtitle: string =
		"Every piece becomes part of your family's story, creating beautiful memories that illuminate your home for generations";

	// CTA Configuration - CMS Ready
	export let primaryCtaText = 'Start Your Journey';
	export let primaryCtaLink = '#consultation';
	export let secondaryCtaText = 'Explore Our Collection';
	export let secondaryCtaLink = '#collection';
	export let priceNote =
		'*Personalized pieces start at $5,000. Thoughtfully crafted over 12-16 weeks.';
	export let showPriceNote = true;

	// Animation Control
	let isVisible = false;
	let sectionRef: HTMLElement;
	let featuresVisible = false;

	const backgroundStyles = {
		light: '',
		dark: 'bg-gradient-to-br from-gray-900 via-gray-800 to-green-900',
		cultural: 'bg-gradient-to-br from-amber-50/20 via-transparent to-green-50/20'
	};

	const textStyles = {
		light: 'text-gray-900',
		dark: 'text-white',
		cultural: 'text-gray-900'
	};

	const subtitleStyles = {
		light: 'text-gray-600',
		dark: 'text-gray-300',
		cultural: 'text-gray-700'
	};

	onMount(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					isVisible = true;
					setTimeout(() => {
						featuresVisible = true;
					}, 800);
				}
			},
			{ threshold: 0.1 }
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

<section
	bind:this={sectionRef}
	id="bespoke"
	class="relative z-20 py-20 lg:py-32 {backgroundStyles[backgroundStyle]} overflow-hidden"
>
	<!-- Cultural Background Elements -->
	{#if backgroundStyle === 'cultural'}
		<div class="absolute inset-0 opacity-5">
			<div
				class="absolute inset-0 bg-repeat opacity-30"
				style="background-image: url('data:image/svg+xml,%3Csvg width=&quot;80&quot; height=&quot;80&quot; viewBox=&quot;0 0 80 80&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23d4af37&quot; fill-opacity=&quot;0.1&quot;%3E%3Ccircle cx=&quot;40&quot; cy=&quot;40&quot; r=&quot;4&quot;/%3E%3Ccircle cx=&quot;20&quot; cy=&quot;20&quot; r=&quot;2&quot;/%3E%3Ccircle cx=&quot;60&quot; cy=&quot;20&quot; r=&quot;2&quot;/%3E%3Ccircle cx=&quot;20&quot; cy=&quot;60&quot; r=&quot;2&quot;/%3E%3Ccircle cx=&quot;60&quot; cy=&quot;60&quot; r=&quot;2&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
			></div>
		</div>
	{/if}

	<!-- Top Gradient Decoration -->
	<div
		class="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-green-900/5 to-transparent"
	></div>

	<div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center max-w-5xl mx-auto">
			<!-- Header Section -->
			{#if isVisible}
				<!-- Badge -->
				{#if showBadge}
					<div class="inline-block mb-8" in:scale={{ duration: 600, delay: 200, start: 0.8 }}>
						<span
							class="group px-8 py-3 bg-gradient-to-r from-green-400 to-green-500 text-white text-sm font-semibold tracking-[0.2em] rounded-full uppercase relative overflow-hidden cursor-default"
						>
							<div
								class="absolute inset-0 bg-gradient-to-r from-green-300 to-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
							></div>
							<span class="relative">{badgeText}</span>
						</span>
					</div>
				{/if}

				<!-- Title -->
				<h2
					class="text-4xl sm:text-5xl lg:text-6xl font-light {textStyles[
						backgroundStyle
					]} mb-8 font-montserrat"
					in:fly={{ y: 50, duration: 800, delay: 300 }}
				>
					{sectionTitle}
				</h2>

				<!-- Subtitle -->
				<p
					class="text-lg sm:text-xl lg:text-2xl {subtitleStyles[
						backgroundStyle
					]} leading-relaxed mb-16 max-w-4xl mx-auto"
					in:fly={{ y: 40, duration: 800, delay: 400 }}
				>
					{sectionSubtitle}
				</p>

				<!-- Cultural Heritage Line -->
				<div
					class="mb-20 flex justify-center items-center gap-6"
					in:fade={{ duration: 800, delay: 500 }}
				>
					<div
						class="w-16 h-0.5 bg-gradient-to-r from-transparent via-green-400 to-green-600"
					></div>
					<span class="text-green-600 text-sm font-medium tracking-[0.2em] uppercase"
						>2,847 Years of Heritage</span
					>
					<div
						class="w-16 h-0.5 bg-gradient-to-l from-transparent via-green-400 to-green-600"
					></div>
				</div>
			{/if}

			<!-- Creating Heirloom Moments Section -->
			{#if showHeirloomSection && featuresVisible}
				<!-- Large, Full-Width Responsive Title -->
				<div class="mb-16 sm:mb-20 lg:mb-24 text-center">
					<h3
						class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-light {textStyles[
							backgroundStyle
						]} tracking-tight leading-tight mb-6 sm:mb-8 lg:mb-12 px-4"
						in:fly={{ y: 30, duration: 800, delay: 600 }}
					>
						{heirloomTitle}
					</h3>
					<p
						class="text-lg sm:text-xl lg:text-2xl xl:text-3xl {subtitleStyles[
							backgroundStyle
						]} leading-relaxed font-light max-w-5xl mx-auto px-4"
						in:fly={{ y: 20, duration: 600, delay: 800 }}
					>
						{heirloomSubtitle}
					</p>
				</div>

				<!-- Simple Value Grid -->
				<div
					class="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 lg:gap-16 xl:gap-20 items-center text-center mb-20 max-w-5xl mx-auto"
				>
					{#each heirloomValues as value, index}
						<div
							class="group"
							in:fly={{
								y: 15,
								duration: 400,
								delay: 1000 + index * 150
							}}
						>
							<!-- Simple Icon -->
							<div
								class="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mb-4 sm:mb-5 lg:mb-6 group-hover:scale-110 transition-transform duration-300"
							>
								{value.icon}
							</div>

							<!-- Clean Title -->
							<h4
								class="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-medium {textStyles[
									backgroundStyle
								]} mb-2 sm:mb-3 lg:mb-4"
							>
								{value.title}
							</h4>

							<!-- Minimal Subtitle -->
							<p
								class="text-sm sm:text-base lg:text-lg {subtitleStyles[backgroundStyle]} font-light"
							>
								{value.subtitle}
							</p>
						</div>
					{/each}
				</div>
			{/if}

			<!-- CTA Section -->
			{#if isVisible}
				<div class="space-y-8" in:fade={{ duration: 800, delay: 1200 }}>
					<!-- CTA Buttons -->
					<div class="flex flex-col sm:flex-row justify-center gap-6">
						<a
							href={primaryCtaLink}
							class="group relative overflow-hidden bg-gradient-to-r from-green-600 to-green-800 text-white px-10 py-4 rounded-full font-semibold text-lg tracking-wide hover:from-green-500 hover:to-green-700 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl"
						>
							<div
								class="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
							></div>
							<span class="relative flex items-center justify-center gap-2">
								{primaryCtaText}
								<span class="group-hover:translate-x-1 transition-transform duration-300">→</span>
							</span>
						</a>

						<a
							href={secondaryCtaLink}
							class="group relative overflow-hidden bg-transparent {textStyles[
								backgroundStyle
							]} border-2 border-green-700 px-10 py-4 rounded-full font-semibold text-lg tracking-wide hover:bg-green-700 hover:text-white transform hover:scale-105 hover:-translate-y-1 transition-all duration-300"
						>
							<span class="relative flex items-center justify-center gap-2">
								{secondaryCtaText}
								<span class="group-hover:translate-x-1 transition-transform duration-300">→</span>
							</span>
						</a>
					</div>

					<!-- Cultural Trust Signal -->
					<div class="flex justify-center items-center gap-4 text-green-600/70 text-sm">
						<div class="w-6 h-0.5 bg-gradient-to-r from-transparent to-green-400/50"></div>
						<span class="tracking-[0.15em] uppercase font-medium"
							>Certified Ethiopian Heritage Artisans</span
						>
						<div class="w-6 h-0.5 bg-gradient-to-l from-transparent to-green-400/50"></div>
					</div>

					<!-- Price Note -->
					{#if showPriceNote}
						<p class="text-sm {subtitleStyles[backgroundStyle]} italic opacity-80">
							{priceNote}
						</p>
					{/if}
				</div>
			{/if}
		</div>
	</div>

	<!-- Bottom Decorative Element -->
	<div
		class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-green-900/5 to-transparent"
	></div>
</section>

<style>
	/* Ensure smooth animations for reduced motion */
	@media (prefers-reduced-motion: reduce) {
		.group {
			transition: none;
		}

		.group:hover * {
			transform: none !important;
		}
	}

	/* Enhanced shadow effects */
	.group:hover .shadow-lg {
		box-shadow:
			0 25px 50px -12px rgba(74, 222, 128, 0.15),
			0 10px 25px -5px rgba(74, 222, 128, 0.1);
	}

	/* Smooth text selection */
	::selection {
		background-color: rgba(74, 222, 128, 0.2);
		color: #065f46;
	}
</style>
