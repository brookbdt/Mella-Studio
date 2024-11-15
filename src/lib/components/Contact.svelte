<script lang="ts">
	import { fade } from 'svelte/transition';

	let formFields = {
		name: '',
		phoneNumber: '',
		message: ''
	};

	let isSubmitting = false;
	let showThankYou = false;
	let errorMessage = '';

	let phoneError = '';

	function formatPhoneNumber(value: string) {
		// Remove all non-digit characters
		let cleaned = value.replace(/\D/g, '');

		// If the user deletes everything, reset the field
		if (!cleaned) return '';

		// If number doesn't start with 251, add it
		if (!cleaned.startsWith('251')) {
			// If it starts with 0, replace it with 251
			if (cleaned.startsWith('0')) {
				cleaned = '251' + cleaned.substring(1);
			} else if (cleaned.startsWith('9')) {
				// If it starts with 9, add 251
				cleaned = '251' + cleaned;
			}
		}

		// Format the number: +251 XX XXX XXXX
		if (cleaned.length >= 12) {
			return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8, 12)}`;
		} else if (cleaned.length > 8) {
			return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8)}`;
		} else if (cleaned.length > 5) {
			return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 5)} ${cleaned.slice(5)}`;
		} else if (cleaned.length > 3) {
			return `+${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
		}
		return `+${cleaned}`;
	}

	function validatePhone(value: string) {
		const phoneRegex = /^\+251 \d{2} \d{3} \d{4}$/;
		if (!value) {
			phoneError = 'Phone number is required';
			return false;
		}
		if (!phoneRegex.test(value)) {
			phoneError = 'Please enter a valid Ethiopian phone number';
			return false;
		}
		phoneError = '';
		return true;
	}

	async function handleSubmit() {
		// Form validation
		phoneError = '';
		errorMessage = '';

		// Validate phone
		if (!validatePhone(formFields.phoneNumber)) {
			return;
		}

		if (!formFields.name || !formFields.phoneNumber || !formFields.message) {
			errorMessage = 'Please fill in all fields';
			return;
		}

		isSubmitting = true;
		errorMessage = '';

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formFields)
			});

			const result = await response.json();

			if (result.success) {
				showThankYou = true;
				formFields = { name: '', phoneNumber: '', message: '' };
			} else {
				errorMessage = result.message || 'Failed to send message. Please try again.';
			}
		} catch (error) {
			console.error('Error:', error);
			errorMessage = 'An error occurred. Please try again.';
		} finally {
			isSubmitting = false;
		}
	}
</script>

<section class="py-12 bg-secondary">
	<div class="container mx-auto px-4">
		<h2 class="text-3xl font-bold text-center mb-8">Contact Us</h2>
		<div class="grid md:grid-cols-2 gap-12">
			<!-- Left column - Contact Info -->
			<div class="mb-8 md:mb-0">
				<h3 class="text-2xl font-semibold mb-4">Get in Touch</h3>
				<p class="mb-4">
					Feel free to reach out with any questions or inquiries. We're here to help!
				</p>
				<ul class="space-y-4">
					<li class="flex items-center">
						<i class="far fa-envelope mr-3 text-primary"></i>
						<span>mellastudio07@gmail.com</span>
					</li>
					<li class="flex items-center">
						<i class="fas fa-phone-alt mr-3 text-primary"></i>
						<span>+251 901 744 835</span>
					</li>
					<li class="flex items-center">
						<i class="fas fa-map-marker-alt mr-3 text-primary"></i>
						<span>Bole Olympia, Next to Mintewab building, 1st floor</span>
					</li>
				</ul>

				<div class="flex space-x-6 mt-8">
					<a
						href="https://www.tiktok.com/@mella_studio"
						target="_blank"
						class="transition duration-300 hover:text-primary"
					>
						<i class="fab fa-tiktok text-2xl"></i>
					</a>
					<a
						href="https://www.instagram.com/mella_studio"
						target="_blank"
						class="transition duration-300 hover:text-primary"
					>
						<i class="fab fa-instagram text-2xl"></i>
					</a>
					<a
						href="https://pin.it/6EAtyYqgy"
						target="_blank"
						class="transition duration-300 hover:text-primary"
					>
						<i class="fab fa-pinterest text-2xl"></i>
					</a>
				</div>
			</div>

			<!-- Right column - Contact Form -->
			<div>
				{#if showThankYou}
					<div class="bg-green-50 p-6 rounded-lg text-center" transition:fade>
						<i class="fas fa-check-circle text-green-500 text-4xl mb-4"></i>
						<h3 class="text-xl font-semibold mb-2">Thank You!</h3>
						<p>Your message has been sent successfully. We'll get back to you soon.</p>
						<button class="mt-4 text-primary underline" on:click={() => (showThankYou = false)}>
							Send another message
						</button>
					</div>
				{:else}
					<form on:submit|preventDefault={handleSubmit} class="space-y-4">
						{#if errorMessage}
							<div class="bg-red-50 text-red-500 p-3 rounded-lg mb-4" transition:fade>
								{errorMessage}
							</div>
						{/if}

						<div>
							<label for="name" class="block text-sm font-medium mb-1">Name</label>
							<input
								id="name"
								type="text"
								bind:value={formFields.name}
								class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
								disabled={isSubmitting}
							/>
						</div>

						<div class="relative">
							<label for="phone" class="block text-sm font-medium mb-1">Phone Number</label>
							<div class="relative">
								<input
									id="phone"
									type="tel"
									bind:value={formFields.phoneNumber}
									on:input={(e) => {
										formFields.phoneNumber = formatPhoneNumber(e.currentTarget.value);
										validatePhone(formFields.phoneNumber);
									}}
									placeholder="+251 XX XXX XXXX"
									class="w-full p-3 pl-4 border border-gray-300 rounded-lg
                focus:ring-2 focus:ring-primary focus:border-transparent
                {phoneError ? 'border-red-500' : ''}
                {formFields.phoneNumber && !phoneError ? 'border-green-500' : ''}"
									disabled={isSubmitting}
								/>

								<!-- Valid indicator -->
								{#if formFields.phoneNumber && !phoneError}
									<div class="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
										<i class="fas fa-check-circle"></i>
									</div>
								{/if}
							</div>

							<!-- Error message -->
							{#if phoneError}
								<p class="mt-1 text-sm text-red-500 transition-all" transition:fade>
									<i class="fas fa-exclamation-circle mr-1"></i>
									{phoneError}
								</p>
							{/if}

							<!-- Helper text -->
							<p class="mt-1 text-xs text-gray-500">
								Enter your Ethiopian phone number starting with +251
							</p>
						</div>

						<div>
							<label for="message" class="block text-sm font-medium mb-1">Message</label>
							<textarea
								id="message"
								bind:value={formFields.message}
								rows="4"
								class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
								disabled={isSubmitting}
							></textarea>
						</div>

						<button
							type="submit"
							class="w-full bg-primary text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-primary-dark transition duration-300 disabled:opacity-50"
							disabled={isSubmitting}
						>
							{#if isSubmitting}
								<i class="fas fa-spinner fa-spin mr-2"></i>
								Sending...
							{:else}
								Send Message
							{/if}
						</button>
					</form>
				{/if}
			</div>
		</div>
	</div>
</section>

<style>
	/* Add these to your existing styles */
	input[type='tel'] {
		transition: all 0.3s ease;
	}

	input[type='tel']:focus {
		box-shadow: 0 0 0 3px rgba(var(--primary-rgb), 0.1);
	}

	/* Optional: Add a custom autofill style */
	input[type='tel']:-webkit-autofill {
		-webkit-box-shadow: 0 0 0 30px white inset;
	}
</style>
