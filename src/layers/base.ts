 import * as L from 'leaflet';

const DEFAULT_BASE_LAYER_OPTIONS: L.TileLayerOptions = { minZoom: 2, maxZoom: 20 };

// OpenStreetMap
var osmStandard: L.TileLayer = L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
    DEFAULT_BASE_LAYER_OPTIONS
);

var osmHumanitarian: L.TileLayer = L.tileLayer(
    'https://tile-{s}.openstreetmap.fr/hot/{z}/{x}/{y}.png', 
    DEFAULT_BASE_LAYER_OPTIONS
);

// USGS
var usgsTopo: L.TileLayer = L.tileLayer(
    'http://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}', 
    DEFAULT_BASE_LAYER_OPTIONS
);
var usgsImagery: L.TileLayer = L.tileLayer(
    'http://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}', 
    DEFAULT_BASE_LAYER_OPTIONS
);
var usgsImageryTopo: L.TileLayer = L.tileLayer(
    'http://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryTopo/MapServer/tile/{z}/{y}/{x}', 
    DEFAULT_BASE_LAYER_OPTIONS
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
