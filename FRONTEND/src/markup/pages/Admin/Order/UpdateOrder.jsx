import React from "react";
import CommonBanner from "../../../components/CommonBanner/CommonBanner";
import AdminMenu from "../../../components/Admin/AdminMenu/AdminMenu";
import EditOrder from "../../../components/Admin/Orders/EditOrder";

function UpdateOrder() {
	return (
		<>
			<CommonBanner title={"Update Order"} />
			<div className="container-fluid">
				<div className="row row-correct-margin">
					<div className="col-md-3">
						<AdminMenu />
					</div>
					<div className="col-md-9 ">
						<EditOrder />
					</div>
				</div>
			</div>
		</>
	);
}

export default UpdateOrder;
