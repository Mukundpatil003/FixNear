const express = require("express");

const router = express.Router();

const {protect} = require("../middleware/authMiddleware");
const authorizeRoles= require("../middleware/roleMiddleware");

const {
 createServiceRequest,
 findNearbyProviders
} = require("../controllers/serviceRequestController");

// Sirf customer service request create kar sakta hai
router.post(
  "/",
  protect,
  authorizeRoles("customer"),
  createServiceRequest
);

router.get("/providers", protect, findNearbyProviders);

module.exports = router;