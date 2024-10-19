const api_url = import.meta.env.VITE_REACT_APP_API_URL;

// A function to send post request to create a new device
const createDevice = async (token, formData) => {
	const requestOptions = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"x-access-token": token,
		},
		body: JSON.stringify(formData),
	};
	try {
		const response = await fetch(`${api_url}/api/device`, requestOptions);
		return response;
	} catch (error) {
		console.error("Error creating device:", error);
		throw error;
	}
};
// A function to send get request to get single device by device_id
const getSingledeviceById = async (token,id) => {
	const requestOptions = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"x-access-token": token,
		},
	};
	try {
		const response = await fetch(`${api_url}/api/device/` + id, requestOptions);
		return response;
	} catch (error) {
		console.error("Error creating vehicle:", error);
		throw error;
	}
};

// A function to send get request to get single device by customer_id
const getDevicesPerCustomer = async (token, customer_id) => {
	const requestOptions = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"x-access-token": token,
		},
	};
	const response = await fetch(
		`${api_url}/api/devices/` + customer_id,
		requestOptions
	);
	return response;
};
// Export all the functions
const deviceService = {
	getSingledeviceById,
	createDevice,
	getDevicesPerCustomer,
};
export default deviceService;
