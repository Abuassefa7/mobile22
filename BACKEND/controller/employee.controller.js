// Import the employee service
const employeeService = require("../services/employee.service");
// Create the add employee controller

async function createEmployee(req, res, next) {
	// check if incoming request has all required employee data
	if (
		!req.body.employee_email ||
		!req.body.employee_username ||
		!req.body.employee_first_name ||
		!req.body.employee_last_name ||
		!req.body.employee_phone ||
		!req.body.employee_password ||
		!req.body.company_role_id
	) {
		return res.status(400).send({ message: "Employee data is incomplete" });
	}

	// Check if employee email already exists in the database
	// console.log(req.body);
	const employeeExists = await employeeService.checkIfEmployeeExists(
		req.body.employee_email,
		req.body.employee_username
	);
	// console.log("test");
	// If employee exists, send a response to the client
	if (employeeExists) {
		res.status(400).json({
			error:
				"This email address or username is already associated with another employee!",
		});
	} else {
		try {
			const employeeData = req.body;
			// Create the employee
			const employee = await employeeService.createEmployee(employeeData);
			if (!employee) {
				res.status(400).json({
					error: "Failed to add the employee!",
				});
			} else {
				res.status(200).json({
					status: "true",
					message: "Employee Added Successfully",
				});
			}
		} catch (error) {
			res.status(400).json({
				error: "Something went wrong!",
			});
		}
	}
}

// create getAllEmployees controller
async function getAllEmployees(req, res, next) {
	// Call the getAllEmployees method from the employee service
	const employees = await employeeService.getAllEmployees();
	// console.log(employees);
	if (!employees) {
		res.status(400).json({
			error: "Failed to get all employees!",
		});
	} else {
		res.status(200).json({
			status: "success",
			data: employees,
		});
	}
}

// getSingleEmployee controller function
async function getSingleEmployee(req, res, next) {
	const employeeId = req.params.id;
	// Call the getSingleEmployee method from the employee service
	const employee = await employeeService.getSingleEmployee(employeeId);
	// console.log(employees);
	if (!employee) {
		res.status(400).json({
			error: "Failed to get single employee!",
		});
	} else {
		res.status(200).json(employee);
	}
}

// updateEmployee controller function
const updateEmployee = async (req, res) => {
	try {
		const EmployeeId = req.params.id;
		const updatedEmployee = await employeeService.updateEmployee(
			EmployeeId,
			req.body
		);
		// console.log(updatedEmployee);
		if (!updatedEmployee) {
			return res.status(404).json({
				error: "Failed to update employee",
			});
		}

		res.status(200).json({
			status: "true",
			Employee: updatedEmployee.updatedInfo,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: "Internal Server Error",
		});
	}
};

// Export the createEmployee controller
module.exports = {
	createEmployee,
	getAllEmployees,
	getSingleEmployee,
	updateEmployee,
};
