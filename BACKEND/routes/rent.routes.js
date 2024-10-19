// Import the express module
const express = require("express");
// Call the router method from express to create the router
const router = express.Router();
// Import the rent controller
const rentControllers = require("../controller/rent.controller");
const authMiddleware = require("../middlewares/auth.middleware");
// Create a route to handle the craete rent  request on post
router.post(
	"/api/rent",
	[authMiddleware.verifyToken],
	rentControllers.createRent
);
// Create a route to handle the get All rentals
router.get("/api/rents", rentControllers.getAllRents);
// Create a route to handle the get rent  request on get
router.get("/api/rent/:id", rentControllers.getSingleRents);
// Create a route to handle the update rent request on put
router.put(
	"/api/rent/:id",
	[authMiddleware.verifyToken],
	rentControllers.updateRent
);
// Create a route to handle the delete  rentals request on Delete
router.delete(
	"/api/rent/:id",
	[authMiddleware.verifyToken],
	rentControllers.deleteRentById
);
// Export the router
module.exports = router;
