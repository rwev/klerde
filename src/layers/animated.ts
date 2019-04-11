import * as L from 'leaflet';
import { NEXRAD_URL, NEXRAD_LAYER, DEFAULT_OVERLAYER_LAYER_OPTIONS as DEFAULT_OVERLAY_LAYER_OPTIONS } from './overlay';

export const ANIMATED_LAYER_OPACITY = 0.575;
export interface TimeLayer { timestamp: string; tileLayer: L.TileLayer };

export function generateTimeLayers(): Array<TimeLayer>
// { [layer: string]: L.TileLayer }
// L.TileLayer[]
{
	let timeLayers : Array<TimeLayer> = [];
	// let timeLayers: L.TileLayer[] = [];
	// let timeLayers: { [layer: string]: L.TileLayer } = {};

	const TOTAL_INTERVALS = 10;
	const INTERVAL_LENGTH_HRS = 5;

	const currentTime = new Date();
	// const currentTimeString: string = new Date().toLocaleTimeString(); // 11:49:48 PM
	

	for (let i = 0; i <= TOTAL_INTERVALS; i++) {
        const timeDiffMins = TOTAL_INTERVALS * INTERVAL_LENGTH_HRS - INTERVAL_LENGTH_HRS * i;
        if (timeDiffMins === 5) { continue; } // broken IDKY
		const layerRequest = NEXRAD_LAYER + (!!timeDiffMins ? '-m' + timeDiffMins + 'm' : '');
		const layer: L.TileLayer = L.tileLayer.wms(NEXRAD_URL, {
			layers: layerRequest,
			...DEFAULT_OVERLAY_LAYER_OPTIONS
		});

		const timeString = new Date(currentTime.valueOf() - timeDiffMins * 60 * 1000).toLocaleTimeString();
		timeLayers.push({ timestamp: `${timeString} (-${timeDiffMins} min)`, tileLayer: layer });
		// timeLayers.push(layer);
		// timeLayers[layerRequest] = layer;
	}
	return timeLayers;
}
