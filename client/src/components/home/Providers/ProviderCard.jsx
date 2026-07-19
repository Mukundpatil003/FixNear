import {
  Star,
  MapPin,
  Briefcase,
  CalendarPlus,
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
  provider.user?.profileImage &&
  provider.user.profileImage !== ""
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
  <div className="group overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-lg transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl">
    {/* Image */}

    <div className="relative h-64 overflow-hidden">

      <img
        src={image}
        alt={provider.user?.name}
        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
      />

      {/* Verified */}

      <div className="absolute left-5 top-5 rounded-full bg-white/95 px-4 py-2 shadow-lg">

        <div className="flex items-center gap-2">

  <Star
    size={16}
    className="fill-blue-600 text-blue-600"
  />

  <span className="font-semibold text-slate-800">
    Verified
  </span>

</div>
      </div>

      {/* Online */}

      <div
        className={`absolute right-5 top-5 rounded-full px-4 py-2 font-semibold text-white shadow-lg animate-pulse ${
          provider.isAvailable
            ? "bg-emerald-500"
            : "bg-gray-500"
        }`}
      >
        ● {provider.isAvailable ? "ONLINE" : "OFFLINE"}
      </div>

      {/* Rating */}

      <div className="absolute bottom-5 right-5 rounded-full bg-white px-4 py-2 shadow-lg">

       <div className="flex items-center gap-2">

  <Star
    size={16}
    className="fill-yellow-400 text-yellow-400"
  />

  <span className="font-bold">
    {Number(provider.rating || 0).toFixed(1)}
  </span>

</div>

      </div>

    </div>

    {/* Content */}

    <div className="p-7">

      <h2 className="text-3xl font-bold text-slate-900">

        {provider.user?.name}

      </h2>

      <p className="mt-2 font-medium text-indigo-600">

        {provider.service}

      </p>

      {/* Info */}

      <div className="mt-6 space-y-4">

        <div className="flex items-center gap-3 text-slate-600">

          <Briefcase
            className="text-indigo-600"
            size={20}
          />

          {provider.experience} Years Experience

        </div>

        <div className="flex items-center gap-3 text-slate-600">

          <MapPin
            className="text-red-500"
            size={20}
          />

          {provider.address || "Nearby"}

        </div>

      </div>

      {/* Stats */}

      <div className="mt-7 grid grid-cols-2 overflow-hidden rounded-2xl bg-slate-50">

        <div className="border-r p-5 text-center">

          <p className="text-sm text-gray-400">

            REVIEWS

          </p>

          <h3 className="mt-2 text-2xl font-bold">

            {provider.totalReviews || 0}

          </h3>

        </div>

        <div className="p-5 text-center">

          <p className="text-sm text-gray-400">

            JOBS

          </p>

          <h3 className="mt-2 text-2xl font-bold">

            {provider.completedJobs || "0+"}

          </h3>

        </div>

      </div>

      {/* Bottom */}

      <div className="mt-8 flex items-end justify-between">

        <div>

          <p className="text-sm uppercase tracking-wide text-gray-400">

            Starting From

          </p>

          <h2 className="mt-2 text-4xl font-black text-indigo-600">

            ₹{provider.pricePerHour}/hr

          </h2>

        </div>

        <button
          onClick={handleBookNow}
         className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-indigo-400/40"
        >
          <CalendarPlus size={20} />

          Book Now
        </button>

      </div>

    </div>

  </div>
);
};

export default ProviderCard;