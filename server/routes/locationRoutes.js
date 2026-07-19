const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  updateLocation,
  getProviderLocation,
} = require("../controllers/locationController");

router.put(
  "/update",
  protect,
  updateLocation
);

router.get(
  "/:providerId",
  protect,
  getProviderLocation
);

module.exports = router;