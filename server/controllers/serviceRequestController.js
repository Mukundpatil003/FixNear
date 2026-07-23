const ServiceRequest = require("../models/ServiceRequest");
const Provider = require("../models/Provider");
const Booking = require("../models/Booking");


const createServiceRequest = async (req, res) => {

  try {

    if (req.user.role !== "customer") {
      return res.status(403).json({
        success: false,
        message: "Only customers can create service requests",
      });
    }
   const {
  provider,
  service,
  problem,
  latitude,
  longitude,
  address,
  image,
} = req.body;

    // Create Request
 const request = await ServiceRequest.create({
  customer: req.user._id,

  service,

  problem,

  image,

  address,

  assignedProvider: provider,

  location: {
    type: "Point",
    coordinates: [
      Number(longitude),
      Number(latitude),
    ],
  },
});

    // ===============================
    // SOCKET.IO
    // ===============================

    const io = req.app.get("io");

    // Find Nearby Providers
   let providers = [];

if (provider) {

  const selectedProvider = await Provider.findById(provider);

  if (selectedProvider) {

    providers.push(selectedProvider);

  }

} else {

  providers = await Provider.find({

    service: {
      $regex: `^${service}$`,
      $options: "i",
    },

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

  });

}

    console.log(
      "Nearby Providers:",
      providers.length
    );

    // Send Event
    providers.forEach((provider) => {
      io.to(provider.user.toString()).emit(
        "newRequest",
        request
      );

      console.log(
        "Sent to:",
        provider.user.toString()
      );
    });

    // ===============================

    res.status(201).json({
      success: true,
      message:
        "Service request created successfully.",
      request,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


const findNearbyProviders = async (req, res) => {
  try {


    console.log("========== QUERY ==========");
    console.log(req.query);
const { latitude, longitude, service } = req.query;
let query = {
  isAvailable: true,
  isVerified: true,
  isBlocked: false,
};

if (service) {
  query.service = {
    $regex: service,
    $options: "i",
  };
}

if (
  latitude &&
  longitude &&
  !isNaN(Number(latitude)) &&
  !isNaN(Number(longitude))
) {
  query.location = {
    $near: {
      $geometry: {
        type: "Point",
        coordinates: [
          Number(longitude),
          Number(latitude),
        ],
      },
      $maxDistance: 100000,
    },
  };
}

const providers = await Provider.find(query)
  .populate("user", "name phone profileImage");

    res.status(200).json({
      success: true,
      total: providers.length,
      providers,
    });

  } catch (error) {
     console.error("========== FIND PROVIDERS ERROR ==========");
  console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getPendingRequests = async (req, res) => {
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

const requests = await ServiceRequest.find({
  status: "Pending",
  service: provider.service,
  rejectedProviders: {
    $ne: provider._id,
  },
})
.populate("customer", "name phone role")
.sort({ createdAt: -1 });

const customerRequests = requests.filter(
  (request) => request.customer?.role === "customer"
);

  res.status(200).json({
  success: true,
  total: customerRequests.length,
  requests: customerRequests,
});

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


const getMyRequests = async (req, res) => {
  try {

    // Get all service requests
   const requests = await ServiceRequest.find({
    customer: req.user._id
})
.populate({
    path: "assignedProvider",
    populate: {
        path: "user",
        select: "name phone profileImage"
    }
})
.populate({
    path: "booking"
});
    // Attach booking with every request
    const requestsWithBooking = await Promise.all(

  requests.map(async (request) => {

    const booking = await Booking.findOne({
      serviceRequest: request._id,
    });

    return {
      ...request.toObject(),
      booking,
    };

  })

);
  console.log(
  JSON.stringify(requestsWithBooking, null, 2)
);

    res.status(200).json({
      success: true,
      total: requestsWithBooking.length,
      requests: requestsWithBooking,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};
module.exports = {
  createServiceRequest,
  findNearbyProviders,
  getPendingRequests,
  getMyRequests,
};