import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginService from "../../../services/login.service";
import { FaEnvelope } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../Contexts/AuthContext";

function Forgotpasswordreq() {
	const navigate = useNavigate();
	const [employee_email, setEmail] = useState("");
	const [emailError, setEmailError] = useState("");
	const [serverMessage, setServerMessage] = useState("");
	const [serverError, setServerError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [success, setSuccess] = useState(false);
	const { isSticky, isMobile } = useAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!employee_email) {
			setEmailError("Please provide an email address.");
			return;
		} else {
			setEmailError("");
		}

		setIsSubmitting(true);
		// Handle form submission here
		const formData = {
			employee_email,
		};
		try {
			const response = await loginService.forgotPassword(formData);
			const data = await response.json();

			if (response.ok) {
				setServerMessage(
					"We've sent a password reset link to your email. Please check your inbox."
				);
				setSuccess(true);
				setTimeout(() => {
					setServerMessage("");
					navigate("/admin");
				}, 7000); // Redirect after 3 seconds
			} else {
				setServerMessage(data.message || "Failed to send reset link.");
				setSuccess(false);
			}
		} catch (error) {
			setServerMessage("An error has occurred. Please try again later.");
			setSuccess(false);
		} finally {
			setIsSubmitting(false);
		}
	};
	return (
		<div className={isSticky ? `under-header-margin` : ""}>
			<section className="login-register-area">
				<div className="container">
					<div className="row">
						<div className="EmployeeTitle">
							<h1>Forgot Password</h1> <br /> <br />
						</div>
						<div className="col-lg-6 col-md-12">
							<div className="form loginForm">
								<div className="sec-title text-left">
									<h3>Enter your email address below </h3>
									<span className="decor"></span>
								</div>
								<div className="row">
									{serverMessage && (
										<div
											className={`server-message ${
												success ? "success" : "error"
											}`}
										>
											{serverMessage}
										</div>
									)}
									<form onSubmit={handleSubmit}>
										<div className="col-md-12">
											<div className="input-field inputBox">
												{serverError && (
													<div className="validation-error">{serverError}</div>
												)}
												{emailError && (
													<div className="validation-error" role="alert">
														{emailError}
													</div>
												)}
												<input
													type="email"
													value={employee_email}
													name="employee_email"
													onChange={(event) => setEmail(event.target.value)}
													placeholder="Email Address *"
													disabled={isSubmitting}
												/>
												<FaEnvelope className="icons" />
											</div>
										</div>
										<div className="col-md-12">
											<div className="row">
												<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
													<button
														className="thm-btn bg-1"
														type="submit"
														disabled={isSubmitting}
													>
														{isSubmitting ? "Sending..." : "submit"}
													</button>
												</div>
												<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
													<NavLink className="forgot-password" to="/admin">
														Back to Login
													</NavLink>
												</div>
											</div>
										</div>
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
											LinkTech Wireless offers expert repairs for phones,
											tablets, iPads, laptops, and Macs. Our technicians provide
											quick, reliable fixes to keep your devices running
											smoothly.
										</p>
										<p>
											We also offer phone accessories, mobile SIM solutions, and
											Ria Money Transfers.
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

export default Forgotpasswordreq;
