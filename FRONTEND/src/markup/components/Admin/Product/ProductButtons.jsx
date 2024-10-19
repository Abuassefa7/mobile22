import React from "react";

function ProductButtons(pid,deleteProduct) {
	return (
		<div className="row">
			<div className="addto-cart-box col-md-6">
				<Link to={`/admin/updateproduct/${pid}`}>
					<button className="thm-btn bg-1 addtocart" type="submit">
						Update Product
					</button>
				</Link>
			</div>
			<div className="addto-cart-box col-md-6">
				<div onClick={()=>deleteProduct(pid)}>
					<button className="thm-btn bg-2 addtocart" type="submit">
						Delete Product
					</button>
				</div>
			</div>
		</div>
	);
}

export default ProductButtons;
