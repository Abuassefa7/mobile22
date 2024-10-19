import React, { useEffect, useState } from "react";
import productServices from "../../../../services/product.service";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../../Contexts/AuthContext";

function EditProduct() {
	const { pid } = useParams();
	const navigate = useNavigate();
	const [fetchedProduct, setFetchedProduct] = useState({});
	const [selectedFile, setSelectedFile] = useState(null);
	const { employee } = useAuth();
	const [productValue, setProductValue] = useState({
		name: "",
		category: "",
		price: "",
		description: "",
		image: "",
	});
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);
	const [apiErrorMessage, setApiErrorMessage] = useState(null);
	const [serverError, setServerError] = useState("");

	let token = null;
	if (employee) {
		token = employee.employee_token;
	}
	// fetch single product
	const fetchSinglePrpduct = async () => {
		try {
			const response = productServices.getSingleProduct(pid);
			response
				.then((res) => {
					if (!res.ok) {
						setError(true);

						if (res.status === 400) {
							setApiErrorMessage("No product found");
						} else {
							setApiErrorMessage("Failed to fetch product !!");
						}
						return;
					}
					return res.json();
				})
				.then((data) => {
					if (data.length !== 0) {
						setFetchedProduct(data[0]);
						setProductValue({
							name: data[0].product_name,
							category: data[0].product_category,
							price: data[0].product_price,
							description: data[0].product_description,
							image: data[0].product_image,
						});
					} else {
						setError(true);
						setApiErrorMessage("No product found");
					}
				});
		} catch (error) {
			console.log(err);
		}
	};
	useEffect(() => {
		fetchSinglePrpduct();
	}, []);

	// handle input change for form fields
	const handleInputChange = (event) => {
		setProductValue({
			...productValue,
			[event.target.name]: event.target.value,
		});
	};

	const handleFileChange = (event) => {
		setSelectedFile(event.target.files[0]);
	};

	// update product function
	const updateProduct = async (e) => {
		e.preventDefault();
		try {
			const formData = new FormData();
			if (selectedFile) {
				formData.append("image", selectedFile);
			} else if (fetchedProduct.product_image) {
				formData.append("image", fetchedProduct.product_image);
			}
			formData.append("name", productValue.name);
			formData.append("price", productValue.price);
			formData.append("category", productValue.category);
			formData.append("description", productValue.description);
			console.log(token);
			const response = await productServices.updateProduct(
				token,
				formData,
				pid
			);
			if (!response.ok) {
				setError(true);
				setApiErrorMessage("Error on updating product!");
				setTimeout(() => {
					setError(false);
				}, 3000);
			} else {
				setSuccess(true);
				setTimeout(() => {
					setSuccess(false);
					navigate("/admin/products");
				}, 3000);
			}
		} catch (error) {
			console.log(error);
		}
	};
	const limitText = (text, limit) => {
		if (text?.length > limit) {
			return text.substring(0, limit) + "...";
		} else {
			return text;
		}
	};

	return (
		<div className="m-4">
			<div className="admin-title">
				<h1>Update Product </h1> <br />
				<br />
			</div>
			<div className="row row-correct-margin">
				<div className="product-back col-md-8">
					<section className="contact-area white">
						<div className="">
							<div className="row row-correct-margin">
								<div className="col-md-12">
									<div className="contact-form">
										{/* <div className="title">
										<h2>Update Product </h2>
									</div> */}
										{success && (
											<h4 className="green">Product Updated Successfully!!</h4>
										)}
										{error && <h4 className="red">{apiErrorMessage}</h4>}
										<form
											id="contact-form"
											name="product_form"
											className="default-form"
											onSubmit={updateProduct}
										>
											<div className="row ">
												<div className="col-md-6">
													<input
														type="text"
														name="name"
														value={productValue.name}
														placeholder="Product name *"
														required=""
														onChange={handleInputChange}
													/>
												</div>
												<div className="col-md-6">
													<input
														type="text"
														name="price"
														value={productValue.price}
														placeholder="Product price *"
														required=""
														onChange={handleInputChange}
													/>
												</div>
											</div>
											<div className="row">
												<div className="col-md-6">
													<select
														className="input-option"
														id="option-select"
														name="category"
														value={productValue.category}
														onChange={handleInputChange}
													>
														<option value="">-- Product category -- *</option>
														<option value="Smart Phones">Smart Phones</option>
														<option value="Phone Cases and Covers">
															Phone Cases and Covers
														</option>
														<option value="Chargers and Cables">
															Chargers and Cables
														</option>
														<option value="Headphones and Earphones">
															Headphones and Earphones
														</option>
														<option value="Uncategorized">Uncategorized</option>
													</select>
												</div>
												<div className="col-md-6">
													<div className="input-field">
														<input
															className="input-option"
															onChange={handleFileChange}
															type="file"
															name="name"
														/>
													</div>
												</div>
											</div>

											<div className="row">
												<div className="col-md-12">
													<textarea
														name="description"
														placeholder="Prduct description ...*"
														required=""
														value={productValue.description}
														onChange={handleInputChange}
													></textarea>
												</div>
											</div>
											<div className="row">
												<div className="col-md-12">
													{/* <input
													id="form_botcheck"
													name="form_botcheck"
													className="form-control"
													type="hidden"
													value=""
												/> */}
													<button
														className="thm-btn bg-1"
														type="submit"
														data-loading-text="Please wait..."
													>
														Update product
													</button>
												</div>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</section>
				</div>
				<div className="col-md-4 ">
					<h2 className="p-3">Current product</h2>
					<br />
					<img
						src={fetchedProduct.product_image}
						alt=""
						className="col-xs-6 col-md-12"
					/>
					<div className="product-image col-xs-6 col-md-12">
						<h3 className="p-2">{fetchedProduct.product_name}</h3>
						<h4>{fetchedProduct.product_price}</h4>
						<p>{limitText(fetchedProduct.product_description, 150)}</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default EditProduct;
