import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import loginService from "../../../services/login.service";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaUnlock } from "react-icons/fa";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useAuth } from "../../../Contexts/AuthContext";

function Login() {
	const location = useLocation();
	const navigate = useNavigate();
	const [employee_username, setUsername] = useState("");
	const [employee_password, setPassword] = useState("");
	const [usernameError, setUsernameError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [serverError, setServerError] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const { isSticky, isMobile } = useAuth();
	// show/hide passowrd functionaity
	const showHidePassword = () => {
		setShowPassword(!showPassword);
	};

	// Function to handle the form submission
	const handleSubmit = async (e) => {
		e.preventDefault(); // Prevents page refresh on submit

		// Handle client-side validation
		let valid = true;

		// Username validation
		if (!employee_username) {
			setUsernameError("Please provide a username.");
			valid = false;
		} else {
			setUsernameError("");
		}
		// Password validation (must be at least 6 characters long)
		if (employee_password.length < 6) {
			setPasswordError("Password must be at least 6 characters.");
			valid = false;
		} else {
			setPasswordError("");
		}

		// If the form is not valid, do not submit
		if (!valid) {
			return;
		}

		// Handle form submission here
		const formData = {
			employee_username,
			employee_password,
		};
		// Call the service
		const loginEmployee = loginService.logIn(formData);
		loginEmployee
			.then((response) => response.json())
			.then((response) => {
				// If an error is returned from the API server, set the error message
				if (response.success) {
					// Save the user in local storage
					if (response.data.employee_token) {
						localStorage.setItem("employee", JSON.stringify(response.data));
					}
					setIsLoading(true);
					// Simulate login process
					setTimeout(() => {
						setIsLoading(false);
						// Redirect to protected page or do other post-login actions
						// Navigate to Dashboard
						window.location.reload();
					}, 2000);
				} else {
					// Show an error message
					setServerError(response.message);
				}
			})
			.catch((err) => {
				
				setServerError("An error has occurred. Please try again later");
			});
	};
	return (
		<div className={isSticky ? `under-header-margin` : ""}>
			<section className="login-register-area">
				<div className="container">
					<div className="row">
						<div className="EmployeeTitle">
							<h1>Employee Login</h1> <br /> <br />
						</div>
						<div className="col-lg-6 col-md-12">
							<div className="form loginForm">
								<div className="sec-title text-left">
									<h2>Login </h2>
									<span className="decor"></span>
								</div>
								<div className="row">
									<form onSubmit={handleSubmit}>
										<div className="col-md-12">
											<div className="input-field inputBox">
												{serverError && (
													<div className="validation-error">{serverError} </div>
												)}

												<input
													type="text"
													value={employee_username}
													name="employee_username"
													onChange={(event) => setUsername(event.target.value)}
													placeholder="User Name *"
												/>
												<FaUser className="icons" />
												{usernameError && (
													<div className="validation-error" role="alert">
														{usernameError}
													</div>
												)}
											</div>
										</div>

										<div className="col-md-12">
											<div className="input-field inputBox">
												<input
													type={showPassword ? "text" : "password"}
													value={employee_password}
													name="employee_password"
													placeholder="Enter Password"
													onChange={(event) => setPassword(event.target.value)}
												/>
												<span onClick={showHidePassword}>
													{showPassword ? (
														<FaUnlock className="icons" />
													) : (
														<FaLock className="icons" />
													)}
												</span>
												{passwordError && (
													<div
														className="validation-error"
														style={{ color: "red", fontSize: "0.8rem" }}
													>
														{passwordError}
													</div>
												)}
											</div>
										</div>
										<div className="col-md-12">
											<div className="row">
												<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
													<button className="thm-btn bg-1" type="submit">
														Login
													</button>
												</div>
												<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
													<NavLink
														className="forgot-password"
														to="/resetpassword"
													>
														Reset Password?
													</NavLink>
													<NavLink
														className="forgot-password"
														to="/forgot-password"
													>
														Forgot Password?
													</NavLink>
												</div>
											</div>
										</div>
									</form>
									{isLoading && <LoadingSpinner />}
								</div>
							</div>
						</div>

						<div className="col-lg-6 col-md-12">
							<div className="form register">
								<div className="sec-title text-left">
									<br />
									<h4 className="about">About</h4>
								</div>
								<div className="sec-title text-left">
									<h3>LinkTech Wireless</h3>
									<span className="decor"></span>
								</div>
								<div className="row">
									<div className="col-md-12">
										<p>
											At LinkTech Wireless Store, we provide expert repairs for
											phones, tablets, iPads, laptops, and Macs. Our technicians
											ensure quick, reliable fixes to keep your devices running
											smoothly.
										</p>
										<p>
											We also offer phone accessories, mobile SIM solutions, and
											seamless Ria Money Transfers. Trust LinkTech for all your
											tech and financial needs!
										</p>
									</div>

									<div className="col-md-12">
										<div className="row">
											<div className="col-lg-5 col-md-3 col-sm-4 col-xs-12">
												<button className="thm-btn bg-1" type="submit">
													Contact us
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

export default Login;
