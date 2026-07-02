const express = require("express");

const router = express.Router();
const authorizeRoles = require("../middleware/roleMiddleware");


const {protect} = require("../middleware/authMiddleware");
const {
  becomeProvider,
  getNearbyProviders,
  getProviderProfile,
  updateProviderProfile,
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
module.exports = router;