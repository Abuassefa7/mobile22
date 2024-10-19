import React from "react";
import coreImage from "../../../assets/images/home/about/core-valued.jpg"; // Adjust the path as necessary

function CoreValues() {
  return (
		<section className="core-value-area">
			<div className="container">
				<div className="row">
					<div className="col-md-8 content pull-right">
						<div className="text-holder">
							<div className="sec-title-two">
								<h1>Our Core Values</h1>
								<span className="border"></span>
							</div>
							<div className="row">
								{/* Start single item */}
								<div className="col-md-6">
									<div className="single-item">
										<div className="icon-box">
											<span className="flaticon-thumb-up"></span>
										</div>
										<div className="text-box">
											<h3>Positive & Optimistic</h3>
											<p>
												we always strive to maintain a positive and optimistic
												attitude. We believe that a cheerful and upbeat demeanor
												can go a long way in providing an exceptional customer
												experience.
											</p>
										</div>
									</div>
								</div>
								{/* End single item */}
								{/* Start single item */}
								<div className="col-md-6">
									<div className="single-item">
										<div className="icon-box">
											<span className="flaticon-star"></span>
										</div>
										<div className="text-box">
											<h3>Wow Customer Service</h3>
											<p>
												From the moment customers walk through our doors to the
												time their device is returned, we go above and beyond to
												exceed their expectations and leave them feeling
												satisfied and impressed.
											</p>
										</div>
									</div>
								</div>
								{/* End single item */}
							</div>
							<div className="row">
								{/* Start single item */}
								<div className="col-md-6">
									<div className="single-item">
										<div className="icon-box">
											<span className="flaticon-heart"></span>
										</div>
										<div className="text-box">
											<h3>Love Customer</h3>
											<p>
												At our electronic repair shop, we don't just see our
												customers as clients – we view them as partners. We are
												deeply passionate about building genuine and lasting
												relationships with each and every one of them.
											</p>
										</div>
									</div>
								</div>
								{/* End single item */}
								{/* Start single item */}
								<div className="col-md-6">
									<div className="single-item">
										<div className="icon-box">
											<span className="flaticon-slices-of-bread"></span>
										</div>
										<div className="text-box">
											<h3>Have Integrity</h3>
											<p>
												Honesty and transparency are the foundations upon which
												our electronic repair shop is built. We are committed to
												maintaining the highest standards of integrity in all
												our dealings, both with our customers and within our
												team.
											</p>
										</div>
									</div>
								</div>
								{/* End single item */}
							</div>
						</div>
					</div>
					<div className="col-md-4 image pull-left">
						<div className="img-holder">
							<img src={coreImage} alt="Core Values" />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default CoreValues;
