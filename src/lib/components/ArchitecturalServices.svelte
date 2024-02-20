<script lang="ts">
	import services1 from '$lib/assets/images/services1.jpg';
	import services2 from '$lib/assets/images/services2.jpg';
	import services3 from '$lib/assets/images/services3.jpg';
	import services4 from '$lib/assets/images/services4.jpg';
	import services5 from '$lib/assets/images/services5.jpg';
	// Example project data - replace with actual project data
	interface Project {
		id: number;
		name: string;
		description: string;
		imageUrl: string;
	}

	const projects: Project[] = [
		{
			id: 1,
			name: 'MAMP',
			description: 'A blend of modern and traditional aesthetics.',
			imageUrl: services1
		},
		{
			id: 2,
			name: 'Residential',
			description: 'Innovative designs for a memorable guest experience.',
			imageUrl: services2
		},
		{
			id: 3,
			name: 'Working Spaces',
			description: 'Sustainable and community-focused projects.',
			imageUrl: services3
		}
		// Add more projects as needed
	];
</script>

<section class="py-12 bg-gradient-to-r from-blue-50 to-gray-100">
	<div class="container mx-auto px-4">
		<div class="text-center mb-12">
			<h2 class="text-3xl md:text-4xl font-bold text-gray mb-4">
				Interior and Architectural Design Services
			</h2>
			<p class="text-lg text-gray-700">Creativity and customization at the core of every design</p>
		</div>

		<div class="flex flex-wrap -mx-4">
			{#each projects as project}
				<div class="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
					<div
						class="bg-white rounded-lg overflow-hidden shadow-lg transform hover:cursor-pointer transition duration-500 hover:scale-105 hover:shadow-xl"
					>
						<img
							src={project.imageUrl}
							alt={project.name}
							class="w-full h-auto object-cover transition-transform duration-500 hover:scale-110"
						/>
						<div class="p-6">
							<h3 class="font-semibold text-lg mb-2 transition duration-500 hover:text-primary">
								{project.name}
							</h3>
							<p class="text-gray-700 transition duration-500 hover:text-secondary">
								{project.description}
							</p>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<div class="text-center mt-12">
			<p
				class="text-lg mb-4 text-gray-700
			"
			>
				From conceptualization to execution, our team is dedicated to delivering bespoke
				architectural solutions that not only meet but exceed our clients' expectations.
			</p>
			<a
				href="#contact"
				type="submit"
				class="bg-white text-primary font-semibold px-6 py-3 rounded-lg shadow hover:cursor-pointer hover:bg-gray-100 transition duration-300"
				>Consult With Us</a
			>
		</div>
	</div>
</section>

<style>
	/* Additional custom styles if needed */
</style>
