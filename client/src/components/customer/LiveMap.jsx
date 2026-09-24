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
import { FiNavigation, FiClock, FiMapPin, FiCheckCircle } from "react-icons/fi";

function ChangeView({ center }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 15, {
      duration: 1.5,
    });
  }, [center, map]);
  return null;
}

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
            weight: 5,
            opacity: 0.8
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

const LiveMap = ({ customerLocation, providerLocation }) => {
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
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(2);
  }, [customerLocation, providerLocation]);

  const eta = Math.max(1, Math.ceil(distance / 0.5));

  return (
    <div className="space-y-6">
      {/* Realtime Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-3xl border border-blue-100 bg-gradient-to-tr from-blue-600 to-indigo-600 p-5 text-white shadow-md shadow-blue-500/20">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-100 uppercase tracking-wider">
            <FiNavigation className="animate-spin text-sm" />
            Live Status
          </div>
          <p className="text-xl font-black mt-1">Technician En Route</p>
          <p className="text-[11px] text-blue-100/80 mt-0.5">Real-time GPS coordinates stream</p>
        </div>

        <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
            <FiMapPin className="text-rose-500" />
            Distance Away
          </div>
          <p className="text-2xl font-black text-slate-900 mt-1">{distance} <span className="text-sm font-semibold text-slate-500">km</span></p>
          <p className="text-[11px] text-slate-400 mt-0.5">Calculated straight line distance</p>
        </div>

        <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
            <FiClock className="text-blue-600" />
            Estimated Arrival
          </div>
          <p className="text-2xl font-black text-slate-900 mt-1">~{eta} <span className="text-sm font-semibold text-slate-500">mins</span></p>
          <p className="text-[11px] text-emerald-600 font-bold mt-0.5">On Schedule</p>
        </div>
      </div>

      {/* Map Frame */}
      <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-md">
        <MapContainer
          center={center}
          zoom={15}
          style={{
            height: "540px",
            width: "100%",
          }}
        >
          <ChangeView center={center} />

          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={customerLocation}>
            <Popup>
              <div className="p-1 font-bold text-slate-900 text-xs">📍 Your Location</div>
            </Popup>
          </Marker>

          {providerLocation && (
            <Marker position={providerLocation}>
              <Popup>
                <div className="p-1 font-bold text-blue-600 text-xs">🚗 Technician Live Position</div>
              </Popup>
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
    </div>
  );
};

export default LiveMap;