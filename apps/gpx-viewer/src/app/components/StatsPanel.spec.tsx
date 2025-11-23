import { render, screen } from '@testing-library/react';
import StatsPanel from './StatsPanel';
import { GpxStats } from '../utils/gpxParser';

describe('StatsPanel', () => {
    const mockStats: GpxStats = {
        totalDistance: 5000, // 5 km
        totalTime: 1800, // 30 min
        avgPace: 360, // 6:00 min/km
        avgHr: 150,
        maxHr: 180,
        elevationGain: 100
    };

    it('should render stats correctly', () => {
        render(<StatsPanel stats={mockStats} />);

        // Check Distance
        expect(screen.getByText('5.00')).toBeTruthy();
        expect(screen.getByText('km')).toBeTruthy();

        // Check Time (30 min = 30:00)
        expect(screen.getByText('30:00')).toBeTruthy();

        // Check Pace (360s = 6'00"/km)
        expect(screen.getByText('6\'00"/km')).toBeTruthy();

        // Check Heart Rate
        expect(screen.getByText('150')).toBeTruthy();
        expect(screen.getByText('bpm')).toBeTruthy();
    });
});
