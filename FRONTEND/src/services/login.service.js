const api_url = import.meta.env.VITE_REACT_APP_API_URL;

// function to send post request to create new employe
const logIn = async (formData) => {
	const requestOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(formData),
	};
	const response = await fetch(`${api_url}/api/employee/login`, requestOptions);
	return response;
};

// Function to reset password
const resetPassword = async (formData) => {
	const requestOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(formData),
	};
	const response = await fetch(
		`${api_url}/api/employee/resetpassword`,
		requestOptions
	);
	return response;
};

// Function to Forgot password request
const forgotPassword = async (formData) => {
	const requestOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(formData),
	};
	const response = await fetch(
		`${api_url}/api/employee/forgot-password`,
		requestOptions
	);
	return response;
};

// Function to Reset Forgot password
const resetforgotPassword = async (formData) => {
	const { token, newPassword } = formData;
	const requestOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ newPassword }),
	};
	const response = await fetch(
		`${api_url}/api/employee/resetforgot-password/${token}`,
		requestOptions
	);
	return response;
};
// A function to log out the user
const logOut = () => {
	localStorage.removeItem("employee");
};

// a function to call csrf endpoint
const getCsrfToken = async () => {
	const response = await fetch(`${api_url}/csrf-token`, {
		method: "GET",
		
	});
	return response
};
const loginService = {
	logIn,
	resetPassword,
	forgotPassword,
	resetforgotPassword,
	logOut,
	getCsrfToken,
};

export default loginService;
