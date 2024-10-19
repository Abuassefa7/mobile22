// Import from the env
const api_url = import.meta.env.VITE_REACT_APP_API_URL;

// A function to send post request to create a new employee
const createEmployee = async (formData, loggedInEmployeeToken) => {
	const requestOptions = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"x-access-token": loggedInEmployeeToken,
		},
		body: JSON.stringify(formData),
	};
	const response = await fetch(`${api_url}/api/employee`, requestOptions);
	return response;
};

// A function to send get request to get all employees
const getAllEmployees = async (token) => {
	const requestOptions = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"x-access-token": token,
		},
	};
	const response = await fetch(`${api_url}/api/employees`, requestOptions);
	return response;
};


const updateEmployee = async (employeeId, updatedEmployee, token) => {
  const request = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token, // Uncomment if authentication token is required
    },
    body: JSON.stringify(updatedEmployee),
  };

  try {
    const response = await fetch(
      `${api_url}/api/employee/${employeeId}`,
      request
    );
    return response;
  } catch (error) {
    console.error("Error updating employee:", error);
    throw error;
  }
};

const getEmployee = async (employeeId, token) => {
	const requestOptions = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"x-access-token": token, // Uncomment if authentication token is required
		},
	};

	try {
		const response = await fetch(
			`${api_url}/api/employee/${employeeId}`,
			requestOptions
		);
		return response;
	} catch (error) {
		console.error("Error fetching employee:", error);
		throw error;
	}
};

// Export all the functions
const employeeService = {
  createEmployee,
  getAllEmployees,
  getEmployee,
  updateEmployee,
};
export default employeeService;
