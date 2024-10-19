import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import additionalService from "../../../../services/additionalServices.service";
import { FaEdit, FaWindowClose, FaPlus } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import AddBasement from "./AddBasement";
import EditBasement from "./EditBasement";
import { useAuth } from "../../../../Contexts/AuthContext";
function BasementList() {
	const [services, setServices] = useState([]);
	const [newServiceOpen, setNewServiceOpen] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [selectedService, setSelectedService] = useState("");
	const { isMobile, employee } = useAuth();
	let token = null;
	const [isSelected, setIsSelected] = useState(false);
	const [servicesPerPage, setServiceperPage] = useState(6);
	const [deleteMessage, setDeleteMessage] = useState("");
	const { pathname } = useLocation();
	if (employee) {
		token = employee.employee_token;
	}
	// fetch services
	const fetchServices = async () => {
		try {
			const response = await additionalService.getAllRentServices();

			if (response) {
				const result = await response.json();

				setServices(result.rents);
			}
		} catch (error) {}
	};
	const deleteServices = async (id) => {
		try {
			const response = await additionalService.deleteRentService(id, token);

			if (response) {
				const result = await response.json();
				setDeleteMessage(result.data);
				setTimeout(() => {
					setDeleteMessage(false);
					fetchServices();
					navigate("/admin/rent");
					/* to refech service after adding a new one */
				}, 1500);
			}
		} catch (error) {}
	};
	useEffect(() => {
		fetchServices();
	}, []);
	// toggle the add new service window
	const toggleNewServiceWindow = () => {
		setNewServiceOpen(!newServiceOpen);
		setSelectedService("");
	};
	// Calculate the index of the first service on the current page
	const indexOfFirstProduct = (currentPage - 1) * servicesPerPage;
	// Calculate the index of the last product on the current page
	const indexOfLastProduct = Math.min(
		currentPage * servicesPerPage,
		services.length
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

	// handling select service
	const handleSelectService = async (service) => {
		setSelectedService(service);
		setNewServiceOpen(false);
		setServiceperPage(2);
	};
	// console.log("check selected:", isSelected);
	return (
		<div>
			<br />
			{pathname.includes("/admin/") && (
				<>
					<h1 className="rent-title">Rent Info</h1>
					<p>
						In addition to our expert electronics repair services, we also have
						a spacious basement apartment available for rent. Inquire with us
						today about this convenient rental option.
					</p>
				</>
			)}

			<div className="content">
				<div className="contact-form">
					<h3 className="centerTitle">HOUSING INFORMATION FOR RENT </h3>
					{!newServiceOpen && (
						<Table striped bordered hover>
							{isMobile ? (
								<thead>
									<tr>
										<th>ID</th>
										<th>Room Type</th>
										<th>Phone Number</th>
										<th>Is Available</th>
										{pathname.includes("/admin/") && <th>Update/Delete</th>}
									</tr>
								</thead>
							) : (
								<thead>
									<tr>
										<th>ID</th>
										<th>Room Type</th>
										<th> Description</th>
										<th>Phone Number</th>
										<th>Is Available</th>
										{pathname.includes("/admin/") && <th>Update/Delete</th>}
									</tr>
								</thead>
							)}

							{isMobile ? (
								<tbody>
									{currentServices?.map((service) => (
										<tr key={service.rent_service_id}>
											<td className="order-text1">{service.rent_service_id}</td>
											<td>{service.rent_service_name}</td>
											<td>{service.owner_phonenumber}</td>
											<td>{service.rent_status === 0 ? "yes" : "no"}</td>
											{pathname.includes("/admin/") && (
												<td>
													<div className="rent-icons">
														<span className="icon1">
															<Link
																onClick={() => handleSelectService(service)}
																className="col-xs-2 "
															>
																<FaEdit />
															</Link>
														</span>
														<span className="icon2">
															<Link
																onClick={() =>
																	deleteServices(service.rent_service_id)
																}
																className="icon2"
															>
																<FaRegTrashAlt />
															</Link>
														</span>
													</div>
												</td>
											)}
										</tr>
									))}
									{selectedService && (
										<tr>
											<td colSpan={6}>
												<EditBasement
													service={selectedService}
													fetchServices={fetchServices}
													setSelectedService={setSelectedService}
													setServiceperPage={setServiceperPage}
												/>
											</td>
										</tr>
									)}
									{deleteMessage && (
										<tr>
											<td colSpan={6}>
												<span className="delete-message">{deleteMessage}</span>
											</td>
										</tr>
									)}
								</tbody>
							) : (
								<tbody>
									{currentServices?.map((service) => (
										<tr key={service.rent_service_id}>
											<td className="order-text1">{service.rent_service_id}</td>
											<td>{service.rent_service_name}</td>
											<td colSpan={1}>{service.rent_service_description}</td>
											<td>{service.owner_phonenumber}</td>
											<td>{service.rent_status === 0 ? "yes" : "no"}</td>
											{pathname.includes("/admin/") && (
												<td>
													<div className="rent-icons">
														<span className="icon1">
															<Link
																onClick={() => handleSelectService(service)}
																className="col-xs-2 "
															>
																<FaEdit />
															</Link>
														</span>
														<span className="icon2">
															<Link
																onClick={() =>
																	deleteServices(service.rent_service_id)
																}
																className="icon2"
															>
																<FaRegTrashAlt />
															</Link>
														</span>
													</div>
												</td>
											)}
										</tr>
									))}
									{selectedService && (
										<tr>
											<td colSpan={6}>
												<EditBasement
													service={selectedService}
													fetchServices={fetchServices}
													setSelectedService={setSelectedService}
													setServiceperPage={setServiceperPage}
												/>
											</td>
										</tr>
									)}
									{deleteMessage && (
										<tr>
											<td colSpan={6}>
												<span className="delete-message">{deleteMessage}</span>
											</td>
										</tr>
									)}
								</tbody>
							)}
						</Table>
					)}

					{/* <!--Start service pagination--> */}
					{!selectedService && (
						<div className="row row-correct-margin">
							{pathname.includes("/admin/") && (
								<span className="col-sm-12">
									{!newServiceOpen && (
										<Link
											className=" pull-left"
											onClick={toggleNewServiceWindow}
										>
											<button className="icon-3">
												<FaPlus />
											</button>
										</Link>
									)}
								</span>
							)}
							{!newServiceOpen && (
								<div className="col-md-10">
									<ul className="post-pagination text-center x">
										{/* Render the previous page button */}
										<li className={currentPage === 1 ? "disabled" : ""}>
											<a href="" onClick={(event) => handlePrevPage(event)}>
												<i className="fa fa-caret-left" aria-hidden="true"></i>
											</a>
										</li>
										{/* Render the page numbers */}
										{Array.from(
											{ length: totalPages },
											(_, index) => index + 1
										).map((pageNumber) => (
											<li
												key={pageNumber}
												className={currentPage === pageNumber ? "active" : ""}
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
											className={currentPage === totalPages ? "disabled" : ""}
										>
											<a href="" onClick={(event) => handleNextPage(event)}>
												<i className="fa fa-caret-right" aria-hidden="true"></i>
											</a>
										</li>
									</ul>
								</div>
							)}
							<div>
								{newServiceOpen && (
									<AddBasement
										toggleNewServiceWindow={toggleNewServiceWindow}
										fetchServices={fetchServices}
									/>
								)}
							</div>
						</div>
					)}
					{/* <!--End service pagination--> */}
				</div>
			</div>
		</div>
	);
}

export default BasementList;
