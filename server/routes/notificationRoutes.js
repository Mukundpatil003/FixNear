const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  getMyNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  deleteNotification,
} = require("../controllers/notificationController");

router.get("/", protect, getMyNotifications);

router.put("/:id", protect, markNotificationRead);

router.put("/read-all", protect, markAllNotificationsRead);

router.delete("/:id", protect, deleteNotification);

module.exports = router;