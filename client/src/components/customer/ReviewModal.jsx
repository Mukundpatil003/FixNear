import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiSave } from "react-icons/fi";
import StarRating from "./StarRating";

const ReviewModal = ({
  open,
  onClose,
  onSubmit,
  review = null,
}) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (review) {
      setRating(review.rating);
      setComment(review.comment || "");
    } else {
      setRating(5);
      setComment("");
    }
  }, [review]);

  const handleSubmit = () => {
    if (rating < 1) {
      alert("Please select a rating.");
      return;
    }

    onSubmit({
      rating,
      comment,
    });
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{
              scale: 0.8,
              opacity: 0,
              y: 30,
            }}
            animate={{
              scale: 1,
              opacity: 1,
              y: 0,
            }}
            exit={{
              scale: 0.8,
              opacity: 0,
              y: 30,
            }}
            transition={{
              duration: 0.25,
            }}
            className="w-full max-w-lg rounded-3xl bg-white shadow-2xl"
          >
            {/* Header */}

            <div className="flex items-center justify-between border-b p-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">
                  {review ? "Edit Review" : "Write Review"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Share your experience with the provider.
                </p>
              </div>

              <button
                onClick={onClose}
                className="rounded-full p-2 hover:bg-gray-100"
              >
                <FiX size={22} />
              </button>
            </div>

            {/* Body */}

            <div className="space-y-6 p-6">
              <div>
                <label className="mb-3 block text-sm font-semibold text-slate-700">
                  Rating
                </label>

                <StarRating
                  rating={rating}
                  editable
                  onChange={setRating}
                  size={34}
                />
              </div>

              <div>
                <label className="mb-3 block text-sm font-semibold text-slate-700">
                  Review
                </label>

                <textarea
                  rows={5}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tell others about your experience..."
                  className="w-full rounded-2xl border border-slate-300 p-4 outline-none transition focus:border-blue-500"
                />
              </div>
            </div>

            {/* Footer */}

            <div className="flex justify-end gap-3 border-t p-6">
              <button
                onClick={onClose}
                className="rounded-xl border px-5 py-3 font-medium hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
              >
                <FiSave />

                {review ? "Update Review" : "Submit Review"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ReviewModal;