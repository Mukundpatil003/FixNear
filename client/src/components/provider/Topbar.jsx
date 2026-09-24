import { Link } from "react-router-dom";
import { FiBell, FiMenu } from "react-icons/fi";

const Topbar = ({
  provider,
  isAvailable,
  onAvailabilityChange,
  setMobileOpen
}) => {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200/80 bg-white/85 px-4 sm:px-6 lg:px-8 backdrop-blur-md">
      <div className="flex items-center gap-3">
        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileOpen && setMobileOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-700 lg:hidden hover:bg-slate-50"
        >
          <FiMenu className="text-lg" />
        </button>

        <div>
          <h2 className="text-base font-extrabold tracking-tight text-slate-900 sm:text-lg">
            Provider Dashboard
          </h2>
          <p className="hidden text-[11px] font-medium text-slate-500 sm:block">
            Manage your service requests and work status
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Online / Offline Availability Switch */}
        <div className="flex items-center gap-2.5 rounded-2xl border border-slate-200 bg-slate-50/80 px-3 py-1.5">
          <span className="hidden text-xs font-bold text-slate-600 sm:inline">
            Status:
          </span>

          <span
            className={`inline-flex items-center gap-1.5 text-xs font-bold ${
              isAvailable ? "text-emerald-600" : "text-slate-500"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                isAvailable ? "bg-emerald-500 animate-pulse" : "bg-slate-400"
              }`}
            ></span>
            {isAvailable ? "Online" : "Offline"}
          </span>

          <button
            type="button"
            onClick={onAvailabilityChange}
            className={`relative h-6 w-11 rounded-full transition-colors cursor-pointer ${
              isAvailable ? "bg-emerald-500" : "bg-slate-300"
            }`}
          >
            <span
              className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                isAvailable ? "left-6" : "left-1"
              }`}
            />
          </button>
        </div>

        {/* Notifications Icon */}
        <Link
          to="/provider/notifications"
          className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
        >
          <FiBell className="text-base" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
        </Link>

        {/* Profile Avatar */}
        <Link
          to="/provider/profile"
          className="flex items-center gap-2.5 rounded-full p-0.5 border border-slate-200 hover:border-blue-500 transition-colors"
        >
          <img
            src={
              provider?.user?.profileImage ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                provider?.user?.name || "Provider"
              )}&background=2563eb&color=fff`
            }
            alt="Provider"
            className="h-8 w-8 rounded-full object-cover"
          />
        </Link>
      </div>
    </header>
  );
};

export default Topbar;