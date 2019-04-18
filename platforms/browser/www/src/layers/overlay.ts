import * as L from 'leaflet';
import 'leaflet.nontiledlayer';
import { DEFAULT_OVERLAY_ZINDEX } from './base';

export const DEFAULT_OVERLAYER_LAYER_OPTIONS = {
	format: 'image/png',
	transparent: true,
	opacity: 0.575,
	zIndex: DEFAULT_OVERLAY_ZINDEX
}

export const NOAA: L.NonTiledLayer = L.nonTiledLayer.wms(
	'https://idpgis.ncep.noaa.gov/arcgis/services/NWS_Observations/radar_base_reflectivity/MapServer/WmsServer',
	{
		layers: '1',
		...DEFAULT_OVERLAYER_LAYER_OPTIONS
	}
);

export const NEXRAD_URL = 'https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0q.cgi';
export const NEXRAD_LAYER = 'nexrad-n0q-900913'; 
export const Nexrad: L.TileLayer = L.tileLayer.wms(NEXRAD_URL, {
	layers: NEXRAD_LAYER,
	...DEFAULT_OVERLAYER_LAYER_OPTIONS
});

export const OVERLAY_LAYERS: {[layerName: string]: L.TileLayer | L.NonTiledLayer} = {
	Nexrad,
	NOAA
	// 'Clouds': clouds,
	// 'Precipitation': precipitation,
	// 'Rain': rain,
	// 'Snow': snow,
	// 'Pressure': pressure,
	// 'Temperature': temperature,
	// 'Wind': wind,
};
