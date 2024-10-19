import React from "react";
import AboutusBaner from "../components/AboutUs/AboutusBanner";
import VideoGalleryArea from "../components/AboutUs/VideoGalleryArea";
import CoreValues from "../components/AboutUs/CoreValues";
import WorkingProcess from "../components/AboutUs/WorkingProcess";
import BrandArea from "../components/Home/BrandArea/BrandArea";
function AboutUs() {
  return (
		<>
			<AboutusBaner />
			<VideoGalleryArea />
			<CoreValues />
			<BrandArea />
			<WorkingProcess />
		</>
	);
}

export default AboutUs;
