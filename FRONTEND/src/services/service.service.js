const api_url = import.meta.env.VITE_REACT_APP_API_URL;
// A function to send post request to create a new services
async function createService(service, token, csrfToken) {
	// Send POST Request with the service object as data in JSON format
	const request = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"x-access-token": token,
			"X-CSRF-Token": csrfToken,
		},
		body: JSON.stringify(service),
	};

	try {
		const response = await fetch(`${api_url}/api/services`, request);

		return response;
	} catch (error) {
		console.error("Error creating service:", error);
		throw error;
	}
}

//  A function to get all services
async function getAllServices(token) {
	const request = {
		method: "GET",
		headers: { "Content-Type": "application/json", "x-access-token": token },
	};

	try {
		const response = await fetch(`${api_url}/api/services`, request);
		return response;
	} catch (error) {
		console.error("Error fetching services:", error);
		throw error;
	}
}

async function getSingleService(token, id) {
	const request = {
		method: "GET",
		headers: { "Content-Type": "application/json", "x-access-token": token },
	};

	try {
		const response = await fetch(`${api_url}/api/services/` + id, request);
		return response;
	} catch (error) {
		console.error("Error fetching single service:", error);
		throw error;
	}
}

async function updateService(service_Id, updatedService, token) {
	const request = {
		method: "PUT",
		headers: { "Content-Type": "application/json", "x-access-token": token },
		body: JSON.stringify(updatedService),
	};

	try {
		const response = await fetch(
			`${api_url}/api/services/${service_Id}`,
			request
		);
		return response;
	} catch (error) {
		console.error("Error updating service:", error);
		throw error;
	}
}

const serviceService = {
	createService,
	getAllServices,
	getSingleService,
	updateService,
	getSingleService,
};

// Export the functions
export default serviceService;
