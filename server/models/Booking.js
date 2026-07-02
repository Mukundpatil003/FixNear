const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    serviceRequest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceRequest",
      required: true,
    },

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Provider",
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Accepted",
        "On The Way",
        "Completed",
        "Cancelled",
      ],
      default: "Pending",
    },

    amount: {
      type: Number,
      default: 0,
    },

    paymentStatus: {
      type: String,
      enum: [
        "Pending",
        "Paid",
        "Failed",
      ],
      default: "Pending",
    },

    completedAt: {
      type: Date,
      default: null,
    }

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", bookingSchema);