import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createServiceRequest } from "../../api/serviceRequestApi";
import toast from "react-hot-toast";

const ServiceRequest = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const provider = state?.provider;

  const [problem, setProblem] = useState("");
  const [address, setAddress] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!provider) {
      toast.error("Provider not found");
      return;
    }

    if (!problem || !address) {
      toast.error("Please fill all fields");
      return;
    }

    if (!navigator.geolocation) {
      toast.error("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          setLoading(true);

          const data = await createServiceRequest({
            service: provider.service,
            problem,
            address,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });

          if (data.success) {
            toast.success(data.message);

            navigate("/");
          }
        } catch (error) {
          console.log(error);

          toast.error(
            error.response?.data?.message ||
              "Request failed"
          );
        } finally {
          setLoading(false);
        }
      },
      () => {
        toast.error("Unable to get location");
      }
    );
  };

  if (!provider) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h2 className="text-2xl font-bold">
          Provider not found
        </h2>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-slate-100 py-20">

      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-10 shadow-xl">

        <h1 className="text-4xl font-extrabold text-gray-900">
          Request Service
        </h1>

        <p className="mt-2 text-gray-500">
          Send your request to the provider.
        </p>

        {/* Provider */}

        <div className="mt-10 rounded-2xl border bg-slate-50 p-6">

          <h2 className="text-2xl font-bold">
            {provider.user?.name}
          </h2>

          <p className="mt-1 text-blue-600">
            {provider.service}
          </p>

          <p className="mt-2 text-gray-500">
            {provider.address}
          </p>

          <h3 className="mt-3 text-3xl font-bold text-blue-600">
            ₹{provider.pricePerHour}/hr
          </h3>

        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6"
        >

          <div>

            <label className="mb-2 block font-semibold">
              Problem Description
            </label>

            <textarea
              rows={5}
              value={problem}
              onChange={(e) =>
                setProblem(e.target.value)
              }
              placeholder="Describe your problem..."
              className="w-full rounded-2xl border p-4 outline-none focus:border-blue-600"
            />

          </div>

          <div>

            <label className="mb-2 block font-semibold">
              Address
            </label>

            <input
              type="text"
              value={address}
              onChange={(e) =>
                setAddress(e.target.value)
              }
              placeholder="Enter service address"
              className="w-full rounded-2xl border p-4 outline-none focus:border-blue-600"
            />

          </div>

          <button
            disabled={loading}
            className="w-full rounded-2xl bg-blue-600 py-4 text-lg font-semibold text-white transition hover:bg-blue-700"
          >
            {loading
              ? "Sending..."
              : "Submit Request"}
          </button>

        </form>

      </div>

    </section>
  );
};

export default ServiceRequest;