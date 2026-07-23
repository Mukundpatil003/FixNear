const mongoose = require("mongoose");

const serviceRequestSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    service: {
      type: String,
      required: true,
      trim: true,
    },

    problem: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      default: "",
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },

    address: {
      type: String,
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

rejectedProviders: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Provider",
    default: [],
  },
],

assignedProvider: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Provider",
  default: null,
},
  

    estimatedPrice: {
      type: Number,
      default: 0,
    },

    aiDetectedService: {
      type: String,
      default: "",
    },
    booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking"
},
  },
  {
    timestamps: true,
  }
);

serviceRequestSchema.index({
  location: "2dsphere",
});

module.exports = mongoose.model(
  "ServiceRequest",
  serviceRequestSchema
);