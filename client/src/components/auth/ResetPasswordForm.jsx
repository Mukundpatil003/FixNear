import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const ResetPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="flex w-full items-center justify-start px-8 py-12 lg:px-14 xl:px-20"
    >
      <div className="w-full max-w-[560px]">

        <h1 className="text-4xl font-extrabold text-gray-900 xl:text-5xl">
          Reset Password
        </h1>

        <p className="mt-3 text-lg leading-8 text-gray-500">
          Create a new strong password for your FixNear account.
        </p>

        {/* New Password */}

        <div className="mt-10">

          <label className="mb-3 block text-sm font-bold uppercase tracking-wider text-gray-700">
            New Password
          </label>

          <div className="flex h-16 items-center rounded-2xl border border-gray-300 px-5 transition focus-within:border-blue-600 focus-within:shadow-lg">

            <FiLock className="text-2xl text-gray-400" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="********"
              className="ml-4 w-full bg-transparent text-lg outline-none"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? (
                <FiEyeOff className="text-2xl text-gray-400" />
              ) : (
                <FiEye className="text-2xl text-gray-400" />
              )}
            </button>

          </div>

        </div>

        {/* Confirm */}

        <div className="mt-7">

          <label className="mb-3 block text-sm font-bold uppercase tracking-wider text-gray-700">
            Confirm Password
          </label>

          <div className="flex h-16 items-center rounded-2xl border border-gray-300 px-5 transition focus-within:border-blue-600 focus-within:shadow-lg">

            <FiLock className="text-2xl text-gray-400" />

            <input
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              placeholder="********"
              className="ml-4 w-full bg-transparent text-lg outline-none"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
            >
              {showConfirmPassword ? (
                <FiEyeOff className="text-2xl text-gray-400" />
              ) : (
                <FiEye className="text-2xl text-gray-400" />
              )}
            </button>

          </div>

        </div>

        {/* Button */}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-10 flex h-16 w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 text-xl font-bold text-white shadow-lg"
        >

          Reset Password

          <FiArrowRight />

        </motion.button>

        <p className="mt-8 text-center text-gray-600">

          Back to

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

export default ResetPasswordForm;