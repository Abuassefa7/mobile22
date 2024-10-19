import React from "react";
import factCounterImage from '../../../../assets/images/home/factCounter/fact-counter.png'
function FactCounter() {
	return (
		<div>
			{" "}
			{/* <!--Start fact counter area--> */}
			<section
				className="fact-counter-area"
				style={{ backgroundImage: `url(${factCounterImage})` }}
			>
				<div className="container">
					<div className="row">
						{/* <!--Start single item--> */}
						<div className="col-md-3 col-sm-6 col-xs-12">
							<div className="single-item text-center">
								<h1>
									<span
										className="timer"
										data-from="1"
										data-to="2456"
										data-speed="5000"
										data-refresh-interval="50"
									>
										Various
									</span>
								</h1>
								<span className="border"></span>
								<h3>Mobiles Repaired</h3>
							</div>
						</div>
						{/* <!--End single item--> */}
						{/* <!--Start single item--> */}
						<div className="col-md-3 col-sm-6 col-xs-12">
							<div className="single-item text-center">
								<h1>
									<span
										className="timer"
										data-from="1"
										data-to="146"
										data-speed="5000"
										data-refresh-interval="50"
									>
										We have
									</span>
								</h1>
								<span className="border"></span>
								<h3>Expert Technicians</h3>
							</div>
						</div>
						{/* <!--End single item--> */}
						{/* <!--Start single item--> */}
						<div className="col-md-3 col-sm-6 col-xs-12">
							<div className="single-item text-center">
								<h1>
									<span
										className="timer"
										data-from="1"
										data-to="853"
										data-speed="5000"
										data-refresh-interval="50"
									>
										We value
									</span>
								</h1>
								<span className="border"></span>
								<h3>Our Customers</h3>
							</div>
						</div>
						{/* <!--End single item--> */}
						{/* <!--Start single item--> */}
						<div className="col-md-3 col-sm-6 col-xs-12">
							<div className="single-item text-center">
								<h1>
									<span
										className="timer"
										data-from="1"
										data-to="2381"
										data-speed="5000"
										data-refresh-interval="50"
									>
										We Repair
									</span>
								</h1>
								<span className="border"></span>
								<h3>Desktop Aswell</h3>
							</div>
						</div>
						{/* <!--End single item--> */}
					</div>
				</div>
			</section>
			{/* <!--End fact counter area--> */}
		</div>
	);
}

export default FactCounter;
