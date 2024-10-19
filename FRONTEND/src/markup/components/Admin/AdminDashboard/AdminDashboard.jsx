import React from "react";
import backgroundImage from "../../../../assets/images/home/banner/slideimg1.jpg";
import { Link } from "react-router-dom";
// import { FaUserGroup } from "react-icons/fa";
import { LuUsers2 } from "react-icons/lu";
import { FaUsers } from "react-icons/fa";
import { useAuth } from "../../../../Contexts/AuthContext";

function AdminDashboard() {
	const { employee,isAdmin } = useAuth();
	// for grreting the employee
	 const currentHour = new Date().getHours();

		let greeting;
		if (currentHour < 12) {
			greeting = "Good morning 😃";
		} else if (currentHour < 18) {
			greeting = "Good afternoon 😃";
		} else {
			greeting = "Good evening 😃";
		}
	return (
		<div>
			<section
				className="categories-area "
				style={{ backgroundImage: `url(${backgroundImage})` }}
			>
				<div className="container">
					<div className="sec-title text-center">
						<h1>
							{greeting}{" "}
							<i className="employee-name"> {employee?.employee_first_name}</i>{" "}
							<br />
							<br /> to Admin Dashboard
						</h1>
					</div>
					<div className="row dashboard-list">
						{isAdmin && (
							<Link
								to={`/admin/employees`}
								className="col-md-4 col-sm-6 col-xs-12"
							>
								<div className="single-item">
									<div className="icon-holder">
										<div className="icon-box">
											<div className="icon">
												<span className="flaticon-heart"></span>
											</div>
										</div>
									</div>
									<div href="#" className="text-holder">
										<h5>Employees</h5>
										<p>Link tech employees list</p>
										<p>Add new employee</p>
									</div>
								</div>
							</Link>
						)}

						<Link
							to={`/admin/customers`}
							className="col-md-4 col-sm-6 col-xs-12"
						>
							<div className="single-item">
								<div className="icon-holder">
									<div className="icon-box">
										<div className="icon">
											<span className="flaticon-customer-support"></span>
										</div>
									</div>
								</div>
								<div className="text-holder">
									<h5>Customers</h5>
									<p>Link tech customers</p>
									<p>Add new customer</p>
								</div>
							</div>
						</Link>

						<Link
							to={`/admin/services`}
							className="col-md-4 col-sm-6 col-xs-12"
						>
							<div className="single-item">
								<div className="icon-holder">
									<div className="icon-box">
										<div className="icon">
											<span className="flaticon-settings"></span>
										</div>
									</div>
								</div>
								<div className="text-holder">
									<h5>Repair Services</h5>
									<p>Repair service lists</p>
									<p>Add new repair service</p>
								</div>
							</div>
						</Link>

						<Link to={`/admin/orders`} className="col-md-4 col-sm-6 col-xs-12">
							<div className="single-item">
								<div className="icon-holder">
									<div className="icon-box">
										<div className="icon">
											<span className="flaticon-wrench"></span>
										</div>
									</div>
								</div>
								<div className="text-holder">
									<h5>Orders</h5>
									<p>Completed and inprogress orders</p>
									<p>Add new order</p>
								</div>
							</div>
						</Link>

						<Link
							to={`/admin/products`}
							className="col-md-4 col-sm-6 col-xs-12"
						>
							<div className="single-item">
								<div className="icon-holder">
									<div className="icon-box">
										<div className="icon">
											<span className="flaticon-technology-1"></span>
										</div>
									</div>
								</div>
								<div className="text-holder">
									<h5>Products</h5>
									<p>Available Electronic Products in our store</p>
									<p>Add new product</p>
								</div>
							</div>
						</Link>
						<Link
							to={`/admin/ria`}
							className="col-md-4 col-sm-6 col-xs-12"
						>
							<div className="single-item">
								<div className="icon-holder">
									<div className="icon-box">
										<div className="icon">
											<span className="flaticon-technology-2"></span>
										</div>
									</div>
								</div>
								<div className="text-holder">
									<h5>Ria Services</h5>
									<p>Ria Money Transfer services</p>
									<p>Add new ria rate</p>
								</div>
							</div>
						</Link>
						<Link
							to={`/admin/rent`}
							className="col-md-4 col-sm-6 col-xs-12"
						>
							<div className="single-item">
								<div className="icon-holder">
									<div className="icon-box">
										<div className="icon">
											<span className="flaticon-technology-2"></span>
										</div>
									</div>
								</div>
								<div className="text-holder">
									<h5> Housing rent Service</h5>
									<p>House renting services</p>
									<p>Add new rent record</p>
								</div>
							</div>
						</Link>
					</div>
					<br />
					<br />
				</div>
			</section>
		</div>
	);
}

export default AdminDashboard;
