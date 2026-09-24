import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import {
  FiUser,
  FiGrid,
  FiLogOut,
  FiMenu,
  FiX,
  FiBriefcase,
  FiChevronRight
} from "react-icons/fi";
import { FaWrench } from "react-icons/fa";

import useAuth from "../../hooks/useAuth";
import socket from "../../socket/socket";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [showMenu, setShowMenu] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const scrollToSection = (id) => {
    if (location.pathname !== "/") {
      navigate(`/#${id}`);
      return;
    }
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setMobileNavOpen(false);
  };

  const handleServices = () => scrollToSection("services");
  const handleHowItWorks = () => scrollToSection("how-it-works");

  const handleLogout = () => {
    logout();
    socket.disconnect();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const goDashboard = () => {
    setShowMenu(false);
    setMobileNavOpen(false);
    if (user?.role === "customer") {
      navigate("/customer/dashboard");
    } else if (user?.role === "provider") {
      navigate("/provider/dashboard");
    }
  };

  const goProfile = () => {
    setShowMenu(false);
    setMobileNavOpen(false);
    if (user?.role === "customer") {
      navigate("/customer/profile");
    } else if (user?.role === "provider") {
      navigate("/provider/profile");
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/85 backdrop-blur-md shadow-sm border-b border-slate-200/80"
          : "bg-white/90 backdrop-blur-md border-b border-slate-100"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="group flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <FaWrench className="text-lg" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tight text-slate-900">
              Fix<span className="text-blue-600">Near</span>
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 -mt-1">
              Local Services
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 lg:flex">
          <Link
            to="/"
            className={`text-sm font-semibold transition-colors ${
              location.pathname === "/" ? "text-blue-600" : "text-slate-600 hover:text-blue-600"
            }`}
          >
            Home
          </Link>

          <button
            onClick={handleServices}
            className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-600 cursor-pointer"
          >
            Services
          </button>

          <button
            onClick={handleHowItWorks}
            className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-600 cursor-pointer"
          >
            How It Works
          </button>

          {(!user || user?.role === "customer") && (
            <Link
              to="/become-provider"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 transition-colors hover:text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-100/80"
            >
              <FiBriefcase className="text-sm" />
              Become Provider
            </Link>
          )}

          {user?.role === "provider" && (
            <Link
              to="/provider/dashboard"
              className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-600"
            >
              Dashboard
            </Link>
          )}
        </nav>

        {/* Right CTA / User Controls */}
        <div className="flex items-center gap-4">
          {!user ? (
            <div className="hidden sm:flex items-center gap-3">
              <Link
                to="/login"
                className="px-4 py-2.5 text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors"
              >
                Sign In
              </Link>

              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition-all hover:bg-blue-700 hover:shadow-lg active:scale-95"
              >
                Get Started
                <FiChevronRight className="text-base" />
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              {/* Dashboard Shortcut Button */}
              <button
                onClick={goDashboard}
                className="hidden sm:flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <FiGrid className="text-blue-600" />
                Dashboard
              </button>

              {/* Profile Dropdown */}
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="flex items-center gap-2 rounded-full p-1 border-2 border-slate-200 hover:border-blue-500 transition-colors cursor-pointer"
                >
                  <img
                    src={
                      user?.profileImage ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "User")}&background=2563eb&color=fff`
                    }
                    alt={user?.name || "Profile"}
                    className="h-9 w-9 rounded-full object-cover"
                  />
                </button>

                {showMenu && (
                  <div className="absolute right-0 mt-3 w-64 origin-top-right rounded-2xl border border-slate-100 bg-white p-2 shadow-2xl ring-1 ring-slate-900/5">
                    <div className="border-b border-slate-100 px-4 py-3">
                      <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Signed in as</p>
                      <p className="truncate text-sm font-bold text-slate-800 mt-0.5">{user?.name || "User"}</p>
                      <span className="inline-block mt-1 rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-600 uppercase">
                        {user?.role || "Customer"}
                      </span>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={goDashboard}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors cursor-pointer"
                      >
                        <FiGrid className="text-slate-400 group-hover:text-blue-600" />
                        Dashboard
                      </button>

                      <button
                        onClick={goProfile}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors cursor-pointer"
                      >
                        <FiUser className="text-slate-400 group-hover:text-blue-600" />
                        My Profile
                      </button>
                    </div>

                    <div className="border-t border-slate-100 pt-1">
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      >
                        <FiLogOut />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 lg:hidden hover:bg-slate-50"
            aria-label="Toggle navigation"
          >
            {mobileNavOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileNavOpen && (
        <div className="border-t border-slate-200/80 bg-white/95 backdrop-blur-xl px-6 py-6 lg:hidden">
          <div className="flex flex-col gap-4">
            <Link
              to="/"
              onClick={() => setMobileNavOpen(false)}
              className="text-base font-semibold text-slate-800 hover:text-blue-600"
            >
              Home
            </Link>

            <button
              onClick={handleServices}
              className="text-left text-base font-semibold text-slate-800 hover:text-blue-600 cursor-pointer"
            >
              Services
            </button>

            <button
              onClick={handleHowItWorks}
              className="text-left text-base font-semibold text-slate-800 hover:text-blue-600 cursor-pointer"
            >
              How It Works
            </button>

            {(!user || user?.role === "customer") && (
              <Link
                to="/become-provider"
                onClick={() => setMobileNavOpen(false)}
                className="text-base font-semibold text-indigo-600"
              >
                Become a Provider
              </Link>
            )}

            {!user ? (
              <div className="mt-4 flex flex-col gap-3 pt-4 border-t border-slate-100">
                <Link
                  to="/login"
                  onClick={() => setMobileNavOpen(false)}
                  className="w-full text-center rounded-xl border border-slate-200 py-3 text-sm font-semibold text-slate-700"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileNavOpen(false)}
                  className="w-full text-center rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-md"
                >
                  Get Started
                </Link>
              </div>
            ) : (
              <div className="mt-4 flex flex-col gap-2 pt-4 border-t border-slate-100">
                <button
                  onClick={goDashboard}
                  className="flex items-center gap-3 rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-800 cursor-pointer"
                >
                  <FiGrid className="text-blue-600" />
                  Dashboard
                </button>
                <button
                  onClick={goProfile}
                  className="flex items-center gap-3 rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-800 cursor-pointer"
                >
                  <FiUser className="text-blue-600" />
                  My Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 rounded-xl bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-600 cursor-pointer"
                >
                  <FiLogOut />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;