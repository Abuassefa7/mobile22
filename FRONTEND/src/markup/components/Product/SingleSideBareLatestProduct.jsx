import React from "react";
import { Link } from "react-router-dom";

function SingleSideBareLatestProduct({ productData }) {
	return (
		<>
			<div className="sidebar-title">
				<h1>Latest Products</h1>
			</div>

			<ul className="latest-product">
				{productData.map((product) => (
					<li key={product.product_id}>
						<div className="img-holder">
							<img
								src={product.product_image}
								alt="Awesome Image"
								className="image-small"
							/>
							<div className="overlay">
								<div className="box">
									<div className="content">
										<Link to={`/products/single/${product.product_id}`}>
											<i className="fa fa-link" aria-hidden="true"></i>
										</Link>
									</div>
								</div>
							</div>
						</div>
						<div className="title-holder">
							<a href="#">
								<h4>{product.product_name}</h4>
							</a>
							<h5>{product.product_price}</h5>
						</div>
					</li>
				))}
			</ul>
		</>
	);
}

export default SingleSideBareLatestProduct;
