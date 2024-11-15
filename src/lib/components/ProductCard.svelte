<!-- Enhanced ProductCard Component -->
<script lang="ts">
	export let product: {
		id: number;
		name: string;
		description: string;
		imageUrl: string;
		isSoldOut?: boolean;
	};
	export let soldOut: boolean = false;
</script>

<div class="group relative perspective-1000">
	<div
		class="relative overflow-hidden bg-white transition-all duration-500
        {soldOut ? 'opacity-90' : ''} 
        hover:shadow-[0_15px_30px_-15px_rgba(0,0,0,0.3)] transform hover:-translate-y-2"
	>
		<!-- Image Container with Adjusted Size -->
		<div class="aspect-[4/3] overflow-hidden">
			<img
				src={product.imageUrl}
				alt={product.name}
				class="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-105"
			/>
		</div>

		<!-- Refined Sold Out Overlay -->
		{#if soldOut}
			<div
				class="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300"
			>
				<span class="text-white text-xl font-light tracking-wider uppercase">Sold Out</span>
			</div>
		{/if}

		<!-- Elegant Product Information -->
		<div
			class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/50 to-transparent"
		>
			<h3
				class="font-serif text-white text-lg mb-1 transform group-hover:translate-y-[-3px] transition-transform duration-300"
			>
				{product.name}
			</h3>
			<p
				class="text-gray-200 text-sm font-light tracking-wide transform group-hover:translate-y-[-3px] transition-transform duration-300 delay-75"
			>
				{product.description}
			</p>
		</div>
	</div>
</div>

<style>
	/* Refined Animations and Effects */
	.perspective-1000 {
		perspective: 1000px;
	}

	.group {
		transform-style: preserve-3d;
	}

	.group:hover img {
		filter: brightness(1.05);
	}

	/* Elegant Typography */
	h3 {
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
		letter-spacing: 0.02em;
	}

	/* Smooth Transitions */
	.transition-all {
		transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
	}

	/* Enhanced Image Treatment */
	img {
		filter: brightness(0.98);
		transition: all 0.5s ease;
	}

	/* Responsive Image Height */
	@media (min-width: 640px) {
		img {
			height: 280px;
		}
	}

	@media (min-width: 1024px) {
		img {
			height: 260px;
		}
	}

	@media (min-width: 1280px) {
		img {
			height: 240px;
		}
	}
</style>
