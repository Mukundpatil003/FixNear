import { motion } from "framer-motion";
import categoryIcons from "../../utils/categoryIcons";
import { FaTools } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";

const CategoryCard = ({ item }) => {
  const Icon = categoryIcons[item.name] || FaTools;

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.25 }}
      className="group relative flex h-[210px] cursor-pointer flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm transition-all duration-300 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10"
    >
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-blue-500/10 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

      <div className="flex items-start justify-between">
        {/* Category Icon Badge */}
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
          <Icon className="text-2xl" />
        </div>

        {/* Small arrow indicator */}
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-400 transition-colors group-hover:bg-blue-600 group-hover:text-white">
          <FiChevronRight className="text-sm transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>

      <div>
        <h3 className="text-base font-bold text-slate-900 transition-colors group-hover:text-blue-600">
          {item.name}
        </h3>
        <p className="mt-1 text-xs text-slate-500 line-clamp-2 leading-relaxed">
          {item.description || "Verified experts available near you"}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <div className="h-1 w-8 rounded-full bg-slate-200 transition-all duration-300 group-hover:w-16 group-hover:bg-blue-600"></div>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider group-hover:text-blue-600">
          Available Now
        </span>
      </div>
    </motion.div>
  );
};

export default CategoryCard;