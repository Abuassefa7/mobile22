import React, { useEffect, useState } from "react";
import deviceService from "../../../../services/device.service";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../../Contexts/AuthContext";

function AddDeviceForm({ customerId, toggle, onAddDevice }) {
	const { isLogged, isAdmin, employee } = useAuth();
	const [device_make, setDeviceMake] = useState("");
	const [device_model, setDeviceModel] = useState("");
	const [device_type, setDeviceType] = useState("");
	const [device_serial_number, setDeviceSerial] = useState("");
	const [device_color, setDeviceColor] = useState("");

	const { customer_id } = useParams();
	const [Error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [serverError, setServerError] = useState("");

	let token = null;
	if (employee) {
		token = employee.employee_token;
	}
	// Determine the customer ID to use
	const customerIdToUse = customerId ? customerId : customer_id;

	const handleSubmit = (e) => {
		e.preventDefault();
		// Handle client side validations
		let valid = true; // Flag

		if (!device_make || !device_model || !device_type || !device_color) {
			setError("All fields required");
			valid = false;
		} else {
			setError("");
		}
		// If the form is not valid, do not submit
		if (!valid) {
			return;
		}

		const formData = {
			customer_id: customerIdToUse,
			device_make,
			device_model,
			device_type,
			device_serial_number,
			device_color,
		};
		console.log(formData);
		// Pass the form data to the service
		const newDevice = deviceService.createDevice(token, formData);
		newDevice
			.then((response) => response.json())
			.then((data) => {
				// // If Error is returned from the API server, set the error message
				if (data.error) {
					setServerError(data.error);
				} else {
					// Handle successful response
					setSuccess("Device added successfully");
					setServerError("");

					// Redirect to the add device  page after 2 seconds
					//  just redirect to the customer detail page
					setTimeout(() => {
						onAddDevice();
						toggle();
					}, 1000);
				}
			})
			// Handle Catch
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
		<>
			<section className="contact-section customer">
				<div className="auto-container">
					<div className="admin-title">
						<h3>Add New Device</h3> <br />
					</div>
					<div className="product-back deviceBg">
						<div className="login-register-area white">
							<div className="">
								<div className="row">
									<div className="col-md-12">
										<div className="form formbg">
											<form onSubmit={handleSubmit}>
												<div className="col-lg-12 col-md-12">
													<div className="input-field additional">
														<input
															type="text"
															name="device_make"
															value={device_make}
															onChange={(event) =>
																setDeviceMake(event.target.value)
															}
															placeholder="Device Make"
														/>
													</div>
													<div className="input-field">
														<input
															type="text"
															name="device_model"
															value={device_model}
															onChange={(event) =>
																setDeviceModel(event.target.value)
															}
															placeholder="Device Model"
														/>
													</div>
													<div className="input-field">
														<select
															className="input-option "
															name="device_type"
															value={device_type}
															onChange={(event) =>
																setDeviceType(event.target.value)
															}
														>
															<option value="">Select Device Type</option>
															<option value="Phone">Phone</option>
															<option value="Tablet">Tablet</option>
															<option value="Laptop">Laptop</option>
														</select>
													</div>
													<div className="input-field">
														<input
															type="text"
															name="device_serial"
															value={device_serial_number}
															onChange={(event) =>
																setDeviceSerial(event.target.value)
															}
															placeholder="Device Serial"
														/>
													</div>
													<div className="input-field">
														<input
															type="text"
															name="device_color"
															value={device_color}
															onChange={(event) =>
																setDeviceColor(event.target.value)
															}
															placeholder="Device Color"
														/>
													</div>
													{Error && (
														<div className="validation-error" role="alert">
															{Error}
														</div>
													)}
													{success && (
														<div className="success-message" role="alert">
															{success}
														</div>
													)}

													<div className="form-group col-md-12">
														<button
															className="theme-btn btn-style-one leftMargin"
															type="submit"
															data-loading-text="Please wait..."
														>
															<span>Add Device</span>
														</button>
													</div>
												</div>
											</form>
											{serverError && (
												<p className="error validation-error">{serverError}</p>
											)}
											{/* {success && <p className="success success-message">Device Add Successful!</p>} */}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export default AddDeviceForm;
