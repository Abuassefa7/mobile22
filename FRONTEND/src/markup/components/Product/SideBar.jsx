import React from "react";
import img1 from "../../../assets/images/Products/product-thumb-1.jpg";
import img2 from "../../../assets/images/Products/product-thumb-2.jpg";
import img3 from "../../../assets/images/Products/product-thumb-3.jpg";
import img4 from "../../../assets/images/Products/price-filter-bg.png";

function SideBar() {
	return (
		<>
			<div className="sidebar-wrapper">
				{/* Start single sidebar */}
				<div className="single-sidebar">
					<button type="submit">
						<i className="fa fa-arrow-down" aria-hidden="true"></i>
					</button>
				</div>
				{/* End single sidebar */}
				{/* Start single sidebar */}
				<div className="single-sidebar">
					<div className="sidebar-title">
						<h1>Categories</h1>
					</div>
					<ul className="categories clearfix">
						<li>
							<a href="#">
								Smart Phones
								<span className="pull-right">
									<i className="fa fa-angle-right" aria-hidden="true"></i>{" "}
								</span>
							</a>
						</li>
						<li>
							<a href="#">
								Phone Cases and Covers
								<span className="pull-right">
									<i className="fa fa-angle-right" aria-hidden="true"></i>{" "}
								</span>
							</a>
						</li>
						<li>
							<a href="#">
								Chargers and Cables
								<span className="pull-right">
									<i className="fa fa-angle-right" aria-hidden="true"></i>{" "}
								</span>
							</a>
						</li>
						<li>
							<a href="#">
								Headphones and Earphones
								<span className="pull-right">
									<i className="fa fa-angle-right" aria-hidden="true"></i>{" "}
								</span>
							</a>
						</li>
						<li>
							<a href="#">
								Uncategorized
								<span className="pull-right">
									<i className="fa fa-angle-right" aria-hidden="true"></i>{" "}
								</span>
							</a>
						</li>
					</ul>
				</div>
				{/* End single sidebar */}
				{/* Start single sidebar  */}
				<div className=""></div>
				{/* End single sidebar */}
				{/* Start single sidebar */}
				<div className="single-sidebar">
					<div className="sidebar-title">
						<h1>Latest Products</h1>
					</div>
					<ul className="latest-product">
						<li>
							<div className="img-holder">
								<img src={img1} alt="Awesome Image" className="image-small" />
								<div className="overlay">
									<div className="box">
										<div className="content">
											<a href="#">
												<i className="fa fa-link" aria-hidden="true"></i>
											</a>
										</div>
									</div>
								</div>
							</div>
							<div className="title-holder">
								<a href="#">
									<h4>Portable Stand</h4>
								</a>
								<h5>$34.99</h5>
								<div className="review-box">
									<ul>
										<li>
											<i className="fa fa-star"></i>
										</li>
										<li>
											<i className="fa fa-star"></i>
										</li>
										<li>
											<i className="fa fa-star"></i>
										</li>
										<li>
											<i className="fa fa-star"></i>
										</li>
										<li>
											<i className="fa fa-star"></i>
										</li>
									</ul>
								</div>
							</div>
						</li>
						<li>
							<div className="img-holder">
								<img src={img2} alt="Awesome Image" />
								<div className="overlay">
									<div className="box">
										<div className="content">
											<a href="#">
												<i className="fa fa-link" aria-hidden="true"></i>
											</a>
										</div>
									</div>
								</div>
							</div>
							<div className="title-holder">
								<a href="#">
									<h4>Zan Speaker</h4>
								</a>
								<h5>$24.99</h5>
								<div className="review-box">
									<ul>
										<li>
											<i className="fa fa-star"></i>
										</li>
										<li>
											<i className="fa fa-star"></i>
										</li>
										<li>
											<i className="fa fa-star"></i>
										</li>
										<li>
											<i className="fa fa-star"></i>
										</li>
										<li>
											<i className="fa fa-star"></i>
										</li>
									</ul>
								</div>
							</div>
						</li>
						<li>
							<div className="img-holder">
								<img src={img3} alt="Awesome Image" />
								<div className="overlay">
									<div className="box">
										<div className="content">
											<a href="#">
												<i className="fa fa-link" aria-hidden="true"></i>
											</a>
										</div>
									</div>
								</div>
							</div>
							<div className="title-holder">
								<a href="#">
									<h4>Mini Earphone</h4>
								</a>
								<h5>$34.99</h5>
								<div className="review-box">
									<ul>
										<li>
											<i className="fa fa-star"></i>
										</li>
										<li>
											<i className="fa fa-star"></i>
										</li>
										<li>
											<i className="fa fa-star"></i>
										</li>
										<li>
											<i className="fa fa-star"></i>
										</li>
										<li>
											<i className="fa fa-star"></i>
										</li>
									</ul>
								</div>
							</div>
						</li>
					</ul>
				</div>
				{/* End single sidebar */}
			</div>
		</>
	);
}

export default SideBar;
