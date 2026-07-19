import {
  User,
  CalendarDays,
  MessageSquare,
  History,
  Wallet,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menus = [
  {
    title: "Profile",
    icon: User,
    path: "/customer/profile",
  },
  {
    title: "Bookings",
    icon: CalendarDays,
    path: "/customer/bookings",
  },
  {
    title: "Messages",
    icon: MessageSquare,
    path: "/customer/messages",
  },
  {
    title: "History",
    icon: History,
    path: "/customer/history",
  },
  {
    title: "Payments",
    icon: Wallet,
    path: "/customer/payments",
  },
];
const DashboardSidebar = () => {
  return (
    <aside className="flex h-full min-h-screen w-[290px] flex-col justify-between border-r border-slate-200 bg-white px-6 py-8">

      <div>

        <div className="space-y-3">

          {menus.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.title}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-4 rounded-2xl px-5 py-4 text-lg font-medium transition-all ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-lg"
                      : "text-slate-600 hover:bg-slate-100"
                  }`
                }
              >
                <Icon size={22} />

                {item.title}
              </NavLink>
            );
          })}
        </div>

        <div className="mt-12 rounded-[28px] bg-gradient-to-r from-indigo-600 to-blue-600 p-6 text-white shadow-xl">

          <Crown size={40} />

          <h3 className="mt-4 text-2xl font-bold">

            Upgrade to Gold

          </h3>

          <p className="mt-2 text-sm text-indigo-100">

            Unlock premium providers,
            discounts and priority booking.

          </p>

          <button className="mt-6 w-full rounded-full bg-white py-3 font-semibold text-indigo-700 transition hover:scale-105">

            Upgrade

          </button>

        </div>

      </div>

      <div className="space-y-2">

        <NavLink
          to="/customer/settings"
          className="flex items-center gap-4 rounded-xl px-4 py-3 text-slate-600 hover:bg-slate-100"
        >
          <Settings size={20} />

          Settings

        </NavLink>

        <NavLink
          to="/customer/support"
          className="flex items-center gap-4 rounded-xl px-4 py-3 text-slate-600 hover:bg-slate-100"
        >
          <HelpCircle size={20} />

          Support

        </NavLink>

      </div>

    </aside>
  );
};

export default DashboardSidebar;