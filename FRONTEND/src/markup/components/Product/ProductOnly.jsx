import React from "react";
import { Link } from "react-router-dom";

function ProductOnly({ image, title, price, url }) {
	return (
		<>
			<div className="single-product-item ">
				<div className="img-holder">
					<img src={image} alt="Awesome Product Image" />
					<div className="overlay-box">
						<div className="box">
							<div className="content">
								<Link className="thm-btn bg-1" to={`/products/single/${url}`}>
									View Details
								</Link>
							</div>
						</div>
					</div>
				</div>
				<div className="title-holder row">
					<div className="top clearfix ">
						<div className="product-title pull-left">
							<Link to={""}>
								<h5>{title}</h5>
							</Link>
						</div>
					</div>
					<h4>{price}</h4>
				</div>
			</div>
		</>
	);
}

export default ProductOnly;
