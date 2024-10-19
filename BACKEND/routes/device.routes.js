// Import the express module
const express = require("express");
// Call the router method from express to create the router
const router = express.Router();
// Import the device controller
const deviceControllers = require("../controller/device.controller");
const authMiddleware = require("../middlewares/auth.middleware");
// Create a route to handle the craete device request on post
router.post(
	"/api/device",
	[authMiddleware.verifyToken],
	deviceControllers.createDevice
);
// Create a route to handle the get single device request on Get by device_id
router.get(
	"/api/device/:id",
	[authMiddleware.verifyToken],
	deviceControllers.getSingleDeviceById
);
// Create a route to handle the get single device request on Get by customer_id
router.get(
	"/api/devices/:customer_id",
	[authMiddleware.verifyToken],
	deviceControllers.getDevicesPerCustomer
);
// Create a route to handle the update device request on put
router.put(
	"/api/device/:device_id",
	[authMiddleware.verifyToken],
	deviceControllers.updateDevice
);
// Export the router
module.exports = router;
