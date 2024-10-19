// import express module
const express = require("express");
// Call the router method from express to create the router
const router = express.Router();
// Import the order controller
const orderController = require("../controller/order.controller");
// Import middleware
const authMiddleware = require("../middlewares/auth.middleware");

// Create a route to handle the order request on POST
router.post(
	"/api/order",
	[authMiddleware.verifyToken],
	orderController.createOrder
);

// Create a route to handle the order request on get
router.get(
	"/api/orders",
	[authMiddleware.verifyToken],
	orderController.getAllOrders
);
// Create a route to handle the order request on get by orderid
router.get(
	"/api/order/:order_id",
	[authMiddleware.verifyToken],
	orderController.getOrderById
);
// Create a route to handle the order request on get by customer id
router.get(
	"/api/customer-orders/:customer_id",
	[authMiddleware.verifyToken],
	orderController.getOrdersByCustomerId
);
// Create a route to handle the order update request on put
router.put(
	"/api/order/:order_id",
	[authMiddleware.verifyToken],
	orderController.updateOrder
);
// create aroute to get order by hash
router.get("/api/orderStatus/:hash", orderController.getOrderByOrderHash);

// create a route to delete an order
router.delete( 
	"/api/order/:order_id",
	[authMiddleware.verifyToken],
	orderController.deleteOrder
	);
// Export the router
module.exports = router;
