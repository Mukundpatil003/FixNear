import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import {
  FiUser,
  FiGrid,
  FiLogOut,
} from "react-icons/fi";

import useAuth from "../../hooks/useAuth";
import socket from "../../socket/socket";

const Navbar = () => {
  const { user, logout } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const [showMenu, setShowMenu] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handler
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handler
      );
  }, []);

  // ===============================
  // Scroll To Section
  // ===============================

  const scrollToSection = (id) => {
    if (location.pathname !== "/") {
      navigate(`/#${id}`);
      return;
    }

    const section =
      document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const handleServices = () => {
    scrollToSection("services");
  };

  const handleHowItWorks = () => {
    scrollToSection("how-it-works");
  };

  // ===============================

  const handleLogout = () => {
    logout();

    socket.disconnect();

    localStorage.removeItem("token");

    navigate("/login");
  };

  const goDashboard = () => {
    setShowMenu(false);

    if (user.role === "customer") {
      navigate("/customer/dashboard");
    }

    if (user.role === "provider") {
      navigate("/provider/dashboard");
    }
  };

  const goProfile = () => {
    setShowMenu(false);

    if (user.role === "customer") {
      navigate("/customer/profile");
    }

    if (user.role === "provider") {
      navigate("/provider/profile");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/90 backdrop-blur-lg">

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">

        {/* Logo */}

        <Link
          to="/"
          className="text-3xl font-extrabold text-blue-600"
        >
          FixNear
        </Link>

        {/* Navigation */}

        <nav className="hidden items-center gap-12 lg:flex">

          <Link
            to="/"
            className="font-semibold text-blue-600"
          >
            Home
          </Link>

          <button
            onClick={handleServices}
            className="font-medium text-gray-600 transition hover:text-blue-600"
          >
            Services
          </button>

          <button
            onClick={handleHowItWorks}
            className="font-medium text-gray-600 transition hover:text-blue-600"
          >
            How It Works
          </button>

          {(!user ||
            user.role === "customer") && (
            <Link
              to="/become-provider"
              className="font-medium text-gray-600 transition hover:text-blue-600"
            >
              Become Provider
            </Link>
          )}

          {user?.role === "provider" && (
            <Link
              to="/provider/dashboard"
              className="font-medium text-gray-600 transition hover:text-blue-600"
            >
              Dashboard
            </Link>
          )}
        </nav>

        {/* Right */}

        <div className="flex items-center gap-5">

          {!user ? (
            <>
              <Link
                to="/login"
                className="font-semibold text-gray-700 hover:text-blue-600"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-xl bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
              >
                Register
              </Link>
            </>
          ) : (
            <div
              className="relative"
              ref={menuRef}
            >
              <img
                src={
                  user?.profileImage ||
                  `https://ui-avatars.com/api/?name=${user?.name || "User"}`
                }
                alt="profile"
                onClick={() =>
                  setShowMenu(!showMenu)
                }
                className="h-11 w-11 cursor-pointer rounded-full border object-cover"
              />

              {showMenu && (
                <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-2xl border bg-white shadow-xl">

                  <button
                    onClick={goProfile}
                    className="flex w-full items-center gap-3 px-5 py-4 text-left hover:bg-gray-100"
                  >
                    <FiUser />

                    My Profile
                  </button>

                  <button
                    onClick={goDashboard}
                    className="flex w-full items-center gap-3 px-5 py-4 text-left hover:bg-gray-100"
                  >
                    <FiGrid />

                    Dashboard
                  </button>

                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-5 py-4 text-left text-red-600 hover:bg-red-50"
                  >
                    <FiLogOut />

                    Logout
                  </button>

                </div>
              )}
            </div>
          )}

        </div>

      </div>

    </header>
  );
};

export default Navbar;