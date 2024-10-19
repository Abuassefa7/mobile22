import React, { useEffect, useState } from "react";
import serviceService from "../../../../services/service.service";
import { useNavigate, useParams } from "react-router-dom";
import { FaWindowClose } from "react-icons/fa";
import { useAuth } from "../../../../Contexts/AuthContext";

function ServiceEdit({ service, fetchServices, setSelectedService }) {
	const [success, setSuccess] = useState(false);
	const { employee } = useAuth();
	let token = null;
	const [apiError, setApiError] = useState(false);
	const [apiErrorMessage, setApiErrorMessage] = useState(null);
	const [serviceData, setServiceData] = useState({
		repair_service_name: "",
		repair_service_description: "",
	});
	if (employee) {
		token = employee.employee_token;
	}
	const id = service.service_id;
	const navigate = useNavigate();
	useEffect(() => {
		setServiceData(service);
	}, []);
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setServiceData({ ...serviceData, [name]: value });
	};
	// update service function
	const updateService = async (e) => {
		e.preventDefault();
		// check if the incoming request has sevice data values
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
			try {
				const response = await serviceService.updateService(
					id,
					serviceData,
					token
				);
				const serviceResult = await response.json();
				setSuccess(true);
				setApiError(false);
				setApiErrorMessage(null);
				setTimeout(() => {
					setSelectedService("");
					fetchServices();
				}, 2000);
			} catch (error) {
				setApiError(true);
				setApiErrorMessage(error.message);
			}
		}
	};
	return (
		<section className="login-register-area new-service update-service">
			<div className="">
				<div className="row">
					<div className=" col-md-6 ">
						<div className="form product-back ">
							<div className="sec-title text-left row">
								<h1 className="col-xs-9 col-sm-10">Update Service</h1>
								<div className="col-xs-1">
									<FaWindowClose
										className="sevice-update-close"
										onClick={() => setSelectedService("")}
									/>
								</div>
							</div>
							<div className="row ">
								{apiError && (
									<div className="validation-error">{apiErrorMessage}</div>
								)}
								<form action="#" onSubmit={updateService} className="">
									<div className="col-md-12 ">
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
											<div className=" col-xs-12">
												<button className="thm-btn bg-1" type="submit">
													Update Service
												</button>
											</div>
										</div>
									</div>
									{success && (
										<h4 className="green">Service Updated Successfully!</h4>
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

export default ServiceEdit;
