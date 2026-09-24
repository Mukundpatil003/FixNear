import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";

const FAQItem = ({ faq }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
        open
          ? "border-blue-300 bg-white shadow-lg shadow-blue-500/5 ring-1 ring-blue-500/10"
          : "border-slate-200/80 bg-white shadow-sm hover:border-slate-300"
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-6 py-5 text-left cursor-pointer"
      >
        <h3 className="pr-6 text-base font-bold text-slate-800">
          {faq.question}
        </h3>

        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl text-sm transition-colors ${
            open ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"
          }`}
        >
          <FiChevronDown className="text-base" />
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="border-t border-slate-100 px-6 py-4 bg-slate-50/50">
              <p className="text-sm leading-relaxed text-slate-600">
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