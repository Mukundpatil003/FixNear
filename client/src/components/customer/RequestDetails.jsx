import { FiPhone, FiNavigation, FiStar, FiMapPin, FiCheckCircle, FiClock, FiFileText, FiImage, FiMaximize2, FiX } from "react-icons/fi";
import Timeline from "./Timeline";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ReviewModal from "./ReviewModal";
import { giveReview } from "../../api/reviewApi";
import toast from "react-hot-toast";

const RequestDetails = ({ request }) => {
  const [showReview, setShowReview] = useState(false);
  const [showFullImage, setShowFullImage] = useState(false);
  const navigate = useNavigate();

  const handleReviewSubmit = async ({ rating, comment }) => {
    try {
      await giveReview({
        bookingId: request.booking._id,
        rating,
        comment,
      });

      toast.success("Review submitted successfully!");
      setShowReview(false);
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || "Failed to submit review."
      );
    }
  };

  if (!request) {
    return (
      <div className="sticky top-20 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm text-center space-y-3">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
          <FiFileText className="text-xl" />
        </div>
        <h2 className="text-base font-bold text-slate-900">Request Details</h2>
        <p className="text-xs text-slate-400">
          Select any service request card on the left to inspect full details, track technician, and review.
        </p>
      </div>
    );
  }

  const provider = request.assignedProvider;

  return (
    <>
      <div className="sticky top-20 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">Request Inspection</h2>
          <span className="text-[11px] font-bold text-slate-400">#{request._id.slice(-6).toUpperCase()}</span>
        </div>

        {/* Hero Header Pill Card */}
        <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-5 text-white shadow-md shadow-blue-500/20 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-blue-100 uppercase tracking-wider">Service Category</span>
            <span className="rounded-full bg-white/20 px-3 py-0.5 text-[11px] font-bold">
              {request.status}
            </span>
          </div>
          <h3 className="text-2xl font-black">{request.service}</h3>
          <p className="text-xs text-blue-100/90 leading-relaxed">{request.problem}</p>
        </div>

        {/* Attached Problem Photo */}
        {request.image && (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider flex items-center gap-1">
                <FiImage /> Attached Problem Photo
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
                alt="Uploaded Problem Photo"
                className="w-full h-36 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-1.5">
                <FiMaximize2 /> Click to enlarge
              </div>
            </div>
          </div>
        )}

        {/* Timeline Section */}
        <div className="border-t border-slate-100 pt-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
            Fulfillment Timeline
          </h3>
          <Timeline status={request.status} />
        </div>

        {/* Assigned Technician Profile */}
        {provider ? (
          <div className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={
                  provider?.user?.profileImage ||
                  provider?.profileImage ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    provider?.user?.name || "Provider"
                  )}&background=2563eb&color=fff`
                }
                alt="Provider"
                className="h-12 w-12 rounded-full border-2 border-white object-cover shadow-sm"
              />
              <div>
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1">
                  {provider?.user?.name}
                  <FiCheckCircle className="text-blue-600 text-xs" />
                </h4>
                <p className="text-xs text-slate-500">{provider?.service}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-md">
                    <FiStar className="fill-amber-400" /> {provider?.rating || "5.0"}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {provider?.experience || 0} yrs exp
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <a
                href={`tel:${provider?.phone || ""}`}
                className="flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 transition-colors"
              >
                <FiPhone /> Call Pro
              </a>

              <button
                onClick={() => {
                  if (!request.booking?._id) {
                    toast.error("Live tracking becomes available once booking is accepted");
                    return;
                  }
                  navigate(`/track/${request.booking._id}`);
                }}
                className="flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-blue-700 transition-colors cursor-pointer"
              >
                <FiNavigation /> Track Live
              </button>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 p-4 text-center">
            <p className="text-xs font-bold text-slate-600">Matching Nearby Technician</p>
            <p className="text-[11px] text-slate-400 mt-0.5">We are notifying active service providers near your address.</p>
          </div>
        )}

        {/* Payment Summary */}
        <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4 space-y-2 text-xs">
          <div className="flex justify-between text-slate-600">
            <span>Rate Estimate</span>
            <span className="font-bold text-slate-900">₹{provider?.pricePerHour || "---"}/hr</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Payment Status</span>
            <span className="font-bold text-emerald-600">Pending Job Finish</span>
          </div>
        </div>

        {request.status === "Completed" && request.booking && (
          <button
            onClick={() => setShowReview(true)}
            className="w-full rounded-2xl bg-amber-500 py-3 text-xs font-extrabold text-white shadow-md hover:bg-amber-600 transition-colors cursor-pointer"
          >
            ⭐⭐⭐⭐⭐ Write Customer Review
          </button>
        )}

        {request.booking && (
          <ReviewModal
            open={showReview}
            onClose={() => setShowReview(false)}
            onSubmit={handleReviewSubmit}
          />
        )}
      </div>

      {/* Image Lightbox Modal */}
      {showFullImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
          <div className="relative max-w-3xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl p-4 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 px-2">
              <h3 className="text-sm font-bold text-slate-900">Attached Problem Photo</h3>
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
                alt="Problem Photo Full"
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
          </div>
        </div>
      )}
    </>
  );
};

export default RequestDetails;