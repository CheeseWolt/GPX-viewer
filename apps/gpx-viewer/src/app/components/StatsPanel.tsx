import { GpxStats } from '../utils/gpxParser';

interface StatsPanelProps {
    stats: GpxStats;
}

const StatsPanel = ({ stats }: StatsPanelProps) => {
    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.floor(seconds % 60);
        return `${h > 0 ? h + ':' : ''}${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const formatPace = (paceSecondsPerKm: number) => {
        const m = Math.floor(paceSecondsPerKm / 60);
        const s = Math.floor(paceSecondsPerKm % 60);
        return `${m}'${s.toString().padStart(2, '0')}"/km`;
    };

    return (
        <div className="glass-panel p-5" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="columns is-multiline is-mobile">
                <div className="column is-12 has-text-centered mb-5">
                    <p className="heading has-text-grey-light is-size-6">Distance</p>
                    <p className="title is-1 has-text-white neon-text" style={{ fontSize: '4rem' }}>
                        {(stats.totalDistance / 1000).toFixed(2)} <span className="is-size-4 has-text-grey-light">km</span>
                    </p>
                </div>
                <div className="column is-12 has-text-centered mb-5">
                    <p className="heading has-text-grey-light is-size-6">Temps</p>
                    <p className="title is-2 has-text-white" style={{ fontFamily: 'monospace' }}>{formatTime(stats.totalTime)}</p>
                </div>
                <div className="column is-6 has-text-centered">
                    <p className="heading has-text-grey-light">Allure</p>
                    <p className="title is-4 has-text-primary">{formatPace(stats.avgPace)}</p>
                </div>
                <div className="column is-6 has-text-centered">
                    <p className="heading has-text-grey-light">FC Moy.</p>
                    <p className="title is-4 has-text-danger">{stats.avgHr} <span className="is-size-6">bpm</span></p>
                </div>
            </div>
        </div>
    );
};

export default StatsPanel;
