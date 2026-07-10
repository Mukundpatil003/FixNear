import { motion } from "framer-motion";
import categoryIcons from "../../utils/categoryIcons";
import { FaTools } from "react-icons/fa";

const CategoryCard = ({ item }) => {

  const Icon = categoryIcons[item.name] || FaTools;

  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      transition={{ duration: 0.3 }}
      className="group relative flex h-[220px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 shadow-md transition-all duration-500 hover:border-blue-100 hover:shadow-xl"
    >
      {/* Glow */}

      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-blue-50 opacity-0 blur-2xl transition-all duration-500 group-hover:opacity-100"></div>

      {/* Icon */}

      <div className="relative z-10 mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">

        <Icon size={28} />

      </div>

      {/* Title */}

      <h3 className="relative z-10 text-center text-lg font-bold text-gray-900 transition-all duration-300 group-hover:text-blue-600">
        {item.name}
      </h3>

      {/* Subtitle */}

      <p className="relative z-10 mt-2 text-center text-xs leading-5 text-gray-500">
        {item.description || "Verified Professionals"}
      </p>

      <div className="mt-5 h-1 w-10 rounded-full bg-blue-100 transition-all duration-300 group-hover:w-20 group-hover:bg-blue-600"></div>

    </motion.div>
  );
};

export default CategoryCard;