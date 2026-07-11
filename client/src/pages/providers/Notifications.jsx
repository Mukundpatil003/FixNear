import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Sidebar from "../../components/provider/Sidebar";
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
  const [notifications, setNotifications] =
    useState([]);

  const [provider, setProvider] =
    useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const profile =
      await getProviderProfile();

    const notification =
      await getNotifications();

    if (profile.success)
      setProvider(profile.provider);

    if (notification.success)
      setNotifications(
        notification.notifications
      );
  };

  const handleRead = async (id) => {
    await markNotificationRead(id);

    fetchData();

    toast.success("Marked as read");
  };

  const handleAvailability =
    async () => {
      await updateProviderProfile({
        isAvailable:
          !provider.isAvailable,
      });

      fetchData();
    };

  return (
    <div className="flex min-h-screen bg-slate-100">

      <Sidebar />

      <div className="flex-1 p-8">

        <Topbar
          provider={provider}
          isAvailable={
            provider?.isAvailable
          }
          onAvailabilityChange={
            handleAvailability
          }
        />

        <div className="mt-8">

          <h1 className="mb-6 text-3xl font-bold">
            Notifications
          </h1>

          <div className="space-y-5">

            {notifications.map((n) => (
              <NotificationCard
                key={n._id}
                notification={n}
                onRead={handleRead}
              />
            ))}

          </div>

        </div>

      </div>

    </div>
  );
};

export default Notifications;