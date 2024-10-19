import React from "react";
import EditProduct from "../../../components/Admin/Product/EditProduct";
import AdminMenu from "../../../components/Admin/AdminMenu/AdminMenu";
import CommonBanner from "../../../components/CommonBanner/CommonBanner";

function UpdateProduct() {
	return (
		<div className="container-fluid">
			<div className="row row-correct-margin">
				<CommonBanner title={"Update Product"} />
				<div className="col-md-3">
					<AdminMenu />
				</div>
				<div className="col-md-7 new-product">
					<EditProduct />
				</div>
			</div>
		</div>
	);
}

export default UpdateProduct;
