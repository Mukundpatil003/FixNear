import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";

import { useEffect, useMemo } from "react";

import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

// ===========================
// Auto Move Map
// ===========================

function ChangeView({ center }) {
  const map = useMap();

  useEffect(() => {
    map.flyTo(center, 15, {
      duration: 1.5,
    });
  }, [center, map]);

  return null;
}

// ===========================
// Routing Component
// ===========================

function Routing({ customerLocation, providerLocation }) {
  const map = useMap();

  useEffect(() => {
    if (!customerLocation || !providerLocation) return;

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(customerLocation[0], customerLocation[1]),
        L.latLng(providerLocation[0], providerLocation[1]),
      ],

      lineOptions: {
        styles: [
          {
            color: "#2563eb",
            weight: 6,
          },
        ],
      },

      draggableWaypoints: false,
      addWaypoints: false,
      fitSelectedRoutes: true,
      show: false,
      routeWhileDragging: false,
      createMarker: () => null,
    }).addTo(map);

    return () => {
      map.removeControl(routingControl);
    };
  }, [customerLocation, providerLocation, map]);

  return null;
}

// ===========================

const LiveMap = ({
  customerLocation,
  providerLocation,
}) => {
  const center = providerLocation || customerLocation;

  const distance = useMemo(() => {
    if (!providerLocation) return 0;

    const lat1 = customerLocation[0];
    const lon1 = customerLocation[1];

    const lat2 = providerLocation[0];
    const lon2 = providerLocation[1];

    const R = 6371;

    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) *
        Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c =
      2 *
      Math.atan2(
        Math.sqrt(a),
        Math.sqrt(1 - a)
      );

    return (R * c).toFixed(2);
  }, [customerLocation, providerLocation]);

  const eta = Math.ceil(distance / 0.5);

  return (
    <div>
      {/* Info */}

      <div className="mb-6 rounded-2xl bg-white p-5 shadow">
        <div className="flex justify-between">
          <div>
            <h2 className="text-xl font-bold">
              🚗 Provider On The Way
            </h2>

            <p className="mt-2 text-gray-500">
              Distance
            </p>

            <h3 className="text-2xl font-bold">
              {distance} km
            </h3>
          </div>

          <div>
            <p className="text-gray-500">
              ETA
            </p>

            <h3 className="text-2xl font-bold">
              {eta} mins
            </h3>
          </div>
        </div>
      </div>

      {/* MAP */}

      <MapContainer
        center={center}
        zoom={15}
        style={{
          height: "600px",
          width: "100%",
          borderRadius: "20px",
        }}
      >
        <ChangeView center={center} />

        <TileLayer
          attribution="OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={customerLocation}>
          <Popup>Customer</Popup>
        </Marker>

        {providerLocation && (
          <Marker position={providerLocation}>
            <Popup>Provider</Popup>
          </Marker>
        )}

        {providerLocation && (
          <Routing
            customerLocation={customerLocation}
            providerLocation={providerLocation}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default LiveMap;