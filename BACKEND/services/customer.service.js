// Import the query function from the db.config.js file
const conn = require("../config/db.config");
// Import the bcrypt module
const bcrypt = require("bcryptjs");

// A function to check if a customer exists in the database
async function checkIfCustomerExists(email) {
	const query = "SELECT * FROM customer_identifier WHERE customer_email = $1";
	const rows = await conn.query(query, [email]);
	if (rows.length > 0) {
		return true;
	}
	return false;
}

// A function to create a new customer
async function createCustomer(customer) {
	try {
		// Insert data into customer_identifier table
		// Begin transaction

		const query1 = `
      INSERT INTO customer_identifier (customer_email, customer_phone_number, customer_hash)
      VALUES ($1, $2, $3)
      RETURNING customer_id;
    `;
		const values1 = [
			customer.customer_email,
			customer.customer_phone_number,
			customer.customer_hash,
		];
		const result1 = await conn.query(query1, values1);

		const querys = `
      SELECT currval(pg_get_serial_sequence('customer_identifier', 'customer_id')) AS customer_id;
    `;
		const result2 = await conn.query(querys);
		// Ensure result1 is defined and has rows
		if (!result2) {
			throw new Error(
				"No rows returned after inserting into customer_identifier"
			);
		}
		// Get the customer_id from the insert
		const customer_id = result2[0].customer_id;

		// Insert data into customer_info table
		const query2 = `
      INSERT INTO customer_info (customer_id, customer_first_name, customer_last_name, active_customer_status)
      VALUES ($1, $2, $3, $4);
    `;
		const values2 = [
			customer_id,
			customer.customer_first_name,
			customer.customer_last_name,
			1, // Assuming active_customer_status is a BOOLEAN
		];
		await conn.query(query2, values2);

		// Commit transaction
		await conn.query("COMMIT");

		// Construct the customer object to return
		const createdCustomer = {
			customer_id: customer_id,
		};

		return createdCustomer;
	} catch (err) {
		console.error("Error:", err.message);
		// Rollback transaction in case of error
		await conn.query("ROLLBACK");
		return false;
	}
}

// A function to get a customer by email
async function getCustomerByEmail(customer_email) {
	const query = `SELECT * FROM customer_identifier INNER JOIN customer_info ON customer_identifier.customer_id = customer_info.customer_id WHERE customer_identifier.customer_email = $1`;
	const rows = await conn.query(query, [customer_email]);
	return rows;
}

async function getAllCustomers() {
	try {
		const query = `SELECT * FROM customer_identifier INNER JOIN customer_info  ON customer_identifier.customer_id = customer_info.customer_id ORDER BY customer_info.customer_id DESC`;

		const rows = await conn.query(query);

		return rows;
	} catch (error) {
		console.error(error);
		return [];
	}
}
// A function to get a single customer by ID
async function getCustomerById(customer_id) {
	const query = `SELECT * FROM customer_identifier INNER JOIN customer_info ON customer_identifier.customer_id = customer_info.customer_id WHERE customer_identifier.customer_id = $1`;
	const rows = await conn.query(query, [customer_id]);
	return rows[0]; // Assuming there is only one customer with a given ID
}

// A function to update a customer by ID
async function updateCustomer(customer_id, updatedData) {
	try {
		// Update data in customer_info table
		const query1 = `UPDATE customer_info SET customer_first_name = $1, customer_last_name = $2, active_customer_status = $3 WHERE customer_id = $4 RETURNING *`;
		const rows1 = await conn.query(query1, [
			updatedData.customer_first_name,
			updatedData.customer_last_name,
			updatedData.active_customer_status,
			customer_id,
		]);
		const query2 = `UPDATE customer_identifier SET customer_phone_number = $1  WHERE customer_id = $2 RETURNING *`;
		const rows2 = await conn.query(query2, [
			updatedData.customer_phone_number,
			customer_id,
		]);

		if (rows1.length === 0 || rows2.length === 0) {
			return false;
		}

		// Construct the updated customer object to return
		const updatedCustomer = {
			updatedData: rows1[0],
		};

		return updatedCustomer;
	} catch (err) {
		console.log(err.message);
		return false;
	}
}

// Export the functions for use in the controller
module.exports = {
	checkIfCustomerExists,
	createCustomer,
	getCustomerByEmail,
	getAllCustomers,
	getCustomerById,
	updateCustomer,
};
