import React, { useEffect, useMemo, useState } from "react";
import ProductOnly from "./ProductOnly";
import SideBar from "./SideBar";
import ProductService from "../../../services/product.service";
import SingleSideBareCategory from "./SingleSideBareCategory";
import SingleSideBareLatestProduct from "./SingleSideBareLatestProduct";
import { Link } from "react-router-dom";
import CommonBanner from "../CommonBanner/CommonBanner";
// import { useNavigate } from "react-router-dom";
function Products() {
	const categories = [
		"All Products",
		"Smart Phones",
		"Phone Cases and Covers",
		"Chargers and Cables",
		"Headphones and Earphones",
		"Uncategorized",
	];
	const [productList, setProductList] = useState([]);
	const [selectedCategories, setSelectedCategories] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [apiError, setApiError] = useState(false);
	const [apiErrorMessage, setApiErrorMessage] = useState(null);
	// const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const productsPerPage = 6;
	// Call the getAllproducts function
	const getProducts = async () => {
		try {
			const res = await ProductService.getAllProducts();
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

	// Filter the products based on the selected categories
	useEffect(() => {
		filterProducts();
	}, [selectedCategories]);

	const handleCategoryClick = (category) => {
		if (selectedCategories.includes(category)) {
			setSelectedCategories(selectedCategories.filter((c) => c == category));
		} else {
			setSelectedCategories([category]);
		}
	};

	const filterProducts = () => {
		setFilteredProducts(
			productList.filter((product) => {
				return selectedCategories.every((c) =>
					product.product_category.includes(c)
				);
			})
		);
	};

	const latestProducts = useMemo(() => {
		return productList
			.sort(
				(a, b) =>
					new Date(b.product_added_date) - new Date(a.product_added_date)
			)
			.slice(0, 3);
	}, [productList]);
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
	if (filteredProducts?.length > 0) {
		return (
			<>
				<CommonBanner title="products" />
				{/* <!--End breadcrumb bottom area--> */}

				{/* <!--Start blog area--> */}
				<section id="shop-area" className="main-shop-area">
					<div className="container">
						<div className="row">
							<div className="col-lg-9 col-md-8 col-sm-12 col-xs-12 ">
								<div className="shop-content special">
									<div className="row showing-result-shorting">
										<div className="col-md-12 ">
											<div className="showing pull-left">
												<p>
													Showing {indexOfFirstProduct + 1}-{" "}
													{productsPerPage > filteredProducts.length
														? filteredProducts.length
														: indexOfLastProduct}{" "}
													of {filteredProducts.length} results
												</p>
											</div>
										</div>
									</div>
									<div className="row">
										{filteredProducts?.map((product) => (
											<div
												key={product.product_id}
												className="col-md-4 col-sm-4 col-xs-12"
											>
												<ProductOnly
													title={product.product_name}
													image={product.product_image}
													price={product.product_price}
													url={product.product_id}
												/>
											</div>
										))}
									</div>
									{/* <!--Start post pagination--> */}

									<div className="row">
										<div className="col-md-12">
											<ul className="post-pagination text-center">
												{/* Render the previous page button */}
												<li className={currentPage === 1 ? "disabled" : ""}>
													<a href="" onClick={(event) => handlePrevPage(event)}>
														<i
															className="fa fa-caret-left"
															aria-hidden="true"
														></i>
													</a>
												</li>
												{/* Render the page numbers */}
												{Array.from(
													{ length: totalPages },
													(_, index) => index + 1
												).map((pageNumber) => (
													<li
														key={pageNumber}
														className={
															currentPage === pageNumber ? "active" : ""
														}
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
													className={
														currentPage === totalPages ? "disabled" : ""
													}
												>
													<a href="" onClick={(event) => handleNextPage(event)}>
														<i
															className="fa fa-caret-right"
															aria-hidden="true"
														></i>
													</a>
												</li>
											</ul>
										</div>
									</div>
									{/* <!--End post pagination--> */}
								</div>
							</div>
							{/* <!--Start sidebar Wrapper--> */}

							<div className="col-lg-3 col-md-4 col-sm-12 col-xs-12">
								<div className="sidebar-wrapper">
									<div className="single-sidebar">
										<button type="submit">
											<i className="fa fa-arrow-down" aria-hidden="true"></i>
										</button>
									</div>

									<div className="single-sidebar">
										<SingleSideBareCategory
											categories={categories}
											selectedCategories={selectedCategories}
											onCategorySelect={handleCategoryClick}
										/>
									</div>

									{/* End single sidebar */}
								</div>
							</div>
						</div>
					</div>
				</section>
			</>
		);
	} else {
		return (
			<>
				<CommonBanner title="products" />
				{/* <!--End breadcrumb bottom area--> */}

				{/* <!--Start blog area--> */}
				<section id="shop-area" className="main-shop-area">
					<div className="container">
						<div className="row">
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
											{/* <div className="shorting pull-right">
												<select className="selectmenu">
													<option selected="selected">Default Sorting</option>
												</select>
											</div> */}
										</div>
									</div>
									<div className="row">
										{currentProducts.map((product) => (
											<div
												key={product.product_id}
												className="col-md-4 col-sm-4 col-xs-12"
											>
												<ProductOnly
													title={product.product_name}
													image={product.product_image}
													price={product.product_price}
													url={product.product_id}
												/>
											</div>
										))}
									</div>
									{/* <!--Start post pagination--> */}

									<div className="row">
										<div className="col-md-12">
											<ul className="post-pagination text-center">
												{/* Render the previous page button */}
												<li className={currentPage === 1 ? "disabled" : ""}>
													<Link
														to={""}
														onClick={(event) => handlePrevPage(event)}
													>
														<i
															className="fa fa-caret-left"
															aria-hidden="true"
														></i>
													</Link>
												</li>
												{/* Render the page numbers */}
												{Array.from(
													{ length: totalPages },
													(_, index) => index + 1
												).map((pageNumber) => (
													<li
														key={pageNumber}
														className={
															currentPage === pageNumber ? "active" : ""
														}
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
													className={
														currentPage === totalPages ? "disabled" : ""
													}
												>
													<Link
														to={"/products"}
														onClick={(event) => handleNextPage(event)}
													>
														<i
															className="fa fa-caret-right"
															aria-hidden="true"
														></i>
													</Link>
												</li>
											</ul>
										</div>
									</div>
									{/* <!--End post pagination--> */}
								</div>
							</div>
							{/* <!--Start sidebar Wrapper--> */}

							<div className="col-lg-3 col-md-4 col-sm-7 col-xs-12">
								<div className="sidebar-wrapper">
									{/* Start single sidebar */}
									<div className="single-sidebar">
										<button type="submit">
											<i className="fa fa-arrow-down" aria-hidden="true"></i>
										</button>
									</div>

									<div className="single-sidebar">
										<SingleSideBareCategory
											categories={categories}
											selectedCategories={selectedCategories}
											onCategorySelect={handleCategoryClick}
										/>
									</div>
									{currentProducts.length === 6 && (
										<div className="single-sidebar">
											<SingleSideBareLatestProduct
												productData={latestProducts}
											/>
										</div>
									)}

									{/* End single sidebar */}
								</div>
							</div>
						</div>
					</div>
				</section>
			</>
		);
	}
}

export default Products;
