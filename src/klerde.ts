import * as L from 'leaflet';
import { MAP_OPTIONS, LAYERS_OPTIONS, SCALE_OPTIONS, ZOOM_OPTIONS } from './options/options';
import { OVERLAY_LAYERS } from './layers/overlay';
import { DEFAULT_BASE_LAYER } from './layers/base';
import { onMapDoubleClick, onMapChange } from './functions/handlers';

var map: L.Map = L.map('map', MAP_OPTIONS);
document.onreadystatechange = () => map.invalidateSize();

L.control
	.layers(
		{}, // ALL_BASE_LAYERS,
		OVERLAY_LAYERS,
		LAYERS_OPTIONS
	)
	.addTo(map);
DEFAULT_BASE_LAYER.addTo(map);

L.control.scale(SCALE_OPTIONS).addTo(map);
map.zoomControl.remove(); // remove the default
L.control.zoom(ZOOM_OPTIONS).addTo(map); 


// map.setView(new L.LatLng(43.616667, -116.2), 11); // Boise, ID
map.setView(new L.LatLng(40, -98), 5); // Whole US 
// navigator.geolocation.getCurrentPosition((position: Position) => {
// 	map.setView(new L.LatLng(position.coords.latitude, position.coords.longitude), map.getZoom());
// });

map.on('dblclick', onMapDoubleClick, map);
map.on('resize', onMapChange, map);
map.on('zoomanim', onMapChange, map);
map.on('dragend', onMapChange, map);


let latInput: HTMLInputElement = document.getElementById('latitude-input') as HTMLInputElement;
let lngInput: HTMLInputElement = document.getElementById('longitude-input') as HTMLInputElement;
let goButton: HTMLButtonElement = document.getElementById('go-button') as HTMLButtonElement;

latInput.oninput = processCoordinateEntry;
lngInput.oninput = processCoordinateEntry;
goButton.onclick = goToCoords;

function processCoordinateEntry() {
	goButton.disabled = true;
	const latValid: boolean = latInput.value && +latInput.value > -90 && +latInput.value < 90;
	const lngValid: boolean = lngInput.value && +lngInput.value > -180 && +lngInput.value < 180;
	if (latValid && lngValid) {
		goButton.disabled = false;
	}
}

function goToCoords() {
	map.setView(new L.LatLng(+latInput.value, +lngInput.value), map.getZoom());
}
