import React from 'react'
import AdminRia from "../../markup/components/Admin/AdminRia/AdminRia";
import BasementList from '../components/Admin/HousingService/BasementList';
import CommonBanner from '../components/CommonBanner/CommonBanner';
function ExtraInfo() {
    return (
			<div>
				<CommonBanner title="Extra informations" />
				<section className="video-gallery-area extra-section-rent">
					<div className="container">
						<div className="admin-title">
							<h1>Money Transfer and Renting</h1> <br />
						</div>
					
						<div className="row">
							<div className="col-md-6">
								<div className="text-holder">
									<h2>
										Trusted Solutions for Your Family's Needs - Money Transfers
										and Affordable Living !
									</h2>
									<div className="top-text">
										<h3>Money Transfer</h3>
										<p>
											Whether you're supporting your family's daily needs,
											contributing to special occasions, or helping with
											emergency situations, our family-focused money transfer
											service is designed to make the process simple, secure,
											and affordable. Start transferring funds today and
											strengthen the bonds with your loved ones.
										</p>
									</div>
									<div className="bottom-text">
										<h3>Housing</h3>
										<p>
											Whether you're a student, young professional, or anyone in
											need of affordable and convenient housing, our basement
											and small room rentals provide the perfect solution.
											Browse our listings today and find your new home.
										</p>
										<div className="certified-logo">
											{/* <img src={certifiedLogo} alt="Certified Logo" /> */}
										</div>
									</div>
									<div className="signature">
										{/* <img src={signature} alt="Signature" /> */}
									</div>
								</div>
							</div>
							<div className="col-md-6 ">
								<div className="video-gallery">
									<AdminRia />
									<BasementList />
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		);
}

export default ExtraInfo