import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMapPin,
  FiPhone,
  FiCheck,
  FiX,
  FiClock,
  FiUser,
  FiImage,
  FiMaximize2
} from "react-icons/fi";

const PendingRequestCard = ({
  request,
  onAccept,
  onReject,
}) => {
  const [showFullImage, setShowFullImage] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{ y: -4 }}
        className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all hover:shadow-xl hover:shadow-blue-500/5 flex flex-col justify-between"
      >
        <div>
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 font-bold text-sm">
                <FiUser className="text-lg" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  {request.customer?.name || "Customer"}
                </h2>
                <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mt-0.5">
                  {request.service}
                </p>
              </div>
            </div>

            <span className="rounded-full bg-amber-50 border border-amber-200 px-3 py-1 text-xs font-bold text-amber-700">
              Pending Action
            </span>
          </div>

          {/* Problem description & Attached Image Box */}
          <div className="mt-4 rounded-2xl bg-slate-50 p-4 border border-slate-100 space-y-3">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Issue Reported
              </p>
              <p className="mt-1 text-xs font-medium text-slate-700 leading-relaxed">
                {request.problem}
              </p>
            </div>

            {/* Attached Image from Customer */}
            {request.image && (
              <div className="pt-2 border-t border-slate-200/60">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider flex items-center gap-1">
                    <FiImage /> Problem Photo Attached
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowFullImage(true)}
                    className="text-[10px] font-bold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <FiMaximize2 /> View Full
                  </button>
                </div>
                <div
                  onClick={() => setShowFullImage(true)}
                  className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-100 cursor-pointer group"
                >
                  <img
                    src={request.image}
                    alt="Customer Problem Photo"
                    className="w-full h-36 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-1.5">
                    <FiMaximize2 /> Click to Inspect
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Contact & Location details */}
          <div className="mt-4 space-y-2 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <FiPhone className="text-blue-600 flex-shrink-0" />
              <span>{request.customer?.phone || "No phone provided"}</span>
            </div>

            <div className="flex items-start gap-2">
              <FiMapPin className="text-rose-500 mt-0.5 flex-shrink-0" />
              <span className="line-clamp-2">{request.address}</span>
            </div>

            <div className="flex items-center gap-2 text-slate-400 text-[11px]">
              <FiClock className="flex-shrink-0" />
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

        {/* Action buttons */}
        <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-4">
          <button
            onClick={() => onAccept(request._id)}
            className="flex-1 flex items-center justify-center gap-1.5 rounded-2xl bg-emerald-600 py-3 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 transition-colors cursor-pointer"
          >
            <FiCheck className="text-base" />
            Accept Request
          </button>

          <button
            onClick={() => onReject(request._id)}
            className="flex-1 flex items-center justify-center gap-1.5 rounded-2xl border border-rose-200 bg-rose-50 py-3 text-xs font-bold text-rose-600 hover:bg-rose-100 transition-colors cursor-pointer"
          >
            <FiX className="text-base" />
            Decline
          </button>
        </div>
      </motion.div>

      {/* Full Image Modal */}
      <AnimatePresence>
        {showFullImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-3xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl p-4 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 px-2">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Customer Problem Photo</h3>
                  <p className="text-xs text-slate-500">{request.customer?.name} - {request.service}</p>
                </div>
                <button
                  onClick={() => setShowFullImage(false)}
                  className="rounded-xl bg-slate-100 p-2 text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  <FiX className="text-lg" />
                </button>
              </div>

              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 max-h-[70vh] flex items-center justify-center">
                <img
                  src={request.image}
                  alt="Customer Problem Photo Full"
                  className="max-h-[70vh] w-auto object-contain"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setShowFullImage(false)}
                  className="rounded-2xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  Close Photo
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PendingRequestCard;