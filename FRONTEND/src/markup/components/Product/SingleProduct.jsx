import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import SideBar from "./SideBar";
import RelatedProducts from "./RelatedProducts";
// import ConditionalSingleProducts from "./ConditionalSingleProducts";
import ProductService from "../../../services/product.service";
import EachProductComponent from "./EachProductComponent";
import { useAuth } from "../../../Contexts/AuthContext";
function SingleProduct() {
	const [singleProduct, setSingleProduct] = useState(null);
	const [apiError, setApiError] = useState(false);
	const [apiErrorMessage, setApiErrorMessage] = useState(null);
	const { isSticky, isMobile } = useAuth();
	// const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const { id } = useParams();

	// Call the getAllproducts function
	const getProduct = async () => {
		try {
			const res = await ProductService.getSingleProduct(id);

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
	}, [id]);
	return (
		<div className={isSticky ? `under-header-margin` : ""}>
			<section className="breadcrumb-area">
				<div className="container text-center">
					<h1>Single Product</h1>
				</div>
			</section>
			<section className="breadcrumb-botton-area">
				<div className="container">
					<div className="left pull-left">
						<ul>
							<li>
								<a href="index.html">Home</a>
							</li>
							<li>
								<i className="fa fa-caret-right" aria-hidden="true"></i>
							</li>
							<li>
								<Link to={"/products"}>Product</Link>
							</li>
							<li>
								<i className="fa fa-caret-right" aria-hidden="true"></i>
							</li>
							<li>Single Product</li>
						</ul>
					</div>
				</div>
			</section>
			{/* big section */}

			<section id="shop-area" className="single-shop-area single">
				<div className="container single">
					<div className="row">
						<div className="col-lg-10 col-md-10 col-sm-12 col-xs-12">
							<div className="shop-content">
								<div className="single-shop-content">
									<div className="row">
										{singleProduct ? (
											<EachProductComponent
												titles={singleProduct.product_name}
												images={singleProduct.product_image}
												descriptions={singleProduct.product_description}
												price={singleProduct.product_price}
											/>
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
		</div>
	);
}

export default SingleProduct;
