import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaArrowRight,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0B1220] text-white">

      <div className="mx-auto max-w-7xl px-8 py-20">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Logo */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >

            <h2 className="text-3xl font-extrabold text-blue-500">
              FixNear
            </h2>

            <p className="mt-5 text-[15px] leading-7 text-gray-400">
              India's trusted platform for booking verified electricians,
              plumbers, carpenters, cleaners and other local professionals.
            </p>

            <div className="mt-6 flex gap-3">

              {[FaFacebookF, FaInstagram, FaLinkedinIn, FaGithub].map(
                (Icon, index) => (
                  <motion.div
                    key={index}
                    whileHover={{
                      y: -4,
                      scale: 1.08,
                    }}
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#182235] transition hover:bg-blue-600"
                  >
                    <Icon size={16} />
                  </motion.div>
                )
              )}

            </div>

          </motion.div>

          {/* Services */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
          >

            <h3 className="mb-6 text-xl font-bold">
              Services
            </h3>

            <ul className="space-y-3 text-gray-400">

              {[
                "Electrician",
                "Plumber",
                "Cleaning",
                "Carpenter",
                "AC Repair",
                "Painting",
              ].map((item) => (
                <li
                  key={item}
                  className="cursor-pointer transition hover:translate-x-1 hover:text-blue-400"
                >
                  {item}
                </li>
              ))}

            </ul>

          </motion.div>

          {/* Company */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >

            <h3 className="mb-6 text-xl font-bold">
              Company
            </h3>

            <ul className="space-y-3 text-gray-400">

              {[
                "About Us",
                "Careers",
                "Privacy Policy",
                "Terms",
                "Contact",
              ].map((item) => (
                <li
                  key={item}
                  className="cursor-pointer transition hover:translate-x-1 hover:text-blue-400"
                >
                  {item}
                </li>
              ))}

            </ul>

          </motion.div>

          {/* Newsletter */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >

            <h3 className="mb-6 text-xl font-bold">
              Newsletter
            </h3>

            <p className="mb-5 text-[15px] leading-7 text-gray-400">
              Subscribe to receive updates, offers and service tips.
            </p>

            <div className="overflow-hidden rounded-xl border border-gray-700 bg-[#182235]">

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-transparent px-4 py-3 text-white placeholder:text-gray-500 outline-none"
              />

              <button className="flex w-full items-center justify-center gap-2 bg-blue-600 py-3 font-semibold transition hover:bg-blue-700">

                Subscribe

                <FaArrowRight size={14} />

              </button>

            </div>

          </motion.div>

        </div>

        {/* Bottom */}

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-gray-800 pt-6 text-sm text-gray-500 md:flex-row">

          <p>
            © 2026 FixNear. All Rights Reserved.
          </p>

          <div className="flex gap-6">

            <span className="cursor-pointer hover:text-white">
              Privacy
            </span>

            <span className="cursor-pointer hover:text-white">
              Terms
            </span>

            <span className="cursor-pointer hover:text-white">
              Support
            </span>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;