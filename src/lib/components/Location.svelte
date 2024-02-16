<!-- <script type="ts">
	import { LeafletMap, LeafletMarker, LeafletPopup, LeafletTileLayer } from 'svelte-leaflet';
	// import 'leaflet/dist/leaflet.css'


	const initialView: LatLngExpression = [51.514244, 7.468429]; // Dortmund, Germany
	const markerLocations: Array<LatLngExpression> = [
		[51.513870009926, 7.473969975241] // ShipBit Office
	];
	let markerVisible = true;
	let markerName = 'Null Island';
	let markerLatLng = LeafletMap.latLng([40.7128, 74.006]);

	// Set the initial position and zoom level of the map

	let zoom = 13;
</script>

<div class="map-container">
	<LeafletMap style="height:90vh; width: 80vw; position:absolute; left:20vw;">
		<LeafletTileLayer
			url={'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'}
			options={{f
				attribution:
					'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
			}}
		/>
		{#if markerVisible}
			<LeafletMarker bind:latLng={markerLatLng} options={{ draggable: true }}>
				<LeafletPopup options={{ closeButton: false, closeOnClick: false }}>
					{markerName}
				</LeafletPopup>
			</LeafletMarker>
		{/if}
	</LeafletMap>
</div>

<style>
	/* Ensure the map container has a defined height, or adjust as needed */
	.map-container {
		height: 400px;
	}
</style> -->
