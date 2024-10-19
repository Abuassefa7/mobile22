import React from "react";
import { Link } from "react-router-dom";
// import imge from "./../../../../assets/images/Logo/footer-logo.png";
import imge from "./../../../assets/images/Logo/foooterlogoblack2.png";
function Footer(props) {
	//
	return (
		<>
			<footer className="footer-area">
				<div className="container">
					<div className="row">
						{/* Start single footer widget */}
						<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
							<div className="single-footer-widget pd-bottom">
								<div className="footer-logo">
									<Link to="/">
										<img src={imge} alt="Awesome Footer Logo" />
									</Link>
								</div>
								<div className="repairplus-info">
									<p className="top">
										Linktech Wireless brings many years of electronics repair
										experience right to your device. Our technicians are
										equipped to provide solutions that work best for you.
									</p>
									<p>
										Our commitment is to bring professionalism, exceptional
										service, and trust to the electronics repair and maintenance
										industry.
									</p>
									<div className="button more">
										<Link className="thm-btn bg-1 " to={"/aboutUs"}>
											Read More...
										</Link>
									</div>
								</div>
							</div>
						</div>
						{/* End single footer widget */}
						<div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 mr-5">
							<div className="footer-widget m">
								<div className="row m">
									{/* Start single footer widget */}
									<div className="col-lg-6 col-md-4 col-sm-12 ">
										<div className="single-footer-widget service ">
											<div className="title">
												<h3>Our Services</h3>
											</div>
											<ul className="services-list">
												<li>
													<Link to="/services/phone-repair">
														Smart Phone Repair
													</Link>
												</li>
												<li>
													<Link to="/services/t&i-repair">
														Tablets & iPad Repair
													</Link>
												</li>
												<li>
													<Link to="/services/l&m-repair">
														Laptop & Mac Repair
													</Link>
												</li>

												<li>
													<Link to="/info">Ria Money Transfer</Link>
												</li>
												<li>
													<Link to="/services">All Services</Link>
												</li>
											</ul>
										</div>
									</div>
									{/* <Start single footer widget */}

									{/* Start single footer widget */}
									<div className="col-lg-6 col-md-4 col-sm-12 ">
										<div className="single-footer-widget service ">
											<div className="title">
												<h3>Contact Info</h3>
											</div>
											<ul className="footer-contact-info ">
												<li>
													<div className="icon-holder ">
														<span className="flaticon-home-page "></span>
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
														<span className="flaticon-call-answer"></span>
													</div>
													<div className="text-holder">
														<h5>
															<span>Call Us</span>
															<br />
															+1720 748 7909
														</h5>
													</div>
												</li>
												<li>
													<div className="icon-holder">
														<span className="flaticon-envelope"></span>
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
														<span className="flaticon-clock"></span>
													</div>
													<div className="text-holder">
														<h5>
															<span>Opening Time</span>
															<br />
															Mon - Sat: 10.00am to 7.00pm
														</h5>
													</div>
												</li>
											</ul>
										</div>
									</div>
									{/* End single footer widget */}
								</div>
							</div>
						</div>
					</div>
					{/* Start footer botton */}
					<div className="row">
						<div className="col-md-12">
							<div className="footer-bottom">
								<div className="copyright-text pull-left">
									<p>
										Copyrights © {new Date().getFullYear()} All Rights Reserved
										by <Link to="/">LinkTech Wireless</Link>
									</p>
								</div>
								<div className=" col-lg-4  payment-method pull-right">
									<ul>
										<li>
											<Link
												to={
													"https://www.facebook.com/profile.php?id=100008185592902&mibextid=LQQJ4d"
												}
											>
												<i className="fa fa-facebook" aria-hidden="true"></i>
											</Link>
										</li>
										<li>
											<Link to="#">
												{/* <i className="fa fa-twitter" aria-hidden="true"></i> */}
											</Link>
										</li>

										<li>
											<Link to="#">
												{/* <i className="fa fa-linkedin" aria-hidden="true"></i> */}
											</Link>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
					{/* End footer botton */}
				</div>
			</footer>
			{/* End footer area  */}
			<div className="scroll-to-top scroll-to-target">
				<span className="fa fa-angle-up"></span>
			</div>
			{/* Scroll to top */}
		</>
	);
}

export default Footer;
