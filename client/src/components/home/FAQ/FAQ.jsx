import { motion } from "framer-motion";
import { faqs } from "../../../data/faqs";
import FAQItem from "./FAQItem";

const FAQ = () => {
  return (
    <section className="bg-[#F8FAFC] py-24">

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
            Support
          </span>

          <h2 className="mt-5 text-[40px] font-extrabold leading-tight text-gray-900">
            Frequently Asked Questions
          </h2>

          <p className="mt-4 text-[17px] leading-8 text-gray-500">
            Find answers to the most common questions about bookings,
            payments and our verified professionals.
          </p>

        </motion.div>

        {/* FAQ */}

        <div className="mx-auto max-w-5xl space-y-5">

          {faqs.map((faq, index) => (

            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
            >
              <FAQItem faq={faq} />
            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default FAQ;