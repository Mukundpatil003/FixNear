import {
  Clock3,
  MapPinned,
  Star,
  CheckCircle2,
  Navigation
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ActiveBookingCard = ({ booking }) => {
  const navigate = useNavigate();

  if (!booking) {
    return (
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">Active Booking</h2>
        <div className="flex h-56 flex-col items-center justify-center text-center p-6 bg-slate-50/60 rounded-2xl mt-4 border border-dashed border-slate-200">
          <p className="text-sm font-semibold text-slate-500">No Active Bookings</p>
          <p className="text-xs text-slate-400 mt-1">Need something fixed? Request a service anytime.</p>
        </div>
      </div>
    );
  }

  const provider = booking.provider;
  const request = booking.serviceRequest;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 p-6 text-white shadow-xl shadow-blue-600/20">
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-xl"></div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-bold backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
          {booking.status}
        </span>

        <div className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur-md">
          <Clock3 size={14} />
          <span>Live Tracking Active</span>
        </div>
      </div>

      {/* Service Details */}
      <div className="mt-6">
        <h2 className="text-2xl font-black tracking-tight">{request?.service}</h2>
        <p className="mt-1 text-xs text-white/80 line-clamp-2">{request?.problem}</p>

        <p className="mt-3 flex items-center gap-1.5 text-xs text-white/70">
          <MapPinned size={14} className="flex-shrink-0" />
          <span className="truncate">{request?.address}</span>
        </p>
      </div>

      <div className="my-6 border-t border-white/20"></div>

      {/* Provider Details */}
      <div className="flex items-center gap-4">
        <img
          src={
            provider?.user?.profileImage ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              provider?.user?.name || "Provider"
            )}&background=2563eb&color=fff`
          }
          alt={provider?.user?.name}
          className="h-14 w-14 rounded-full border-2 border-white/80 object-cover shadow-md"
        />

        <div>
          <h3 className="text-base font-bold flex items-center gap-1.5">
            {provider?.user?.name}
            <CheckCircle2 size={14} className="text-emerald-300" />
          </h3>
          <p className="text-xs text-white/80">{provider?.service}</p>
          <div className="mt-1 flex items-center gap-1 text-xs font-bold text-amber-300">
            <Star size={12} className="fill-amber-300" />
            <span>{provider?.rating || "5.0"}</span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={() => navigate(`/track/${booking._id}`)}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-white py-3.5 text-xs font-extrabold text-blue-600 shadow-md transition-all hover:bg-slate-50 hover:shadow-lg active:scale-98 cursor-pointer"
      >
        <Navigation size={14} />
        Track Provider Live
      </button>
    </div>
  );
};

export default ActiveBookingCard;