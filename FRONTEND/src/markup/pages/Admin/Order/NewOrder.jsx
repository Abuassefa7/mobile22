import React from "react";
// Import the admin menu component
import AdminMenu from "../../../components/Admin/AdminMenu/AdminMenu";
// Import the add order component 
import AddOrder from "../../../components/Admin/Orders/AddOrder/AddOrder";
import CommonBanner from "../../../components/CommonBanner/CommonBanner";

function NewOrder() {
	return (
		<>
				<CommonBanner title="New Order" />
			<div className="container-fluid admin-pages">
				<div className="row row-correct-margin">
					<div className="col-md-3 admin-left-side">
						<AdminMenu />
					</div>
					<div className="col-md-9 admin-right-side">
						<AddOrder />
					</div>
				</div>
			</div>
		</>
	);
}

export default NewOrder;
