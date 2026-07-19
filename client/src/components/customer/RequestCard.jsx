import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUserCircle,
} from "react-icons/fa";

const RequestCard = ({ request, onClick }) => {
  const provider = request.assignedProvider;

  return (
    <motion.div
    onClick={onClick}
      whileHover={{ y: -5 }}
      className="rounded-3xl cursor-pointer bg-white p-7 shadow-lg transition-all"
    >
      {/* Header */}

      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-600">
            {request.service?.charAt(0)}
          </div>

          <div>
            <h2 className="text-3xl font-bold">
              {request.service}
            </h2>

            <p className="max-w-xl text-gray-500">
              {request.problem}
            </p>
          </div>
        </div>

        <span
          className={`rounded-full px-5 py-2 font-semibold
          ${
            request.status === "Pending"
              ? "bg-yellow-100 text-yellow-700"
              : request.status === "Accepted"
              ? "bg-blue-100 text-blue-700"
              : request.status === "Working"
              ? "bg-purple-100 text-purple-700"
              : request.status === "Completed"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {request.status}
        </span>
      </div>

      {/* Address */}

      <div className="mt-8 flex items-center gap-3 text-gray-500">
        <FaMapMarkerAlt />

        {request.address}
      </div>

      {/* Footer */}

      <div className="mt-8 flex items-center justify-between border-t pt-6">
        <div className="flex items-center gap-3">
          <FaUserCircle size={42} />

          <div>
            <p className="font-semibold">
              {provider?.user?.name || "Provider Not Assigned"}
            </p>

            <div className="flex items-center gap-2 text-gray-500">
              <FaCalendarAlt />

              {new Date(request.createdAt).toLocaleString()}
            </div>
          </div>
        </div>

        {provider ? (
          <button className="rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700">
            Track
          </button>
        ) : (
          <button
            disabled
            className="cursor-not-allowed rounded-xl bg-gray-300 px-6 py-3 text-gray-600"
          >
            Waiting...
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default RequestCard;