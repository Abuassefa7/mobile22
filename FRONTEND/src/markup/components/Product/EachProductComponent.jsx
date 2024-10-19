import React from "react";
import { Link } from "react-router-dom";
import AdditionalComponent from "./AdditionalComponent";

function EachProductComponent({ titles, images, descriptions, price }) {
	return (
		<>
			<div className="col-md-6">
				<div className="img-holder">
					<img
						src={images}
						alt="Awesome Image"
						data-imagezoom="true"
						className="img-responsive image-large"
					/>
				</div>
			</div>
			<div className="col-md-6">
				<div className="content-box">
					<h2>{titles}</h2>
					<br />
					<span className="price">{price}</span>
					<div className="text">
						<p>{descriptions}</p>
					</div>
					<AdditionalComponent />
				</div>
			</div>
		</>
	);
}

export default EachProductComponent;
