import {
  ClipboardList,
  Clock3,
  CheckCircle2,
  XCircle,
} from "lucide-react";

const BookingStats = ({ bookings }) => {
  const total = bookings.length;

  const active = bookings.filter((b) =>
    ["Accepted", "Working"].includes(b.status)
  ).length;

  const completed = bookings.filter(
    (b) => b.status === "Completed"
  ).length;

  const cancelled = bookings.filter(
    (b) => b.status === "Cancelled"
  ).length;

  const stats = [
    {
      title: "Total",
      value: total,
      icon: <ClipboardList size={30} />,
      bg: "bg-blue-100",
      color: "text-blue-600",
    },
    {
      title: "Active",
      value: active,
      icon: <Clock3 size={30} />,
      bg: "bg-yellow-100",
      color: "text-yellow-600",
    },
    {
      title: "Completed",
      value: completed,
      icon: <CheckCircle2 size={30} />,
      bg: "bg-green-100",
      color: "text-green-600",
    },
    {
      title: "Cancelled",
      value: cancelled,
      icon: <XCircle size={30} />,
      bg: "bg-red-100",
      color: "text-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
      {stats.map((item) => (
        <div
          key={item.title}
          className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition"
        >
          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-500">
                {item.title}
              </p>

              <h2 className="text-4xl font-bold mt-3">
                {item.value}
              </h2>

            </div>

            <div
              className={`${item.bg} ${item.color} p-5 rounded-2xl`}
            >
              {item.icon}
            </div>

          </div>
        </div>
      ))}
    </div>
  );
};

export default BookingStats;