const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  getCustomerProfile,
  updateCustomerProfile,
} = require("../controllers/customerProfileController");

router.get("/", protect, getCustomerProfile);

router.put("/", protect, updateCustomerProfile);

module.exports = router;