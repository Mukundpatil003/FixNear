import { motion } from "framer-motion";
import bannerImage from "../../assets/images/login-illustration.png";

const LoginBanner = () => {
  return (
    <div className="relative hidden overflow-hidden bg-[#EEF4FF] lg:flex items-center justify-center">

      {/* Background Glow */}

      <div className="absolute h-[650px] w-[650px] rounded-full bg-blue-200/30 blur-[120px]" />

      {/* Image Card */}

      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        <div className="rounded-[36px] bg-white p-8 shadow-[0_20px_60px_rgba(37,99,235,0.12)]">

          <img
            src={bannerImage}
            alt="FixNear"
            className="w-[340px] xl:w-[380px] object-contain"
          />

        </div>

        {/* Top Card */}

        <motion.div
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
          }}
          className="absolute -right-8 top-6 rounded-3xl bg-white px-6 py-5 shadow-xl"
        >

          <h3 className="text-4xl font-bold text-blue-600">
            500+
          </h3>

          <p className="text-base text-slate-600">
            Verified Experts
          </p>

        </motion.div>

        {/* Bottom Card */}

        <motion.div
          animate={{
            y: [0, 8, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
          }}
          className="absolute -bottom-8 left-6 flex items-center gap-4 rounded-3xl bg-white px-6 py-4 shadow-xl"
        >

          <div className="h-12 w-12 rounded-full bg-blue-600"></div>

          <div>

            <h3 className="text-2xl font-bold text-slate-900">
              10K+
            </h3>

            <p className="text-base text-slate-600">
              Happy Users
            </p>

          </div>

        </motion.div>

      </motion.div>

    </div>
  );
};

export default LoginBanner;