import React, { useState } from "react";
import additionalService from "../../../../services/additionalServices.service";
import { FaWindowClose } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../Contexts/AuthContext";
function AddBasement({ toggleNewServiceWindow, fetchServices }) {
	const [success, setSuccess] = useState(false);
	const [apiError, setApiError] = useState(false);
	const { employee } = useAuth();
	let token = null;
	const [apiErrorMessage, setApiErrorMessage] = useState(null);
	const [serviceData, setServiceData] = useState({
		rent_service_name: "",
		owner_phonenumber: "",
		rent_service_description: "",
	});
	const navigate = useNavigate();
	
	if (employee) {
		token = employee.employee_token;
	}
	// add service function
	const addNewService = async (e) => {
		e.preventDefault();

		// collect the data from the body
		// check if the incoming request has service data values
		if (
			serviceData.rent_service_name === "" ||
			serviceData.owner_phonenumber === "" ||
			serviceData.rent_service_description === ""
		) {
			setApiError(true);
			setApiErrorMessage("Please fill all the fields");
			setTimeout(() => {
				setApiError(false);
			}, 1500);
		} else {
			// send the data to the backend
			try {
				const response = await additionalService.createRentService(serviceData,token);
				if (response.status === 200) {
					setSuccess(true);
					setTimeout(() => {
						toggleNewServiceWindow(false);
						fetchServices();
						navigate("/admin/rent");
						/* to refech service after adding a new one */
					}, 1500);
				} else if (response.status === 400) {
					const message  = await response.json();
					setApiError(true);
					setApiErrorMessage(message.error);
				} else {
					setApiError(true);
					setApiErrorMessage("Something went wrong, please try again later.");
				}
			} catch (error) {
				setApiError(true);
				setApiErrorMessage("Something went wrong, please try again later.");
				console.error("Error creating rent service:", error);
			}
		}

	};

	// handle input change
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setServiceData({ ...serviceData, [name]: value });
	};

	return (
		<section className="login-register-area new-service addBasment">
			<div className="">
				<div className="row">
					<div className=" col-md-8">
						<div className="form rent-back">
							<div className="sec-title text-left row">
								<h1 className="col-xs-10">Add New House</h1>
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
												name="rent_service_name"
												placeholder="Room Type *"
												value={serviceData.rent_service_name}
												onChange={handleInputChange}
											/>
										</div>
									</div>
									<div className="col-md-12">
										<div className="input-field">
											<input
												type="text"
												name="owner_phonenumber"
												placeholder="Owner Phone number *"
												value={serviceData.owner_phonenumber}
												onChange={handleInputChange}
											/>
										</div>
									</div>
									<div className="col-md-12">
										<div className="input-field">
											<textarea
												type="text"
												name="rent_service_description"
												placeholder="Description about the room*"
												className="input-option"
												value={serviceData.rent_service_description}
												onChange={handleInputChange}
											/>
										</div>
									</div>

									<div className="col-md-12">
										<div className="row">
											<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
												<button className="thm-btn bg-1" type="submit">
													Add Basement
												</button>
											</div>
										</div>
									</div>
									{success && (
										<h4 className="green">Besment Added Successfully!</h4>
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

export default AddBasement;
