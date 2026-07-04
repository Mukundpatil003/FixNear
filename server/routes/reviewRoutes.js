const express = require("express");

const router = express.Router();
const { protect, authorize } = require("../middleware/authMiddleware");

const {
  giveReview,
} = require("../controllers/reviewController");

router.post(
  "/",
  protect,
  authorize("customer"),
  giveReview
);

module.exports = router;