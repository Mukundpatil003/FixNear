import { Link, useNavigate } from "react-router-dom";
import { FiBell, FiMenu, FiPlusCircle, FiSearch, FiUser } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";

const Topbar = ({ setMobileOpen }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200/80 bg-white/85 px-4 sm:px-6 lg:px-8 backdrop-blur-md">
      <div className="flex items-center gap-3">
        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-700 lg:hidden hover:bg-slate-50"
        >
          <FiMenu className="text-lg" />
        </button>

        <div>
          <h2 className="text-base font-extrabold tracking-tight text-slate-900 sm:text-lg">
            Hello, {user?.name?.split(" ")[0] || "User"} 👋
          </h2>
          <p className="hidden text-[11px] font-medium text-slate-500 sm:block">
            Find and manage local service bookings
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Create Request CTA */}
        <Link
          to="/service-request"
          className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-blue-700 transition-colors"
        >
          <FiPlusCircle className="text-sm" />
          New Request
        </Link>

        {/* Notifications Button */}
        <Link
          to="/customer/notifications"
          className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
        >
          <FiBell className="text-base" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-600 ring-2 ring-white"></span>
        </Link>

        {/* Profile Avatar */}
        <Link
          to="/customer/profile"
          className="flex items-center gap-2 rounded-full p-0.5 border border-slate-200 hover:border-blue-500 transition-colors"
        >
          <img
            src={
              user?.profileImage ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "Customer")}&background=2563eb&color=fff`
            }
            alt="User"
            className="h-8 w-8 rounded-full object-cover"
          />
        </Link>
      </div>
    </header>
  );
};

export default Topbar;
