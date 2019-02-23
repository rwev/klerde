import * as L from 'leaflet';
import { MAP_OPTIONS, LAYERS_OPTIONS, SCALE_OPTIONS, ZOOM_OPTIONS } from './options/options';
import { OVERLAY_LAYERS } from './layers/overlay';
import { DEFAULT_BASE_LAYER } from './layers/base';
import { onMapDoubleClick, onMapChange } from './handlers/handlers';

var map: L.Map = L.map('map', MAP_OPTIONS).setView([ 51.505, -0.09 ], 13);

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

navigator.geolocation.getCurrentPosition((position: Position) => {
	map.setView(new L.LatLng(position.coords.latitude, position.coords.longitude), 12);
});

map.on('dblclick', onMapDoubleClick, map);
map.on('resize', onMapChange, map);
map.on('zoomanim', onMapChange, map);
map.on('dragend', onMapChange, map);