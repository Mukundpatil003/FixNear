const express = require("express");

const router = express.Router();

const {
  createCategory,
  getCategories,
} = require("../controllers/categoryController");

const {protect} = require("../middleware/authMiddleware");

// Admin route (abhi protect use karenge, baad me admin middleware lagayenge)
router.post("/", protect, createCategory);

// Public route
router.get("/", getCategories);

module.exports = router;