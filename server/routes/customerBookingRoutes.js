const express = require("express");
const router = express.Router();


const { protect } = require("../middleware/authMiddleware");
const {
  getCustomerBookings,
  getBookingDetails,
  cancelBooking,
} = require("../controllers/customerBookingController");

router.get("/", protect, getCustomerBookings);
router.get("/:id", protect, getBookingDetails);
router.put("/:id/cancel", protect, cancelBooking);

module.exports = router;
