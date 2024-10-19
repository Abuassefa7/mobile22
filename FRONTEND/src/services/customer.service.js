// Import from the env
const api_url = import.meta.env.VITE_REACT_APP_API_URL;

const getAllCustomers = async (token) => {
	const requestOptions = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"x-access-token": token,
		},
	};

	try {
		const response = await fetch(`${api_url}/api/customers`, requestOptions);
		return response;
	} catch (error) {
		console.error("Error fetching customers:", error);
		throw error;
	}
};

const getCustomer = async (token, customer_id) => {
	const requestOptions = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"x-access-token": token,
		},
	};
	try {
		const response = await fetch(
			`${api_url}/api/customer/${customer_id}`,
			requestOptions
		);
		return response;
	} catch (error) {
		console.error("Error fetching employee:", error);
		throw error;
	}
};

const updateCustomer = async (id, formData, loggedInCustomerToken) => {
	const requestOptions = {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			"x-access-token": loggedInCustomerToken,
		},
		body: JSON.stringify(formData),
	};

	const response = await fetch(
		`${api_url}/api/customer/${id}`, // Fix the endpoint URL
		requestOptions
	);

	return response;
};
const createCustomer = async (formData, loggedInEmployeeToken) => {
	const requestOptions = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"x-access-token": loggedInEmployeeToken,
		},
		body: JSON.stringify(formData),
	};

	try {
		const response = await fetch(`${api_url}/api/customer`, requestOptions);
		return response;
	} catch (error) {
		console.error("Error creating customer:", error);
		throw error;
	}
};

// Export all the functions
const customerService = {
	getAllCustomers,
	getCustomer,
	updateCustomer,
	createCustomer,
};
export default customerService;
