import React, { useState } from "react";

import productServices from "../../../../services/product.service";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../Contexts/AuthContext";
function NewProduct() {
	const navigate = useNavigate();
	const { employee } = useAuth();
	const [name, setProductName] = useState("");
	const [category, setProductCategory] = useState("");
	const [price, setProductPrice] = useState("");
	const [description, setProductDescription] = useState("");
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);
	const [serverError, setServerError] = useState("");
	const [selectedFile, setSelectedFile] = useState(null);
	let token = null;
	if (employee) {
		token = employee.employee_token;
	}

	const handleFileChange = (event) => {
		setSelectedFile(event.target.files[0]);
	};
	console.log(selectedFile);
	const submitProduct = async (e) => {
		e.preventDefault();
		// incoming product data
		if (!name || !price || !category || !description) {
			setError(true);
			return;
		}

		const productData = {
			name: name,
			price: price,
			category: category,
			description: description,
		};

		// Create a FormData object
		const formData = new FormData();

		// Append the product data to the FormData object
		for (const [key, value] of Object.entries(productData)) {
			formData.append(key, value);
		}

		// Append the file data to the FormData object
		formData.append("image", selectedFile);

		for (const [key, value] of formData.entries()) {
			console.log(`${key}: ${value}`);
		}

		try {
			const addProductResponse = await productServices.addProduct(
				token,
				formData
			);
			if (addProductResponse.ok) {
				setSuccess(true);
				setTimeout(() => {
					setSuccess(false);
					setProductName("");
					setProductCategory("");
					setProductPrice("");
					setProductDescription("");
					setSelectedFile("");
					navigate("/admin/products");
				}, 3000);
			} else {
				console.log("error product adding");
			}
		} catch (error) {
			console.error("Error uploading file:", error);
		}
	};
	return (
		<div className="m-4">
			<div className="admin-title">
				<h1>New Product </h1> <br />
				<br />
			</div>
			<div className="product-back">
				<section className="contact-area white">
					<div className="">
						<div className="row">
							<div className="col-md-12">
								<div className="contact-form">
									{/* <div className="title">
										<h2>New Product </h2>
									</div> */}
									{success && <h4 className="green">Product added</h4>}
									{error && <h4 className="red">Error while adding !</h4>}
									<form
										id="contact-form"
										name="product_form"
										className="default-form"
										onSubmit={submitProduct}
									>
										<div className="row">
											<div className="col-md-6">
												<input
													type="text"
													name="name"
													value={name}
													placeholder="Product name *"
													required=""
													onChange={(event) =>
														setProductName(event.target.value)
													}
												/>
											</div>
											<div className="col-md-6">
												<input
													type="text"
													name="price"
													value={price}
													placeholder="Product price *"
													required=""
													onChange={(event) =>
														setProductPrice(event.target.value)
													}
												/>
											</div>
										</div>
										<div className="row">
											<div className="col-md-6">
												<select
													className="input-option"
													id="option-select"
													name="category"
													value={category}
													onChange={(event) =>
														setProductCategory(event.target.value)
													}
												>
													<option value="">-- Product category --</option>
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
												{/* <div className="col-md-3">
												<button onClick={submitProduct}>Upload</button>
											</div> */}
											</div>
										</div>

										<div className="row">
											<div className="col-md-12">
												<textarea
													name="description"
													placeholder="Prduct description.."
													required=""
													value={description}
													onChange={(event) =>
														setProductDescription(event.target.value)
													}
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
													Add product
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
		</div>
	);
}

export default NewProduct;
