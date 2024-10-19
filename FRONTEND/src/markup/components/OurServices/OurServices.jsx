import React from "react";

function OurServices({ Title, image, description }) {
	return (
		<div className="single-item text-center ">
			<a href={"#"}>
				<h5>{Title}</h5>
			</a>
			<div className="img-holder">
				<img src={image} alt="Awesome Image" />
				<div className="overlay">
					<div className="box">
						<div className="content">
							<a href={"#"}>
								<i className="fa fa-link" aria-hidden="true"></i>
							</a>
						</div>
					</div>
				</div>
			</div>
			<div className="text-holder">{description}</div>
		</div>
	);
}

export default OurServices;
