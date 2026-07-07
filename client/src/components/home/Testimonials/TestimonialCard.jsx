import { motion } from "framer-motion";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

const TestimonialCard = ({ testimonial }) => {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      transition={{ duration: 0.3 }}
      className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 shadow-md transition-all duration-500 hover:shadow-xl"
    >
      {/* Quote */}

      <FaQuoteLeft className="absolute right-5 top-5 text-5xl text-blue-50 transition-all duration-500 group-hover:scale-110" />

      {/* Stars */}

      <div className="mb-4 flex">

        {[...Array(testimonial.rating)].map((_, index) => (
          <FaStar
            key={index}
            className="mr-1 text-sm text-yellow-400"
          />
        ))}

      </div>

      {/* Review */}

      <p className="text-[15px] italic leading-7 text-gray-600">
        "{testimonial.review}"
      </p>

      {/* Divider */}

      <div className="my-6 h-px bg-gray-100"></div>

      {/* User */}

      <div className="flex items-center">

        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="h-14 w-14 rounded-full border-2 border-blue-100 object-cover"
        />

        <div className="ml-4">

          <h3 className="text-base font-bold text-gray-900">
            {testimonial.name}
          </h3>

          <p className="text-sm text-gray-500">
            {testimonial.city}
          </p>

        </div>

      </div>

      {/* Bottom Line */}

      <div className="absolute bottom-0 left-0 h-1 w-0 bg-blue-600 transition-all duration-500 group-hover:w-full"></div>

    </motion.div>
  );
};

export default TestimonialCard;