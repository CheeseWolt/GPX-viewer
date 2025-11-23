'use client';

import { useGpx } from '../providers';
import StatsPanel from '../components/StatsPanel';

export default function StatsPage() {
    const { gpxData, loading } = useGpx();

    if (loading) {
        return <div className="notification is-dark glass-panel">Chargement des stats...</div>;
    }

    if (!gpxData) {
        return null;
    }

    return <StatsPanel stats={gpxData.stats} />;
}
