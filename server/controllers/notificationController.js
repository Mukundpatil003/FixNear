const Notification = require("../models/Notification");

const getMyNotifications = async (req, res) => {
  try {

    const notifications = await Notification.find({
      receiver: req.user._id,
    })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: notifications.length,
      notifications,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  getMyNotifications,
};