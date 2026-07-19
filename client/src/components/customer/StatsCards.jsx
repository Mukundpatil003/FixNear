import {
  FaClipboardList,
  FaClock,
  FaCheck,
  FaTools,
} from "react-icons/fa";

const StatsCards = ({ requests }) => {
  const total = requests.length;

  const pending = requests.filter(
    (r) => r.status === "Pending"
  ).length;

  const accepted = requests.filter(
    (r) =>
      r.status === "Accepted" ||
      r.status === "On The Way" ||
      r.status === "Working"
  ).length;

  const completed = requests.filter(
    (r) => r.status === "Completed"
  ).length;

  const cards = [
    {
      title: "Total Requests",
      count: total,
      icon: <FaClipboardList size={28} />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Pending",
      count: pending,
      icon: <FaClock size={28} />,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Accepted",
      count: accepted,
      icon: <FaCheck size={28} />,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Completed",
      count: completed,
      icon: <FaTools size={28} />,
      color: "bg-green-100 text-green-600",
    },
  ];

  return (
    <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-3xl bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
        >
          <div
            className={`flex h-16 w-16 items-center justify-center rounded-full ${card.color}`}
          >
            {card.icon}
          </div>

          <p className="mt-6 text-gray-500">
            {card.title}
          </p>

          <h2 className="mt-2 text-5xl font-bold">
            {card.count}
          </h2>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;