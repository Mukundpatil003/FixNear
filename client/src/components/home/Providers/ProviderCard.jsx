import {
  FaStar,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaBriefcase,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ProviderCard = ({ provider }) => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate("/service-request", {
      state: {
        provider,
      },
    });
  };

  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      transition={{ duration: 0.35 }}
      className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-md transition-all duration-500 hover:shadow-2xl"
    >
      {/* Image */}

      <div className="relative h-60 overflow-hidden bg-gray-100">

        <img
          src={
            provider.profileImage ||
            "https://placehold.co/600x400?text=Provider"
          }
          alt={provider.user?.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Verified */}

        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/95 px-3 py-2 shadow-lg backdrop-blur">

          <FaCheckCircle className="text-sm text-blue-600" />

          <span className="text-xs font-semibold text-gray-700">
            Verified
          </span>

        </div>

        {/* Online */}

        {provider.isAvailable && (
          <div className="absolute right-4 top-4 rounded-full bg-green-500 px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-white shadow-lg">
            ● Online
          </div>
        )}

      </div>

      {/* Content */}

      <div className="space-y-4 p-6">

        {/* Name */}

        <div className="flex items-start justify-between">

          <div>

            <h3 className="text-xl font-bold text-gray-900">
              {provider.user?.name}
            </h3>

            <p className="mt-1 text-sm font-medium text-blue-600">
              {provider.service}
            </p>

          </div>

          <div className="flex items-center gap-1 rounded-full bg-yellow-50 px-3 py-2">

            <FaStar className="text-sm text-yellow-500" />

            <span className="text-sm font-bold text-gray-800">
              {Number(provider.rating).toFixed(1)}
            </span>

          </div>

        </div>

        {/* Experience */}

        <div className="flex items-center gap-2 text-sm text-gray-500">

          <FaBriefcase className="text-blue-600" />

          <span>{provider.experience} Years Experience</span>

        </div>

        {/* Address */}

        <div className="flex items-center gap-2 text-sm text-gray-500">

          <FaMapMarkerAlt className="text-red-500" />

          <span>{provider.address}</span>

        </div>

        {/* Stats */}

        <div className="grid grid-cols-2 gap-3 rounded-2xl bg-gray-50 p-4">

          <div className="text-center">

            <p className="text-xs uppercase tracking-wide text-gray-400">
              Reviews
            </p>

            <h4 className="mt-1 text-lg font-bold text-gray-900">
              {provider.totalReviews}
            </h4>

          </div>

          <div className="border-l border-gray-200 text-center">

            <p className="text-xs uppercase tracking-wide text-gray-400">
              Jobs
            </p>

            <h4 className="mt-1 text-lg font-bold text-gray-900">
              0+
            </h4>

          </div>

        </div>

        {/* Price */}

        <div className="flex items-center justify-between pt-2">

          <div>

            <p className="text-xs uppercase tracking-widest text-gray-400">
              Starting From
            </p>

            <h2 className="mt-1 text-3xl font-extrabold text-blue-600">
              ₹{provider.pricePerHour}/hr
            </h2>

          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleBookNow}
            className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-blue-300"
          >
            Book Now
          </motion.button>

        </div>

      </div>

    </motion.div>
  );
};

export default ProviderCard;