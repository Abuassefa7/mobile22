import React from "react";
import img1 from "../../../assets/images/Products/1.jpg";
import img2 from "../../../assets/images/Products/2.jpg";
import img3 from "../../../assets/images/Products/3.jpg";

function RelatedProducts() {
	return (
		<>
			<div className="sec-title-two">
				<h3>Related Products</h3>
			</div>
			<div className="row">
				{/* Start single product item */}
				<div className="col-md-4 col-sm-4 col-xs-12">
					<div className="single-product-item">
						<div className="img-holder">
							<img src={img1} alt="Awesome Product Image" />
							<div className="overlay-box">
								<div className="box">
									<div className="content">
										<a className="thm-btn bg-1" href="shop-single.html">
											Add to Cart
										</a>
									</div>
								</div>
							</div>
						</div>
						<div className="title-holder">
							<div className="top clearfix">
								<div className="product-title pull-left">
									<a href="shop-single.html">
										<h5>Adapter Cable</h5>
									</a>
								</div>
								
							</div>
							<h4>$34.99</h4>
						</div>
					</div>
				</div>
				{/* End single product item */}
				{/* Start single product item */}
				<div className="col-md-4 col-sm-4 col-xs-12">
					<div className="single-product-item">
						<div className="img-holder">
							<img src={img2} alt="Awesome Product Image" />
							<div className="overlay-box">
								<div className="box">
									<div className="content">
										<a className="thm-btn bg-1" href="shop-single.html">
											Add to Cart
										</a>
									</div>
								</div>
							</div>
						</div>
						<div className="title-holder">
							<div className="top clearfix">
								<div className="product-title pull-left">
									<a href="shop-single.html">
										<h5>Emily Player</h5>
									</a>
								</div>
								
							</div>
							<h4>$24.99</h4>
						</div>
					</div>
				</div>
				{/* End single product item */}
				{/* Start single product item */}
				<div className="col-md-4 col-sm-4 col-xs-12">
					<div className="single-product-item">
						<div className="img-holder">
							<img src={img3} alt="Awesome Product Image" />
							<div className="overlay-box">
								<div className="box">
									<div className="content">
										<a className="thm-btn bg-1" href="shop-single.html">
											Add to Cart
										</a>
									</div>
								</div>
							</div>
						</div>
						<div className="title-holder">
							<div className="top clearfix">
								<div className="product-title pull-left">
									<a href="shop-single.html">
										<h5>Poratbel Stand</h5>
									</a>
								</div>
								
							</div>
							<h4>$19.99</h4>
						</div>
					</div>
				</div>
				{/* End single product item */}
			</div>
		</>
	);
}

export default RelatedProducts;
