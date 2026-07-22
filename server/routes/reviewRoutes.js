const express = require("express");

const router = express.Router();

const {
  giveReview,
  getMyReviews,
  updateReview,
  deleteReview,
  getProviderReviews,
} = require("../controllers/reviewController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

/* ============================================================
   Customer Reviews
============================================================ */

// Get Logged In Customer Reviews
router.get(
  "/",
  protect,
  authorize("customer"),
  getMyReviews
);

// Give Review
router.post(
  "/",
  protect,
  authorize("customer"),
  giveReview
);

// Update Review
router.put(
  "/:id",
  protect,
  authorize("customer"),
  updateReview
);

// Delete Review
router.delete(
  "/:id",
  protect,
  authorize("customer"),
  deleteReview
);

/* ============================================================
   Provider Reviews
============================================================ */

// Anyone logged in can view provider reviews
router.get(
  "/provider/:providerId",
  protect,
  getProviderReviews
);

module.exports = router;