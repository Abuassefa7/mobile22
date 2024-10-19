import React from "react";
// Import the AddEmployeeForm component
import EmployeeEdit from "../../../components/Admin/Employee/EmployeeEdit/EmployeeEdit";
// Import the AdminMenu component
import AdminMenu from "../../../components/Admin/AdminMenu/AdminMenu";
import CommonBanner from "../../../components/CommonBanner/CommonBanner";

function AddEmployee(props) {
	return (
		<div>
				<CommonBanner title="Update Employee" />
			<div className="container-fluid admin-pages">
				<div className="row row-correct-margin">
					<div className="col-md-3 admin-left-side">
						<AdminMenu />
					</div>
					<div className="col-md-7 admin-right-side">
						<EmployeeEdit />
					</div>
				</div>
			</div>
		</div>
	);
}

export default AddEmployee;
