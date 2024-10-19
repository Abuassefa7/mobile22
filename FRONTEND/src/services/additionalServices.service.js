const api_url = import.meta.env.VITE_REACT_APP_API_URL;
// A function to send post request to create a new services
async function createRentService(service,token) {
	// Send POST Request with the service object as data in JSON format
	const request = {
		method: "POST",
		headers: { "Content-Type": "application/json", "x-access-token": token },
		body: JSON.stringify(service),
	};

	try {
		const response = await fetch(`${api_url}/api/rent`, request);
		return response;
	} catch (error) {
		console.error("Error creating service:", error);
		throw error;
	}
}

//  A function to get all services
async function getAllRentServices() {
	const request = {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	};

	try {
		const response = await fetch(`${api_url}/api/rents`, request);
		return response;
	} catch (error) {
		console.error("Error fetching services:", error);
		throw error;
	}
}

async function getSingleRentService(id) {
	const request = {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	};

	try {
		const response = await fetch(`${api_url}/api/services/` + id, request);
		return response;
	} catch (error) {
		console.error("Error fetching single service:", error);
		throw error;
	}
}

async function updateRentService(service_Id, updatedService,token) {
	const request = {
		method: "PUT",
		headers: { "Content-Type": "application/json", "x-access-token": token },
		body: JSON.stringify(updatedService),
	};

	try {
		const response = await fetch(`${api_url}/api/rent/${service_Id}`, request);
		return response;
	} catch (error) {
		console.error("Error updating service:", error);
		throw error;
	}
}
async function deleteRentService(id,token) {
	const request = {
		method: "DELETE",
		headers: { "Content-Type": "application/json", "x-access-token": token },
	};

	try {
		const response = await fetch(`${api_url}/api/rent/${id}`, request);
		return response;
	} catch (error) {
		console.error("Error fetching single service:", error);
		throw error;
	}
}

const additionalService = {
	createRentService,
	getAllRentServices,
	getSingleRentService,
	updateRentService,
	deleteRentService,
};

// Export the functions
export default additionalService;
