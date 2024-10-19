import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { format } from "date-fns";
import orderService from "../../../../services/order.service";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faAngleDoubleLeft,
	faAngleLeft,
	faAngleRight,
	faAngleDoubleRight,
	faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../../../Contexts/AuthContext";

function OrdersList() {
	const [orders, setOrders] = useState([]);
	const [apiError, setApiError] = useState(false);
	const [apiErrorMessage, setApiErrorMessage] = useState(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState([]);

	const pageSize = 5;
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const {
		isSticky,
		isMobile,
		isLogged,
		isAdmin,
		setIsLogged,
		setIsAdmin,
		employee,
	} = useAuth();
	let token = null;
	if (employee) {
		token = employee.employee_token;
	}
	// fetch orders function
	const fetchOrders = async () => {
		if (token) {
			try {
				const response = await orderService.getAllOrders(token);
				const data = await response.json();

				if (!Array.isArray(data)) {
					throw new Error("Data is not an array");
				}

				if (data.length !== 0) {
					setTotalPages(Math.ceil(data.length / pageSize));
					const start = (currentPage - 1) * pageSize;
					const end = start + pageSize;
					setOrders(data.slice(start, end));
					setSearchResults(data.slice(start, end)); // Initialize searchResults with the same data
				} else {
					setOrders([]);
					setSearchResults([]);
					setApiError(false);
					setApiErrorMessage(null);
				}
			} catch (error) {
				setApiError(true);
				setApiErrorMessage("Failed to fetch orders. Please try again later.");
			}
		}
	}
	useEffect(() => {
		fetchOrders();
	}, [currentPage,token]);

	const handleFirstClick = () => setCurrentPage(1);
	const handlePreviousClick = () =>
		currentPage > 1 && setCurrentPage(currentPage - 1);
	const handleNextClick = () =>
		currentPage < totalPages && setCurrentPage(currentPage + 1);
	const handleLastClick = () => setCurrentPage(totalPages);

	const handleSearch = (event) => {
		const term = event.target.value.toLowerCase();
		setSearchTerm(term);
		if (!term || term.trim() === "") {
			setSearchResults(orders);
		} else {
			const filteredOrders = orders.filter((order) => {
				const customerName = (
					(order?.order.customer_first_name || "") +
					" " +
					(order?.order.customer_last_name || "")
				).toLowerCase();

				const orderNumber = order?.order.order_number || "";

				return (
					customerName.includes(term) || orderNumber.toString().includes(term)
				);
			});

			setSearchResults(filteredOrders);
		}
	};
	// Display a confirmation dialog before deleting the order
	const confirmDelete = (order) => {
		if (order.active_order) {
			window.alert("Can't delete an Active order");
			return;
		}
		if (window.confirm("Continue deleting?")) {
			deleteOrder(order.order_id);
		}
	};
	// delete order function
	const deleteOrder = async (id) => {
		try {
			const response = await orderService.deleteOrder(id, token);
			if (response.ok) {
				window.alert("Order Deleted!!");
				setTimeout(() => {
					fetchOrders();
				}, 1000);
				return;
			} else {
				window.alert("Error deleting order!!");
			}
		} catch (error) {
			console.log(error);
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
							<h1>Orders</h1> <br /> <br />
						</div>
						<div className="product-back">
							<div className="contact-title">
								<h2>Orders</h2>
							</div>
							<div
								style={{
									position: "relative",
									display: "flex",
									marginBottom: "20px",
								}}
							>
								<input
									type="text"
									value={searchTerm}
									onChange={handleSearch}
									placeholder="Search for orders by customer name, order number"
									style={{ width: "100%", height: "40px" }}
								/>
								<FontAwesomeIcon
									icon={faSearch}
									style={{
										position: "absolute",
										right: "8px",
										top: "50%",
										transform: "translateY(-50%)",
										cursor: "pointer",
									}}
								/>
							</div>
							<Table striped bordered hover>
								<thead>
									<tr>
										<th>Order Id</th>
										<th>Customer</th>
										{!isMobile && (
											<>
												<th>Device</th>
												<th>Order Date</th>
												<th>Received By</th>
												<th>Order Status</th>
											</>
										)}
										<th>Order Number</th>
										{!isMobile && <th>Active Order</th>}
										<th>Edit/View</th>
										{!isMobile && <th>Delete</th>}
									</tr>
								</thead>
								<tbody>
									{searchResults.map((eachOrder) => (
										<tr key={eachOrder.order.order_id}>
											<td className="order-text1">
												{eachOrder.order.order_id}
											</td>
											<td>
												<span className="order-text1">
													{eachOrder.order?.customer_first_name +
														" " +
														eachOrder.order?.customer_last_name || "N/A"}
												</span>
											</td>
											{!isMobile && (
												<>
													<td>
														<span className="order-text1">
															{eachOrder.order?.device_make +
																" , " +
																eachOrder.order?.device_type || "N/A"}
														</span>
													</td>

													<td>
														{eachOrder.order.order_date
															? isNaN(new Date(eachOrder.order.order_date))
																? "Invalid Date"
																: format(
																		new Date(eachOrder.order.order_date),
																		"MM/dd/yyyy"
																  )
															: "N/A"}
													</td>

													<td>
														<span className="order-text1">
															{eachOrder.order?.employee_first_name +
																" " +
																eachOrder.order?.employee_last_name || "N/A"}
														</span>
													</td>

													<td>
														<span
															className={`${
																eachOrder.order.order_status === "Received" &&
																"order-status-received"
															}
													${eachOrder.order.order_status === "InProgress" && "order-status-inprogress"} ${
																eachOrder.order.order_status === "Completed" &&
																"order-status-done"
															}`}
														>
															{eachOrder.order.order_status}
														</span>
													</td>
												</>
											)}

											<td>
												<span className="order-text1">
													{eachOrder.order?.order_number || "N/A"}
												</span>
											</td>

											{!isMobile && (
												<td>
													<span
														className={
															eachOrder.order.active_order === true
																? "order-status-done"
																: "order-status-inprogress"
														}
													>
														{eachOrder.order.active_order === true
															? "Yes"
															: "No"}
													</span>
												</td>
											)}

											<td>
												<div className="edit-delete-icons">
													<Link
														to={`/admin/orders/edit/${eachOrder.order.order_id}`}
													>
														<FaEdit />
													</Link>{" "}
													|{" "}
													<Link
														to={`/order-status/${eachOrder.order.order_hash}`}
													>
														<FiExternalLink />
													</Link>
												</div>
											</td>
											{!isMobile && (
												<td>
													<div className="edit-delete-icons">
														<span className="">
															<button
																onClick={() => confirmDelete(eachOrder.order)}
																className="service-edit-icon2"
															>
																<FaRegTrashAlt />
															</button>
														</span>
													</div>
												</td>
											)}
										</tr>
									))}
								</tbody>
							</Table>
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
									style={{ marginRight: "10px" }}
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
}

export default OrdersList;
