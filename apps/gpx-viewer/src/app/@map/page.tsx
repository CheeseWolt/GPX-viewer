'use client';

import { useGpx } from '../providers';
import MapComponent from '../components/MapComponent';

export default function MapPage() {
    const { gpxData, loading } = useGpx();

    if (loading) {
        return <div className="notification is-dark glass-panel">Chargement de la carte...</div>;
    }

    if (!gpxData) {
        return <div className="notification is-danger glass-panel">Aucune donnée GPX.</div>;
    }

    return (
        <div className="glass-panel p-1 neon-box" style={{ height: '100%', minHeight: '60vh', position: 'relative' }}>
            <div style={{ height: '100%', width: '100%', borderRadius: '15px', overflow: 'hidden' }}>
                <MapComponent positions={gpxData.trackPoints.map(p => [p.lat, p.lon])} />
            </div>
        </div>
    );
}
