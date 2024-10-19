import React, { useState, useEffect } from "react";
import { Table, Modal, Button } from "react-bootstrap";
import { useAuth } from "../../../../../Contexts/AuthContext";
import { FaEdit } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { format } from "date-fns";
// import 'bootstrap/dist/css/bootstrap.min.css';
import {
	faSearch,
	faAngleDoubleLeft,
	faAngleLeft,
	faAngleRight,
	faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
import customerServices from "../../../../../services/customer.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
// create customers List component

const CustomerList = () => {
	const [showModal, setShowModal] = useState(false);
	const [customers, setCustomers] = useState([]);
	const [apiError, setApiError] = useState(false);
	const [apiErrorMessage, setApiErrorMessage] = useState(null);

	const [selectedCustomer, setSelectedCustomer] = useState(null);
	const [showActiveConfirmation, setShowActiveConfirmation] = useState(false);
	const navigate = useNavigate();
	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const { employee } = useAuth();
	let token = null;
	const pageSize = 5; // Set the desired number of records per page
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

	if (employee) {
		token = employee.employee_token;
	}
	useEffect(() => {
		// Check if token is available
		if (token) {
			// Call the getAll Customers function
			const fetchCustomers = async () => {
				try {
					const response = await customerServices.getAllCustomers(token);
					if (!response.ok) {
						setApiError(true);

						if (response.status === 401) {
							setApiErrorMessage("Please login again");
						} else if (response.status === 403) {
							setApiErrorMessage("You are not authorized to view this page");
						} else {
							setApiErrorMessage("Please try again later");
						}
					} else {
						const data = await response.json();
						if (data.customers?.length !== 0) {
							setTotalPages(Math.ceil(data.customers?.length / pageSize));
							// Filter customers based on pagination
							const start = (currentPage - 1) * pageSize;
							const end = start + pageSize;
							const paginatedCustomers = data.customers.slice(start, end);
							setCustomers(paginatedCustomers);
						}
					}
				} catch (err) {
					console.log(err);
				}
			};

			fetchCustomers();
		}
	}, [currentPage, token]);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768);
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const handleFirstClick = () => {
		setCurrentPage(1);
	};

	const handlePreviousClick = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	const handleNextClick = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	const handleLastClick = () => {
		setCurrentPage(totalPages);
	};

	const handleSearch = (event) => {
		const searchTerm = event.target.value.toLowerCase();
		setSearchTerm(searchTerm);
		if (!searchTerm || searchTerm.trim() === "") {
			setSearchResults([]);
		} else {
			const filteredCustomers = customers.filter((customer) => {
				const firstName =
					(customer?.customer_first_name || "").toLowerCase() || "";
				const lastName =
					(customer?.customer_last_name || "").toLowerCase() || "";
				const email = (customer?.customer_email || "").toLowerCase() || "";
				const phone =
					(customer?.customer_phone_number || "").toLowerCase() || "";
				return (
					firstName.includes(searchTerm) ||
					lastName.includes(searchTerm) ||
					email.includes(searchTerm) ||
					phone.includes(searchTerm)
				);
			});
			setSearchResults(filteredCustomers);
		}
	};

	return (
		<>
			{apiError ? (
				<section className="contact-section">
					<div className="auto-container">
						<div className="contact-title">
							<h2>{apiErrorMessage}</h2>
						</div>
					</div>
				</section>
			) : (
				<section className="contact-section">
					<div className="auto-container">
						<div className="admin-title">
							<h1>Customers</h1> <br /> <br />
						</div>
						<div className="product-back">
							<div className="contact-title">
								<h2>Customers</h2>
							</div>
							<div style={{ position: "relative", display: "flex" }}>
								<input
									type="text"
									value={searchTerm}
									onChange={handleSearch}
									placeholder="Search for customers using first name, last name, email"
									style={{ width: "100%", height: "40px" }}
								/>
								<FontAwesomeIcon
									icon={faSearch}
									onClick={handleSearch}
									style={{
										position: "absolute",
										right: "8px",
										top: "50%",
										transform: "translateY(-50%)",
										cursor: "pointer",
									}}
								/>
							</div>
							<br />
							{isMobile ? (
								<Table striped bordered hover>
									<thead>
										<tr>
											<th>ID</th>
											<th>Name</th>
											<th>Phone No.</th>

											<th>Edit/View</th>
										</tr>
									</thead>
									<tbody>
										{searchResults.length > 0
											? searchResults.map((customer) => (
													<tr key={customer.customer_id}>
														<td>{customer.customer_id}</td>
														<td>
															{customer.customer_first_name}{" "}
															{customer.customer_last_name}
														</td>
														<td>{customer.customer_phone_number}</td>

														<td>
															<div className="edit-delete-icons">
																<Link
																	to={`/admin/customer/edit/${customer.customer_id}`}
																>
																	<FaEdit />
																</Link>{" "}
																|{" "}
																<Link
																	to={`/admin/customer-profile/${customer.customer_id}`}
																>
																	<FiExternalLink />
																</Link>
															</div>
														</td>
													</tr>
											  ))
											: customers.map((customer) => (
													<tr key={customer.customer_id}>
														<td>{customer.customer_id}</td>
														<td>
															{customer.customer_first_name}{" "}
															{customer.customer_last_name}
														</td>
														<td>{customer.customer_phone_number}</td>

														<td>
															<div className="edit-delete-icons">
																<Link
																	to={`/admin/customer/edit/${customer.customer_id}`}
																>
																	<FaEdit />
																</Link>{" "}
																|{" "}
																<Link
																	to={`/admin/customer-profile/${customer.customer_id}`}
																>
																	<FiExternalLink />
																</Link>
															</div>
														</td>
													</tr>
											  ))}
									</tbody>
								</Table>
							) : (
								<Table striped bordered hover>
									<thead>
										<tr>
											<th>ID</th>
											<th>First Name</th>
											<th>Last Name</th>
											<th>Email</th>
											<th>Phone Number</th>
											<th>Added Date</th>
											<th>Active</th>
											<th>Edit/View</th>
										</tr>
									</thead>
									<tbody>
										{searchResults.length > 0
											? searchResults.map((customer) => (
													<tr key={customer.customer_id}>
														<td>{customer.customer_id}</td>
														<td>{customer.customer_first_name}</td>
														<td>{customer.customer_last_name}</td>
														<td>{customer.customer_email}</td>
														<td>{customer.customer_phone_number}</td>
														<td>{customer.customer_added_date}</td>
														<td>
															<div>
																{customer.active_customer_status === 1
																	? "Yes"
																	: "No"}
															</div>
														</td>
														<td>
															<div className="edit-delete-icons">
																<Link
																	to={`/admin/customer/edit/${customer.customer_id}`}
																>
																	<FaEdit />
																</Link>{" "}
																|{" "}
																<Link
																	to={`/admin/customer-profile/${customer.customer_id}`}
																>
																	<FiExternalLink />
																</Link>
															</div>
														</td>
													</tr>
											  ))
											: customers.map((customer) => (
													<tr key={customer.customer_id}>
														<td>{customer.customer_id}</td>
														<td>{customer.customer_first_name}</td>
														<td>{customer.customer_last_name}</td>
														<td>{customer.customer_email}</td>
														<td>{customer.customer_phone_number}</td>
														<td>{customer.customer_added_date}</td>
														<td>
															<div>
																{customer.active_customer_status === 1
																	? "Yes"
																	: "No"}
															</div>
														</td>
														<td>
															<div className="edit-delete-icons">
																<Link
																	to={`/admin/customer/edit/${customer.customer_id}`}
																>
																	<FaEdit />
																</Link>{" "}
																|{" "}
																<Link
																	to={`/admin/customer-profile/${customer.customer_id}`}
																>
																	<FiExternalLink />
																</Link>
															</div>
														</td>
													</tr>
											  ))}
									</tbody>
								</Table>
							)}
							<div
								style={{
									display: "flex",
									justifyContent: "center",
									marginBottom: "20px",
									alignItems: "center",
								}}
							>
								{!isMobile && (
									<button
										onClick={handleFirstClick}
										disabled={currentPage === 1}
										style={{ marginRight: "10px" }}
									>
										<FontAwesomeIcon icon={faAngleDoubleLeft} /> First
									</button>
								)}
								<button
									onClick={handlePreviousClick}
									disabled={currentPage === 1}
									style={{ marginRight: "10px" }}
								>
									<FontAwesomeIcon icon={faAngleLeft} /> Prev
								</button>
								<span style={{ margin: "0 10px" }}>
									Page {currentPage} of {totalPages}
								</span>
								<button
									onClick={handleNextClick}
									disabled={currentPage === totalPages}
									style={{
										marginRight: "10px",
									}}
								>
									Next <FontAwesomeIcon icon={faAngleRight} />
								</button>
								{!isMobile && (
									<button
										onClick={handleLastClick}
										disabled={currentPage === totalPages}
									>
										Last <FontAwesomeIcon icon={faAngleDoubleRight} />
									</button>
								)}
							</div>
						</div>
					</div>
				</section>
			)}
		</>
	);
};

export default CustomerList;
