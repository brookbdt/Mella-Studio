<script lang="ts">
	import CraftingProcess from '$lib/components/CraftingProcess.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
	<title>Craftsmanship | MellaStudio - Master Artisan Process</title>
	<meta
		name="description"
		content="Discover the meticulous 8-step process behind each MellaStudio piece. From cultural research to final packaging, see how master Ethiopian artisans create contemporary luxury."
	/>
</svelte:head>

<Navbar />

<main class="craftsmanship-page">
	<div class="hero-section">
		<div class="container">
			<h1 class="page-title">Master Craftsmanship</h1>
			<p class="page-subtitle">
				Witness the extraordinary journey from ancient Ethiopian techniques to contemporary luxury.
				Each piece represents 1,200+ hours of dedicated artisan work.
			</p>
		</div>
	</div>

	<CraftingProcess />
</main>

<Footer />

<style>
	.craftsmanship-page {
		min-height: 100vh;
	}

	.hero-section {
		padding: 140px 0 80px 0;
		background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
		text-align: center;
	}

	.container {
		max-width: 1400px;
		margin: 0 auto;
		padding: 0 2rem;
	}

	.page-title {
		font-size: clamp(3rem, 6vw, 5rem);
		font-weight: 300;
		color: #2c2c2c;
		margin-bottom: 2rem;
		font-family: 'Montserrat', sans-serif;
	}

	.page-subtitle {
		font-size: 1.5rem;
		color: #666;
		max-width: 800px;
		margin: 0 auto;
		line-height: 1.6;
		font-weight: 300;
	}

	@media (max-width: 768px) {
		.hero-section {
			padding: 120px 0 60px 0;
		}

		.page-subtitle {
			font-size: 1.25rem;
		}
	}
</style>
