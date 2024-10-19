import React from "react";
import { Link } from "react-router-dom";

function AdditionalComponent() {
	return (
		<>
			<div className="location-box">
				<p>Do You Want Check Products Availability ?</p>
			</div>
			<div className="addto-cart-box">
				<Link to={"/contact"}>
					<button className="thm-btn bg-1 addtocart" type="submit">
						Contact us
					</button>
				</Link>
			</div>
		</>
	);
}

export default AdditionalComponent;
