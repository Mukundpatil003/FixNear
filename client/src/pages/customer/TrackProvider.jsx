import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import socket from "../../socket/socket";
import LiveMap from "../../components/customer/LiveMap";
import { getBookingDetails } from "../../api/customerBookingApi";
import { FiArrowLeft } from "react-icons/fi";

const TrackProvider = () => {
  const { bookingId } = useParams();
  const [loading, setLoading] = useState(true);
  const [customerLocation, setCustomerLocation] = useState([18.5204, 73.8567]);
  const [providerLocation, setProviderLocation] = useState([18.5204, 73.8567]);

  useEffect(() => {
    loadBooking();
  }, []);

  const loadBooking = async () => {
    try {
      const res = await getBookingDetails(bookingId);
      if (!res.success) return;

      const booking = res.booking;

      if (!socket.connected) {
        socket.connect();
      }
      socket.emit("join", booking.customer);

      if (booking?.serviceRequest?.location?.coordinates) {
        const customer = booking.serviceRequest.location.coordinates;
        setCustomerLocation([customer[1], customer[0]]);
      }

      if (booking?.provider?.currentLocation?.coordinates) {
        const provider = booking.provider.currentLocation.coordinates;
        setProviderLocation([provider[1], provider[0]]);
      }

      socket.off("providerLocation");
      socket.on("providerLocation", (data) => {
        setProviderLocation([data.latitude, data.longitude]);
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      socket.off("providerLocation");
    };
  }, []);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <p className="text-xs font-bold text-slate-500">Connecting to GPS Stream...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
            Live Technician Tracker
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time GPS tracking for active booking #{bookingId.slice(-6).toUpperCase()}
          </p>
        </div>

        <Link
          to="/customer/bookings"
          className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
        >
          <FiArrowLeft /> Back to Bookings
        </Link>
      </div>

      <LiveMap
        customerLocation={customerLocation}
        providerLocation={providerLocation}
      />
    </div>
  );
};

export default TrackProvider;