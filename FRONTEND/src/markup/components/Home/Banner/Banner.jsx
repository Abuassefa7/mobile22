import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slideimg1 from "../../../../assets/images/home/banner/LINKtechinc.png";
import slideimg2 from "../../../../assets/images/home/banner/banner6-1 .png";
import { useAuth } from "../../../../Contexts/AuthContext";
import YoutubeChannelVideos from "../../Youtube/YoutubeChannelVideos";

function Banner() {
	const { isSticky, isMobile } = useAuth();
	const slides = [
		{
			img: slideimg1,
			// text: "Restoring your devices with genuine manufacturer parts and components.",
			// title: <YoutubeChannelVideos />,
		},
		{
			img: slideimg2,
			title: "Quality Accessory Replacements",
			text: "Upgrade your device with reliable, original accessories.",
		},
	];

	const settings = {
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 5000,
		dots: true,
		arrows: false,
	};

	return (
		<div className={isSticky ? `under-header-margin` : ""}>
			{/* <!--start rev slider wrapper--> */}
			<section className="rev_slider_wrapper">
				<div>
					<li>
						<Slider {...settings}>
							{slides.map((slide, index) => (
								<div
									key={index}
									style={{
										postion: "relative",
									}}
								>
									<img src={slide.img} alt="" width="1920" height="540" />
									<div>
										<div
											className="slide-content-box "
											style={{
												color: index === 0 ? "white" : "initial",
												paddingTop: 50,
												position: "absolute",
												top: "30%",
												left: "30",
												// transform: "translate(-50%, -50%)",
											}}
										>
											{!isMobile ? (
												<>
													<h1 className="banner-text">
														{slide.title}

														<br />
														{slide.subtitle}
													</h1>
													<p className="banner-text">{slide.text}</p>
												</>
											) : (
												<>
													<h4 className="banner-text">
														{slide.title}
														<br />
														{slide.subtitle}
													</h4>
												</>
											)}
										</div>
									</div>
								</div>
							))}
						</Slider>
					</li>
				</div>
			</section>

			{/* <!--End rev slider wrapper--> */}
		</div>
	);
}

export default Banner;
