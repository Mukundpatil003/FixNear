const Booking = require("../models/Booking");
const Provider = require("../models/Provider");
const ServiceRequest = require("../models/ServiceRequest");

const acceptBooking = async (req, res) => {
  try {
    const { requestId } = req.params;

    // Find Service Request
    const serviceRequest = await ServiceRequest.findById(requestId);

    if (!serviceRequest) {
      return res.status(404).json({
        success: false,
        message: "Service Request not found",
      });
    }

    // Check if already accepted
    if (serviceRequest.status !== "Pending") {
      return res.status(400).json({
        success: false,
        message: "Request already processed",
      });
    }

    // Find Provider using logged-in user
    const provider = await Provider.findOne({
      user: req.user._id,
    });

    if (!provider) {
      return res.status(404).json({
        success: false,
        message: "Provider profile not found",
      });
    }

    // Create Booking
    const booking = await Booking.create({
      serviceRequest: serviceRequest._id,
      customer: serviceRequest.customer,
      provider: provider._id,
      status: "Accepted",
    });

    // Update Request
    serviceRequest.status = "Accepted";
    serviceRequest.assignedProvider = provider._id;
    await serviceRequest.save();

    // Provider becomes unavailable
    provider.isAvailable = false;
    await provider.save();

    res.status(201).json({
      success: true,
      message: "Booking accepted successfully",
      booking,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getMyBookings = async (req, res) => {
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

    const bookings = await Booking.find({
      provider: provider._id,
    })
      .populate("customer", "name email phone")
      .populate("serviceRequest");

    res.status(200).json({
      success: true,
      total: bookings.length,
      bookings,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  acceptBooking,
    getMyBookings,
};