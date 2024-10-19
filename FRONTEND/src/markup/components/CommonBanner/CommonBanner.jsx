import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../Contexts/AuthContext";
import { FaPhoneAlt } from "react-icons/fa";

function CommonBanner({ title }) {
	// for sticky header
	const { isSticky } = useAuth();
	return (
		<div className={isSticky ? `under-header-margin` : ""}>
			<section className="breadcrumb-area">
				<div className="container text-center">
					<h1>{title}</h1>
				</div>
			</section>
			{/* Start breadcrumb bottom area */}
			<section className="breadcrumb-botton-area">
				<div className="container">
					<div className="left pull-left">
						<ul>
							<li>
								<Link to={"/"}>Home</Link>
							</li>
							<li>
								<i className="fa fa-caret-right" aria-hidden="true" />
							</li>
							<li>{title}</li>
						</ul>
					</div>
					{title === "services" && (
						<div className="right pull-right">
							<a href="#">
								<i className="fa fa-arrow-down" aria-hidden="true"></i>Click on
								each service below to view details
							</a>
						</div>
					)}
					{title === "products" && (
						<div className="right pull-right">
							<Link to={"/contact"}>
								<span className="order-icons3" aria-hidden="true">
									<FaPhoneAlt />
								</span>
								need help ?
							</Link>
						</div>
					)}
				</div>
			</section>
			{/* End breadcrumb bottom area */}
		</div>
	);
}

export default CommonBanner;
