import * as L from 'leaflet';

export const MAP_OPTIONS: L.MapOptions = {
  zoomControl: true, // added dynamically
  doubleClickZoom: false,
  attributionControl: false,
  dragging: true,
  zoom: 12,
  center: L.latLng(43.606856, -116.214465) // Boise, ID, USA
};

export const ZOOM_OPTIONS: L.Control.ZoomOptions = {
  zoomInText: '[+]',
  zoomOutText: '[-]',
  position: 'bottomright',
}

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