import * as L from 'leaflet';
import { WaypointIcon, WaypointConfirmIcon, WaypointDeleteIcon } from '../items/waypoint-icons';
import { fetchElevation } from './requests';
import { addWaypointToRoute, removeWaypointFromRoute } from './route';
import { updateViewSummary } from '../components/view-summary';

export function onMapDoubleClick(e: L.LeafletMouseEvent) {
	let waypoint: L.Marker = L.marker([ e.latlng.lat, e.latlng.lng ], { icon: new WaypointIcon(e.latlng) }).addTo(this);

	fetchElevation(e.latlng).then((elevation: number) => {
		waypoint.remove();
		waypoint = L.marker([ e.latlng.lat, e.latlng.lng ], { icon: new WaypointIcon(e.latlng, elevation) }).addTo(
			this
		);

		let waypointConfirm: L.Marker;
		let waypointDelete: L.Marker;
		waypointConfirm = L.marker([ e.latlng.lat, e.latlng.lng ], { icon: new WaypointConfirmIcon() })
			.addTo(this)
			.on('click', () => {
				waypointConfirm.remove();
				waypoint.remove();
				waypoint = L.marker([ e.latlng.lat, e.latlng.lng ], {
					icon: new WaypointIcon(e.latlng, elevation, true)
				}).addTo(this);
				addWaypointToRoute(this, waypoint);
			});

		waypointDelete = L.marker([ e.latlng.lat, e.latlng.lng ], { icon: new WaypointDeleteIcon() })
			.addTo(this)
			.on('click', () => {
				waypoint.remove();
				waypointConfirm.remove();
				waypointDelete.remove();
				removeWaypointFromRoute(this, waypoint);
			});
	});
}

export function onMapChange(e: L.LeafletEvent) {
	updateViewSummary(this);
}

