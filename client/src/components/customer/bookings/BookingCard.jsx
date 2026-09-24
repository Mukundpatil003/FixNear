import { MapPin, Calendar, ArrowRight, XCircle, CheckCircle2, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cancelBooking } from "../../../api/customerBookingApi";
import toast from "react-hot-toast";

const statusStyle = {
  Completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Accepted: "bg-blue-50 text-blue-700 border-blue-200",
  Working: "bg-purple-50 text-purple-700 border-purple-200",
  Cancelled: "bg-rose-50 text-rose-700 border-rose-200",
};

const BookingCard = ({ booking, loadBookings }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/customer/bookings/${booking._id}`);
  };

  const handleCancel = async () => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    try {
      await cancelBooking(booking._id);
      toast.success("Booking cancelled successfully");
      loadBookings();
    } catch (error) {
      console.log(error);
      toast.error("Unable to cancel booking");
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-slate-300 flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2.5 py-0.5 rounded-md">
              {booking.serviceRequest?.service}
            </span>
            <h2 className="text-lg font-bold text-slate-900 mt-1.5">
              {booking.provider?.user?.name || "Assigned Technician"}
            </h2>
          </div>

          <span
            className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-bold ${
              statusStyle[booking.status] || "bg-slate-100 text-slate-700 border-slate-200"
            }`}
          >
            {booking.status}
          </span>
        </div>

        {/* Info list */}
        <div className="mt-5 space-y-2.5 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-slate-400 flex-shrink-0" />
            <span>
              {new Date(booking.createdAt).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
          </div>

          <div className="flex items-start gap-2">
            <MapPin size={14} className="text-rose-500 mt-0.5 flex-shrink-0" />
            <span className="line-clamp-2">{booking.serviceRequest?.address}</span>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-4">
        <button
          onClick={handleViewDetails}
          className="flex-1 flex items-center justify-center gap-1.5 rounded-2xl bg-blue-600 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-blue-700 transition-colors cursor-pointer"
        >
          View Details
          <ArrowRight size={14} />
        </button>

        {booking.status !== "Completed" && booking.status !== "Cancelled" && (
          <button
            onClick={handleCancel}
            className="flex-1 flex items-center justify-center gap-1.5 rounded-2xl border border-rose-200 bg-rose-50 py-2.5 text-xs font-bold text-rose-600 hover:bg-rose-100 transition-colors cursor-pointer"
          >
            <XCircle size={14} />
            Cancel Job
          </button>
        )}
      </div>
    </div>
  );
};

export default BookingCard;