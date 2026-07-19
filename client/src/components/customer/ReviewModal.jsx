import { useState } from "react";
import { submitReview } from "../../api/reviewApi";
import toast from "react-hot-toast";

const ReviewModal = ({ bookingId, onClose }) => {

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
      console.log("Booking ID:", bookingId);

    try {

      const data = await submitReview({
        bookingId,
        rating,
        comment,
      });

      if (data.success) {

        toast.success("Review Submitted");

        onClose();

      }

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
        "Failed to submit review"
      );

    }

  };

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      <div className="w-[420px] rounded-3xl bg-white p-8">

        <h2 className="text-3xl font-bold">
          Rate Provider
        </h2>

        <div className="mt-8 flex justify-center gap-3">

          {[1,2,3,4,5].map((star)=>(

            <button
              key={star}
              onClick={() => setRating(star)}
              className={`text-5xl ${
                star <= rating
                  ? "text-yellow-400"
                  : "text-gray-300"
              }`}
            >
              ★
            </button>

          ))}

        </div>

        <textarea
          rows={5}
          placeholder="Write your experience..."
          value={comment}
          onChange={(e)=>setComment(e.target.value)}
          className="mt-8 w-full rounded-xl border p-4"
        />

        <div className="mt-8 flex gap-4">

          <button
            onClick={onClose}
            className="flex-1 rounded-xl border py-3"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="flex-1 rounded-xl bg-blue-600 py-3 text-white"
          >
            Submit
          </button>

        </div>

      </div>

    </div>

  );

};

export default ReviewModal;