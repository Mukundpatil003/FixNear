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
  getTopProviders,
  verifyProvider,
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
router.get("/top", getTopProviders);
router.put(
  "/verify/:id",
  protect,
  authorizeRoles("admin"),
  verifyProvider
);
module.exports = router;