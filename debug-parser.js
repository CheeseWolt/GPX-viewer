const { JSDOM } = require('jsdom');
const { DOMParser } = new JSDOM().window;

const parseGpx = (gpxContent) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(gpxContent, 'text/xml');

    const trkpts = xmlDoc.getElementsByTagName('trkpt');
    console.log('TrackPoints found:', trkpts.length);

    for (let i = 0; i < trkpts.length; i++) {
        const pt = trkpts[i];
        const timeElem = pt.getElementsByTagName('time')[0];
        const timeStr = timeElem ? timeElem.textContent : 'null';
        console.log(`Point ${i}: timeStr="${timeStr}"`);
    }
};

const mockGpxContent = `
    <?xml version="1.0" encoding="UTF-8"?>
    <gpx version="1.1" creator="Test">
      <trk>
        <name>Test Run</name>
        <trkseg>
          <trkpt lat="50.0" lon="3.0">
            <ele>10</ele>
            <time>2023-01-01T10:00:00Z</time>
          </trkpt>
          <trkpt lat="50.001" lon="3.001">
            <ele>12</ele>
            <time>2023-01-01T10:00:10Z</time>
          </trkpt>
        </trkseg>
      </trk>
    </gpx>
`;

parseGpx(mockGpxContent.trim());
