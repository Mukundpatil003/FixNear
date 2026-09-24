import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiUserCheck
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { registerUser } from "../../api/authApi";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "customer",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const { name, email, phone, password, confirmPassword } = formData;

    if (!name || !email || !phone || !password || !confirmPassword) {
      return toast.error("Please fill all required fields");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);

      const response = await registerUser({
        name,
        email,
        phone,
        password,
        role: "customer",
      });

      toast.success(response.message || "Account created successfully! Please log in.");
      navigate("/login");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="flex w-full items-center justify-center bg-white px-6 py-10 lg:px-12"
    >
      <div className="w-full max-w-[500px]">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600">
            <FiUserCheck className="text-sm" />
            Free Customer Registration
          </div>
          <h1 className="text-3xl font-black text-slate-900 sm:text-4xl tracking-tight">
            Create Free Account
          </h1>
          <p className="text-sm text-slate-500">
            Join thousands of customers booking local services on demand.
          </p>
        </div>

        <form onSubmit={handleRegister} className="mt-7 space-y-4">
          {/* Full Name */}
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
              Full Name
            </label>
            <div className="flex h-12 items-center rounded-2xl border border-slate-200 bg-slate-50/50 px-4 transition-all focus-within:border-blue-600 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/10">
              <FiUser className="text-slate-400 text-base flex-shrink-0" />
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                className="ml-3 w-full bg-transparent text-sm font-semibold text-slate-800 outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
              Email Address
            </label>
            <div className="flex h-12 items-center rounded-2xl border border-slate-200 bg-slate-50/50 px-4 transition-all focus-within:border-blue-600 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/10">
              <FiMail className="text-slate-400 text-base flex-shrink-0" />
              <input
                type="email"
                name="email"
                placeholder="example@gmail.com"
                value={formData.email}
                onChange={handleChange}
                className="ml-3 w-full bg-transparent text-sm font-semibold text-slate-800 outline-none"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
              Mobile Phone
            </label>
            <div className="flex h-12 items-center rounded-2xl border border-slate-200 bg-slate-50/50 px-4 transition-all focus-within:border-blue-600 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/10">
              <FiPhone className="text-slate-400 text-base flex-shrink-0" />
              <input
                type="tel"
                name="phone"
                placeholder="+91 9876543210"
                value={formData.phone}
                onChange={handleChange}
                className="ml-3 w-full bg-transparent text-sm font-semibold text-slate-800 outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
              Password
            </label>
            <div className="flex h-12 items-center rounded-2xl border border-slate-200 bg-slate-50/50 px-4 transition-all focus-within:border-blue-600 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/10">
              <FiLock className="text-slate-400 text-base flex-shrink-0" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="ml-3 w-full bg-transparent text-sm font-semibold text-slate-800 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-400 p-1"
              >
                {showPassword ? <FiEyeOff className="text-base" /> : <FiEye className="text-base" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
              Confirm Password
            </label>
            <div className="flex h-12 items-center rounded-2xl border border-slate-200 bg-slate-50/50 px-4 transition-all focus-within:border-blue-600 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/10">
              <FiLock className="text-slate-400 text-base flex-shrink-0" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="ml-3 w-full bg-transparent text-sm font-semibold text-slate-800 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="text-slate-400 p-1"
              >
                {showConfirmPassword ? <FiEyeOff className="text-base" /> : <FiEye className="text-base" />}
              </button>
            </div>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            className="mt-6 flex h-13 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition-all hover:shadow-blue-600/40 disabled:opacity-70 cursor-pointer"
          >
            {loading ? "Creating Account..." : "Create Account"}
            {!loading && <FiArrowRight className="text-base" />}
          </motion.button>
        </form>

        <div className="my-6 flex items-center">
          <div className="h-px flex-1 bg-slate-200"></div>
          <span className="mx-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            or register with
          </span>
          <div className="h-px flex-1 bg-slate-200"></div>
        </div>

        <button
          type="button"
          className="flex h-12 w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white text-xs font-bold text-slate-700 shadow-sm transition-all hover:bg-slate-50"
        >
          <FcGoogle className="text-xl" />
          Continue with Google
        </button>

        <p className="mt-6 text-center text-xs font-medium text-slate-500">
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-blue-600 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default RegisterForm;