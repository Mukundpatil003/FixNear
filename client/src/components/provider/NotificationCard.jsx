import { FiBell } from "react-icons/fi";

const NotificationCard = ({
  notification,
  onRead,
}) => {
  return (
    <div
      className={`rounded-2xl border p-5 shadow-sm ${
        notification.isRead
          ? "bg-white"
          : "bg-blue-50"
      }`}
    >
      <div className="flex justify-between">

        <div>

          <h3 className="font-bold">
            {notification.title}
          </h3>

          <p className="mt-2 text-gray-600">
            {notification.message}
          </p>

          <p className="mt-3 text-xs text-gray-400">
            {new Date(
              notification.createdAt
            ).toLocaleString()}
          </p>

        </div>

        {!notification.isRead && (
          <button
            onClick={() =>
              onRead(notification._id)
            }
            className="rounded-lg bg-blue-600 px-4 py-2 text-white"
          >
            Mark Read
          </button>
        )}

      </div>
    </div>
  );
};

export default NotificationCard;