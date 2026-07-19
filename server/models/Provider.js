const mongoose = require("mongoose");

const providerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    service: {
      type: String,
      required: true,
      trim: true,
    },

    experience: {
      type: Number,
      required: true,
      min: 0,
    },

    phone: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },
    
    currentLocation: {

type:{
type:String,
default:"Point"
},

coordinates:{
type:[Number],
default:[0,0]
}

},

    pricePerHour: {
      type: Number,
      default: 0,
    },

    description: {
      type: String,
      default: "",
    },

    // profileImage: {
    //   type: String,
    //   default: "",
    // },

    rating: {
      type: Number,
      default: 0,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },



    isAvailable: {
      type: Boolean,
      default: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
        isBlocked: {
    type: Boolean,
    default: false
},
  },
  {
    timestamps: true,
  }
);

providerSchema.index({ location: "2dsphere" });
providerSchema.index({ currentLocation: "2dsphere" });
module.exports = mongoose.model("Provider", providerSchema);