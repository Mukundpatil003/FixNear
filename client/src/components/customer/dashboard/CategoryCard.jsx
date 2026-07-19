import {
  Wrench,
  Zap,
  Hammer,
  Paintbrush,
  Car,
  Sparkles,
  AirVent,
  BrushCleaning,
  ArrowRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const iconMap = {
  Plumber: Wrench,
  Electrician: Zap,
  Carpenter: Hammer,
  Painter: Paintbrush,
  Mechanic: Car,
  Cleaner: BrushCleaning,
  "AC Repair": AirVent,
  Salon: Sparkles,
};

const CategoryCard = ({ category }) => {

  const navigate = useNavigate();

  const handleExplore = () => {

  if (!navigator.geolocation) {
    alert("Geolocation is not supported");
    return;
  }

  navigator.geolocation.getCurrentPosition(

    (position) => {

      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      navigate(
        `/providers?service=${encodeURIComponent(
          category.name
        )}&latitude=${latitude}&longitude=${longitude}`
      );

    },

    (error) => {
      console.error(error);
      alert("Please allow location access.");
    }

  );
};

  const Icon = iconMap[category.name] || Wrench;

  return (

    <div className="group cursor-pointer rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white">
        <Icon size={34} strokeWidth={2} />
      </div>

      <h3 className="mt-6 text-3xl font-bold text-slate-900">
        {category.name}
      </h3>

      <p className="mt-3 min-h-[52px] text-[15px] leading-7 text-slate-500 line-clamp-2">
        {category.description}
      </p>

      <button
        onClick={handleExplore}
        className="mt-4 flex items-center gap-2 font-semibold text-indigo-600"
      >
        Explore

        <ArrowRight
          size={18}
          className="transition-transform group-hover:translate-x-1"
        />
      </button>

    </div>

  );
};

export default CategoryCard;