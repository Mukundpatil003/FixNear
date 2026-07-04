const express = require("express");

const router = express.Router();

const { protect, authorize } = require("../middleware/authMiddleware");

const {
  acceptBooking,
  rejectBooking,
  getMyBookings,
  completeBooking,
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


router.put(
  "/reject/:requestId",
  protect,
  authorize("provider"),
  rejectBooking
);

router.put(
  "/complete/:bookingId",
  protect,
  authorize("provider"),
  completeBooking
);

module.exports = router;
