import React from "react";
import contactimg from "../../../assets/images/home/contact/imgcontact2.png";
import CommonBanner from "../CommonBanner/CommonBanner";

function ContactUs() {
	return (
		<React.Fragment>
			{/* Start breadcrumb area */}
			<CommonBanner title="Contact" />
			{/* End breadcrumb area */}

			{/* Start contact area */}
			<section className="contact-area">
				<div className="container">
					<div className="row h">
						<div className="col-md-6 col-sm-12 ">
							<div className="contact-info">
								<div className="title">
									<h2>Contact Details</h2>
								</div>
								<div className="accordion-box">
									{/* Start single accordion box */}
									<div className="accordion accordion-block">
										<div className="accord-btn active">
											<h4>Our Address</h4>
										</div>
										<div className="accord-content collapsed">
											<ul className="contact-info-list">
												<li>
													<div className="icon-holder">
														<span className="flaticon-home-page" />
													</div>
													<div className="text-holder">
														<h5>
															<span>13690, E Iliff Ave,</span>
															<br /> Aurora CO,USA 80014
														</h5>
													</div>
												</li>
												<li>
													<div className="icon-holder">
														<span className="flaticon-call-answer" />
													</div>
													<div className="text-holder">
														<h5>
															<span>Call Us</span>
															<br />
															+720 748 7909
														</h5>
													</div>
												</li>
												<li>
													<div className="icon-holder">
														<span className="flaticon-envelope" />
													</div>
													<div className="text-holder">
														<h5>
															<span>Mail Us</span>
															<br />
															Mylinktech@gmail.com
														</h5>
													</div>
												</li>
												<li>
													<div className="icon-holder">
														<span className="flaticon-clock" />
													</div>
													<div className="text-holder">
														<h5>
															<span>Opening Time</span>
															<br />
															Mon - Sat: 09.00am to 19.00pm
														</h5>
													</div>
												</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-md-6 col-sm-12 ">
							<div className="imgee">
								<img src={contactimg} alt="Contact Us" />
							</div>
						</div>
					</div>
					<section className="google-map-area">
						<iframe
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3070.902970587509!2d-104.8346421240255!3d39.674397171568565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x876c881ce918cea7%3A0xf1c2a1844685f731!2s13690%20E%20Iliff%20Ave%2C%20Aurora%2C%20CO%2080014!5e0!3m2!1sen!2sus!4v1717353132835!5m2!1sen!2sus"
							width="50%"
							height="375"
							allowfullscreen=""
							style={{ border: 0, width: "100%" }}
							allowFullScreen
						/>
					</section>
				</div>
			</section>
			{/* End contact area */}
		</React.Fragment>
	);
}

export default ContactUs;
