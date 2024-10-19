import React from "react";
import SingleProductAdmin from "../../../components/Admin/Product/SingleProductAdmin";
import CommonBanner from "../../../components/CommonBanner/CommonBanner";
import AdminMenu from "../../../components/Admin/AdminMenu/AdminMenu";

function OneProduct() {
	return (
		<div>
			<div className="container-fluid">
				<CommonBanner title="Single Product" />
				<div className="row row-correct-margin">
					<div className="col-md-3">
						<AdminMenu />
					</div>
					<div className="col-md-9 new-product">
						<SingleProductAdmin />
					</div>
				</div>
			</div>
		</div>
	);
}

export default OneProduct;
