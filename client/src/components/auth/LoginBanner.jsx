import { motion } from "framer-motion";
import bannerImage from "../../assets/images/login-illustration.png";
import { FiCheckCircle, FiStar, FiShield } from "react-icons/fi";

const LoginBanner = () => {
  return (
    <div className="relative hidden overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 lg:flex items-center justify-center p-12 text-white">
      {/* Background Glows */}
      <div className="pointer-events-none absolute -left-20 top-20 h-96 w-96 rounded-full bg-blue-500/20 blur-[140px]"></div>
      <div className="pointer-events-none absolute -right-20 bottom-20 h-96 w-96 rounded-full bg-indigo-500/20 blur-[140px]"></div>

      <div className="relative max-w-lg space-y-8 text-center">
        {/* Main Image Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto"
        >
          <div className="rounded-[40px] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl">
            <img
              src={bannerImage}
              alt="FixNear Marketplace"
              className="w-full max-w-[340px] mx-auto object-contain drop-shadow-xl"
            />
          </div>

          {/* Floating Badge 1 */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute -left-6 top-8 flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/90 px-4 py-3 shadow-2xl backdrop-blur-md text-left"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
              <FiCheckCircle className="text-lg" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Verified Local Pros</p>
              <p className="text-[10px] text-slate-400">100% Background Checked</p>
            </div>
          </motion.div>

          {/* Floating Badge 2 */}
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="absolute -right-6 bottom-8 flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/90 px-4 py-3 shadow-2xl backdrop-blur-md text-left"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400">
              <FiStar className="text-lg fill-amber-400" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">4.9 Star Rating</p>
              <p className="text-[10px] text-slate-400">Over 10K+ Bookings</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Content text below */}
        <div className="space-y-2">
          <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
            On-Demand Home Services
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto">
            Book verified electricians, plumbers, carpenters, and cleaners near your location with live GPS tracking.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginBanner;