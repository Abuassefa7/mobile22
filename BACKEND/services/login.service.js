// Import the query function from the db.config.js file
const conn = require("../config/db.config");
// Import the bcrypt module to do the password comparison
const bcrypt = require("bcryptjs");
// Import the jsonwebtoken module
const jwt = require("jsonwebtoken");
// Import the nodemailer module
const nodemailer = require("nodemailer");
// Import the secret key from the environment variables
const jwtSecret = process.env.JWT_SECRET;
// Import the employee service to get employee by email
const employeeService = require("./employee.service");
// Handle employee login
async function logIn(employeeData) {
	try {
		let returnData = {};
		// Get the employee by email
		// console.log(employeeData);
		let employee = await employeeService.getEmployeeByUsername(
			employeeData.employee_username
		);
		// console.log("test: ", employee);
		// Check if the employee exists
		if (employee.length === 0) {
			returnData = {
				status: "fail",
				message: "Employee does not exist",
			};
			return returnData;
		}
		// check employee active status
		if (employee[0].employee_active_status === 0) {
			returnData = {
				status: "fail",
				message: "Employee is not active",
			};
			return returnData;
		}
		// Check if the password is correct
		const passwordMatch = await bcrypt.compare(
			employeeData.employee_password,
			employee[0].employee_password_hashed
		);
		if (!passwordMatch) {
			returnData = {
				status: "fail",
				message: "Incorrect password",
			};
			return returnData;
		}
		returnData = {
			status: "success",
			data: employee[0],
		};
		return returnData;
	} catch (error) {
		console.log(error);
	}
}

async function resetnewPassword(employeeData) {
	try {
		let returnData = {};
		// Get the employee by username
		let employeereset = await employeeService.getEmployeeByUsername(
			employeeData.employee_username
		);

		if (employeereset.length === 0) {
			returnData = {
				status: "fail",
				message: "Employee does not exist",
			};
			return returnData;
		}

		// Check if the current password matches
		const passwordMatch = await bcrypt.compare(
			employeeData.employee_password,
			employeereset[0].employee_password_hashed
		);
		if (!passwordMatch) {
			returnData = {
				status: "fail",
				message: "Incorrect current password",
			};
			return returnData;
		}

		// Hash the new password
		const hashedNewPassword = await bcrypt.hash(employeeData.newPassword, 10);

		let updatepassword = await updateEmployee(
			employeeData.employee_username,
			hashedNewPassword
		);
		if (updatepassword) {
			returnData = {
				status: "success",
				message: "Password reset successful",
			};
			return returnData;
		}
		returnData = {
			status: "fail",
			message: "Password reset failed",
		};
		return returnData;
	} catch (error) {
		console.log(error);
		return {
			status: "error",
			message: "An error occurred",
		};
	}
}

// Handle employee forgot password request
async function forgotpassword(employeeData) {
	try {
		let returnData = {};
		// Get the employee by email
		let employee = await employeeService.getEmployeeByEmail(
			employeeData.employee_email
		);
		// Check if the employee exists
		if (employee.length === 0) {
			returnData = {
				status: "fail",
				message: "Employee does not exist",
			};
			return returnData;
		}

		// Generate a JWT token with the employee data and the secret key
		const payload = {
			employee_id: employee[0].employee_id,
			employee_email: employee[0].employee_email,
		};
		const token = jwt.sign(payload, jwtSecret, {
			expiresIn: "1h",
		});

		const resetpasswordURL = `${process.env.FRONTEND_URL}/forgotpassword-reset?token=${token}`;
		const transporter = nodemailer.createTransport({
			service: "gmail",

			auth: {
				user: process.env.Email,
				pass: process.env.EmailPassword,
			},
		});
		// Send email notification
		const mailOptions = {
			from: process.env.Email,
			to: employeeData.employee_email,
			subject: "password Reset",
			text: `Click This Link To Reset your password:\n  ${resetpasswordURL},`,
		};

		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				console.error("Error sending email:", error);
			} else {
				console.log("Email sent:", info.response);
			}
		});
		returnData = {
			status: "success",
			data: employee[0],
		};
		return returnData;
		// -----------------------------
	} catch (error) {
		console.log(error);
	}
}
// A function to update password
async function updateEmployee(employee_username, hashedNewPassword) {
	try {
		// Update data in employee-pass
		const query1 =
			"UPDATE employee_pass SET employee_password_hashed = $1 WHERE employee_id = (SELECT employee_id FROM employee_user WHERE employee_username = $2)";
		const rows1 = await conn.query(query1, [
			hashedNewPassword,
			employee_username,
		]);
		return rows1;
	} catch (err) {
		console.log(err.message);
		return false;
	}
}

// A function to update password
async function updateEmployeePassword(employee_id, hashedNewPassword) {
	try {
		// Update data in employee-pass
		const query1 =
			"UPDATE employee_pass SET employee_password_hashed = $1 WHERE employee_id = $2";
		const rows1 = await conn.query(query1, [hashedNewPassword, employee_id]);
		return rows1;
	} catch (err) {
		console.log(err.message);
		return false;
	}
}

// Export the function
module.exports = {
	logIn,
	resetnewPassword,
	forgotpassword,
	updateEmployeePassword,
};
