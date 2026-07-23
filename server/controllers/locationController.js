const Provider = require("../models/Provider");
const Booking = require("../models/Booking");
// Update Provider Location
const updateLocation = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    const provider = await Provider.findOne({
      user: req.user._id,
    });

    if (!provider) {
      return res.status(404).json({
        success: false,
        message: "Provider not found",
      });
    }

    provider.currentLocation = {
      type: "Point",
      coordinates: [longitude, latitude],
    };

    await provider.save();

    // Get Socket.io instance
    const io = req.app.get("io");

    // Find active booking
    const booking = await Booking.findOne({
      provider: provider._id,
      status: "Accepted",
    });

    if (booking) {
      io.to(booking.customer.toString()).emit(
        "providerLocation",
        {
          bookingId: booking._id,
          latitude,
          longitude,
        }
      );

      console.log(
        "📍 Live location sent to customer:",
        booking.customer.toString()
      );
    }

    res.json({
      success: true,
      message: "Location Updated",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// Get Provider Location
const getProviderLocation = async (req, res) => {
  try {
    const provider = await Provider.findById(
      req.params.providerId
    );

    if (!provider) {
      return res.status(404).json({
        success: false,
        message: "Provider not found",
      });
    }

    res.json({
      success: true,
      location: provider.currentLocation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  updateLocation,
  getProviderLocation,
};