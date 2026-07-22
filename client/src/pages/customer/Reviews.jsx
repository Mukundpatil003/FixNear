import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  FiSearch,
  FiStar,
  FiMessageSquare,
} from "react-icons/fi";

import {
  getMyReviews,
  updateReview,
  deleteReview,
} from "../../api/reviewApi";

import ReviewCard from "../../components/customer/ReviewCard";
import ReviewModal from "../../components/customer/ReviewModal";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [selectedReview, setSelectedReview] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      setLoading(true);

      const res = await getMyReviews();

      if (res.success) {
        setReviews(res.reviews);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {
      const provider =
        review.provider?.user?.name || "";

      const comment =
        review.comment || "";

      return (
        provider
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        comment
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    });
  }, [reviews, search]);

  const handleEdit = (review) => {
    setSelectedReview(review);
    setOpenModal(true);
  };

  const handleUpdate = async (data) => {
    try {
      const res = await updateReview(
        selectedReview._id,
        data
      );

      if (res.success) {
        setReviews((prev) =>
          prev.map((item) =>
            item._id === selectedReview._id
              ? res.review
              : item
          )
        );

        setOpenModal(false);
        setSelectedReview(null);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Delete this review?"
      )
    )
      return;

    try {
      const res = await deleteReview(id);

      if (res.success) {
        setReviews((prev) =>
          prev.filter(
            (item) => item._id !== id
          )
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const averageRating =
    reviews.length === 0
      ? 0
      : (
          reviews.reduce(
            (sum, item) =>
              sum + item.rating,
            0
          ) / reviews.length
        ).toFixed(1);

  return (
    <div className="min-h-screen bg-slate-50 p-8">

      {/* Header */}

      <motion.div
        initial={{
          opacity: 0,
          y: -15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="mb-8 flex items-center justify-between"
      >
        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            My Reviews
          </h1>

          <p className="mt-2 text-slate-500">
            Manage all your provider reviews.
          </p>
        </div>
      </motion.div>

      {/* Search */}

      <div className="relative mb-8">

        <FiSearch
          className="absolute left-4 top-4 text-gray-400"
          size={20}
        />

        <input
          type="text"
          placeholder="Search reviews..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full rounded-2xl border bg-white py-4 pl-12 pr-4 outline-none focus:border-blue-500"
        />

      </div>

      {/* Stats */}

      <div className="mb-10 grid gap-6 md:grid-cols-2">

        <div className="rounded-3xl bg-white p-6 shadow">

          <div className="flex items-center gap-4">

            <div className="rounded-full bg-yellow-100 p-4">
              <FiStar
                size={30}
                className="text-yellow-500"
              />
            </div>

            <div>

              <h2 className="text-3xl font-bold">
                {averageRating}
              </h2>

              <p className="text-slate-500">
                Average Rating
              </p>

            </div>

          </div>

        </div>

        <div className="rounded-3xl bg-white p-6 shadow">

          <div className="flex items-center gap-4">

            <div className="rounded-full bg-blue-100 p-4">
              <FiMessageSquare
                size={30}
                className="text-blue-600"
              />
            </div>

            <div>

              <h2 className="text-3xl font-bold">
                {reviews.length}
              </h2>

              <p className="text-slate-500">
                Total Reviews
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Loading */}

      {loading && (
        <div className="space-y-5">
          {Array.from({
            length: 4,
          }).map((_, i) => (
            <div
              key={i}
              className="h-40 animate-pulse rounded-3xl bg-gray-200"
            />
          ))}
        </div>
      )}

      {/* Empty */}

      {!loading &&
        filteredReviews.length === 0 && (
          <div className="rounded-3xl bg-white py-20 text-center shadow">

            <FiStar
              size={60}
              className="mx-auto text-gray-300"
            />

            <h2 className="mt-5 text-2xl font-bold">
              No Reviews Found
            </h2>

            <p className="mt-2 text-slate-500">
              You haven't reviewed any providers yet.
            </p>

          </div>
        )}

      {/* Reviews */}

      {!loading &&
        filteredReviews.length > 0 && (
          <div className="space-y-6">

            {filteredReviews.map(
              (review) => (
                <ReviewCard
                  key={review._id}
                  review={review}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              )
            )}

          </div>
        )}

      {/* Modal */}

      <ReviewModal
        open={openModal}
        review={selectedReview}
        onClose={() => {
          setOpenModal(false);
          setSelectedReview(null);
        }}
        onSubmit={handleUpdate}
      />

    </div>
  );
};

export default Reviews;