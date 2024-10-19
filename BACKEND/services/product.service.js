// Import the query function from the db.config.js file
const conn = require("../config/db.config");

// A function to add a new product
async function addProduct(productData, url) {
	let createProduct = "";
	try {
		// Get the product data from the request body
		// console.log(productData);
		const { name, category, price, description } = productData;

		// Insert Product query -- to products table
		const query1 =
			"INSERT INTO products(product_name,product_category,product_image,product_price) VALUES($1,$2,$3,$4) RETURNING product_id";
		const rows1 = await conn.query(query1, [name, category, url, price]);
		// console.log(rows1);

		if (!rows1) {
			createProduct = {
				status: "fail",
				message: "Failed to add the product!",
			};
			return createProduct;
		}
		const productId = rows1[0].product_id;

		// Insert Product query -- to product_info table
		const query2 =
			"INSERT INTO product_info(product_id,product_description) VALUES($1,$2) RETURNING product_id";
		const rows2 = await conn.query(query2, [productId, description]);

		if (!rows2) {
			createProduct = {
				status: "fail",
				message: "Failed to add the product info!",
			};
			return createProduct;
		}
		createProduct = {
			status: "success",
			message: "Product added successfully!",
		};
		// Return a success message
		// console.log(createProduct);
		return createProduct;
	} catch (error) {
		console.log(error.message);
		createProduct = {
			status: "Fail",
			message: error.message,
		};
		return createProduct;
	}
}

// async function to getProducts
async function getProducts() {
	try {
		//   get products query
		const getProductsQuery =
			"SELECT * FROM products JOIN product_info ON products.product_id=product_info.product_id ORDER BY products.product_id ASC";
		const rows = await conn.query(getProductsQuery);
		// console.log(rows);
		return rows;
	} catch (error) {
		console.log(error.message);
		return false;
	}
}

// async function to getProductById
async function getProductById(productId) {
	try {
		//   get products query
		const getProductQuery =
			"SELECT * FROM products JOIN product_info ON products.product_id=product_info.product_id WHERE products.product_id = $1 ";
		const rows = await conn.query(getProductQuery, [productId]);
		// console.log(rows);
		return rows;
	} catch (error) {
		console.log(error.message);
		return false;
	}
}

// async function to updateProductById
async function updateProductById(productId, product, imageUrl) {
	try {
		//   update product query on products table
		const updateProductQuery =
			"UPDATE products SET product_name = $1, product_category = $2,product_image=$3,  product_price = $4 WHERE product_id = $5 RETURNING product_id";
		const productUpdatedRows = await conn.query(updateProductQuery, [
			product.name,
			product.category,
			imageUrl,
			product.price,
			productId,
			
		]);
		if (!productUpdatedRows[0].product_id) {
			return false;
		}
		//   update product query on product_info table
		const updateProductInfoQuery =
			"UPDATE product_info SET  product_description = $1 WHERE product_id = $2 RETURNING product_info_id";
		const productInfoUpdatedRows = await conn.query(updateProductInfoQuery, [
			product.description,
			productId,
		]);
		if (!productInfoUpdatedRows[0].product_info_id) {
			return false;
		}
		return true;
	} catch (error) {
		console.log(error.message);
		return false;
	}
}

// async function to deleteProductById
async function deleteProductById(productId) {
	try {
		//   delete product query on product_info table
		const deleteProductInfoQuery =
			"DELETE FROM product_info WHERE product_id = $1 RETURNING product_info_id";
		const productInfoDeletedRows = await conn.query(deleteProductInfoQuery, [
			productId,
		]);
		if (!productInfoDeletedRows[0].product_info_id) {
			return false;
		}

		//   delete product query on products table
		const deleteProductQuery =
			"DELETE FROM products WHERE product_id = $1 RETURNING product_id";
		const productDeletedRows = await conn.query(deleteProductQuery, [
			productId,
		]);
		if (!productDeletedRows[0].product_id) {
			return false;
		}
		return true;
	} catch (error) {
		console.log(error.message);
		return false;
	}
}

// Export all functions for use in the controller
module.exports = {
	addProduct,
	getProducts,
	getProductById,
	updateProductById,
	deleteProductById,
};
