const express = require("express");

const router = express.Router();

const { protect, authorize } = require("../middleware/authMiddleware");

const {
  giveReview,
} = require("../controllers/reviewController");

// Customer Give Review
router.post(
  "/",
  protect,
  authorize("customer"),
  giveReview
);

router.post("/test", (req, res) => {
  res.json({
    success: true,
    message: "Review Route Working",
  });
});
module.exports = router;