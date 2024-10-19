import React, { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import loginService from "../../../services/login.service";
import { FaLock, FaUnlock } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../Contexts/AuthContext";

function Resetforgotpassword() {
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();

	// Access the query parameters
	const token = searchParams.get("token");
	const [newPassword, setNewPassword] = useState("");
	const [newPasswordError, setNewPasswordError] = useState("");
	const [serverError, setServerError] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [success, setSuccess] = useState(false);
	const { isSticky, isMobile } = useAuth();
	// show/hide password functionality
	const showHidePassword = () => {
		setShowPassword(!showPassword);
	};

	// Function to handle the form submission
	const handleSubmit = async (e) => {
		e.preventDefault(); // Prevents page refresh on submit

		// New password validation (must be at least 6 characters long)
		if (newPassword.length < 6) {
			setNewPasswordError("New password must be at least 6 characters.");
			return;
		} else {
			setNewPasswordError("");
		}

		// Handle form submission here
		const formData = {
			newPassword,
			token,
		};

		try {
			const response = await loginService.resetforgotPassword(formData);
			const data = await response.json();

			if (response.ok) {
				setSuccess(true);
				setServerError("");
				// Navigate to login page after successful password reset
				setTimeout(() => {
					navigate("/admin");
				}, 3000);
			} else {
				setServerError(data.message);
			}
		} catch (error) {
			setServerError("An error has occurred. Please try again later.");
		}
	};

	return (
		<div className={isSticky ? `under-header-margin` : ""}>
			<section className="login-register-area">
				<div className="container">
					<div className="row">
						<div className="EmployeeTitle">
							<h1>Reset Forgot Password</h1> <br /> <br />
						</div>
						<div className="col-lg-6 col-md-12">
							<div className="form loginForm">
								<div className="sec-title text-left">
									<h3>Enter Your New Password </h3>
									<span className="decor"></span>
								</div>
								<div className="row">
									{success && (
										<div className="success-message">
											Password reset successful!
										</div>
									)}
									<form onSubmit={handleSubmit}>
										<div className="col-md-12">
											<div className="input-field inputBox">
												{newPasswordError && (
													<div className="validation-error">
														{newPasswordError}
													</div>
												)}
												<input
													type={showPassword ? "text" : "password"}
													value={newPassword}
													name="newPassword"
													placeholder="New Password"
													onChange={(event) =>
														setNewPassword(event.target.value)
													}
												/>
												<span onClick={showHidePassword}>
													{showPassword ? (
														<FaUnlock className="icons" />
													) : (
														<FaLock className="icons" />
													)}
												</span>
											</div>
										</div>

										<div className="col-md-12">
											<div className="row">
												<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
													<button className="thm-btn bg-1" type="submit">
														Reset Password
													</button>
												</div>
												<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
													<NavLink className="forgot-password" to="/admin">
														Back to Login
													</NavLink>
												</div>
											</div>
										</div>
										{serverError && (
											<div className="validation-error">{serverError}</div>
										)}
									</form>
								</div>
							</div>
						</div>

						<div className="col-lg-6 col-md-12">
							<div className="form register">
								<div className="sec-title text-left">
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

export default Resetforgotpassword;
