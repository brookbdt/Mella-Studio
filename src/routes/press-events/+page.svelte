<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let mounted = false;
	let activeTab = 'press';

	$: pressEventsData = data.pressEvents;
	$: filteredContent =
		activeTab === 'press'
			? pressEventsData.pressItems
			: pressEventsData.events.filter((event) => event.status === 'upcoming');

	onMount(() => {
		mounted = true;
	});

	function setActiveTab(tab: string) {
		activeTab = tab;
	}

	function formatDate(dateString: string, includeYear = true) {
		const options: Intl.DateTimeFormatOptions = {
			month: 'long',
			day: 'numeric'
		};

		if (includeYear) {
			options.year = 'numeric';
		}

		return new Date(dateString).toLocaleDateString('en-US', options);
	}

	function formatDateRange(startDate: string, endDate?: string) {
		if (!endDate) {
			return formatDate(startDate);
		}

		const start = new Date(startDate);
		const end = new Date(endDate);

		if (start.getMonth() === end.getMonth()) {
			return `${formatDate(startDate, false)} - ${end.getDate()}, ${start.getFullYear()}`;
		}

		return `${formatDate(startDate)} - ${formatDate(endDate)}`;
	}
</script>

<svelte:head>
	<title>Press & Events | MellaStudio - Media Coverage and Upcoming Events</title>
	<meta
		name="description"
		content="Stay updated with MellaStudio's latest press coverage, awards, and upcoming events. Download our media kit and discover our journey in lighting design."
	/>
</svelte:head>

<Navbar />

<main class="press-events-page">
	<!-- Hero Section -->
	<section class="hero-section">
		<div class="hero-content" class:animate-in={mounted}>
			<span class="category-badge">NEWSROOM</span>
			<h1 class="page-title">
				{pressEventsData.hero.title}
			</h1>
			<p class="hero-subtitle">
				{pressEventsData.hero.subtitle}
			</p>
			<p class="hero-description">
				{pressEventsData.hero.description}
			</p>
		</div>
	</section>

	<!-- Featured Press/Event -->
	<section class="featured-section">
		<div class="featured-container">
			<div class="featured-grid">
				<div class="featured-image">
					<img src={pressEventsData.featured.imageUrl} alt={pressEventsData.featured.title} />
					<div class="featured-overlay">
						<span class="featured-type">{pressEventsData.featured.type}</span>
						<span class="featured-date">{formatDate(pressEventsData.featured.date)}</span>
					</div>
				</div>
				<div class="featured-content">
					<h2 class="featured-title">{pressEventsData.featured.title}</h2>
					<div class="featured-meta">
						<span class="publication">{pressEventsData.featured.publication}</span>
						<span class="date">{formatDate(pressEventsData.featured.date)}</span>
					</div>
					<p class="featured-excerpt">{pressEventsData.featured.excerpt}</p>

					<a
						href={pressEventsData.featured.link}
						target="_blank"
						rel="noopener noreferrer"
						class="read-article-btn"
					>
						Read Full Article
					</a>
				</div>
			</div>
		</div>
	</section>

	<!-- Navigation Tabs -->
	<section class="tabs-section">
		<div class="tabs-container">
			<div class="tabs">
				<button
					class="tab-btn"
					class:active={activeTab === 'press'}
					on:click={() => setActiveTab('press')}
				>
					Press Coverage
				</button>
				<button
					class="tab-btn"
					class:active={activeTab === 'events'}
					on:click={() => setActiveTab('events')}
				>
					Upcoming Events
				</button>
			</div>
		</div>
	</section>

	<!-- Content Grid -->
	<section class="content-grid-section">
		<div class="content-container">
			{#if activeTab === 'press'}
				<div class="press-grid">
					{#each pressEventsData.pressItems as item}
						<article class="press-card">
							<div class="press-image">
								<img src={item.imageUrl} alt={item.title} />
								<div class="press-overlay">
									<span class="press-type">{item.type}</span>
									<a href={item.link} target="_blank" rel="noopener noreferrer" class="view-btn">
										View Article
									</a>
								</div>
							</div>
							<div class="press-content">
								<h3 class="press-title">{item.title}</h3>
								<div class="press-meta">
									<span class="publication">{item.publication}</span>
									<span class="date">{formatDate(item.date)}</span>
								</div>
								<p class="press-excerpt">{item.excerpt}</p>
							</div>
						</article>
					{/each}
				</div>
			{:else}
				<div class="events-grid">
					{#each pressEventsData.events.filter((event) => event.status === 'upcoming') as event}
						<article class="event-card">
							<div class="event-image">
								<img src={event.imageUrl} alt={event.title} />
								<div class="event-overlay">
									<span class="event-type">{event.type}</span>
									<span class="event-status">{event.status}</span>
								</div>
							</div>
							<div class="event-content">
								<h3 class="event-title">{event.title}</h3>
								<div class="event-meta">
									<div class="event-date">
										{event.endDate
											? formatDateRange(event.date, event.endDate)
											: formatDate(event.date)}
									</div>
									<div class="event-location">📍 {event.venue}, {event.location}</div>
								</div>
								<p class="event-description">{event.description}</p>

								{#if event.registrationLink}
									<a
										href={event.registrationLink}
										target="_blank"
										rel="noopener noreferrer"
										class="register-btn"
									>
										Register Now
									</a>
								{/if}
							</div>
						</article>
					{/each}
				</div>
			{/if}
		</div>
	</section>

	<!-- Upcoming Events Sidebar (when viewing press) -->
	{#if activeTab === 'press'}
		<section class="upcoming-events-section">
			<div class="upcoming-container">
				<h2 class="upcoming-title">Upcoming Events</h2>
				<div class="upcoming-list">
					{#each pressEventsData.upcomingEvents as event}
						<div class="upcoming-item">
							<div class="upcoming-date">
								<span class="month">{formatDate(event.date).split(' ')[0]}</span>
								<span class="day">{formatDate(event.date).split(' ')[1].replace(',', '')}</span>
							</div>
							<div class="upcoming-details">
								<h4 class="upcoming-event-title">{event.title}</h4>
								<p class="upcoming-location">{event.location} • {event.type}</p>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</section>
	{/if}

	<!-- Media Kit Section -->
	<section class="media-kit-section">
		<div class="media-kit-container">
			<div class="media-kit-content">
				<h2 class="media-kit-title">{pressEventsData.mediaKit.title}</h2>
				<p class="media-kit-description">{pressEventsData.mediaKit.description}</p>

				<div class="media-kit-items">
					{#each pressEventsData.mediaKit.items as item}
						<div class="media-kit-item">
							<div class="kit-item-info">
								<span class="kit-item-name">{item.name}</span>
								<span class="kit-item-details">{item.type} • {item.size}</span>
							</div>
							<button class="download-btn">Download</button>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>
</main>

<Footer />

<style>
	.press-events-page {
		background: #faf9f7;
		min-height: 100vh;
		padding-top: 80px;
	}

	/* Hero Section */
	.hero-section {
		padding: 80px 20px 60px;
		text-align: center;
		max-width: 1200px;
		margin: 0 auto;
	}

	.hero-content {
		opacity: 0;
		transform: translateY(30px);
		transition: all 1s ease-out;
	}

	.hero-content.animate-in {
		opacity: 1;
		transform: translateY(0);
	}

	.category-badge {
		display: inline-block;
		font-size: 0.875rem;
		font-weight: 600;
		letter-spacing: 2px;
		color: #666;
		margin-bottom: 1.5rem;
		text-transform: uppercase;
	}

	.page-title {
		font-size: clamp(2.5rem, 6vw, 4rem);
		font-weight: 300;
		line-height: 1.2;
		color: #2c2c2c;
		margin-bottom: 1.5rem;
	}

	.hero-subtitle {
		font-size: 1.25rem;
		color: #a8b4a0;
		margin-bottom: 1rem;
	}

	.hero-description {
		font-size: 1rem;
		color: #666;
		max-width: 600px;
		margin: 0 auto;
		line-height: 1.6;
	}

	/* Featured Section */
	.featured-section {
		padding: 80px 20px;
		background: white;
	}

	.featured-container {
		max-width: 1400px;
		margin: 0 auto;
	}

	.featured-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 80px;
		align-items: center;
	}

	.featured-image {
		position: relative;
		height: 500px;
		border-radius: 16px;
		overflow: hidden;
	}

	.featured-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.featured-overlay {
		position: absolute;
		top: 20px;
		left: 20px;
		display: flex;
		gap: 10px;
	}

	.featured-type,
	.featured-date {
		background: rgba(255, 255, 255, 0.9);
		padding: 8px 16px;
		border-radius: 20px;
		font-size: 0.875rem;
		font-weight: 500;
		color: #2c2c2c;
	}

	.featured-title {
		font-size: 2.25rem;
		font-weight: 300;
		color: #2c2c2c;
		margin-bottom: 1rem;
		line-height: 1.3;
	}

	.featured-meta {
		display: flex;
		gap: 1rem;
		margin-bottom: 1.5rem;
		font-size: 0.875rem;
		color: #666;
	}

	.featured-excerpt {
		font-size: 1.125rem;
		color: #666;
		line-height: 1.6;
		margin-bottom: 2rem;
	}

	.read-article-btn {
		display: inline-block;
		padding: 12px 32px;
		background: #2c2c2c;
		color: white;
		text-decoration: none;
		border-radius: 25px;
		font-weight: 500;
		transition: all 0.3s ease;
	}

	.read-article-btn:hover {
		background: #a8b4a0;
	}

	/* Tabs Section */
	.tabs-section {
		padding: 40px 20px;
		background: white;
		border-bottom: 1px solid #e5e5e5;
	}

	.tabs-container {
		max-width: 1400px;
		margin: 0 auto;
	}

	.tabs {
		display: flex;
		justify-content: center;
		gap: 2rem;
	}

	.tab-btn {
		padding: 12px 32px;
		border: 1px solid #e5e5e5;
		background: transparent;
		color: #666;
		font-weight: 500;
		border-radius: 25px;
		transition: all 0.3s ease;
		cursor: pointer;
		font-size: 1rem;
	}

	.tab-btn.active,
	.tab-btn:hover {
		background: #2c2c2c;
		color: white;
		border-color: #2c2c2c;
	}

	/* Content Grid */
	.content-grid-section {
		padding: 60px 20px 80px;
		background: white;
	}

	.content-container {
		max-width: 1400px;
		margin: 0 auto;
	}

	.press-grid,
	.events-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
		gap: 40px;
	}

	.press-card,
	.event-card {
		background: #faf9f7;
		border-radius: 16px;
		overflow: hidden;
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;
	}

	.press-card:hover,
	.event-card:hover {
		transform: translateY(-8px);
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
	}

	.press-image,
	.event-image {
		position: relative;
		height: 250px;
		overflow: hidden;
	}

	.press-image img,
	.event-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.3s ease;
	}

	.press-card:hover .press-image img,
	.event-card:hover .event-image img {
		transform: scale(1.05);
	}

	.press-overlay,
	.event-overlay {
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0.6);
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		padding: 20px;
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.press-card:hover .press-overlay,
	.event-card:hover .event-overlay {
		opacity: 1;
	}

	.press-type,
	.event-type,
	.event-status {
		background: rgba(255, 255, 255, 0.9);
		padding: 6px 12px;
		border-radius: 15px;
		font-size: 0.75rem;
		font-weight: 500;
		color: #2c2c2c;
	}

	.view-btn,
	.register-btn {
		padding: 8px 16px;
		background: white;
		color: #2c2c2c;
		text-decoration: none;
		border: none;
		border-radius: 20px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.3s ease;
		font-size: 0.875rem;
	}

	.view-btn:hover,
	.register-btn:hover {
		background: #a8b4a0;
		color: white;
	}

	.press-content,
	.event-content {
		padding: 30px;
	}

	.press-title,
	.event-title {
		font-size: 1.25rem;
		font-weight: 500;
		color: #2c2c2c;
		margin-bottom: 1rem;
		line-height: 1.4;
	}

	.press-meta,
	.event-meta {
		margin-bottom: 1.5rem;
		font-size: 0.875rem;
		color: #666;
	}

	.event-date {
		font-weight: 600;
		color: #a8b4a0;
		margin-bottom: 0.5rem;
	}

	.event-location {
		color: #666;
	}

	.press-excerpt,
	.event-description {
		color: #666;
		line-height: 1.6;
		margin-bottom: 1.5rem;
		font-size: 0.9rem;
	}

	/* Upcoming Events Sidebar */
	.upcoming-events-section {
		padding: 60px 20px;
		background: #f8f7f5;
	}

	.upcoming-container {
		max-width: 800px;
		margin: 0 auto;
		text-align: center;
	}

	.upcoming-title {
		font-size: 2rem;
		font-weight: 300;
		color: #2c2c2c;
		margin-bottom: 2rem;
	}

	.upcoming-list {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.upcoming-item {
		display: flex;
		gap: 1.5rem;
		align-items: center;
		text-align: left;
		padding: 1.5rem;
		background: white;
		border-radius: 12px;
	}

	.upcoming-date {
		display: flex;
		flex-direction: column;
		align-items: center;
		min-width: 60px;
		padding: 0.75rem;
		background: #2c2c2c;
		color: white;
		border-radius: 8px;
	}

	.upcoming-date .month {
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
	}

	.upcoming-date .day {
		font-size: 1.5rem;
		font-weight: 300;
	}

	.upcoming-event-title {
		font-size: 1.125rem;
		font-weight: 500;
		color: #2c2c2c;
		margin-bottom: 0.25rem;
	}

	.upcoming-location {
		color: #666;
		font-size: 0.875rem;
	}

	/* Media Kit Section */
	.media-kit-section {
		padding: 80px 20px;
		background: #2c2c2c;
	}

	.media-kit-container {
		max-width: 800px;
		margin: 0 auto;
		text-align: center;
	}

	.media-kit-title {
		font-size: 2.5rem;
		font-weight: 300;
		color: white;
		margin-bottom: 1rem;
	}

	.media-kit-description {
		font-size: 1.125rem;
		color: #ccc;
		margin-bottom: 3rem;
		line-height: 1.6;
	}

	.media-kit-items {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.media-kit-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1.5rem;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 12px;
		transition: background 0.3s ease;
	}

	.media-kit-item:hover {
		background: rgba(255, 255, 255, 0.15);
	}

	.kit-item-info {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.25rem;
	}

	.kit-item-name {
		color: white;
		font-weight: 500;
	}

	.kit-item-details {
		color: #ccc;
		font-size: 0.875rem;
	}

	.download-btn {
		padding: 8px 20px;
		background: #a8b4a0;
		color: white;
		border: none;
		border-radius: 20px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.download-btn:hover {
		background: #96a28d;
	}

	/* Responsive */
	@media (max-width: 1024px) {
		.featured-grid {
			grid-template-columns: 1fr;
			gap: 40px;
		}

		.featured-image {
			height: 350px;
		}
	}

	@media (max-width: 768px) {
		.press-grid,
		.events-grid {
			grid-template-columns: 1fr;
		}

		.tabs {
			gap: 1rem;
		}

		.featured-title {
			font-size: 1.75rem;
		}

		.media-kit-title {
			font-size: 2rem;
		}

		.upcoming-item {
			flex-direction: column;
			text-align: center;
		}
	}
</style>
