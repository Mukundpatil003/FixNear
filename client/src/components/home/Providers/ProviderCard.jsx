import {
  Star,
  MapPin,
  Briefcase,
  CalendarPlus,
  CheckCircle2
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ProviderCard = ({
    provider,
    service,
    latitude,
    longitude,
}) => {
  const navigate = useNavigate();
  const image =
    provider.user?.profileImage && provider.user.profileImage !== ""
      ? provider.user.profileImage
      : `https://ui-avatars.com/api/?name=${encodeURIComponent(
          provider.user?.name || "Provider"
        )}&background=2563eb&color=fff&size=400`;

  const handleBookNow = () => {
    navigate("/service-request", {
      state: {
        provider,
        service,
        latitude,
        longitude,
      },
    });
  };

  return (
    <div className="group overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/10">
      {/* Top Image Section */}
      <div className="relative h-60 overflow-hidden bg-slate-100">
        <img
          src={image}
          alt={provider.user?.name || "Provider"}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80"></div>

        {/* Verified Badge */}
        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 shadow-md backdrop-blur-md">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
            <CheckCircle2 size={14} className="text-blue-600 fill-blue-100" />
            <span>Verified Pro</span>
          </div>
        </div>

        {/* Status Badge */}
        <div
          className={`absolute right-4 top-4 flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold text-white shadow-md backdrop-blur-md ${
            provider.isAvailable ? "bg-emerald-500/90" : "bg-slate-600/90"
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse"></span>
          <span>{provider.isAvailable ? "ONLINE" : "OFFLINE"}</span>
        </div>

        {/* Rating Floating Tag */}
        <div className="absolute bottom-4 left-4 flex items-center gap-1 rounded-full bg-white/95 px-3 py-1 text-xs font-black text-slate-900 shadow-md">
          <Star size={14} className="fill-amber-400 text-amber-400" />
          <span>{Number(provider.rating || 0).toFixed(1)}</span>
          <span className="text-[10px] font-normal text-slate-500">({provider.totalReviews || 0})</span>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
              {provider.user?.name}
            </h2>
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mt-0.5">
              {provider.service}
            </p>
          </div>
        </div>

        {/* Key Info Pills */}
        <div className="mt-4 space-y-2 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <Briefcase size={14} className="text-blue-600 flex-shrink-0" />
            <span>{provider.experience || 0} Years Professional Experience</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-rose-500 flex-shrink-0" />
            <span className="truncate">{provider.address || "Serving Local Area"}</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mt-5 grid grid-cols-2 gap-2 rounded-2xl bg-slate-50 p-3 border border-slate-100 text-center">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Reviews</p>
            <p className="text-base font-bold text-slate-800 mt-0.5">{provider.totalReviews || 0}</p>
          </div>
          <div className="border-l border-slate-200">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Completed Jobs</p>
            <p className="text-base font-bold text-slate-800 mt-0.5">{provider.completedJobs || "0"}</p>
          </div>
        </div>

        {/* Bottom Booking CTA */}
        <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Starting At</p>
            <p className="text-xl font-black text-slate-900">
              ₹{provider.pricePerHour}
              <span className="text-xs font-medium text-slate-500">/hr</span>
            </p>
          </div>

          <button
            onClick={handleBookNow}
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-xs font-bold text-white shadow-md shadow-blue-600/20 transition-all hover:shadow-lg hover:shadow-blue-600/30 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <CalendarPlus size={16} />
            Book Service
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProviderCard;