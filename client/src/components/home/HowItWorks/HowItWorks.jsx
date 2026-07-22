import { motion } from "framer-motion";
import { howItWorks } from "../../../data/howItWorks";
import StepCard from "./StepCard";

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="bg-[#F8FAFC] py-24 scroll-mt-24"
    >
      <div className="mx-auto max-w-7xl px-8">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
            Easy Process
          </span>

          <h2 className="mt-5 text-[40px] font-extrabold leading-tight text-gray-900">
            Get Your Service In 4 Easy Steps
          </h2>

          <p className="mt-4 text-[17px] leading-8 text-gray-500">
            Book a trusted professional in just a few simple steps.
          </p>
        </motion.div>

        {/* Steps */}

        <div className="relative grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

          {/* Connector Line */}

          <div className="absolute left-[13%] right-[13%] top-[70px] hidden h-[2px] bg-gradient-to-r from-blue-200 via-blue-500 to-blue-200 xl:block"></div>

          {howItWorks.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{
                opacity: 0,
                y: 50,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.12,
              }}
              className="relative z-10"
            >
              <StepCard
                step={step}
                number={index + 1}
              />
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default HowItWorks;