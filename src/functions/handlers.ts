import * as L from 'leaflet';
import { WaypointIcon, WaypointConfirmIcon, WaypointDeleteIcon } from '../items/waypoint-icons';
import { fetchElevation } from './requests';
import { addWaypointToRoute, removeWaypointFromRoute } from './route';
import { updateViewSummary } from '../components/view-summary';

export function addWaypointMarker(map: L.Map, latlng: L.LatLng) {
	let waypoint: L.Marker = L.marker([ latlng.lat, latlng.lng ], { icon: new WaypointIcon(latlng) }).addTo(map);


	// FOR DEVELOPMENT
	// add unconfirmed waypoints to route.
	// avoids dependecies on elevation data to confirm points.
	// addWaypointToRoute(map, waypoint);

	fetchElevation(latlng).then((elevation: number) => {
		waypoint.remove();
		waypoint = L.marker([ latlng.lat, latlng.lng ], { icon: new WaypointIcon(latlng, elevation) }).addTo(
			map
		);

		let waypointConfirm: L.Marker;
		let waypointDelete: L.Marker;
		waypointConfirm = L.marker([ latlng.lat, latlng.lng ], { icon: new WaypointConfirmIcon() })
			.addTo(map)
			.on('click', () => {
				waypointConfirm.remove();
				waypoint.remove();
				waypoint = L.marker([ latlng.lat, latlng.lng ], {
					icon: new WaypointIcon(latlng, elevation, true)
				}).addTo(map);
				addWaypointToRoute(map, waypoint);
			});

		waypointDelete = L.marker([ latlng.lat, latlng.lng ], { icon: new WaypointDeleteIcon() })
			.addTo(map)
			.on('click', () => {
				waypoint.remove();
				waypointConfirm.remove();
				waypointDelete.remove();
				removeWaypointFromRoute(map, waypoint);
			});
	});
}

