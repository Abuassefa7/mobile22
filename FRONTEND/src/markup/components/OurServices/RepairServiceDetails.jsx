import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../../Contexts/AuthContext";

function RepairServiceDetails({ titles, images, texts }) {
	let location = useLocation();
	let url = location.pathname;
	const { isSticky, isMobile } = useAuth();
	let [activeClassName, setactiveClassName] = useState(null);
	let items = [
		{
			links: "/services/",
			content: "View All Services",
			tag: <i className="fa fa-cog"></i>,
		},
		{ links: "/services/phone-repair", content: "Smartphone Repair" },
		{ links: "/services/t&i-repair", content: "Tablet & iPad Repair" },
		{ links: "/services/l&m-repair", content: "Laptop & Mac Repair" },
	];

	const handleClick = (index) => {
		setactiveClassName(index);
	};

	return (
		<div className={isSticky ? `under-header-margin` : ""}>
			<section className="breadcrumb-area">
				<div className="container text-center">
					<h1>{titles.title1}</h1>
				</div>
			</section>
			<section className="breadcrumb-botton-area">
				<div className="container">
					<div className="left pull-left">
						<ul>
							<li>
								<Link to={"/"}>Home</Link>
							</li>
							<li>
								<i className="fa fa-caret-right" aria-hidden="true"></i>
							</li>
							<li>
								<Link to={"/services"}>Services</Link>
							</li>
							<li>
								<i className="fa fa-caret-right" aria-hidden="true"></i>
							</li>
							<li>Services Single</li>
						</ul>
					</div>
					<div className="right pull-right">
						<Link to={"/about-us"}>
							<i className="fa fa-wrench" aria-hidden="true"></i>View More About
							US
						</Link>
					</div>
				</div>
			</section>

			{/* Start service single area */}
			<section id="service-single-area" className="smartphone-repair-area">
				<div className="container">
					<div className="row">
						<div className="col-md-9 col-sm-12 col-xs-12 pull-right">
							<div className="service-single-content">
								<div className="row top-content">
									<div className="col-md-5 col-sm-12 col-xs-12">
										<div className="img-holder">
											<img src={images[0]} alt="Awesome Image" />
										</div>
									</div>
									<div className="col-md-7 col-sm-12 col-xs-12">
										<div className="text-holder">
											<div className="title">
												<h2>{titles.title2}</h2>
											</div>
											<div className="text-holder">{texts.p1}</div>
										</div>
									</div>
								</div>
								<div className="row middle-content">
									<div className="col-md-7">
										<div className="text-holder">
											<div className="title">
												<h2>{titles.title3}</h2>
											</div>
											<div className="text-holder">{texts.p2}</div>
										</div>
									</div>
									<div className="col-md-5">
										<div className="img-holder">
											<img src={images[1]} alt="Awesome Image" />
											<div className="button">
												<a href="#">Before</a>
											</div>
										</div>
									</div>
								</div>
								<div className="row bottom-content">
									<div className="col-md-5">
										<div className="img-holder">
											<img src={images[2]} alt="Awesome Image" />
											<div className="button">
												<a href="#">After</a>
											</div>
										</div>
									</div>
									<div className="col-md-7">
										<div className="text-holder">{texts.p3}</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-md-3 col-sm-7 col-xs-12 pull-left">
							<div className="service-single-sidebar">
								<ul className="service-lists">
									{items.map((item, index) => (
										<li
											onClick={() => handleClick(index)}
											className={
												(activeClassName === index ? "active" : "",
												url === item.links ? "active" : "")
											}
										>
											<Link to={`${item.links}`}>
												{item.content} <span className="icon">{item.tag}</span>
											</Link>
										</li>
									))}
								</ul>

								<div className="repair-time">
									<h3>
										Repair Less Than
										<br /> 60 Minutes!
									</h3>
									<Link className="thm-btn bg-1" to={"/contact-us"}>
										Our Address
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

export default RepairServiceDetails;
