import { motion } from "framer-motion";

const StepCard = ({ step, number }) => {
  const Icon = step.icon;

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.25 }}
      className="group relative flex flex-col items-center rounded-3xl border border-slate-200/70 bg-white p-7 text-center shadow-sm transition-all duration-300 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10"
    >
      {/* Number Badge */}
      <div className="absolute -top-4 flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-xs font-black text-white shadow-md shadow-blue-500/30 ring-4 ring-white">
        0{number}
      </div>

      {/* Icon Circle */}
      <div className="mt-4 mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition-all duration-300 group-hover:bg-gradient-to-tr group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-blue-500/30 group-hover:scale-110">
        <Icon className="text-2xl" />
      </div>

      {/* Content */}
      <h3 className="text-lg font-bold text-slate-900 transition-colors group-hover:text-blue-600">
        {step.title}
      </h3>

      <p className="mt-2 text-xs leading-relaxed text-slate-500">
        {step.description}
      </p>

      {/* Accent Indicator */}
      <div className="mt-6 h-1 w-8 rounded-full bg-slate-200 transition-all duration-300 group-hover:w-16 group-hover:bg-blue-600"></div>
    </motion.div>
  );
};

export default StepCard;