import { gpx } from '@mapbox/togeojson';

export interface TrackPoint {
    lat: number;
    lon: number;
    ele: number;
    time: Date;
    hr: number | null;
    cad: number | null;
    distance: number; // Distance cumulée en mètres
}

export interface GpxStats {
    totalDistance: number; // mètres
    totalTime: number; // secondes
    avgPace: number; // secondes par km
    avgHr: number; // bpm
    maxHr: number;
    elevationGain: number; // mètres
}

export interface ParsedGpx {
    geoJson: any;
    trackPoints: TrackPoint[];
    stats: GpxStats;
}

export const parseGpx = (gpxContent: string): ParsedGpx => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(gpxContent.trim(), 'text/xml');
    const geoJson = gpx(xmlDoc);

    const trackPoints: TrackPoint[] = [];
    const trkpts = xmlDoc.getElementsByTagName('trkpt');

    let totalDistance = 0;
    let elevationGain = 0;
    let totalHr = 0;
    let hrCount = 0;
    let maxHr = 0;

    for (let i = 0; i < trkpts.length; i++) {
        const pt = trkpts[i];
        const lat = parseFloat(pt.getAttribute('lat') || '0');
        const lon = parseFloat(pt.getAttribute('lon') || '0');
        const ele = parseFloat(pt.getElementsByTagName('ele')[0]?.textContent || '0');
        const timeStr = pt.getElementsByTagName('time')[0]?.textContent;
        const time = timeStr ? new Date(timeStr) : new Date();

        // Extract Extensions (Samsung Health / Garmin)
        let hr: number | null = null;
        let cad: number | null = null;

        const extensions = pt.getElementsByTagName('extensions')[0];
        if (extensions) {
            const trackPointExtension = extensions.getElementsByTagNameNS('http://www.garmin.com/xmlschemas/TrackPointExtension/v1', 'TrackPointExtension')[0];
            if (trackPointExtension) {
                const hrElem = trackPointExtension.getElementsByTagNameNS('http://www.garmin.com/xmlschemas/TrackPointExtension/v1', 'hr')[0];
                const cadElem = trackPointExtension.getElementsByTagNameNS('http://www.garmin.com/xmlschemas/TrackPointExtension/v1', 'cad')[0];

                if (hrElem) hr = parseInt(hrElem.textContent || '0');
                if (cadElem) cad = parseInt(cadElem.textContent || '0');
            }
        }

        // Calculate distance from previous point
        let dist = 0;
        if (i > 0) {
            const prev = trackPoints[i - 1];
            dist = getDistanceFromLatLonInKm(prev.lat, prev.lon, lat, lon) * 1000;
            totalDistance += dist;

            const eleDiff = ele - prev.ele;
            if (eleDiff > 0) {
                elevationGain += eleDiff;
            }
        }

        if (hr) {
            totalHr += hr;
            hrCount++;
            if (hr > maxHr) maxHr = hr;
        }

        trackPoints.push({
            lat,
            lon,
            ele,
            time,
            hr,
            cad,
            distance: totalDistance
        });
    }

    const startTime = trackPoints.length > 0 ? trackPoints[0].time.getTime() : 0;
    const endTime = trackPoints.length > 0 ? trackPoints[trackPoints.length - 1].time.getTime() : 0;
    const totalTime = (endTime - startTime) / 1000; // secondes

    const stats: GpxStats = {
        totalDistance,
        totalTime,
        avgPace: totalDistance > 0 ? totalTime / (totalDistance / 1000) : 0,
        avgHr: hrCount > 0 ? Math.round(totalHr / hrCount) : 0,
        maxHr,
        elevationGain
    };

    return {
        geoJson,
        trackPoints,
        stats
    };
};

// Haversine formula
function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
}

function deg2rad(deg: number) {
    return deg * (Math.PI / 180);
}
