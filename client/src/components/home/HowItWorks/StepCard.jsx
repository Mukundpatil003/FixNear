import { motion } from "framer-motion";

const StepCard = ({ step, number }) => {
  const Icon = step.icon;

  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      transition={{ duration: 0.3 }}
      className="group relative rounded-3xl border border-gray-100 bg-white p-6 text-center shadow-md transition-all duration-500 hover:border-blue-100 hover:shadow-xl"
    >
      {/* Step Number */}

      <div className="absolute -top-4 left-1/2 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white shadow-lg">
        {number}
      </div>

      {/* Icon */}

      <div className="mx-auto mt-5 mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">

        <Icon size={28} />

      </div>

      {/* Title */}

      <h3 className="text-xl font-bold text-gray-900">
        {step.title}
      </h3>

      {/* Description */}

      <p className="mt-3 text-sm leading-7 text-gray-500">
        {step.description}
      </p>

      {/* Bottom Line */}

      <div className="mx-auto mt-6 h-1 w-10 rounded-full bg-blue-100 transition-all duration-500 group-hover:w-20 group-hover:bg-blue-600"></div>

      {/* Glow */}

      <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-blue-50 opacity-0 blur-2xl transition-all duration-500 group-hover:opacity-100"></div>
    </motion.div>
  );
};

export default StepCard;