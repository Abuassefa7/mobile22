// Import the login service
const loginService = require("../services/login.service");
// Import the employee service to get employee by id
const employeeService = require("../services/employee.service");
// Import the bcrypt module to do the password comparison
const bcrypt = require("bcryptjs");
// Import the jsonwebtoken module
const jwt = require("jsonwebtoken");
// Import the secret key from the environment variables
const jwtSecret = process.env.JWT_SECRET;

// Handle employee login
async function logIn(req, res, next) {
	try {
		// console.log(req.body);
		const employeeData = req.body;
		// check if username and password are on the request body
		if (!employeeData.employee_username || !employeeData.employee_password) {
			return res
				.status(400)
				.json({ message: "Username and password are required" });
		}

		// Call the login service with the employeeData from the request body
		const loginResult = await loginService.logIn(employeeData);
		// If the employee is not found
		// console.log(loginResult);
		if (loginResult.status === "fail") {
			res.status(400).json({
				status: loginResult.status,
				message: loginResult.message,
			});
		}
		// If the employee is found ,send a response to the client
		else {
			// Generate a JWT token with the employee data and the secret key
			const payload = {
				employee_id: loginResult.data.employee_id,
				employee_first_name: loginResult.data.employee_first_name,
				employee_role: loginResult.data.company_role_id,
				employee_username: loginResult.data.employee_username,
				employee_email: loginResult.data.employee_email,
			};
			const token = jwt.sign(payload, jwtSecret, {
				expiresIn: "24h",
			});
			const sendBack = {
				employee_token: token,
			};

			// Send the token in the response
			res.status(200).json({
				success: "true",
				message: "Login successful",
				data: sendBack,
			});
		}
	} catch (error) {
		console.log(error);
	}
}

// Handle password reset
async function resetPassword(req, res, next) {
	try {
		const employeeData = req.body;
		if (
			!employeeData.employee_username ||
			!employeeData.employee_password ||
			!employeeData.newPassword
		) {
			return res.status(400).json({
				message: "Username , current password and new password are required",
			});
		}

		const resetResult = await loginService.resetnewPassword(employeeData);
		// If the employee is not found
		if (resetResult.status === "fail") {
			return res.status(400).json({
				status: resetResult.status,
				message: resetResult.message,
			});
		}

		return res.status(200).json({
			status: "success",
			message: resetResult.message,
		});
	} catch (error) {
		return res
			.status(500)
			.json({ message: "An error occurred during password reset" });
	}
}

// Handle Forgot password request
async function forgotpassword(req, res, next) {
	try {
		// console.log(req.body);
		const employeeData = req.body;

		// check if email is on the request body
		if (!employeeData.employee_email) {
			return res.status(400).json({ message: "Email is required" });
		}

		// Call the login service with the employeeData from the request body

		const userEmail = await loginService.forgotpassword(employeeData);

		// If the employee is not found

		if (userEmail.status === "fail") {
			return res.status(400).json({
				status: userEmail.status,
				message: userEmail.data,
			});
		}

		return res.status(200).json({
			status: "success",
			message: userEmail.data,
		});
	} catch (error) {
		console.log(error);
	}
}

// Handle resetForgot_password
async function resetforgot_password(req, res, next) {
	try {
		const { token } = req.params;
		
		const employeeData = req.body;
		
		if (!employeeData.newPassword) {
			return res.status(400).json({
				message: " new password is required",
			});
		}
		let decoded;
		try {
			decoded = jwt.verify(token, jwtSecret);
			
		} catch (err) {
			return res.status(400).json({ message: "Invalid or expired token" });
		}
		const user = await employeeService.getSingleEmployee(decoded.employee_id);
		
		// if (!user) return res.status(404).send("User not found");
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		const hashedNewPassword = await bcrypt.hash(employeeData.newPassword, 10);

		let updatepassword = await loginService.updateEmployeePassword(
			user.employee_id,
			hashedNewPassword
		);

		if (updatepassword.status === "fail") {
			return res.status(400).json({
				status: updatepassword.status,
				message: updatepassword.message,
			});
		}
		return res.status(200).json({
			status: "success",
			message: "password reset successfully",
		});
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ message: "An error occurred during password reset" });
	}
}

// Export the functions
module.exports = {
	logIn,
	resetPassword,
	forgotpassword,
	resetforgot_password,
};
