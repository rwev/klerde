import * as L from 'leaflet';

export const MAP_OPTIONS: L.MapOptions = {
  zoomControl: false,
  doubleClickZoom: false,
  attributionControl: false,
  dragging: true,
  zoom: 12,
  center: L.latLng(43.606856, -116.214465) // Boise, ID, USA
};

export const SCALE_OPTIONS: L.Control.ScaleOptions = {
  position: 'bottomleft',
  imperial: true,
  metric: false,
}

export const LAYERS_OPTIONS: L.Control.LayersOptions = {
    position: 'topleft',
    hideSingleBase: true,
    collapsed: false
}

export const POLYLINE_OPTIONS: L.PolylineOptions = {
  // Polyline options
  smoothFactor: 1.0,
  noClip: false,
  color: '#000000', // black
  weight: 2, // pixels

  // TODO
  dashArray: '5',

  renderer: L.svg(),
  // TODO
  className: '',

  interactive: false,
  pane: 'tilePane'

}