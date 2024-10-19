import React from "react";
import latestBlog1 from "../../../../assets/images/home/blog/blog1'.png";
import latestBlog2 from "../../../../assets/images/home/blog/blog2'.png";
import latestBlog3 from "../../../../assets/images/home/blog/blog3'.png";

function Blog() {
	return (
		<div>
			{" "}
			{/* <!--Start latest blog area--> */}
			<section className="latest-blog-area">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<div className="sec-title-two pull-left">
								<h1>Enjoy LinkTech Wireless</h1>
							</div>
						</div>
					</div>
					<div className="row">
						{/* <!--Start single latest blog--> */}
						<div className="col-md-4">
							<div className="single-latest-blog">
								<div className="img-holder">
									<img src={latestBlog1} alt="Awesome Image" />
									<div className="overlay-box">
										<div className="box"></div>
									</div>
								</div>
								<div className="text-holder">
									<ul className="meta-info">
										<li>
											<a > ipad/tablet repair</a>
										</li>
									</ul>
									<a >
										<h3 className="blog-title">
											iPad & Tablet  Repairs For Any Issues At Best Price
										</h3>
									</a>
								</div>
							</div>
						</div>
						{/* <!--End single latest blog--> */}
						{/* <!--Start single latest blog--> */}
						<div className="col-md-4">
							<div className="single-latest-blog">
								<div className="img-holder">
									<img src={latestBlog2} alt="Awesome Image" />
									<div className="overlay-box">
										<div className="box">
											<div className="content">
												<a >
													<i className="fa fa-link" aria-hidden="true"></i>
												</a>
											</div>
										</div>
									</div>
								</div>
								<div className="text-holder">
									<ul className="meta-info">
										<li>
											<a ></a>
										</li>
										<li>
											<i className="fa fa-clock-o" aria-hidden="true"></i>
											<a >Moble phones Sales & Repair</a>
										</li>
									</ul>
									<a href="blog-single.html">
										<h3 className="blog-title">
											We offer the best phones for sale and Repairs with Reasonable price.
										</h3>
									</a>
								</div>
							</div>
						</div>
						{/* <!--End single latest blog--> */}
						{/* <!--Start single latest blog--> */}
						<div className="col-md-4">
							<div className="single-latest-blog">
								<div className="img-holder">
									<img src={latestBlog3} alt="Awesome Image" />
									<div className="overlay-box">
										<div className="box">
											<div className="content">
												<a >
													<i className="fa fa-link" aria-hidden="true"></i>
												</a>
											</div>
										</div>
									</div>
								</div>
								<div className="text-holder">
									<ul className="meta-info">
										<li>
											<a >Laptop</a>
										</li>
										<li>
											<i className="fa fa-clock-o" aria-hidden="true"></i>
											<a >Disktop Repair</a>
										</li>
									</ul>
									<a >
										<h3 className="blog-title">
											All Software and Hardware Repair At Best Prices
										</h3>
									</a>
								</div>
							</div>
						</div>
						{/* <!--End single latest blog--> */}
					</div>
				</div>
			</section>
			{/* <!--End latest blog area--> */}
		</div>
	);
}

export default Blog;
