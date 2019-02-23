import * as L from 'leaflet';

function formatNumber(x: number): string {
	return x.toLocaleString('en-US', {
		minimumFractionDigits: 3,
		maximumFractionDigits: 3
	});
}

const WaypointIconOptions: L.DivIconOptions = {
	className: 'waypoint-icon',
	iconSize: new L.Point(130, 45), // change with .waypoint in styles.css
	iconAnchor: new L.Point(130 / 2, 45)
};
export class WaypointIcon extends L.DivIcon {
	constructor(coordinates: L.LatLng, elevation?: number, confirm: boolean = false) {
		let content;
		const lat = formatNumber(coordinates.lat);
		const lng = formatNumber(coordinates.lng);
		const elev = !!elevation ? '' + elevation : '-----';

		content = `<span class="waypoint coords">(${lat}, ${lng})</span>`;
		content += `<span class="waypoint elev">@ ${elev} ft </span>`;
		content += `<span class="waypoint tri">&#9660;</span>`;

		if (!confirm) {
			content = '<div class="waypoint-unconfirmed">' + content + '</div>';
		}

		super({ ...WaypointIconOptions, html: content });
	}
}

const WaypointConfirmIconOptions: L.DivIconOptions = {
	className: 'waypoint-icon',
	iconSize: new L.Point(15, 15), // change with .waypoint in styles.css
	iconAnchor: new L.Point(-130 / 2, 45)
};
export class WaypointConfirmIcon extends L.DivIcon {
	constructor() {
		let content = `<span class="action">&check;</span>`;
		super({ ...WaypointConfirmIconOptions, html: content });
	}
}

const WaypointDeleteIconOptions: L.DivIconOptions = {
	className: 'waypoint-icon',
	iconSize: new L.Point(15, 15), // change with .waypoint in styles.css
	iconAnchor: new L.Point(-130 / 2, 30)
};
export class WaypointDeleteIcon extends L.DivIcon {
	constructor() {
		let content = `<span class="action">&cross;</span>`;
		super({ ...WaypointDeleteIconOptions, html: content });
	}
}
