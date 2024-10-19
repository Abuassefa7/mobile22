import React from "react";
// Import the auth hook
import { useAuth } from "../../../../Contexts/AuthContext";
// Import the login form component
// import LoginForm from "../../../components/Admin/";
// Import the EmployeesList component
import AdminMenu from "../../../components/Admin/AdminMenu/AdminMenu";
import EmployeesList from "../../../components/Admin/Employee/EmployeesList/EmployeesList";
import CommonBanner from "../../../components/CommonBanner/CommonBanner";
function Employees() {
	// Destructure the auth hook
	const { isLogged, isAdmin } = useAuth();
	if (isLogged) {
		if (isAdmin) {
			return (
				<>
						<CommonBanner title="Employees" />
					<div className="container-fluid admin-pages">
						<div className="row row-correct-margin">
							<div className="col-md-3 admin-left-side">
								<AdminMenu />
							</div>
							<div className="col-md-9 admin-right-side">
								<EmployeesList />
							</div>
						</div>
					</div>
				</>
			);
		} else {
			return (
				<div>
					<h1>You are not authorized to access this page</h1>
				</div>
			);
		}
	} else {
		return <div>{/* <LoginForm />  */}</div>;
	}
}

export default Employees;
