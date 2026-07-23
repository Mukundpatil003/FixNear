import {
  Clock3,
  MapPinned,
  Star,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ActiveBookingCard = ({ booking }) => {
const navigate = useNavigate();
  if (!booking) {

    return (

      <div className="rounded-[32px] bg-white p-8 shadow-sm">

        <h2 className="text-3xl font-bold">
          Active Booking
        </h2>

        <div className="flex h-72 items-center justify-center">

          <p className="text-xl text-gray-500">
            No Active Booking
          </p>

        </div>

      </div>

    );

  }

  const provider = booking.provider;

  const request = booking.serviceRequest;

  return (

    <div className="rounded-[32px] bg-gradient-to-br from-[#4F6EF7] to-[#3248D8] p-8 text-white shadow-xl">

      {/* Header */}

      <div className="flex items-center justify-between">

        <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">

          {booking.status}

        </span>

        <div className="flex items-center gap-2">

          <Clock3 size={20} />

          <span className="text-2xl font-bold">

            Live

          </span>

        </div>

      </div>

      {/* Service */}

      <div className="mt-10">

        <h2 className="text-5xl font-bold">

          {request.service}

        </h2>

        <p className="mt-3 text-white/80">

          {request.problem}

        </p>

        <p className="mt-2 flex items-center gap-2 text-white/70">

          <MapPinned size={18} />

          {request.address}

        </p>

      </div>

      <hr className="my-8 border-white/20" />

      {/* Provider */}

      <div className="flex items-center gap-5">

        <img
          src={provider.user.profileImage}
          alt=""
          className="h-20 w-20 rounded-full border-4 border-white object-cover"
        />

        <div>

          <h3 className="text-2xl font-bold">

            {provider.user.name}

          </h3>

          <p className="text-white/70">

            {provider.service}

          </p>

          <div className="mt-2 flex items-center gap-2">

            <Star
              size={18}
              fill="white"
            />

            <span>

              {provider.rating}

            </span>

          </div>

        </div>

      </div>

     <button
  onClick={() => navigate(`/track/${booking._id}`)}
  className="mt-8 w-full rounded-full bg-white py-4 text-xl font-semibold text-[#3654E8] hover:bg-gray-100 transition"
>
  Track Live
</button>

    </div>

  );

};

export default ActiveBookingCard;