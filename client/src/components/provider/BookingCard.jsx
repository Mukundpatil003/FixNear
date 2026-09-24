import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUser,
  FiPhone,
  FiCalendar,
  FiCheckCircle,
  FiMapPin,
  FiImage,
  FiMaximize2,
  FiX
} from "react-icons/fi";

const statusStyle = {
  Accepted: "bg-blue-50 text-blue-700 border-blue-200",
  Working: "bg-purple-50 text-purple-700 border-purple-200",
  Completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Cancelled: "bg-rose-50 text-rose-700 border-rose-200",
};

const BookingCard = ({ booking, onComplete }) => {
  const [showFullImage, setShowFullImage] = useState(false);
  const problemImage = booking.serviceRequest?.image;

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
                  {booking.customer?.name || "Customer"}
                </h2>
                <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mt-0.5">
                  {booking.serviceRequest?.service}
                </p>
              </div>
            </div>

            <span
              className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-bold ${
                statusStyle[booking.status] || "bg-slate-100 text-slate-700 border-slate-200"
              }`}
            >
              {booking.status}
            </span>
          </div>

          {/* Customer Problem Note & Image */}
          {(booking.serviceRequest?.problem || problemImage) && (
            <div className="mt-4 rounded-2xl bg-slate-50 p-4 border border-slate-100 space-y-3">
              {booking.serviceRequest?.problem && (
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Customer Issue Note
                  </p>
                  <p className="mt-1 text-xs font-medium text-slate-700 leading-relaxed">
                    {booking.serviceRequest.problem}
                  </p>
                </div>
              )}

              {/* Problem Photo if attached */}
              {problemImage && (
                <div className="pt-2 border-t border-slate-200/60">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider flex items-center gap-1">
                      <FiImage /> Problem Photo
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowFullImage(true)}
                      className="text-[10px] font-bold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <FiMaximize2 /> Enlarge
                    </button>
                  </div>
                  <div
                    onClick={() => setShowFullImage(true)}
                    className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-100 cursor-pointer group"
                  >
                    <img
                      src={problemImage}
                      alt="Customer Issue Photo"
                      className="w-full h-36 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-1">
                      <FiMaximize2 /> Click to inspect
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Details list */}
          <div className="mt-4 space-y-2 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <FiPhone className="text-blue-600 flex-shrink-0" />
              <a href={`tel:${booking.customer?.phone}`} className="hover:underline font-semibold text-slate-800">
                {booking.customer?.phone || "No phone provided"}
              </a>
            </div>

            {booking.serviceRequest?.address && (
              <div className="flex items-start gap-2">
                <FiMapPin className="text-rose-500 mt-0.5 flex-shrink-0" />
                <span className="line-clamp-2">{booking.serviceRequest.address}</span>
              </div>
            )}

            <div className="flex items-center gap-2 text-slate-400 text-[11px]">
              <FiCalendar className="flex-shrink-0" />
              <span>
                {new Date(booking.createdAt).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Complete CTA */}
        {booking.status !== "Completed" && (
          <button
            onClick={() => onComplete(booking._id)}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 py-3 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 transition-colors cursor-pointer"
          >
            <FiCheckCircle className="text-base" />
            Mark Job as Completed
          </button>
        )}
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
                  <p className="text-xs text-slate-500">{booking.customer?.name} - {booking.serviceRequest?.service}</p>
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
                  src={problemImage}
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

export default BookingCard;