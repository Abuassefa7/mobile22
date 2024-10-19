const express = require("express");
const router = express.Router();

// Import the service controllers
const serviceController = require("../controller/service.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const csrfMiddleware = require("../middlewares/csrf.middleware");

// Route to create a new service
router.post(
	"/api/services",
	[authMiddleware.verifyToken],
	// csrfMiddleware.verifyCsrfToken,
	serviceController.createService
);

// Route to update an existing service
router.put(
	"/api/services/:id",
	[authMiddleware.verifyToken],
	serviceController.updateService
);

// Route to get all services
router.get(
	"/api/services",
	[authMiddleware.verifyToken],
	serviceController.getAllServices
);

// Route to get a single service by ID
router.get(
	"/api/services/:id",
	[authMiddleware.verifyToken],
	serviceController.getServiceById
);

// Export the router
module.exports = router;
