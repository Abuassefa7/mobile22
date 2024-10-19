// Import the express module
const express = require("express");
// Call the router method from express to create the router
const router = express.Router();
// Import the ria controller
const riaControllers = require("../controller/ria.controller");
const authMiddleware = require("../middlewares/auth.middleware");
// Create a route to handle the craete ria rate  request on post
router.post(
	"/api/rate",
	[authMiddleware.verifyToken],
	riaControllers.createRate
);
// Create a route to handle the get All rates
router.get("/api/rates", riaControllers.getAllRates);
// Create a route to handle the update ria rate request on put
router.put(
	"/api/rate/:id",
	[authMiddleware.verifyToken],
	riaControllers.updateRate
);
// Create a route to handle the delete  ria request on Delete
router.delete(
	"/api/rate/:id",
	[authMiddleware.verifyToken],
	riaControllers.deleteRateById
);
// Export the router
module.exports = router;
