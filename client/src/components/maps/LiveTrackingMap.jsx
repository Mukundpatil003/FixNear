import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const LiveTrackingMap = ({
  customerLocation,
  providerLocation,
}) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const customerMarker = useRef(null);
  const providerMarker = useRef(null);

  useEffect(() => {
    if (map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,

      style:
        "https://demotiles.maplibre.org/style.json",

      center: customerLocation,

      zoom: 14,
    });

    map.current.addControl(
      new maplibregl.NavigationControl(),
      "top-left"
    );

    customerMarker.current = new maplibregl.Marker({
      color: "#2563eb",
    })
      .setLngLat(customerLocation)
      .addTo(map.current);

    providerMarker.current = new maplibregl.Marker({
      color: "#22c55e",
    })
      .setLngLat(providerLocation)
      .addTo(map.current);
  }, []);

  useEffect(() => {
    if (!providerMarker.current) return;

    providerMarker.current.setLngLat(providerLocation);
  }, [providerLocation]);

  return (
    <div
      ref={mapContainer}
      className="h-[650px] w-full rounded-3xl shadow-xl"
    />
  );
};

export default LiveTrackingMap;