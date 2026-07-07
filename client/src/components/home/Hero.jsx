import { motion } from "framer-motion";
import SearchBox from "./SearchBox";
import heroImage from "../../assets/images/hero.png";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#F8FAFC] via-white to-[#EEF5FF]">

      {/* Blur Background */}

      <div className="absolute -left-40 top-0 h-[450px] w-[450px] rounded-full bg-blue-100 opacity-50 blur-[140px]"></div>

      <div className="absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-cyan-100 opacity-40 blur-[120px]"></div>

      <div className="relative mx-auto flex min-h-[720px] max-w-7xl items-center justify-between px-8 py-20">

        {/* Left Side */}

        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.7,
          }}
          className="w-full max-w-[620px] xl:max-w-[650px]"
        >

          <span className="inline-flex items-center rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
            Trusted Home Services
          </span>

          <h1 className="mt-8 text-[62px] font-extrabold leading-[72px] tracking-[-2px] text-gray-900">

            Find Trusted

            <span className="block text-blue-600">
              Local Professionals
            </span>

            Near You

          </h1>

          <p className="mt-8 max-w-[520px] text-lg leading-8 text-gray-500">

            Book verified electricians, plumbers, cleaners,
            carpenters and hundreds of trusted professionals in
            just a few clicks.

          </p>

          {/* Search */}

          <div className="mt-10">

            <SearchBox />

          </div>

          {/* Stats */}

          <div className="mt-12 flex gap-12">

            <div>

              <h2 className="text-3xl font-extrabold text-blue-600">
                10K+
              </h2>

              <p className="mt-2 text-gray-500">
                Happy Customers
              </p>

            </div>

            <div>

              <h2 className="text-3xl font-extrabold text-blue-600">
                500+
              </h2>

              <p className="mt-2 text-gray-500">
                Verified Experts
              </p>

            </div>

            <div>

              <h2 className="text-3xl font-extrabold text-blue-600">
                4.9★
              </h2>

              <p className="mt-2 text-gray-500">
                Average Rating
              </p>

            </div>

          </div>

        </motion.div>

        {/* Right Side */}

        <motion.div
          initial={{
            opacity: 0,
            x: 60,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.7,
          }}
          className="relative"
        >

          <div className="relative flex h-[600px] w-[560px] items-center justify-center rounded-[40px] bg-white shadow-[0_40px_100px_rgba(0,0,0,0.08)]">
                        <img
              src={heroImage}
              alt="Hero"
              className="w-[500px] object-contain drop-shadow-2xl"
            />

          </div>

          {/* Experience Card */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.4,
            }}
            className="absolute -left-10 top-12 rounded-3xl bg-white px-6 py-5 shadow-2xl"
          >

            <h3 className="text-3xl font-bold text-blue-600">
              10K+
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Verified Experts
            </p>

          </motion.div>

          {/* Rating Card */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.6,
            }}
            className="absolute -right-10 top-24 rounded-3xl bg-white px-6 py-5 shadow-2xl"
          >

            <h3 className="text-3xl font-bold text-yellow-500">
              ★ 4.9
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Customer Rating
            </p>

          </motion.div>

          {/* Bottom Floating Card */}

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.8,
            }}
            className="absolute -bottom-8 left-12 flex items-center gap-4 rounded-3xl border border-gray-100 bg-white px-6 py-5 shadow-2xl"
          >

            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">

              <div className="h-7 w-7 rounded-full bg-blue-600"></div>

            </div>

            <div>

              <h3 className="text-lg font-bold text-gray-900">
                500+ Professionals
              </h3>

              <p className="text-sm text-gray-500">
                Ready to serve near your location
              </p>

            </div>

          </motion.div>

        </motion.div>

      </div>

    </section>
  );
};

export default Hero;
          