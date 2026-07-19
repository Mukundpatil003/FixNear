const filters = [
  "All",
  "Pending",
  "Accepted",
  "Working",
  "Completed",
];

const RequestFilters = ({
  filter,
  setFilter,
  search,
  setSearch,
}) => {
  return (
    <div className="mt-12 flex flex-wrap items-center gap-4">

      {filters.map((item) => (
        <button
          key={item}
          onClick={() => setFilter(item)}
          className={`rounded-full px-6 py-3 transition
          ${
            filter === item
              ? "bg-blue-600 text-white shadow-lg"
              : "bg-white hover:bg-blue-50"
          }`}
        >
          {item}
        </button>
      ))}

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search service..."
        className="ml-auto w-80 rounded-full border bg-white px-6 py-3 outline-none focus:ring-2 focus:ring-blue-500"
      />

    </div>
  );
};

export default RequestFilters;