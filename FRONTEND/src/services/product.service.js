const api_url = import.meta.env.VITE_REACT_APP_API_URL;
const getAllProducts = async () => {
	const requestOptions = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	};

	try {
		const response = await fetch(`${api_url}/api/products`, requestOptions);
		if (!response) {
		}
		return response;
	} catch (error) {
		console.error("Error fetching products:", error);
		throw error;
	}
};

const getSingleProduct = async (product_id) => {
	const requestOptions = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	};
	try {
		const response = await fetch(
			`${api_url}/api/product/${product_id}`,
			requestOptions
		);
		return response;
	} catch (error) {
		console.error("Error fetching product:", error);
		throw error;
	}
};

// a function to add new product

const addProduct = async (token, formData) => {
	const requestOptions = {
		method: "POST",
		headers: {
			"x-access-token": token,
		},
		body: formData,
	};
	try {
		console.log(requestOptions);
		const response = await fetch(`${api_url}/api/product`, requestOptions);
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
	}
};

// a function to update a product
const updateProduct = async (token, formData, product_id) => {
	console.log(formData);
	const requestOptions = {
		method: "PUT",
		body: formData,
		headers: {
			"x-access-token": token,
		},
	};
	try {
		const response = await fetch(
			`${api_url}/api/product/${product_id}`,
			requestOptions
		);
		return response;
	} catch (error) {
		console.log(error);
	}
};

// delete product
const deleteProduct = async (token, product_id) => {
	const requestOptions = {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			"x-access-token": token,
		},
	};

	try {
		const response = await fetch(
			`${api_url}/api/product/${product_id}`,
			requestOptions
		);
		return response;
	} catch (error) {
		console.error("Error deleting product:", error);
		throw error;
	}
};

const productServices = {
	getAllProducts,
	getSingleProduct,
	addProduct,
	updateProduct,
	deleteProduct,
};

export default productServices;
