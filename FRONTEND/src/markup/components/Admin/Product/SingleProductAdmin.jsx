import React, { useEffect, useState } from "react";
import productServices from "../../../../services/product.service";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../../Contexts/AuthContext";

function SingleProductAdmin() {
	const navigate = useNavigate();
	const { employee } = useAuth();
	const [singleProduct, setSingleProduct] = useState(null);
	const [apiError, setApiError] = useState(false);
	const [apiErrorMessage, setApiErrorMessage] = useState(null);
	// const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const { pid } = useParams();
	let token = null;
	if (employee) {
		token = employee.employee_token;
	}
	const getProduct = async () => {
		try {
			const res = await productServices.getSingleProduct(pid);

			if (res.status !== 200) {
				if (res.status === 404) {
					setApiErrorMessage("No product found");
				} else {
					setApiErrorMessage("Failed to fetch data!!");
				}
				setApiError(true);
				setLoading(false);
				return;
			}

			const product = await res.json();
			
			if (product && product[0] && product.length !== 0) {
				setSingleProduct(product[0]);
			} else {
				setApiError(true);
				setApiErrorMessage("No product found");
			}
		} catch (error) {
			console.error(error);
			setApiError(true);
			setApiErrorMessage("An error occurred while fetching products.");
		} finally {
			setLoading(false); // Set loading to false regardless of success or error
		}
	};

	useEffect(() => {
		getProduct();
	}, []);
	
	// Display a confirmation dialog before deleting the product
	const confirmDelete = (id) => {
		if (window.confirm("This product is about to be deleted. Continue?")) {
			deleteProduct(id);
		}
	};
	// delete product function
	const deleteProduct = async (id) => {
		try {
			window.alert("Product Deleted!!");
			const response = await productServices.deleteProduct(token,id);
			setTimeout(() => {
				navigate("/admin/products");
			}, 1000);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<section id="shop-area" className="single-shop-area single">
			<div className=" single">
				<div className="row row-correct-margin">
					<div className="col-lg-10 col-md-10 col-sm-12 col-xs-12">
						<div className="shop-content">
							<div className="single-shop-content">
								<div className="row row-correct-margin">
									{singleProduct ? (
										<>
											<div className="col-md-6">
												<div className="img-holder">
													<img
														src={singleProduct.product_image}
														alt="Awesome Image"
														data-imagezoom="true"
														className="img-responsive image-large"
													/>
												</div>
											</div>
											<div className="col-md-6">
												<div className="content-box">
													<h2>{singleProduct.product_name}</h2>
													<br />
													<span className="price">
														{singleProduct.product_price}
													</span>
													<div className="text">
														<p>{singleProduct.product_description}</p>
													</div>
													<div className="row">
														<div className="addto-cart-box col-md-6">
															<Link
																to={`/admin/update-product/${singleProduct.product_id}`}
															>
																<button
																	className="thm-btn bg-1 addtocart"
																	type="submit"
																>
																	Update Product
																</button>
															</Link>
														</div>
														<div className="addto-cart-box col-md-6">
															<button
																className="thm-btn bg-2 addtocart"
																onClick={() => {
																	confirmDelete(pid);
																}}
															>
																Delete Product
															</button>
														</div>
													</div>
												</div>
											</div>
										</>
									) : (
										""
									)}
								</div>
							</div>
						</div>
						{/* Start single shop content */}
					</div>
				</div>
			</div>
		</section>
	);
}

export default SingleProductAdmin;
