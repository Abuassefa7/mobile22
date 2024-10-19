

import React from "react";
import process1 from "../../../assets/images/home/working-process/Untitled(8).png";
import process2 from "../../../assets/images/home/about/Untitled(4).png";
import process3 from "../../../assets/images/home/about/Untitled(5).png";
import process4 from "../../../assets/images/home/about/Untitled(6).png";
import backgroundImage from "../../../assets/images/home/banner/slideimg1.jpg";

const WorkingProcess = () => {
  const steps = [
    {
      imgSrc: process1,
      count: 1,
      title: "Damaged Device",
      description:
        "Repair plus provide a high range of service for your digital device",
    },
    {
      imgSrc: process2,
      count: 2,
      title: "Hand Over to Us",
      description:
        "We have over 48 branches in the US, you can easily reach us",
    },
    {
      imgSrc: process3,
      count: 3,
      title: "Repair the Device",
      description:
        "Our expert technicians will repair your device very quickly and with quality",
    },
    {
      imgSrc: process4,
      count: 4,
      title: "Get Back From Us",
      description: "Get back your device with high range of service & on time.",
    },
  ];

  return (
		<section
			className="working-process-area"
			// style={{ backgroundImage: "url('/images/working-process/bg.jpg')" }}
			style={{ backgroundImage: `url(${backgroundImage})` }}
		>
			<div className="container">
				<div className="sec-title text-center">
					<h1>Working Process</h1>
				</div>
				<div className="row">
					{steps.map((step, index) => (
						<div key={index} className="col-md-3 col-sm-6 col-xs-12">
							<div className="single-iten text-center">
								<div className="img-box dasded">
									<img src={step.imgSrc} alt="Awesome Image" />
									<div className="count">
										<h3>{step.count}</h3>
									</div>
								</div>
								<div className="text-box">
									<h3>{step.title}</h3>
									<p>{step.description}</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default WorkingProcess;

