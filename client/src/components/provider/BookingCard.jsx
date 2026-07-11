import { motion } from "framer-motion";
import {
  FiUser,
  FiPhone,
  FiCalendar,
  FiCheckCircle,
} from "react-icons/fi";

const BookingCard = ({
  booking,
  onComplete,
}) => {
  const getStatusColor = () => {
    switch (booking.status) {
      case "Accepted":
        return "bg-blue-100 text-blue-700";

      case "Working":
        return "bg-yellow-100 text-yellow-700";

      case "Completed":
        return "bg-green-100 text-green-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-lg"
    >
      {/* Header */}

      <div className="flex items-start justify-between">

        <div>

          <h2 className="text-xl font-bold text-slate-900">
            {booking.customer?.name}
          </h2>

          <p className="mt-1 text-blue-600">
            {booking.serviceRequest?.service}
          </p>

        </div>

        <span
          className={`rounded-full px-4 py-2 text-xs font-semibold ${getStatusColor()}`}
        >
          {booking.status}
        </span>

      </div>

      {/* Phone */}

      <div className="mt-5 flex items-center gap-3">

        <FiPhone className="text-blue-600" />

        <span>
          {booking.customer?.phone}
        </span>

      </div>

      {/* Date */}

      <div className="mt-4 flex items-center gap-3">

        <FiCalendar className="text-green-600" />

        <span>
          {new Date(
            booking.createdAt
          ).toLocaleString()}
        </span>

      </div>

      {/* Button */}

      {booking.status !== "Completed" && (
        <button
          onClick={() =>
            onComplete(booking._id)
          }
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700"
        >
          <FiCheckCircle />

          Complete Booking
        </button>
      )}
    </motion.div>
  );
};

export default BookingCard;