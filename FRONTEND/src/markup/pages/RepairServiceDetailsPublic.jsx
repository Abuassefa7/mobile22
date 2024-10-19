import React, { useEffect, useState } from "react";
import RepairServiceDetails from "../components/OurServices/RepairServiceDetails";
import pimg1 from "./../../assets/images/services/service-single/screen2.png";
import pimg2 from "./../../assets/images/services/service-single/screen1'.png";
import pimg3 from "./../../assets/images/services/service-single/screen3.png";
import timg1 from "./../../assets/images/services/service-single/img2-400px280px.png";
import timg2 from "./../../assets/images/services/service-single/tscreen2'.png";
import timg3 from "./../../assets/images/services/service-single/tscreen3.png";
import limg1 from "./../../assets/images/services/service-single/img1-400px280px.png";
import limg2 from "./../../assets/images/services/service-single/Irepair2'.png";
import limg3 from "./../../assets/images/services/service-single/Irepair3'.png";
import { useLocation } from "react-router-dom";

function RepairServiceDetailsPublic() {
	let location = useLocation();
	let url = location.pathname.split("/")[2];
	
	const [id, setId] = useState(null);
	function setLocation() {
		setId(url);
	}
	useEffect(() => {
		setLocation();
	}, [url]);

	if (id === "phone-repair") {
		return (
			<>
				<RepairServiceDetails
					images={[pimg1, pimg2, pimg3]}
					titles={{
						title1: "Smart Phone Repair",
						title2: "Phone Repair",
						title3: "Repairing Broken Glass",
					}}
					texts={{
						p1: (
							<>
								<p>
									Our phone repair service fixes issues like cracked screens,
									battery replacements, water damage, faulty charging ports,
									unresponsive buttons, and software malfunctions. We use
									high-quality replacement parts to ensure lasting repairs and
									optimal device performance.
								</p>
								<p>
									Cracked screens are replaced, batteries swapped, and
									water-damaged components fixed. Charging ports and buttons are
									restored, and software issues resolved with updates. Quick
									turnaround and high-quality parts ensure reliable, lasting
									repairs.
								</p>
							</>
						),
						p2: (
							<p>
								For broken glass repairs, the safest option is to rely on
								professional service. At Cell Phone Repair, our skilled
								technicians swiftly and securely fix cracked screens. Many
								repairs are done on-site while you wait, ensuring minimal
								downtime. If visiting our location is inconvenient, rest
								assured, we don't offer mail-in services. You can trust us to
								promptly restore your phone's screen, so you can swiftly resume
								enjoying your device.
							</p>
						),
						p3: (
							<p>
								When a screen cracks, the best solution is to replace it. While
								a cracked screen might not immediately affect your phone's
								performance, it can pose risks like cuts or scratches. Over
								time, it could lead to more serious issues like dead spots,
								malfunctioning backlight, or discoloration. Continued use with a
								cracked screen may eventually result in the phone not working
								properly. It's safer and better for your device to have the
								screen replaced as soon as possible to avoid any further
								problems.
							</p>
						),
						p4: "",
					}}
				/>
			</>
		);
	} else if (id === "t&i-repair") {
		return (
			<>
				<RepairServiceDetails
					images={[timg1, timg2, timg3]}
					titles={{
						title1: "Tablet & iPad Repair",
						title2: "Tablet Repair",
						title3: "Repairing Tablet Broken Glass",
					}}
					texts={{
						p1: (
							<>
								<p>
									Our tablet and iPad repair service adeptly resolves various
									issues, from cracked screens to faulty charging ports. We
									specialize in common concerns like unresponsive buttons,
									display issues, and camera malfunctions, ensuring optimal
									device performance.
								</p>
								<p>
									Our tablet and iPad repair service adeptly resolves various
									issues, from cracked screens to faulty charging ports. We
									specialize in common concerns like unresponsive buttons,
									display issues, and camera malfunctions, ensuring optimal
									device performance.
								</p>
							</>
						),
						p2: (
							<p>
								To efficiently repair your cracked tablet screen without risking
								further damage, it's best to entrust it to a professional repair
								service. Our trained technicians at Cell Phone Repair specialize
								in swiftly and safely fixing screens. Common repairs can often
								be completed on-site while you wait at our local store. If
								you're unable to wait or if visiting our store is inconvenient,
								you can simply mail in your device. We'll promptly repair your
								screen and return it to you, allowing you to enjoy your tablet
								without interruption.
							</p>
						),
						p3: (
							<p>
								Regrettably, the only solution for a cracked tablet screen is
								replacement. Despite initially not affecting device
								functionality, overlooking the issue poses risks like skin cuts
								and more severe problems over time, such as dead spots and
								backlight malfunction, potentially resulting in complete loss of
								functionality. Addressing this promptly is crucial to prevent
								further complications and ensure continued tablet enjoyment.
							</p>
						),
						p4: "",
					}}
				/>
			</>
		);
	} else if (id === "l&m-repair") {
		return (
			<>
				<RepairServiceDetails
					images={[limg1, limg2, limg3]}
					titles={{
						title1: "Laptop & Mac Repair",
						title2: "Laptop & Mac Repair",
						title3: "Repairing Laptop Hardware",
					}}
					texts={{
						p1: (
							<>
								<p>
									Laptop and Mac repair involves fixing hardware and software
									issues like broken screens, battery failures, and OS errors.
									Mac repairs are unique due to Apple's proprietary tools and
									integrated design, requiring specialized skills and genuine
									parts, which are often more expensive. The complexity and
									premium expectations of Mac repairs set them apart from other
									electronics. While laptops are generally more modular and
									easier to fix, Macs have intricate, less modular components,
									demanding higher technical expertise.
								</p>
							</>
						),
						p2: (
							<p>
								At our electronic repair store, we specialize in quickly fixing
								common laptop hardware issues like broken screens, battery
								failures, keyboard malfunctions, and overheating problems. Our
								trained technicians use advanced tools for prompt and
								high-quality repairs, ensuring minimal downtime. Many services
								are completed on-site while you wait, getting your laptop back
								to optimal performance swiftly. Trust us to restore your laptop
								with expert care and attention to detail.
							</p>
						),
						p3: (
							<p>
								Common ways of fixing damaged laptop hardware include replacing
								cracked screens, swapping out faulty batteries, repairing
								keyboards, addressing overheating through internal cleaning, and
								replacing or repairing individual components like hard drives
								and motherboards. Additionally, damaged ports or connectors may
								be fixed, and software optimization can improve performance or
								compatibility. These methods, performed by trained technicians,
								efficiently resolve hardware issues in laptops.
							</p>
						),
						p4: "",
					}}
				/>
			</>
		);
	}
}

export default RepairServiceDetailsPublic;
