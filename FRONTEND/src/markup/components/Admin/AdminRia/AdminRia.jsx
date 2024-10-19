import React, { useState, useEffect } from "react";
import riaService from "../../../../services/ria.service"; // Assume you have a riaService for handling RIA operations
import { Link, useLocation, useNavigate } from "react-router-dom";
import AddRia from "./AddRia";
import { Table, Button } from "react-bootstrap";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import RiaEdit from "./RiaEdit";
import { useAuth } from "../../../../Contexts/AuthContext";

function AdminRia() {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const [rateServiceName, setRateServiceName] = useState("");
	const [rateValue, setRateValue] = useState("");
	const [rateServiceNameError, setRateServiceNameError] = useState("");
	const [rateValueError, setRateValueError] = useState("");
	const [success, setSuccess] = useState(false);
	const [serverError, setServerError] = useState("");
	const [rateServices, setRateServices] = useState([]);
	const [editingServiceId, setEditingServiceId] = useState(null);
	const [editingRateValue, setEditingRateValue] = useState("");
	const [isAddOpen, setIsAddOpen] = useState(false);
	const [isEditOpen, setIsEditOpen] = useState(false);
	const [singleService, setSngleService] = useState({});
	const [deleteMessage, setDeleteMessage] = useState("");
	const { employee,isMobile } = useAuth();
	let token = null;
	if (employee) {
		token = employee.employee_token;
	}
	useEffect(() => {
		fetchServices();
	}, []);
	// toggling isAddOpen
	const toggleAdd = () => {
		setIsAddOpen(!isAddOpen);
		setIsEditOpen(false);
	};
	// toggling isEditOpen
	const toggleEdit = (service) => {
		setIsEditOpen(!isEditOpen);
		setSngleService(service);
		setIsAddOpen(false);
	};

	const fetchServices = () => {
		riaService
			.getAllRiaServices()
			.then((response) => response.json())
			.then((data) => {
				setRateServices(data.rates);
			})
			.catch((error) => {
				console.error("Error fetching RIA services:", error);
			});
	};

	const handleEdit = (serviceId, rateValue) => {
		setEditingServiceId(serviceId);
		setEditingRateValue(rateValue);
	};

	// const handleUpdate = (serviceId) => {
	// 	const formData = {
	// 		rate_value: editingRateValue,
	// 	};

	// 	riaService
	// 		.updateRiaService(serviceId, formData)
	// 		.then((response) => response.json())
	// 		.then((data) => {
	// 			if (data.success) {
	// 				setSuccess(true);
	// 				setServerError("");
	// 				setEditingServiceId(null);
	// 				fetchServices(); // Refresh services list
	// 			} else {
	// 				setServerError(data.error);
	// 			}
	// 		})
	// 		.catch((error) => {
	// 			const resMessage =
	// 				(error.response &&
	// 					error.response.data &&
	// 					error.response.data.message) ||
	// 				error.message ||
	// 				error.toString();
	// 			setServerError(resMessage);
	// 		});
	// };

	const deleteRiaService = async (serviceId) => {
		try {
			const response = await riaService.deleteRateService(serviceId,token);
			// console.log("service response:", response);

			if (response) {
				const result = await response.json();
				setDeleteMessage(result.data);
				setTimeout(() => {
					setDeleteMessage(false);
					fetchServices();
					navigate("/admin/ria");
					/* to refech service after adding a new one */
				}, 1500);
			}
		} catch (error) {}
	};

	return (
		<div className="">
			{pathname.includes("/admin/") && (
				<>
					<div className="admin-title">
						<h1>RIA Services</h1>
						<br /> <br />
					</div>
					<div className="services-list">
						<h3>RIA Rate Transfer Rates</h3>
					</div>
				</>
			)}

			<div className="content">
				<h3 className="centerTitle">Today's Money Transfer Rate</h3>
				<div className="contact-form">
					<Table striped bordered hover>
						<thead>
							<tr>
								{ !isMobile&&<th>Currency</th>}
								<th>Transefer To</th>
								<th>Rate</th>
								<th>Last Updated</th>

								{pathname.includes("/admin/") && <th>Update/Delete</th>}
							</tr>
						</thead>
						<tbody>
							{rateServices.map((service) => (
								<tr key={service.rate_service_id}>
									{!isMobile && <td>Dollar $</td>}
									<td>{service.rate_service_name}</td>
									<td>{service.rate_value}</td>
									<td>{new Date(service.added_date).toLocaleDateString()}</td>
									{/* <td>{service.added_date}</td> */}
									{pathname.includes("/admin/") && (
										<td>
											<span className="service-edit-icon1">
												<Link
													// className="col-xs-2 service-edit-icon"
													onClick={() => toggleEdit(service)}
												>
													<FaEdit />
												</Link>
											</span>|
											<span className="service-edit-icon2">
												<Link
													onClick={() =>
														deleteRiaService(service.rate_service_id)
													}
													className="service-edit-icon2"
												>
													<FaRegTrashAlt />
												</Link>
											</span>
										</td>
									)}
								</tr>
							))}
							{deleteMessage && (
								<tr>
									<td colSpan={6}>
										<span className="delete-message">{deleteMessage}</span>
									</td>
								</tr>
							)}
						</tbody>
					</Table>
				</div>
			</div>
			{pathname.includes("/admin/") && (
				<IoMdAddCircleOutline
					className="service-edit-icon"
					onClick={toggleAdd}
				/>
			)}
			{isAddOpen && (
				<AddRia setIsAddOpen={setIsAddOpen} fetchServices={fetchServices} />
			)}
			{isEditOpen && (
				<RiaEdit
					singleService={singleService}
					setIsEditOpen={setIsEditOpen}
					fetchServices={fetchServices}
				/>
			)}
		</div>
	);
}

export default AdminRia;
