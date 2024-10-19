import React, { useEffect, useState } from "react";
import additionalService from "../../../../services/additionalServices.service";
import { useNavigate, useParams } from "react-router-dom";
import { FaWindowClose } from "react-icons/fa";
import { useAuth } from "../../../../Contexts/AuthContext";
function EditBasement({
	service,
	fetchServices,
	setSelectedService,
	setServiceperPage,
}) {
	const [success, setSuccess] = useState(false);
	const [apiError, setApiError] = useState(false);
	const [apiErrorMessage, setApiErrorMessage] = useState(null);
	const { employee } = useAuth();
	let token = null;
	const [serviceData, setServiceData] = useState({
		rent_service_name: "",
		owner_phonenumber: "",
		rent_service_description: "",
		rent_status: "",
	});
	const id = service.rent_service_id;
	const navigate = useNavigate();
	// using useEffect hook fetch services when component loads

	if (employee) {
		token = employee.employee_token;
	}
	useEffect(() => {
		setServiceData(service);
	}, []);
	
	// handle input change
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setServiceData({ ...serviceData, [name]: value });
	};
	// update service function
	const updateService = async (e) => {
		e.preventDefault();
		// check if the incoming request has sevice data values
		if (
			serviceData.rent_service_name === "" ||
			serviceData.owner_phonenumber === "" ||
			serviceData.rent_service_description === "" ||
			serviceData.rent_status === ""
		) {
			setApiError(true);
			setApiErrorMessage("Please fill all the fields");
			setTimeout(() => {
				setApiError(false);
			}, 1500);
		} else {
			try {
				const response = await additionalService.updateRentService(
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
					setServiceperPage(6);
					navigate("/admin/rent");
				}, 2000);
			} catch (error) {
				console.log(error);
				setApiError(true);
				setApiErrorMessage(error.message);
			}
		}
	};
	return (
		<section className="login-register-area new-service update-service ">
			<div className="">
				<div className="row">
					<div className=" col-md-8">
						<div className="form product-back ">
							<div className="sec-title text-left row">
								<h1 className="col-xs-11">Update Rent Service</h1>
								<div className="col-xs-1">
									<FaWindowClose
										className="sevice-update-close"
										onClick={() => {
											setSelectedService(null);
											setServiceperPage(6);
										}}
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
												name="rent_service_name"
												placeholder="Room Type *"
												value={serviceData.rent_service_name}
												onChange={handleInputChange}
											/>
										</div>
									</div>
									<div className="col-md-12 ">
										<div className="input-field">
											<input
												type="text"
												name="owner_phonenumber"
												placeholder="owner phonenumber *"
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
												placeholder="Room Description *"
												className="input-option"
												value={serviceData.rent_service_description}
												onChange={handleInputChange}
											/>
										</div>
									</div>
									<div className="col-md-12 ">
										<select
											className="input-option "
											id="option-select"
											name="rent_status"
											value={serviceData.rent_status}
											onChange={(event) =>
												setServiceData({
													...serviceData,
													rent_status: event.target.value,
													completion_date:
														event.target.value == "Vailable" ? 0 : 1,
												})
											}
										>
											<option value="1">Not Available</option>
											<option value="0">Available</option>
										</select>
										{/* <input
												type="text"
												name="rent_status"
												placeholder="Rent status *"
												value={serviceData.rent_status}
												onChange={handleInputChange}
											/> */}
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

export default EditBasement;
