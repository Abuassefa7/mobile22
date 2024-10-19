const api_url = import.meta.env.VITE_REACT_APP_API_URL;

// A function to send post request to create a new RIA service
async function createRiaService(service, token) {
	const request = {
		method: "POST",
		headers: { "Content-Type": "application/json", "x-access-token": token },
		body: JSON.stringify(service),
	};
	try {
		const response = await fetch(`${api_url}/api/rate`, request);
		return response;
	} catch (error) {
		console.error("Error creating RIA service:", error);
		throw error;
	}
}

// A function to get all RIA services
async function getAllRiaServices() {
	const request = {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	};

	try {
		const response = await fetch(`${api_url}/api/rates`, request);
		return response;
	} catch (error) {
		console.error("Error fetching RIA services:", error);
		throw error;
	}
}

// A function to get a single RIA service by ID
async function getSingleRiaService(id) {
	const request = {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	};

	try {
		const response = await fetch(`${api_url}/api/ria_services/` + id, request);
		return response;
	} catch (error) {
		console.error("Error fetching single RIA service:", error);
		throw error;
	}
}

// A function to update a RIA service
async function updateRiaService(service_Id, updatedService, token) {
	const request = {
		method: "PUT",
		headers: { "Content-Type": "application/json", "x-access-token": token },
		body: JSON.stringify(updatedService),
	};

	try {
		const response = await fetch(`${api_url}/api/rate/${service_Id}`, request);
		return response;
	} catch (error) {
		console.error("Error updating RIA service:", error);
		throw error;
	}
}
async function deleteRateService(id, token) {
	const request = {
		method: "DELETE",
		headers: { "Content-Type": "application/json", "x-access-token": token },
	};

	try {
		const response = await fetch(`${api_url}/api/rate/${id}`, request);
		return response;
	} catch (error) {
		console.error("Error fetching single service:", error);
		throw error;
	}
}

const riaService = {
	createRiaService,
	getAllRiaServices,
	getSingleRiaService,
	updateRiaService,
	deleteRateService,
};

// Export the functions
export default riaService;
