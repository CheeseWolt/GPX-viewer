'use client';

import { MapContainer, TileLayer, Polyline, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';

// Fix for default marker icon in Leaflet with Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapComponentProps {
    positions: [number, number][];
}

function BoundsFitter({ positions }: { positions: [number, number][] }) {
    const map = useMap();
    useEffect(() => {
        if (positions.length > 0) {
            const bounds = L.latLngBounds(positions);
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [positions, map]);
    return null;
}

const MapComponent = ({ positions }: MapComponentProps) => {
    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    const center: [number, number] = positions.length > 0 ? positions[0] : [50.6441243, 3.0501137];

    return (
        <MapContainer
            center={center}
            zoom={13}
            style={{ height: '100%', minHeight: '500px', width: '100%', borderRadius: '0.75rem', zIndex: 1 }}
            className="has-shadow"
        >
            <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/dark-v11/tiles/{z}/{x}/{y}?access_token=${mapboxToken}`}
                attribution='&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                tileSize={512}
                zoomOffset={-1}
            />
            {positions.length > 0 && (
                <>
                    <Polyline
                        positions={positions}
                        pathOptions={{ color: '#00d1b2', weight: 4, opacity: 0.8 }} // Bulma primary/teal color
                    />
                    <Marker position={positions[0]} icon={L.divIcon({ className: 'custom-icon', html: '<div style="font-size: 24px;">🚩</div>', iconSize: [30, 30], iconAnchor: [15, 30] })} />
                    <Marker position={positions[positions.length - 1]} icon={L.divIcon({ className: 'custom-icon', html: '<div style="font-size: 24px;">🏁</div>', iconSize: [30, 30], iconAnchor: [5, 30] })} />
                    <BoundsFitter positions={positions} />
                </>
            )}
        </MapContainer>
    );
};

export default MapComponent;
