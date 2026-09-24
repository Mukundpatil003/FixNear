import { motion } from "framer-motion";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";

const TestimonialCard = ({ testimonial }) => {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.25 }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-7 shadow-sm transition-all duration-300 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10"
    >
      <FaQuoteLeft className="absolute right-6 top-6 text-4xl text-blue-50 transition-colors group-hover:text-blue-100/70" />

      <div>
        {/* Rating Stars */}
        <div className="mb-4 flex items-center gap-1">
          {[...Array(testimonial.rating || 5)].map((_, index) => (
            <FaStar
              key={index}
              className="text-sm text-amber-400"
            />
          ))}
        </div>

        {/* Review Content */}
        <p className="relative z-10 text-sm leading-relaxed text-slate-600">
          "{testimonial.review}"
        </p>
      </div>

      <div className="mt-6 border-t border-slate-100 pt-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="h-11 w-11 rounded-full border border-blue-200 object-cover"
          />
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              {testimonial.name}
              <FiCheckCircle className="text-xs text-blue-600" />
            </h3>
            <p className="text-xs text-slate-400">{testimonial.city || "Verified Customer"}</p>
          </div>
        </div>

        <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-blue-600">
          Verified Booking
        </span>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;