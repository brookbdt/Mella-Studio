<script lang="ts">
	import { onMount } from 'svelte';

	interface ProcessStep {
		id: string;
		title: string;
		duration: string;
		description: string;
		detailedProcess: string;
		tools: string[];
		materials: string[];
		artisanLevel: 'Apprentice' | 'Craftsman' | 'Master';
		image: string;
		videoUrl?: string;
	}

	const craftingSteps: ProcessStep[] = [
		{
			id: 'step-1',
			title: 'Pattern Design & Cultural Research',
			duration: '2-3 weeks',
			description:
				'Our design team collaborates with cultural historians to ensure authentic representation of Ethiopian heritage patterns.',
			detailedProcess:
				'Each MellaStudio piece begins with extensive research into Ethiopian cultural motifs, consulting with elders and reviewing historical artifacts. Our master designers then adapt these ancient patterns for contemporary lighting, ensuring cultural authenticity while meeting modern aesthetic and functional requirements. This process involves sketching, digital modeling, and multiple revisions with cultural consultants.',
			tools: [
				'Traditional pattern books',
				'Digital design software',
				'Historical references',
				'Cultural consultations'
			],
			materials: ['Research documents', 'Pattern templates', 'Design sketches'],
			artisanLevel: 'Master',
			image: '/process-1.jpg'
		},
		{
			id: 'step-2',
			title: 'Material Selection & Preparation',
			duration: '1 week',
			description:
				'Premium materials are hand-selected and prepared using traditional Ethiopian techniques passed down through generations.',
			detailedProcess:
				'Only the finest materials make it into MellaStudio pieces. Our artisans personally select each sheet of brass, ensuring perfect grain and malleability. Ethiopian cedar is sourced from sustainable forests, aged for optimal workability. Each material undergoes traditional preparation methods—brass is heated and hammered to achieve the perfect temper, wood is seasoned using ancient drying techniques, and metals are treated with natural oils.',
			tools: ['Hand hammers', 'Traditional anvils', 'Seasoning chambers', 'Selection gauges'],
			materials: [
				'Premium brass sheets',
				'Ethiopian cedar',
				'Natural treatment oils',
				'Traditional alloys'
			],
			artisanLevel: 'Craftsman',
			image: '/process-2.jpg'
		},
		{
			id: 'step-3',
			title: 'Hand-Forging & Metalwork',
			duration: '3-4 weeks',
			description:
				'Master metalworkers shape each piece using techniques unchanged for centuries, creating the distinctive patterns that define our heritage.',
			detailedProcess:
				'The heart of our craft lies in the metalwork. Master artisans, some from families with five generations of metalworking experience, hand-forge each component. Using traditional hammers and anvils, they carefully shape the brass into intricate patterns. Each strike is deliberate, following ancestral techniques that create not just functional lighting elements, but works of cultural art. The process requires intense focus, strength, and years of training to master.',
			tools: [
				'Traditional Ethiopian hammers',
				'Ancestral anvils',
				'Shaping tools',
				'Pattern guides'
			],
			materials: ['Prepared brass', 'Template patterns', 'Traditional flux'],
			artisanLevel: 'Master',
			image: '/process-3.jpg',
			videoUrl: '/metalwork-process.mp4'
		},
		{
			id: 'step-4',
			title: 'Pattern Detailing & Engraving',
			duration: '2-3 weeks',
			description:
				'Intricate cultural patterns are meticulously engraved by hand, with each symbol carrying deep cultural meaning and significance.',
			detailedProcess:
				"The engraving phase is where culture comes alive. Master engravers, trained in traditional Ethiopian iconography, carefully etch meaningful patterns into each piece. Every symbol tells a story—from ancient Ge'ez script to royal crown motifs, from geometric patterns representing Ethiopian landscapes to spiritual symbols passed down through Orthodox traditions. This work requires exceptional precision and cultural knowledge.",
			tools: [
				'Hand engraving tools',
				'Traditional scribes',
				'Magnification aids',
				'Pattern templates'
			],
			materials: ['Engraving compounds', 'Traditional inks', 'Protective coatings'],
			artisanLevel: 'Master',
			image: '/process-4.jpg'
		},
		{
			id: 'step-5',
			title: 'Wood Carving & Joining',
			duration: '2 weeks',
			description:
				'Sustainably sourced Ethiopian cedar is carved using traditional techniques, creating bases and structural elements that complement the metalwork.',
			detailedProcess:
				'Our woodworkers continue a tradition that dates back to the construction of ancient Ethiopian churches. Using hand tools and techniques passed down through generations, they transform raw cedar into elegant structural elements. Each joint is cut by hand, each curve carved with traditional gouges. The wood is shaped not just for beauty, but to enhance the acoustic properties of the space, allowing light to interact with sound in harmony.',
			tools: ['Traditional wood gouges', 'Hand planes', 'Joining tools', 'Finishing brushes'],
			materials: [
				'Ethiopian cedar',
				'Natural wood stains',
				'Traditional joining compounds',
				'Beeswax finish'
			],
			artisanLevel: 'Craftsman',
			image: '/process-5.jpg'
		},
		{
			id: 'step-6',
			title: 'Assembly & LED Integration',
			duration: '1 week',
			description:
				'Modern LED technology is seamlessly integrated with traditional craftsmanship, ensuring optimal lighting performance.',
			detailedProcess:
				'The marriage of ancient craft and modern technology requires exceptional skill. Our technical artisans carefully integrate state-of-the-art LED systems that enhance rather than compete with the traditional elements. Wiring is hidden within the structure, controls are elegantly incorporated, and the lighting is calibrated to bring out the best in the handcrafted patterns. Each electrical component is tested for longevity and safety.',
			tools: [
				'Precision electronics tools',
				'LED calibration equipment',
				'Assembly jigs',
				'Testing devices'
			],
			materials: [
				'Premium LED components',
				'Electrical wiring',
				'Control systems',
				'Safety components'
			],
			artisanLevel: 'Craftsman',
			image: '/process-6.jpg'
		},
		{
			id: 'step-7',
			title: 'Finishing & Quality Assurance',
			duration: '1-2 weeks',
			description:
				'Each piece undergoes rigorous quality checks and receives final finishing touches that will last generations.',
			detailedProcess:
				"The final phase ensures that each MellaStudio piece meets our exacting standards. Artisans apply traditional finishing techniques—hand-rubbed oils, natural waxes, and protective coatings that enhance the materials' natural beauty. Every joint is tested, every electrical component verified, every pattern inspected under magnification. Only pieces that pass our 127-point quality checklist receive the MellaStudio authenticity mark.",
			tools: [
				'Quality inspection tools',
				'Finishing brushes',
				'Protective coating applicators',
				'Verification equipment'
			],
			materials: ['Natural finishing oils', 'Protective waxes', 'Quality verification materials'],
			artisanLevel: 'Master',
			image: '/process-7.jpg'
		},
		{
			id: 'step-8',
			title: 'Packaging & Documentation',
			duration: '3-5 days',
			description:
				'Each piece is carefully packaged with its authenticity certificate and cultural documentation for its journey to your home.',
			detailedProcess:
				"The final step honors both the piece and its journey. Each lamp is wrapped in traditional Ethiopian textiles before being secured in custom protective packaging. Accompanying documentation includes the artisan's signature, cultural significance explanations, care instructions, and a certificate of authenticity. This ensures that every MellaStudio piece arrives not just as a product, but as a complete cultural experience.",
			tools: [
				'Custom packaging materials',
				'Documentation printing',
				'Traditional textiles',
				'Protective cases'
			],
			materials: [
				'Authentication certificates',
				'Cultural documentation',
				'Traditional wrapping',
				'Protective packaging'
			],
			artisanLevel: 'Craftsman',
			image: '/process-8.jpg'
		}
	];

	const artisanProfiles = [
		{
			name: 'Master Tesfaye Alemayehu',
			specialty: 'Metalwork & Pattern Design',
			experience: '45 years',
			family_tradition: '5 generations',
			achievement: "Created pieces for Emperor Haile Selassie's palace",
			quote: 'Each piece carries the dreams of our ancestors forward into the modern world.',
			image: '/artisan-1.jpg'
		},
		{
			name: 'Master Hana Tadesse',
			specialty: 'Ceramic Work & Painting',
			experience: '30 years',
			family_tradition: '4 generations',
			achievement: 'Featured in National Geographic for preserving traditional techniques',
			quote: 'In every pattern, I see the faces of the mothers who taught me these sacred designs.',
			image: '/artisan-2.jpg'
		},
		{
			name: 'Master Bekele Mesfin',
			specialty: 'Wood Carving & Sculpture',
			experience: '38 years',
			family_tradition: '6 generations',
			achievement: 'Restored woodwork in historic Ethiopian Orthodox churches',
			quote: 'The wood speaks to those who listen. I simply help it tell its story.',
			image: '/artisan-3.jpg'
		}
	];

	let selectedStep = 0;
	let showVideoModal = false;
	let currentVideoUrl = '';
	let mounted = false;

	onMount(() => {
		mounted = true;
	});

	function selectStep(index: number) {
		selectedStep = index;
	}

	function openVideoModal(videoUrl: string) {
		currentVideoUrl = videoUrl;
		showVideoModal = true;
	}

	function getArtisanLevelColor(level: string) {
		switch (level) {
			case 'Master':
				return '#d4af37';
			case 'Craftsman':
				return '#7A9360';
			case 'Apprentice':
				return '#4D5E3B';
			default:
				return '#666';
		}
	}
</script>

<section class="crafting-process">
	<div class="container">
		<!-- Header -->
		<div class="process-header">
			<span class="craftsmanship-badge">ARTISAN CRAFTSMANSHIP</span>
			<h2 class="section-title">The Journey from Vision to Heirloom</h2>
			<p class="section-subtitle">
				Each MellaStudio piece represents 8-12 weeks of meticulous handwork by master artisans,
				blending thousand-year-old techniques with contemporary precision. This is how cultural
				heritage becomes contemporary luxury.
			</p>
		</div>

		<!-- Process Timeline -->
		<div class="process-timeline">
			<div class="timeline-nav">
				{#each craftingSteps as step, index}
					<button
						class="timeline-btn {selectedStep === index ? 'active' : ''}"
						on:click={() => selectStep(index)}
					>
						<span class="step-number">{index + 1}</span>
						<span class="step-title">{step.title}</span>
						<span class="step-duration">{step.duration}</span>
					</button>
				{/each}
			</div>

			<div class="timeline-content">
				{#each craftingSteps as step, index}
					<div class="process-step {selectedStep === index ? 'active' : ''}">
						<div class="step-media">
							<div class="step-image">
								<div class="image-placeholder">
									<span class="placeholder-text">Step {index + 1} Process</span>
								</div>
								{#if step.videoUrl}
									<button
										class="video-overlay"
										on:click={() => openVideoModal(step.videoUrl || '')}
									>
										<div class="play-button">▶</div>
										<span>Watch Process Video</span>
									</button>
								{/if}
							</div>
						</div>

						<div class="step-details">
							<div class="step-header">
								<h3 class="step-title-main">{step.title}</h3>
								<div class="step-meta">
									<span class="duration">⏱️ {step.duration}</span>
									<span
										class="artisan-level"
										style="color: {getArtisanLevelColor(step.artisanLevel)}"
									>
										👑 {step.artisanLevel} Level
									</span>
								</div>
							</div>

							<p class="step-description">{step.description}</p>
							<p class="step-detailed">{step.detailedProcess}</p>

							<div class="step-resources">
								<div class="resource-section">
									<h4>Traditional Tools</h4>
									<div class="resource-list">
										{#each step.tools as tool}
											<span class="resource-tag tools">{tool}</span>
										{/each}
									</div>
								</div>

								<div class="resource-section">
									<h4>Premium Materials</h4>
									<div class="resource-list">
										{#each step.materials as material}
											<span class="resource-tag materials">{material}</span>
										{/each}
									</div>
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Master Artisans -->
		<div class="master-artisans">
			<h3 class="artisans-title">Meet Our Master Artisans</h3>
			<p class="artisans-subtitle">
				The guardian of traditions, each bringing decades of experience and family knowledge passed
				down through generations.
			</p>

			<div class="artisans-grid">
				{#each artisanProfiles as artisan, index}
					<div class="artisan-card" class:visible={mounted} style="animation-delay: {index * 0.2}s">
						<div class="artisan-image">
							<div class="artisan-placeholder">
								{artisan.name.charAt(0)}
							</div>
						</div>

						<div class="artisan-info">
							<h4 class="artisan-name">{artisan.name}</h4>
							<p class="artisan-specialty">{artisan.specialty}</p>

							<div class="artisan-stats">
								<div class="stat-item">
									<span class="stat-value">{artisan.experience}</span>
									<span class="stat-label">Experience</span>
								</div>
								<div class="stat-item">
									<span class="stat-value">{artisan.family_tradition}</span>
									<span class="stat-label">Family Tradition</span>
								</div>
							</div>

							<p class="artisan-achievement">{artisan.achievement}</p>

							<blockquote class="artisan-quote">
								"{artisan.quote}"
							</blockquote>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Process Stats -->
		<div class="process-stats">
			<h3>The Numbers Behind the Craft</h3>
			<div class="stats-grid">
				<div class="stat-card">
					<span class="stat-number">1,200+</span>
					<span class="stat-label">Hours Per Premium Piece</span>
				</div>
				<div class="stat-card">
					<span class="stat-number">127</span>
					<span class="stat-label">Quality Checkpoints</span>
				</div>
				<div class="stat-card">
					<span class="stat-number">15+</span>
					<span class="stat-label">Master Artisans</span>
				</div>
				<div class="stat-card">
					<span class="stat-number">500+</span>
					<span class="stat-label">Years of Combined Experience</span>
				</div>
			</div>
		</div>

		<!-- Cultural Impact -->
		<div class="cultural-impact">
			<div class="impact-content">
				<h3>Preserving Heritage, Creating Futures</h3>
				<p>
					Every MellaStudio purchase directly supports master artisans and their families, ensuring
					that ancient Ethiopian craftsmanship traditions continue to thrive in the modern world.
					Our artisans earn 5x the local average wage, allowing them to focus on their craft while
					supporting their communities.
				</p>
				<div class="impact-stats">
					<div class="impact-item">
						<span class="impact-number">500+</span>
						<span class="impact-text">Families Supported</span>
					</div>
					<div class="impact-item">
						<span class="impact-number">25+</span>
						<span class="impact-text">Traditional Techniques Preserved</span>
					</div>
					<div class="impact-item">
						<span class="impact-number">3</span>
						<span class="impact-text">Artisan Schools Established</span>
					</div>
				</div>
			</div>
		</div>

		<!-- CTA -->
		<div class="process-cta">
			<h3>Experience the Craftsmanship</h3>
			<p>
				Each piece is a testament to the skill, dedication, and cultural pride of our master
				artisans.
			</p>
			<div class="cta-buttons">
				<a href="#collection" class="btn-primary">View Our Collection</a>
				<a href="#workshop-tour" class="btn-secondary">Virtual Workshop Tour</a>
			</div>
		</div>
	</div>
</section>

<!-- Video Modal -->
{#if showVideoModal}
	<div class="modal-overlay" on:click={() => (showVideoModal = false)}>
		<div class="video-modal" on:click|stopPropagation>
			<button class="close-btn" on:click={() => (showVideoModal = false)}>×</button>
			<div class="video-container">
				<div class="video-placeholder">
					<p>Artisan process video would play here</p>
					<p class="video-url">{currentVideoUrl}</p>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.crafting-process {
		padding: 120px 0;
		background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 50%, #f5f5f5 100%);
	}

	.container {
		max-width: 1400px;
		margin: 0 auto;
		padding: 0 2rem;
	}

	.process-header {
		text-align: center;
		margin-bottom: 100px;
	}

	.craftsmanship-badge {
		display: inline-block;
		padding: 0.75rem 2rem;
		background: linear-gradient(135deg, #7a9360, #4d5e3b);
		color: white;
		font-size: 0.875rem;
		font-weight: 600;
		letter-spacing: 3px;
		border-radius: 50px;
		margin-bottom: 2rem;
		text-transform: uppercase;
	}

	.section-title {
		font-size: clamp(2.5rem, 5vw, 4rem);
		font-weight: 300;
		color: #2c2c2c;
		margin-bottom: 2rem;
		font-family: 'Montserrat', sans-serif;
	}

	.section-subtitle {
		font-size: 1.25rem;
		color: #666;
		max-width: 900px;
		margin: 0 auto;
		line-height: 1.7;
	}

	.process-timeline {
		margin-bottom: 120px;
	}

	.timeline-nav {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
		margin-bottom: 4rem;
	}

	.timeline-btn {
		background: white;
		border: 2px solid #e2e8d8;
		border-radius: 15px;
		padding: 1.5rem 1rem;
		cursor: pointer;
		transition: all 0.3s ease;
		text-align: center;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.timeline-btn:hover {
		border-color: #7a9360;
		transform: translateY(-2px);
	}

	.timeline-btn.active {
		border-color: #7a9360;
		background: #f0f4ed;
		transform: translateY(-2px);
		box-shadow: 0 10px 25px rgba(122, 147, 96, 0.2);
	}

	.step-number {
		width: 30px;
		height: 30px;
		border-radius: 50%;
		background: #7a9360;
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 600;
		margin: 0 auto;
	}

	.timeline-btn.active .step-number {
		background: #4d5e3b;
	}

	.step-title {
		font-weight: 600;
		color: #2c2c2c;
		font-size: 0.875rem;
	}

	.step-duration {
		font-size: 0.75rem;
		color: #7a9360;
		font-weight: 500;
	}

	.timeline-content {
		position: relative;
	}

	.process-step {
		display: none;
		grid-template-columns: 1fr 1fr;
		gap: 4rem;
		align-items: start;
		opacity: 0;
		transform: translateX(30px);
		transition: all 0.6s ease;
		margin-bottom: 2rem;
	}

	.process-step.active {
		display: grid;
		opacity: 1;
		transform: translateX(0);
		animation: slideInContent 0.6s ease-out;
	}

	@keyframes slideInContent {
		from {
			opacity: 0;
			transform: translateX(30px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	.step-media {
		position: relative;
	}

	.step-image {
		position: relative;
		border-radius: 20px;
		overflow: hidden;
		aspect-ratio: 4/3;
	}

	.image-placeholder {
		width: 100%;
		height: 100%;
		background: linear-gradient(135deg, #e2e8d8, #7a9360);
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		font-weight: 600;
		font-size: 1.25rem;
	}

	.video-overlay {
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0.6);
		color: white;
		border: none;
		cursor: pointer;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.step-image:hover .video-overlay {
		opacity: 1;
	}

	.play-button {
		width: 60px;
		height: 60px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.2);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.5rem;
		backdrop-filter: blur(10px);
	}

	.step-details {
		background: white;
		padding: 3rem;
		border-radius: 20px;
		box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
	}

	.step-header {
		margin-bottom: 2rem;
	}

	.step-title-main {
		font-size: 2rem;
		font-weight: 600;
		color: #2c2c2c;
		margin-bottom: 1rem;
		font-family: 'Montserrat', sans-serif;
	}

	.step-meta {
		display: flex;
		gap: 2rem;
		flex-wrap: wrap;
	}

	.duration,
	.artisan-level {
		font-weight: 500;
		font-size: 0.875rem;
	}

	.step-description {
		font-size: 1.25rem;
		color: #4d5e3b;
		font-weight: 500;
		margin-bottom: 1.5rem;
		line-height: 1.6;
	}

	.step-detailed {
		font-size: 1rem;
		color: #666;
		line-height: 1.8;
		margin-bottom: 2rem;
	}

	.step-resources {
		display: grid;
		gap: 2rem;
	}

	.resource-section h4 {
		font-size: 1.1rem;
		font-weight: 600;
		color: #2c2c2c;
		margin-bottom: 1rem;
	}

	.resource-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.resource-tag {
		padding: 0.5rem 1rem;
		border-radius: 20px;
		font-size: 0.875rem;
		font-weight: 500;
	}

	.resource-tag.tools {
		background: #e3f2fd;
		color: #1565c0;
	}

	.resource-tag.materials {
		background: #f3e5f5;
		color: #7b1fa2;
	}

	.master-artisans {
		margin-bottom: 120px;
		text-align: center;
	}

	.artisans-title {
		font-size: 3rem;
		font-weight: 300;
		color: #2c2c2c;
		margin-bottom: 1rem;
		font-family: 'Montserrat', sans-serif;
	}

	.artisans-subtitle {
		font-size: 1.25rem;
		color: #666;
		max-width: 800px;
		margin: 0 auto 4rem auto;
		line-height: 1.7;
	}

	.artisans-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
		gap: 3rem;
	}

	.artisan-card {
		background: white;
		border-radius: 20px;
		padding: 3rem 2rem;
		box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
		text-align: center;
		opacity: 0;
		transform: translateY(30px);
		transition: all 0.6s ease;
	}

	.artisan-card.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.artisan-image {
		margin-bottom: 2rem;
	}

	.artisan-placeholder {
		width: 120px;
		height: 120px;
		border-radius: 50%;
		background: linear-gradient(135deg, #7a9360, #4d5e3b);
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 3rem;
		font-weight: 300;
		margin: 0 auto;
		box-shadow: 0 10px 30px rgba(122, 147, 96, 0.3);
	}

	.artisan-name {
		font-size: 1.5rem;
		font-weight: 600;
		color: #2c2c2c;
		margin-bottom: 0.5rem;
	}

	.artisan-specialty {
		color: #7a9360;
		font-weight: 500;
		margin-bottom: 2rem;
	}

	.artisan-stats {
		display: flex;
		justify-content: center;
		gap: 2rem;
		margin-bottom: 2rem;
	}

	.stat-item {
		text-align: center;
	}

	.stat-value {
		display: block;
		font-size: 1.5rem;
		font-weight: 700;
		color: #4d5e3b;
	}

	.stat-label {
		font-size: 0.875rem;
		color: #666;
	}

	.artisan-achievement {
		color: #666;
		font-style: italic;
		margin-bottom: 2rem;
		line-height: 1.6;
	}

	.artisan-quote {
		font-size: 1.1rem;
		font-style: italic;
		color: #4d5e3b;
		line-height: 1.6;
		position: relative;
		padding: 0 2rem;
	}

	.artisan-quote::before {
		content: '"';
		position: absolute;
		left: 0;
		top: -0.5rem;
		font-size: 3rem;
		color: #e2e8d8;
		font-family: serif;
	}

	.process-stats {
		margin-bottom: 120px;
		text-align: center;
	}

	.process-stats h3 {
		font-size: 2.5rem;
		font-weight: 300;
		color: #2c2c2c;
		margin-bottom: 3rem;
		font-family: 'Montserrat', sans-serif;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 2rem;
	}

	.stat-card {
		background: white;
		padding: 3rem 2rem;
		border-radius: 20px;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
		text-align: center;
	}

	.stat-number {
		display: block;
		font-size: 3rem;
		font-weight: 700;
		color: #7a9360;
		margin-bottom: 0.5rem;
	}

	.stat-label {
		color: #666;
		font-weight: 500;
	}

	.cultural-impact {
		background: linear-gradient(135deg, #2c2c2c, #4d5e3b);
		color: white;
		padding: 5rem 3rem;
		border-radius: 25px;
		text-align: center;
		margin-bottom: 80px;
	}

	.cultural-impact h3 {
		font-size: 3rem;
		font-weight: 300;
		margin-bottom: 2rem;
		font-family: 'Montserrat', sans-serif;
	}

	.impact-content p {
		font-size: 1.25rem;
		line-height: 1.8;
		margin-bottom: 3rem;
		max-width: 900px;
		margin-left: auto;
		margin-right: auto;
	}

	.impact-stats {
		display: flex;
		justify-content: center;
		gap: 4rem;
		flex-wrap: wrap;
	}

	.impact-item {
		text-align: center;
	}

	.impact-number {
		display: block;
		font-size: 3rem;
		font-weight: 700;
		color: #e2e8d8;
		margin-bottom: 0.5rem;
	}

	.impact-text {
		font-size: 1rem;
		opacity: 0.9;
		letter-spacing: 1px;
	}

	.process-cta {
		text-align: center;
	}

	.process-cta h3 {
		font-size: 2.5rem;
		font-weight: 300;
		color: #2c2c2c;
		margin-bottom: 1rem;
		font-family: 'Montserrat', sans-serif;
	}

	.process-cta p {
		font-size: 1.25rem;
		color: #666;
		margin-bottom: 2rem;
	}

	.cta-buttons {
		display: flex;
		justify-content: center;
		gap: 2rem;
		flex-wrap: wrap;
	}

	.btn-primary,
	.btn-secondary {
		padding: 1rem 2.5rem;
		border-radius: 50px;
		font-weight: 600;
		text-decoration: none;
		letter-spacing: 1px;
		transition: all 0.3s ease;
	}

	.btn-primary {
		background: linear-gradient(135deg, #7a9360, #4d5e3b);
		color: white;
		border: 2px solid transparent;
	}

	.btn-primary:hover {
		transform: translateY(-2px);
		box-shadow: 0 10px 25px rgba(122, 147, 96, 0.4);
	}

	.btn-secondary {
		background: transparent;
		color: #7a9360;
		border: 2px solid #7a9360;
	}

	.btn-secondary:hover {
		background: #7a9360;
		color: white;
		transform: translateY(-2px);
	}

	.modal-overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.8);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
		padding: 2rem;
	}

	.video-modal {
		background: white;
		border-radius: 20px;
		max-width: 900px;
		width: 100%;
		position: relative;
	}

	.close-btn {
		position: absolute;
		top: 1rem;
		right: 1rem;
		background: none;
		border: none;
		font-size: 2rem;
		cursor: pointer;
		z-index: 10;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background: rgba(0, 0, 0, 0.1);
	}

	.video-container {
		padding: 3rem;
		text-align: center;
	}

	.video-placeholder {
		width: 100%;
		height: 400px;
		background: #f0f0f0;
		border-radius: 15px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: #666;
	}

	.video-url {
		font-family: monospace;
		font-size: 0.875rem;
		margin-top: 1rem;
	}

	@media (max-width: 768px) {
		.process-step {
			grid-template-columns: 1fr;
			gap: 2rem;
		}

		.step-details {
			padding: 2rem;
		}

		.timeline-nav {
			grid-template-columns: repeat(2, 1fr);
			gap: 0.75rem;
		}

		.timeline-btn {
			padding: 1rem 0.75rem;
		}

		.step-title {
			font-size: 0.75rem;
		}

		.artisan-stats {
			flex-direction: column;
			gap: 1rem;
		}

		.impact-stats {
			flex-direction: column;
			gap: 2rem;
		}

		.cta-buttons {
			flex-direction: column;
			align-items: center;
		}

		.btn-primary,
		.btn-secondary {
			width: 100%;
			max-width: 300px;
		}
	}

	@media (max-width: 480px) {
		.timeline-nav {
			grid-template-columns: 1fr;
		}

		.artisans-grid {
			grid-template-columns: 1fr;
		}

		.stats-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 1.5rem;
		}
	}
</style>
