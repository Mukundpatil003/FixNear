import CategoryCard from "./CategoryCard";

const CategorySection = ({ categories = [] }) => {
  return (
    <section className="mt-16">

      <div className="mb-10 flex items-center justify-between">

        <div>

          <h2 className="text-4xl font-bold text-slate-900">
            Popular Categories
          </h2>

          <p className="mt-2 text-slate-500">
            Explore our most booked home services
          </p>

        </div>

        <div className="rounded-full bg-indigo-50 px-5 py-2 font-semibold text-indigo-600">
          {categories.length} Services
        </div>

      </div>

      {categories.length === 0 ? (
        <div className="rounded-[28px] bg-white py-20 text-center shadow">
          No Categories Found
        </div>
      ) : (
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard
              key={category._id}
              category={category}
            />
          ))}
        </div>
      )}

    </section>
  );
};

export default CategorySection;