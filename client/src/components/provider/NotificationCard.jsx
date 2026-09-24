import { FiBell, FiCheck } from "react-icons/fi";
import { motion } from "framer-motion";

const NotificationCard = ({ notification, onRead }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-3xl border p-5 shadow-sm transition-all ${
        notification.isRead
          ? "bg-white border-slate-200/80"
          : "border-blue-300 bg-gradient-to-r from-blue-50/70 to-indigo-50/70 shadow-blue-500/5"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div
            className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl ${
              notification.isRead
                ? "bg-slate-100 text-slate-500"
                : "bg-blue-600 text-white shadow-md shadow-blue-500/20"
            }`}
          >
            <FiBell size={18} />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900">
                {notification.title}
              </h3>
              {!notification.isRead && (
                <span className="rounded-full bg-blue-600 px-2 py-0.5 text-[10px] font-bold text-white">
                  NEW
                </span>
              )}
            </div>

            <p className="mt-1 text-xs text-slate-600 leading-relaxed">
              {notification.message}
            </p>

            <p className="mt-2 text-[11px] font-medium text-slate-400">
              {new Date(notification.createdAt).toLocaleString(undefined, {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </div>

        {!notification.isRead && (
          <button
            onClick={() => onRead(notification._id)}
            className="flex items-center gap-1 rounded-xl bg-emerald-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 transition-colors cursor-pointer"
          >
            <FiCheck /> Read
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default NotificationCard;