import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Table } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { FaHandPointer } from "react-icons/fa";
import { Link } from "react-router-dom";

function SearchCustomer({
	filterdCustomers,
	handleCustomerSelection,
	handleInputChange,
	searchQuery,
}) {
	return (
		<>
			<section className="login-register-area searchCustomer">
				<div className="">
					<div className="row">
						<div className="col-lg-11 col-md-12">
							<div className="form ">
								<div className="row">
									<form>
										<div className="col-md-12">
											<div className="input-field inputBox">
												<input
													type="text"
													placeholder="Search for a customer using first name, last name,  email  address,  or phone number."
													style={{ fontStyle: "italic", marginLeft: "10px" }}
													value={searchQuery}
													onChange={handleInputChange}
												/>
												<IoSearch
													style={{ fontSize: "20px" }}
													className="icons"
												/>
											</div>
										</div>

										<div className="col-md-12">
											<div className="row">
												<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
													<NavLink
														to={"/admin/add-customer"}
														className="thm-btn bg-1 linkhover"
														type="submit"
														style={{
															marginLeft: "10px",
															padding: "15px",
															fontSize: "18px",
														}}
													>
														ADD NEW CUSTOMER
													</NavLink>
												</div>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			{/*  Displaying the customer list */}
			<Table striped bordered hover>
				<thead>
					<tr></tr>
				</thead>
				<tbody>
					{filterdCustomers?.map((customer) => (
						<tr key={customer.customer_id}>
							<td>{customer.customer_first_name}</td>
							<td>{customer.customer_last_name}</td>

							<td>{customer.customer_email}</td>
							<td>{customer.customer_phone_number}</td>
							<td>
								<div className="edit-delete-icons">
									<Link
										to="#"
										onClick={() => {
											handleCustomerSelection(customer);
										}}
									>
										<FaHandPointer   className="fa-hand-pointer" />
									</Link>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</>
	);
}

export default SearchCustomer;
