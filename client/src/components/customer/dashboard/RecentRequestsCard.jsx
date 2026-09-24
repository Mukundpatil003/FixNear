import {
  Wrench,
  Zap,
  Paintbrush,
  Scissors,
  ChevronRight
} from "lucide-react";
import { Link } from "react-router-dom";

const iconMap = {
  plumber: Wrench,
  electrician: Zap,
  painter: Paintbrush,
  salon: Scissors,
};

const statusStyle = {
  Completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
  Accepted: "bg-blue-50 text-blue-700 border-blue-200",
  Cancelled: "bg-rose-50 text-rose-700 border-rose-200",
};

const RecentRequestsCard = ({ requests = [] }) => {
  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Recent Service Requests</h2>
          <p className="text-xs text-slate-500">Track status of your recent requests</p>
        </div>

        <Link
          to="/customer/my-requests"
          className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700"
        >
          View All
          <ChevronRight size={14} />
        </Link>
      </div>

      {/* Requests List */}
      <div className="space-y-3">
        {requests.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-400 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
            No Recent Service Requests
          </div>
        ) : (
          requests.map((request) => {
            const Icon = iconMap[request.service?.toLowerCase()] || Wrench;

            return (
              <div
                key={request._id}
                className="flex items-center justify-between rounded-2xl border border-slate-100 p-4 transition-colors hover:bg-slate-50/80"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon size={20} />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-800">
                      {request.service}
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      {new Date(request.createdAt).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                <span
                  className={`rounded-full border px-3 py-1 text-[11px] font-bold ${
                    statusStyle[request.status] || "bg-slate-100 text-slate-600 border-slate-200"
                  }`}
                >
                  {request.status}
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default RecentRequestsCard;