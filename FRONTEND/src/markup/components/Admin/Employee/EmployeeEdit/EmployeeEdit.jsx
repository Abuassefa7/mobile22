import React, { useState, useEffect } from "react";
import employeeService from "../../../../../services/employee.service";
import { useAuth } from "../../../../../Contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

function EmployeeEdit() {
	const { id } = useParams();

	const navigate = useNavigate();
	const [getEmployee, setGetEmployee] = useState({});
	const [employeeValue, setEmployeeValue] = useState({
		employee_first_name: "",
		employee_last_name: "",
		employee_phone: "",
		company_role_id: "",
		employee_active_status: "",
	});

	const [apiError, setApiError] = useState(false);
	const [apiErrorMessage, setApiErrorMessage] = useState(null);
	const [serverError, setServerError] = useState("");
	const [success, setSuccess] = useState(false);
	const [updateSuccess, setUpdateSuccess] = useState(false);

	let loggedInEmployeeToken = "";
	const { employee } = useAuth();
	if (employee && employee.employee_token) {
		loggedInEmployeeToken = employee.employee_token;
	}

	useEffect(() => {
		const singleEmployee = employeeService.getEmployee(
			id,
			loggedInEmployeeToken
		);

		singleEmployee
			.then((res) => {
				if (!res.ok) {
					console.log(res.status);
					setApiError(true);
					if (res.status === 401) {
						setApiErrorMessage("Please login again");
					} else if (res.status === 403) {
						setApiErrorMessage("You are not authorized to view this page");
					} else {
						setApiErrorMessage("Please try again later");
					}
				}
				return res.json();
			})
			.then((data) => {
				if (data.length !== 0) {
					setGetEmployee(data);
					setEmployeeValue({
						employee_first_name: data?.employee_first_name || "",
						employee_last_name: data?.employee_last_name || "",
						employee_phone: data?.employee_phone || "",
						company_role_id: data?.company_role_id || "",

						employee_active_status: data?.employee_active_status || 0,
					});
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	const handleSubmit = (e) => {
		e.preventDefault();
		const updateEmployee = employeeService.updateEmployee(
			id,
			employeeValue,
			loggedInEmployeeToken
		);
		updateEmployee
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				if (data.error) {
					setServerError(data.error);
				} else {
					setSuccess(true);
					setUpdateSuccess(true);
					setServerError("");
					setTimeout(() => {
						navigate("/admin/employees");
					}, 2000);
				}
			});
	};

	return (
		<section className="contact-section">
			<div className="auto-container">
				<div className="admin-title">
					<h1>Employee Update</h1> <br /> <br />
				</div>
				<div className="product-back">
					<div className="contact-title">
						<h2>Edit: {getEmployee?.employee_first_name} </h2>
						<h5 className="Email">
							Employee email: {getEmployee?.employee_email}{" "}
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
														name="employee_first_name"
														value={employeeValue.employee_first_name}
														onChange={(event) =>
															setEmployeeValue({
																...employeeValue,
																employee_first_name: event.target.value,
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
														name="employee_last_name"
														value={employeeValue.employee_last_name}
														onChange={(event) =>
															setEmployeeValue({
																...employeeValue,
																employee_last_name: event.target.value,
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
														name="employee_phone"
														value={employeeValue.employee_phone}
														onChange={(event) =>
															setEmployeeValue({
																...employeeValue,
																employee_phone: event.target.value,
															})
														}
														placeholder="Phone number"
													/>
												</div>
											</div>

											<div className="col-md-12">
												<div className="input-field">
													<select
														className="input-option"
														name="company_role_id"
														value={employeeValue.company_role_id}
														onChange={(event) =>
															setEmployeeValue({
																...employeeValue,
																company_role_id: event.target.value,
															})
														}
													>
														<option value="">--Employee Role---</option>
														<option value="1">Admin</option>
														<option value="2">Employee</option>
													</select>
												</div>
												<div className="form-group col-md-12">
													<input
														type="checkbox"
														name="employeeStatus"
														checked={employeeValue.employee_active_status}
														onChange={(event) =>
															setEmployeeValue({
																...employeeValue,

																employee_active_status:
																	event.target.checked === true ? 1 : 0,
															})
														}
													/>
													<span style={{ marginLeft: "8px" }}>
														is active employee
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
											</div>
										</form>
										{serverError && <p className="error">{serverError}</p>}
										{/* {success && <p className="success">Update Successful!</p>} */}
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

export default EmployeeEdit;
