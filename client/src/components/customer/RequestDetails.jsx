import { FaUserCircle, FaMapMarkerAlt } from "react-icons/fa";
import Timeline from "./Timeline";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ReviewModal from "./ReviewModal";


const RequestDetails = ({ request }) => {
  const [showReview, setShowReview] = useState(false);

const navigate = useNavigate();


  if (!request) {
    return (
      <div className="sticky top-8 rounded-3xl bg-white p-8 shadow-lg">
        <h2 className="text-2xl font-bold">
          Request Details
        </h2>

        <p className="mt-10 text-center text-gray-500">
          Select a request to view details.
        </p>
      </div>
    );
  }

  const provider = request.assignedProvider;

  return (
    <div className="sticky top-8 rounded-3xl bg-white p-6 shadow-lg">

      <h2 className="mb-6 text-2xl font-bold">
        Request Details
      </h2>

<div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white shadow-xl">

  <div className="flex items-center justify-between">

    <div>

      <p className="text-sm opacity-80">
        Service
      </p>

      <h2 className="mt-1 text-3xl font-bold">
        {request.service}
      </h2>

    </div>

    <span
      className={`rounded-full px-4 py-2 text-sm font-semibold ${
        request.status === "Completed"
          ? "bg-green-500"
          : request.status === "Pending"
          ? "bg-yellow-500"
          : "bg-white text-blue-700"
      }`}
    >
      {request.status}
    </span>

  </div>

  <p className="mt-5 text-blue-100">
    {request.problem}
  </p>

</div>
<div className="mt-6 rounded-2xl bg-slate-50 p-5">

<div className="flex justify-between">

<div>

<p className="text-gray-500">
Booking ID
</p>

<h3 className="font-bold">
#{request._id.slice(-8)}
</h3>

</div>

<div>

<p className="text-gray-500">
Created
</p>

<h3 className="font-bold">
{new Date(request.createdAt).toLocaleDateString()}
</h3>

</div>

</div>

</div>
      <div className="mt-8">

<h3 className="mb-5 text-xl font-bold">
Progress
</h3>

<Timeline
status={request.status}
/>

</div>

<div className="mt-8 rounded-3xl border bg-white p-5 shadow-sm">

<div className="flex items-center gap-5">

<img
  src={
    provider?.user?.profileImage ||
    provider?.profileImage ||
    "https://placehold.co/100x100?text=👨‍🔧"
  }
  alt="Provider"
  className="h-20 w-20 rounded-full border-4 border-blue-100 object-cover"
/>

<div>

<h2 className="text-2xl font-bold">

{provider?.user?.name}

</h2>

<p className="text-gray-500">

{provider?.service}

</p>

<div className="mt-2 flex gap-2">

<span className="rounded-full bg-green-100 px-3 py-1 text-green-700">

⭐ {provider?.rating || 0}

</span>

<span className="rounded-full bg-blue-100 px-3 py-1 text-blue-700">

{provider?.experience} Years

</span>

</div>

</div>

</div>

</div>
<div className="mt-6 grid grid-cols-3 gap-3">

<a
  href={`tel:${provider?.phone}`}
  className="rounded-xl bg-green-600 py-3 text-center font-semibold text-white hover:bg-green-700"
>
  📞 Call
</a>



<button
  onClick={() =>
    navigate(`/track/${request._id}`)
  }
  className="rounded-xl bg-blue-600 py-3 font-semibold text-white"
>
📍 Track
</button>

</div>

<div className="mt-8 rounded-3xl bg-slate-50 p-6">

  <h2 className="text-xl font-bold">
    Payment
  </h2>

  <div className="mt-5 flex justify-between">

    <span>
      Estimated Price
    </span>

    <span className="font-bold">
      ₹ {provider?.pricePerHour}/hr
    </span>

  </div>

  <div className="mt-3 flex justify-between">

    <span>
      Status
    </span>

    <span className="font-bold text-green-600">
      Pending
    </span>

  </div>

</div>
{request.status === "Completed" && request.booking && (

<button
  onClick={() => setShowReview(true)}
  className="mt-8 w-full rounded-xl bg-yellow-500 py-4 font-semibold text-white"
>
  ⭐⭐⭐⭐⭐ Rate Provider
</button>

)}
{showReview && (
 <ReviewModal
  bookingId={request.booking?._id}
  onClose={() => setShowReview(false)}
/>
)}

</div>
);
};

export default RequestDetails;