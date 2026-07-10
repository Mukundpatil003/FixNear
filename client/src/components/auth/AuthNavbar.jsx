import { Link } from "react-router-dom";

const AuthNavbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur">

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">

        {/* Logo */}

        <Link
          to="/"
          className="text-5xl font-extrabold text-blue-600"
        >
          FixNear
        </Link>

        {/* Menu */}

        <nav className="hidden items-center gap-12 text-lg font-medium text-slate-700 lg:flex">

          <a href="/">Services</a>

          <a href="/">Professionals</a>

          <a href="/">About</a>

          <a href="/">Help</a>

        </nav>

        {/* Button */}

        <button className="rounded-2xl border border-slate-300 px-8 py-3 text-lg font-semibold transition hover:border-blue-600 hover:text-blue-600">
          Join as Pro
        </button>

      </div>

    </header>
  );
};

export default AuthNavbar;