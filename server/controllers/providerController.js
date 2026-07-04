const Provider = require("../models/Provider");
const Booking = require("../models/Booking");

const becomeProvider = async (req, res) => {
  try {
    const {
      service,
      experience,
      phone,
      address,
      latitude,
      longitude,
      pricePerHour,
      description,
    } = req.body;

    // Check if already a provider
    const existingProvider = await Provider.findOne({
      user: req.user._id,
    });

    if (existingProvider) {
      return res.status(400).json({
        success: false,
        message: "You are already registered as a provider.",
      });
    }

    const provider = await Provider.create({
      user: req.user._id,
      service,
      experience,
      phone,
      address,
      location: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
      pricePerHour,
      description,
    });

    res.status(201).json({
      success: true,
      message: "Provider profile created successfully.",
      provider,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getNearbyProviders = async (req, res) => {
  try {
    const { longitude, latitude, service } = req.query;

    if (!longitude || !latitude) {
      return res.status(400).json({
        success: false,
        message: "Latitude and Longitude are required.",
      });
    }
    
const providers = await Provider.find({
  ...(service && { service }),

  isAvailable: true,

  isBlocked: false,

  isVerified: true,

  location: {
    $near: {
      $geometry: {
        type: "Point",
        coordinates: [
          Number(longitude),
          Number(latitude),
        ],
      },
      $maxDistance: 10000,
    },
  },
}).populate("user", "name email phone profileImage");

    res.status(200).json({
      success: true,
      total: providers.length,
      providers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getProviderProfile = async (req, res) => {
  try {
    const provider = await Provider.findOne({
      user: req.user._id,
    }).populate("user", "-password");

    if (!provider) {
      return res.status(404).json({
        success: false,
        message: "Provider profile not found.",
      });
    }

    res.status(200).json({
      success: true,
      provider,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const updateProviderProfile = async (req, res) => {
  try {
    const provider = await Provider.findOne({
      user: req.user._id,
    });

    if (!provider) {
      return res.status(404).json({
        success: false,
        message: "Provider profile not found.",
      });
    }

    const allowedFields = [
      "service",
      "experience",
      "phone",
      "address",
      "pricePerHour",
      "description",
      "isAvailable",
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        provider[field] = req.body[field];
      }
    });

    // Update location if provided
    if (req.body.latitude && req.body.longitude) {
      provider.location = {
        type: "Point",
        coordinates: [
          Number(req.body.longitude),
          Number(req.body.latitude),
        ],
      };
    }

    await provider.save();

    res.status(200).json({
      success: true,
      message: "Provider profile updated successfully.",
      provider,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getProviderDashboard = async (req, res) => {
  try {

    const provider = await Provider.findOne({
      user: req.user._id,
    });

    if (!provider) {
      return res.status(404).json({
        success: false,
        message: "Provider not found",
      });
    }

    const totalBookings = await Booking.countDocuments({
      provider: provider._id,
    });

    const pendingBookings = await Booking.countDocuments({
      provider: provider._id,
      status: {
        $in: ["Accepted", "On The Way", "Working"],
      },
    });

    const completedBookings = await Booking.countDocuments({
      provider: provider._id,
      status: "Completed",
    });

    res.status(200).json({
      success: true,
      dashboard: {
        totalBookings,
        pendingBookings,
        completedBookings,
        rating: provider.rating,
        totalReviews: provider.totalReviews,
        isAvailable: provider.isAvailable,
      },
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  becomeProvider,
  getNearbyProviders,
  getProviderProfile,
  updateProviderProfile,
  
  getProviderDashboard,
};
