const express = require("express");

const router = express.Router();

const { protect, authorize } = require("../middleware/authMiddleware");

const {
  acceptBooking,
  rejectBooking,
  getMyBookings,
  completeBooking,
  getCustomerBooking,
  getCustomerBookings,
  cancelCustomerBooking,
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


router.get(
  "/customer",
  protect,
  authorize("customer"),
  getCustomerBookings
);

router.get(
  "/customer/:bookingId",
  protect,
  authorize("customer"),
  getCustomerBooking
);

router.put(
  "/customer/cancel/:bookingId",
  protect,
  authorize("customer"),
  cancelCustomerBooking
);
module.exports = router;
