import React from "react";
import smartphoneImage from "../../../../assets/images/home/action/phone-repair-2.jpg";
import tabletImage from "../../../../assets/images/home/action/tablet-repair-1.jpg";
import laptopImage from "../../../../assets/images/home/action/laptop.jpg";
import { Link } from "react-router-dom";

function Action() {
	return (
		<div>
			<section className="call-to-action-area">
				<div className="container">
					<div className="row">
						{/* <!--Start single item--> */}
						<div className="col-md-4">
							<div className="single-item text-center">
								<Link to="/services/phone-repair">
									<h5>Smart phone Repair</h5>
								</Link>
								<div className="img-holder">
									<img src={smartphoneImage} alt="Awesome Image" />
									<div className="overlay">
										<div className="box">
											<div className="content">
												<Link to="/services/phone-repair">
													<i className="fa fa-link" aria-hidden="true"></i>
												</Link>
											</div>
										</div>
									</div>
								</div>
								<div className="text-holder">
									<p>
										We specialise in Phone repairs for Apple iPhones, Samsung,
										Galaxy, Sony, HTC, Nexus, Motorola, and Blackberry.
									</p>
								</div>
							</div>
						</div>
						{/* <!--End single item--> */}
						{/* <!--Start single item--> */}
						<div className="col-md-4">
							<div className="single-item text-center">
								<Link to="/services/t&i-repair">
									<h5>Tablets & Ipad Repair</h5>
								</Link>
								<div className="img-holder">
									<img src={tabletImage} alt="Awesome Image" />
									<div className="overlay">
										<div className="box">
											<div className="content">
												<Link to="/services/t&i-repair">
													<i className="fa fa-link" aria-hidden="true"></i>
												</Link>
											</div>
										</div>
									</div>
								</div>
								<div className="text-holder">
									<p>
										If you are experiencing any issues with your tablets or
										iPads, please refer to the categories listed below to find
										the appropriate solution.
									</p>
								</div>
							</div>
						</div>
						{/* <!--End single item--> */}
						{/* <!--Start single item--> */}
						<div className="col-md-4">
							<div className="single-item text-center">
								<Link to="/services/l&m-repair">
									<h5>Desktop & Laptop Repair</h5>
								</Link>
								<div className="img-holder">
									<img src={laptopImage} alt="Awesome Image" />
									<div className="overlay">
										<div className="box">
											<div className="content">
												<Link to="/services/l&m-repair">
													<i className="fa fa-link" aria-hidden="true"></i>
												</Link>
											</div>
										</div>
									</div>
								</div>
								<div className="text-holder">
									<p>
										We specialize in providing laptop and desktop computer
										repair services and network support for businesses of all
										sizes.
									</p>
								</div>
							</div>
						</div>
						{/* <!--End single item--> */}
					</div>
				</div>
			</section>
		</div>
	);
}

export default Action;
