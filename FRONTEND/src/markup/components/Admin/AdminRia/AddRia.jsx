import React, { useState } from "react";
import riaService from "../../../../services/ria.service"; // Assume you have a riaService for handling RIA operations
import { useNavigate } from "react-router-dom";
import { FaWindowClose } from "react-icons/fa";
import { useAuth } from "../../../../Contexts/AuthContext";

function AddRia({ setIsAddOpen, fetchServices }) {
	const navigate = useNavigate();
	const [rateServiceName, setRateServiceName] = useState("");
	const [rateServiceNameError, setRateServiceNameError] = useState("");
	const [rateValue, setRateValue] = useState("");
	const [rateValueError, setRateValueError] = useState("");
	const { employee } = useAuth();
	let token = null;
	// Errors
	const [currencyError, setCurrencyError] = useState("");
	const [transferToError, setTransferToError] = useState("");
	const [validateionError, setValidationError] = useState(false);
	const [success, setSuccess] = useState(false);
	const [serverError, setServerError] = useState("");
	if (employee) {
		token = employee.employee_token;
	}
	const handleChange = (e) => {
		const { name, value } = e.target;
		switch (name) {
			case "rateServiceName":
				setRateServiceName(value);
				break;
			case "rateValue":
				setRateValue(value);
				break;
			default:
				break;
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		let valid = true;

		// Rate validation
		if (!rateServiceName || !rateValue) {
			setValidationError("All fields are required");
			valid = false;
		} else {
			setValidationError("");
		}

		if (!valid) return;

		const formData = {
			rate_service_name: rateServiceName,
			rate_value: rateValue,
		};
		riaService
			.createRiaService(formData, token)
			.then((response) => response.json())
			.then((data) => {
				if (data.error) {
					setServerError(data.error);
				} else {
					setSuccess(true);
					setServerError("");
					setTimeout(() => {
						setIsAddOpen(false);
						fetchServices();
					}, 2000);
				}
			})
			.catch((error) => {
				const resMessage =
					(error.response &&
						error.response.data &&
						error.response.data.message) ||
					error.message ||
					error.toString();
				setServerError(resMessage);
			});
	};

	return (
		<div className="row">
			<div className="col-md-6">
				<div className="product-back ria-add">
					<FaWindowClose
						className="sevice-update-close"
						onClick={() => setIsAddOpen()}
					/>
					<div className="login-register-area white">
						<div className="form">
							<div className="sec-title text-left ">
								<h4 className="col-xs-11">Add New RIA Service</h4>
							</div>

							<form onSubmit={handleSubmit}>
								<div className="col-md-12">
									<div className="input-field">
										<input
											className="input-option"
											type="text"
											name="rateServiceName"
											placeholder="Rate Service Name"
											value={rateServiceName}
											onChange={handleChange}
										/>
										{rateServiceNameError && (
											<div className="validation-error" role="alert">
												{rateServiceNameError}
											</div>
										)}
									</div>
								</div>
								<div className="col-md-12">
									<div className="input-field">
										<input
											type="text"
											name="rateValue"
											placeholder="Rate Value"
											value={rateValue}
											onChange={handleChange}
										/>
										{rateValueError && (
											<div className="validation-error" role="alert">
												{rateValueError}
											</div>
										)}
									</div>
								</div>
								<button type="submit" className="thm-btn bg-1">
									Add RIA Service
								</button>
								{success && (
									<div className="success-message">
										RIA Service added successfully!
									</div>
								)}
								{serverError && (
									<div className="validation-error" role="alert">
										{serverError}
									</div>
								)}
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AddRia;
