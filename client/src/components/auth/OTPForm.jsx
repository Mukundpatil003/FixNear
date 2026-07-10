import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const OTPForm = () => {
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
          Verify OTP
        </h1>

        <p className="mt-3 text-lg leading-8 text-gray-500">
          We've sent a 6-digit verification code to your registered email.
          Please enter it below.
        </p>

        {/* OTP Boxes */}

        <div className="mt-10 flex justify-between gap-4">

          {[1, 2, 3, 4, 5, 6].map((item) => (
            <input
              key={item}
              type="text"
              maxLength={1}
              className="h-16 w-16 rounded-2xl border border-gray-300 text-center text-2xl font-bold outline-none transition-all duration-300 focus:border-blue-600 focus:shadow-lg"
            />
          ))}

        </div>

        {/* Verify */}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-10 flex h-16 w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 text-xl font-bold text-white shadow-lg transition hover:shadow-blue-500/40"
        >
          Verify OTP

          <FiArrowRight size={22} />
        </motion.button>

        {/* Resend */}

        <p className="mt-8 text-center text-gray-600">

          Didn't receive OTP?

          <button className="ml-2 font-bold text-blue-600 hover:underline">
            Resend OTP
          </button>

        </p>

        {/* Back */}

        <p className="mt-3 text-center text-gray-600">

          <Link
            to="/forgot-password"
            className="font-bold text-blue-600 hover:underline"
          >
            Back
          </Link>

        </p>

      </div>
    </motion.div>
  );
};

export default OTPForm;