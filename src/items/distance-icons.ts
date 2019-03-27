import * as L from 'leaflet';
import { formatNumber } from '../util/format';

const DistanceIconOptions: L.DivIconOptions = {
	className: 'distance-icon',
	iconSize: new L.Point(45, 45), // change with .distance in styles.scss
	iconAnchor: new L.Point(45, 45)
};

const FEET_PER_METER = 3.28084;

export class DistanceIcon extends L.DivIcon {
	constructor(startCoord: L.LatLng, endCoord: L.LatLng) {

        // TODO investigate different CRSs / Projections
		const distanceFeet = L.CRS.Earth.distance(startCoord, endCoord) * FEET_PER_METER; // meters
		const distance = formatNumber(distanceFeet) + ' m'; // convert to miles / feet here, dep on magnitude

		// TODO symbol for direction of travel

		// TODO calculate display angle
		const latDiff = endCoord.lat - startCoord.lat;
        const lngDiff = endCoord.lng - startCoord.lng;
        
        const latDiffPoint = new L.LatLng(startCoord.lat + latDiff, startCoord.lng);
        const lngDiffPoint = new L.LatLng(startCoord.lat, startCoord.lng + lngDiff);

        const latDistDiff = L.CRS.Earth.distance(startCoord, latDiffPoint);
        const lngDistDiff = L.CRS.Earth.distance(startCoord, lngDiffPoint);

		const latPos = latDiff > 0;
		const lngPos = lngDiff > 0;

		let angle = Math.atan(Math.abs(lngDistDiff) / Math.abs(latDistDiff)) * 180 / Math.PI;
		if (latPos && lngPos) angle -= 90 ;
        else if (!latPos && !lngPos) angle -= 90;
		else if (latPos && !lngPos) angle = 90 - angle;
		else if (!latPos && lngPos) angle = 90 - angle;

		const style = `
                        transform: rotate(${angle}deg);
                        -moz-transform: rotate(${angle}deg);
                        -o-transform: rotate(${angle}deg);
                        -webkit-transform: rotate(${angle}deg);
                     `;

		const bearing: number = 0; // calculate and format

		let content: string;

		// numeric
		content = `<span class="distance length">(${distance})</span>`;
		content += `<span class="distance bearing">(${bearing})</span>`;

		// wrap to angle
		content = `<div style="${style}">` + content + `</div>`;

		super({ ...DistanceIconOptions, html: content });
	}
}
