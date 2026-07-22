const Review = require("../models/Review");
const Booking = require("../models/Booking");
const Provider = require("../models/Provider");

/* ============================================================
   Helper: Update Provider Rating
============================================================ */

const updateProviderRating = async (providerId) => {
  const reviews = await Review.find({
    provider: providerId,
  });

  const totalReviews = reviews.length;

  const averageRating =
    totalReviews === 0
      ? 0
      : Number(
          (
            reviews.reduce((sum, review) => sum + review.rating, 0) /
            totalReviews
          ).toFixed(1)
        );

  await Provider.findByIdAndUpdate(providerId, {
    rating: averageRating,
    totalReviews,
  });
};

/* ============================================================
   Give Review
============================================================ */

const giveReview = async (req, res) => {
  try {
    const { bookingId, rating, comment } = req.body;

    if (!bookingId || !rating) {
      return res.status(400).json({
        success: false,
        message: "Booking ID and Rating are required",
      });
    }

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (booking.customer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (booking.status !== "Completed") {
      return res.status(400).json({
        success: false,
        message: "Review allowed only after completed booking",
      });
    }

    const existingReview = await Review.findOne({
      booking: bookingId,
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "Review already submitted",
      });
    }

    const review = await Review.create({
      booking: bookingId,
      customer: booking.customer,
      provider: booking.provider,
      rating,
      comment,
    });

    await updateProviderRating(booking.provider);

    res.status(201).json({
      success: true,
      message: "Review submitted successfully",
      review,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

/* ============================================================
   Get Logged In Customer Reviews
============================================================ */

const getMyReviews = async (req, res) => {
  try {

    const reviews = await Review.find({
      customer: req.user._id,
    })
      .populate({
        path: "provider",
        populate: {
          path: "user",
          select: "name phone profileImage",
        },
      })
      .populate("booking")
      .sort({
        createdAt: -1,
      });

    res.json({
      success: true,
      reviews,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

/* ============================================================
   Update Review
============================================================ */

const updateReview = async (req, res) => {
  try {

    const { rating, comment } = req.body;

    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    if (review.customer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    review.rating = rating ?? review.rating;
    review.comment = comment ?? review.comment;

    await review.save();

    await updateProviderRating(review.provider);

    res.json({
      success: true,
      message: "Review updated successfully",
      review,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

/* ============================================================
   Delete Review
============================================================ */

const deleteReview = async (req, res) => {
  try {

    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    if (review.customer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const providerId = review.provider;

    await review.deleteOne();

    await updateProviderRating(providerId);

    res.json({
      success: true,
      message: "Review deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

/* ============================================================
   Get Reviews of Provider
============================================================ */

const getProviderReviews = async (req, res) => {
  try {

    const reviews = await Review.find({
      provider: req.params.providerId,
    })
      .populate("customer", "name profileImage")
      .sort({
        createdAt: -1,
      });

    res.json({
      success: true,
      count: reviews.length,
      reviews,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

/* ============================================================
   Exports
============================================================ */

module.exports = {
  giveReview,
  getMyReviews,
  updateReview,
  deleteReview,
  getProviderReviews,
};