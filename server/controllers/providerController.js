const Provider = require("../models/Provider");
const Booking = require("../models/Booking");
const User = require("../models/User");
const mongoose = require("mongoose");

const becomeProvider = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

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

    const existingProvider = await Provider.findOne({
      user: req.user._id,
    }).session(session);

    if (existingProvider) {
      await session.abortTransaction();
      session.endSession();

      return res.status(400).json({
        success: false,
        message: "You are already registered as a provider.",
      });
    }

    const provider = await Provider.create(
      [
        {
          user: req.user._id,
          service,
          experience,
          phone,
          address,
          location: {
            type: "Point",
            coordinates: [
              Number(longitude),
              Number(latitude),
            ],
          },
          pricePerHour,
          description,
          rating: 0,
          totalReviews: 0,
          isAvailable: true,
          isVerified: true,
          isBlocked: false,
        },
      ],
      { session }
    );

   const updatedUser = await User.findByIdAndUpdate(
  req.user._id,
  {
    role: "provider",
  },
  {
    new: true,
    session,
  }
);

    await session.commitTransaction();

    session.endSession();

  res.status(201).json({
  success: true,
  message: "Provider profile created successfully.",
  provider,
  user: updatedUser,
});
  } catch (error) {
    await session.abortTransaction();

    session.endSession();

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
      isVerified: true,
      isBlocked: false,

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
    }).populate(
      "user",
      "name email phone profileImage"
    );

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
    }).populate(
    "user",
    "name email phone profileImage role"
)

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

    // Update User Profile Image
if (req.body.profileImage) {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      profileImage: req.body.profileImage,
    },
    {
      new: true,
    }
  );
}

    await provider.save();

const io = req.app.get("io");

io.emit("providerAvailabilityChanged", {
  providerId: provider._id.toString(),
  isAvailable: provider.isAvailable,
});
    

 const updatedUser = await User.findById(req.user._id);
 
res.status(200).json({
  success: true,
  message: "Provider profile updated successfully.",
  provider,
  user: {
    id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    phone: updatedUser.phone,
    role: updatedUser.role,
    profileImage: updatedUser.profileImage,
  },
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
const getTopProviders = async (req, res) => {
  console.log("🔥 getTopProviders API HIT");
  try {
    const providers = await Provider.find({
      isVerified: true,
      isAvailable: true,
      isBlocked: false,
    })
      .populate({
        path: "user",
        match: {
          role: "provider",
        },
        select: "name profileImage role",
      });

    const filteredProviders = providers
      .filter((p) => p.user)
      .sort((a, b) => {
        if (b.rating !== a.rating) {
          return b.rating - a.rating;
        }

        return b.totalReviews - a.totalReviews;
      })
      .slice(0, 3);

    res.json({
      success: true,
      providers: filteredProviders,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
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

module.exports = {
  becomeProvider,
  getNearbyProviders,
  getTopProviders,
  verifyProvider,
  getProviderProfile,
  updateProviderProfile,
  getProviderDashboard,
};