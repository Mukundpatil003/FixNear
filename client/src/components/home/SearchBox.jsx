import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiMapPin } from "react-icons/fi";
import { getCategories } from "../../api/categoryApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SearchBox = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  const [service, setService] = useState("");

  const [latitude, setLatitude] = useState("");

  const [longitude, setLongitude] = useState("");

  const [locationText, setLocationText] = useState(
    "Current Location"
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await getCategories();

      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);

        setLongitude(position.coords.longitude);

        setLocationText("Current Location");

        toast.success("Location detected");
      },
      () => {
        toast.error("Location permission denied");
      }
    );
  };

  const handleSearch = () => {
    if (!service) {
      toast.error("Please select a service");
      return;
    }

    if (!latitude || !longitude) {
      toast.error("Please choose your location");
      return;
    }

    navigate(
      `/providers?service=${service}&latitude=${latitude}&longitude=${longitude}`
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="mt-10 w-full"
    >
      <div className="flex flex-wrap items-center gap-4 rounded-3xl border border-gray-200 bg-white p-4 shadow-xl">

        {/* Service */}

        <div className="flex flex-1 items-center gap-3 rounded-2xl bg-gray-50 px-4 py-3">

          <FiSearch className="text-blue-600" size={22} />

          <select
            value={service}
            onChange={(e) =>
              setService(e.target.value)
            }
            className="w-full bg-transparent outline-none"
          >
            <option value="">
              Choose Service
            </option>

            {categories.map((item) => (
              <option
                key={item._id}
                value={item.name}
              >
                {item.name}
              </option>
            ))}

          </select>

        </div>

        {/* Location */}

        <button
          onClick={getCurrentLocation}
          className="flex flex-1 items-center gap-3 rounded-2xl bg-gray-50 px-4 py-3 transition hover:bg-blue-50"
        >

          <FiMapPin
            className="text-blue-600"
            size={22}
          />

          <span className="truncate">
            {locationText}
          </span>

        </button>

        {/* Search */}

        <motion.button
          whileHover={{
            scale: 1.03,
          }}
          whileTap={{
            scale: 0.97,
          }}
          onClick={handleSearch}
          disabled={loading}
          className="rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-4 font-semibold text-white shadow-lg"
        >
          {loading ? "Searching..." : "Search"}
        </motion.button>

      </div>
    </motion.div>
  );
};

export default SearchBox;