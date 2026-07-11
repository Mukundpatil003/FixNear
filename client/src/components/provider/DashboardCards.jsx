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
      icon: <FiCalendar size={24} />,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      title: "Pending Bookings",
      value: dashboard?.pendingBookings ?? 0,
      icon: <FiClock size={24} />,
      color: "text-yellow-600",
      bg: "bg-yellow-100",
    },
    {
      title: "Completed Bookings",
      value: dashboard?.completedBookings ?? 0,
      icon: <FiCheckCircle size={24} />,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      title: "Rating",
      value: Number(dashboard?.rating ?? 0).toFixed(1),
      icon: <FiStar size={24} />,
      color: "text-orange-500",
      bg: "bg-orange-100",
    },
    {
      title: "Total Reviews",
      value: dashboard?.totalReviews ?? 0,
      icon: <FiMessageCircle size={24} />,
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
    {
      title: "Availability",
      value: dashboard?.isAvailable ? "Online" : "Offline",
      icon: <FiActivity size={24} />,
      color: dashboard?.isAvailable
        ? "text-green-600"
        : "text-red-600",
      bg: dashboard?.isAvailable
        ? "bg-green-100"
        : "bg-red-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-medium text-gray-500">
                {card.title}
              </p>

              <h2 className={`mt-3 text-4xl font-bold ${card.color}`}>
                {card.value}
              </h2>

            </div>

            <div
              className={`flex h-16 w-16 items-center justify-center rounded-2xl ${card.bg} ${card.color}`}
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