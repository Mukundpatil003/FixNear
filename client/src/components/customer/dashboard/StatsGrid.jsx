import {
  ClipboardList,
  BriefcaseBusiness,
  BadgeCheck,
  Wallet,
} from "lucide-react";

import StatCard from "./StatCard";

const StatsGrid = ({ stats }) => {
  return (
    <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      <StatCard
        title="Total Requests"
        value={stats.totalRequests}
        icon={<ClipboardList size={34} />}
        bgColor="bg-indigo-100"
        iconColor="text-indigo-600"
      />

      <StatCard
        title="Active Booking"
        value={stats.activeBookings}
        icon={<BriefcaseBusiness size={34} />}
        bgColor="bg-orange-100"
        iconColor="text-orange-600"
      />

      <StatCard
        title="Completed"
        value={stats.completedBookings}
        icon={<BadgeCheck size={34} />}
        bgColor="bg-green-100"
        iconColor="text-green-600"
      />

      <StatCard
        title="Total Spent"
        value={`₹${stats.totalSpent}`}
        icon={<Wallet size={34} />}
        bgColor="bg-purple-100"
        iconColor="text-purple-600"
      />

    </div>
  );
};

export default StatsGrid;