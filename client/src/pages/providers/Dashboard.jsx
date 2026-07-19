import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Sidebar from "../../components/provider/Sidebar";
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

      socket.emit("providerLocation",{
        providerId: provider._id,
        latitude,
        longitude
      });

      try{

        await updateProviderLocation({
          latitude,
          longitude
        });

      }catch(err){

        console.log(err);

      }

    });

  },5000);

  return ()=>{

    clearInterval(interval);

  };

},[provider]);

const loadDashboard = async () => {
  try {
    setLoading(true);

    const dashboardRes = await getProviderDashboard();
    const profileRes = await getProviderProfile();

    console.log("Dashboard:", dashboardRes);
    console.log("Profile:", profileRes);

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