import React from "react";
// import { Link } from "react-router-dom";
// import certifiedLogo from "../../../assets/images/home/b"; // adjust the path as needed
// import signature from "../../../assets/images/resources/signature.png"; // adjust the path as needed
import videoGallery from "../../../assets/images/home/about/about-us.jpg";
// import playButton from "../../../assets/images/icon/play-btn.png"; // adjust the path as needed

function VideoGalleryArea() {
	return (
		<section className="video-gallery-area">
			<div className="container">
				<div className="row">
					<div className="col-md-6">
						<div className="text-holder">
							<h2>
								"We provide full and specific solutions for our every customer."
							</h2>
							<div className="top-text">
								<p>
									At our electronics repair shop, we're dedicated to breathe new
									life into your cherished tech devices. Our skilled technicians
									use the latest diagnostic tools to quickly identify and fix
									issues with phones, laptops, tablets, and more. Whether it's a
									cracked screen, malfunctioning battery, or software glitches,
									we have the expertise to get your tech back in top shape -
									quickly and at an affordable cost. With our meticulous repair
									process, you can trust that your device is in good hands.
								</p>
							</div>
							<div className="bottom-text">
								<p>
									Find the perfect smartphone and essential accessories to power
									your mobile lifestyle. Browse our curated selection of the
									latest tech and must-have add-ons.
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
					<div className="col-md-6 col-sm-6 col-xs-12">
						<div className="video-gallery">
							<img src={videoGallery} alt="Awesome Video Gallery" />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default VideoGalleryArea;
