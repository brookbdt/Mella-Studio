<script lang="ts">
	// import '../app.css';
	import type { LatLngExpression } from 'leaflet';
	import Leaflet from '$lib/components/Leaflet.svelte';
	import Marker from '$lib/components/Marker.svelte';
	import Popup from '$lib/components/Popup.svelte';

	const initialView: LatLngExpression = [51.514244, 7.468429]; // Dortmund, Germany
	const markerLocations: Array<LatLngExpression> = [
		[51.513870009926, 7.473969975241] // ShipBit Office
	];
</script>

<iframe
	src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1970.312758622803!2d38.768729306746984!3d9.00656297244002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b857f44883633%3A0x4dee36e19d00b4a2!2sMella%20Studio!5e0!3m2!1sen!2set!4v1708455020542!5m2!1sen!2set"
	style="border:0;"
	title="map"
	class="w-full h-96"
	loading="lazy"
	referrerpolicy="no-referrer-when-downgrade"
></iframe>

<!-- <div class="w-full h-72">
	<Leaflet view={initialView} zoom={14}>
		{#each markerLocations as latLng}
			<Marker {latLng} width={40} height={40}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					xml:space="preserve"
					style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2"
					viewBox="0 0 45 40"
				>
					<path
						d="m23.046 25.449 9.601 16.885H13.253l9.793-16.885ZM45 23.965H25.702l9.575 16.84L45 23.965ZM44.963 20.923 35.339 4.254l-9.668 16.669h19.292ZM32.771 2.618h-4.17L8.522 37.237l2.08 3.603L32.771 2.618ZM25.084 2.618H11.465L0 22.476l6.768 11.722 18.316-31.58Z"
						style="fill:#e9204f;fill-rule:nonzero"
						transform="translate(0 -2.618)"
					/>
				</svg>

				<Popup
					>Like & Subscribe! This is a very loooooooooooong title and it has many characters.</Popup
				>
			</Marker>
		{/each}
	</Leaflet>
</div> -->

<style>
	.map-container {
		width: 100%;
		height: 100vh; /* Responsive height */
	}

	:global(.mapboxgl-map) {
		width: 100%; /* Ensures map is responsive */
		height: 100%; /* Adjusts based on the container's height for responsiveness */
	}
</style>
