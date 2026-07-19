import { Star, Briefcase, Eye } from "lucide-react";

const ProviderCard = ({ provider }) => {

  const image =
    provider.user?.profileImage &&
    provider.user.profileImage !== ""
      ? provider.user.profileImage
      : `https://ui-avatars.com/api/?name=${encodeURIComponent(
          provider.user?.name || "User"
        )}&background=4F46E5&color=fff&size=400`;

  return (
    <div className="group overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

      {/* Image */}

      <div className="relative">

        <img
          src={image}
          alt={provider.user?.name}
          className="h-64 w-full object-cover"
        />

        {/* Rating */}

        <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-lg">

          <Star
            size={16}
            className="fill-yellow-400 text-yellow-400"
          />

          <span className="font-bold">
            {Number(provider.rating).toFixed(1)}
          </span>

        </div>

        {/* Online / Offline */}

        <div
          className={`absolute bottom-4 left-4 rounded-full px-4 py-2 text-sm font-semibold text-white ${
            provider.isAvailable
              ? "bg-green-500"
              : "bg-gray-500"
          }`}
        >
          ● {provider.isAvailable ? "Online" : "Offline"}
        </div>

      </div>

      {/* Content */}

      <div className="p-6">

        <h2 className="text-3xl font-bold">
          {provider.user?.name}
        </h2>

        <p className="mt-1 text-gray-500">
          {provider.service}
        </p>

        {/* Experience */}

        <div className="mt-5 flex items-center justify-between">

          <div className="flex items-center gap-2 text-gray-500">

            <Briefcase size={18} />

            {provider.experience} Years

          </div>

          <div className="font-bold text-indigo-600">

            ₹{provider.pricePerHour}/hr

          </div>

        </div>

        {/* Reviews */}

        <p className="mt-3 text-sm text-gray-400">

          {provider.totalReviews} Reviews

        </p>

        {/* Button */}

        <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-full border-2 border-indigo-600 py-3 font-semibold text-indigo-600 transition-all duration-300 hover:bg-indigo-600 hover:text-white">

          <Eye size={18} />

          View Profile

        </button>

      </div>

    </div>
  );
};

export default ProviderCard;