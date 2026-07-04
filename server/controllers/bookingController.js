const mongoose = require("mongoose");

const Booking = require("../models/Booking");
const Provider = require("../models/Provider");
const ServiceRequest = require("../models/ServiceRequest");
const Notification = require("../models/Notification");

const acceptBooking = async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();

  try {
    const { requestId } = req.params;

    // Find Service Request
    const serviceRequest =
      await ServiceRequest.findById(requestId).session(session);

    if (!serviceRequest) {
      await session.abortTransaction();
      session.endSession();

      return res.status(404).json({
        success: false,
        message: "Service Request not found",
      });
    }

    if (serviceRequest.status !== "Pending") {
      await session.abortTransaction();
      session.endSession();

      return res.status(400).json({
        success: false,
        message: "Request already processed",
      });
    }

    // Find Provider
    const provider = await Provider.findOne({
      user: req.user._id,
    }).session(session);

    if (!provider) {
      await session.abortTransaction();
      session.endSession();
      

      return res.status(404).json({
        success: false,
        message: "Provider not found",
      });
    }


    // Check if provider is blocked
if (provider.isBlocked) {

  await session.abortTransaction();
  session.endSession();

  return res.status(403).json({
    success: false,
    message: "Your account has been blocked by admin.",
  });

}

    // Create Booking
    const booking = await Booking.create(
      [
        {
          serviceRequest: serviceRequest._id,
          customer: serviceRequest.customer,
          provider: provider._id,
          status: "Accepted",
        },
      ],
      { session },
    );

    // Update Request
    serviceRequest.status = "Accepted";
    serviceRequest.assignedProvider = provider._id;

    await serviceRequest.save({ session });

    // Update Provider
    provider.isAvailable = false;

    await provider.save({ session });
    console.log("Creating notification...");

    const notification = await Notification.create(
      [
        {
          receiver: serviceRequest.customer,
          sender: req.user._id,
          booking: booking[0]._id,
          title: "Booking Accepted",
          message: `Your ${serviceRequest.service} request has been accepted.`,
          type: "BOOKING",
        },
      ],
      { session },
    );

    console.log("Notification Result:", notification);
    console.log("Notification created successfully");

    // Commit
    await session.commitTransaction();

    session.endSession();
  const io = req.app.get("io");

console.log("Customer ID:", serviceRequest.customer.toString());

const room = io.sockets.adapter.rooms.get(serviceRequest.customer.toString());

console.log("Room Exists:", room);

io.to(serviceRequest.customer.toString()).emit("bookingAccepted", {
  title: "Booking Accepted",
  message: `Your ${serviceRequest.service} request has been accepted.`,
});

console.log("Event Emitted");

    res.status(201).json({
      success: true,
      message: "Booking accepted successfully",
      booking: booking[0],
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

const rejectBooking = async (req, res) => {
  try {
    const { requestId } = req.params;

    const serviceRequest = await ServiceRequest.findById(requestId);

    if (!serviceRequest) {
      return res.status(404).json({
        success: false,
        message: "Service request not found",
      });
    }

    if (serviceRequest.status !== "Pending") {
      return res.status(400).json({
        success: false,
        message: "Request already processed",
      });
    }

    res.status(200).json({
      success: true,
      message: "Booking rejected successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const completeBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const provider = await Provider.findOne({
      user: req.user._id,
    });

    if (!provider) {
      return res.status(404).json({
        success: false,
        message: "Provider not found",
      });
    }

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Check ownership
    if (booking.provider.toString() !== provider._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    booking.status = "Completed";
    await booking.save();

    // Update service request status
    await ServiceRequest.findByIdAndUpdate(
      booking.serviceRequest,
      {
        status: "Completed",
      }
    );

    // Provider available again
    provider.isAvailable = true;
    await provider.save();

    res.status(200).json({
      success: true,
      message: "Booking completed successfully",
      booking,
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
  rejectBooking,
  completeBooking,
};
