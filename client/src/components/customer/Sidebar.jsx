import { NavLink, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiGrid,
  FiClipboard,
  FiCalendar,
  FiUser,
  FiBell,
  FiStar,
  FiLogOut,
} from "react-icons/fi";

import useAuth from "../../hooks/useAuth";
import socket from "../../socket/socket";

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Home",
      icon: <FiHome size={20} />,
      path: "/",
    },
    {
      name: "Dashboard",
      icon: <FiGrid size={20} />,
      path: "/customer/dashboard",
    },
    {
      name: "My Profile",
      icon: <FiUser size={20} />,
      path: "/customer/profile",
    },
    {
      name: "My Requests",
      icon: <FiClipboard size={20} />,
      path: "/customer/my-requests",
    },
    {
      name: "My Bookings",
      icon: <FiCalendar size={20} />,
      path: "/customer/bookings",
    },
    {
      name: "Notifications",
      icon: <FiBell size={20} />,
      path: "/customer/notifications",
    },
    {
      name: "Reviews",
      icon: <FiStar size={20} />,
      path: "/customer/reviews",
    },
  ];

  const handleLogout = () => {
    logout();
    socket.disconnect();
    navigate("/login");
  };

  return (
    <aside className="flex h-screen w-[270px] flex-col bg-slate-900 text-white shadow-2xl">

      {/* Logo */}

      <div className="border-b border-slate-700 p-8">
        <h1 className="text-3xl font-extrabold tracking-wide text-blue-500">
          FixNear
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Customer Dashboard
        </p>
      </div>

      {/* Navigation */}

      <nav className="mt-8 flex-1 px-4">

        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              `mb-3 flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-300 ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            {item.icon}

            <span className="font-medium">
              {item.name}
            </span>
          </NavLink>
        ))}

      </nav>

      {/* Logout */}

      <div className="border-t border-slate-700 p-5">

        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-3 rounded-xl bg-red-600 py-4 font-semibold transition hover:bg-red-700"
        >
          <FiLogOut size={20} />

          Logout
        </button>

      </div>
    </aside>
  );
};

export default Sidebar;