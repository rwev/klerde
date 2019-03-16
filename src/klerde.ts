import * as L from 'leaflet';
import { MAP_OPTIONS, LAYERS_OPTIONS, SCALE_OPTIONS, ZOOM_OPTIONS } from './options/options';
import { OVERLAY_LAYERS } from './layers/overlay';
import { DEFAULT_BASE_LAYER, ALL_BASE_LAYERS } from './layers/base';
import { onMapDoubleClick, onMapChange } from './functions/handlers';
import { generateTimeLayers, ANIMATED_LAYER_OPACITY, TimeLayer } from './layers/animated';

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

let animateInput: HTMLInputElement = document.getElementById('nexrad-animation-toggle') as HTMLInputElement;
animateInput.onclick = toggleWeatherAnimation;

let animationTimestamp: HTMLDivElement = document.getElementById('nexrad-animation-timestamp') as HTMLDivElement;
let animationPlayPauseButton: HTMLButtonElement = document.getElementById(
	'nexrad-animation-play-pause-button'
) as HTMLButtonElement;
let animationPlayPauseButtonText: HTMLDivElement = document.getElementById(
	'nexrad-animation-play-pause-button-text'
) as HTMLDivElement;


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
	
	animationSlider.onmouseup = () => {
		timeLayers.forEach((timeLayer: TimeLayer) => timeLayer.tileLayer.setOpacity(0));
		timeLayers[+animationSlider.value].tileLayer.setOpacity(ANIMATED_LAYER_OPACITY);
		animationPlayPauseButtonText.innerText = '^';
		isPaused = true;
	};

	animationPlayPauseButton.onclick = () => {
		if (isPaused) {
			animationPlayPauseButtonText.innerText = '='
			timeLayerTransitionTimer();
			isPaused = false
		} else {
			animationPlayPauseButtonText.innerText = '^';
			isPaused = true;
		}
	}

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
