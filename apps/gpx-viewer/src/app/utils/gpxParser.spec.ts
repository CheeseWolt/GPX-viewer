import { parseGpx } from './gpxParser';

describe('gpxParser', () => {
  const mockGpxContent = `
    <?xml version="1.0" encoding="UTF-8"?>
    <gpx version="1.1" creator="Test" xmlns:gpxtpx="http://www.garmin.com/xmlschemas/TrackPointExtension/v1">
      <trk>
        <name>Test Run</name>
        <trkseg>
          <trkpt lat="50.0" lon="3.0">
            <ele>10</ele>
            <time>2023-01-01T10:00:00Z</time>
            <extensions>
              <gpxtpx:TrackPointExtension>
                <gpxtpx:hr>140</gpxtpx:hr>
              </gpxtpx:TrackPointExtension>
            </extensions>
          </trkpt>
          <trkpt lat="50.001" lon="3.001">
            <ele>12</ele>
            <time>2023-01-01T10:00:10Z</time>
            <extensions>
              <gpxtpx:TrackPointExtension>
                <gpxtpx:hr>150</gpxtpx:hr>
              </gpxtpx:TrackPointExtension>
            </extensions>
          </trkpt>
        </trkseg>
      </trk>
    </gpx>
  `;

  it('should parse valid GPX content', () => {
    const result = parseGpx(mockGpxContent);
    expect(result).toBeDefined();
    expect(result.trackPoints.length).toBe(2);
    expect(result.trackPoints[0].lat).toBe(50.0);
    expect(result.trackPoints[0].hr).toBe(140);
  });

  it('should calculate statistics correctly', () => {
    const result = parseGpx(mockGpxContent);
    expect(result.stats.totalTime).toBe(10); // 10 seconds
    expect(result.stats.avgHr).toBe(145); // (140 + 150) / 2
    expect(result.stats.totalDistance).toBeGreaterThan(0);
  });

  it('should handle invalid GPX content gracefully', () => {
    const result = parseGpx('invalid xml');
    expect(result.trackPoints.length).toBe(0);
    expect(result.stats.totalDistance).toBe(0);
  });

  it('should handle empty GPX content by throwing or returning empty', () => {
    const result = parseGpx('');
    expect(result.trackPoints.length).toBe(0);
  });
});
