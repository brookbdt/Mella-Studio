<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import { fetchNavbarConfig } from '$lib/cms/navbar';
	import { fetchHeroSections } from '$lib/cms/hero';

	// Initialize CMS data when the app loads
	onMount(() => {
		fetchNavbarConfig();
		fetchHeroSections();
	});
</script>

<svelte:head>
	<!-- Font Imports -->
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />

	<!-- Montserrat Font -->
	<link
		href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
		rel="stylesheet"
	/>

	<!-- The Seasons alternative fonts -->
	<link
		href="https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;1,400;1,600&display=swap"
		rel="stylesheet"
	/>
	<link
		href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<!-- Global Layout with MellaStudio Brand Background -->
<div class="min-h-screen bg-mellastudio-very-light">
	<slot />
</div>

<style>
	/* Ensure the brand background covers the entire viewport */
	:global(html, body) {
		background-color: var(--mellastudio-green-very-light);
		min-height: 100vh;
		font-family: 'Montserrat', sans-serif;
	}

	/* Override any white backgrounds in child components */
	:global(.bg-white) {
		background-color: var(--mellastudio-green-very-light) !important;
	}

	/* Ensure consistent brand background for main content areas */
	:global(main) {
		background-color: var(--mellastudio-green-very-light);
	}

	/* The Seasons font class for highlights */
	:global(.font-seasons) {
		font-family: 'Crimson Text', 'Libre Baskerville', 'Playfair Display', serif;
		font-weight: 600;
	}
</style>
