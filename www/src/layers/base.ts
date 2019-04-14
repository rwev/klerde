 import * as L from 'leaflet';

export const DEFAULT_BASE_ZINDEX = 100;
export const DEFAULT_OVERLAY_ZINDEX = 200;
const DEFAULT_BASE_LAYER_OPTIONS: L.TileLayerOptions = { minZoom: 2, maxZoom: 20, zIndex: 100 };

// OpenStreetMap
var osmStandard: L.TileLayer = L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
    {
        ...DEFAULT_BASE_LAYER_OPTIONS,
        //minZoom: 2,
        //maxZoom: 16,
    }
);

var osmHumanitarian: L.TileLayer = L.tileLayer(
    'https://tile-{s}.openstreetmap.fr/hot/{z}/{x}/{y}.png', 
    {
        ...DEFAULT_BASE_LAYER_OPTIONS,
        //minZoom: 3,
        //maxZoom: 19
    }
);

// USGS
var usgsTopo: L.TileLayer = L.tileLayer(
    'https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}', 
    {
        ...DEFAULT_BASE_LAYER_OPTIONS,
        //minZoom: 3,
        //maxZoom: 19
    }
);
var usgsImagery: L.TileLayer = L.tileLayer(
    'https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}', 
    {
        ...DEFAULT_BASE_LAYER_OPTIONS,
        //minZoom:
        //maxZoom:
    }
);
var usgsImageryTopo: L.TileLayer = L.tileLayer(
    'https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryTopo/MapServer/tile/{z}/{y}/{x}', 
    {
        ...DEFAULT_BASE_LAYER_OPTIONS,
        //minZoom:
        //maxZoom:
    }
);


export const ALL_BASE_LAYERS = 
{
    'OSM Standard': osmStandard,
    'OSM Humanitarian': osmHumanitarian,

    'USGS Topo': usgsTopo,
    'USGS Imagery': usgsImagery,
    'USGS Imagery + Topo': usgsImageryTopo,

}

export const DEFAULT_BASE_LAYER = osmStandard // usgsTopo;
