import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { becomeProvider } from "../../api/providerApi";
import useAuth from "../../hooks/useAuth";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import CustomSelect from "../../components/ui/CustomSelect";

import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaClock,
  FaShieldAlt,
  FaCheckCircle
} from "react-icons/fa";
import { FiArrowRight, FiCheckCircle as FiCheck } from "react-icons/fi";

const BecomeProvider = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    service: "",
    experience: "",
    phone: "",
    address: "",
    latitude: "",
    longitude: "",
    pricePerHour: 500,
    description: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      return toast.error("Geolocation not supported by browser");
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );

          const data = await res.json();

          setFormData((prev) => ({
            ...prev,
            latitude,
            longitude,
            address: data.display_name || "",
          }));

          toast.success("Location coordinates locked!");
        } catch (err) {
          toast.error("Failed to fetch reverse address");
        }
      },
      (error) => {
        console.log(error);
        toast.error("Location permission denied");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.service) {
      return toast.error("Please select a service category");
    }
    if (!formData.experience) {
      return toast.error("Please enter years of experience");
    }
    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      return toast.error("Enter a valid 10-digit mobile number");
    }
    if (Number(formData.experience) <= 0) {
      return toast.error("Experience must be greater than 0");
    }
    if (!formData.address) {
      return toast.error("Please enter your service address");
    }
    if (Number(formData.pricePerHour) < 100) {
      return toast.error("Minimum price rate is ₹100/hr");
    }
    if (formData.description.length < 20) {
      return toast.error("Description must contain at least 20 characters");
    }
    if (!formData.latitude || !formData.longitude) {
      return toast.error("Please click GPS icon to capture your location");
    }

    try {
      setLoading(true);
      const data = await becomeProvider(formData);

      if (data.success) {
        setSuccess(true);
        toast.success("Provider account setup successful!");

        setTimeout(() => {
          login(data.user);
          navigate("/provider/profile");
        }, 1200);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/70">
      <Navbar />

      <section className="py-12 lg:py-16">
        {loading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-sm">
            <div className="rounded-3xl bg-white p-8 text-center shadow-2xl">
              <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
              <p className="mt-4 text-xs font-bold text-slate-800">
                Setting Up Provider Account...
              </p>
            </div>
          </div>
        )}

        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-12 px-4 sm:px-6 lg:px-8 lg:grid-cols-12">
          {/* Left Feature Value Banner */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600 uppercase tracking-wider">
              <FiCheck className="text-sm" />
              Join Professional Partner Network
            </div>

            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 leading-[1.15]">
              Grow Your Service Business With{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                FixNear
              </span>
            </h1>

            <p className="text-sm leading-relaxed text-slate-600">
              Get direct customer leads, set your own hourly rates, manage requests with real-time GPS tracking, and receive instant payments.
            </p>

            {/* Benefit Items */}
            <div className="space-y-6 pt-4">
              <div className="flex gap-4 items-start">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <FaMoneyBillWave className="text-xl" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">High Earning Potential</h3>
                  <p className="text-xs text-slate-500 mt-1">Earn up to ₹50,000/month with zero upfront registration fees.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                  <FaClock className="text-xl" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Total Hours Flexibility</h3>
                  <p className="text-xs text-slate-500 mt-1">Toggle your Online / Offline availability switch whenever you want to work.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                  <FaShieldAlt className="text-xl" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">100% Genuine Local Bookings</h3>
                  <p className="text-xs text-slate-500 mt-1">Connect with verified customers in your immediate zipcode radius.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm space-y-6"
          >
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Create Provider Profile
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Fill in your skills and location details to start accepting jobs.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Service */}
              <div>
                <label className="mb-1.5 block font-bold uppercase tracking-wider text-slate-700">
                  Select Service Specialty *
                </label>
                <CustomSelect
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  placeholder="Choose your primary skill"
                  options={[
                    "Electrician",
                    "Plumber",
                    "Cleaner",
                    "Carpenter",
                    "Painter",
                    "AC Technician",
                  ]}
                />
              </div>

              {/* Experience */}
              <div>
                <label className="mb-1.5 block font-bold uppercase tracking-wider text-slate-700">
                  Years of Experience *
                </label>
                <input
                  type="number"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="e.g. 5"
                  className="w-full rounded-2xl border border-slate-200/80 bg-slate-50/50 p-3.5 font-semibold text-slate-800 outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="mb-1.5 block font-bold uppercase tracking-wider text-slate-700">
                  Mobile Number *
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  className="w-full rounded-2xl border border-slate-200/80 bg-slate-50/50 p-3.5 font-semibold text-slate-800 outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
                />
              </div>

              {/* Address with GPS */}
              <div>
                <label className="mb-1.5 block font-bold uppercase tracking-wider text-slate-700">
                  Service Base Address & GPS *
                </label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter address or click location pin ->"
                    className="w-full rounded-2xl border border-slate-200/80 bg-slate-50/50 p-3.5 pr-12 font-semibold text-slate-800 outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
                  />
                  <button
                    type="button"
                    onClick={getCurrentLocation}
                    className="absolute right-3.5 text-rose-500 hover:text-rose-600 p-1"
                    title="Detect Current Location"
                  >
                    <FaMapMarkerAlt className="text-lg" />
                  </button>
                </div>
              </div>

              {/* Hourly Price Range */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="font-bold uppercase tracking-wider text-slate-700">
                    Hourly Service Rate (₹)
                  </label>
                  <span className="font-black text-blue-600 text-sm">
                    ₹{formData.pricePerHour}/hr
                  </span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="5000"
                  step="50"
                  name="pricePerHour"
                  value={formData.pricePerHour}
                  onChange={handleChange}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              {/* Description */}
              <div>
                <label className="mb-1.5 block font-bold uppercase tracking-wider text-slate-700">
                  Bio / Skills Overview *
                </label>
                <textarea
                  rows={4}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your skills, qualifications, tools and availability..."
                  className="w-full rounded-2xl border border-slate-200/80 bg-slate-50/50 p-3.5 font-semibold text-slate-800 outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="flex h-13 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:shadow-xl disabled:opacity-70 cursor-pointer mt-4"
              >
                {loading ? "Registering Profile..." : "Submit & Start Receiving Jobs"}
                {!loading && <FiArrowRight className="text-base" />}
              </button>

              {success && (
                <div className="mt-4 flex items-center justify-center gap-2 rounded-2xl bg-emerald-50 p-3 text-emerald-700 font-bold">
                  <FaCheckCircle className="text-base" />
                  Provider account created successfully!
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BecomeProvider;