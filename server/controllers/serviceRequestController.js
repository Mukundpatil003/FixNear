const ServiceRequest = require("../models/ServiceRequest");
const Provider = require("../models/Provider");

const createServiceRequest = async (req, res) => {
  try {
    const {
      service,
      problem,
      latitude,
      longitude,
      address,
    } = req.body;

    const request = await ServiceRequest.create({
      customer: req.user._id,

      service,

      problem,

      address,

      location: {
        type: "Point",
        coordinates: [
          Number(longitude),
          Number(latitude),
        ],
      },
    });

    res.status(201).json({
      success: true,
      message: "Service request created successfully.",
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
    const { latitude, longitude, service } = req.query;
    console.log("Query:", req.query);

     const allProviders = await Provider.find();

     console.log("All Providers:", allProviders);

    const providers = await Provider.find({
      service: { $regex: `^${service}$`, $options: "i" },
      isAvailable: true,
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
    }).populate("user", "name phone");

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

module.exports = {
  createServiceRequest,
  findNearbyProviders,
};