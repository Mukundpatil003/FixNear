import { motion } from "framer-motion";
import { categories } from "../../data/categories";
import CategoryCard from "./CategoryCard";

const PopularCategories = () => {
  return (
    <section className="bg-white py-24">

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

        {/* Categories */}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {categories.map((item, index) => (

            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
            >
              <CategoryCard item={item} />
            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default PopularCategories;