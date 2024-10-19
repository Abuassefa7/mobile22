// Import the express module

const express = require("express");
// call the router method from express to create the router
const router = express.Router();
// Import the product controller
const productController = require("../controller/product.controller");
// import multer middleware from middlewares
const upload = require("../middlewares/upload");
// Create a route to handle the add product request on Post
const authMiddleware = require("../middlewares/auth.middleware");
router.post(
	"/api/product",
	[authMiddleware.verifyToken],
	upload.single("image"),
	productController.addProduct
);
// Create a route to handle the get all products request on Get
router.get("/api/products", productController.getProducts);

// Create a route to handle the get single product request on Get
router.get("/api/product/:id", productController.getProductById);

// Create a route to handle the update  product request on Put
router.put(
	"/api/product/:id",
	[authMiddleware.verifyToken],
	upload.single("image"),
	productController.updateProductById
);

// Create a route to handle the delete  product request on Delete
router.delete(
	"/api/product/:id",
	[authMiddleware.verifyToken],
	productController.deleteProductById
);
// Export the router
module.exports = router;
