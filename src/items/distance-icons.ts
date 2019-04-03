import * as L from 'leaflet';
import { formatNumber } from '../util/format';

const DistanceIconOptions: L.DivIconOptions = {
	className: 'distance-icon',
	// change with .distance-icon in styles.scss
	// fit width of rotated span inside iconSize rectangle
	iconSize: new L.Point(150, 150),
	iconAnchor: new L.Point(75, 7.5)
};

const FEET_PER_METER = 3.28084;

export class DistanceIcon extends L.DivIcon {
	constructor(startCoord: L.LatLng, endCoord: L.LatLng) {

        // TODO investigate different CRSs / Projections
		const distanceFeet = L.CRS.Earth.distance(startCoord, endCoord) * FEET_PER_METER / 5280; // meters
		const distance = formatNumber(distanceFeet) + ' mi'; // convert to miles / feet here, dep on magnitude

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
		const hasPositiveSlope = (latPos && lngPos) || (!latPos && !lngPos)

		if (hasPositiveSlope) {
			angle = angle - 90;
		} else {
			angle = 90 - angle;
		}
		const rotationStyle = `
                        transform: rotate(${angle}deg);
                        -moz-transform: rotate(${angle}deg);
                        -o-transform: rotate(${angle}deg);
                        -webkit-transform: rotate(${angle}deg);
                     `;

		const bearing: number = 0; // calculate and format

		let content: string;

		content = `<span class="distance">(${distance}, ${bearing}) deg </span>`;
		// wrap to angle
		content = `<div class="distance-rotation" style="${rotationStyle}">` + content + `</div>`;

		super({ ...DistanceIconOptions, html: content });
	}
}
