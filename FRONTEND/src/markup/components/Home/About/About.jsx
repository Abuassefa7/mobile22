import React from "react";
// import aboutImage1 from "../../../assets/images/home/about1.jpg";
import aboutImage1 from "../../../../assets/images/home/about/about44.jpg";
import aboutImage2 from "../../../../assets/images/home/about/about22.jpg";
import aboutImage3 from "../../../../assets/images/home/about/about66.jpg";
import { FaHeadset, FaLaptopMedical } from "react-icons/fa";

function About() {
	return (
		<div>
			<section className="about-us-area">
				<div className="container">
					<div className="row">
						<div className="col-md-6">
							<div className="about-content">
								<div className="sec-title-two">
									<h1>About Us</h1>
									<span className="border"></span>
								</div>
								<ul className="before-after-img">
									<li>
										<div className="img-holder">
											<img src={aboutImage1} alt="Awesome Image" />
										</div>
									</li>
									<li>
										<div className="img-holder">
											<img src={aboutImage2} alt="Awesome Image" />
										</div>
									</li>
									<li>
										<div className="img-holder">
											<img src={aboutImage3} alt="Awesome Image" />
										</div>
									</li>
								</ul>
								<div className="text-holder">
									<p>
										Our mission is to bring professionalism, exceptional
										service, and trust to the electronics repair industry. We
										take immense pride in providing top-quality repair services
										for your phones and other electronic devices. Save time and
										money with our premium electronics repair services.
									</p>
									<h3>
										Save time, Save money, With Quality electronics Repair
										Service, <span>LINKTECH WIRELESS INC</span>
									</h3>
								</div>
							</div>
						</div>
						<div className="col-md-6">
							<div className="choose-us-content">
								<div className="sec-title-two">
									<h1>Why Choose Us</h1>
									<span className="border"></span>
								</div>
								<ul>
									<li>
										<div className="iocn-holder">
											<span className="order-icons2">
												<FaLaptopMedical />
											</span>
										</div>
										<div className="text-holder">
											<h4>Free Diagnostics</h4>
											<p>
												We offer a quick and easy way to check the setup of your
												mobile phones, desktops, laptops, accessories, and more.
												Our service is completely free of charge.
											</p>
										</div>
									</li>
									<li>
										<div className="iocn-holder">
											<span className="flaticon-wrench"></span>
										</div>
										<div className="text-holder">
											<h4>Quick Repair Process</h4>
											<p>
												We provide a fast and convenient repair process through
												our expert teams. Look for the phone symbol in the top
												left corner of your screen to get started.
											</p>
										</div>
									</li>
									<li>
										<div className="iocn-holder">
											<span className="order-icons2">
												<FaHeadset />
											</span>
										</div>
										<div className="text-holder">
											<h4>Customer Support</h4>
											<p>
												Our tech support service stands out as one of the best
												in the industry. We offer quality assistance at any time
												during our working hours.
											</p>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

export default About;
