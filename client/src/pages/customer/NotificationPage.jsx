import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FiBell, FiSearch, FiCheckCircle } from "react-icons/fi";
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
        setNotifications(data.notifications || []);
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
          item._id === id ? { ...item, isRead: true } : item
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNotification(id);
      setNotifications((prev) => prev.filter((item) => item._id !== id));
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

  const unreadCount = notifications.filter((item) => !item.isRead).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
            Notifications Center
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Realtime service alerts, technician updates, and booking confirmations.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={handleReadAll}
            className="inline-flex items-center gap-1.5 rounded-2xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-blue-700 transition-colors cursor-pointer"
          >
            <FiCheckCircle />
            Mark All as Read
          </button>
        )}
      </div>

      {/* Search Bar */}
      <div className="relative">
        <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
        <input
          type="text"
          placeholder="Filter notifications..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-2xl border border-slate-200/80 bg-white py-2.5 pl-9 pr-4 text-xs font-semibold text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
        />
      </div>

      {/* Metrics Pill Card */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <FiBell size={20} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">{notifications.length} Total Alerts</p>
            <p className="text-xs text-slate-400">All activity logs</p>
          </div>
        </div>

        {unreadCount > 0 ? (
          <span className="rounded-full bg-rose-50 border border-rose-200 px-3 py-1 text-xs font-bold text-rose-600">
            {unreadCount} Unread
          </span>
        ) : (
          <span className="rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-bold text-emerald-600">
            All Caught Up
          </span>
        )}
      </div>

      {/* Loading */}
      {loading && (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-24 animate-pulse rounded-3xl bg-slate-200/60"
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredNotifications.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center">
          <FiBell size={40} className="text-slate-300 mb-3" />
          <p className="text-sm font-bold text-slate-700">No Notifications</p>
          <p className="text-xs text-slate-400 mt-1">You're all caught up with your service updates.</p>
        </div>
      )}

      {/* List */}
      {!loading && filteredNotifications.length > 0 && (
        <div className="space-y-3">
          {filteredNotifications.map((notification) => (
            <NotificationCard
              key={notification._id}
              notification={notification}
              onRead={handleRead}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationPage;