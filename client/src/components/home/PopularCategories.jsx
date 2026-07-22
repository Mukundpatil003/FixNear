import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getCategories } from "../../api/categoryApi";
import CategoryCard from "./CategoryCard";

const PopularCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const data = await getCategories();

      if (data.success) {
        setCategories(data.categories);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="services"
      className="bg-white py-24 scroll-mt-24"
    >
      <div className="mx-auto max-w-7xl px-8">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
            Popular Services
          </span>

          <h2 className="mt-5 text-[40px] font-extrabold leading-tight text-gray-900">
            Explore Our Popular Categories
          </h2>

          <p className="mt-4 text-[17px] leading-8 text-gray-500">
            Book trusted professionals for your everyday home service needs.
          </p>
        </motion.div>

        {/* Loading */}

        {loading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="h-[185px] animate-pulse rounded-3xl bg-gray-100"
              />
            ))}
          </div>
        )}

        {/* Error */}

        {!loading && error && (
          <div className="py-10 text-center text-lg font-semibold text-red-500">
            {error}
          </div>
        )}

        {/* Empty */}

        {!loading && !error && categories.length === 0 && (
          <div className="py-10 text-center text-lg text-gray-500">
            No Categories Found
          </div>
        )}

        {/* Categories */}

        {!loading && !error && categories.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
              >
                <CategoryCard
                  item={item}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularCategories;