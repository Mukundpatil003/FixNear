import {
  FaBolt,
  FaWrench,
  FaHammer,
  FaPaintRoller,
  FaCar,
  FaBroom,
  FaSnowflake,
  FaCut,
} from "react-icons/fa";

import CategoryCard from "./CategoryCard";

const categories = [
  {
    title: "Electrician",
    icon: <FaBolt />,
  },
  {
    title: "Plumber",
    icon: <FaWrench />,
  },
  {
    title: "Carpenter",
    icon: <FaHammer />,
  },
  {
    title: "Painter",
    icon: <FaPaintRoller />,
  },
  {
    title: "Mechanic",
    icon: <FaCar />,
  },
  {
    title: "Cleaner",
    icon: <FaBroom />,
  },
  {
    title: "AC Repair",
    icon: <FaSnowflake />,
  },
  {
    title: "Salon",
    icon: <FaCut />,
  },
];

const Categories = () => {
  return (
    <section className="bg-white py-24">

      <div className="mx-auto max-w-[1280px] px-8">

        <h2 className="text-center text-[42px] font-bold text-[#111827]">
          Popular Categories
        </h2>

        <p className="mt-4 text-center text-gray-500">
          Most requested services by our happy customers
        </p>

        <div className="mt-16 grid grid-cols-4 gap-8">

          {categories.map((category) => (
            <CategoryCard
              key={category.title}
              title={category.title}
              icon={category.icon}
            />
          ))}

        </div>

      </div>

    </section>
  );
};

export default Categories;