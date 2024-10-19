import React from "react";
// Import the EmployeesList component
import AdminMenu from "../../../components/Admin/AdminMenu/AdminMenu";
import CustomersList from "../../../components/Admin/customer/customer/CustomerList";
import CommonBanner from "../../../components/CommonBanner/CommonBanner";

function Customers() {
	return (
		<>
			<div>
				<CommonBanner title="Customers" />
				<div className="container-fluid admin-pages">
					<div className="row row-correct-margin">
						<div className="col-md-3 admin-left-side">
							<AdminMenu />
						</div>
						<div className="col-md-9 admin-right-side">
							<CustomersList />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Customers;
