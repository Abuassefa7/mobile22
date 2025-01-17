// Import the necessary components
import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
// import axios from "axios";
// Import the auth hook
import { useAuth } from "../../../../../Contexts/AuthContext";
// Import the date-fns library
import { format } from "date-fns"; // To properly format the date on the table
// Import the getAllEmployees function
import employeeService from "../../../../../services/employee.service";
// for pagination
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faSearch,
	faAngleDoubleLeft,
	faAngleLeft,
	faAngleRight,
	faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
// Create the EmployeesList component
const EmployeesList = () => {
	// Create all the states we need to store the data
	// Create the employees state to store the employees data
	const [employees, setEmployees] = useState([]);
	// A state to serve as a flag to show the error message
	const [apiError, setApiError] = useState(false);
	// A state to store the error message
	const [apiErrorMessage, setApiErrorMessage] = useState(null);
	// To get the logged in employee token
	const { employee, isMobile } = useAuth();
	let token = null;
	// let token = employee ? employee.employee_token :  null; // To store the token

	// for pagination
	const pageSize = 5; // Set the desired number of records per page
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	if (employee) {
		token = employee.employee_token;
	}

	useEffect(() => {
		// Call the getAllEmployees function
		const allEmployees = employeeService.getAllEmployees(token);
		allEmployees
			.then((res) => {
				if (!res.ok) {
					console.log(res.status);
					setApiError(true);
					if (res.status === 401) {
						setApiErrorMessage("Please login again");
					} else if (res.status === 403) {
						setApiErrorMessage("You are not authorized to view this page");
					} else {
						setApiErrorMessage("Please try again later");
					}
				}
				return res.json();
			})
			.then((data) => {
				if (data.data.length !== 0) {
					setTotalPages(Math.ceil(data.data.length / pageSize));
					// Filter Employees based on pagination
					const start = (currentPage - 1) * pageSize;
					const end = start + pageSize;
					const paginatedEmployees = data.data.slice(start, end);
					setEmployees(paginatedEmployees);
				}
			})
			.catch((err) => {
				// console.log(err);
			});
	}, [currentPage]);
	// pagination clicks
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
				<>
					<section className="contact-section">
						<div className="auto-container">
							<div className="admin-title">
								<h1>Employees</h1> <br /> <br />
							</div>
							<div className="product-back">
								<div className="contact-title">
									<h2>Employees</h2>
								</div>
								<Table striped bordered hover>
									<thead>
										<tr>
											{!isMobile && <th>Id</th>}
											{/* <th>Id</th> */}
											{!isMobile && <th>Active</th>}
											<th>First Name</th>
											{!isMobile &&<><th>Last Name</th><th>Email</th></> }
											
											<th>User Name</th>
											{!isMobile && (
												<>
													<th>Phone</th>
													<th>Added Date</th>
													<th>Role</th>
												</>
											)}
											<th>Edit</th>
										</tr>
									</thead>
									<tbody>
										{employees.map((employee) => (
											<tr key={employee.employee_id}>
												{/* <td>{employee.employee_id}</td> */}
												{!isMobile && <td>{employee.employee_id}</td>}
												{!isMobile && (
													<td>
														{employee.employee_active_status ? "Yes" : "No"}
													</td>
												)}
												<td>{employee.employee_first_name}</td>
												{!isMobile &&<><td>{employee.employee_last_name}</td>
												<td>{employee.employee_email}</td></> }
												<td>{employee.employee_username}</td>
												{!isMobile && (
													<>
														<td>{employee.employee_phone}</td>
														<td>
															{new Date(
																employee.employee_added_date
															).toLocaleDateString()}
														</td>
														<td>{employee.company_role_name}</td>
													</>
												)}
												<td>
													<div className="edit-delete-icons">
														{employee.fullName} {employee.email}
														<Link
															to={`/admin/employee/edit/${employee.employee_id}`}
														>
															<FaEdit />
														</Link>
														{/* <button
															onClick={() => {
																handleDelete(employee.employee_id);
															}}
															type="button"
														>
															<FiExternalLink />
														</button> */}
													</div>
												</td>
											</tr>
										))}
									</tbody>
								</Table>

								<div
									style={{
										display: "flex",
										justifyContent: "center",
										marginBottom: "20px",
										alignItems: "center", // Centering vertically
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
											// backgroundColor: "black",
											// color: "white",
											marginRight: "10px",
										}}
									>
										Next <FontAwesomeIcon icon={faAngleRight} />
									</button>
									{!isMobile && (
										<button
											onClick={handleLastClick}
											disabled={currentPage === totalPages}
											// style={{ backgroundColor: "black", color: "white" }}
										>
											Last <FontAwesomeIcon icon={faAngleDoubleRight} />
										</button>
									)}
								</div>
							</div>
						</div>
					</section>
				</>
			)}
		</>
	);
};

// Export the EmployeesList component
export default EmployeesList;
