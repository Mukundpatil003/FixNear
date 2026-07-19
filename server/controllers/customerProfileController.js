const User = require("../models/User");

// GET Customer Profile
const getCustomerProfile = async (req, res) => {
    console.log("✅ getCustomerProfile Called");

  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      profile: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE Customer Profile
const updateCustomerProfile = async (req, res) => {
  try {
    const { name, phone, location, profileImage } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.name = name || user.name;
    user.phone = phone || user.phone;
    user.location = location || user.location;

    if (profileImage) {
      user.profileImage = profileImage;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      profile: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getCustomerProfile,
  updateCustomerProfile,
};