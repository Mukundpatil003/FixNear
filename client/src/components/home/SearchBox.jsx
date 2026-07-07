import { motion } from "framer-motion";
import { FiSearch, FiMapPin } from "react-icons/fi";
import { IoChevronDown } from "react-icons/io5";

const SearchBox = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="mt-10 w-full"
    >
      <div className="flex w-full items-center overflow-hidden rounded-[24px] border border-gray-200 bg-white p-2 shadow-[0_20px_45px_rgba(15,23,42,0.08)]">

        {/* Service */}

        <div className="group flex flex-1 cursor-pointer items-center gap-4 rounded-2xl px-5 py-3 transition-all duration-300 hover:bg-blue-50">

          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">

            <FiSearch
              size={22}
              className="text-blue-600"
            />

          </div>

          <div className="flex-1">

            <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
              Service
            </p>

            <p className="mt-1 whitespace-nowrap text-[17px] font-semibold text-gray-800">
              Choose Service
            </p>

          </div>

          <IoChevronDown
            size={20}
            className="text-gray-400 transition duration-300 group-hover:rotate-180"
          />

        </div>

        {/* Divider */}

        <div className="h-10 w-px bg-gray-200"></div>

        {/* Location */}

        <div className="group flex flex-1 cursor-pointer items-center gap-4 rounded-2xl px-5 py-3 transition-all duration-300 hover:bg-blue-50">

          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">

            <FiMapPin
              size={22}
              className="text-blue-600"
            />

          </div>

          <div className="flex-1">

            <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
              Location
            </p>

            <p className="mt-1 whitespace-nowrap text-[17px] font-semibold text-gray-800">
              Enter Location
            </p>

          </div>

        </div>

        {/* Button */}

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="ml-2 flex h-[50px] w-[130px] flex-shrink-0 items-center justify-center rounded-[18px] bg-gradient-to-r from-blue-600 to-blue-700 text-[17px] font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-blue-300"
        >
          Search
        </motion.button>

      </div>
    </motion.div>
  );
};

export default SearchBox;