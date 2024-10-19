// Import the query function from the db.config.js file
const conn = require("../config/db.config");
// Import the bcrypt module
const bcrypt = require("bcryptjs");

// A function to check if a rate exists in the database
async function checkIfRateExists(rate) {
	const query = "SELECT * FROM ria_rate_service WHERE rate_service_name = $1";
	const rows = await conn.query(query, [rate]);
	if (rows.length > 0) {
		return true;
	}
	return false;
}

// A function to create a new rate
async function createRate(rateData) {
	try {
		// Insert data into ria_rate_service table
		// Begin transaction

		const query1 = `
      INSERT INTO ria_rate_service (rate_service_name, rate_value)
      VALUES ($1, $2)
      RETURNING rate_service_id;
    `;
		const values = [rateData.rate_service_name, rateData.rate_value];
		const result = await conn.query(query1, values);

		if (result.length === 0) {
			rate = {
				status: "fail",
				message: "Failed to add the rate!",
			};
			return rate;
		}
		// Construct the rate object to return
		const createdRate = {
			rateValue: result[0].rate_value,
		};

		return createdRate;
	} catch (err) {
		console.error("Error:", err.message);
		return false;
	}
}

// A function to get a11 rates
async function getAllRates() {
	try {
		const query = `SELECT * FROM ria_rate_service ORDER BY rate_service_id DESC`;
		const rows = await conn.query(query);
		return rows;
	} catch (error) {
		console.error(error);
		return [];
	}
}

// A function to update the rate by ID
async function updateRate(rateId, updatedData) {
	try {
		// Update data in ria_rate_service table
		const query = `UPDATE ria_rate_service SET rate_service_name = $1, rate_value = $2 WHERE rate_service_id= $3 RETURNING *`;
		const rows = await conn.query(query, [
			updatedData.rate_service_name,
			updatedData.rate_value,
			rateId,
		]);

		if (rows.length === 0) {
			return false;
		}

		// Construct the updated rate object to return
		const updatedRate = {
			updatedData: rows[0],
		};

		return updatedRate;
	} catch (err) {
		console.log(err.message);
		return false;
	}
}
// A function to get delete rent
async function deleteRateById(rateServiceId) {
	try {
		const query =
			"DELETE FROM ria_rate_service WHERE rate_service_id = $1 RETURNING rate_service_id";
		const rows = await conn.query(query, [rateServiceId]);
		if (!rows[0].rate_service_id) {
			return false;
		}

		// const deletedRentId = rows;
		// console.log("Deleted rent_service ID:", deletedRentId);

		return true;
	} catch (error) {
		console.error("Error deleting rent_service:", error);
		throw error;
	}
}

// Export the functions for use in the controller
module.exports = {
	checkIfRateExists,
	createRate,
	getAllRates,
	updateRate,
	deleteRateById,
};
