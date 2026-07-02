const express = require("express");

const router = express.Router();

const {
  createCategory,
  getCategories,
} = require("../controllers/categoryController");

const {protect} = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// Only Admin can create category
router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  createCategory
);

// Everyone can see categories
router.get("/", getCategories);

module.exports = router;