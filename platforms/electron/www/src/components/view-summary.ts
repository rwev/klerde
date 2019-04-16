import * as L from 'leaflet';
import { formatNumber } from '../util/format';
import { fetchElevation } from '../functions/requests';

export function updateViewSummary() {

    let center: L.LatLng = this.getCenter();
    document.getElementById('latitude-view').innerText = formatNumber(center.lat);
    document.getElementById('longitude-view').innerText = formatNumber(center.lng);

    let bounds: L.LatLngBounds = this.getBounds();
    document.getElementById('northern-bound-view').innerText = formatNumber(bounds.getNorth());
    document.getElementById('southern-bound-view').innerText = formatNumber(bounds.getSouth());
    document.getElementById('eastern-bound-view').innerText = formatNumber(bounds.getEast());
    document.getElementById('western-bound-view').innerText = formatNumber(bounds.getWest());

    let elevationView = document.getElementById('elevation-view');
    elevationView.innerText = '-----';
    fetchElevation(center).then((elevation: number) => {
        elevationView.innerText = formatNumber(elevation);
    })

}