import React from "react";
// Import the auth hook
import { useAuth } from "../../../../Contexts/AuthContext";
// Import the login form component
import LoginForm from "../../../components/Login/Login";
// Import the admin menu component
import AdminMenu from "../../../components/Admin/AdminMenu/AdminMenu";
// Import the OrdersList component
import OrdersList from "../../../components/Admin/Orders/OrderList";
import CommonBanner from "../../../components/CommonBanner/CommonBanner";

function Orders() {
	return (
		<div>
				<CommonBanner title="Orders" />
			<div className="container-fluid admin-pages">
				<div className="row row-correct-margin">
					<div className="col-md-3 admin-left-side">
						<AdminMenu />
					</div>
					<div className="col-md-9 admin-right-side">
						<OrdersList />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Orders;
