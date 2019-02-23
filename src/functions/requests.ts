
interface USGSQueryResults {
	USGS_Elevation_Point_Query_Service: {
		Elevation_Query: {
			x: number;
			y: number;
			Elevation: number;
			Units: 'Feet' | 'Meters';
			Data_Source: '3DEP 1/3 arc-second';
		};
	};
}

const UNITS: string = 'Feet';
const OUTPUT: string = 'json';
const baseUrl: string = `https://nationalmap.gov/epqs/pqs.php?units=${this.UNITS}&output=${this.OUTPUT}`;

async function fetchElevation(coords: L.LatLng): Promise<number> {
	const url = baseUrl + `&x=${coords.lng}&y=${coords.lat}`;
	const usgsQueryResults: USGSQueryResults = await fetch(url).then((response: Response) => {
        return (response.json() as Promise<USGSQueryResults>);
    });
    return usgsQueryResults.USGS_Elevation_Point_Query_Service.Elevation_Query.Elevation
}

