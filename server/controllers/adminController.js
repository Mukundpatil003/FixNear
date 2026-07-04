const User = require("../models/User");
const Provider = require("../models/Provider");
const Booking = require("../models/Booking");
const ServiceRequest = require("../models/ServiceRequest");
const Review = require("../models/Review");

const getDashboard = async (req, res) => {
  try {

    const totalUsers = await User.countDocuments();

    const totalProviders = await Provider.countDocuments();

    const totalBookings = await Booking.countDocuments();

    const totalRequests = await ServiceRequest.countDocuments();

    const totalReviews = await Review.countDocuments();

    const availableProviders = await Provider.countDocuments({
      isAvailable: true,
    });

    const busyProviders = await Provider.countDocuments({
      isAvailable: false,
    });

    res.status(200).json({
      success: true,
      dashboard: {
        totalUsers,
        totalProviders,
        totalBookings,
        totalRequests,
        totalReviews,
        availableProviders,
        busyProviders,
      },
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
const getAllUsers = async (req, res) => {
  try {

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search || "";

    const query = {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ],
    };

    const users = await User.find(query)
      .select("-password")
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalUsers = await User.countDocuments(query);

    res.status(200).json({
      success: true,
      page,
      totalPages: Math.ceil(totalUsers / limit),
      totalUsers,
      users,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
const getAllProviders = async (req, res) => {
  try {

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search || "";

    const query = {
      service: {
        $regex: search,
        $options: "i",
      },
    };

    const providers = await Provider.find(query)
      .populate("user", "name email phone role")
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalProviders = await Provider.countDocuments(query);

    res.status(200).json({
      success: true,
      page,
      totalPages: Math.ceil(totalProviders / limit),
      totalProviders,
      providers,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const verifyProvider = async (req, res) => {
  try {

    const provider = await Provider.findById(req.params.id);

    if (!provider) {
      return res.status(404).json({
        success: false,
        message: "Provider not found",
      });
    }

    provider.isVerified = true;

    await provider.save();

    res.status(200).json({
      success: true,
      message: "Provider verified successfully",
      provider,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const toggleProviderBlock = async (req, res) => {
  try {

    const provider = await Provider.findById(req.params.id);

    if (!provider) {
      return res.status(404).json({
        success: false,
        message: "Provider not found",
      });
    }

    provider.isBlocked = !provider.isBlocked;

    await provider.save();

    res.status(200).json({
      success: true,
      message: provider.isBlocked
        ? "Provider blocked successfully"
        : "Provider unblocked successfully",
      provider,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
const toggleUserBlock = async (req, res) => {
  try {

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Admin ko block nahi karna
    if (user.role === "admin") {
      return res.status(400).json({
        success: false,
        message: "Admin account cannot be blocked",
      });
    }

    user.isBlocked = !user.isBlocked;

    await user.save();

    res.status(200).json({
      success: true,
      message: user.isBlocked
        ? "User blocked successfully"
        : "User unblocked successfully",
      user,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const deleteProvider = async (req, res) => {
  try {

    const provider = await Provider.findById(req.params.id);

    if (!provider) {
      return res.status(404).json({
        success: false,
        message: "Provider not found",
      });
    }

    await provider.deleteOne();

    res.status(200).json({
      success: true,
      message: "Provider deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
module.exports = {
  getDashboard,
    getAllUsers,
    getAllProviders,
    verifyProvider,
    toggleProviderBlock,
    toggleUserBlock,
    deleteProvider,
};