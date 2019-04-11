import * as L from 'leaflet';
import 'leaflet.nontiledlayer';
import { DEFAULT_OVERLAY_ZINDEX } from './base';

// import 'leaflet-openweathermap';

// const DEFAULT_OWM_OPTIONS = {
//     opacity: 0.5,
//     appId: '' // OWM_API_KEY
// };

// OpenWeatherMap
// const clouds: L.OWM.Clouds = L.OWM.clouds(DEFAULT_OWM_OPTIONS);
// const cloudsClassic: L.OWM.CloudsClassic = L.OWM.cloudsClassic(DEFAULT_OWM_OPTIONS);
// const precipitation: L.OWM.Precipitation = L.OWM.precipitation(DEFAULT_OWM_OPTIONS);
// const precipitationClassic: L.OWM.PrecipitationClassic = L.OWM.precipitationClassic(DEFAULT_OWM_OPTIONS);
// const rain: L.OWM.Rain = L.OWM.rain(DEFAULT_OWM_OPTIONS);
// const rainClassic: L.OWM.RainClassic = L.OWM.rainClassic(DEFAULT_OWM_OPTIONS);
// const snow: L.OWM.Snow = L.OWM.snow(DEFAULT_OWM_OPTIONS);
// const pressure: L.OWM.Pressure = L.OWM.pressure(DEFAULT_OWM_OPTIONS);
// const pressureContour: L.OWM.PressureContour = L.OWM.pressureContour(DEFAULT_OWM_OPTIONS);
// const temperature: L.OWM.Temperature = L.OWM.temperature(DEFAULT_OWM_OPTIONS);
// const wind: L.OWM.Wind = L.OWM.wind(DEFAULT_OWM_OPTIONS);

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
