import React from "react";
import AddCustomer from "../../../components/Admin/customer/AddCustomer/AddCustomer";

import AdminMenu from "../../../components/Admin/AdminMenu/AdminMenu";
import CommonBanner from "../../../components/CommonBanner/CommonBanner";

function AddEmployee() {
	return (
	  <>
	  
			<CommonBanner title="Add Customer" />
		<div className="container-fluid">
			<div className="row row-correct-margin">
				<div className="col-md-3">
					<AdminMenu />
				</div>
				<div className="col-md-7 new-product">
					<AddCustomer />
				</div>
			</div>
			</div>
		</>
	);
}

export default AddEmployee;
