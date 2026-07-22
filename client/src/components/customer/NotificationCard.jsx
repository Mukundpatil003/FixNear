import {
  FiBell,
  FiCheck,
  FiTrash2,
} from "react-icons/fi";
import { motion } from "framer-motion";

const NotificationCard = ({
  notification,
  onRead,
  onDelete,
}) => {
  const formatTime = (date) => {
    const now = new Date();
    const created = new Date(date);

    const diff = Math.floor(
      (now - created) / 1000
    );

    if (diff < 60) return `${diff} sec ago`;

    if (diff < 3600)
      return `${Math.floor(diff / 60)} min ago`;

    if (diff < 86400)
      return `${Math.floor(diff / 3600)} hrs ago`;

    return `${Math.floor(diff / 86400)} day ago`;
  };

  return (
    <motion.div
      layout
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
      }}
      className={`rounded-2xl border p-6 shadow-sm transition-all duration-300 hover:shadow-lg ${
        notification.isRead
          ? "bg-white"
          : "border-blue-500 bg-blue-50"
      }`}
    >
      <div className="flex justify-between">

        <div className="flex gap-4">

          <div
            className={`flex h-12 w-12 items-center justify-center rounded-full ${
              notification.isRead
                ? "bg-gray-100"
                : "bg-blue-600 text-white"
            }`}
          >
            <FiBell size={22} />
          </div>

          <div>

            <h3 className="text-lg font-bold text-slate-800">
              {notification.title}
            </h3>

            <p className="mt-2 text-slate-600">
              {notification.message}
            </p>

            <p className="mt-3 text-sm text-slate-400">
              {formatTime(
                notification.createdAt
              )}
            </p>

          </div>

        </div>

        {!notification.isRead && (
          <span className="h-fit rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
            NEW
          </span>
        )}

      </div>

      <div className="mt-6 flex gap-3">

        {!notification.isRead && (
          <button
            onClick={() =>
              onRead(notification._id)
            }
            className="flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
          >
            <FiCheck />

            Mark Read
          </button>
        )}

        <button
          onClick={() =>
            onDelete(notification._id)
          }
          className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
        >
          <FiTrash2 />

          Delete
        </button>

      </div>

    </motion.div>
  );
};

export default NotificationCard;