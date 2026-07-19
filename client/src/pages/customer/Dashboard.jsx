import { useEffect, useState } from "react";

import { getCustomerDashboard } from "../../api/dashboardApi";

import DashboardHeader from "../../components/customer/dashboard/DashboardHeader";
import StatsGrid from "../../components/customer/dashboard/StatsGrid";
import ActiveBookingCard from "../../components/customer/dashboard/ActiveBookingCard";
import RecentRequestsCard from "../../components/customer/dashboard/RecentRequestsCard";
import CategorySection from "../../components/customer/dashboard/CategorySection";
import ProviderSection from "../../components/customer/dashboard/ProviderSection";


const Dashboard = () => {

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {

      const data = await getCustomerDashboard();

      if (data.success) {
        setDashboard(data);
      }

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-2xl font-bold">
        Loading...
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-[#F5F7FB]">
 
      <div className="mx-auto max-w-[1450px] px-10 py-10">

        <DashboardHeader />

        <StatsGrid
          stats={dashboard.stats}
        />

      

<div className="mt-10 grid grid-cols-1 xl:grid-cols-5 gap-8">

    <div className="xl:col-span-2">

        <ActiveBookingCard
            booking={dashboard.activeBooking}
        />

    </div>

    <div className="xl:col-span-3">

        <RecentRequestsCard
            requests={dashboard.recentRequests}
        />

    </div>

</div>

<div className="mt-12">

    <CategorySection
        categories={dashboard.categories}
    />

</div>

<div className="mt-12">

    <ProviderSection
        providers={dashboard.topProviders}
    />

</div>


      </div>

    </div>

  );
};

export default Dashboard;