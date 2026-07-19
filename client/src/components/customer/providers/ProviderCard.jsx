import {
  Star,
  Briefcase,
  CalendarPlus,
  MapPin,
} from "lucide-react";
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
          provider.user?.name || "User"
        )}&background=4F46E5&color=fff&size=400`;

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

  const handleViewProfile = () => {
    navigate(`/provider/${provider._id}`);
  };

  return (
    <div className="rounded-3xl bg-white p-6 shadow-lg border border-gray-100">

      {/* Top */}

      <div className="flex items-start justify-between">

        <div className="flex gap-5">

          <img
            src={image}
            alt={provider.user?.name}
            className="h-20 w-20 rounded-2xl object-cover"
          />

          <div>

            <h2 className="text-2xl font-bold">
              {provider.user?.name}
            </h2>

            <p className="text-gray-500 mt-1">
              {provider.service}
            </p>

            <div className="mt-2 flex items-center gap-2">

              <Star
                size={18}
                className="fill-yellow-400 text-yellow-400"
              />

              <span>
                {Number(provider.rating || 0).toFixed(1)}
              </span>

            </div>

          </div>

        </div>

        <span
          className={`rounded-full px-4 py-2 text-sm font-semibold ${
            provider.isAvailable
              ? "bg-green-100 text-green-700"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {provider.isAvailable ? "Available" : "Offline"}
        </span>

      </div>

      {/* Details */}

      <div className="mt-6 space-y-3">

        <div className="flex items-center gap-3 text-gray-600">

          <MapPin size={18} />

          <span>
            {provider.distance
              ? `${provider.distance} km away`
              : "Nearby"}
          </span>

        </div>

        <div className="flex items-center gap-3 text-gray-600">

          <Briefcase size={18} />

          <span>
            {provider.experience} Years Experience
          </span>

        </div>

      </div>

      {/* Price */}

      <div className="mt-6 flex items-center justify-between">

        <div>

          <p className="text-gray-500">
            Starting From
          </p>

          <h3 className="text-3xl font-bold text-indigo-600">
            ₹{provider.pricePerHour}/hr
          </h3>

        </div>

        <div className="flex gap-3">

          <button
            onClick={handleViewProfile}
            className="rounded-xl border border-gray-300 px-5 py-3 hover:bg-gray-100"
          >
            View Profile
          </button>

          <button
            onClick={handleBookNow}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-white hover:bg-indigo-700"
          >
            <CalendarPlus size={18} />
            Book Now
          </button>

        </div>

      </div>

    </div>
  );
};

export default ProviderCard;