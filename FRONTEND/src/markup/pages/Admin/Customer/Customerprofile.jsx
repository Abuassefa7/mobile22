import React from "react";
// Import the admin menu component
import AdminMenu from "../../../components/Admin/AdminMenu/AdminMenu";
// Import customer profile component 
import Customerprofileform from "../../../components/Admin/customer/Customerprofile/Customerprofileform";
import CommonBanner from "../../../components/CommonBanner/CommonBanner";

function Customerprofile() {
	return (
		<>
				<CommonBanner title="Customer Profile" />
			<div className="container-fluid admin-pages">
				<div className="row row-correct-margin">
					<div className="col-md-3 admin-left-side">
						<AdminMenu />
					</div>
					<div className="col-md-9 admin-right-side right">
						<Customerprofileform />
					</div>
				</div>
			</div>
		</>
	);
}

export default Customerprofile;
