import * as L from 'leaflet';
import { POLYLINE_OPTIONS } from "../options/options";
import { addDistanceMarkers } from './distance';

let routePolyline: L.Polyline = null;
let waypointLatLngs: L.LatLng[] = [];

export function addWaypointToRoute(map: L.Map, waypoint: L.Marker) {
	waypointLatLngs.push(waypoint.getLatLng());
	drawRoute(map);
}
export function removeWaypointFromRoute(map: L.Map, waypoint: L.Marker) {
	let waypointLatLngIndex: number = waypointLatLngs.findIndex((latlng: L.LatLng) =>
		latlng.equals(waypoint.getLatLng())
	);
	if (waypointLatLngIndex) {
		waypointLatLngs.splice(waypointLatLngIndex, 1);
		drawRoute(map);
	}
}
function drawRoute(map: L.Map) {
	if (routePolyline) {
		routePolyline.remove();
	}
	if (waypointLatLngs.length > 1) {
		routePolyline = L.polyline(waypointLatLngs, POLYLINE_OPTIONS).addTo(map);
		addDistanceMarkers(map, waypointLatLngs);

	}
}




