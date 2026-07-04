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
    })
      .populate("customer", "name phone")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: requests.length,
      requests,
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
};