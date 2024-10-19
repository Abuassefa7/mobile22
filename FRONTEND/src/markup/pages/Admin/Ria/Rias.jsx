import React from "react";
import AdminRia from "../../../components/Admin/AdminRia/AdminRia";
import AdminMenu from "../../../components/Admin/AdminMenu/AdminMenu";
import CommonBanner from "../../../components/CommonBanner/CommonBanner";

function Rias() {
  return (
    <>
      <CommonBanner title="RIA Services" />
      <div className="container-fluid">
        <div className="row row-correct-margin">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <AdminRia />
          </div>
        </div>
      </div>
    </>
  );
}

export default Rias;
