import { motion } from "framer-motion";
import { providers } from "../../../data/providers";
import ProviderCard from "./ProviderCard";

const Providers = () => {
  return (
    <section className="bg-[#F8FAFC] py-24">

      <div className="mx-auto max-w-7xl px-8">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 flex max-w-2xl flex-col items-center text-center"
        >

          <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
            Our Professionals
          </span>

          <h2 className="mt-5 text-[40px] font-extrabold leading-tight text-gray-900">
            Top Rated Service Providers
          </h2>

          <p className="mt-4 text-[17px] leading-8 text-gray-500">
            Connect with experienced and verified professionals trusted by
            thousands of customers across India.
          </p>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="mt-8 rounded-xl border border-blue-600 px-6 py-3 font-semibold text-blue-600 transition-all duration-300 hover:bg-blue-600 hover:text-white"
          >
            View All Providers →
          </motion.button>

        </motion.div>

        {/* Cards */}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

          {providers.map((provider, index) => (

            <motion.div
              key={provider.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
              }}
            >
              <ProviderCard provider={provider} />
            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default Providers;