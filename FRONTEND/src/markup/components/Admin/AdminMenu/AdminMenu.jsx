import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../../Contexts/AuthContext";

function AdminMenu() {
	const { pathname } = useLocation();
	const { employee, isAdmin, isMobile } = useAuth();
	const [isClicked, setIsClicked] = useState(false)
	// toggling isClicked
	const handleClick = () => setIsClicked(!isClicked);
	return (
		<div>
			<section id="service-single-area" className="smartphone-repair-area">
				<div className="">
					<div className="row">
						<div className=" col-xs-12  pull-left">
							<div className="service-single-sidebar">
								{isMobile ? (
									<>
										<li className="allservice " onClick={handleClick}>
											<Link to="#" className={`mobile-admin-menu `}>
												{!isClicked ? "Show Admin Menu" : "Hide Admin Menu"}
												<i className="fa fa-cog" aria-hidden="true"></i>
											</Link>
										</li>
										{isClicked && (
											<ul className="service-lists">
												<li>
													<Link to="/admin">Dashboard</Link>
												</li>
												{isAdmin && (
													<>
														<li
															className={
																pathname.includes("admin/employee")
																	? "active"
																	: ""
															}
														>
															<Link to="/admin/employees">Employees</Link>
														</li>
														<li
															className={
																pathname.includes("admin/add-employee")
																	? "active"
																	: ""
															}
														>
															<Link to="/admin/add-employee">Add Employee</Link>
														</li>
													</>
												)}
												<li
													className={
														pathname.includes("admin/customer") ? "active" : ""
													}
												>
													<Link to="/admin/customers">Customers</Link>
												</li>
												<li
													className={
														pathname.includes("admin/add-customer")
															? "active"
															: ""
													}
												>
													<Link to="/admin/add-customer">Add Customer</Link>
												</li>
												<li
													className={
														pathname.includes("admin/services") ? "active" : ""
													}
												>
													<Link to="/admin/services">Services</Link>
												</li>
												<li
													className={
														pathname.includes("admin/orders") ? "active" : ""
													}
												>
													<Link to="/admin/orders">Orders</Link>
												</li>
												<li
													className={
														pathname.includes("admin/new-order") ? "active" : ""
													}
												>
													<Link to="/admin/new-order">New Order</Link>
												</li>
												<li
													className={
														pathname.includes(`admin/product`) ||
														pathname.includes(`admin/update-product`)
															? "active"
															: ""
													}
												>
													<Link to="/admin/products">Products</Link>
												</li>
												<li
													className={
														pathname.includes("admin/new-product")
															? "active"
															: ""
													}
												>
													<Link to="/admin/new-product">New Product</Link>
												</li>
												<li
													className={
														pathname.includes("admin/ria") ? "active" : ""
													}
												>
													<Link to="/admin/ria">Ria Service</Link>
												</li>
												<li
													className={
														pathname.includes("admin/rent") ? "active" : ""
													}
												>
													<Link to="/admin/rent">Rent/Housing</Link>
												</li>
											</ul>
										)}
									</>
								) : (
									<ul className="service-lists">
										<li className="allservice">
											<Link to="#">
												Admin Menu
												<i className="fa fa-cog" aria-hidden="true"></i>
											</Link>
										</li>
										<li>
											<Link to="/admin">Dashboard</Link>
										</li>
										{isAdmin && (
											<>
												<li
													className={
														pathname.includes("admin/employee") ? "active" : ""
													}
												>
													<Link to="/admin/employees">Employees</Link>
												</li>
												<li
													className={
														pathname.includes("admin/add-employee")
															? "active"
															: ""
													}
												>
													<Link to="/admin/add-employee">Add Employee</Link>
												</li>
											</>
										)}
										<li
											className={
												pathname.includes("admin/customer") ? "active" : ""
											}
										>
											<Link to="/admin/customers">Customers</Link>
										</li>
										<li
											className={
												pathname.includes("admin/add-customer") ? "active" : ""
											}
										>
											<Link to="/admin/add-customer">Add Customer</Link>
										</li>
										<li
											className={
												pathname.includes("admin/services") ? "active" : ""
											}
										>
											<Link to="/admin/services">Services</Link>
										</li>
										<li
											className={
												pathname.includes("admin/orders") ? "active" : ""
											}
										>
											<Link to="/admin/orders">Orders</Link>
										</li>
										<li
											className={
												pathname.includes("admin/new-order") ? "active" : ""
											}
										>
											<Link to="/admin/new-order">New Order</Link>
										</li>
										<li
											className={
												pathname.includes(`admin/product`) ||
												pathname.includes(`admin/update-product`)
													? "active"
													: ""
											}
										>
											<Link to="/admin/products">Products</Link>
										</li>
										<li
											className={
												pathname.includes("admin/new-product") ? "active" : ""
											}
										>
											<Link to="/admin/new-product">New Product</Link>
										</li>
										<li
											className={pathname.includes("admin/ria") ? "active" : ""}
										>
											<Link to="/admin/ria">Ria Service</Link>
										</li>
										<li
											className={
												pathname.includes("admin/rent") ? "active" : ""
											}
										>
											<Link to="/admin/rent">Rent/Housing</Link>
										</li>
									</ul>
								)}
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

export default AdminMenu;
