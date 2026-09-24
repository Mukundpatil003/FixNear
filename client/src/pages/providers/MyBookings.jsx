import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Topbar from "../../components/provider/Topbar";
import BookingCard from "../../components/provider/BookingCard";
import ProviderLocationTracker from "../../components/provider/ProviderLocationTracker";
import { getMyBookings, completeBooking } from "../../api/bookingApi";
import { getProviderProfile, updateProviderProfile } from "../../api/providerApi";

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
      const [bookingRes, profileRes] = await Promise.all([
        getMyBookings(),
        getProviderProfile(),
      ]);

      if (bookingRes.success) {
        setBookings(bookingRes.bookings || []);
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

  const handleComplete = async (bookingId) => {
    try {
      const res = await completeBooking(bookingId);
      if (res.success) {
        toast.success(res.message || "Job marked as completed!");
        fetchData();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to complete job");
    }
  };

  const handleAvailability = async () => {
    try {
      await updateProviderProfile({
        isAvailable: !provider.isAvailable,
      });
      fetchData();
      toast.success("Availability status updated");
    } catch (error) {
      toast.error("Unable to update availability");
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <p className="text-xs font-bold text-slate-500">Loading active jobs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ProviderLocationTracker />

      <Topbar
        provider={provider}
        isAvailable={provider?.isAvailable}
        onAvailabilityChange={handleAvailability}
      />

      <div className="pt-2">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
              My Active Jobs
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Track assigned service appointments and mark completed jobs.
            </p>
          </div>

          <span className="rounded-full bg-blue-50 border border-blue-200 px-3.5 py-1.5 text-xs font-bold text-blue-600">
            {bookings.length} Total Jobs
          </span>
        </div>

        {bookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center">
            <p className="text-sm font-bold text-slate-700">No Active Jobs</p>
            <p className="text-xs text-slate-400 mt-1">Accepted service requests will be listed here for status updates.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {bookings.map((booking) => (
              <BookingCard
                key={booking._id}
                booking={booking}
                onComplete={handleComplete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;