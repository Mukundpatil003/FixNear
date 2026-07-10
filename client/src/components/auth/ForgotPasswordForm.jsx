import { motion } from "framer-motion";
import { FiMail, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const ForgotPasswordForm = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="flex w-full items-center justify-start px-8 py-12 lg:px-14 xl:px-20"
    >
      <div className="w-full max-w-[560px]">

        {/* Heading */}

        <h1 className="text-4xl font-extrabold text-gray-900 xl:text-5xl">
          Forgot Password?
        </h1>

        <p className="mt-3 text-lg text-gray-500 leading-8">
          Don't worry! Enter your registered email address and we'll send you a One-Time Password (OTP) to reset your password.
        </p>

        {/* Email */}

        <div className="mt-10">

          <label className="mb-3 block text-sm font-bold uppercase tracking-wider text-gray-700">
            Email Address
          </label>

          <div className="flex h-16 items-center rounded-2xl border border-gray-300 px-5 transition-all duration-300 focus-within:border-blue-600 focus-within:shadow-lg">

            <FiMail className="text-2xl text-gray-400" />

            <input
              type="email"
              placeholder="name@example.com"
              className="ml-4 w-full bg-transparent text-lg outline-none"
            />

          </div>

        </div>

        {/* Send OTP */}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-10 flex h-16 w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 text-xl font-bold text-white shadow-lg transition hover:shadow-blue-500/40"
        >

          Send OTP

          <FiArrowRight size={22} />

        </motion.button>

        {/* Back */}

        <p className="mt-10 text-center text-gray-600">

          Remember your password?

          <Link
            to="/login"
            className="ml-2 font-bold text-blue-600 hover:underline"
          >
            Back to Login
          </Link>

        </p>

      </div>
    </motion.div>
  );
};

export default ForgotPasswordForm;