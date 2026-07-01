const express = require("express");

const router = express.Router();

const { protect, authorize } = require("../middleware/authMiddleware");

// Customer Dashboard
router.get(
  "/customer",
  protect,
  authorize("customer"),
  (req, res) => {

    res.json({
      success: true,
      message: "Welcome Customer Dashboard",
      user: req.user
    });

  }
);

// Provider Dashboard
router.get(
  "/provider",
  protect,
  authorize("provider"),
  (req, res) => {

    res.json({
      success: true,
      message: "Welcome Provider Dashboard",
      user: req.user
    });

  }
);

// Admin Dashboard
router.get(
  "/admin",
  protect,
  authorize("admin"),
  (req, res) => {

    res.json({
      success: true,
      message: "Welcome Admin Dashboard",
      user: req.user
    });

  }
);

module.exports = router;