import { motion } from "framer-motion";
import { FiMail, FiArrowRight, FiKey } from "react-icons/fi";
import { Link } from "react-router-dom";

const ForgotPasswordForm = () => {
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
            <FiKey className="text-sm" />
            Password Recovery
          </div>
          <h1 className="text-3xl font-black text-slate-900 sm:text-4xl tracking-tight">
            Forgot Password?
          </h1>
          <p className="text-xs text-slate-500 leading-relaxed">
            Enter your registered email address below to receive a verification OTP.
          </p>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">
              Email Address
            </label>
            <div className="flex h-13 items-center rounded-2xl border border-slate-200 bg-slate-50/50 px-4 transition-all focus-within:border-blue-600 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/10">
              <FiMail className="text-slate-400 text-lg flex-shrink-0" />
              <input
                type="email"
                placeholder="name@example.com"
                className="ml-3 w-full bg-transparent text-sm font-semibold text-slate-800 outline-none"
              />
            </div>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="flex h-13 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition-all hover:shadow-blue-600/40 cursor-pointer"
          >
            Send Verification Code
            <FiArrowRight className="text-base" />
          </motion.button>
        </form>

        <p className="mt-8 text-center text-xs font-medium text-slate-500">
          Remember your password?{" "}
          <Link to="/login" className="font-bold text-blue-600 hover:underline">
            Back to Login
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default ForgotPasswordForm;