const express = require("express");

const router = express.Router();

const {protect} = require("../middleware/authMiddleware");
const authorizeRoles= require("../middleware/roleMiddleware");

const {
  createServiceRequest,
  findNearbyProviders,
  getPendingRequests,
} = require("../controllers/serviceRequestController");

// Sirf customer service request create kar sakta hai
router.post(
  "/",
  protect,
  authorizeRoles("customer", "provider"),
  createServiceRequest
);

router.get("/providers", protect, findNearbyProviders);
router.get(
  "/pending",
  protect,
  authorizeRoles("provider"),
  getPendingRequests
);
module.exports = router;