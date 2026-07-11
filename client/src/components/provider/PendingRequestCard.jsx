import { motion } from "framer-motion";
import {
  FiMapPin,
  FiPhone,
  FiCheck,
  FiX,
  FiClock,
} from "react-icons/fi";

const PendingRequestCard = ({
  request,
  onAccept,
  onReject,
}) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-lg"
    >
      {/* Header */}

      <div className="flex items-start justify-between">

        <div>

          <h2 className="text-xl font-bold text-slate-900">
            {request.customer?.name}
          </h2>

          <p className="mt-1 text-blue-600 font-medium">
            {request.service}
          </p>

        </div>

        <span className="rounded-full bg-yellow-100 px-4 py-2 text-xs font-semibold text-yellow-700">
          Pending
        </span>

      </div>

      {/* Problem */}

      <div className="mt-5">

        <p className="text-sm font-semibold text-slate-600">
          Problem
        </p>

        <p className="mt-2 text-gray-600">
          {request.problem}
        </p>

      </div>

      {/* Phone */}

      <div className="mt-5 flex items-center gap-3 text-gray-600">

        <FiPhone className="text-blue-600" />

        <span>
          {request.customer?.phone}
        </span>

      </div>

      {/* Address */}

      <div className="mt-4 flex items-center gap-3 text-gray-600">

        <FiMapPin className="text-red-500" />

        <span>
          {request.address}
        </span>

      </div>

      {/* Time */}

      <div className="mt-4 flex items-center gap-3 text-gray-600">

        <FiClock className="text-green-600" />

        <span>
          {new Date(request.createdAt).toLocaleString()}
        </span>

      </div>

      {/* Buttons */}

      <div className="mt-8 flex gap-4">

        <button
          onClick={() => onAccept(request._id)}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700"
        >
          <FiCheck />

          Accept
        </button>

        <button
          onClick={() => onReject(request._id)}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
        >
          <FiX />

          Reject
        </button>

      </div>

    </motion.div>
  );
};

export default PendingRequestCard;