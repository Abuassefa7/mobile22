// Import the product service
const productService = require("../services/product.service");

// Create the add product controller
async function addProduct(req, res, next) {
	try {
		const productData = req.body;
		const imageUrl = `${req.protocol}://${req.get("host")}/api/uploads/${
			req.file.filename
		}`;
		console.log(imageUrl);
		// validate if all datas are coming from the request
		if (
			!productData.name ||
			!productData.price ||
			!productData.description ||
			!productData.category ||
			!imageUrl
		) {
			return res
				.status(400)
				.json({ message: "Please provide all required fields" });
		}

		const result = await productService.addProduct(productData, imageUrl);
		if (result) {
			res.status(200).json(result);
		} else {
			res.status(400).json({
				error: "Failed to add the product!",
			});
		}
	} catch (error) {
		// Return the error
		res.status(500).json(error);
	}
}

// Create the get products controller
async function getProducts(req, res, next) {
	try {
		// calling  the getProducts method of the Product Service
		const result = await productService.getProducts();
		if (result) {
			res.status(200).json({ status: "success", data: result });
		} else if (result.length == 0) {
			res.status(200).json({
				data: "No Products Found",
			});
		} else {
			res.status(400).json({
				error: "Failed to get all Products!",
			});
		}
	} catch (error) {
		res.status(500).json(error);
	}
}

// Create the get single product controller
async function getProductById(req, res, next) {
	try {
		const product_id = req.params.id;
		// calling  the getProductById method of the Product Service
		const result = await productService.getProductById(product_id);
		if (result.length == 0) {
			res.status(400).json({
				data: `No Product Found for this id`,
			});
		} else if (result) {
			res.status(200).json(result);
		} else {
			res.status(400).json({
				error: "Failed to get the Product!",
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
}

// Create the update product controller
async function updateProductById(req, res, next) {
	try {
		const product_id = req.params.id;
		const product = req.body;
		const imageUrl = req.file
			? `${req.protocol}://${req.get("host")}/api/uploads/${req.file.filename}`
			: product.image;

		// check if all data are coming from the incoming request
		// validate if all datas are coming from the request
		if (
			!product.name ||
			!product.price ||
			!product.description ||
			!product.category ||
			!imageUrl
		) {
			return res
				.status(400)
				.json({ message: "Please provide all required fields" });
		}
		// check if the product exist
		const productExistResponse = await productService.getProductById(
			product_id
		);
		// console.log("chekc",productExistResponse);
		if (productExistResponse.length == 0) {
			res.status(400).json({ message: "Product doesn't exist" });
			return;
		}

		// calling  the updateProductById method of the Product Service
		const result = await productService.updateProductById(
			product_id,
			product,
			imageUrl
		);
		// console.log(result);
		if (result) {
			res.status(200).json({
				data: "Product Updated Successfully",
			});
		} else {
			res.status(400).json({
				error: "Failed to update the Product!",
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
}

// Create the delete product controller
async function deleteProductById(req, res, next) {
	try {
		const product_id = req.params.id;
		// check if the product with this id exists first
		const productExist = await productService.getProductById(product_id);
		if (productExist.length == 0) {
			return res.status(400).json({
				error: "Product with this id does not exist",
			});
		}

		// calling  the deleteProductById method of the Product Service
		const result = await productService.deleteProductById(product_id);
		if (result) {
			res.status(200).json({
				data: "Product Deleted Successfully",
			});
		} else {
			res.status(400).json({
				error: "Failed to delete the Product!",
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
}

// export functions
module.exports = {
	addProduct,
	getProducts,
	getProductById,
	updateProductById,
	deleteProductById,
};
