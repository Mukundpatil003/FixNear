const express = require("express");

const router = express.Router();

const { protect, authorize } = require("../middleware/authMiddleware");

const {
  getDashboard,
    getAllUsers,
    getAllProviders,
    verifyProvider,
    toggleProviderBlock,
    toggleUserBlock,
    deleteProvider,
} = require("../controllers/adminController");

router.get(
  "/dashboard",
  protect,
  authorize("admin"),
  getDashboard
);
router.get(
    "/users",
    protect,
    authorize("admin"),
    getAllUsers
);

router.get(
    "/providers",
    protect,
    authorize("admin"),
    getAllProviders
);


router.put(
    "/verify-provider/:id",
    protect,
    authorize("admin"),
    verifyProvider
);

router.put(
    "/block-provider/:id",
    protect,
    authorize("admin"),
    toggleProviderBlock
);
router.put(
    "/block-user/:id",
    protect,
    authorize("admin"),
    toggleUserBlock
);
router.delete(
    "/provider/:id",
    protect,
    authorize("admin"),
    deleteProvider
);
module.exports = router;

