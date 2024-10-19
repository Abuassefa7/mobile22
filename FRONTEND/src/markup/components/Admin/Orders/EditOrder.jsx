import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import backgroundImage from "../../../../assets/images/home/banner/slideimg1.jpg";
import { useAuth } from "../../../../Contexts/AuthContext";
import orderService from "../../../../services/order.service";
import serviceService from "../../../../services/service.service";
import { RiContactsFill } from "react-icons/ri";
import { HiDevicePhoneMobile } from "react-icons/hi2";
function EditOrder() {
	const navigate = useNavigate();
	const { employee } = useAuth();
	const { order_id } = useParams();
	const [order, setOrder] = useState({});
	const [services, setServices] = useState([]);
	const [requestedServices, setRequestedServices] = useState([]);
	const [mergedServices, setMergedServices] = useState([]);
	const [orderData, setOrderData] = useState({
		active_order: "",
		order_total_price: "",
		estimated_completion_date: "",
		completion_date: "",
		order_description: "",
		order_status: "",
		order_services: "",
	});
	const [readyToComplete, setReadyToComplete] = useState(false);
	// error
	const [apiError, setApiError] = useState(false);
	const [apiErrorMessage, setApiErrorMessage] = useState(null);
	const [serverError, setServerError] = useState("");
	const [serverErrorMessage, setServerErrorMessage] = useState(null);
	const [success, setSuccess] = useState(false);
	const [successMessage, setSuccessMessage] = useState(null);
	let token = null;
	if (employee) {
		token = employee.employee_token;
	}
	// fetching single order by order id
	const singleOrderResponse = async () => {
		try {
			const response = await orderService.singleOrder(token, order_id);
			if (response.status === 200) {
				const data = await response.json();
				setOrder(data);
				setOrderData({
					active_order: data?.active_order,
					order_total_price: data?.order_total_price,
					estimated_completion_date: data?.estimated_completion_date,
					completion_date: data?.completion_date,
					order_description: data?.order_description,
					order_status: data?.order_status,
					order_services: data?.order_services,
				});

				await fetchServices(data);
			} else {
				setApiError(true);
				if (response.status === 401) {
					setApiErrorMessage("Please login again");
				} else if (response.status === 403) {
					setApiErrorMessage("You are not authorized to view this page");
				} else {
					setApiErrorMessage("Please try again later");
				}
			}
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		singleOrderResponse();
	}, []);
	// fetch ordered services
	const fetchServices = async (order) => {
		try {
			const serviceIds = order.order_services.map(
				(service) => service.service_id
			);
			const responses = await Promise.all(
				serviceIds.map((serviceId) =>
					serviceService.getSingleService(token, serviceId)
				)
			);
			const servicesData = await Promise.all(
				responses.map((res) => res.json())
			);
			const servicesMap = servicesData.map((service) => {
				return {
					service_id: service.service.service_id,
					service_name: service.service.repair_service_name,
					service_description: service.service.repair_service_description,
					service_completed: order.order_services.filter(
						(item) => service.service.service_id == item.service_id
					)[0].service_completed,
					order_service_id: order.order_services.filter(
						(item) => service.service.service_id == item.service_id
					)[0].order_service_id,
				};
			});
			setRequestedServices(servicesMap);
		} catch (error) {
			console.log(error);
		}
	};
	// handle check box change for order sevices
	const handleCheckboxChange = (service) => {
		const updatedOrderServices = requestedServices.map((item) => {
			if (item.service_id === service.service_id) {
				return {
					...item,
					service_completed: !item.service_completed,
				};
			}
			return item;
		});

		// Update the state with the modified array
		setRequestedServices(updatedOrderServices);
		// setReadyToComplete based on if all service_completed == true
		const allServicesCompleted = updatedOrderServices.every(
			(item) => item.service_completed === true
		);
		setReadyToComplete(allServicesCompleted);
		// Update the orderData with the modified array
		setOrderData((prevOrderData) => ({
			...prevOrderData,
			order_services: updatedOrderServices,
		}));
	};
	// handle submit order
	const handleSubmit = (e) => {
		e.preventDefault();
		//  the logic to update the order using the updatedOrder state
		const updatOrder = orderService.updateOrder(token, order_id, orderData);

		updatOrder
			.then((response) => response.json())
			.then((data) => {
				// If Error is returned from the API server, set the error message
				if (data.error) {
					setServerError(true);
					setServerErrorMessage(data.error);
				} else {
					// Handle successful response
					setSuccess(true);
					setSuccessMessage("Order updated successfully!");
					setServerError(false);
					setServerErrorMessage("");
					// Redirect to the employees page after 2 seconds
					setTimeout(() => {
						navigate("/admin/orders");
					}, 1000);
				}
			});
	};
	// Limiting text size of the service description
	const limitText = (text, limit) => {
		if (text.length > limit) {
			return text.substring(0, limit) + "...";
		} else {
			return text;
		}
	};
	return (
		<>
			<section
				className=" categories-area update-order"
				style={{ backgroundImage: `url(${backgroundImage})` }}
			>
				<div className="">
					<div className="sec-title text-center">
						<h1>Update order</h1>
					</div>
					<div className="row row-correct-margin">
						<div className="col-md-6 col-sm-6 col-xs-12">
							<div className="single-item services">
								<div className="icon-holder">
									<div className="icon-box">
										<div className="icon">
											<span className="userinfo">
												<RiContactsFill
													style={{
														fontSize: "42px",
														backgroundColor: "#43C3EA",
														padding: "5px",
														paddingRight: "10px",
														color: "white",
													}}
												/>{" "}
											</span>
										</div>
									</div>
								</div>
								<div className="text-holder">
									<h5>
										{order.customer_first_name + " " + order.customer_last_name}
									</h5>
									<h6>{order.customer_email}</h6>
									<h6>{order.customer_phone_number}</h6>
								</div>
							</div>
						</div>

						<div className="col-md-6 col-sm-6 col-xs-12">
							<div className="single-item services">
								<div className="icon-holder">
									<div className="icon-box">
										<div className="icon">
											<span className="userinfo">
												<HiDevicePhoneMobile
													style={{
														fontSize: "42px",
														backgroundColor: "#43C3EA",
														padding: "5px",
														paddingRight: "10px",
														color: "white",
													}}
												/>{" "}
											</span>
										</div>
									</div>
								</div>
								<div className="text-holder">
									<h5>{order.device_model}</h5>
									<h6>{order.device_make}</h6>
									<h6>{order.device_type}</h6>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* services */}
				<div className=" selected-service ">
					<div className="left-column ">
						<h6 className="order-text11">Requested Services</h6>
						{requestedServices?.map((service, i) => (
							<div className="  service-item checkbox-holder" key={i}>
								<h5 className="order-text22">{service.service_name}</h5>
								<div className="row   ">
									<div className="col-xs-9 ">
										{limitText(service.service_description, 150)}
									</div>
									<div className="col-xs-3 status-holder">
										<span
											className={`service-status
											${!service.service_completed ? "order-status-inprogress" : "order-status-done"}
										`}
										>
											{service.service_completed ? "Completed " : "InProgress "}
										</span>
										<input
											type="checkbox"
											name={`service_${service.service_id}`}
											id={`service_${service.service_id}`}
											value={service.service_id}
											checked={service.service_completed}
											onChange={() => handleCheckboxChange(service)}
										/>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
				{/* data and price */}
				<div className="auto-container">
					<div className=" clearfix">
						<div className="form-column col-md-6">
							<div className="inner-column">
								<div className="contact-form">
									<form onSubmit={handleSubmit}>
										<div className="row clearfix">
											<div className="form-group col-md-6">
												<label htmlFor="eta">Estimated completion date:</label>
												<input
													className="input-option input-back"
													type="datetime-local"
													name="eta"
													placeholder="ETA"
													value={
														orderData.estimated_completion_date
															? new Date(orderData.estimated_completion_date)
																	.toISOString()
																	.slice(0, 16)
															: ""
													}
													onChange={(event) =>
														setOrderData({
															...orderData,
															estimated_completion_date: new Date(
																event.target.value
															).toISOString(),
														})
													}
													required
												/>
											</div>

											<div className=" col-md-6">
												<label htmlFor="price">Order total price:</label>
												<input
													className="input-option input-back"
													type="text"
													name="price"
													placeholder="Price"
													value={orderData.order_total_price}
													onChange={(event) =>
														setOrderData({
															...orderData,
															order_total_price: event.target.value,
														})
													}
													required
												/>
											</div>
											<div className="form-group col-md-12">
												<label htmlFor="description">Order description:</label>
												<textarea
													className="input-option"
													type="text"
													name="description"
													placeholder="Price"
													value={orderData.order_description}
													onChange={(event) =>
														setOrderData({
															...orderData,
															order_description: event.target.value,
														})
													}
													required
													style={{
														backgroundColor: "#43C3EA",
														padding: "5px",
														paddingRight: "10px",
														color: "white",
														height: "80px",
													}}
												/>
											</div>

											<div className="col-md-12">
												<label htmlFor="description">Order Status:</label>
												<select
													className="input-option input-back"
													id="option-select"
													name="category"
													value={orderData.order_status}
													onChange={(event) =>
														setOrderData({
															...orderData,
															order_status: event.target.value,
															completion_date:
																event.target.value == "Completed"
																	? new Date()
																	: null,
														})
													}
												>
													<option value="Received">Received</option>
													<option value="InProgress">InProgress</option>
													<option value="Completed" disabled={!readyToComplete}>
														Completed
													</option>
												</select>
											</div>
											<div className="form-group col-md-12">
												<input
													type="checkbox"
													name="orderStatus"
													checked={orderData.active_order}
													onChange={(event) =>
														setOrderData({
															...orderData,
															active_order: event.target.checked,
														})
													}
												/>
												<span style={{ marginLeft: "8px" }}>
													Active order ?
												</span>
											</div>
											<div className="form-group col-md-6">
												<button
													className="thm-btn bg-1  special-btn"
													type="submit"
													data-loading-text="Please wait..."
												>
													<span>UPDATE ORDER</span>
												</button>
											</div>
										</div>
										{success && (
											<div className="order-update-success font-weight-bold">
												{successMessage}
											</div>
										)}
										{serverError && (
											<div className="validation-error font-weight-bold">
												{serverErrorMessage}
											</div>
										)}
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export default EditOrder;
