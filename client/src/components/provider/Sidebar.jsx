import { NavLink, useNavigate } from "react-router-dom";
import {
  FiGrid,
  FiClock,
  FiCalendar,
  FiUser,
  FiBell,
  FiLogOut,
} from "react-icons/fi";

import useAuth from "../../hooks/useAuth";
import socket from "../../socket/socket";

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Dashboard",
      icon: <FiGrid size={22} />,
      path: "/provider/dashboard",
    },
    {
      name: "Pending Requests",
      icon: <FiClock size={22} />,
      path: "/provider/pending",
    },
    {
      name: "My Bookings",
      icon: <FiCalendar size={22} />,
      path: "/provider/bookings",
    },
    {
      name: "Profile",
      icon: <FiUser size={22} />,
      path: "/provider/profile",
    },
    {
      name: "Notifications",
      icon: <FiBell size={22} />,
      path: "/provider/notifications",
    },
  ];

  const handleLogout = () => {
    logout();
    socket.disconnect();
    navigate("/login");
  };

  return (
    <aside className="fixed left-0 top-0 flex h-screen w-72 flex-col bg-slate-900 text-white shadow-2xl">

      {/* Logo */}

      <div className="border-b border-slate-700 px-8 py-8">

        <h1 className="text-4xl font-extrabold text-blue-500">
          FixNear
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Provider Dashboard
        </p>

      </div>

      {/* Menu */}

      <nav className="flex-1 overflow-y-auto px-5 py-8">

        <div className="space-y-3">

          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `group flex items-center gap-4 rounded-2xl px-5 py-4 text-lg font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          ))}

        </div>

      </nav>

      {/* Logout */}

      <div className="border-t border-slate-700 p-5">

        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-3 rounded-2xl bg-red-600 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-red-700 hover:shadow-lg"
        >
          <FiLogOut size={22} />
          Logout
        </button>

      </div>

    </aside>
  );
};

export default Sidebar;