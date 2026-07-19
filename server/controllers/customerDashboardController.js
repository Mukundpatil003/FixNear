const ServiceRequest = require("../models/ServiceRequest");
const Booking = require("../models/Booking");
const Provider = require("../models/Provider");
const Category = require("../models/Category");

const getCustomerDashboard = async (req, res) => {
  try {

    const totalRequests = await ServiceRequest.countDocuments({
      customer: req.user._id,
    });

const activeBooking = await Booking.findOne({
  customer: req.user._id,
  status: {
    $in: ["Accepted", "On The Way", "Working"],
  },
})
.populate({
  path: "provider",
  select:
    "service rating experience pricePerHour phone currentLocation",
  populate: {
    path: "user",
    select: "name profileImage phone",
  },
})
.populate({
  path: "serviceRequest",
  select: "service problem address status createdAt",
})
.populate("serviceRequest")
.sort({ createdAt: -1 });

    const completedBookings = await Booking.countDocuments({
      customer: req.user._id,
      status: "Completed",
    });

    const bookings = await Booking.find({
      customer: req.user._id,
      status: "Completed",
    });

    let totalSpent = 0;

bookings.forEach((booking) => {
  totalSpent += booking.amount || 0;
});

    const recentRequests = await ServiceRequest.find({
      customer: req.user._id,
    })
      .sort({ createdAt: -1 })
      .limit(5);

 const topProviders = await Provider.find({
    isVerified: true,
    isBlocked: false,
})
.populate("user", "name profileImage")
.sort({
    rating: -1,
    totalReviews: -1,
})
.limit(3);

const recentActivities = await Booking.find({
  customer: req.user._id,
})
.populate({
  path: "provider",
  populate: {
    path: "user",
    select: "name profileImage",
  },
})
.sort({ updatedAt: -1 })
.limit(5);

    const categories = await Category.find();

    res.json({
      success: true,

      stats: {
        totalRequests,
        activeBookings: activeBooking ? 1 : 0,
        completedBookings,
        totalSpent,
      },

      activeBooking,

      recentRequests,

      topProviders,

      recentActivities,

      categories,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  getCustomerDashboard,
};