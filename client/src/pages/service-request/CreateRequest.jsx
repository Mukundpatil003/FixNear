import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import { uploadImage } from "../../api/uploadApi";
import { createServiceRequest } from "../../api/serviceRequestApi";

const CreateRequest = () => {

  const navigate = useNavigate();

  const { state } = useLocation();

   if (!state) {
    return (
      <div className="flex h-screen items-center justify-center text-2xl font-bold">
        Invalid Request
      </div>
    );
  }

  const {
    provider,
    service,
    latitude,
    longitude,
  } = state || {};

  // ===========================
  // Form States
  // ===========================

  const [problem, setProblem] = useState("");

const [address,setAddress]=useState(
provider?.address || ""
);
  const [image, setImage] = useState(null);

  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);

  // ===========================
  // Upload Preview
  // ===========================

  const handleImage = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setImage(file);

    setPreview(URL.createObjectURL(file));

  };

  // ===========================
  // Submit Request
  // ===========================

  const handleSubmit = async () => {

    try {

      if (!problem) {

        return toast.error("Problem is required");

      }

      if (!address) {

        return toast.error("Address is required");

      }

      setLoading(true);

      let imageUrl = "";

      // Upload Image

      if (image) {

        const upload =
          await uploadImage(image);

imageUrl = upload.image;
      }

      // Create Request

      const response =
await createServiceRequest({

  provider: provider._id,

  service,

  problem,

  address,

  latitude,

  longitude,

  image: imageUrl,

});

 if (response.success) {

  toast.success("Service Request Created Successfully");

  navigate("/customer/my-requests");

}

    } catch (error) {

      toast.error(

        error.response?.data?.message ||

        "Something went wrong"

      );

    } finally {

      setLoading(false);

    }
    

  };

  return (
  <>
    <Navbar />

    <div className="min-h-screen bg-slate-50 py-12">

      <div className="mx-auto grid max-w-7xl gap-10 px-8 lg:grid-cols-[380px_1fr]">

        {/* ==========================
            Provider Card
        =========================== */}

        <div className="sticky top-24 h-fit">

          <div className="overflow-hidden rounded-3xl bg-white shadow-xl">

            {/* Provider Image */}

            <div className="relative h-72">

              <img
                src={
provider?.user?.profileImage ||
"https://placehold.co/600x400?text=Provider"
}
                alt={provider?.user?.name}
                className="h-full w-full object-cover"
              />

              <div className="absolute left-5 top-5 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow">

                ✔ Verified Professional

              </div>

              <div className="absolute bottom-5 right-5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-green-600 shadow-lg">

                🟢 Available Now

              </div>

            </div>

            {/* Provider Details */}

            <div className="space-y-6 p-6">

              <div className="flex items-start justify-between">

                <div>

                  <h2 className="text-3xl font-bold text-gray-900">

                    {provider?.user?.name}

                  </h2>

                  <p className="mt-2 text-lg text-blue-600">

                    {provider?.service}

                  </p>

                </div>

                <div className="rounded-full bg-blue-50 px-4 py-2 font-bold text-blue-700">

                  ⭐ {Number(provider?.rating || 0).toFixed(1)}

                </div>

              </div>

              <hr />

              {/* Experience */}

              <div className="grid grid-cols-2 gap-5">

                <div>

                  <p className="text-xs uppercase text-gray-400">

                    Experience

                  </p>

                  <h3 className="mt-2 text-xl font-bold">

                    {provider?.experience} Years

                  </h3>

                </div>

                <div>

                  <p className="text-xs uppercase text-gray-400">

                    Hourly Rate

                  </p>

                  <h3 className="mt-2 text-xl font-bold text-blue-600">

                    ₹{provider?.pricePerHour}/hr

                  </h3>

                </div>

              </div>

              <hr />

              {/* Address */}

              <div>

                <p className="text-xs uppercase text-gray-400">

                  Address

                </p>

                <p className="mt-2 text-gray-600">

                  📍 {provider?.address}

                </p>

              </div>

              <hr />

              {/* Reviews */}

              <div className="grid grid-cols-2 gap-5">

                <div>

                  <p className="text-xs uppercase text-gray-400">

                    Reviews

                  </p>

                  <h3 className="mt-2 text-xl font-bold">

                    {provider?.totalReviews}

                  </h3>

                </div>

                <div>

                  <p className="text-xs uppercase text-gray-400">

                    Rating

                  </p>

                  <h3 className="mt-2 text-xl font-bold">

                    ⭐ {provider?.rating}

                  </h3>

                </div>

              </div>

            </div>

          </div>

          {/* Guarantee Card */}

          <div className="mt-6 rounded-3xl bg-gradient-to-r from-blue-50 to-white p-6 shadow">

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-2xl">

                🛡️

              </div>

              <div>

                <h3 className="font-bold">

                  FixNear Guarantee

                </h3>

                <p className="text-sm text-gray-500">

                  Verified Professional with Quality Service Guarantee.

                </p>

              </div>

            </div>

          </div>

        </div>
                {/* ==========================
            Booking Form
        =========================== */}

        <div className="space-y-8">

          <div className="rounded-3xl bg-white p-8 shadow-xl">

            <h1 className="text-4xl font-bold text-gray-900">
              Create Service Request
            </h1>

            <p className="mt-2 text-gray-500">
              Describe your problem and upload an image if available.
            </p>

            {/* Problem */}

            <div className="mt-8">

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Problem Description *
              </label>

              <textarea
                rows={6}
                value={problem}
                onChange={(e) =>
                  setProblem(e.target.value)
                }
                placeholder="Example: Kitchen sink is leaking continuously..."
                className="w-full rounded-2xl border border-gray-300 p-4 outline-none transition focus:border-blue-500"
              />

            </div>

            {/* Upload */}

            <div className="mt-8">

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Upload Image (Optional)
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="w-full rounded-2xl border border-gray-300 p-3"
              />

              {preview && (

                <div className="mt-5">

                  <img
                    src={preview}
                    alt="Preview"
                    className="h-56 w-full rounded-2xl object-cover shadow"
                  />

                </div>

              )}

            </div>

            {/* Address */}

            <div className="mt-8">

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Service Address *
              </label>

              <input
                type="text"
                value={address}
                onChange={(e) =>
                  setAddress(e.target.value)
                }
                placeholder="Enter complete address"
                className="w-full rounded-2xl border border-gray-300 p-4 outline-none transition focus:border-blue-500"
              />

            </div>

          </div>

          {/* ==========================
              Estimate Summary
          =========================== */}

          <div className="rounded-3xl bg-white p-8 shadow-xl">

            <h2 className="text-2xl font-bold text-gray-900">
              Booking Summary
            </h2>

            <div className="mt-8 space-y-5">

              <div className="flex justify-between">

                <span className="text-gray-500">
                  Service
                </span>

                <span className="font-semibold">
                  {service}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-500">
                  Hourly Rate
                </span>

                <span className="font-semibold">
                  ₹{provider?.pricePerHour}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-500">
                  Platform Fee
                </span>

                <span className="font-semibold">
                  ₹50
                </span>

              </div>

              <hr />

              <div className="flex justify-between text-xl font-bold">

                <span>Total Estimate</span>

                <span className="text-blue-600">
                  ₹
                  {(provider?.pricePerHour || 0) + 50}
                </span>

              </div>

            </div>

            {/* Button */}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="mt-10 w-full rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 py-4 text-lg font-semibold text-white transition hover:scale-[1.02]"
            >
              {loading
                ? "Creating Request..."
                : "Confirm Booking"}
            </button>

          </div>

        </div>
     

    </div>

  </div>
        
  {/* Existing Website Footer */}

  <Footer />

</>

);
};

export default CreateRequest;