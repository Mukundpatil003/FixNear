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
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { registerUser } from "../../api/authApi";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

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

    const {
      name,
      email,
      phone,
      password,
      confirmPassword,
    } = formData;

    if (
      !name ||
      !email ||
      !phone ||
      !password ||
      !confirmPassword
    ) {
      return toast.error("Please fill all fields");
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

      toast.success(response.message);

      navigate("/login");

    } catch (error) {

      toast.error(
        error?.response?.data?.message ||
        "Registration Failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center bg-white px-8 py-12"
    >
      <div className="w-full max-w-[560px]">

        <h1 className="text-[56px] font-extrabold leading-none text-[#0F172A]">
          Create Account
        </h1>

        <p className="mt-4 text-lg text-slate-500">
          Join FixNear and book trusted professionals.
        </p>

        <form
          onSubmit={handleRegister}
          className="mt-10 space-y-5"
        >
                    {/* Full Name */}

          <div>

            <label className="mb-2 block text-sm font-bold uppercase tracking-wide text-slate-700">
              Full Name
            </label>

            <div className="flex h-16 items-center rounded-2xl border border-slate-200 px-5 transition-all duration-300 focus-within:border-blue-600 focus-within:shadow-md">

              <FiUser className="text-xl text-slate-400" />

              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                className="ml-4 w-full bg-transparent text-lg outline-none"
              />

            </div>

          </div>

          {/* Email */}

          <div>

            <label className="mb-2 block text-sm font-bold uppercase tracking-wide text-slate-700">
              Email
            </label>

            <div className="flex h-16 items-center rounded-2xl border border-slate-200 px-5 transition-all duration-300 focus-within:border-blue-600 focus-within:shadow-md">

              <FiMail className="text-xl text-slate-400" />

              <input
                type="email"
                name="email"
                placeholder="example@gmail.com"
                value={formData.email}
                onChange={handleChange}
                className="ml-4 w-full bg-transparent text-lg outline-none"
              />

            </div>

          </div>

          {/* Phone */}

          <div>

            <label className="mb-2 block text-sm font-bold uppercase tracking-wide text-slate-700">
              Mobile Number
            </label>

            <div className="flex h-16 items-center rounded-2xl border border-slate-200 px-5 transition-all duration-300 focus-within:border-blue-600 focus-within:shadow-md">

              <FiPhone className="text-xl text-slate-400" />

              <input
                type="tel"
                name="phone"
                placeholder="+91 9876543210"
                value={formData.phone}
                onChange={handleChange}
                className="ml-4 w-full bg-transparent text-lg outline-none"
              />

            </div>

          </div>

          {/* Password */}

          <div>

            <label className="mb-2 block text-sm font-bold uppercase tracking-wide text-slate-700">
              Password
            </label>

            <div className="flex h-16 items-center rounded-2xl border border-slate-200 px-5 transition-all duration-300 focus-within:border-blue-600 focus-within:shadow-md">

              <FiLock className="text-xl text-slate-400" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
                className="ml-4 w-full bg-transparent text-lg outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FiEyeOff className="text-xl text-slate-400" />
                ) : (
                  <FiEye className="text-xl text-slate-400" />
                )}
              </button>

            </div>

          </div>

          {/* Confirm Password */}

          <div>

            <label className="mb-2 block text-sm font-bold uppercase tracking-wide text-slate-700">
              Confirm Password
            </label>

            <div className="flex h-16 items-center rounded-2xl border border-slate-200 px-5 transition-all duration-300 focus-within:border-blue-600 focus-within:shadow-md">

              <FiLock className="text-xl text-slate-400" />

              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="********"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="ml-4 w-full bg-transparent text-lg outline-none"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              >
                {showConfirmPassword ? (
                  <FiEyeOff className="text-xl text-slate-400" />
                ) : (
                  <FiEye className="text-xl text-slate-400" />
                )}
              </button>

            </div>

          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            className="mt-8 flex h-16 w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 text-xl font-semibold text-white shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
          >

            {loading ? "Creating Account..." : "Create Account"}

            {!loading && <FiArrowRight />}

          </motion.button>

        </form>

        {/* Divider */}

        <div className="my-8 flex items-center">

          <div className="h-px flex-1 bg-slate-200"></div>

          <span className="mx-4 text-sm text-slate-400">
            OR
          </span>

          <div className="h-px flex-1 bg-slate-200"></div>

        </div>

        <button className="flex h-16 w-full items-center justify-center gap-4 rounded-2xl border border-slate-200 bg-white text-lg font-semibold transition hover:border-blue-500 hover:bg-blue-50">

          <FcGoogle size={28} />

          Continue with Google

        </button>

        <p className="mt-8 text-center text-base text-slate-600">

          Already have an account?

          <Link
            to="/login"
            className="ml-2 font-bold text-blue-600 hover:underline"
          >
            Login
          </Link>

        </p>

      </div>

    </motion.div>

  );
};

export default RegisterForm;