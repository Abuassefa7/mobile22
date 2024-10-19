const express = require("express");
const router = express.Router();
const customerController = require("../controller/customer.controller");
// Import middleware 
const authMiddleware = require("../middlewares/auth.middleware");

// Get all routes for customers
router.get(
	"/api/customers",
	[authMiddleware.verifyToken],
	customerController.getAllCustomers
);
// Get routes for customer by ID
router.get(
	"/api/customer/:id",
	[authMiddleware.verifyToken],
	customerController.getSingleCustomer
);
// Create routes for customers
router.post(
	"/api/customer",
	[authMiddleware.verifyToken],
	customerController.createCustomer
);
// Updateroutes for customer
router.put(
	"/api/customer/:id",
	[authMiddleware.verifyToken],
	customerController.updateCustomer
);

module.exports = router;
