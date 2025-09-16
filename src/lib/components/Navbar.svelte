<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import logo from '$lib/assets/images/Logo.png';
	import { cartStore } from '$lib/stores/cart';
	import type { CartItem } from '$lib/stores/cart';
	import {
		navbarConfig as cmsNavbarConfig,
		navbarLoading,
		navbarError,
		defaultNavbarConfig
	} from '$lib/cms/navbar';
	import type { NavbarConfig } from '$lib/cms/navbar';

	// Use CMS navbar configuration with fallback to default
	$: navbarConfig = $cmsNavbarConfig || {
		id: 'default',
		tenantId: 'mellastudio',
		...defaultNavbarConfig,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	};

	$: console.log('navbarConfig', navbarConfig);

	// Component state
	let scrollY = 0;
	let lastScrollY = 0;
	let showNavbar = true;
	let isSearchOpen = false;
	let searchQuery = '';
	let mounted = false;

	// Cart state - reactive to store
	$: cartCount = $cartStore.count;
	$: isCartOpen = $cartStore.isOpen;

	// Scroll behavior for navbar visibility
	function handleScroll() {
		const currentScrollY = window.scrollY;

		// Show navbar when scrolling up, hide when scrolling down
		if (currentScrollY < lastScrollY || currentScrollY < 100) {
			showNavbar = true;
		} else if (currentScrollY > lastScrollY && currentScrollY > 100) {
			showNavbar = false;
		}

		lastScrollY = currentScrollY;
		scrollY = currentScrollY;
	}

	// Search functions
	function toggleSearch() {
		isSearchOpen = !isSearchOpen;
		if (isSearchOpen) {
			// Focus search input after animation
			setTimeout(() => {
				document.getElementById('navbar-search')?.focus();
			}, 150);
		}
	}

	function handleSearchSubmit(event: Event) {
		event.preventDefault();
		if (searchQuery.trim()) {
			// Navigate to search results
			window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
		}
	}

	// Cart functions
	function toggleCart() {
		cartStore.toggleCart();
	}

	// Close search when clicking outside
	function handleOutsideClick(event: Event) {
		const target = event.target as HTMLElement;
		if (isSearchOpen && !target.closest('.search-container')) {
			isSearchOpen = false;
		}
	}

	onMount(() => {
		mounted = true;
		window.addEventListener('scroll', handleScroll, { passive: true });
		document.addEventListener('click', handleOutsideClick);

		return () => {
			window.removeEventListener('scroll', handleScroll);
			document.removeEventListener('click', handleOutsideClick);
		};
	});

	// Navbar transform based on scroll and visibility
	$: navbarTransform = showNavbar ? 'translateY(0)' : 'translateY(-100%)';

	// CMS-ready dynamic styling based on scroll position
	$: isOverHero = scrollY < 100;
	$: currentStyles = isOverHero
		? navbarConfig.styling.heroOverlayStyles
		: navbarConfig.styling.scrolledStyles;

	$: navbarBackground = currentStyles.backgroundColor;
	$: textColorClass = currentStyles.textColor;
	$: hoverTextClass = currentStyles.hoverTextColor;
	$: buttonHoverClass = currentStyles.buttonHoverBg;
	$: logoFilterClass = currentStyles.logoFilter;
	$: borderColorClass = currentStyles.borderColor;

	$: console.log({ navbarBackground });
</script>

<!-- Main Navbar -->
<nav
	class="  fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out {navbarBackground} {!isOverHero
		? 'shadow-sm border-b'
		: ''} {borderColorClass}"
	style="transform: {navbarTransform}"
>
	<!-- CMS Loading indicator (optional - can be removed for production) -->
	{#if $navbarLoading}
		<div class="absolute top-0 left-0 right-0 h-1 bg-orange-500 animate-pulse"></div>
	{/if}

	{#if $navbarError}
		<div class="absolute top-0 left-0 right-0 bg-red-500 text-white text-xs p-1 text-center">
			CMS Error: {$navbarError}
		</div>
	{/if}
	<div class="max-w-[1600px] mx-auto px-6 lg:px-8">
		<div class="grid grid-cols-[1fr_auto_1fr] items-center h-20">
			<!-- Left: Logo + Main Nav -->
			<div class="flex items-center justify-start space-x-8">
				<a href={navbarConfig.logo.href} class="group flex-shrink-0">
					<img
						src={navbarConfig.logo.src}
						alt={navbarConfig.logo.alt}
						class="h-8 w-auto transition-all duration-300 group-hover:scale-105"
						style="filter: {logoFilterClass};"
					/>
				</a>
				<div class="hidden md:flex items-center space-x-8">
					{#each navbarConfig.centerNavigation as item}
						<a
							href={item.href}
							class="{textColorClass} {hoverTextClass} font-light text-lg tracking-wide transition-all duration-300 relative group py-2"
						>
							{item.text}
							<span
								class="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-800 transition-all duration-300 group-hover:w-full"
							></span>
						</a>
					{/each}
				</div>
			</div>

			<!-- Center: Brand Text -->
			<div class="flex items-center justify-center">
				<a href={navbarConfig.logo.href} class="group">
					<span
						class="text-2xl font-light tracking-[0.2em] {textColorClass} transition-all duration-300 {hoverTextClass} whitespace-nowrap"
					>
						{navbarConfig.logo.text}
					</span>
				</a>
			</div>

			<!-- Right: Secondary Nav + Actions -->
			<div class="flex items-center justify-end space-x-6">
				<div class="hidden lg:flex items-center space-x-6">
					{#each navbarConfig.rightNavigation as item}
						<a
							href={item.href}
							class="font-light text-base tracking-wide transition-all duration-300 {textColorClass} {hoverTextClass}"
						>
							{item.text}
						</a>
					{/each}
				</div>

				<!-- Search Button -->
				{#if navbarConfig.searchConfig.enabled}
					<button
						on:click={toggleSearch}
						class="p-2 {textColorClass} {hoverTextClass} {buttonHoverClass} rounded-md transition-all duration-300 hover:scale-110"
						aria-label="Search"
					>
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
					</button>
				{/if}

				<!-- Cart Button -->
				{#if navbarConfig.cartConfig.enabled}
					<button
						on:click={toggleCart}
						class="relative p-2 {textColorClass} {hoverTextClass} {buttonHoverClass} rounded-md transition-all duration-300 hover:scale-110"
						aria-label="Shopping cart"
					>
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 2.5M7 13l2.5 2.5M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z"
							/>
						</svg>
						{#if cartCount > 0}
							<span
								class="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium shadow-lg"
								in:fly={{ y: -10, duration: 200 }}
							>
								{cartCount}
							</span>
						{/if}
					</button>
				{/if}

				<!-- Mobile Menu Button -->
				<button
					class="md:hidden p-2 {textColorClass} {hoverTextClass} {buttonHoverClass} rounded-md transition-all duration-300"
					aria-label="Open menu"
				>
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				</button>
			</div>
		</div>
	</div>

	<!-- Search Overlay -->
	{#if isSearchOpen}
		<div
			class="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-xl search-container"
			transition:fly={{ y: -20, duration: 200 }}
		>
			<div class="max-w-[1600px] mx-auto px-6 lg:px-8 py-4">
				<form on:submit={handleSearchSubmit} class="flex items-center">
					<div class="relative flex-1">
						<svg
							class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
						<input
							id="navbar-search"
							type="text"
							bind:value={searchQuery}
							placeholder={navbarConfig.searchConfig.placeholder}
							class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
						/>
					</div>
					<button
						type="submit"
						class="ml-3 px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors duration-200 text-sm"
					>
						Search
					</button>
					<button
						type="button"
						on:click={toggleSearch}
						class="ml-2 p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
					>
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</form>
			</div>
		</div>
	{/if}
</nav>

<!-- Cart Sidebar -->
{#if isCartOpen}
	<div class="fixed inset-0 z-50" transition:fade={{ duration: 200 }}>
		<!-- Backdrop -->
		<div class="absolute inset-0 bg-black/50" on:click={toggleCart}></div>

		<!-- Cart Panel -->
		<div
			class="absolute right-0 top-0 h-full w-96 bg-white shadow-xl"
			transition:fly={{ x: 100, duration: 300 }}
		>
			<div class="flex flex-col h-full">
				<!-- Cart Header -->
				<div class="flex items-center justify-between p-6 border-b border-gray-200">
					<h2 class="text-lg font-medium text-gray-900">Shopping Cart ({cartCount})</h2>
					<button
						on:click={toggleCart}
						class="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
					>
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>

				<!-- Cart Content -->
				<div class="flex-1 overflow-y-auto p-6">
					{#if cartCount === 0}
						<div class="text-center text-gray-500 mt-8">
							<svg
								class="w-16 h-16 mx-auto mb-4 text-gray-300"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 2.5M7 13l2.5 2.5"
								/>
							</svg>
							<p class="text-lg font-medium mb-2">Your cart is empty</p>
							<p class="text-sm">Add some beautiful lighting to get started</p>
						</div>
					{:else}
						<p class="text-sm text-gray-600">
							Cart functionality will be implemented with full product management
						</p>
					{/if}
				</div>

				<!-- Cart Footer -->
				{#if cartCount > 0}
					<div class="border-t border-gray-200 p-6">
						<button
							class="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors duration-200"
						>
							Checkout
						</button>
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}

<svelte:window bind:scrollY />

<style>
	/* Smooth transitions for all hover effects */
	nav a {
		transition: all 0.2s ease;
	}

	/* Custom scrollbar for cart */
	.overflow-y-auto::-webkit-scrollbar {
		width: 4px;
	}

	.overflow-y-auto::-webkit-scrollbar-track {
		background: #f1f1f1;
	}

	.overflow-y-auto::-webkit-scrollbar-thumb {
		background: #ccc;
		border-radius: 2px;
	}
</style>
