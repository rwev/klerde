import * as L from 'leaflet';
import { POLYLINE_OPTIONS } from "../options/options";

export function addWaypointToRoute(waypoint: L.Marker) {
	this.waypointLatLngs.push(waypoint.getLatLng());
	this.drawRoute();
}
export function removeWaypointFromRoute(waypoint: L.Marker) {
	let waypointLatLngIndex: number = this.waypointLatLngs.findIndex((latlng: L.LatLng) =>
		latlng.equals(waypoint.getLatLng())
	);
	if (waypointLatLngIndex) {
		this.waypointLatLngs.splice(waypointLatLngIndex, 1);
		this.drawRoute();
	}
}
export function drawRoute() {
	if (this.routePolyline) {
		this.routePolyline.remove();
	}
	if (this.waypointLatLngs.length > 1) {
		this.routePolyline = L.polyline(this.waypointLatLngs, POLYLINE_OPTIONS).addTo(this.map);
	}
}
