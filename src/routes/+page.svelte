<script lang="ts">
	import AboutMellaStudio from '$lib/components/AboutMellaStudio.svelte';
	import ArchitecturalServices from '$lib/components/ArchitecturalServices.svelte';
	import CallToAction from '$lib/components/CallToAction.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Counter from '$lib/components/Counter.svelte';
	import FeaturedProducts from '$lib/components/FeaturedProducts.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import GalleryTestimonials from '$lib/components/GalleryTestimonials.svelte';
	import HeroSection from '$lib/components/HeroSection.svelte';
	import Location from '$lib/components/Location.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import OurPartners from '$lib/components/OurPartners.svelte';

	let customersServed = 100;
	let productsSold = 200;
	let combinedFollowers = 50000;
</script>

<Navbar />
<div id="hero">
	<HeroSection />
</div>
<div id="about">
	<AboutMellaStudio />
</div>

<div id="products">
	<FeaturedProducts />
</div>
<div id="">
	<CallToAction />
</div>
<div id="services">
	<ArchitecturalServices />
</div>
<div id="">
	<OurPartners />
</div>
<div class="flex flex-col items-center justify-center py-12 bg-gray-100">
	<!-- <h1 class="text-3xl font-bold mb-6">Our Statistics</h1> -->
	<div class="grid grid-cols-1 gap-8 md:grid-cols-3 w-full">
		<div class="p-4 flex flex-col items-center">
			<h2 class="text-xl font-semibold">Customers Served</h2>
			<Counter id="customersServed" endVal={customersServed} duration={3} />
		</div>
		<div class="p-4 flex flex-col items-center">
			<h2 class="text-xl font-semibold">Products Sold</h2>
			<Counter id="productsSold" endVal={productsSold} duration={3} />
		</div>

		<div class="p-4 flex flex-col items-center">
			<h2 class="text-xl font-semibold">Combined Followers</h2>
			<Counter id="combinedFollowers" endVal={combinedFollowers} duration={3} />
		</div>
	</div>
</div>
<div id="projects">
	<GalleryTestimonials />
</div>
<div id="">
	<Location />
</div>
<div id="contact">
	<Contact />
</div>
<div id="">
	<Footer />
</div>
