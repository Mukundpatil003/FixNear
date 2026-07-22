import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  FiBell,
  FiSearch,
  FiCheckCircle,
} from "react-icons/fi";

import {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  deleteNotification,
} from "../../api/notificationApi";

import NotificationCard from "../../components/customer/NotificationCard";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);

      const data = await getNotifications();

      if (data.success) {
        setNotifications(data.notifications);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRead = async (id) => {
    try {
      await markNotificationRead(id);

      setNotifications((prev) =>
        prev.map((item) =>
          item._id === id
            ? { ...item, isRead: true }
            : item
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNotification(id);

      setNotifications((prev) =>
        prev.filter((item) => item._id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleReadAll = async () => {
    try {
      await markAllNotificationsRead();

      setNotifications((prev) =>
        prev.map((item) => ({
          ...item,
          isRead: true,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const filteredNotifications = useMemo(() => {
    return notifications.filter((item) =>
      `${item.title} ${item.message}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [notifications, search]);

  const unreadCount = notifications.filter(
    (item) => !item.isRead
  ).length;

  return (
    <div className="min-h-screen bg-slate-50 p-8">

      {/* Header */}

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
      >
        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            Notifications
          </h1>

          <p className="mt-2 text-slate-500">
            Stay updated with your bookings.
          </p>
        </div>

        <button
          onClick={handleReadAll}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          <FiCheckCircle />

          Mark All Read
        </button>
      </motion.div>

      {/* Search */}

      <div className="relative mb-8">

        <FiSearch
          className="absolute left-4 top-4 text-gray-400"
          size={20}
        />

        <input
          type="text"
          placeholder="Search notifications..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full rounded-2xl border bg-white py-4 pl-12 pr-4 outline-none focus:border-blue-500"
        />

      </div>

      {/* Stats */}

      <div className="mb-8 rounded-2xl bg-white p-6 shadow">

        <div className="flex items-center gap-4">

          <div className="rounded-full bg-blue-100 p-4 text-blue-600">
            <FiBell size={28} />
          </div>

          <div>

            <h2 className="text-2xl font-bold">
              {notifications.length}
            </h2>

            <p className="text-slate-500">
              Total Notifications
            </p>

          </div>

          <div className="ml-auto rounded-full bg-red-100 px-4 py-2 font-semibold text-red-600">
            {unreadCount} Unread
          </div>

        </div>

      </div>

      {/* Loading */}

      {loading && (
        <div className="space-y-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-40 animate-pulse rounded-2xl bg-gray-200"
            />
          ))}
        </div>
      )}

      {/* Empty */}

      {!loading &&
        filteredNotifications.length === 0 && (
          <div className="rounded-3xl bg-white py-24 text-center shadow">

            <FiBell
              size={60}
              className="mx-auto text-gray-300"
            />

            <h2 className="mt-6 text-2xl font-bold">
              No Notifications
            </h2>

            <p className="mt-2 text-slate-500">
              You're all caught up.
            </p>

          </div>
        )}

      {/* Cards */}

      {!loading &&
        filteredNotifications.length > 0 && (
          <div className="space-y-6">

            {filteredNotifications.map(
              (notification) => (
                <NotificationCard
                  key={notification._id}
                  notification={notification}
                  onRead={handleRead}
                  onDelete={handleDelete}
                />
              )
            )}

          </div>
        )}

    </div>
  );
};

export default NotificationPage;