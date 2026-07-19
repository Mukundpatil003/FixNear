import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  Calendar,
  MapPin,
  Phone,
  User,
  Wrench,
} from "lucide-react";

import { getBookingDetails } from "../../api/customerBookingApi";

const BookingDetails = () => {
  const { bookingId } = useParams();

  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);

  useEffect(() => {
    loadBooking();
  }, []);

  const loadBooking = async () => {
    try {
      const data = await getBookingDetails(bookingId);

      setBooking(data.booking);
    } catch (error) {
      console.log(error);
    }
  };

  if (!booking) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="max-w-5xl mx-auto">

      <button
        onClick={() => navigate(-1)}
        className="mb-8 flex items-center gap-2 text-blue-600"
      >
        <ArrowLeft />
        Back
      </button>

      <h1 className="text-4xl font-bold mb-8">
        Booking Details
      </h1>

      <div className="rounded-3xl bg-white shadow p-8">

        <div className="flex items-center gap-6">

          <img
            src={
              booking.provider?.user?.profileImage ||
              "https://ui-avatars.com/api/?name=Provider"
            }
            className="w-24 h-24 rounded-full object-cover"
          />

          <div>

            <h2 className="text-3xl font-bold">
              {booking.provider?.user?.name}
            </h2>

            <p className="text-gray-500">
              {booking.serviceRequest?.service}
            </p>

          </div>

        </div>

        <hr className="my-8" />

        <div className="grid md:grid-cols-2 gap-8">

          <div>

            <div className="flex gap-3 mb-5">

              <User />

              {booking.provider?.user?.name}

            </div>

            <div className="flex gap-3 mb-5">

              <Phone />

              {booking.provider?.user?.phone}

            </div>

            <div className="flex gap-3 mb-5">

              <Calendar />

              {new Date(
                booking.createdAt
              ).toLocaleDateString()}

            </div>

          </div>

          <div>

            <div className="flex gap-3 mb-5">

              <MapPin />

              {booking.serviceRequest?.address}

            </div>

            <div className="flex gap-3 mb-5">

              <Wrench />

              {booking.serviceRequest?.service}

            </div>

            <div>

              <span className="bg-blue-100 text-blue-700 px-5 py-2 rounded-full">

                {booking.status}

              </span>

            </div>

          </div>

        </div>

        <div className="mt-10">

          <h2 className="text-2xl font-bold mb-4">

            Problem Description

          </h2>

          <p className="text-gray-600">

            {booking.serviceRequest?.description}

          </p>

        </div>

        <div className="mt-10 flex gap-4">

          {/* <button
            onClick={() =>
              navigate(`/track/${booking._id}`)
            }
            className="bg-blue-600 text-white px-6 py-3 rounded-xl"
          >
            Track Provider
          </button> */}

          <a
            href={`tel:${booking.provider?.user?.phone}`}
            className="bg-green-600 text-white px-6 py-3 rounded-xl"
          >
            Call Provider
          </a>

        </div>

      </div>

    </div>
  );
};

export default BookingDetails;