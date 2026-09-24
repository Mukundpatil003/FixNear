import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Topbar from "../../components/provider/Topbar";
import DashboardCards from "../../components/provider/DashboardCards";
import socket from "../../socket/socket";
import {
  getProviderDashboard,
  getProviderProfile,
  updateProviderProfile,
  updateProviderLocation
} from "../../api/providerApi";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  useEffect(() => {
    if (!provider) return;
    socket.connect();
    socket.emit("join", provider.user._id);

    return () => {
      socket.disconnect();
    };
  }, [provider]);

  useEffect(() => {
    if (!provider) return;
    if (!provider._id) return;

    if (!socket.connected) {
      socket.connect();
    }

    const interval = setInterval(() => {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        socket.emit("providerLocation", {
          providerId: provider._id,
          latitude,
          longitude
        });

        try {
          await updateProviderLocation({
            latitude,
            longitude
          });
        } catch (err) {
          console.log(err);
        }
      });
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [provider]);

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
      toast.error("Failed to load provider dashboard");
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
        toast.success(response.message || "Status updated");
        loadDashboard();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to update status"
      );
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <p className="text-xs font-bold text-slate-500">Loading Provider Hub...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Topbar
        provider={provider}
        isAvailable={provider?.isAvailable}
        onAvailabilityChange={handleAvailability}
      />

      <div className="pt-2">
        <DashboardCards dashboard={dashboard} />
      </div>
    </div>
  );
};

export default Dashboard;