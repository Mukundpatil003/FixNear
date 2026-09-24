import { Link } from "react-router-dom";
import { FaWrench } from "react-icons/fa";

const AuthNavbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20">
            <FaWrench className="text-lg" />
          </div>
          <span className="text-2xl font-black tracking-tight text-slate-900">
            Fix<span className="text-blue-600">Near</span>
          </span>
        </Link>

        {/* Links */}
        <nav className="hidden items-center gap-8 text-xs font-semibold text-slate-600 md:flex">
          <Link to="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <Link to="/providers" className="hover:text-blue-600 transition-colors">
            Services & Pros
          </Link>
          <Link to="/become-provider" className="hover:text-blue-600 transition-colors">
            Become a Provider
          </Link>
        </nav>

        {/* Action Button */}
        <Link
          to="/register"
          className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:border-blue-500 transition-all"
        >
          Create Account
        </Link>
      </div>
    </header>
  );
};

export default AuthNavbar;