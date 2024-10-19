// Import the dotenv package
require("dotenv").config();
// Import the jsonwebtoken package
const jwt = require("jsonwebtoken");
// Import the employee service
const employeeService = require("../services/employee.service");

// A function to verify the token received from the frontend
const verifyToken = async (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      status: "fail",
      message: "No token provided!"
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        status: "fail",
        message: "Unauthorized!"
      });
    }
    req.employee_email = decoded.employee_email;
    next();
  });
};

// A function to check if the user is an employee
const isEmployee = async (req, res, next) => {
  try {
    const employee_email = req.employee_email;
    const employee = await employeeService.getEmployeeByEmail(employee_email);

    if (employee.length > 0 && employee[0].company_role_name === "Employee") {
      // User is an employee, proceed to the next middleware or route handler
      next();
    } else {
      return res.status(403).json({
        status: "fail",
        error: "You don't have access!"
      });
    }
  } catch (error) {
    console.error("Error checking employee status:", error.message);
    return res.status(500).json({
      status: "error",
      error: "Internal Server Error"
    });
  }
};

// A function to check if the user is an admin
const isAdmin = async (req, res, next) => {
  try {
    const employee_email = req.employee_email;
    const employee = await employeeService.getEmployeeByEmail(employee_email);
    if (employee.length > 0 && employee[0].company_role_name === "Admin") {
      // User is an admin, proceed to the next middleware or route handler
      next();
    } else {
      return res.status(403).send({
        status: "fail",
        error: "Not an Admin!"
      });
    }
  } catch (error) {
    console.error("Error checking admin status:", error.message);
    return res.status(500).json({
      status: "error",
      error: "Internal Server Error"
    });
  }
};

const authMiddleware = {
  verifyToken,
  isEmployee,
  isAdmin
};

module.exports = authMiddleware;


/*Things You Need to Check
1,Retrieve the Employee Service Code:
Obtain the code for the employeeService and use it to fetch the email address of the employee.

2,Determine the Role Check Method:
Decide whether to verify the user's company role by using the role ID or the role name.
*/

