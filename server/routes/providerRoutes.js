const express = require("express");

const router = express.Router();



const {protect} = require("../middleware/authMiddleware");
const {
  becomeProvider,
  getNearbyProviders,
  getProviderProfile,
  updateProviderProfile,
} = require("../controllers/providerController");

router.post("/become-provider", protect, becomeProvider);
router.get("/nearby", getNearbyProviders);
router.get("/profile", protect, getProviderProfile);
router.put("/profile", protect, updateProviderProfile);
module.exports = router;