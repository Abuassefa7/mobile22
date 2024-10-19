import React from "react";

import ProductsAdmin from "../../../components/Admin/Product/ProductsAdmin";
import AdminMenu from "../../../components/Admin/AdminMenu/AdminMenu";
import CommonBanner from "../../../components/CommonBanner/CommonBanner";

function ProductsList() {
	return (
		<>
			<CommonBanner title="Products" />
			<div className="container-fluid">
				<div className="row row-correct-margin">
					<div className="col-md-3">
						<AdminMenu />
						
					</div>
					<div className="col-md-9 new-product">
						<ProductsAdmin />
					</div>
				</div>
			</div>
		</>
	);
}

export default ProductsList;
