<script>
	import emailjs from 'emailjs-com';

	let formFields = {
		name: '',
		email: '',
		message: ''
	};

	function sendEmail() {
		emailjs.send('your_service_id', 'your_template_id', formFields, 'your_user_id').then(
			(response) => {
				console.log('SUCCESS!', response.status, response.text);
				// Handle success (e.g., showing a success message)
			},
			(error) => {
				console.log('FAILED...', error);
				// Handle errors (e.g., showing an error message)
			}
		);
	}
</script>

<section class="py-12 bg-secondary">
	<div class="container mx-auto px-4">
		<h2 class="text-3xl font-bold text-center mb-8">Contact Us</h2>
		<div class="grid md:grid-cols-2 gap-12">
			<div class="mb-8 md:mb-0">
				<h3 class="text-2xl font-semibold mb-4">Get in Touch</h3>
				<p class="mb-4">
					Feel free to reach out with any questions or inquiries. We're here to help!
				</p>
				<ul class="space-y-2">
					<li><strong>Email:</strong> mellastudio007@gmail.com</li>
					<li><strong>Phone:</strong> +251 901 744 835</li>
					<li><strong>Address:</strong> Bole Olympia, Next to Mintewab building, 1st floor</li>
				</ul>
				<div class="flex space-x-4">
					<a
						href="https://www.tiktok.com/@mella_studio"
						target="_blank"
						class="transition duration-300 ease-in-out transform hover:scale-125"
					>
						<i class="fab fa-tiktok text-primary hover:text-green-500 text-2xl"></i>
					</a>
					<a
						href="https://www.instagram.com/mella_studio"
						target="_blank"
						class="transition duration-300 ease-in-out transform hover:scale-125"
					>
						<i class="fab fa-instagram text-primary hover:text-green-500 text-2xl"></i>
					</a>
					<a
						href="https://pin.it/6EAtyYqgy"
						target="_blank"
						class="transition duration-300 ease-in-out transform hover:scale-125"
					>
						<i class="fab fa-pinterest text-primary hover:text-green-500 text-2xl"></i>
					</a>
				</div>
			</div>
			<div>
				<h3 class="text-2xl font-semibold mb-4">Send a Message</h3>
				<form on:submit|preventDefault={sendEmail}>
					<div class="mb-4">
						<input
							type="text"
							bind:value={formFields.name}
							placeholder="Your Name"
							class="w-full p-2 border border-gray-300 rounded-md"
						/>
					</div>
					<div class="mb-4">
						<input
							type="email"
							bind:value={formFields.email}
							placeholder="Your Email"
							class="w-full p-2 border border-gray-300 rounded-md"
						/>
					</div>
					<div class="mb-4">
						<textarea
							bind:value={formFields.message}
							rows="4"
							placeholder="Your Message"
							class="w-full p-2 border border-gray-300 rounded-md"
						></textarea>
					</div>
					<button
						type="submit"
						class="bg-primary text-white font-semibold px-6 py-3 rounded-lg shadow"
						>Send Message</button
					>
				</form>
			</div>
		</div>
	</div>
</section>
