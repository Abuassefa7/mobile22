import React, { useEffect, useState } from "react";
import Products from "../../Product/Products";
import productServices from "../../../../services/product.service";
import { Link } from "react-router-dom";

function ProductsAdmin() {
	const [productList, setProductList] = useState([]);
	const [selectedCategories, setSelectedCategories] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [apiError, setApiError] = useState(false);
	const [apiErrorMessage, setApiErrorMessage] = useState(null);
	// const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const productsPerPage = 6;
	const getProducts = async () => {
		try {
			const res = await productServices.getAllProducts();

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

			if (product && product.data && product.data.length !== 0) {
				setProductList(product.data);
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
		getProducts();
	}, []);

	// Calculate the index of the first product on the current page
	const indexOfFirstProduct = (currentPage - 1) * productsPerPage;
	// Calculate the index of the last product on the current page
	const indexOfLastProduct = Math.min(
		currentPage * productsPerPage,
		productList.length
	);
	// Get the products for the current page
	const currentProducts = productList.slice(
		indexOfFirstProduct,
		indexOfLastProduct
	);

	// Calculate the total number of pages
	const totalPages = Math.ceil(productList.length / productsPerPage);

	const handlePageChange = (event, pageNumber) => {
		event.preventDefault();
		if (pageNumber >= 1 && pageNumber <= totalPages) {
			setCurrentPage(pageNumber);
		}
	};

	const handleNextPage = (event) => {
		event.preventDefault();
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	const handlePrevPage = (event) => {
		event.preventDefault();
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};
	console.log(productList);
	return (
		<section id="shop-area" className="main-shop-area ">
			<div className="">
				<div className="row-correct-margin row ">
					<div className="col-lg-9 col-md-8 col-sm-12 col-xs-12">
						<div className="shop-content">
							<div className="row showing-result-shorting">
								<div className="col-md-12">
									<div className="showing pull-left">
										<p>
											Showing {indexOfFirstProduct + 1}-{" "}
											{productsPerPage > currentProducts.length
												? productList.length
												: indexOfLastProduct}{" "}
											of {productList.length} results
										</p>
									</div>
									<div className="shorting pull-right">
										<Link
											to={"/admin/new-product"}
											className="thm-btn bg-1 special-btn"
										>
											Add New Product
										</Link>
									</div>
								</div>
							</div>
							<div className="row row-correct-margin">
								{currentProducts?.map((product) => (
									<div
										className="col-md-4 col-sm-4 col-xs-12"
										key={product.product_id}
									>
										<div className="single-product-item">
											<div className="img-holder">
												<img
													src={product.product_image}
													alt="Awesome Product Image"
												/>
												<div className="overlay-box">
													<div className="box">
														<div className="content">
															<Link
																to={`/admin/products/${product.product_id}`}
																className="thm-btn bg-1"
															>
																View Detail
															</Link>
														</div>
													</div>
												</div>
											</div>
											<div className="title-holder">
												<div className="top clearfix">
													<div className="product-title pull-left">
														<Link to="">
															<h5>{product.product_name}</h5>
														</Link>
													</div>
												</div>
												<h4>{product.product_price}</h4>
											</div>
										</div>
									</div>
								))}
							</div>
							{/* <!--Start post pagination--> */}

							<div className="row row-correct-margin">
								<div className="col-md-12">
									<ul className="post-pagination text-center">
										{/* Render the previous page button */}
										<li className={currentPage === 1 ? "disabled" : ""}>
											<a href="" onClick={(event) => handlePrevPage(event)}>
												<i className="fa fa-caret-left" aria-hidden="true"></i>
											</a>
										</li>
										{/* Render the page numbers */}
										{Array.from(
											{ length: totalPages },
											(_, index) => index + 1
										).map((pageNumber) => (
											<li
												key={pageNumber}
												className={currentPage === pageNumber ? "active" : ""}
											>
												<Link
													to={"/products"}
													onClick={(event) =>
														handlePageChange(event, pageNumber)
													}
												>
													{pageNumber}
												</Link>
											</li>
										))}
										{/* Render the next page button */}
										<li
											className={currentPage === totalPages ? "disabled" : ""}
										>
											<a href="" onClick={(event) => handleNextPage(event)}>
												<i className="fa fa-caret-right" aria-hidden="true"></i>
											</a>
										</li>
									</ul>
								</div>
							</div>
							{/* <!--End post pagination--> */}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default ProductsAdmin;
