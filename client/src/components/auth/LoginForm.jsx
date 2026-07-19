import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { loginUser } from "../../api/authApi";
import useAuth from "../../hooks/useAuth";
import socket from "../../socket/socket";

const LoginForm = () => {
  const navigate = useNavigate();

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
    return toast.error("Please fill all fields");
  }

  try {
    setLoading(true);

    const data = await loginUser(formData);

    // Connect Socket
    socket.connect();

    socket.emit("join", data.user.id);

    toast.success(data.message);

    // Save JWT
    if (data.token) {
      localStorage.setItem("token", data.token);
    }

    // Save User
    if (data.user) {
      login(data.user);
    }

    // Redirect According To Role
    if (data.user.role === "customer") {
      navigate("/customer/dashboard");
    } 
    else if (data.user.role === "provider") {
      navigate("/provider/dashboard");
    } 
    else if (data.user.role === "admin") {
      navigate("/admin/dashboard");
    } 
    else {
      navigate("/");
    }

  } catch (error) {
    toast.error(
      error?.response?.data?.message || "Login Failed"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="flex w-full items-center justify-start px-8 py-12 lg:px-14 xl:px-20"
    >
      <div className="w-full max-w-[560px]">

        <h1 className="text-4xl font-extrabold text-gray-900 xl:text-5xl">
          Welcome Back
        </h1>

        <p className="mt-3 text-lg text-gray-500">
          Sign in to access your FixNear account.
        </p>

        <form onSubmit={handleLogin}>

          {/* Email */}

          <div className="mt-10">

            <label className="mb-3 block text-sm font-bold uppercase tracking-wider text-gray-700">
              Email Address
            </label>

            <div className="flex h-16 items-center rounded-2xl border border-gray-300 px-5 transition-all duration-300 focus-within:border-blue-600 focus-within:shadow-lg">

              <FiMail className="text-2xl text-gray-400" />

              <input
                type="email"
                name="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                className="ml-4 w-full bg-transparent text-lg outline-none"
              />

            </div>

          </div>

          {/* Password */}

          <div className="mt-7">

            <div className="mb-3 flex items-center justify-between">

              <label className="text-sm font-bold uppercase tracking-wider text-gray-700">
                Password
              </label>

              <Link
                to="/forgot-password"
                className="font-semibold text-blue-600 hover:underline"
              >
                Forgot Password?
              </Link>

            </div>

            <div className="flex h-16 items-center rounded-2xl border border-gray-300 px-5 transition-all duration-300 focus-within:border-blue-600 focus-within:shadow-lg">

              <FiLock className="text-2xl text-gray-400" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="ml-4 w-full bg-transparent text-lg outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FiEyeOff className="text-2xl text-gray-400" />
                ) : (
                  <FiEye className="text-2xl text-gray-400" />
                )}
              </button>

            </div>

          </div>

          {/* Remember */}

          <div className="mt-6 flex items-center">

            <input
              type="checkbox"
              className="h-5 w-5 rounded border-gray-300 accent-blue-600"
            />

            <span className="ml-3 text-gray-600">
              Remember Me
            </span>

          </div>

          {/* Login */}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            className="mt-8 flex h-16 w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 text-xl font-bold text-white shadow-lg transition hover:shadow-blue-500/40 disabled:cursor-not-allowed disabled:opacity-70"
          >

            {loading ? "Signing In..." : "Login"}

            {!loading && <FiArrowRight size={22} />}

          </motion.button>

        </form>

        {/* Divider */}

        <div className="my-10 flex items-center">

          <div className="h-px flex-1 bg-gray-300"></div>

          <span className="mx-5 whitespace-nowrap text-sm font-semibold uppercase text-gray-400">
            OR CONTINUE WITH
          </span>

          <div className="h-px flex-1 bg-gray-300"></div>

        </div>

        {/* Google */}

        <button className="flex h-16 w-full items-center justify-center gap-4 rounded-2xl border border-gray-300 bg-white text-lg font-semibold transition-all duration-300 hover:border-blue-500 hover:shadow-md">

          <FcGoogle size={28} />

          Continue with Google

        </button>

        {/* Register */}

        <p className="mt-10 text-center text-gray-600">

          New to FixNear?

          <Link
            to="/register"
            className="ml-2 font-bold text-blue-600 hover:underline"
          >
            Register Now
          </Link>

        </p>

      </div>
    </motion.div>
  );
};

export default LoginForm;