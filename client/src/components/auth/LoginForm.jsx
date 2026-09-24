import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiShield
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { loginUser } from "../../api/authApi";
import useAuth from "../../hooks/useAuth";
import socket from "../../socket/socket";

const LoginForm = () => {
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return toast.error("Please fill all required fields");
    }

    try {
      setLoading(true);

      const data = await loginUser(formData);

      // 1. Connect Socket
      if (socket && data.user) {
        socket.connect();
        socket.emit("join", data.user.id || data.user._id);
      }

      toast.success(data.message || "Welcome back! Login successful.");

      // 2. Save JWT Token & User JSON to localStorage
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      // 3. Update Auth Context
      if (data.user && typeof login === "function") {
        login(data.user);
      }

      // 4. Redirect
      const role = data.user?.role;
      let targetPath = "/";

      if (role === "customer") {
        targetPath = "/customer/dashboard";
      } else if (role === "provider") {
        targetPath = "/provider/dashboard";
      } else if (role === "admin") {
        targetPath = "/admin/dashboard";
      }

      window.location.href = targetPath;

    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Login failed. Please check your credentials."
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
      className="flex w-full items-center justify-center px-6 py-12 lg:px-12 xl:px-16"
    >
      <div className="w-full max-w-[480px]">
        {/* Top Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600">
            <FiShield className="text-sm" />
            Secure Portal Sign In
          </div>
          <h1 className="text-3xl font-black text-slate-900 sm:text-4xl tracking-tight">
            Welcome Back 👋
          </h1>
          <p className="text-sm text-slate-500">
            Enter your credentials to access your account dashboard.
          </p>
        </div>

        <form onSubmit={handleLogin} className="mt-8 space-y-5">
          {/* Email Address */}
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">
              Email Address
            </label>

            <div className="flex h-13 items-center rounded-2xl border border-slate-200 bg-slate-50/50 px-4 transition-all focus-within:border-blue-600 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/10">
              <FiMail className="text-slate-400 text-lg flex-shrink-0" />
              <input
                type="email"
                name="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                className="ml-3 w-full bg-transparent text-sm font-semibold text-slate-800 outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <div className="flex h-13 items-center rounded-2xl border border-slate-200 bg-slate-50/50 px-4 transition-all focus-within:border-blue-600 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/10">
              <FiLock className="text-slate-400 text-lg flex-shrink-0" />
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
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                {showPassword ? <FiEyeOff className="text-lg" /> : <FiEye className="text-lg" />}
              </button>
            </div>
          </div>

          {/* Remember Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="remember" className="ml-2.5 text-xs font-medium text-slate-600 cursor-pointer">
              Remember me on this device
            </label>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            className="flex h-13 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition-all hover:shadow-blue-600/40 disabled:opacity-70 cursor-pointer"
          >
            {loading ? "Signing In..." : "Sign In to Account"}
            {!loading && <FiArrowRight className="text-base" />}
          </motion.button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="h-px flex-1 bg-slate-200"></div>
          <span className="mx-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            or continue with
          </span>
          <div className="h-px flex-1 bg-slate-200"></div>
        </div>

        {/* Social Button */}
        <button
          type="button"
          className="flex h-12 w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white text-xs font-bold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:border-slate-300"
        >
          <FcGoogle className="text-xl" />
          Continue with Google
        </button>

        {/* Bottom Link */}
        <p className="mt-8 text-center text-xs font-medium text-slate-500">
          Don't have a FixNear account?{" "}
          <Link to="/register" className="font-bold text-blue-600 hover:underline">
            Create Free Account
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default LoginForm;