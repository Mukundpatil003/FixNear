import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Phone,
  User,
  Wrench,
  Navigation,
  CheckCircle2,
  Clock,
  XCircle,
  Maximize2,
  X,
  ShieldCheck,
} from "lucide-react";

import { getBookingDetails } from "../../api/customerBookingApi";

const BookingDetails = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    loadBooking();
  }, [bookingId]);

  const loadBooking = async () => {
    try {
      setLoading(true);
      const data = await getBookingDetails(bookingId);
      setBooking(data.booking);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 font-medium animate-pulse">Loading booking details...</p>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="max-w-3xl mx-auto text-center py-16 px-4">
        <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <XCircle size={32} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Booking Not Found</h2>
        <p className="text-slate-500 mb-6">The booking you are looking for does not exist or has been removed.</p>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          <ArrowLeft size={18} />
          Go Back
        </button>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200/80 rounded-full text-xs sm:text-sm font-semibold">
            <CheckCircle2 size={15} /> Completed
          </span>
        );
      case "accepted":
      case "in progress":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200/80 rounded-full text-xs sm:text-sm font-semibold">
            <Clock size={15} /> Active / Accepted
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-50 text-rose-700 border border-rose-200/80 rounded-full text-xs sm:text-sm font-semibold">
            <XCircle size={15} /> Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200/80 rounded-full text-xs sm:text-sm font-semibold">
            <Clock size={15} /> {status || "Pending"}
          </span>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium text-sm transition self-start"
        >
          <ArrowLeft size={18} />
          Back to Bookings
        </button>
        <div className="flex items-center gap-3">
          <span className="text-xs sm:text-sm text-slate-400 font-medium">Status:</span>
          {getStatusBadge(booking.status)}
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-100 overflow-hidden">
        {/* Banner Section */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-950 p-6 sm:p-8 text-white relative">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 relative z-10 text-center sm:text-left">
            <img
              src={
                booking.provider?.user?.profileImage ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  booking.provider?.user?.name || "Provider"
                )}&background=2563eb&color=fff`
              }
              alt="Provider"
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-4 ring-white/20 shadow-lg"
            />
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-blue-500/30 text-blue-200 rounded-full text-xs font-semibold backdrop-blur-md mb-1">
                <ShieldCheck size={14} /> Verified Provider
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {booking.provider?.user?.name || "Service Professional"}
              </h1>
              <p className="text-blue-200/90 font-medium text-sm sm:text-base">
                {booking.serviceRequest?.service || "Professional Service"}
              </p>
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-8 space-y-8">
          {/* Service Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 bg-slate-50/80 p-4 sm:p-6 rounded-2xl border border-slate-100">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 bg-blue-100 text-blue-600 rounded-xl shrink-0">
                <User size={18} />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Provider Name</p>
                <p className="text-slate-800 font-semibold text-sm sm:text-base">
                  {booking.provider?.user?.name || "N/A"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2.5 bg-emerald-100 text-emerald-600 rounded-xl shrink-0">
                <Phone size={18} />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Contact Number</p>
                <p className="text-slate-800 font-semibold text-sm sm:text-base">
                  {booking.provider?.user?.phone || "N/A"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2.5 bg-indigo-100 text-indigo-600 rounded-xl shrink-0">
                <Calendar size={18} />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Booking Date</p>
                <p className="text-slate-800 font-semibold text-sm sm:text-base">
                  {new Date(booking.createdAt).toLocaleDateString("en-US", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2.5 bg-violet-100 text-violet-600 rounded-xl shrink-0">
                <Wrench size={18} />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Category</p>
                <p className="text-slate-800 font-semibold text-sm sm:text-base">
                  {booking.serviceRequest?.service || "General"}
                </p>
              </div>
            </div>

            <div className="sm:col-span-2 flex items-start gap-3.5 pt-2 border-t border-slate-200/60">
              <div className="p-2.5 bg-rose-100 text-rose-600 rounded-xl shrink-0">
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Service Address</p>
                <p className="text-slate-800 font-semibold text-sm sm:text-base">
                  {booking.serviceRequest?.address || "Address not specified"}
                </p>
              </div>
            </div>
          </div>

          {/* Description & Problem Photo */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-slate-800 flex items-center gap-2">
              Problem Description
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed bg-white border border-slate-200/60 rounded-xl p-4 sm:p-5 shadow-sm">
              {booking.serviceRequest?.description || "No specific details provided."}
            </p>

            {booking.serviceRequest?.image && (
              <div className="mt-4 space-y-2">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Uploaded Problem Photo</p>
                <div
                  onClick={() => setLightboxOpen(true)}
                  className="relative group cursor-pointer overflow-hidden rounded-2xl border border-slate-200 shadow-sm max-w-sm"
                >
                  <img
                    src={booking.serviceRequest.image}
                    alt="Problem attachment"
                    className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-medium gap-2">
                    <Maximize2 size={20} /> Click to Expand
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row gap-3.5">
            {booking.status === "Accepted" && (
              <button
                onClick={() => navigate(`/track/${booking._id}`)}
                className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 active:scale-[0.98] transition shadow-lg shadow-blue-500/25"
              >
                <Navigation size={18} /> Track Provider Live
              </button>
            )}

            {booking.provider?.user?.phone && (
              <a
                href={`tel:${booking.provider.user.phone}`}
                className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 active:scale-[0.98] transition shadow-lg shadow-emerald-500/25 text-center"
              >
                <Phone size={18} /> Call Provider ({booking.provider.user.phone})
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && booking.serviceRequest?.image && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setLightboxOpen(false)}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center">
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute -top-12 right-0 text-white/80 hover:text-white p-2 rounded-full bg-slate-800/60 hover:bg-slate-800 transition"
            >
              <X size={24} />
            </button>
            <img
              src={booking.serviceRequest.image}
              alt="Uploaded problem full"
              className="max-w-full max-h-[85vh] rounded-2xl object-contain shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingDetails;