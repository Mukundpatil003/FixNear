import { motion } from "framer-motion";
import { FiArrowRight, FiShield } from "react-icons/fi";
import { Link } from "react-router-dom";

const OTPForm = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="flex w-full items-center justify-center px-6 py-12 lg:px-12 xl:px-16"
    >
      <div className="w-full max-w-[480px]">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600">
            <FiShield className="text-sm" />
            2-Factor Verification
          </div>
          <h1 className="text-3xl font-black text-slate-900 sm:text-4xl tracking-tight">
            Verify 6-Digit OTP
          </h1>
          <p className="text-xs text-slate-500 leading-relaxed">
            Enter the 6-digit security code sent to your registered email address.
          </p>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="mt-8 space-y-6">
          <div className="grid grid-cols-6 gap-2 sm:gap-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <input
                key={item}
                type="text"
                maxLength={1}
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 text-center text-lg font-bold text-slate-900 outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
              />
            ))}
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="flex h-13 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition-all hover:shadow-blue-600/40 cursor-pointer"
          >
            Verify Code & Proceed
            <FiArrowRight className="text-base" />
          </motion.button>
        </form>

        <div className="mt-8 space-y-2 text-center text-xs font-medium text-slate-500">
          <p>
            Didn't receive code?{" "}
            <button className="font-bold text-blue-600 hover:underline cursor-pointer">
              Resend OTP
            </button>
          </p>
          <p>
            <Link to="/forgot-password" className="font-bold text-slate-600 hover:underline">
              ← Back
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default OTPForm;