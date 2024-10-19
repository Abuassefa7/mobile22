// Import the query function from the db.config.js file
const conn = require("../config/db.config");
// Import the bcrypt module
const bcrypt = require("bcryptjs");

// A function to check if a rate exists in the database
async function checkIfRentExists(num) {
	const query = "SELECT * FROM rent_service WHERE owner_phonenumber = $1";
	const rows = await conn.query(query, [num]);
	if (rows.length > 0) {
		return true;
	}
	return false;
}

// A function to create a new rate
async function createRent(rentData) {
	let createdRent = "";
	try {
		// Insert data into rent_service table
		// Begin transaction

		const query1 =
			"INSERT INTO rent_service (rent_service_name, owner_phonenumber, rent_service_description, rent_status) VALUES ($1, $2, $3, $4) RETURNING *";
		const values = [
			rentData.rent_service_name,
			rentData.owner_phonenumber,
			rentData.rent_service_description,
			0,
		];
		const result = await conn.query(query1, values);

		if (result.length === 0) {
			createdRent = {
				status: "fail",
				message: "Failed to add the rent!",
			};
			return createdRent;
		}

		// Construct the rate object to return
		createdRent = {
			status: "success",
			newRent: result[0].rent_service_name,
		};

		return createdRent;
	} catch (err) {
		console.error("Error:", err.message);
		return false;
	}
}

// A function to get a11 rates
async function getAllRents() {
	try {
		const query = `SELECT * FROM rent_service ORDER BY rent_service_id DESC`;
		const rows = await conn.query(query);
		return rows;
	} catch (error) {
		console.error(error);
		return [];
	}
}
// A function to get single rent
async function getSingleRents(Id) {
	try {
		const query = `SELECT * FROM rent_service WHERE rent_service_id = $1`;
		const rows = await conn.query(query, [Id]);
		return rows[0];
	} catch (error) {
		console.error(error);
		return [];
	}
}
// A function to get delete rent
async function deleteRentById(rentServiceId) {
	try {
		const query =
			"DELETE FROM rent_service WHERE rent_service_id = $1 RETURNING rent_service_id";
		const rows = await conn.query(query, [rentServiceId]);

		if (!rows[0].rent_service_id) {
			return false;
		}

		// const deletedRentId = rows;
		// console.log("Deleted rent_service ID:", deletedRentId);

		return true;
	} catch (error) {
		throw error;
	}
}

// A function to update the rent by ID
async function updateRent(Id, updatedData) {
	try {
		// Update data in rent_service table
		const query =
			"UPDATE rent_service SET rent_service_name = $1, owner_phonenumber = $2, rent_service_description = $3, rent_status = $4 WHERE rent_service_id= $5 RETURNING *";
		const rows = await conn.query(query, [
			updatedData.rent_service_name,
			updatedData.owner_phonenumber,
			updatedData.rent_service_description,
			updatedData.rent_status,
			Id,
		]);

		if (rows.length === 0) {
			return false;
		}

		// Construct the updated rate object to return
		const updatedRent = {
			updatedData: rows[0],
		};

		return updatedRent;
	} catch (err) {
		console.log(err.message);
		return false;
	}
}

// Export the functions for use in the controller
module.exports = {
	checkIfRentExists,
	createRent,
	getAllRents,
	getSingleRents,
	updateRent,
	deleteRentById,
};
