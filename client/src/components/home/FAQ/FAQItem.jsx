import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

const FAQItem = ({ faq }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-md transition-all duration-300 hover:shadow-xl">

      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-6 py-5 text-left"
      >

        <h3 className="pr-6 text-lg font-semibold text-gray-900">
          {faq.question}
        </h3>

        <motion.div
          animate={{
            rotate: open ? 180 : 0,
          }}
          transition={{
            duration: 0.3,
          }}
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm text-blue-600"
        >
          <FaChevronDown />
        </motion.div>

      </button>

      <AnimatePresence>

        {open && (

          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            transition={{
              duration: 0.3,
            }}
            className="overflow-hidden"
          >

            <div className="border-t border-gray-100 px-6 py-5">

              <p className="text-[15px] leading-7 text-gray-600">
                {faq.answer}
              </p>

            </div>

          </motion.div>

        )}

      </AnimatePresence>

    </div>
  );
};

export default FAQItem;