import React from 'react'
import EmployeeForm from '../../../components/Admin/Employee/EmployeeForm/EmployeeForm'

import AdminMenu from "../../../components/Admin/AdminMenu/AdminMenu";
import CommonBanner from '../../../components/CommonBanner/CommonBanner';

function AddEmployee() {
	return (
	  <>
			<CommonBanner title="Add Employee" />
		<div className="container-fluid">
			<div className="row row-correct-margin">
				<div className="col-md-3">
					<AdminMenu />
				</div>
				<div className="col-md-7 new-product">
					<EmployeeForm />
				</div>
			</div>
		</div></>
	);
}

export default AddEmployee