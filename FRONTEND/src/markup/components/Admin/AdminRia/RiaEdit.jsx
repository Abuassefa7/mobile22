import React, { useEffect, useState } from "react";
import riaService from "../../../../services/ria.service";
import { FaWindowClose } from "react-icons/fa";
import { useAuth } from "../../../../Contexts/AuthContext";

function RiaEdit({ fetchServices, singleService, setIsEditOpen }) {
	const [success, setSuccess] = useState(false);
	const [apiError, setApiError] = useState(false);
	const { employee } = useAuth();
	let token = null;
	const [apiErrorMessage, setApiErrorMessage] = useState(null);
	const [riaData, setRiaData] = useState({
		rate_service_name: "",
		rate_value: "",
	});
	// const id = ria.ria_id;
	if (employee) {
		token = employee.employee_token;
	}
	useEffect(() => {
		setRiaData(singleService);
	}, []);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setRiaData({ ...riaData, [name]: value });
	};

	const updateRiaService = async (e) => {
		e.preventDefault();
		if (riaData.rate_service_name === "" || riaData.rate_value === "") {
			setApiError(true);
			setApiErrorMessage("Please fill all the fields");
			setTimeout(() => {
				setApiError(false);
			}, 1500);
		} else {
			try {
				const response = await riaService.updateRiaService(
					singleService.rate_service_id,
					riaData,
					token
				);
				const riaResult = await response.json();
				setSuccess(true);
				setApiError(false);
				setApiErrorMessage(null);
				setTimeout(() => {
					// setSelectedRia("");
					// fetchRiaServices();
					setIsEditOpen(false);
					fetchServices();
				}, 2000);
			} catch (error) {
				
				setApiError(true);
				setApiErrorMessage(error.message);
			}
		}
	};

	return (
		<section className="login-register-area new-ria update-ria">
			<div className="">
				<div className="row">
					<div className="col-md-6">
						<div className="form product-back">
							<div className="sec-title text-left row">
								<h1 className="col-xs-11">Update RIA Service</h1>
								<div className="">
									<FaWindowClose
										className="sevice-update-close"
										onClick={() => setIsEditOpen(false)}
									/>
								</div>
							</div>
							<div className="row">
								{apiError && (
									<div className="validation-error">{apiErrorMessage}</div>
								)}
								<form action="#" onSubmit={updateRiaService} className="">
									<div className="col-md-12">
										<div className="input-field">
											<input
												type="text"
												name="rate_service_name"
												placeholder="Currency *"
												value={riaData.rate_service_name}
												onChange={handleInputChange}
											/>
										</div>
									</div>

									<div className="col-md-12">
										<div className="input-field">
											<input
												type="text"
												name="rate_value"
												placeholder="Rate *"
												value={riaData.rate_value}
												onChange={handleInputChange}
											/>
										</div>
									</div>

									<div className="col-md-12">
										<div className="row">
											<div className="col-xs-12">
												<button className="thm-btn bg-1" type="submit">
													Update RIA Service
												</button>
											</div>
										</div>
									</div>
									{success && (
										<h4 className="green">RIA Service Updated Successfully!</h4>
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

export default RiaEdit;
