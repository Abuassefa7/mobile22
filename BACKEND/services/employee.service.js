// Import the query function from the db.config.js file
const conn = require("../config/db.config");
// Import the bcrypt module
const bcrypt = require("bcryptjs");
// A function to check if employee exists in the database
// A function to check if employee exists in the database
async function checkIfEmployeeExists(email, username) {
	const query =
		"SELECT * FROM employee_identifier JOIN employee_user ON employee_identifier.employee_id=employee_user.employee_id WHERE employee_identifier.employee_email = $1 OR employee_user.employee_username=$2 ";
	const rows = await conn.query(query, [email, username]);
	// console.log(rows);
	if (rows.length > 0) {
		return true;
	}
	return false;
}

// A function to create a new employee
async function createEmployee(employee) {
	let createdEmployee = "";
	try {
		// Generate a salt and hash the password
		const salt = await bcrypt.genSalt(10);
		// Hash the password
		const hashedPassword = await bcrypt.hash(employee.employee_password, salt);
		// Insert the email in to the employee table
		const query =
			"INSERT INTO employee_identifier (employee_email, employee_active_status) VALUES ($1, $2) RETURNING employee_id";
		const rows = await conn.query(query, [employee.employee_email, 1]);
		// console.log(rows);
		if (rows.length == 0) {
			return false;
		}

		// Get the employee id from the insert
		const employee_id = rows[0].employee_id;
		// Insert the remaining data in to the employee_info, employee_pass, and employee_role tables
		const query2 =
			"INSERT INTO employee_info (employee_id, employee_first_name, employee_last_name, employee_phone) VALUES ($1, $2, $3, $4)";
		const rows2 = await conn.query(query2, [
			employee_id,
			employee.employee_first_name,
			employee.employee_last_name,
			employee.employee_phone,
		]);
		const query3 =
			"INSERT INTO employee_pass (employee_id, employee_password_hashed) VALUES ($1, $2)";
		const rows3 = await conn.query(query3, [employee_id, hashedPassword]);

		const query4 =
			"INSERT INTO employee_role (employee_id, company_role_id) VALUES ($1, $2)";
		const rows4 = await conn.query(query4, [
			employee_id,
			employee.company_role_id,
		]);
		const query5 =
			"INSERT INTO employee_user (employee_id, employee_username) VALUES ($1, $2)";
		const rows5 = await conn.query(query5, [
			employee_id,
			employee.employee_username,
		]);
		// construct to the employee object to return
		createdEmployee = {
			employee_id: employee_id,
		};
	} catch (err) {
		console.log(err.message);
	}
	// Return the employee object
	return createdEmployee;
}

// fetch employee by email
async function getEmployeeByEmail(employee_email) {
	const query =
		"SELECT * FROM employee_identifier  JOIN employee_info ON employee_identifier.employee_id = employee_info.employee_id  JOIN employee_pass ON employee_identifier.employee_id = employee_pass.employee_id  JOIN employee_role ON employee_identifier.employee_id = employee_role.employee_id JOIN company_roles ON employee_role.company_role_id = company_roles.company_role_id  WHERE employee_identifier.employee_email = $1";

	const rows = await conn.query(query, [employee_email]);
	return rows;
}
// A function to get employee by email
async function getEmployeeByUsername(employee_username) {
	const query =
		"SELECT * FROM employee_user  JOIN employee_identifier ON employee_user.employee_id = employee_identifier.employee_id JOIN employee_info ON employee_user.employee_id = employee_info.employee_id  JOIN employee_pass ON employee_user.employee_id = employee_pass.employee_id  JOIN employee_role ON employee_user.employee_id = employee_role.employee_id WHERE employee_user.employee_username = $1";
	const rows = await conn.query(query, [employee_username]);
	return rows;
}
// A function to get all employees
async function getAllEmployees() {
	const query =
		"SELECT * FROM employee_identifier  JOIN employee_info ON employee_identifier.employee_id = employee_info.employee_id  JOIN employee_role ON employee_identifier.employee_id = employee_role.employee_id JOIN employee_user ON employee_identifier.employee_id = employee_user.employee_id  JOIN company_roles ON employee_role.company_role_id = company_roles.company_role_id ORDER BY employee_identifier.employee_id DESC;";
	const rows = await conn.query(query);
	return rows;
}

// A function to get Single employee
async function getSingleEmployee(employeeId) {
	const query = `
        SELECT * FROM employee_identifier
         JOIN employee_info ON employee_identifier.employee_id = employee_info.employee_id
         JOIN employee_role ON employee_identifier.employee_id = employee_role.employee_id
         JOIN company_roles ON employee_role.company_role_id = company_roles.company_role_id
		 JOIN employee_user ON employee_role.employee_id = employee_user.employee_id
        WHERE employee_identifier.employee_id = $1`;

	const rows = await conn.query(query, [employeeId]);
	return rows[0];
}

// A function to update employee by ID
async function updateEmployee(EmployeeId, updatedData) {
	try {
		// Update data in customer_info table
		const query1 =
			"UPDATE employee_info SET employee_first_name = $1, employee_last_name = $2, employee_phone = $3 WHERE employee_id = $4 RETURNING *";
		const rows1 = await conn.query(query1, [
			updatedData.employee_first_name,
			updatedData.employee_last_name,
			updatedData.employee_phone,
			EmployeeId,
		]);
		const query2 =
			"UPDATE employee_identifier SET employee_active_status = $1  WHERE employee_id = $2 RETURNING *";
		const rows2 = await conn.query(query2, [
			updatedData.employee_active_status,
			EmployeeId,
		]);

		const query3 =
			"UPDATE employee_role SET company_role_id = $1  WHERE employee_id = $2 RETURNING *";
		const rows3 = await conn.query(query3, [
			updatedData.company_role_id,
			EmployeeId,
		]);

		if (rows1.length === 0 || rows2.length === 0 || rows3.length === 0) {
			return false;
		}
		// Construct the updated customer object to return
		const updatedEmployee = {
			// employee_id: EmployeeId,
			updatedInfo: rows1[0],
		};

		return updatedEmployee;
	} catch (err) {
		console.log(err.message);
		return false;
	}
}

// Export the functions for use in the controller
module.exports = {
	checkIfEmployeeExists,
	createEmployee,
	getAllEmployees,
	getEmployeeByEmail,
	getEmployeeByUsername,
	getSingleEmployee,
	updateEmployee,
};
