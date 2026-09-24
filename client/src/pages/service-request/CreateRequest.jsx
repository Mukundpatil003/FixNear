import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FiCheckCircle, FiStar, FiMapPin, FiUploadCloud, FiShield, FiClock, FiArrowLeft, FiAlertCircle } from "react-icons/fi";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import { uploadImage } from "../../api/uploadApi";
import { createServiceRequest } from "../../api/serviceRequestApi";

const CreateRequest = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-lg max-w-md">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-500 mb-4">
            <FiAlertCircle className="text-2xl" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Direct Access Not Allowed</h2>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            Please select a provider or service from the search or providers page to request a service.
          </p>
          <Link
            to="/providers"
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 text-xs font-bold text-white shadow-md hover:bg-blue-700 transition-colors"
          >
            <FiArrowLeft />
            Browse Providers
          </Link>
        </div>
      </div>
    );
  }

  const { provider, service, latitude, longitude } = state || {};

  const [problem, setProblem] = useState("");
  const [address, setAddress] = useState(provider?.address || "");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    try {
      if (!problem) {
        return toast.error("Problem description is required");
      }
      if (!address) {
        return toast.error("Service address is required");
      }

      setLoading(true);
      let imageUrl = "";

      if (image) {
        const upload = await uploadImage(image);
        imageUrl = upload.image;
      }

      const response = await createServiceRequest({
        provider: provider._id,
        service,
        problem,
        address,
        latitude,
        longitude,
        image: imageUrl,
      });

      if (response.success) {
        toast.success("Service request created successfully!");
        navigate("/customer/my-requests");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to create service request"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/70">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-600 mb-6 transition-colors"
        >
          <FiArrowLeft /> Back to Provider Details
        </button>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Provider Card Overview */}
          <div className="lg:col-span-4 space-y-6">
            <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm">
              <div className="relative h-64 bg-slate-100">
                <img
                  src={
                    provider?.user?.profileImage ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      provider?.user?.name || "Provider"
                    )}&background=2563eb&color=fff&size=400`
                  }
                  alt={provider?.user?.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-slate-800 shadow-md backdrop-blur-md flex items-center gap-1.5">
                  <FiCheckCircle className="text-blue-600" />
                  Verified Pro
                </div>
                <div className="absolute bottom-4 right-4 rounded-full bg-emerald-500/90 px-3 py-1 text-xs font-bold text-white shadow-md backdrop-blur-md flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse"></span>
                  Available Now
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">{provider?.user?.name}</h2>
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mt-0.5">{provider?.service}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 rounded-2xl bg-slate-50 p-3 border border-slate-100 text-center">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Experience</p>
                    <p className="text-sm font-bold text-slate-800 mt-0.5">{provider?.experience || 0} Years</p>
                  </div>
                  <div className="border-l border-slate-200">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Hourly Rate</p>
                    <p className="text-sm font-bold text-blue-600 mt-0.5">₹{provider?.pricePerHour}/hr</p>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-3">
                  <div className="flex items-center gap-2">
                    <FiMapPin className="text-rose-500 flex-shrink-0" />
                    <span className="truncate">{provider?.address || "Local Service Area"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiStar className="text-amber-400 fill-amber-400 flex-shrink-0" />
                    <span className="font-bold text-slate-800">{provider?.rating || "5.0"} Rating</span>
                    <span className="text-slate-400">({provider?.totalReviews || 0} reviews)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Guarantee Badge */}
            <div className="rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-500/30">
                  <FiShield className="text-lg" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">FixNear Service Guarantee</h3>
                  <p className="text-xs text-slate-500 mt-0.5">100% verified technician & transparent pricing</p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Request Form */}
          <div className="lg:col-span-8 space-y-6">
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm space-y-6">
              <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight sm:text-3xl">
                  Service Request Form
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Describe your problem and provide location details for the technician.
                </p>
              </div>

              {/* Problem Description */}
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Problem Description *
                </label>
                <textarea
                  rows={4}
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  placeholder="Describe your issue in detail (e.g. Kitchen tap leaking, AC not cooling, spark in socket...)"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 p-4 text-xs font-semibold text-slate-800 outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
                />
              </div>

              {/* Service Address */}
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Service Address *
                </label>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 focus-within:border-blue-600 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/10 transition-all">
                  <FiMapPin className="text-rose-500 text-lg flex-shrink-0" />
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter complete address with landmark"
                    className="w-full bg-transparent text-xs font-semibold text-slate-800 outline-none"
                  />
                </div>
              </div>

              {/* Upload Image */}
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Upload Photo of Problem (Optional)
                </label>

                <div className="relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-6 text-center hover:border-blue-500 transition-colors">
                  <FiUploadCloud className="text-3xl text-blue-600 mb-2" />
                  <p className="text-xs font-bold text-slate-700">Click to upload photo</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">PNG, JPG up to 5MB</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImage}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>

                {preview && (
                  <div className="mt-4 relative rounded-2xl overflow-hidden border border-slate-200 max-h-56">
                    <img src={preview} alt="Preview" className="w-full h-48 object-cover" />
                  </div>
                )}
              </div>
            </div>

            {/* Cost Summary & Confirm */}
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm space-y-6">
              <h2 className="text-lg font-bold text-slate-900">Booking Summary</h2>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Requested Service</span>
                  <span className="font-bold text-slate-900">{service}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Provider Hourly Rate</span>
                  <span className="font-bold text-slate-900">₹{provider?.pricePerHour}/hr</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Platform Fee</span>
                  <span className="font-bold text-slate-900">₹50</span>
                </div>

                <div className="border-t border-slate-100 pt-3 flex justify-between text-sm font-black text-slate-900">
                  <span>Total Estimated Starting Cost</span>
                  <span className="text-blue-600">₹{(provider?.pricePerHour || 0) + 50}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 py-4 text-xs font-extrabold text-white shadow-lg shadow-blue-600/25 transition-all hover:shadow-xl hover:shadow-blue-600/30 disabled:opacity-70 cursor-pointer"
              >
                {loading ? "Creating Request..." : "Confirm & Send Service Request"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CreateRequest;