import React from "react";
import BasementList from "../../../components/Admin/HousingService/BasementList";
import AdminMenu from "../../../components/Admin/AdminMenu/AdminMenu";
import CommonBanner from "../../../components/CommonBanner/CommonBanner";

function BasmentServices() {
	return (
		<>
			<CommonBanner title="Services" />
			<div className="container-fluid">
				<div className="row row-correct-margin">
					<div className="col-md-3">
						<AdminMenu />
					</div>
					<div className="col-md-9 ">
						<BasementList />
					</div>
				</div>
			</div>
		</>
	);
}

export default BasmentServices;
