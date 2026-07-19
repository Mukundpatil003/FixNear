import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="relative w-full max-w-md">

      <Search
        size={20}
        className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="text"
        placeholder="Search services..."
        className="w-full rounded-full border border-gray-200 bg-white py-4 pl-14 pr-5 text-lg shadow-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
      />

    </div>
  );
};

export default SearchBar;