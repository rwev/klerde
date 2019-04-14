import * as L from 'leaflet';
import { DistanceIcon } from '../items/distance-icons';
let distanceMarkers: L.Marker[] = [];

export function addDistanceMarkers(map: L.Map, waypointLatLngs: L.LatLng[]) {

    distanceMarkers.forEach((marker: L.Marker) => marker.remove());
    distanceMarkers = []; // empty

    for (let i = 0; i < waypointLatLngs.length - 1; i++){
        
        const startCoord: L.LatLng = waypointLatLngs[i];
        const endCoord: L.LatLng = waypointLatLngs[i + 1];

        const midCoord: L.LatLng = new L.LatLng(
            (startCoord.lat + endCoord.lat) / 2,
            (startCoord.lng + endCoord.lng) / 2
        );

        const distanceMarker: L.Marker = 
            new L.Marker(
                midCoord,
                {
                    icon: new DistanceIcon(startCoord, endCoord)
                }
            )
        distanceMarker.addTo(map);
        distanceMarkers.push(distanceMarker);

    }



}