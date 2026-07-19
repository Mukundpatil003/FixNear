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

      setBookings(data.bookings);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>

      <h1 className="text-4xl font-bold mb-8">
        My Bookings
      </h1>

<p className="text-gray-500 mb-8">
  Manage all your bookings in one place.
</p>

<BookingStats bookings={bookings} />

      <div className="grid lg:grid-cols-2 gap-6">

        {bookings.map((booking) => (
         <BookingCard
  key={booking._id}
  booking={booking}
  loadBookings={loadBookings}
/>
        ))}

      </div>

    </div>
  );
};

export default MyBookings;