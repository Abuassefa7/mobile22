import React from "react";
import AdminDashboard from "../../../components/Admin/AdminDashboard/AdminDashboard";
import AdminMenu from "../../../components/Admin/AdminMenu/AdminMenu";
import { useAuth } from "../../../../Contexts/AuthContext";
import Login from "../../../components/Login/Login";

function Dashboard() {
	const { isSticky, isLogged } = useAuth();

	return (
		<>
			{isLogged ? (
				<div className={`container-fluid ${isSticky && `under-header-margin`}`}>
					<div className="row row-correct-margin ">
						<div className=" new-product">
							<AdminDashboard />
						</div>
					</div>
				</div>
			) : (
				<Login />
			)}
		</>
	);
}

export default Dashboard;
