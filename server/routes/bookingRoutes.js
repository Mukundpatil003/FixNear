const express = require("express");

const router = express.Router();

const { protect, authorize } = require("../middleware/authMiddleware");

const {
  acceptBooking,
  getMyBookings,
} = require("../controllers/bookingController");

// Only provider can accept booking
router.put(
  "/accept/:requestId",
  protect,
  authorize("provider"),
  acceptBooking
);
router.get(
  "/my-bookings",
  protect,
  authorize("provider"),
  getMyBookings
);

module.exports = router;
