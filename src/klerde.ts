import * as L from 'leaflet';
import { MAP_OPTIONS, LAYERS_OPTIONS, SCALE_OPTIONS } from './options/options';
import { OVERLAY_LAYERS } from './layers/overlay';
import { DEFAULT_BASE_LAYER, ALL_BASE_LAYERS } from './layers/base';
import { addWaypointMarker } from './functions/handlers';
import { generateTimeLayers, ANIMATED_LAYER_OPACITY, TimeLayer } from './layers/animated';
import { addWaypointToRoute } from './functions/route';
import { WaypointIcon } from './items/waypoint-icons';
import { updateViewSummary } from './components/view-summary';
import { makeResponsive } from './util/responsive';

var map: L.Map = L.map('map', MAP_OPTIONS);
document.onreadystatechange = () => map.invalidateSize();

L.control
	.layers(
		ALL_BASE_LAYERS, // {}
		OVERLAY_LAYERS, // {} // generateTimeLayers(),
		LAYERS_OPTIONS
	)
	.addTo(map);
DEFAULT_BASE_LAYER.addTo(map);

L.control.scale(SCALE_OPTIONS).addTo(map);

map.setView(new L.LatLng(40, -98), 5); // Whole US
// map.setView(new L.LatLng(43.616667, -116.2), 11); // Boise, ID
// navigator.geolocation.getCurrentPosition((position: Position) => {
// 	map.setView(new L.LatLng(position.coords.latitude, position.coords.longitude), map.getZoom());
// });

makeResponsive();

/// VIEW SUMMARY

map.on('dblclick', (e: L.LeafletMouseEvent) => addWaypointMarker(map, e.latlng), map);
map.on('resize', updateViewSummary, map);
map.on('zoomend',updateViewSummary, map);
map.on('dragend', updateViewSummary, map);

/// ZOOM

let zoomInButton: HTMLButtonElement = document.getElementById('zoom-in-button') as HTMLButtonElement;
let zoomOutButton: HTMLButtonElement = document.getElementById('zoom-out-button') as HTMLButtonElement;
let zoomLevel: HTMLDivElement = document.getElementById('zoom-level-text') as HTMLDivElement;
zoomInButton.onclick = () => map.zoomIn();
zoomOutButton.onclick = () => map.zoomOut();

let zoomSlider: HTMLInputElement = document.getElementById('zoom-slider') as HTMLInputElement;
zoomSlider.onmouseup = () => {
	map.setZoom(+zoomSlider.value);
	zoomLevel.innerText = `${zoomSlider.value}`;
}


map.on('zoomend',updateZoom, map);
map.on('zoomlevelchange', updateZoomLevels, map);
function updateZoom() {
	zoomLevel.innerText = `${map.getZoom()}`;
	zoomSlider.value = `${map.getZoom()}`;
}
function updateZoomLevels() {
	zoomSlider.min = `${map.getMinZoom()}`;
	zoomSlider.max = `${map.getMaxZoom()}`;
}

updateZoom();
updateZoomLevels();

/// DROP COORDS 

let dropCoordsButton: HTMLButtonElement = document.getElementById('drop-coords-button') as HTMLButtonElement;
dropCoordsButton.onclick = () => addWaypointMarker(map, map.getCenter()); 

// CENTER LOCATION

let goToLocationButton: HTMLButtonElement = document.getElementById('go-to-location-button') as HTMLButtonElement;
goToLocationButton.onclick = () => navigator.geolocation.getCurrentPosition((position: Position) => {
	map.setView(new L.LatLng(position.coords.latitude, position.coords.longitude), map.getZoom());
});; 


/// GOTO COORDS


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


/// ANIMATION

let animateInput: HTMLInputElement = document.getElementById('nexrad-animation-toggle') as HTMLInputElement;
animateInput.onclick = toggleWeatherAnimation;

let animationTimestamp: HTMLDivElement = document.getElementById('nexrad-animation-timestamp') as HTMLDivElement;
let animationPlayPauseButton: HTMLButtonElement = document.getElementById(
	'nexrad-animation-play-pause-button'
) as HTMLButtonElement;
let animationPlayPauseButtonText: HTMLDivElement = document.getElementById(
	'nexrad-animation-play-pause-button-text'
) as HTMLDivElement;


const PLAY_HTML = "<i class='material-icons'>play_arrow</i>";
const PAUSE_HTML = "<i class='material-icons'>pause</i>";

let animationSlider: HTMLInputElement = document.getElementById('nexrad-animation-time-slider') as HTMLInputElement;

function toggleWeatherAnimation() {
	if (!animateInput.checked) {
		return;
	}
	for (let layerName in OVERLAY_LAYERS) {
		const layer = OVERLAY_LAYERS[layerName];
		layer.removeFrom(map);
	}

	animationPlayPauseButton.style.display = 'block';
	animationTimestamp.style.display = 'block';
	animationSlider.style.display = 'block';

	let timeLayers: TimeLayer[] = generateTimeLayers();

	timeLayers.forEach((timeLayer: TimeLayer) => timeLayer.tileLayer.addTo(map));
	const timeLayerCount = timeLayers.length;
	let timeLayerIndex = 0;

	animationSlider.min = '0';
	animationSlider.max = `${timeLayerCount - 1}`;

	let isPaused = false;
	animationPlayPauseButtonText.innerHTML = PAUSE_HTML;

	animationSlider.onmouseup = () => {
		timeLayers.forEach((timeLayer: TimeLayer) => timeLayer.tileLayer.setOpacity(0));
		timeLayers[+animationSlider.value].tileLayer.setOpacity(ANIMATED_LAYER_OPACITY);
		animationTimestamp.innerText = timeLayers[+animationSlider.value].timestamp;
		animationPlayPauseButtonText.innerHTML = PLAY_HTML;
		isPaused = true;
	};

	animationPlayPauseButton.onclick = () => {
		if (isPaused) {
			animationPlayPauseButtonText.innerHTML = PAUSE_HTML;
			timeLayerTransitionTimer();
			isPaused = false;
		} else {
			animationPlayPauseButtonText.innerHTML = PLAY_HTML;
			isPaused = true;
		}
	};

	function timeLayerTransitionTimer() {
		setTimeout(() => {
			if (isPaused) {
				return;
			}

			timeLayers[timeLayerIndex].tileLayer.setOpacity(0);

			timeLayerIndex++;
			if (timeLayerIndex > timeLayerCount - 1) {
				timeLayerIndex = 0;
			}

			if (animateInput.checked) {
				timeLayers[timeLayerIndex].tileLayer.setOpacity(ANIMATED_LAYER_OPACITY);
				animationTimestamp.innerText = timeLayers[timeLayerIndex].timestamp;
				animationSlider.value = `${timeLayerIndex}`;
				timeLayerTransitionTimer();
			} else {
				animationTimestamp.innerText = '';
				animationPlayPauseButton.style.display = 'none';
				animationTimestamp.style.display = 'none';
				animationSlider.style.display = 'none';
			}
		}, 333);
	}
	timeLayerTransitionTimer();
}

// FOR DEVELOPMENT
// const testPoints: L.LatLngExpression[] = [
// 	[ 43.616667, -116.2 ],
// 	[ 43.749, -115.965],
// 	[ 43.906, -116.136],
// 	[ 43.681, -116.625 ],
// 	[43.551, -116.4322],
// ];
// testPoints.forEach((p: any) => {
// 	const marker: L.Marker = 		new L.Marker(p, {
// 		icon: new WaypointIcon(new L.LatLng(p[0], p[1]), 0, true)
// 	})
// 	marker.addTo(map)
// 	addWaypointToRoute(
// 		map,
// 		marker
// 	);
// });


