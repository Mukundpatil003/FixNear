import { FiSearch } from "react-icons/fi";

const filters = ["All", "Pending", "Accepted", "Working", "Completed"];

const RequestFilters = ({ filter, setFilter, search, setSearch }) => {
  return (
    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {filters.map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`rounded-2xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
              filter === item
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                : "bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="relative w-full sm:w-72">
        <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search requests..."
          className="w-full rounded-2xl border border-slate-200/80 bg-white pl-9 pr-4 py-2.5 text-xs font-semibold text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
        />
      </div>
    </div>
  );
};

export default RequestFilters;