import React, { useEffect, useState } from "react";
import { FaInfo } from "react-icons/fa";
import { Table, Button } from "react-bootstrap";
import { RiContactsFill } from "react-icons/ri";
import { FaEdit, FaHandPointer, FaWindowClose } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useLocation, useParams } from "react-router-dom";
import customerServices from "../../../../../services/customer.service";
import orderService from "../../../../../services/order.service";
import deviceService from "../../../../../services/device.service";
import employeeService from "../../../../../services/employee.service";
import AddDeviceForm from "../../AddDeviceForm/AddDeviceForm";
import { useAuth } from "../../../../../../src/Contexts/AuthContext";
import { add, format } from "date-fns";

function Customerprofileform() {
	const location = useLocation();
	const navigate = useNavigate();
	const [customer, setCustomer] = useState(null);
	const [devices, setdevices] = useState([]);
	const [orders, setOrders] = useState([]);
	const [customerDevices, setCustomerdevice] = useState([]);
	const { customer_id } = useParams();
	const [employees, setEmployees] = useState({});
	const [showAddDeviceForm, setShowAddDeviceForm] = useState(false);
	const [addDevices, setAddDevices] = useState([]);
	const [errorMessage, setErrorMessage] = useState("");
	//  for mobile size

	let loggedInEmployeeToken = "";
	const { employee, isMobile } = useAuth();
	if (employee && employee.employee_token) {
		loggedInEmployeeToken = employee.employee_token;
	}

	// toggling add  Device form
	const handleToggleAddDeviceForm = () => {
		setShowAddDeviceForm(!showAddDeviceForm);
	};
	// for device by customer_id
	useEffect(() => {
		fetchDevicebyCustomerid();
	}, [loggedInEmployeeToken]);
	// Fetch customer
	useEffect(() => {
		if (loggedInEmployeeToken) {
			customerServices
				.getCustomer(loggedInEmployeeToken, customer_id)
				.then((res) => res.json())
				.then((response) => {
					setCustomer(response);
				})
				.catch((error) => {
					console.error("Error fetching customer:", error);
				});
			// Fetch orders
			orderService
				.getOrdersByCustomerId(loggedInEmployeeToken, customer_id)
				.then((res) => res.json())
				.then((response) => {
					// console.log("Response from orders API:", response);
					setOrders(response);
					fetchDevice(response);
					fetchEmployees(response);
				})
				.catch((error) => {
					console.log("Error fetching orders:", error);
				});
		}
	}, [customer_id, loggedInEmployeeToken]);

	const fetchDevice = async (orders) => {
		try {
			// Ensure orders is an array
			if (!Array.isArray(orders)) {
				throw new TypeError("Expected orders to be an array");
			}

			// get device ids
			const deviceIds = orders?.map((order) => order.device_id);

			// fetch device info based on device ids
			const responses = await Promise.all(
				deviceIds.map((deviceId) => deviceService.getSingledeviceById(loggedInEmployeeToken,deviceId))
			);

			const devicesData = await Promise.all(
				responses.map((response) => response.json())
			);
			setCustomerdevice(devicesData);

			// map device info the way we want
			const devicesMap = {};
			devicesData.forEach((deviceData) => {
				const device = {
					Make: deviceData.device_make,
					Model: deviceData.device_model,
					Type: deviceData.device_type,
					Color: deviceData.device_color,
				};

				devicesMap[deviceData.device_id] = device;
			});

			setdevices(devicesMap);
		} catch (error) {
			console.log(error);
		}
	};

	// fetch employee based on employee id to see who added the order
	const fetchEmployees = async (orders) => {
		try {
			// get employee ids
			const employeeIds = orders?.map((order) => order.employee_id);

			// fetch employee info based on employee ids
			const responses = await Promise.all(
				employeeIds.map((employeeId) =>
					employeeService.getEmployee(employeeId, loggedInEmployeeToken)
				)
			);

			const employeesData = await Promise.all(
				responses.map((response) => response.json())
			);

			// map employee info the way we want
			const employeesMap = {};
			employeesData.forEach((employeeData) => {
				const employee = {
					employeeName:
						employeeData.employee_first_name +
						" " +
						employeeData.employee_last_name,
				};

				employeesMap[employeeData.employee_id] = employee;
			});

			setEmployees(employeesMap);
		} catch (error) {
			console.log(error);
		}
	};
	// Fetch device by customer_id
	const fetchDevicebyCustomerid = () => {
		if (loggedInEmployeeToken) {
			deviceService
				.getDevicesPerCustomer(loggedInEmployeeToken,customer_id)
				.then((res) => res.json())
				.then((response) => {
					console.log(response);
					setAddDevices(response);
				})
				.catch((error) => {
					console.error("Error fetching device:", error);
				});
		}
	};
	// for adding order from the customer profile page
	const handleAddOrderClick = () => {
		// check if devices exist before proceed
		if (addDevices.status === "fail") {
			setErrorMessage("Please add a device to proceed!");
			setTimeout(() => {
				setErrorMessage("");
			}, 2000);
			return;
		}

		const dataToAddOrder = { customer, addDevices };
		navigate("/admin/new-order", { state: dataToAddOrder });
	};
	return (
		<div className="customerprofile">
			<section className="categories-area ">
				<div className="row top">
					<div className="admin-title">
						<h1 style={{ marginLeft: "20px" }}>Customer Profile</h1> <br />{" "}
						<br />
					</div>
					{/* <!--Start single item--> */}
					<div className="col-md-7 col-sm-6 col-xs-12">
						<div className="single-item customerinfo">
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
								<h6 className="order-text2">
									Email: {customer?.customer_email}
								</h6>{" "}
								<p></p>
								<h6 className="order-text2">
									Phone :{customer?.customer_phone_number}
								</h6>{" "}
								<p></p>
								<h6 className="order-text2">
									Active Customer:
									{customer?.active_customer_status == 1 ? " Yes" : " No"}
								</h6>{" "}
								<p></p>
								<h6 className="order-text2">
									Edit customer info_
									<Link to={`/admin/customer/edit/${customer_id}`}>
										<FaEdit />
									</Link>
								</h6>
							</div>
						</div>
					</div>
					{/* <!--End single item--> */}
				</div>

				<div className="content">
					<h3 className="centerTitle">
						{customer?.customer_first_name
							? `${customer.customer_first_name.toUpperCase()}'S DEVICES`
							: "N/A DEVICES"}{" "}
					</h3>
					<div className="contact-form">
						{addDevices && addDevices.length > 0 ? (
							<Table striped bordered hover>
								<thead>
									<tr>
										<th>Make</th>
										<th>Model</th>
										<th>Type</th>
										{!isMobile && (
											<>
												<th>Color</th>
											</>
										)}
									</tr>
								</thead>
								<tbody>
									{addDevices.map((addDevice) => (
										<tr key={addDevice.device_id}>
											<td>{addDevice.device_make}</td>
											<td>{addDevice.device_model}</td>
											<td>{addDevice.device_type}</td>

											{!isMobile && (
												<>
													<td>{addDevice.device_color}</td>
												</>
											)}
										</tr>
									))}
								</tbody>
							</Table>
						) : (
							<div className="wrapper-box selected-customer">
								<div className="left-column text">
									<div colSpan="8">No devices found for this customer.</div>
								</div>
							</div>
						)}
						{!showAddDeviceForm ? (
							<div className="form-group col-md-12">
								<button
									className="theme-btn btn-style-one leftMargin"
									type="submit"
									data-loading-text="Please wait..."
									onClick={handleToggleAddDeviceForm}
								>
									<span>Add New Device</span>
								</button>
							</div>
						) : (
							<div className="add-device-form">
								<div className="wrapper-box selected-customer col-md-12">
									<div className="form-close">
										<Link onClick={handleToggleAddDeviceForm}>
											<FaWindowClose />
										</Link>
									</div>
									<div className="left-column ">
										<div>
											<AddDeviceForm
												toggle={handleToggleAddDeviceForm}
												onAddDevice={fetchDevicebyCustomerid}
											/>
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>

				<div className="content">
					<br /> <br />
					<div className="contact-form">
						<h3 className="centerTitle">
							ORDERS OF{" "}
							{customer?.customer_first_name
								? `${customer.customer_first_name.toUpperCase()} `
								: "N/A DEVICES"}{" "}
						</h3>
						<Table striped bordered hover>
							<thead>
								<tr>
									<th>Id</th>
									<th>Device</th>
									<th> Date</th>
									{!isMobile && (
										<>
											<th>Received By</th>
											<th>Order Status</th>
											<th>Active Order</th>
											<th>Edit/View</th>
										</>
									)}
								</tr>
							</thead>

							<tbody>
								{orders && orders.length > 0 ? (
									orders.map((order) => (
										<tr key={order.order_id}>
											<td className="order-text1">{order.order_id}</td>

											<td>
												{devices[order.device_id]?.Make && (
													<div>
														<span className="order-text1">
															{devices[order.device_id]?.Make}{" "}
														</span>
														<br />
														{devices[order.device_id]?.Model} <br />
														{devices[order.device_id]?.Color}
													</div>
												)}
											</td>
											<td>
												{format(new Date(order.order_date), "MM / dd / yyyy ")}
											</td>
											{!isMobile && (
												<>
													<td>
														<span className="order-text1">
															{employees[order.employee_id]?.employeeName}
														</span>
													</td>
													<td>
														<span
															className={`${
																order.order_status === "Received" &&
																"order-status-received"
															}
													${order.order_status === "InProgress" && "order-status-inprogress"} ${
																order.order_status === "Completed" &&
																"order-status-done"
															}`}
														>
															{order.order_status}
														</span>
													</td>
													<td>
														<span
															className={
																order.active_order === false
																	? "order-status-inprogress"
																	: "order-status-done"
															}
														>
															{order.active_order === false ? "No" : "Yes"}
														</span>
													</td>
													<td>
														<div className="edit-delete-icons">
															<Link to={`/admin/orders/edit/${order.order_id}`}>
																<FaEdit />
															</Link>
															|
															<Link to={`/order-status/${order.order_hash}`}>
																<FiExternalLink />
															</Link>
														</div>
													</td>
												</>
											)}
										</tr>
									))
								) : (
									<tr>
										<td colSpan="8">
											{orders === null
												? "Loading orders..."
												: "No orders found for this customer."}
											<div></div>
										</td>
									</tr>
								)}
							</tbody>
						</Table>
					</div>
					<div to="#" className="form-group col-md-12">
						<button
							onClick={handleAddOrderClick}
							className="theme-btn btn-style-one leftMargin"
							type="submit"
							data-loading-text="Please wait..."
						>
							<span>Add New Order</span>
						</button>
					</div>
					{errorMessage && <h4 className="validation-error">{errorMessage}</h4>}
				</div>
			</section>
		</div>
	);
}

export default Customerprofileform;
