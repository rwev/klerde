// Type definitions for leaflet.nontiledlayer
// By rwev <https://github.com/rwev>

import * as L from 'leaflet';

declare module 'leaflet' {

    interface NonTiledLayerOptions {
        attribution?: string,
        opacity?: number,
        zIndex?: undefined,
        minZoom?: number,
        maxZoom: number,
        pointerEvents?: null,
        errorImageUrl?: string
        bounds?: L.LatLngBounds,
        useCanvas?: undefined
    }
    
    interface NonTiledLayer extends L.Layer {}
    function nonTiledLayer(url: string, options: NonTiledLayerOptions): NonTiledLayer;

    namespace NonTiledLayer {
        interface WMS extends NonTiledLayer { }
    }
    namespace nonTiledLayer {
        function wms(url: string, options: L.WMSOptions): NonTiledLayer.WMS;
    }
}