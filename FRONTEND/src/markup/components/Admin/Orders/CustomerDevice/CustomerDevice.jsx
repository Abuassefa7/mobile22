import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FaHandPointer } from "react-icons/fa";
import { FaEdit, FaWindowClose } from "react-icons/fa";
import { RiContactsFill } from "react-icons/ri";
import { MdOutlinePhonelinkSetup } from "react-icons/md";
import { TbDeviceMobileQuestion } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import serviceService from "../../../../../services/service.service";
import { useAuth } from "../../../../../Contexts/AuthContext";
import orderService from "../../../../../services/order.service";
import AddDeviceForm from "../../AddDeviceForm/AddDeviceForm";
import deviceService from "../../../../../services/device.service";
// for ETA date picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CustomerDevice({ customer, devices }) {
	const navigate = useNavigate();
	const { isLogged, isAdmin, employee } = useAuth();
	const [isCustomerSelected, setIsCustomerSelected] = useState(true);
	const [isDeviceSelected, setIsDeviceSelected] = useState(false);
	const [selectedDevice, setSelectedDevice] = useState({});
	const [services, setServices] = useState([]);
	const [customerDevices, setCustomerDevices] = useState(devices);
	// get values form the form

	const [totalPrice, setTotalPrice] = useState("");
	const [orderDescription, setOrderDescription] = useState("");
	const [selectedServices, setSelectedServices] = useState([]);
	// checking mobile size
	const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
	// for date picker ETA
	const [selectedDate, setSelectedDate] = useState(null);
	// Errors
	const [success, setSuccess] = useState(false);
	const [serverError, setServerError] = useState("");
	// pagination
	const [currentPage, setCurrentPage] = useState(1);
	const servicesPerPage = 4;
	// add new device
	const [showAddVehicleForm, setShowAddVehicleForm] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768);
		};

		window.addEventListener("resize", handleResize);
		// handleResize();

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	// close button functionality
	const closeInfo = () => {
		setIsCustomerSelected(false);
		window.location.reload();
	};

	// choose device function
	const chooseDevice = (customer, device) => {
		setIsDeviceSelected(true);
		setSelectedDevice(device);
	};

	let token = null;
	if (employee) {
		token = employee.employee_token;
	}

	// toggling add  vehicle form
	const handleToggleAddVehicleForm = () => {
		setShowAddVehicleForm(!showAddVehicleForm);
		console.log("object");
	};

	const handleAddDevice = () => {};
	// Fetch device by customer_id
	const fetchDevicebyCustomerid = () => {
		if (token) {
			deviceService
				.getDevicesPerCustomer(token, customer.customer_id)
				.then((res) => res.json())
				.then((response) => {
					console.log(response);
					setCustomerDevices(response);
					// setCustomerDevices((prevDevices) => [...prevDevices,response]);
				})
				.catch((error) => {
					console.error("Error fetching device:", error);
				});
		}
	};
	useEffect(() => {
		fetchDevicebyCustomerid();
	}, [token, devices]);
	// a function to fetch services
	useEffect(() => {
		const services = async () => {
			const response = await serviceService.getAllServices(token);
			const jsonResponse = await response.json();

			setServices(jsonResponse.services);
		};
		services();
	}, []);

	// pagination
	// Calculate the index of the first service on the current page
	const indexOfFirstProduct = (currentPage - 1) * servicesPerPage;
	// Calculate the index of the last product on the current page
	const indexOfLastProduct = Math.min(
		currentPage * servicesPerPage,
		services?.length
	);
	// Get the products for the current page
	const currentServices = services.slice(
		indexOfFirstProduct,
		indexOfLastProduct
	);
	// Calculate the total number of pages
	const totalPages = Math.ceil(services.length / servicesPerPage);

	const handlePageChange = (event, pageNumber) => {
		event.preventDefault();
		if (pageNumber >= 1 && pageNumber <= totalPages) {
			setCurrentPage(pageNumber);
		}
	};

	const handleNextPage = (event) => {
		event.preventDefault();
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	const handlePrevPage = (event) => {
		event.preventDefault();
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	// set order total price
	const handleTotalPrice = (e) => {
		setTotalPrice(e.target.value);
	};
	// set order total price
	const handleOrderDescription = (e) => {
		setOrderDescription(e.target.value);
	};
	// handle check box values
	const handleCheckboxChange = (serviceId) => {
		setSelectedServices((prevSelectedServices) => {
			// Check if the service is already selected
			const isServiceSelected = prevSelectedServices.includes(serviceId);

			if (isServiceSelected) {
				// If the service is already selected, remove it from the selected services
				return prevSelectedServices.filter((id) => id !== serviceId);
			} else {
				// If the service is not selected, add it to the selected services
				return [...prevSelectedServices, serviceId];
			}
		});
	};
	const formatSelectedServices = () => {
		return selectedServices.map((serviceId) => ({
			service_id: serviceId,
		}));
	};

	// handle submit order
	const handleSubmitOrder = (event) => {
		event.preventDefault();

		const employee_id = employee.employee_id;
		const customer_id = customer.customer_id;
		const device_id = selectedDevice.device_id;

		const orderServices = formatSelectedServices();

		const formData = {
			employee_id: employee_id,
			customer_id: customer_id,
			device_id: device_id,
			order_description: orderDescription,
			estimated_completion_date: selectedDate,
			order_total_price: totalPrice,
			// additional_request: additionalRequest,
			notes_for_customer: "Customer prefers contact by email",
			order_services: orderServices,
		};
		// call the orderService.addOrder method form order servie
		const addOrder = orderService.addOrder(token, formData);
		addOrder
			.then((response) => response.json())
			.then((data) => {
				// If Error is returned from the API server, set the error message
				if (data.error) {
					setServerError(data.error);
				} else {
					// Handle successful response
					setSuccess(true);
					setServerError("");
					// Redirect to the employees page after 2 seconds
					// For now, just redirect to the home page
					setTimeout(() => {
						// window.location.href = '/admin/employees';
						navigate("/admin/orders");
					}, 3000);
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
			{isCustomerSelected && (
				<div className="customerprofile">
					<section className="categories-area categories-areaupdate">
						<div className="row top">
							<div className="col-md-6 col-sm-6 col-xs-12">
								<div className="single-item singleitemEdit customerinfo">
									<div className="icon-holder">
										<div className="icon-box">
											<div className="icon">
												{/* <span className="flaticon-apple-logo"></span> */}
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
										<h4 className="order-text1">
											Customer:{" "}
											{customer?.customer_first_name +
												" " +
												customer?.customer_last_name}
										</h4>
										<p></p>
										<span className="order-text2">Email</span>:
										{customer?.customer_email} <br />
										<span className="order-text2">Phone</span>:
										{customer?.customer_phone_number} <br />
										<span className="order-text2">Active Customer</span>:
										{customer?.active_customer_status == 1 ? " Yes" : " No"}{" "}
										<br />
										<br />
									</div>
								</div>
							</div>
							{/* <!--End single item--> */}
							{!isDeviceSelected ? (
								<>
									<div className="col-md-12 col-sm-6 col-xs-12">
										<div className="single-item customerinfo">
											<div className="icon-holder">
												<div className="icon-box">
													<div className="icon">
														<span className="userinfo">
															<MdOutlinePhonelinkSetup
																style={{
																	fontSize: "45px",
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
												<br />
												<h6
													style={{
														color: "#152545",
														fontSize: "20px",
														padding: "10px",
													}}
												>
													Choose a device
												</h6>
												<Table striped bordered hover>
													<thead>
														<tr>
															<th>Make</th>
															<th>Model</th>
															{/* <th>Type</th> */}
															{/* <th>Tag</th> */}
															{!isMobile && (
																<>
																	<th>Type</th>
																	<th>Serial</th>
																	<th>Color</th>
																</>
															)}

															<th>Choose</th>
														</tr>
													</thead>
													<tbody>
														{customerDevices?.map((device) => (
															<tr key={device.device_id}>
																<td>{device.device_make}</td>
																<td>{device.device_model}</td>
																{!isMobile && (
																	<>
																		<td>{device.device_type}</td>
																		<td>{device.device_serial_number}</td>
																		<td>{device.device_color}</td>
																	</>
																)}

																<td>
																	<div className="edit-delete-icons">
																		<div
																			onClick={() =>
																				chooseDevice(customer, device)
																			}
																		>
																			<FaHandPointer
																				className="fa-hand-pointer "
																				
																			/>
																		</div>
																	</div>
																</td>
															</tr>
														))}
													</tbody>
												</Table>
												{!showAddVehicleForm ? (
													<div className="form-group col-md-12 ">
														<button
															className="theme-btn btn-style-one leftMargin"
															style={{ marginTop: "30px" }}
															type="button"
															onClick={handleToggleAddVehicleForm}
														>
															<span>Add New Device</span>
														</button>
													</div>
												) : (
													<div className="add-vehicle-form left-column ">
														<div className="wrapper-box selected-customer col-md-12">
															<div
																className="form-close"
																style={{
																	marginTop: "40px",
																	marginRight: "50px",
																}}
															>
																<Link onClick={handleToggleAddVehicleForm}>
																	<FaWindowClose />
																</Link>
															</div>

															<AddDeviceForm
																toggle={handleToggleAddVehicleForm}
																onAddDevice={fetchDevicebyCustomerid}
																customerId={customer.customer_id}
															/>
														</div>
													</div>
												)}
											</div>
										</div>
										{/* Add New Device Button */}
									</div>
								</>
							) : (
								<>
									{/* Device info section */}
									<div className="col-md-6 col-sm-6 col-xs-12">
										<div className="single-item singleitemEdit customerinfo">
											<div className="icon-holder">
												<div className="icon-box">
													<div className="icon">
														<span className="userinfo">
															<MdOutlinePhonelinkSetup
																style={{
																	fontSize: "45px",
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
												<h4 className="order-text1">
													Device:{" "}
													{selectedDevice.device_make +
														" " +
														selectedDevice.device_model}
												</h4>
												<p></p>
												<span className="order-text2">Device color</span>:
												{selectedDevice.device_color}
												<br />
												<span className="order-text2">Device type</span>:
												{selectedDevice.device_type} <br />
												<span className="order-text2">
													Device serial number
												</span>
												:{selectedDevice.device_serial_number}
												<br />
												
											</div>
										</div>
									</div>
									{/* choose service section */}
									<div className="col-md-12  col-xs-12">
										<div className="single-item customerinfo">
											<div className="icon-holder">
												<div className="icon-box">
													<div className="icon">
														<span className="userinfo">
															<TbDeviceMobileQuestion
																style={{
																	fontSize: "45px",
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
												<h6
													style={{
														color: "#43C3EA",
														fontSize: "20px",
														padding: "10px",
													}}
												>
													Choose Service
												</h6>
												{currentServices?.map((service) => (
													<div
														className=" mt-2 px-3 service-item checkbox-holder"
														key={service.service_id}
													>
														<h6 style={{ fontSize: "16px" }}>
															{service.repair_service_name}
														</h6>
														<div className="row  ">
															<div className="col-sm-11 ">
																{limitText(
																	service.repair_service_description,
																	90
																)}
															</div>
															<div className="col-sm-1 mt-3 mt-md-0 ">
																<input
																className="service-chice"
																	type="checkbox"
																	name={`service_${service.service_id}`}
																	id={`service_${service.service_id}`}
																	checked={selectedServices.includes(
																		service.service_id
																	)}
																	onChange={() =>
																		handleCheckboxChange(service.service_id)
																	}
																/>
															</div>
														</div>
													</div>
												))}
											</div>
										</div>
									</div>
									{/* <!--Start service pagination--> */}

									<div className="row row-correct-margin">
										<div className="col-md-12">
											<ul className="post-pagination text-center">
												{/* Render the previous page button */}
												<li className={currentPage === 1 ? "disabled" : ""}>
													<a href="" onClick={(event) => handlePrevPage(event)}>
														<i
															className="fa fa-caret-left"
															aria-hidden="true"
														></i>
													</a>
												</li>
												{/* Render the page numbers */}
												{Array.from(
													{ length: totalPages },
													(_, index) => index + 1
												).map((pageNumber) => (
													<li
														key={pageNumber}
														className={
															currentPage === pageNumber ? "active" : ""
														}
													>
														<Link
															to={"/products"}
															onClick={(event) =>
																handlePageChange(event, pageNumber)
															}
														>
															{pageNumber}
														</Link>
													</li>
												))}
												{/* Render the next page button */}
												<li
													className={
														currentPage === totalPages ? "disabled" : ""
													}
												>
													<a href="" onClick={(event) => handleNextPage(event)}>
														<i
															className="fa fa-caret-right"
															aria-hidden="true"
														></i>
													</a>
												</li>
											</ul>
										</div>
									</div>
									{/* <!--End service pagination--> */}

									{/* additional description section */}
									<div className="">
										<div className="product-back">
											<div className="login-register-area ">
												<div className="">
													<div className="row">
														<div className=" col-md-12">
															<div className="form orderform">
																<form onSubmit={handleSubmitOrder}>
																	<div className="col-md-12">
																		<div className="input-field">
																			<input
																				type="text"
																				name="form_subject"
																				placeholder="Order Description"
																				required
																				value={orderDescription}
																				onChange={handleOrderDescription}
																				style={{ width: "103%" }}
																			/>
																		</div>
																	</div>

																	<div className="col-md-6">
																		<div className="input-field">
																			<input
																				type="text"
																				name="form_subject"
																				placeholder="price"
																				required
																				value={totalPrice}
																				onChange={handleTotalPrice}
																			/>
																		</div>
																	</div>

																	<div className="col-md-6">
																		<div className="row">
																			<div className="input-field col-md-7 col-xs-7">
																				<DatePicker
																					selected={selectedDate}
																					onChange={(date) =>
																						setSelectedDate(date)
																					}
																					dateFormat="yyyy-MM-dd"
																					placeholderText="estimated completion date"
																				/>
																			</div>
																		</div>
																	</div>
																	<div className="col-md-12">
																		<div className="row">
																			<div className="col-lg-2 col-md-6 col-sm-6 col-xs-12">
																				<button
																					type="submit"
																					className="thm-btn bg-1"
																				>
																					SUBMIT
																				</button>
																			</div>

																			<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
																				<button
																					type="submit"
																					className="thm-btn bg-1"
																					style={{ backgroundColor: "red" }}
																					onClick={closeInfo}
																				>
																					CANCEL
																				</button>
																			</div>
																		</div>
																	</div>
																</form>
																{success && (
																	<div
																		style={{ color: "green" }}
																		className="success-message"
																	>
																		Order added successfully!
																	</div>
																)}
																{serverError && (
																	<div
																		className="validation-error"
																		role="alert"
																		style={{ marginLeft: "20px" }}
																	>
																		{serverError}
																	</div>
																)}
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</>
							)}
						</div>
					</section>
				</div>
			)}
		</>
	);
}

export default CustomerDevice;
