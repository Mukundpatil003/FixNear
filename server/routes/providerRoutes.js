const express = require("express");

const router = express.Router();
const authorizeRoles = require("../middleware/roleMiddleware");


const {protect} = require("../middleware/authMiddleware");
const {
  becomeProvider,
  getNearbyProviders,
  getProviderProfile,
  updateProviderProfile,
  getProviderDashboard,
} = require("../controllers/providerController");

router.post("/become-provider", protect, becomeProvider);
router.get("/nearby", getNearbyProviders);
router.get(
  "/profile",
  protect,
  authorizeRoles("provider"),
  getProviderProfile
);

router.put(
  "/profile",
  protect,
  authorizeRoles("provider"),
  updateProviderProfile
);

router.get(
  "/dashboard",
  protect,
  authorizeRoles("provider"),
  getProviderDashboard
);
module.exports = router;