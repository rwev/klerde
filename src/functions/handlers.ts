import * as L from 'leaflet';
import { WaypointIcon } from '../items/icons';

export function onMapDoubleClick(e: L.LeafletMouseEvent) {
	let waypoint: L.Marker = L.marker([ e.latlng.lat, e.latlng.lng ], { icon: new WaypointIcon(e.latlng) }).addTo(this);
}

export function onMapChange(e: L.LeafletEvent) {
	let center: L.LatLng = this.getCenter();
	let bounds: L.LatLngBounds = this.getBounds();
}
