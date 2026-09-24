import {
  FiCalendar,
  FiClock,
  FiCheckCircle,
  FiStar,
  FiMessageCircle,
  FiActivity,
} from "react-icons/fi";

const DashboardCards = ({ dashboard }) => {
  const cards = [
    {
      title: "Total Bookings",
      value: dashboard?.totalBookings ?? 0,
      icon: <FiCalendar size={20} />,
      color: "text-blue-600",
      bg: "bg-blue-50 border-blue-100",
    },
    {
      title: "Pending Requests",
      value: dashboard?.pendingBookings ?? 0,
      icon: <FiClock size={20} />,
      color: "text-amber-600",
      bg: "bg-amber-50 border-amber-100",
    },
    {
      title: "Completed Jobs",
      value: dashboard?.completedBookings ?? 0,
      icon: <FiCheckCircle size={20} />,
      color: "text-emerald-600",
      bg: "bg-emerald-50 border-emerald-100",
    },
    {
      title: "Overall Rating",
      value: Number(dashboard?.rating ?? 0).toFixed(1),
      icon: <FiStar size={20} />,
      color: "text-amber-500",
      bg: "bg-amber-50 border-amber-100",
    },
    {
      title: "Customer Reviews",
      value: dashboard?.totalReviews ?? 0,
      icon: <FiMessageCircle size={20} />,
      color: "text-purple-600",
      bg: "bg-purple-50 border-purple-100",
    },
    {
      title: "Current Status",
      value: dashboard?.isAvailable ? "Online" : "Offline",
      icon: <FiActivity size={20} />,
      color: dashboard?.isAvailable ? "text-emerald-600" : "text-slate-500",
      bg: dashboard?.isAvailable ? "bg-emerald-50 border-emerald-100" : "bg-slate-100 border-slate-200",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/5"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {card.title}
              </p>
              <h2 className={`mt-2 text-3xl font-black ${card.color}`}>
                {card.value}
              </h2>
            </div>

            <div
              className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${card.bg} ${card.color}`}
            >
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;