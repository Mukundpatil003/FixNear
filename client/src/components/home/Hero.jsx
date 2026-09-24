import { motion } from "framer-motion";
import SearchBox from "./SearchBox";
import heroImage from "../../assets/images/hero.png";
import { FiCheckCircle, FiStar, FiShield, FiUsers, FiClock } from "react-icons/fi";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-blue-50/30 to-white pt-10 pb-20 lg:pt-16 lg:pb-28">
      {/* Decorative Glow Background Blobs */}
      <div className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-blue-400/15 blur-[120px]"></div>
      <div className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full bg-indigo-400/15 blur-[120px]"></div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Left Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-white/80 px-4 py-1.5 shadow-sm backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-ping"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                Hyperlocal On-Demand Services
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.15]">
              Expert Services, <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                Delivered At Your Door.
              </span>
            </h1>

            {/* Subtext */}
            <p className="mx-auto lg:mx-0 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-600">
              Connect with background-checked electricians, plumbers, carpenters, cleaners, and mechanics near you in under 60 seconds.
            </p>

            {/* Search Box Component */}
            <SearchBox />

            {/* Trust Badges */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-200/60 max-w-xl mx-auto lg:mx-0">
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-2xl font-black text-slate-900 flex items-center gap-1">
                  10K+
                </span>
                <span className="text-xs font-medium text-slate-500">Completed Jobs</span>
              </div>

              <div className="flex flex-col items-center lg:items-start border-x border-slate-200/60 px-4">
                <span className="text-2xl font-black text-slate-900 flex items-center gap-1">
                  500+
                </span>
                <span className="text-xs font-medium text-slate-500">Verified Pros</span>
              </div>

              <div className="flex flex-col items-center lg:items-start">
                <span className="text-2xl font-black text-slate-900 flex items-center gap-1">
                  4.9 <FiStar className="text-amber-400 fill-amber-400 text-lg" />
                </span>
                <span className="text-xs font-medium text-slate-500">Avg Rating</span>
              </div>
            </div>
          </motion.div>

          {/* Right Visual Image & Floating Glass Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative flex justify-center"
          >
            <div className="relative w-full max-w-[480px]">
              {/* Outer decorative ring */}
              <div className="absolute inset-0 rounded-[40px] bg-gradient-to-tr from-blue-600/20 to-indigo-600/20 blur-2xl transform rotate-3"></div>

              {/* Main Image Frame */}
              <div className="relative overflow-hidden rounded-[36px] border border-white/80 bg-gradient-to-b from-white to-blue-50/50 p-4 shadow-2xl shadow-blue-900/10">
                <img
                  src={heroImage}
                  alt="Professional Service Technician"
                  className="w-full h-[420px] object-cover rounded-[28px]"
                />
              </div>

              {/* Floating Glass Card 1: Verified badge */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute left-2 sm:-left-6 top-4 sm:top-10 flex items-center gap-2.5 sm:gap-3 rounded-2xl border border-white/80 bg-white/90 p-2.5 sm:p-3.5 shadow-xl backdrop-blur-md"
              >
                <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 shrink-0">
                  <FiCheckCircle className="text-lg sm:text-xl" />
                </div>
                <div>
                  <p className="text-[11px] sm:text-xs font-bold text-slate-900">Background Checked</p>
                  <p className="text-[9px] sm:text-[10px] font-semibold text-emerald-600">100% Verified</p>
                </div>
              </motion.div>

              {/* Floating Glass Card 2: Rating */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute right-2 sm:-right-6 top-24 sm:top-32 flex items-center gap-2.5 sm:gap-3 rounded-2xl border border-white/80 bg-white/90 p-2.5 sm:p-3.5 shadow-xl backdrop-blur-md"
              >
                <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600 shrink-0">
                  <FiStar className="text-lg sm:text-xl fill-amber-500" />
                </div>
                <div>
                  <p className="text-[11px] sm:text-xs font-bold text-slate-900">4.9 / 5.0 Stars</p>
                  <p className="text-[9px] sm:text-[10px] text-slate-500">Over 3,200 reviews</p>
                </div>
              </motion.div>

              {/* Floating Glass Card 3: Rapid response */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="absolute -bottom-4 sm:-bottom-6 left-4 right-4 sm:left-8 sm:right-8 flex items-center justify-between rounded-2xl border border-white/80 bg-white/95 p-3 sm:p-4 shadow-xl backdrop-blur-md"
              >
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 shrink-0">
                    <FiClock className="text-lg sm:text-xl" />
                  </div>
                  <div>
                    <p className="text-[11px] sm:text-xs font-bold text-slate-900">Fast Local Arrival</p>
                    <p className="text-[9px] sm:text-[10px] text-slate-500">Pros near your zipcode</p>
                  </div>
                </div>
                <span className="rounded-lg bg-blue-50 px-2 sm:px-2.5 py-1 text-[10px] sm:text-[11px] font-bold text-blue-600">
                  &lt; 30 Mins
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;