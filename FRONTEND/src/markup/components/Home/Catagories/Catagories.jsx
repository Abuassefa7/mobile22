import React from "react";
import catagoriesimage from "../../../../assets/images/home/catagories/categories.png";
import { FaMobileAlt, FaWifi, FaTools } from "react-icons/fa";

function Catagories() {
	return (
		<div>
			<section
				className="categories-area"
				style={{ backgroundImage: `url(${catagoriesimage})` }}
			>
				<div className="container">
					<div className="sec-title text-center">
						<h1>Our Priorities</h1>
					</div>
					<div className="row">
						{/* <!--Start single item--> */}
						<div className="col-md-4 col-sm-12 col-xs-12">
							<div className="single-item categories-text">
								<div className="icon-holder">
									<div className="icon-box">
										<div className="icon">
											<span className="order-icons">
												<FaTools />
											</span>
										</div>
									</div>
								</div>
								<div className="text-holder">
									<h5>Electronics Repair </h5>
									<p>
										Breathe New Life Into Your Tech Experts repair phones,
										laptops, and more, saving you costly replacements. Get your
										tech back in top shape, fast.
									</p>
								</div>
							</div>
						</div>
						{/* <!--End single item--> */}
						{/* <!--Start single item--> */}
						<div className="col-md-4 col-sm-12 col-xs-12">
							<div className="single-item categories-text">
								<div className="icon-holder">
									<div className="icon-box">
										<div className="icon">
											<span className="order-icons">
												<FaMobileAlt />
											</span>
										</div>
									</div>
								</div>
								<div className="text-holder">
									<h5>Phone and Accessary Sales</h5>
									<p>
										Power Up Your Mobile Life. Find the perfect phone and
										accessories. Browse our latest smartphones and essential
										add-ons to keep you connected and protected on the go.
									</p>
								</div>
							</div>
						</div>
						{/* <!--End single item--> */}
						{/* <!--Start single item--> */}
						<div className="col-md-4 col-sm-12 col-xs-12">
							<div className="single-item categories-text">
								<div className="icon-holder">
									<div className="icon-box">
										<div className="icon">
											<span className="order-icons">
												<FaWifi />
											</span>
										</div>
									</div>
								</div>
								<div className="text-holder">
									<h5>Phone Plans & Ria Money </h5>
									<p>
										Get a reliable prepaid plan to power your phone. Use our Ria
										money transfer to send funds safely worldwide. Connectivity
										and global money solutions in one place.
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

export default Catagories;
