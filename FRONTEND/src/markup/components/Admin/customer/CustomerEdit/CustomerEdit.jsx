import React, { useState, useEffect } from "react";
import { useAuth } from "../../../../../Contexts/AuthContext";
import customerServices from "../../../../../services/customer.service";
import { useNavigate, useParams } from "react-router-dom";

function CustomerEdit() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [getCustomer, setgetCustomer] = useState({});
	const [customerValue, setCustomerValue] = useState({
		customer_first_name: "",
		customer_last_name: "",
		customer_phone_number: "",
		active_customer_status: "",
		customer_email: "",
	});

	const [apiError, setApiError] = useState(false);
	const [apiErrorMessage, setApiErrorMessage] = useState(null);
	const [serverError, setServerError] = useState("");
	const [success, setSuccess] = useState(false);
	const [updateSuccess, setUpdateSuccess] = useState(false);

	let loggedInEmployeeToken = "";

	const { employee } = useAuth();
	if (employee) {
		loggedInEmployeeToken = employee.employee_token;
	}

	const handleInputChange = (e) => {
		const { name, value, type, checked } = e.target;
		if (type === "checkbox") {
			setCustomerValue((prevCustomer) => ({
				...prevCustomer,
				[name]: checked ? 1 : 0,
			}));
		} else {
			setCustomerValue((prevCustomer) => ({
				...prevCustomer,
				[name]: value,
			}));
		}
	};

	useEffect(() => {
		const singleCustomer = customerServices.getCustomer(
			loggedInEmployeeToken,
			id
		);

		singleCustomer
			.then((response) => response.json())
			.then((data) => {
				if (data) {
					setgetCustomer(data);
					setCustomerValue({
						customer_phone_number: data.customer_phone_number || "",
						customer_first_name: data.customer_first_name || "",
						customer_last_name: data.customer_last_name || "",
						active_customer_status: data.active_customer_status,
					});
				} else {
					console.error("Invalid data structure:", data);
				}
			})
			.catch((err) => {
				console.error("Error fetching customer data:", err);
			});
	}, [id, loggedInEmployeeToken]);

	const handleSubmit = (e) => {
		e.preventDefault();

		const updateCustomer = customerServices.updateCustomer(
			id,
			customerValue,
			loggedInEmployeeToken
		);

		updateCustomer
			.then((response) => response.json())
			.then((data) => {
				if (data.error) {
					setServerError(data.error);
				} else {
					setSuccess(true);
					setUpdateSuccess(true);
					setServerError("");

					setTimeout(() => {
						navigate("/admin/customers");
					}, 2000);
				}
			});
	};

	return (
		<section className="contact-section">
			<div className="auto-container">
				<div className="admin-title">
					<h1>Customer Update</h1> <br /> <br />
				</div>
				<div className="product-back">
					<div className="contact-title">
						<h2>Edit: {getCustomer?.customer_first_name} </h2>
						<h5 className="Email">
							Customer email: {getCustomer?.customer_email}{" "}
						</h5>
					</div>
					<div className="login-register-area white">
						<div className="">
							<div className="row">
								<div className="col-md-12">
									<div className="form">
										<form onSubmit={handleSubmit}>
											<div className="col-md-12">
												<div className="input-field">
													<label htmlFor=""> First Name</label>
													<input
														type="text"
														name="customer_first_name"
														value={customerValue.customer_first_name}
														onChange={(event) =>
															setCustomerValue({
																...customerValue,
																customer_first_name: event.target.value,
															})
														}
														placeholder="First name"
													/>
												</div>
											</div>
											<div className="col-md-12">
												<div className="input-field">
													<label htmlFor=""> Last Name</label>
													<input
														type="text"
														name="customer_last_name"
														value={customerValue.customer_last_name}
														onChange={(event) =>
															setCustomerValue({
																...customerValue,
																customer_last_name: event.target.value,
															})
														}
														placeholder="Last name"
													/>
												</div>
											</div>

											<div className="col-md-12">
												<div className="input-field">
													<label htmlFor=""> Phone Number</label>
													<input
														type="text"
														name="customer_phone_number"
														value={customerValue.customer_phone_number}
														onChange={(event) =>
															setCustomerValue({
																...customerValue,
																customer_phone_number: event.target.value,
															})
														}
														placeholder="Phone number"
													/>
												</div>
											</div>
											<div className="form-group col-md-12">
												<input
													type="checkbox"
													name="employeeStatus"
													checked={customerValue.active_customer_status}
													onChange={(event) =>
														setCustomerValue({
															...customerValue,

															active_customer_status:
																event.target.checked === true ? 1 : 0,
														})
													}
												/>
												<span style={{ marginLeft: "8px" }}>
													is active customer
												</span>
											</div>
											<button type="submit" className="thm-btn bg-1">
												UPDATE
											</button>
											{updateSuccess && (
												<div className="success-message">
													Data updated successfully!
												</div>
											)}
											{/* </div> */}
										</form>
										{serverError && <p className="error">{serverError}</p>}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default CustomerEdit;
