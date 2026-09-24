import { useEffect, useState } from "react";
import { getCustomerBookings } from "../../api/customerBookingApi";
import BookingCard from "../../components/customer/bookings/BookingCard";
import BookingStats from "../../components/customer/bookings/BookingStats";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const data = await getCustomerBookings();
      setBookings(data.bookings || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <p className="text-xs font-bold text-slate-500">Loading bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
          My Bookings
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Manage your scheduled, active, and completed service appointments.
        </p>
      </div>

      <BookingStats bookings={bookings} />

      {bookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center">
          <p className="text-sm font-bold text-slate-600">No Bookings Yet</p>
          <p className="text-xs text-slate-400 mt-1">When you confirm a service request, it will appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <BookingCard
              key={booking._id}
              booking={booking}
              loadBookings={loadBookings}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;