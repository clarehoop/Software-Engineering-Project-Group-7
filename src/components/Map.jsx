import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useEffect } from 'react';
import L from 'leaflet';

// Standard Leaflet Icon fix
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// --- RE-CENTER & RESIZE LOGIC ---
function MapController({ listings }) {
  const map = useMap();

  useEffect(() => {
    // 1. Fix "Fractured" tiles
    map.invalidateSize();

    // 2. If data loaded, move map to show the markers
    if (listings && listings.length > 0) {
      const validCoords = listings
        .filter(item => item.coordinates)
        .map(item => [item.coordinates.lat, item.coordinates.lon]);

      if (validCoords.length > 0) {
        // This automatically zooms/pans the map to fit ALL current markers
        const bounds = L.latLngBounds(validCoords);
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
      }
    }
  }, [listings, map]); // Triggers every time 'listings' updates from Firebase

  return null;
}

export default function MapView({ listings }) {
  // Default to a general city center while loading
  const defaultCenter = [39.1031, -84.5120];

  return (
    <div style={{ height: '100%', width: '100%', minHeight: '400px' }}>
      <MapContainer 
        center={defaultCenter} 
        zoom={13} 
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        
        {/* This component handles the actual logic of moving the map when data arrives */}
        <MapController listings={listings} />

        {listings.map((item) => {
  // 1. Check if coordinates exist
  // 2. Check if lat and lon are actual numbers (not NaN)
  const hasValidCoords = 
    item.coordinates && 
    typeof item.coordinates.lat === 'number' && !isNaN(item.coordinates.lat) &&
    typeof item.coordinates.lon === 'number' && !isNaN(item.coordinates.lon);

  if (!hasValidCoords) return null; // Skip this marker if data is bad

  return (
    <Marker 
      key={item.id} 
      position={[item.coordinates.lat, item.coordinates.lon]}
    >
      <Popup>
        <div>
          <b>{item.title}</b><br />
          ${item.price}
        </div>
      </Popup>
    </Marker>
  );
})}
      </MapContainer>
    </div>
  );
}