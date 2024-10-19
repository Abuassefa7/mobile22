import React from "react";
import { Link } from "react-router-dom";

function VisitUs() {
	return (
		<div className="col-md-6 col-sm-12 col-xs-12">
			<div className="appoinment ">
				<div className="sec-title-two">
					<h1>Visit Our Repair Shop</h1>
					<span className="border"></span>
				</div>
				<div className="location-box" style={{ textAlign: "justify" }}>
					<p>
						Our conveniently located mobile and electronics repair shop is
						staffed by a team of experienced technicians dedicated to providing
						fast, reliable, and affordable service for all your device needs.
						Whether you require a smartphone screen repair, laptop servicing, or
						any other electronic device fixed, we've got you covered.
					</p>
					<p>
						Our skilled technicians leverage state-of-the-art facilities and the
						latest tools to quickly diagnose and repair a wide range of devices.
						Driven by expertise and a commitment to customer satisfaction, we
						deliver personalized service to get your electronics running like
						new.
					</p>
					<p>
						Stop by our shop and let us demonstrate our expertise. Whether you
						need a simple fix or a complex repair, we have the knowledge, tools,
						and resources to get the job done right. Experience the convenience
						and peace of mind of choosing a trusted partner for all your
						electronic device needs.
					</p>
					<div className="single-shop-content">
						<div className="content-box">
							<div className="addto-cart-box text-center">
								<Link to={"/contact"}>
									<button className="addtocart thm-btn bg-1 " type="submit">
										Contact Us
									</button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default VisitUs;
