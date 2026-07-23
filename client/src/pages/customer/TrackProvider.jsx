import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import socket from "../../socket/socket";
import LiveMap from "../../components/customer/LiveMap";
import { getBookingDetails } from "../../api/customerBookingApi";

const TrackProvider = () => {
  const { bookingId } = useParams();

  const [loading, setLoading] = useState(true);

  const [customerLocation, setCustomerLocation] = useState([
    18.5204,
    73.8567,
  ]);

  const [providerLocation, setProviderLocation] = useState([
    18.5204,
    73.8567,
  ]);

  useEffect(() => {
    loadBooking();
  }, []);

  const loadBooking = async () => {
  try {

    const res = await getBookingDetails(bookingId);

    console.log(res);

    if (!res.success) {
      return;
    }

    const booking = res.booking;

    console.log("Booking", booking);

    // Socket

    if (!socket.connected) {
      socket.connect();
    }

    socket.emit("join", booking.customer);

    // ----------------------------
    // Customer Location
    // ----------------------------

    if (
      booking?.serviceRequest?.location?.coordinates
    ) {
      const customer =
        booking.serviceRequest.location.coordinates;

      setCustomerLocation([
        customer[1],
        customer[0],
      ]);
    }

    // ----------------------------
    // Provider Location
    // ----------------------------

    if (
      booking?.provider?.currentLocation?.coordinates
    ) {
      const provider =
        booking.provider.currentLocation.coordinates;

      setProviderLocation([
        provider[1],
        provider[0],
      ]);
    }

    socket.off("providerLocation");

    socket.on("providerLocation", (data) => {

      console.log("Live Location", data);

      setProviderLocation([
        data.latitude,
        data.longitude,
      ]);

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
      <div className="flex h-screen items-center justify-center">
        Loading Live Tracking...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <h1 className="mb-6 text-4xl font-bold">
        Track Provider
      </h1>

      <LiveMap
        customerLocation={customerLocation}
        providerLocation={providerLocation}
      />

    </div>
  );
};

export default TrackProvider;