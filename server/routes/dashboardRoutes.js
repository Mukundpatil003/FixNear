const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  getCustomerDashboard,
} = require("../controllers/customerDashboardController");
// Customer Dashboard
router.get(
  "/customer",
  protect,
  authorizeRoles("customer"),
  getCustomerDashboard
);
  (req, res) => {

    res.json({
      success: true,
      message: "Welcome Customer Dashboard",
      user: req.user
    });

  }

// Provider Dashboard
router.get(
  "/provider",
  protect,
  authorizeRoles("provider"),
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
  authorizeRoles("admin"),
  (req, res) => {

    res.json({
      success: true,
      message: "Welcome Admin Dashboard",
      user: req.user
    });

  }
);

module.exports = router;