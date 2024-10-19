import React from "react";
// import AdminMenu from '../../../components/Admin/AdminMenu'
import NewProduct from "../../../components/Admin/Product/NewProduct";
import AdminMenu from "../../../components/Admin/AdminMenu/AdminMenu";
import CommonBanner from "../../../components/CommonBanner/CommonBanner";

function AddProduct() {
	return (
		<div className="container-fluid">
			<div className="row row-correct-margin">
				<CommonBanner title={"New Product"}/>
				<div className="col-md-3">
					<AdminMenu />
				
				</div>
				<div className="col-md-7 new-product">
					<NewProduct />
				</div>
			</div>
		</div>
	);
}

export default AddProduct;
