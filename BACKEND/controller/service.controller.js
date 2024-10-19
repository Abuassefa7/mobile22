// Import the common repair services
const serviceService = require("../services/service.service.js");

// Create the add service controller
async function createService(req, res, next) {
  try {
    const serviceData = req.body;

    // Create the new service
    const service = await serviceService.createService(serviceData);

    if (!service.success) {
      res.status(400).json({
        status: "fail",
        message: service.message,
      });
    } else {
      res.status(200).json({
        status: "success",
        serviceId: service.service_id,
      });
    }
  } catch (error) {
    console.error("Error creating service:", error);
    res.status(500).json({
      error: "Something went wrong!",
    });
  }
}

// Create the update service controller
async function updateService(req, res, next) {
  try {
    const serviceId = req.params.id;
    const updates = req.body;
    const updatedService = await serviceService.updateService(
      serviceId,
      updates
    );

    if (!updatedService.success) {
      res.status(400).json({
        status: "fail",
        message: updatedService.message,
      });
    } else {
      res.status(200).json({
        status: "success",
        updatedService: updatedService.service,
      });
    }
  } catch (error) {
    console.error("Error updating service:", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
}

// Create the get all services controller
const getAllServices = async (req, res) => {
  try {
    const services = await serviceService.getAllServices();
    res.status(200).json({
      services,
    });
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

// Create the get service by ID controller
async function getServiceById(req, res, next) {
  try {
    const serviceId = req.params.id;
    const service = await serviceService.getServiceById(serviceId);

    if (!service) {
      res.status(404).json({
        error: `No service found with ID: ${serviceId}`,
      });
    } else {
      res.status(200).json({
        service,
      });
    }
  } catch (error) {
    console.error("Error fetching service by ID:", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
}

// Export the service controller
module.exports = {
  createService,
  updateService,
  getAllServices,
  getServiceById,
};
