const mongoose = require("mongoose");
const Review = require("../models/Review");
const Booking = require("../models/Booking");
const Provider = require("../models/Provider");

const giveReview = async (req, res) => {
  try {
    const { bookingId, rating, comment } = req.body;

    // Check Booking
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Booking must belong to logged in customer
    if (booking.customer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // Booking must be completed
    if (booking.status !== "Completed") {
      return res.status(400).json({
        success: false,
        message: "Review allowed only after completed booking",
      });
    }

    // Prevent duplicate review
    const existingReview = await Review.findOne({
      booking: bookingId,
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "Review already submitted",
      });
    }

    // Create Review
    const review = await Review.create({
      booking: bookingId,
      customer: booking.customer,
      provider: booking.provider,
      rating,
      comment,
    });
// Calculate New Rating
const reviews = await Review.find({
    provider: booking.provider,
});

const totalReviews = reviews.length;

const totalRating = reviews.reduce((sum, item) => {
    return sum + item.rating;
}, 0);

const averageRating = Number(
    (totalRating / totalReviews).toFixed(1)
);

// Update Provider
await Provider.findByIdAndUpdate(
    booking.provider,
    {
        rating: averageRating,
        totalReviews,
    }
);
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

module.exports = {
  giveReview,
};