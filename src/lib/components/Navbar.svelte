<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import logo from '$lib/assets/images/Logo.png';

	let isDrawerOpen = false;
	let drawerElement: HTMLElement | null = null;

	function toggleDrawer() {
		isDrawerOpen = !isDrawerOpen;
		document.body.style.overflow = isDrawerOpen ? 'hidden' : '';
	}

	function clickOutside(node) {
		const handleClick = (event) => {
			if (node && !node.contains(event.target) && !event.defaultPrevented) {
				isDrawerOpen = false; // Ensure the drawer is closed
				document.body.style.overflow = ''; // Restore body overflow
			}
		};

		document.addEventListener('click', handleClick, true);

		return {
			destroy() {
				document.removeEventListener('click', handleClick, true);
			}
		};
	}
</script>

<nav
	class="flex justify-between items-center p-4 bg-secondary text-gray-700 shadow-md sticky top-0 z-50"
>
	<a href="/" class="flex items-center">
		<img src={logo} alt="Mella Studio Logo" class="h-8 mr-2" />
		<span class="text-xl font-light text-gray-800 hidden md:block">Mella Studio</span>
	</a>
	<div class="md:hidden">
		<button on:click={toggleDrawer} class="focus:outline-none">
			<svg viewBox="0 0 20 20" fill="currentColor" class="h-6 w-6">
				<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
			</svg>
		</button>
	</div>

	<div
		use:clickOutside
		class={`fixed inset-0 bg-black bg-opacity-50 z-40 transform ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}
	>
		<div class="p-5 bg-secondary h-2/5 w-full">
			<button on:click={toggleDrawer} class="focus:outline-none">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>
			<nav class="mt-8">
				<a
					href="#about"
					on:click={toggleDrawer}
					class="block px-4 py-2 text-lg hover:bg-gray-200 rounded">About Us</a
				>
				<a
					on:click={toggleDrawer}
					href="#products"
					class="block px-4 py-2 text-lg hover:bg-gray-200 rounded">Products</a
				>
				<a
					on:click={toggleDrawer}
					href="#services"
					class="block px-4 py-2 text-lg hover:bg-gray-200 rounded">Services</a
				>
				<a
					on:click={toggleDrawer}
					href="#contact"
					class="block px-4 py-2 text-lg hover:bg-gray-200 rounded">Contact Us</a
				>
			</nav>
		</div>
	</div>

	<div class="hidden md:flex space-x-4">
		<div class="self-center space-x-4">
			<a href="#about" class="menu-item">About Us</a>
			<a href="#products" class="menu-item">Products</a>
			<a href="#services" class="menu-item">Services</a>
		</div>
		<a href="#contact" class="bg-primary text-white px-4 py-2 rounded hover:bg-brand-dark"
			>Contact Us</a
		>
	</div>
</nav>

<style>
	.menu-item {
		position: relative;
		padding-bottom: 0.25rem; /* Adjust the padding to control the space under the text */
	}

	.menu-item::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 0%;
		height: 2px; /* Thickness of the underline */
		background-color: var(--brand-color, #7a9360); /* Fallback brand color */
		transition: width 0.3s ease-in-out;
	}

	.menu-item:hover::after {
		width: 100%;
	}
</style>
