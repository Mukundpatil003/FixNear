import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiMapPin, FiNavigation, FiCheckCircle } from "react-icons/fi";
import { getCategories } from "../../api/categoryApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import CustomSelect from "../ui/CustomSelect";

const SearchBox = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [service, setService] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [locationText, setLocationText] = useState("Current Location");
  const [loading, setLoading] = useState(false);
  const [locating, setLocating] = useState(false);

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
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setLocationText("GPS Location Locked");
        setLocating(false);
        toast.success("Location detected successfully!");
      },
      (err) => {
        setLocating(false);
        toast.error("Location permission denied or unavailable");
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const handleSearch = () => {
    if (!service) {
      toast.error("Please select a service category");
      return;
    }

    if (!latitude || !longitude) {
      toast.error("Please detect or set your location first");
      return;
    }

    navigate(
      `/providers?service=${encodeURIComponent(service)}&latitude=${latitude}&longitude=${longitude}`
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="mt-8 w-full"
    >
      <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-3 sm:p-4 shadow-xl shadow-slate-200/60 backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Category Dropdown */}
          <div className="flex-1 w-full">
            <CustomSelect
              name="service"
              value={service}
              onChange={(e) => setService(e.target.value)}
              placeholder="Select Service (e.g. Electrician)"
              options={categories.map((item) => ({
                value: item.name,
                label: item.name,
              }))}
            />
          </div>

          {/* Location Trigger */}
          <button
            type="button"
            onClick={getCurrentLocation}
            className={`flex flex-1 items-center justify-between gap-3 w-full rounded-2xl border px-4 py-3.5 text-sm font-semibold transition-all ${
              latitude && longitude
                ? "bg-blue-50/70 border-blue-200 text-blue-700"
                : "bg-slate-50 border-slate-200/60 text-slate-700 hover:bg-slate-100"
            }`}
          >
            <div className="flex items-center gap-2.5 truncate">
              <FiMapPin className={latitude ? "text-blue-600" : "text-slate-400"} />
              <span className="truncate">{locationText}</span>
            </div>
            {latitude ? (
              <FiCheckCircle className="text-emerald-500 text-base flex-shrink-0" />
            ) : (
              <FiNavigation className={`text-slate-400 text-xs ${locating ? "animate-spin text-blue-600" : ""}`} />
            )}
          </button>

          {/* Submit Search */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSearch}
            disabled={loading}
            className="w-full sm:w-auto min-w-[130px] rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition-all hover:shadow-xl hover:shadow-blue-600/40 cursor-pointer"
          >
            {loading ? "Searching..." : "Find Experts"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default SearchBox;