import React, { useState } from "react";
import serviceService from "../../../../services/service.service";
import { FaWindowClose } from "react-icons/fa";
import { useAuth } from "../../../../Contexts/AuthContext";

function AddService({ toggleNewServiceWindow, fetchServices }) {
	const [success, setSuccess] = useState(false);
	const [apiError, setApiError] = useState(false);
	const [apiErrorMessage, setApiErrorMessage] = useState(null);
	const [serviceData, setServiceData] = useState({
		repair_service_name: "",
		repair_service_description: "",
	});
	const { employee, csrfToken } = useAuth();
	let token = null;
	if (employee) {
		token = employee.employee_token;
	}
	// add service function
	const addNewService = async (e) => {
		e.preventDefault();

		if (
			serviceData.repair_service_name === "" ||
			serviceData.repair_service_description === ""
		) {
			setApiError(true);
			setApiErrorMessage("Please fill all the fields");
			setTimeout(() => {
				setApiError(false);
			}, 1500);
		} else {
			const response = await serviceService.createService(
				serviceData,
				token,
				csrfToken
			);
			if (response.status === 200) {
				setSuccess(true);
				setTimeout(() => {
					toggleNewServiceWindow(false);
					fetchServices(); /* to refech service after adding a new one */
				}, 1500);
			} else {
				setApiError(true);
				setApiErrorMessage("Something went wrong, please try again later");
			}
		}
	};
	// handle input change
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setServiceData({ ...serviceData, [name]: value });
	};

	return (
		<section className="login-register-area new-service ">
			<div className="add-service">
				<div className="row">
					<div className=" col-md-6">
						<div className="form product-back">
							<div className="sec-title text-left row">
								<h1 className="col-xs-10">Add New Service</h1>
								<div className="col-xs-1">
									<FaWindowClose
										className="sevice-update-close"
										onClick={() => toggleNewServiceWindow(false)}
									/>
								</div>
							</div>
							<div className="row">
								{apiError && (
									<div className="validation-error">{apiErrorMessage}</div>
								)}
								<form action="#" onSubmit={addNewService}>
									<div className="col-md-12">
										<div className="input-field">
											<input
												type="text"
												name="repair_service_name"
												placeholder="Service Name *"
												value={serviceData.repair_service_name}
												onChange={handleInputChange}
											/>
										</div>
									</div>
									<div className="col-md-12">
										<div className="input-field">
											<textarea
												type="text"
												name="repair_service_description"
												placeholder="Service Description *"
												className="input-option"
												value={serviceData.repair_service_description}
												onChange={handleInputChange}
											/>
										</div>
									</div>

									<div className="col-md-12">
										<div className="row">
											<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
												<button className="thm-btn bg-1" type="submit">
													Add Service
												</button>
											</div>
										</div>
									</div>
									{success && (
										<h4 className="green">Service Added Successfully!</h4>
									)}
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default AddService;
