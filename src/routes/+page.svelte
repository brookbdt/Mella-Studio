<script lang="ts">
	import AboutMellaStudio from '$lib/components/AboutMellaStudio.svelte';
	import ArchitecturalServices from '$lib/components/ArchitecturalServices.svelte';
	import CallToAction from '$lib/components/CallToAction.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import FeaturedProducts from '$lib/components/FeaturedProducts.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import GalleryTestimonials from '$lib/components/GalleryTestimonials.svelte';
	import HeroSection from '$lib/components/HeroSection.svelte';
	import Location from '$lib/components/Location.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import OurPartners from '$lib/components/OurPartners.svelte';
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
<div id="">
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
