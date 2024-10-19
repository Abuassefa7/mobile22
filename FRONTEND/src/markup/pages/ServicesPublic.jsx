import React from "react";
import OurServices from "../components/OurServices/OurServices";
import img1 from "./../../assets/images/services/phen-repaire.png";
import img2 from "./../../assets/images/services/service2.png";
import img3 from "./../../assets/images/services/service3.png";
import img4 from "./../../assets/images/services/service4-1.png";
import img5 from "./../../assets/images/services/ria.png";
import img6 from "./../../assets/images/services/sim1'.png";
import { Link } from "react-router-dom";
import CommonBanner from "../components/CommonBanner/CommonBanner";

function ServicesPublic() {
	return (
		<>
			<CommonBanner title="services" />
			{/* <!--End breadcrumb bottom area-->

<!--Start services area--> */}
			<section className="call-to-action-area services-area">
				<div className="container">
					<div className="row">
						{/* <!--Start single item--> */}
						<div className="col-md-4">
							<Link className="custom-link" to={"/services/phone-repair"}>
								<OurServices
									Title={"Smart phone Repair"}
									image={img1}
									description={
										<p>
											We specialize in repairing Apple iPhones, Samsung Galaxy,
											Sony, HTC, Nexus, Motorola, Blackberry, OnePlus, Xiaomi,
											and more.
										</p>
									}
								/>
							</Link>
						</div>
						{/* <!--End single item-->
                          <!--Start single item--> */}
						<div className="col-md-4">
							<Link className="custom-link" to={"/services/t&i-repair"}>
								<OurServices
									Title={"Tablet and iPad Repairs"}
									image={img2}
									description={
										<p>
											If your tablet or iPad is giving you trouble, our skilled
											technicians are here to help.Explore our tailored repair
											services.
										</p>
									}
								/>
							</Link>
						</div>
						{/* <!--End single item-->
            <!--Start single item--> */}
						<div className="col-md-4">
							<Link className="custom-link" to={"/services/l&m-repair"}>
								<OurServices
									Title={"Laptop & Mac Repair"}
									image={img3}
									description={
										<p>
											We specialize in repairing laptops and Mac computers.
											Trust our experts to diagnose and fix any issues with your
											devices promptly.
										</p>
									}
								/>
							</Link>
						</div>
						{/* <!--End single item-->
            <!--Start single item--> */}
						<div className="col-md-4">
							<Link className="custom-link" to={"/products"}>
								<OurServices
									Title={"Phone and Accessory Sales"}
									image={img4}
									description={
										<p>
											Explore our range of phones and accessories for all your
											needs. Find the latest smartphones, cases, chargers, and
											more at competitive prices.
										</p>
									}
								/>
							</Link>
						</div>
						{/* <!--End single item-->
            <!--Start single item--> */}
						<div className="col-md-4">
							<Link className="custom-link" to={"/info"}>
								<OurServices
									Title={"Ria Money Transfer"}
									image={img5}
									description={
										<p>
											Send money easily and securely with our Ria Money Transfer
											service. Fast and reliable transfers available to select
											international destinations.
										</p>
									}
								/>
							</Link>
						</div>
						{/* <!--End single item-->
            <!--Start single item--> */}
						<div className="col-md-4">
							<OurServices
								Title={"Mobile SIM Solutions & Prepaid Plan"}
								image={img6}
								description={
									<p>
										We provide SIM card sales, activation, carrier switching,
										and plan selection. Whether you need a new SIM or help
										choosing a plan.
									</p>
								}
							/>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export default ServicesPublic;
