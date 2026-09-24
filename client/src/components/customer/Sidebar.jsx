import { NavLink, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiGrid,
  FiClipboard,
  FiCalendar,
  FiUser,
  FiBell,
  FiLogOut,
  FiX,
  FiPlusCircle
} from "react-icons/fi";
import { FaWrench } from "react-icons/fa";

import useAuth from "../../hooks/useAuth";
import socket from "../../socket/socket";

const Sidebar = ({ mobileOpen, setMobileOpen }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Dashboard",
      icon: <FiGrid size={18} />,
      path: "/customer/dashboard",
    },
    {
      name: "My Requests",
      icon: <FiClipboard size={18} />,
      path: "/customer/my-requests",
    },
    {
      name: "My Bookings",
      icon: <FiCalendar size={18} />,
      path: "/customer/bookings",
    },
    {
      name: "Notifications",
      icon: <FiBell size={18} />,
      path: "/customer/notifications",
    },
    {
      name: "My Profile",
      icon: <FiUser size={18} />,
      path: "/customer/profile",
    },
  ];

  const handleLogout = () => {
    logout();
    socket.disconnect();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const navContent = (
    <div className="flex h-full flex-col justify-between bg-slate-950 text-slate-300 p-5">
      <div>
        {/* Header Branding */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-800/80 pt-2">
          <NavLink to="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20">
              <FaWrench className="text-lg" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight text-white">
                Fix<span className="text-blue-500">Near</span>
              </h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Customer Portal
              </p>
            </div>
          </NavLink>

          {setMobileOpen && (
            <button
              onClick={() => setMobileOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white p-1"
            >
              <FiX className="text-xl" />
            </button>
          )}
        </div>

        {/* Quick Action Button */}
        <div className="mt-5">
          <NavLink
            to="/service-request"
            onClick={() => setMobileOpen && setMobileOpen(false)}
            className="flex items-center justify-center gap-2 w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 text-xs font-bold text-white shadow-md shadow-blue-600/20 hover:shadow-lg transition-all"
          >
            <FiPlusCircle className="text-base" />
            Request a Service
          </NavLink>
        </div>

        {/* Navigation Items */}
        <nav className="mt-6 space-y-1.5">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen && setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3.5 rounded-2xl px-4 py-3 text-xs font-bold transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                    : "text-slate-400 hover:bg-slate-900 hover:text-white"
                }`
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Footer Profile & Logout */}
      <div className="border-t border-slate-800/80 pt-4 space-y-3">
        <div className="flex items-center gap-3 px-2">
          <img
            src={
              user?.profileImage ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "Customer")}&background=2563eb&color=fff`
            }
            alt="Avatar"
            className="h-9 w-9 rounded-full object-cover border border-slate-700"
          />
          <div className="truncate">
            <p className="truncate text-xs font-bold text-white">{user?.name || "Customer"}</p>
            <p className="truncate text-[10px] text-slate-400">{user?.email || "User"}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 border border-slate-800 py-2.5 text-xs font-bold text-rose-400 hover:bg-rose-500/10 hover:text-rose-400 transition-colors cursor-pointer"
        >
          <FiLogOut className="text-sm" />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden lg:block w-64 flex-shrink-0 h-screen sticky top-0 shadow-xl z-20">
        {navContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          ></div>
          <div className="relative w-72 h-full z-10 animate-in slide-in-from-left duration-200">
            {navContent}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;