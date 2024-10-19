import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { RiContactsFill } from "react-icons/ri";
import {
	FaLaptop,
	FaHandPointer,
	FaWindowClose,
	FaInfoCircle,
} from "react-icons/fa";
import orderService from "../../../services/order.service";
import CommonBanner from "../CommonBanner/CommonBanner";
import { useAuth } from "../../../Contexts/AuthContext";

function OrderDetail() {
	const { order_hash } = useParams();
	const [apiError, setApiError] = useState(false);
	const [order, setOrder] = useState({});
	const [orderStatus, setOrderStatus] = useState({});
	const { isSticky, isMobile } = useAuth();

	function OrderStatusDisplay(orderStatus) {
		let displayStatus;

		// Check the order status and creation/update timestamps to determine the display status
		if (orderStatus?.order_status === "Received") {
			displayStatus = "Received";
		} else if (orderStatus?.order_status === "InProgress") {
			// Check if the order was updated (moved to "In Progress") or is still in the "Received" state
			displayStatus = "InProgress";
		} else {
			displayStatus = "Completed";
		}
		return displayStatus;
	}
	const status = OrderStatusDisplay(orderStatus);

	useEffect(() => {
		const singleOrderHash = orderService.getOrderHash(order_hash);
		singleOrderHash
			.then((res) => {
				if (!res.ok) {
					console.log(res.status);
					setApiError(true);
				}
				return res.json();
			})
			.then((data) => {
				if (data.length !== 0) {
					setOrder(data);
					setOrderStatus(data.order);
					OrderStatusDisplay(orderStatus);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	return (
		<div className="customerprofile">
			<CommonBanner title="Order Details" />
			<section className="categories-area product-back ">
				<div className="row  inner-wrapper ">
					<h2 className="col-md-4 col-sm-6 col-xs-12 text">Order Details</h2>{" "}
					<h4 className=" col-md-4 col-sm-6 col-xs-12 ">
						<span className="order-status-done">
							Order Number : {order?.order?.order_number}{" "}
						</span>
					</h4>
					<h4 className="col-md-4 col-sm-6 col-xs-12 text ">
						Order Status:{" "}
						<span
							className={
								order.order?.order_status === "Received" ||
								order.order?.order_status === "InProgress"
									? "order-status-inprogress"
									: "order-status-done"
							}
						>
							{status}
						</span>
					</h4>
					<br />
					<p className="col-md-10 ">
						You can track the progress of your order using this page.We will
						constantly update this page to let you know how we are
						progressing.As soon as we are done with the order, the status will
						turn green. That means,your car is ready for pickup.
					</p>
				</div>

				<br />
				<div className="row inner-wrapper">
					{/* <!--Start single item--> */}

					<div className="col-md-5 col-sm-12 col-xs-12 ">
						<div className="single-item customerinfo">
							<div className="icon-holder">
								<div className="icon-box ">
									<div className="icon icon-text">
										{/* <span className="flaticon-user"></span> */}
										<span className="userinfo order-icons">
											<RiContactsFill />
										</span>
									</div>
								</div>
							</div>
							<div className="text-holder">
								<h4 className="order-text1">
									First Name: {order?.customer?.customer_first_name}
								</h4>
								<p></p>
								<h6 className="order-text1">
									Last Name: {order?.customer?.customer_last_name}
								</h6>
								<p></p>
								{!isMobile && (
									<h6 className="order-text2">
										Email: {order?.customer?.customer_email}
									</h6>
								)}{" "}
								<p></p>
								<h6 className="order-text2">
									Phone :{order?.customer?.customer_phone_number}
								</h6>{" "}
								<p></p>
							</div>
						</div>
					</div>
					<div className="col-md-5 col-sm-12 col-xs-12">
						<div className="single-item customerinfo">
							<div className="icon-holder">
								<div className="icon-box">
									<div className="icon icon-text">
										{/* <span className="flaticon-apple-logo"></span> */}
										<span className="userinfo order-icons">
											<FaLaptop />
										</span>
									</div>
								</div>
							</div>
							<div className="text-holder">
								<h4 className="order-text1">
									Device Type: {order?.device?.device_type}
								</h4>
								<p></p>
								<h6 className="order-text1">
									Device Make: {order?.device?.device_make}
								</h6>
								<p></p>
								<h6 className="order-text2">
									Device Model: {order?.device?.device_model}
								</h6>{" "}
								<p></p>
								{!isMobile && (
									<h6 className="order-text2">
										Serial Number :{order?.device?.device_serial_number}
									</h6>
								)}{" "}
								<p></p>
								<h6 className="order-text2">
									Device Color :{order?.device?.device_color}
								</h6>{" "}
								<p></p>
							</div>
						</div>
					</div>

					{/* <!--End single item--> */}
					<div className="col-md-10 col-sm-12 col-xs-12 ">
						<div className="single-item-srvice customerinfo  ">
							<div className="icon-holder">
								<div className="icon-box">
									<div className="icon icon-text">
										{/* <span className="flaticon-apple-logo"></span> */}
										<span className="userinfo flaticon-wrench "></span>
									</div>
								</div>
							</div>
							<div className="text-holder">
								{order?.service?.map((service, i) => (
									<span key={i}>
										<h4 className="order-text2 ">{service.service_name}</h4>
										<div className="row  ">
											<div className="col-md-10 ">
												{service.service_description}
											</div>
											<div className="col-md-2 ">
												<span
													className={`
											${!service.service_completed ? "order-status-inprogress" : "order-status-done"}
										`}
												>
													{service.service_completed
														? "Completed "
														: "InProgress "}
												</span>
											</div>
										</div>
										<hr className="line" />
									</span>
								))}
							</div>
						</div>
					</div>
					<div className="col-md-10 col-sm-12 col-xs-12">
						<div className=" single-item customerinfo">
							<div className="icon-holder">
								<div className="icon-box">
									<div className="icon icon-text">
										{/* <span className="flaticon-apple-logo"></span> */}
										<span className="userinfo order-icons ">
											<FaInfoCircle />
										</span>
									</div>
								</div>
							</div>
							<div className="text-holder">
								<h6 className="order-text2">
									Order Date:{" "}
									{new Date(order?.order?.order_date).toLocaleDateString()}
								</h6>
								<p></p>
								<h6 className="order-text2">
									{order?.order?.completion_date
										? `Completion Date: ${new Date(
												order.order.completion_date
										  ).toLocaleDateString()}`
										: `Estimated Completion Date: ${new Date(
												order?.order?.estimated_completion_date
										  ).toLocaleDateString()}`}
								</h6>
								<p></p>
								<h6 className="order-text2">
									Total Price :{order?.order?.order_total_price}
								</h6>{" "}
								<p></p>
							</div>
						</div>
					</div>
				</div>
				<h3 className="last-text">Thank you for choosing us!!</h3>
			</section>
		</div>
	);
}

export default OrderDetail;
