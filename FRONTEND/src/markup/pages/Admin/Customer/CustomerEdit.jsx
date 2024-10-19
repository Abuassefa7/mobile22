import React from "react";
// Import the AddEmployeeForm component
// Import the AdminMenu component
import AdminMenu from "../../../components/Admin/AdminMenu/AdminMenu";
import CustomerEdit from "../../../components/Admin/customer/CustomerEdit/CustomerEdit";
import CommonBanner from "../../../components/CommonBanner/CommonBanner";

function AddCustomer(props) {
  return (
		<div>
				<CommonBanner title="Update Customer" />
			<div className="container-fluid admin-pages">
				<div className="row row-correct-margin">
					<div className="col-md-3 admin-left-side">
						<AdminMenu />
					</div>
					<div className="col-md-7 admin-right-side">
						<CustomerEdit />
					</div>
				</div>
			</div>
		</div>
	);
}

export default AddCustomer;
