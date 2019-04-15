 import * as L from 'leaflet';

export const DEFAULT_BASE_ZINDEX = 100;
export const DEFAULT_OVERLAY_ZINDEX = 200;
const DEFAULT_BASE_LAYER_OPTIONS: L.TileLayerCordovaOptions = { folder: 'klerde', minZoom: 2, maxZoom: 20, zIndex: 100 };

const successCallback = (arg: any) => console.log(arg); 

// OpenStreetMap
var osmStandard: L.TileLayer = L.tileLayerCordova(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
    {
        ...DEFAULT_BASE_LAYER_OPTIONS,
        name: 'osm-standard'
        //minZoom: 2,
        //maxZoom: 16,
    }, 
    successCallback
);

var osmHumanitarian: L.TileLayer = L.tileLayerCordova(
    'https://tile-{s}.openstreetmap.fr/hot/{z}/{x}/{y}.png', 
    {
        ...DEFAULT_BASE_LAYER_OPTIONS,
        name: 'osm-humanitarian',
        //minZoom: 3,
        //maxZoom: 19
    },
    successCallback
);

// USGS
var usgsTopo: L.TileLayer = L.tileLayerCordova(
    'https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}', 
    {
        ...DEFAULT_BASE_LAYER_OPTIONS,
        name: 'usgs-topo',
        //minZoom: 3,
        //maxZoom: 19
    },
    successCallback
);
var usgsImagery: L.TileLayer = L.tileLayerCordova(
    'https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}', 
    {
        ...DEFAULT_BASE_LAYER_OPTIONS,
        name: 'usgs-imagery'
        //minZoom:
        //maxZoom:
    },
    successCallback
);
var usgsImageryTopo: L.TileLayer = L.tileLayerCordova(
    'https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryTopo/MapServer/tile/{z}/{y}/{x}', 
    {
        ...DEFAULT_BASE_LAYER_OPTIONS,
        name: 'usgs-imagery-topo',
        //minZoom:
        //maxZoom:
    },
    successCallback
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
