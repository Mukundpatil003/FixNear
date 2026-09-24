import { motion } from "framer-motion";
import { FiMapPin, FiCalendar, FiUser, FiNavigation, FiClock } from "react-icons/fi";

const statusStyle = {
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
  Accepted: "bg-blue-50 text-blue-700 border-blue-200",
  Working: "bg-purple-50 text-purple-700 border-purple-200",
  Completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Cancelled: "bg-rose-50 text-rose-700 border-rose-200",
};

const RequestCard = ({ request, onClick }) => {
  const provider = request.assignedProvider;

  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -4 }}
      className="group cursor-pointer rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10"
    >
      {/* Top Section */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-lg font-black text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform flex-shrink-0">
            {request.service?.charAt(0).toUpperCase()}
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
              {request.service}
            </h2>
            <p className="mt-1 text-xs text-slate-500 line-clamp-2 leading-relaxed max-w-xl">
              {request.problem}
            </p>
          </div>
        </div>

        <span
          className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-bold ${
            statusStyle[request.status] || "bg-slate-100 text-slate-700 border-slate-200"
          }`}
        >
          {request.status}
        </span>
      </div>

      {/* Address */}
      <div className="mt-4 flex items-center gap-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
        <FiMapPin className="text-rose-500 flex-shrink-0" />
        <span className="truncate">{request.address}</span>
      </div>

      {/* Footer Details */}
      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-xs">
        <div className="flex items-center gap-3">
          <img
            src={
              provider?.user?.profileImage ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                provider?.user?.name || "Assigning Pro"
              )}&background=2563eb&color=fff`
            }
            alt="Pro Avatar"
            className="h-9 w-9 rounded-full object-cover border border-slate-200"
          />

          <div>
            <p className="font-bold text-slate-800">
              {provider?.user?.name || "Matching Technician..."}
            </p>
            <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
              <FiCalendar className="text-slate-400" />
              <span>
                {new Date(request.createdAt).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
          </div>
        </div>

        {provider ? (
          <button className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-blue-700 transition-colors">
            <FiNavigation size={13} />
            Track Status
          </button>
        ) : (
          <span className="inline-flex items-center gap-1 rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-500">
            <FiClock className="animate-spin text-blue-600" />
            Searching Pros
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default RequestCard;