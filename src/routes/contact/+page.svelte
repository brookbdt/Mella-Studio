<script lang="ts">
	import Contact from '$lib/components/Contact.svelte';
	import Location from '$lib/components/Location.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
	<title>Contact | MellaStudio - Connect with Master Artisans</title>
	<meta
		name="description"
		content="Connect with MellaStudio for bespoke lighting commissions, collection inquiries, or to visit our Ethiopian workshop. We serve clients worldwide."
	/>
</svelte:head>

<Navbar />

<main class="contact-page">
	<div class="hero-section">
		<div class="container">
			<h1 class="page-title">Connect with Us</h1>
			<p class="page-subtitle">
				Ready to illuminate your space with Ethiopian heritage? Let's discuss how we can create
				something extraordinary together.
			</p>
		</div>
	</div>

	<Contact />
	<Location />
</main>

<Footer />

<style>
	.contact-page {
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
