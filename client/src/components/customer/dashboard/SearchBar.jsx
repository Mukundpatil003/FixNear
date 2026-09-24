import { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      const trimmed = query.trim();
      if (!trimmed) return;

      if (!navigator.geolocation) {
        navigate(`/providers?service=${encodeURIComponent(trimmed)}`);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          navigate(
            `/providers?service=${encodeURIComponent(
              trimmed
            )}&latitude=${latitude}&longitude=${longitude}`
          );
        },
        () => {
          navigate(`/providers?service=${encodeURIComponent(trimmed)}`);
        }
      );
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <Search
        size={20}
        onClick={handleSearch}
        className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer hover:text-blue-600 transition"
      />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleSearch}
        placeholder="Search services (e.g. Plumber, Painter)..."
        className="w-full rounded-full border border-slate-200/80 bg-white py-3.5 pl-14 pr-5 text-sm sm:text-base font-medium text-slate-800 shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
      />
    </div>
  );
};

export default SearchBar;