import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Sidebar from "../../components/provider/Sidebar";
import Topbar from "../../components/provider/Topbar";
import DashboardCards from "../../components/provider/DashboardCards";

import {
  getProviderDashboard,
  getProviderProfile,
  updateProviderProfile,
} from "../../api/providerApi";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const dashboardRes = await getProviderDashboard();
      const profileRes = await getProviderProfile();

      if (dashboardRes.success) {
        setDashboard(dashboardRes.dashboard);
      }

      if (profileRes.success) {
        setProvider(profileRes.provider);
      }
    } catch (error) {
      console.log(error);

      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  const handleAvailability = async () => {
    try {
      const response = await updateProviderProfile({
        isAvailable: !provider.isAvailable,
      });

      if (response.success) {
        toast.success(response.message);

        loadDashboard();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to update availability"
      );
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-xl font-semibold">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-100">

      {/* Sidebar */}

      <Sidebar />

      {/* Main */}

      <div className="flex-1 p-8">

        <Topbar
          provider={provider}
          isAvailable={provider?.isAvailable}
          onAvailabilityChange={handleAvailability}
        />

        <div className="mt-8">

          <DashboardCards dashboard={dashboard} />

        </div>

      </div>

    </div>
  );
};

export default Dashboard;