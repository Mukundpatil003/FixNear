import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Sidebar from "../../components/provider/Sidebar";
import Topbar from "../../components/provider/Topbar";
import BookingCard from "../../components/provider/BookingCard";
import ProviderLocationTracker from "../../components/provider/ProviderLocationTracker";
import {
  getMyBookings,
  completeBooking,
} from "../../api/bookingApi";

import {
  getProviderProfile,
  updateProviderProfile,
} from "../../api/providerApi";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [bookingRes, profileRes] =
        await Promise.all([
          getMyBookings(),
          getProviderProfile(),
        ]);

      if (bookingRes.success) {
        setBookings(bookingRes.bookings);
      }

      if (profileRes.success) {
        setProvider(profileRes.provider);
      }
    } catch (error) {
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async (
    bookingId
  ) => {
    try {
      const res = await completeBooking(
        bookingId
      );

      if (res.success) {
        toast.success(res.message);
        fetchData();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed"
      );
    }
  };

  const handleAvailability =
    async () => {
      try {
        await updateProviderProfile({
          isAvailable:
            !provider.isAvailable,
        });

        fetchData();
      } catch (error) {
        toast.error(
          "Unable to update"
        );
      }
    };

  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="flex min-h-screen bg-slate-100">
<ProviderLocationTracker />
      <Sidebar />

      <div className="flex-1 p-8">

        <Topbar
          provider={provider}
          isAvailable={
            provider?.isAvailable
          }
          onAvailabilityChange={
            handleAvailability
          }
        />

        <div className="mt-8">

          <h1 className="mb-6 text-3xl font-bold">
            My Bookings
          </h1>

          {bookings.length === 0 ? (
            <div className="rounded-3xl bg-white p-10 text-center">
              No Bookings
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-2">

              {bookings.map((booking) => (
                <BookingCard
                  key={booking._id}
                  booking={booking}
                  onComplete={
                    handleComplete
                  }
                />
              ))}

            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default MyBookings;