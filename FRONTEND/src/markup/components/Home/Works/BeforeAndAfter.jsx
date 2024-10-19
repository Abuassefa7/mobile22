import React from "react";

import beforeRepair1 from "../../../../assets/images/home/works/before-1.jpg";
import beforeRepair2 from "../../../../assets/images/home/works/before-2.jpg";
import beforeRepair3 from "../../../../assets/images/home/works/tv-before.png";
import beforeRepair4 from "../../../../assets/images/home/works/before-1.jpg";
import afterRepair1 from "../../../../assets/images/home/works/after-1.jpg";
import afterRepair2 from "../../../../assets/images/home/works/after-2.jpg";
import afterRepair3 from "../../../../assets/images/home/works/tv-after.png";
import afterRepair4 from "../../../../assets/images/home/works/after-1.jpg";
import VisitUs from "../VisitUs/VisitUs";

function BeforeAndAfter() {
	return (
		<div>
			<section className="appoinment-area">
				<div className="container">
					<div className="row">
						<div className="col-md-6 col-sm-12 col-xs-12">
							<div className="products">
								<div className="sec-title-two">
									<h1>Works Before & After</h1>
									<span className="border"></span>
								</div>
								<div className="row ">
									{/* <!--Start single item--> */}
									<div className="col-md-6 col-sm-6 col-xs-12">
										<div className="single-product">
											<ul className="before-after-img">
												<li>
													<div className="img-holder">
														<img src={beforeRepair1} alt="Awesome Image" />
														<div className="overlay-box">
															<div className="box">
																<div className="content">
																	<a>Before</a>
																</div>
															</div>
														</div>
													</div>
												</li>
												<li>
													<div className="img-holder">
														<img src={afterRepair1} alt="Awesome Image" />
														<div className="overlay-box">
															<div className="box">
																<div className="content">
																	<a>After</a>
																</div>
															</div>
														</div>
													</div>
												</li>
											</ul>
										</div>
									</div>
									{/* <!--End single item--> */}
									{/* <!--Start single item--> */}
									<div className="col-md-6 col-sm-6 col-xs-12">
										<div className="single-product">
											<ul className="before-after-img">
												<li>
													<div className="img-holder">
														<img src={beforeRepair2} alt="Awesome Image" />
														<div className="overlay-box">
															<div className="box">
																<div className="content">
																	<a>Before</a>
																</div>
															</div>
														</div>
													</div>
												</li>
												<li>
													<div className="img-holder">
														<img src={afterRepair2} alt="Awesome Image" />
														<div className="overlay-box">
															<div className="box">
																<div className="content">
																	<a>After</a>
																</div>
															</div>
														</div>
													</div>
												</li>
											</ul>
										</div>
									</div>
									{/* <!--End single item--> */}
								</div>

								<div className="row">
									{/* <!--Start single item--> */}
									<div className="col-md-6 col-sm-6 col-xs-12">
										<div className="single-product">
											<ul className="before-after-img">
												<li>
													<div className="img-holder">
														<img src={beforeRepair3} alt="Awesome Image" />
														<div className="overlay-box">
															<div className="box">
																<div className="content">
																	<a>Before</a>
																</div>
															</div>
														</div>
													</div>
												</li>
												<li>
													<div className="img-holder">
														<img src={afterRepair3} alt="Awesome Image" />
														<div className="overlay-box">
															<div className="box">
																<div className="content">
																	<a>After</a>
																</div>
															</div>
														</div>
													</div>
												</li>
											</ul>
										</div>
									</div>
									{/* <!--End single item--> */}
									{/* <!--Start single item--> */}
									<div className="col-md-6 col-sm-6 col-xs-12">
										<div className="single-product">
											<ul className="before-after-img">
												<li>
													<div className="img-holder">
														<img src={beforeRepair4} alt="Awesome Image" />
														<div className="overlay-box">
															<div className="box">
																<div className="content">
																	<a>Before</a>
																</div>
															</div>
														</div>
													</div>
												</li>
												<li>
													<div className="img-holder">
														<img src={afterRepair4} alt="Awesome Image" />
														<div className="overlay-box">
															<div className="box">
																<div className="content">
																	<a>After</a>
																</div>
															</div>
														</div>
													</div>
												</li>
											</ul>
										</div>
									</div>
									{/* <!--End single item--> */}
								</div>
							</div>
						</div>
						<VisitUs />
					</div>
				</div>
			</section>
		</div>
	);
}

export default BeforeAndAfter;
