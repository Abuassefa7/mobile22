// Import React and the Hooks we need here
import React, { useState, useEffect, useContext, useLayoutEffect } from "react";
// Import the Util function we created to handle the reading from the local storage
import getAuth from "../util/auth";
import { Navigate } from "react-router-dom";
import loginService from "../services/login.service";
// Create a context object
const AuthContext = React.createContext();
// Create a custom hook to use the context
export const useAuth = () => {
	return useContext(AuthContext);
};
// Create a provider component
export const AuthProvider = ({ children }) => {
	const [isLogged, setIsLogged] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);
	const [employee, setEmployee] = useState(null);
	// const [isManager, setisManager] = useState(false);
	const [isEmployee, setisEmployee] = useState(false);
	// for sticky header
	const [isSticky, setIsSticky] = useState(false);
	// for mobile size
	const [isMobile, setIsMobile] = useState(window.innerWidth < 961);
	const [csrfToken, setCsrfToken] = useState("");
	const value = {
		isLogged,
		isAdmin,
		// isManager,
		setIsAdmin,
		setIsLogged,
		// setisManager,
		isEmployee,
		employee,
		setisEmployee,
		setEmployee,
		isSticky,
		isMobile,
		setIsMobile,
		csrfToken,
	};

	// generate a csrf token
	const fetchCsrfToken = async () => {
		const result = await loginService.getCsrfToken();
		const token = await result.json();
		// return token
		setCsrfToken(token.csrfToken);
	};

	useEffect(() => {
		// Retrieve the logged in user from local storage
		const loggedInEmployee = getAuth();

		loggedInEmployee.then((response) => {
			const currentTime = Math.floor(Date.now() / 1000);

			if (response.token_life_time > currentTime) {
				setIsLogged(true);
				// 1 is the employee_role for admin
				if (response.employee_role === 1) {
					setIsAdmin(true);
				} else if (response.employee_role === 2) {
					// 	setisManager(true);
					// } else if (response.employee_role === 1) {
					setisEmployee(true);
				}
				setEmployee(response);
			}
		});
		fetchCsrfToken();
	}, []);
// console.log("test token on context:", csrfToken);
	useLayoutEffect(() => {
		const handleScroll = () => {
			const currentScrollPos = window.scrollY;
			const scrollThreshold = isMobile ? 390 : 190; // Change the threshold based on isMobile
			if (currentScrollPos >= scrollThreshold && !isSticky) {
				setIsSticky(true);
			} else if (currentScrollPos < scrollThreshold && isSticky) {
				setIsSticky(false);
			}
		};

		window.addEventListener("scroll", handleScroll);

		const handleResize = () => {
			setIsMobile(window.innerWidth < 768);
		};
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("resize", handleResize);
		};
	}, [isSticky, isMobile]);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
