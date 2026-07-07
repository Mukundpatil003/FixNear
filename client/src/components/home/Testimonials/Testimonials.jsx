import { motion } from "framer-motion";
import { testimonials } from "../../../data/testimonials";
import TestimonialCard from "./TestimonialCard";

const Testimonials = () => {
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
            Testimonials
          </span>

          <h2 className="mt-5 text-[40px] font-extrabold leading-tight text-gray-900">
            Loved by Thousands of Happy Customers
          </h2>

          <p className="mt-4 text-[17px] leading-8 text-gray-500">
            Real experiences from customers who trusted FixNear for their home
            service needs.
          </p>

        </motion.div>

        {/* Cards */}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

          {testimonials.map((testimonial, index) => (

            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.12,
              }}
            >
              <TestimonialCard testimonial={testimonial} />
            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default Testimonials;