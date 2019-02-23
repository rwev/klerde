import * as L from 'leaflet';
import { WaypointIcon, WaypointConfirmIcon, WaypointDeleteIcon } from '../items/icons';
import { fetchElevation } from './requests';

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
				this.addWaypointToRoute(waypoint);
				this.drawRoute();
			});

		waypointDelete = L.marker([ e.latlng.lat, e.latlng.lng ], { icon: new WaypointDeleteIcon() })
			.addTo(this)
			.on('click', () => {
				waypoint.remove();
				waypointConfirm.remove();
				waypointDelete.remove();
				this.removeWaypointFromRoute(waypoint);
			});
	});
}

export function onMapChange(e: L.LeafletEvent) {
	let center: L.LatLng = this.getCenter();
	let bounds: L.LatLngBounds = this.getBounds();
}
