import { useEffect, useState } from "react";
import socket from "../../socket/socket";
import LiveMap from "../../components/customer/LiveMap";

const TrackProvider = () => {

  const [customerLocation] = useState([
    21.562076,
    74.220857,
  ]);

  const [providerLocation, setProviderLocation] = useState([
    21.563000,
    74.221500,
  ]);

  useEffect(() => {

    if (!socket.connected) {
      socket.connect();
    }

    socket.emit("join", "customer");

    socket.on("providerLocation", (location) => {

      console.log("📍 Live Location :", location);

      setProviderLocation([
        location.latitude,
        location.longitude,
      ]);

    });

    return () => {

      socket.off("providerLocation");
      socket.disconnect();

    };

  }, []);

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <h1 className="mb-8 text-5xl font-bold">
        Live Tracking
      </h1>

      <LiveMap
        customerLocation={customerLocation}
        providerLocation={providerLocation}
      />

    </div>
  );
};

export default TrackProvider;