import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaArrowRight,
  FaWrench,
  FaShieldAlt,
  FaHeadset
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800/80">
      {/* Top Banner Feature Bar */}
      <div className="border-b border-slate-900 bg-slate-900/40 py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
              <FaShieldAlt className="text-xl" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">100% Verified Experts</h4>
              <p className="text-xs text-slate-400">Background checked professionals</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400">
              <FaWrench className="text-xl" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Transparent Pricing</h4>
              <p className="text-xs text-slate-400">No hidden fees, upfront estimates</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
              <FaHeadset className="text-xl" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">24/7 Dedicated Support</h4>
              <p className="text-xs text-slate-400">Here to assist you anytime</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30">
                <FaWrench className="text-lg" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Fix<span className="text-blue-500">Near</span>
              </span>
            </div>

            <p className="text-sm leading-relaxed text-slate-400 max-w-md">
              FixNear connects homeowners and businesses with top-rated local technicians and service providers in minutes. Safe, reliable, and convenient.
            </p>

            <div className="flex gap-3 pt-2">
              {[FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter].map(
                (Icon, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{ y: -3, scale: 1.05 }}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-slate-400 border border-slate-800 transition-colors hover:bg-blue-600 hover:text-white hover:border-blue-600"
                  >
                    <Icon size={15} />
                  </motion.a>
                )
              )}
            </div>
          </div>

          {/* Quick Services */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-5">
              Popular Services
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              {[
                "Electrician",
                "Plumbing Repair",
                "Home Cleaning",
                "Carpenter",
                "AC Service & Repair",
                "Home Painting",
              ].map((item) => (
                <li
                  key={item}
                  className="transition-colors hover:text-blue-400 cursor-pointer flex items-center gap-1.5"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500/40"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-5">
              Company
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              {[
                "About Us",
                "How it Works",
                "Become a Provider",
                "Safety & Trust",
                "Privacy Policy",
                "Terms of Service",
              ].map((item) => (
                <li
                  key={item}
                  className="transition-colors hover:text-blue-400 cursor-pointer flex items-center gap-1.5"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-500/40"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-5">
              Stay Updated
            </h3>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Subscribe to get special discounts and local service updates.
            </p>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-2.5">
              <input
                type="email"
                placeholder="Enter email address"
                className="w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-2.5 text-xs text-white placeholder:text-slate-500 outline-none focus:border-blue-500 transition-colors"
              />
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md transition-all hover:opacity-90 active:scale-95"
              >
                Subscribe
                <FaArrowRight size={12} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-slate-900 pt-8 text-xs text-slate-500 md:flex-row">
          <p>© 2026 FixNear Inc. All rights reserved.</p>

          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Cookies</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;