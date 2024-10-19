import React, { useEffect, useState } from "react";
import backgroundImage from "../../../../assets/images/home/banner/slideimg1.jpg";
import { FaEdit, FaWindowClose } from "react-icons/fa"; // Import the edit icon from the react-icons library
import { useAuth } from "../../../../Contexts/AuthContext";
import { Link } from "react-router-dom";
import serviceService from "../../../../services/service.service";
import AddService from "./AddService";
import ServiceEdit from "./ServiceEdit";
function AdminServices() {
	const [services, setServices] = useState([]);
	const [newServiceOpen, setNewServiceOpen] = useState(false);
	const { employee } = useAuth();
	let token = null;
	const [currentPage, setCurrentPage] = useState(1);
	const [selectedService, setSelectedService] = useState("");
	const [isSelected, setIsSelected] = useState(false);
	const servicesPerPage = 4;
	if (employee) {
		token = employee.employee_token;
	}
	// fetch services
	const fetchServices = async () => {
		if (token) {
			try {
				const response = await serviceService.getAllServices(token);
				if (response.ok) {
					const result = await response.json();
					setServices(result.services);
				}
			} catch (error) {}
		}
	};
	useEffect(() => {
		fetchServices();
	}, [token]);
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
		setNewServiceOpen(false);
		setSelectedService("");
	};

	const handleNextPage = (event) => {
		event.preventDefault();
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
		setNewServiceOpen(false);
		setSelectedService("");
	};

	const handlePrevPage = (event) => {
		event.preventDefault();
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
		setNewServiceOpen(false);
		setSelectedService("");
	};

	// handling select service
	const handleSelectService = async (service) => {
		setSelectedService(service);
		setNewServiceOpen(false);
	};
	// console.log("check selected:", isSelected);
	// Limiting text size of the service description
	const limitText = (text, limit) => {
		if (text?.length > limit) {
			return text.substring(0, limit) + "...";
		} else {
			return text;
		}
	};
	return (
		<section
			className="categories-area service-list"
			style={{ backgroundImage: `url(${backgroundImage})` }}
		>
			<div className="">
				<div className="sec-title text-center">
					<h1>Electronics Repair Services</h1>
				</div>
				{currentServices?.map((service) => (
					<div className="" key={service.service_id}>
						<div className=" col-xs-12">
							<div className="single-item services">
								<div className="icon-holder">
									<div className="icon-box">
										<div className="icon">
											<span className="flaticon-wrench"></span>
										</div>
									</div>
								</div>
								<div className="text-holder d-flex justify-content-between row">
									<div className="col-xs-9 col-sm-11">
										<h5>{service.repair_service_name}</h5>
										<p>{limitText(service.repair_service_description, 100)}</p>
									</div>

									<Link
										onClick={() => handleSelectService(service)}
										className="col-xs-2 col-sm-1 service-edit-icon"
									>
										<FaEdit />
									</Link>
								</div>
								{selectedService?.service_id == service.service_id ? (
									<ServiceEdit
										service={service}
										fetchServices={fetchServices}
										setSelectedService={setSelectedService}
									/>
								) : (
									""
								)}
							</div>
						</div>
					</div>
				))}
				{/* <!--Start service pagination--> */}

				<div className="row row-correct-margin">
					<div className="col-md-12">
						<ul className="post-pagination text-center">
							{/* Render the previous page button */}
							<li className={currentPage === 1 ? "disabled" : ""}>
								<a href="" onClick={(event) => handlePrevPage(event)}>
									<i className="fa fa-caret-left" aria-hidden="true"></i>
								</a>
							</li>
							{/* Render the page numbers */}
							{Array.from({ length: totalPages }, (_, index) => index + 1).map(
								(pageNumber) => (
									<li
										key={pageNumber}
										className={currentPage === pageNumber ? "active" : ""}
									>
										<Link
											to={"/products"}
											onClick={(event) => handlePageChange(event, pageNumber)}
										>
											{pageNumber}
										</Link>
									</li>
								)
							)}
							{/* Render the next page button */}
							<li className={currentPage === totalPages ? "disabled" : ""}>
								<a href="" onClick={(event) => handleNextPage(event)}>
									<i className="fa fa-caret-right" aria-hidden="true"></i>
								</a>
							</li>
						</ul>
					</div>
				</div>
				{/* <!--End service pagination--> */}
			</div>
			{!newServiceOpen && (
				<Link className=" pull-right" onClick={toggleNewServiceWindow}>
					<button className="thm-btn bg-1 special-btn">Add New Service</button>
				</Link>
			)}

			{newServiceOpen && (
				<AddService
					toggleNewServiceWindow={toggleNewServiceWindow}
					fetchServices={fetchServices}
				/>
			)}
		</section>
	);
}

export default AdminServices;
