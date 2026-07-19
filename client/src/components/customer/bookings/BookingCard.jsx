import { MapPin, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cancelBooking } from "../../../api/customerBookingApi";

const BookingCard = ({ booking, loadBookings }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/customer/bookings/${booking._id}`);
  };

const handleCancel = async () => {
  const confirmCancel = window.confirm(
    "Are you sure you want to cancel this booking?"
  );

  if (!confirmCancel) return;

  try {
    await cancelBooking(booking._id);

    alert("Booking cancelled successfully");

    loadBookings();   // Refresh bookings

  } catch (error) {

    console.log(error);

    alert("Unable to cancel booking");

  }
};
  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-lg">

      {/* Header */}

      <div className="flex items-start justify-between">

        <div>

          <h2 className="text-3xl font-bold text-gray-900">
            {booking.serviceRequest?.service}
          </h2>

          <p className="mt-2 text-lg text-gray-500">
            {booking.provider?.user?.name}
          </p>

        </div>

        {/* Status */}

        <span
          className={`inline-flex items-center rounded-full px-5 py-2 text-sm font-semibold
          ${
            booking.status === "Completed"
              ? "bg-green-100 text-green-700"
              : booking.status === "Accepted"
              ? "bg-blue-100 text-blue-700"
              : booking.status === "Working"
              ? "bg-yellow-100 text-yellow-700"
              : booking.status === "Cancelled"
              ? "bg-red-100 text-red-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {booking.status}
        </span>

      </div>

      {/* Info */}

      <div className="mt-6 space-y-4">

        <div className="flex items-center gap-3 text-gray-700">

          <Calendar size={20} />

          <span>
            {new Date(booking.createdAt).toLocaleDateString()}
          </span>

        </div>

        <div className="flex items-start gap-3 text-gray-700">

          <MapPin size={20} className="mt-1" />

          <span>
            {booking.serviceRequest?.address}
          </span>

        </div>

      </div>

      {/* Buttons */}

      <div className="mt-8 flex gap-4">

        <button
          onClick={handleViewDetails}
          className="flex-1 rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          View Details
        </button>

        {booking.status !== "Completed" &&
          booking.status !== "Cancelled" && (
            <button
              onClick={handleCancel}
              className="flex-1 rounded-xl bg-red-500 py-3 font-semibold text-white transition hover:bg-red-600"
            >
              Cancel
            </button>
          )}

      </div>

    </div>
  );
};

export default BookingCard;