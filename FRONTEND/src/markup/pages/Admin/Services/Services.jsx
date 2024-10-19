import React from "react";
import AdminServices from "../../../components/Admin/AdminServices/AdminServices";
import AdminMenu from "../../../components/Admin/AdminMenu/AdminMenu";
import CommonBanner from "../../../components/CommonBanner/CommonBanner";
import AddService from "../../../components/Admin/AdminServices/AddService";

function Services() {
	return (
		<>
			<CommonBanner title="Services" />
			<div className="container-fluid">
				<div className="row row-correct-margin">
					<div className="col-md-3">
						<AdminMenu />
					</div>
					<div className="col-md-9 ">
						<AdminServices />
					</div>
				</div>
			</div>
		</>
	);
}

export default Services;
