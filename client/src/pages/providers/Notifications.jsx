import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Topbar from "../../components/provider/Topbar";
import NotificationCard from "../../components/provider/NotificationCard";
import {
  getNotifications,
  markNotificationRead,
} from "../../api/notificationApi";

import {
  getProviderProfile,
  updateProviderProfile,
} from "../../api/providerApi";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [profile, notification] = await Promise.all([
        getProviderProfile(),
        getNotifications(),
      ]);

      if (profile.success) setProvider(profile.provider);
      if (notification.success) setNotifications(notification.notifications || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };

  const handleRead = async (id) => {
    try {
      await markNotificationRead(id);
      fetchData();
      toast.success("Marked as read");
    } catch (err) {
      console.error(err);
    }
  };

  const handleAvailability = async () => {
    try {
      await updateProviderProfile({
        isAvailable: !provider.isAvailable,
      });
      fetchData();
      toast.success("Status updated");
    } catch (err) {
      toast.error("Unable to update status");
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <p className="text-xs font-bold text-slate-500">Loading alerts...</p>
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

      <div className="pt-2 space-y-6">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
            Job Notifications & Alerts
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Realtime updates for customer requests, job acceptances, and reviews.
          </p>
        </div>

        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center">
            <p className="text-sm font-bold text-slate-700">No Notifications</p>
            <p className="text-xs text-slate-400 mt-1">You're all caught up with your partner alerts.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((n) => (
              <NotificationCard
                key={n._id}
                notification={n}
                onRead={handleRead}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;