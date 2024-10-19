const conn = require("../config/db.config");

// A function to get a single service by ID
async function getServiceById(serviceId) {
	try {
		const query = "SELECT * FROM common_repair_services WHERE service_id = $1";
		const result = await conn.query(query, [serviceId]);
		if (!result || result.length === 0) {
			return null;
		}
		return result[0];
	} catch (error) {
		console.error("Error fetching service by ID:", error.message);
		return null;
	}
}

// A function to get all services
async function getAllServices() {
	try {
		const query =
			"SELECT * FROM common_repair_services ORDER BY service_id DESC";
		const result = await conn.query(query);
		if (!result) {
			return [];
		}
		return result;
	} catch (error) {
		console.error("Error fetching all services:", error.message);
		return [];
	}
}

// A function to create a new service
async function createService(serviceData) {
	try {
		const query = `
            INSERT INTO common_repair_services (repair_service_name, repair_service_description)
            VALUES ($1, $2)
            RETURNING service_id;
        `;
		const values = [
			serviceData.repair_service_name,
			serviceData.repair_service_description,
		];
		const result = await conn.query(query, values);

		// Add detailed logging

		if (!result || result.length === 0) {
			return {
				success: false,
				message: "Failed to add the service!",
			};
		}

		return {
			success: true,
			service_id: result[0].service_id,
		};
	} catch (error) {
		console.error("Error creating service:", error.message);
		return {
			success: false,
			message: error.message,
		};
	}
}

// A function to update a service by ID
async function updateService(serviceId, updatedData) {
	try {
		const query = `
            UPDATE common_repair_services
            SET repair_service_name = $1, repair_service_description = $2
            WHERE service_id = $3
            RETURNING *;
        `;
		const values = [
			updatedData.repair_service_name,
			updatedData.repair_service_description,
			serviceId,
		];
		const result = await conn.query(query, values);

		// Add detailed logging

		if (!result || result.length === 0) {
			return {
				success: false,
				message: "Failed to update the service!",
			};
		}

		return {
			success: true,
			service: result[0],
		};
	} catch (error) {
		console.error("Error updating service:", error.message);
		return {
			success: false,
			message: error.message,
		};
	}
}

// Export the functions for use in the controller
module.exports = {
	getServiceById,
	getAllServices,
	createService,
	updateService,
};
