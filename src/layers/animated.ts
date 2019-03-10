import * as L from 'leaflet';
import { NEXRAD_URL, NEXRAD_LAYER } from './overlay';

export const ANIMATED_LAYER_OPACITY = 0.575;

export function generateTimeLayers(): L.TileLayer[]
// { [layer: string]: L.TileLayer }
{
	let timeLayers: L.TileLayer[] = [];
	// let timeLayers: { [layer: string]: L.TileLayer } = {};

	const TOTAL_INTERVALS = 10;
	const INTERVAL_LENGTH_HRS = 5;

	for (let i = 0; i <= TOTAL_INTERVALS; i++) {
        const timeDiffMins = TOTAL_INTERVALS * INTERVAL_LENGTH_HRS - INTERVAL_LENGTH_HRS * i;
        if (timeDiffMins === 5) { continue; } // broken IDKY
		const layerRequest = NEXRAD_LAYER + (!!timeDiffMins ? '-m' + timeDiffMins + 'm' : '');
		const layer: L.TileLayer = L.tileLayer.wms(NEXRAD_URL, {
			layers: layerRequest,
			format: 'image/png',
			transparent: true,
			opacity:  0
		});
		timeLayers.push(layer);
		// timeLayers[layerRequest] = layer;
	}
	return timeLayers;
}
